<?php

namespace App\Repository;

use App\Entity\Face;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Face|null find($id, $lockMode = null, $lockVersion = null)
 * @method Face|null findOneBy(array $criteria, array $orderBy = null)
 * @method Face[]    findAll()
 * @method Face[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FaceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Face::class);
    }

    // /**
    //  * @return Face[] Returns an array of Face objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('f.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Face
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
