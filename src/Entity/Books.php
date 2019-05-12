<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Books
 *
 * @ORM\Table(name="books")
 * @ORM\Entity
 */
class Books
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255, nullable=false)
     */
    private $title;

    /**
     * @var int
     *
     * @ORM\Column(name="author_id", type="integer", nullable=false)
     */
    private $authorId;

    /**
     * @var string|null
     *
     * @ORM\Column(name="image_url", type="text", length=0, nullable=true)
     */
    private $imageUrl;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="text", length=65535, nullable=true)
     */
    private $description;

    /**
     * @var int
     *
     * @ORM\Column(name="publication_month", type="integer", nullable=false)
     */
    private $publicationMonth;

    /**
     * @var int
     *
     * @ORM\Column(name="publication_year", type="integer", nullable=false)
     */
    private $publicationYear;

    /**
     * @var int|null
     *
     * @ORM\Column(name="publisher_id", type="integer", nullable=true)
     */
    private $publisherId;

    /**
     * @var string|null
     *
     * @ORM\Column(name="amzn_url", type="text", length=0, nullable=true)
     */
    private $amznUrl;

    /**
     * @var string|null
     *
     * @ORM\Column(name="gr_url", type="text", length=0, nullable=true)
     */
    private $grUrl;

    /**
     * @var int|null
     *
     * @ORM\Column(name="rating", type="integer", nullable=true)
     */
    private $rating;

    /**
     * @var int|null
     *
     * @ORM\Column(name="page_count", type="integer", nullable=true)
     */
    private $pageCount;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="modified_date", type="datetime", nullable=false)
     */
    private $modifiedDate;


}
