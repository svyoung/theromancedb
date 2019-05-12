<?php

namespace App\Repository;

use App\Entity\Books;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Books|null find($id, $lockMode = null, $lockVersion = null)
 * @method Books|null findOneBy(array $criteria, array $orderBy = null)
 * @method Books[]    findAll()
 * @method Books[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */

class BooksRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Books::class);
    }

}