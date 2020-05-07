<?php

namespace App\EventListener;


use App\Entity\Visit;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\ORMException;

class VisitListener
{
    /**
     * @var EntityManager $em
     */
    private $em;
    /**
     * @var Visit $entity
     */
    private $entity;

    public function postPersist(LifecycleEventArgs $args)
    {
        $this->entity = $args->getEntity();
        if (!$this->entity instanceof Visit) {
            return;
        } else {
            $this->em = $args->getEntityManager();
            try {
                $this->saveLastVisit();
                $this->em->flush();
            } catch (ORMException $e) {
                print_r($e->getMessage());
                return;
            }
        }
    }

    /**
     * @throws ORMException
     */
    private function saveLastVisit()
    {
        foreach ($this->entity->getEmployee()->getLastVisits() as $lastVisit){
            if($lastVisit->getZone()->getId()==$this->entity->getZone()->getId()){
                $this->entity->getEmployee()->removeLastVisit($lastVisit);
            }
        }
        $this->entity->getEmployee()->addLastVisit($this->entity);
        $this->em->persist($this->entity);
    }
}