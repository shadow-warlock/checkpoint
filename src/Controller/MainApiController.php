<?php


namespace App\Controller;

use App\Entity\Employee;
use App\Entity\Face;
use App\Entity\User;
use App\Service\JSONer;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;


class MainApiController extends BaseController
{

    /**
     * @Route("/api/test", name="root")
     * @param JSONer $serializer
     * @return JsonResponse
     */
    public function root(JSONer $serializer)
    {
        $post = [
            "criteria"=>[
                [
                    "value"=>"2",
                    "field"=>"id",
                    "sign"=>"eq",
                    "multiple"=>"AND"
                ]
            ],
            "customCriteria"=>[
                "zone"=>1,
                "type"=>"employee_out"
            ]
        ];
        $criteria = $this->makeCriteria($post);
        $em = $this->getDoctrine()->getManager();
        if(array_key_exists(self::CUSTOM_CRITERIA, $post)){
            $custom = $post[self::CUSTOM_CRITERIA];
            $employees = $em->getRepository(Employee::class)->findByInOutLast($criteria, $custom['type'], $custom['zone']);
        }else{
            $employees = $em->getRepository(Employee::class)->matching($criteria)->toArray();
        }
        return new JsonResponse($serializer->toJSON($employees), 200, [], true);
    }


    /**
     * @Route("/api/load_employees", name="load_employees")
     * @param JSONer $serializer
     * @return JsonResponse
     */
    public function loadEmployees(JSONer $serializer)
    {
        $users = scandir(__DIR__ . "/../../public/train_dir");
        $admin = $this->getDoctrine()->getRepository(User::class)->find(1);
        foreach ($users as $user){
            $employee = new Employee();
            $employee->setName($user);
            $employee->setPosition("Сотрудник");
            $employee->setAdmin($admin);
            $face = new Face();
            $face->setType("avatar");
            $face->setEmployee($employee);
            $face->setSrc("/train_dir/" . $user . "/" . $user . "0.jpg");
            $this->getDoctrine()->getManager()->persist($face);
            $this->getDoctrine()->getManager()->persist($employee);
        }
        $this->getDoctrine()->getManager()->flush();
        return new JsonResponse($serializer->toJSON($users), 200, [], true);
    }

}