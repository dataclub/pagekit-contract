<?php

namespace Pagekit\Contract\Model;

use Pagekit\Application as App;

/**
 * @Entity(tableClass="@contract_requirements")
 */
class Requirement implements \JsonSerializable
{
    use RequirementModelTrait;

    /** @Column(type="integer") @Id */
    public $id;

    /** @Column(type="string") */
    public $name;

    /** @Column(type="integer") */
    public $priority;

    /** @var array */
    protected static $properties = [];

    /**
     * {@inheritdoc}
     */
    public function getId()
    {
        return $this->id;
    }
}
