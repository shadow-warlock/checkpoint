<?php

namespace App\Controller;

use App\Entity\Zone;
use App\Service\JSONer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ZoneController extends BaseController
{
    /**
     * @Route("api/zone/get", name="areas_get")
     * @param Request $request
     * @param JSONer $serializer
     * @return JsonResponse
     */
    public function getZones(Request $request,JSONer $serializer){
        //        if (!$security->isGranted('IS_AUTHENTICATED_FULLY')) {
//            throw new AccessDeniedException();
//        }
        $post = $this->decodeContent($request);
        $criteria = $this->makeCriteria($post);
        $em = $this->getDoctrine()->getManager();
        $zones = $em->getRepository(Zone::class)->matching($criteria)->toArray();
        return new JsonResponse($serializer->toJSON($zones), 200, [], true);
    }

    /**
     * @Route("api/zone/get/{id}", name="area_get_by_id")
     * @param Zone $zone
     * @return JsonResponse
     */
    public function getZone(Zone $zone){
        return new JsonResponse($zone);
    }
}
