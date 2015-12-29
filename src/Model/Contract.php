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

    /* Post draft status. */
    const STATUS_DRAFT = 0;

    /* Post pending review status. */
    const STATUS_PENDING_REVIEW = 1;

    /* Post published. */
    const STATUS_PUBLISHED = 2;

    /* Post unpublished. */
    const STATUS_UNPUBLISHED = 3;

    /**
     * The blocked status.
     *
     * @var int
     */
    const STATUS_BLOCKED = 0;

    /**
     * The active status.
     *
     * @var int
     */
    const STATUS_ACTIVE = 1;

    /** @Column(type="integer") @Id */
    public $id;

    /** @Column(type="string")  */
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
    public $status = Contract::STATUS_ACTIVE;

    /** @Column(type="integer") */
    public $user_id;

    /**
     * @BelongsTo(targetEntity="Pagekit\User\Model\User", keyFrom="user_id")
     */
    public $user;

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

        return isset($statuses[$this->status]) ? $statuses[$this->status] : __('Unknown');
    }




    /**
     * Check if the user is active.
     *
     * @return bool
     */
    public function isActive()
    {
        return $this->status == self::STATUS_ACTIVE;
    }

    /**
     * Check if the user is blocked.
     *
     * @return bool
     */
    public function isBlocked()
    {
        return $this->status == self::STATUS_BLOCKED;
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
