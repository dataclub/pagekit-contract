<?php

namespace Pagekit\Contract\Model;

use Pagekit\Application as App;

/**
 * @Entity(tableClass="@contract_statuses")
 */
class Status implements \JsonSerializable
{
    use StatusModelTrait;

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
