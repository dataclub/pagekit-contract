<?php

namespace Pagekit\Contract\Model;

use Pagekit\Application as App;

/**
 * @Entity(tableClass="@contract_versions")
 */
class Version implements \JsonSerializable
{
    use VersionModelTrait;

    /** @Column(type="integer") @Id */
    public $id;

    /** @Column(type="string") */
    public $name;

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
