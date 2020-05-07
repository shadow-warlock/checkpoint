<?php

namespace App\Repository;

use App\Entity\Employee;
use App\Entity\Visit;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\Query\Expr\Join;

/**
 * @method Employee|null find($id, $lockMode = null, $lockVersion = null)
 * @method Employee|null findOneBy(array $criteria, array $orderBy = null)
 * @method Employee[]    findAll()
 * @method Employee[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 * @method int count(array $criteria)
 */
class EmployeeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Employee::class);
    }

    // /**
    //  * @return Employee[] Returns an array of Employee objects
    //  */

    public function findByInOutLast($criteria, $type, $zone = null)
    {
        $query = $this->createQueryBuilder('e')
        ->addCriteria($criteria)
        ->innerJoin('e.lastVisits', 'lv')
        ->andWhere("lv.type = :type")
        ->orderBy("lv.time", "DESC")
        ->setParameter("type", $type);
        if($zone !== null){
            $query->andWhere("lv.zone = :zone");
            $query->setParameter("zone", $zone);
        }
        return $query
            ->getQuery()
            ->getResult()
        ;
    }


    /*
    public function findOneBySomeField($value): ?Employee
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
