<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EmployeeRepository")
 */
class Employee
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $position;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Face", mappedBy="employee", orphanRemoval=true)
     */
    private $faces;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Zone", mappedBy="employees")
     * @Serializer\Exclude()
     */
    private $areas;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="employees")
     * @ORM\JoinColumn(nullable=true)
     */
    private $admin;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Visit", mappedBy="employee")
     * @Serializer\Exclude()
     */
    private $visits;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Visit")
     */
    private $lastVisits;



    public function __construct()
    {
        $this->faces = new ArrayCollection();
        $this->areas = new ArrayCollection();
        $this->visits = new ArrayCollection();
        $this->lastVisits = new ArrayCollection();
    }

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

    public function getPosition(): ?string
    {
        return $this->position;
    }

    public function setPosition(string $position): self
    {
        $this->position = $position;

        return $this;
    }

    /**
     * @return Collection|Face[]
     */
    public function getFaces(): Collection
    {
        return $this->faces;
    }

    public function addFace(Face $face): self
    {
        if (!$this->faces->contains($face)) {
            $this->faces[] = $face;
            $face->setEmployee($this);
        }

        return $this;
    }

    public function removeFace(Face $face): self
    {
        if ($this->faces->contains($face)) {
            $this->faces->removeElement($face);
            // set the owning side to null (unless already changed)
            if ($face->getEmployee() === $this) {
                $face->setEmployee(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Zone[]
     */
    public function getAreas(): Collection
    {
        return $this->areas;
    }

    public function addArea(Zone $area): self
    {
        if (!$this->areas->contains($area)) {
            $this->areas[] = $area;
            $area->addEmployee($this);
        }

        return $this;
    }

    public function removeArea(Zone $area): self
    {
        if ($this->areas->contains($area)) {
            $this->areas->removeElement($area);
            $area->removeEmployee($this);
        }

        return $this;
    }

    public function getAdmin(): ?User
    {
        return $this->admin;
    }

    public function setAdmin(?User $admin): self
    {
        $this->admin = $admin;

        return $this;
    }

    /**
     * @return Collection|Visit[]
     */
    public function getVisits(): Collection
    {
        return $this->visits;
    }

    public function addVisit(Visit $visit): self
    {
        if (!$this->visits->contains($visit)) {
            $this->visits[] = $visit;
            $visit->setEmployee($this);
        }

        return $this;
    }

    public function removeVisit(Visit $visit): self
    {
        if ($this->visits->contains($visit)) {
            $this->visits->removeElement($visit);
            // set the owning side to null (unless already changed)
            if ($visit->getEmployee() === $this) {
                $visit->setEmployee(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Visit[]
     */
    public function getLastVisits(): Collection
    {
        return $this->lastVisits;
    }

    public function addLastVisit(Visit $lastVisit): self
    {
        if (!$this->lastVisits->contains($lastVisit)) {
            $this->lastVisits[] = $lastVisit;
        }

        return $this;
    }

    public function removeLastVisit(Visit $lastVisit): self
    {
        if ($this->lastVisits->contains($lastVisit)) {
            $this->lastVisits->removeElement($lastVisit);
        }

        return $this;
    }

}
