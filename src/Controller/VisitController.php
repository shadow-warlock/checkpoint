<?php

namespace App\Controller;

use App\Entity\Camera;
use App\Entity\Employee;
use App\Entity\Visit;
use App\Service\JSONer;
use DateTime;
use Exception;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class VisitController extends BaseController
{
    /**
     * @Route("/api/visit/add", name="add_visit")
     * @param Request $request
     * @return JsonResponse
     * @throws Exception
     */
    public function addVisit(Request $request, LoggerInterface $logger)
    {
        $post = $this->decodeContent($request);
        $logger->critical(print_r($post, true));
        /**
         * @var Camera $camera
         * @var Employee $employee
         */
        $camera = $this->getDoctrine()->getRepository(Camera::class)->find($post['camera']);
        $employee = $this->getDoctrine()->getRepository(Employee::class)->find($post['employee']);
        $visit = new Visit();
        $visit->setTime(new DateTime());
        $visit->setType($camera->getType());
        $visit->setZone($camera->getZone());
        $visit->setCamera($camera);
        $visit->setEmployee($employee);
        $this->getDoctrine()->getManager()->persist($visit);
        $this->getDoctrine()->getManager()->flush();
        return new JsonResponse($visit->getId());
    }

    /**
     * @Route("/api/visit/get", name="get_visits")
     * @param Request $request
     * @param Security $security
     * @param JSONer $serializer
     * @return JsonResponse
     */
    public function getVisits(Request $request, Security $security, JSONer $serializer)
    {
//        if (!$security->isGranted('IS_AUTHENTICATED_FULLY')) {
//            throw new AccessDeniedException();
//        }
        $post = $this->decodeContent($request);
//        $post = json_decode('{"criteria":[{"value":"23.09.2019, 00:00:00","sign":"gte","multiple":"AND","field":"time","type":"datetime"},{"value":"23.09.2019, 23:59:59","sign":"lte","multiple":"AND","field":"time","type":"datetime"}],"linkedCriteria":{"zone":{"multiple":"AND","entity":"Zone","criteria":[{"value":1,"sign":"eq","multiple":"AND","field":"id"}]}}}',true);
        $criteria = $this->makeCriteria($post);
//        dump($criteria);
        $em = $this->getDoctrine()->getManager();
        $visits = $em->getRepository(Visit::class)->matching($criteria)->toArray();
        return new JsonResponse($serializer->toJSON($visits), 200, [], true);
    }

    /**
     * @Route("/api/visit/count", name="get_visits_count")
     * @param Request $request
     * @param Security $security
     * @param JSONer $serializer
     * @return JsonResponse
     */
    public function getVisitsCount(Request $request, Security $security, JSONer $serializer)
    {
//        if (!$security->isGranted('IS_AUTHENTICATED_FULLY')) {
//            throw new AccessDeniedException();
//        }
        $post = $this->decodeContent($request);
        $criteria = $this->makeCriteria($post);
        $em = $this->getDoctrine()->getManager();
        $visits = $em->getRepository(Visit::class)->matching($criteria)->count();
        return new JsonResponse($serializer->toJSON($visits), 200, [], true);
    }
}
