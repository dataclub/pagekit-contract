<?php

namespace Pagekit\Contract\Model;

use Pagekit\Application as App;

/**
 * @Entity(tableClass="@contract_status")
 */
class Contract implements \JsonSerializable
{
    use ContractModelTrait;

    /** @Column(type="integer") @Id */
    public $id;

    /** @Column(type="string") */
    public $name;


    /**
     * {@inheritdoc}
     */
    public function getId()
    {
        return $this->id;
    }
}
