<?php

namespace App\Controller;

use App\Entity\Employee;
use App\Service\JSONer;
use Doctrine\Common\Collections\Criteria;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class EmployeeController extends BaseController
{
    /**
     * @Route("/api/employee/get", name="get_employee")
     * @param Request $request
     * @param Security $security
     * @param JSONer $serializer
     * @return JsonResponse
     */
    public function getEmployees(Request $request, Security $security, JSONer $serializer)
    {
//        if (!$security->isGranted('IS_AUTHENTICATED_FULLY')) {
//            throw new AccessDeniedException();
//        }
        $post = $this->decodeContent($request);
        $criteria = $this->makeCriteria($post);
        $em = $this->getDoctrine()->getManager();
        if(array_key_exists(self::CUSTOM_CRITERIA, $post)){
            $custom = $post[self::CUSTOM_CRITERIA];
            $employees = $em->getRepository(Employee::class)->findByInOutLast($criteria, $custom['type'], $custom['zone'] ?? null);
        }else{
            $employees = $em->getRepository(Employee::class)->matching($criteria)->toArray();
        }
        return new JsonResponse($serializer->toJSON($employees), 200, [], true);
    }

    /**
     * @Route("/api/employee/count", name="get_employee_count")
     * @param Request $request
     * @param Security $security
     * @return JsonResponse
     */
    public function countEmployees(Request $request, Security $security)
    {
        $post = $this->decodeContent($request);
        $criteria = $this->makeCriteria($post);
        $em = $this->getDoctrine()->getManager();
        if(array_key_exists(self::CUSTOM_CRITERIA, $post)){
            $custom = $post[self::CUSTOM_CRITERIA];
            $employees = count($em->getRepository(Employee::class)->findByInOutLast($criteria, $custom['type'], $custom['zone'] ?? null));
        }else{
            $employees = $em->getRepository(Employee::class)->matching($criteria)->count();
        }
        return new JsonResponse($employees, 200, [], true);
    }
}
