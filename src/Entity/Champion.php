<?php

namespace App\Entity;

use App\Repository\ChampionRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ChampionRepository::class)
 */
class Champion
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=120)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $imgFull;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $imgSprite;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getImgFull(): ?string
    {
        return $this->imgFull;
    }

    public function setImgFull(?string $imgFull): self
    {
        $this->imgFull = $imgFull;

        return $this;
    }

    public function getImgSprite(): ?string
    {
        return $this->imgSprite;
    }

    public function setImgSprite(?string $imgSprite): self
    {
        $this->imgSprite = $imgSprite;

        return $this;
    }
}
