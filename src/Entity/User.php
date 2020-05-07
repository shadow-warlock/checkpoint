<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     */
    private $email;


    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Serializer\Exclude()
     */
    private $password;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Zone", mappedBy="admin", orphanRemoval=true)
     * @Serializer\Exclude()
     */
    private $zones;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Employee", mappedBy="admin")
     * @Serializer\Exclude()
     */
    private $employees;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Camera", mappedBy="admin")
     * @Serializer\Exclude()
     */
    private $cameras;

    public function __construct()
    {
        $this->zones = new ArrayCollection();
        $this->employees = new ArrayCollection();
        $this->cameras = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }


    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection|Zone[]
     */
    public function getZones(): Collection
    {
        return $this->zones;
    }

    public function addZone(Zone $area): self
    {
        if (!$this->zones->contains($area)) {
            $this->zones[] = $area;
            $area->setAdmin($this);
        }

        return $this;
    }

    public function removeZone(Zone $area): self
    {
        if ($this->zones->contains($area)) {
            $this->zones->removeElement($area);
            // set the owning side to null (unless already changed)
            if ($area->getAdmin() === $this) {
                $area->setAdmin(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Employee[]
     */
    public function getEmployees(): Collection
    {
        return $this->employees;
    }

    public function addEmployee(Employee $employee): self
    {
        if (!$this->employees->contains($employee)) {
            $this->employees[] = $employee;
            $employee->setAdmin($this);
        }

        return $this;
    }

    public function removeEmployee(Employee $employee): self
    {
        if ($this->employees->contains($employee)) {
            $this->employees->removeElement($employee);
            // set the owning side to null (unless already changed)
            if ($employee->getAdmin() === $this) {
                $employee->setAdmin(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Camera[]
     */
    public function getCameras(): Collection
    {
        return $this->cameras;
    }

    public function addCamera(Camera $camera): self
    {
        if (!$this->cameras->contains($camera)) {
            $this->cameras[] = $camera;
            $camera->setAdmin($this);
        }

        return $this;
    }

    public function removeCamera(Camera $camera): self
    {
        if ($this->cameras->contains($camera)) {
            $this->cameras->removeElement($camera);
            // set the owning side to null (unless already changed)
            if ($camera->getAdmin() === $this) {
                $camera->setAdmin(null);
            }
        }

        return $this;
    }
}
