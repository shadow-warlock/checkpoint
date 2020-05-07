<?php


namespace App\Controller;


use Doctrine\Common\Collections\Criteria;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class BaseController extends AbstractController
{
    private const SIGN = "sign";
    private const VALUE = "value";
    private const MULTIPLE = "multiple";
    private const FIELD = "field";
    private const TYPE = "type";
    private const CLASS_CONST = "entity";
    public const CUSTOM_CRITERIA = "customCriteria";
    public const LINKED_CRITERIA = "linkedCriteria";
    public const CRITERIA = "criteria";

    public function decodeContent(Request $request){
        return json_decode($request->getContent(), true) ?? [];
    }

    public function makeCriteria(array $post) : Criteria{
        $criteria = $post['criteria'] ?? [];
        $order = $post['order'] ?? null;
        $limit = $post['limit'] ?? null;
        $offset = $post['offset'] ?? null;
        $linkedCriteria = $post[self::LINKED_CRITERIA] ?? [];
        $result = Criteria::create();
        if($offset !== null){
            $result = $result->setFirstResult($offset);
        }
        if($limit !== null){
            $result = $result->setMaxResults($limit);
        }
        if($order !== null){
            $result = $result->orderBy($order);
        }
        foreach ($criteria as $criterion){
            $result->{strtolower($criterion[self::MULTIPLE])."Where"}(

                Criteria::expr()->{$criterion[self::SIGN]}($criterion[self::FIELD], $this->typeConversion($criterion[self::TYPE] ?? null, $criterion[self::VALUE]))
            );
        }
        foreach ($linkedCriteria as $k => $criterion){
            $linkedCriteriaResult = $this->processLinkedCriteria($criterion);
            $result->{strtolower($criterion[self::MULTIPLE])."Where"}(
                Criteria::expr()->in($k, $linkedCriteriaResult)
            );

        }
        return $result;
    }

    private function processLinkedCriteria($linkedCriterion) {
        $criteria = $this->makeCriteria([
            "criteria" => $linkedCriterion[self::CRITERIA],
            "linkedCriteria" => $linkedCriterion[self::LINKED_CRITERIA] ?? []
            ]);
        $objs = $this->getDoctrine()->getRepository("App\\Entity\\".$linkedCriterion[self::CLASS_CONST])->matching($criteria);
        $objs = $objs->toArray();
        return $objs;
    }

    private function typeConversion($type, $value){
        switch ($type){
            case "datetime":
                return new \DateTime($value);
        }
        return $value;
    }

}