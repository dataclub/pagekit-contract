<?php

namespace Pagekit\Contract\Model;

use Pagekit\Application as App;

/**
 * @Entity(tableClass="@contract_status")
 */
class Status implements \JsonSerializable
{
    use ContractModelTrait;

    /** @Column(type="integer") @Id */
    public $id;

    /** @Column(type="string") */
    public $name;

    /** @var array */
    protected static $properties = [
    ];

    /**
     * {@inheritdoc}
     */
    public function getId()
    {
        return $this->id;
    }
}
