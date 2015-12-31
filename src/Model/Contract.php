<?php

namespace Pagekit\Contract\Model;

use Pagekit\Application as App;
use Pagekit\User\Model\User;

/**
 * @Entity(tableClass="@contracts")
 */
class Contract implements \JsonSerializable
{
    use ContractModelTrait;

    /**
     * The active status.
     *
     * @var int
     */
    const STATUS_ACTIVE = 1;

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
    public $status_id = Contract::STATUS_ACTIVE;

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

    /** @var array */
    protected static $properties = [
        'author' => 'getAuthor',
        'state' => 'getStatus',
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
        $statuses = self::getStatuses();

        return isset($statuses[$this->status_id]) ? $statuses[$this->status_id] : __('Unknown');
    }

    public function getAuthor()
    {
        return $this->user ? $this->user->username : null;
    }

    public function getStatus(){
        return $this->status ? $this->status->name : null;
    }

    public function validate()
    {
        if (empty($this->name)) {
            throw new Exception(__('Name required.'));
        }

        if (empty($this->place)) {
            throw new Exception(__('Place required.'));
        }

        if (empty($this->date)) {
            throw new Exception(__('Date required.'));
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
