<?php

namespace Pagekit\Contract\Model;

use Pagekit\Application as App;
use Pagekit\User\Model\User;
use Pagekit\Contract\Model\Status;

/**
 * @Entity(tableClass="@contracts")
 */
class Contract implements \JsonSerializable
{
    use ContractModelTrait;

    /**
     *
     * @var int
     */
    const NO = 0;

    /**
     *
     * @var int
     */
    const YES = 1;

    /** @Column(type="integer") @Id */
    public $id;

    /** @Column(type="string") */
    public $name;

    /** @Column(type="datetime") */
    public $date;

    /** @Column(type="string") */
    public $place;

    /** @Column(type="datetime") */
    public $startDate;

    /** @Column(type="datetime") */
    public $cancellationDate;

    /** @Column(type="integer") */
    public $status_id;

    /** @Column(type="integer") */
    public $version_id;

    /** @Column(type="integer") */
    public $user_id;

    /** @Column(type="integer") */
    public $participated = Contract::NO;
    /** @Column(type="integer") */
    public $visitedMultiple = Contract::NO;


    /**
     * @BelongsTo(targetEntity="Pagekit\User\Model\User", keyFrom="user_id")
     */
    public $user;

    /**
     * @BelongsTo(targetEntity="Pagekit\Contract\Model\Status", keyFrom="status_id")
     * @OrderBy({"id" = "DESC"})
     */
    public $status;

    /**
     * @BelongsTo(targetEntity="Pagekit\Contract\Model\Version", keyFrom="version_id")
     * @OrderBy({"id" = "DESC"})
     */
    public $version;

    /** @var array */
    protected static $properties = [
        'author' => 'getAuthor',
        'state' => 'getStatus',
        'release' => 'getVersion',
    ];

    /**
     * {@inheritdoc}
     */
    public function getId()
    {
        return $this->id;
    }

    public function getStatusText()
    {
        $statuses = Status::getStatuses();
        return isset($statuses[$this->status->name]) ? $statuses[$this->status->name] : __('Unknown');
    }

    public function getVersionText()
    {
        $versions = Version::getVersions();
        return isset($versions[$this->version->name]) ? $versions[$this->version->name] : __('Unknown');
    }

    public function getAuthor()
    {
        return $this->user ? $this->user->username : null;
    }

    public function getStatus(){
        return $this->status ? $this->status->name : null;
    }

    public function getVersion(){
        return $this->version ? $this->version->name : null;
    }

    public function validate($data = null)
    {
        if (($data == null && empty($this->name)) || ($data != null && empty($data['name']))) {
            throw new Exception(__('Name required.'));
        }

        if (($data == null && empty($this->place)) || ($data != null && empty($data['place']))) {
            throw new Exception(__('Place required.'));
        }

        if (($data == null && empty($this->date)) || ($data != null && empty($data['date']))) {
            throw new Exception(__('Date required.'));
        }

        if (($data == null && empty($this->status_id)) || ($data != null && empty($data['status_id']))) {
            throw new Exception(__('Status required.'));
        }

        if (($data == null && empty($this->version_id)) || ($data != null && empty($data['version_id']))) {
            throw new Exception(__('Version required.'));
        }


        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function jsonSerialize()
    {
        return $this->toArray([], ['password', 'activation']);
    }
}
