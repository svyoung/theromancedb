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
     * @ORM\Column(name="description", type="text", length=65535, nullable=true)
     */
    private $description;

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
     * @ORM\Column(type="text", nullable=true)
     */
    private $image_url;

    /**
     * @ORM\Column(type="datetime")
     */
    private $modified_date;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $amzn_url;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $gr_url;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getAuthorId(): ?int
    {
        return $this->authorId;
    }

    public function setAuthorId(int $authorId): self
    {
        $this->authorId = $authorId;

        return $this;
    }

    public function getPublicationMonth(): ?int
    {
        return $this->publicationMonth;
    }

    public function setPublicationMonth(int $publicationMonth): self
    {
        $this->publicationMonth = $publicationMonth;

        return $this;
    }

    public function getPublicationYear(): ?int
    {
        return $this->publicationYear;
    }

    public function setPublicationYear(int $publicationYear): self
    {
        $this->publicationYear = $publicationYear;

        return $this;
    }

    public function getPublisherId(): ?int
    {
        return $this->publisherId;
    }

    public function setPublisherId(?int $publisherId): self
    {
        $this->publisherId = $publisherId;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getRating(): ?int
    {
        return $this->rating;
    }

    public function setRating(?int $rating): self
    {
        $this->rating = $rating;

        return $this;
    }

    public function getPageCount(): ?int
    {
        return $this->pageCount;
    }

    public function setPageCount(?int $pageCount): self
    {
        $this->pageCount = $pageCount;

        return $this;
    }

    public function getImageUrl(): ?string
    {
        return $this->image_url;
    }

    public function setImageUrl(?string $image_url): self
    {
        $this->image_url = $image_url;

        return $this;
    }

    public function getModifiedDate(): ?\DateTimeInterface
    {
        return $this->modified_date;
    }

    public function setModifiedDate(\DateTimeInterface $modified_date): self
    {
        $this->modified_date = $modified_date;

        return $this;
    }

    public function getAmznUrl(): ?string
    {
        return $this->amzn_url;
    }

    public function setAmznUrl(?string $amzn_url): self
    {
        $this->amzn_url = $amzn_url;

        return $this;
    }

    public function getGrUrl(): ?string
    {
        return $this->gr_url;
    }

    public function setGrUrl(?string $gr_url): self
    {
        $this->gr_url = $gr_url;

        return $this;
    }


}
