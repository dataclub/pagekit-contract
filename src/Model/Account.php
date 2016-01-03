<?php

namespace Pagekit\Contract\Model;

use Pagekit\Application as App;
use Pagekit\User\Model\User;

/**
 * @Entity(tableClass="@contract_accounts")
 */
class Account implements \JsonSerializable
{
    use AccountModelTrait;

    /** @Column(type="integer") @Id */
    public $id;

    /** @Column(type="datetime") */
    public $date;

    /** @Column(type="string") */
    public $first_name;

    /** @Column(type="string") */
    public $last_name;

    /** @Column(type="string") */
    public $phone;

    /** @Column(type="string") */
    public $mobile;

    /** @Column(type="string") */
    public $postal_code;

    /** @Column(type="string") */
    public $city;

    /** @Column(type="string") */
    public $street;

    /** @Column(type="string") */
    public $customer_number;



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

        return isset($statuses[$this->status->name]) ? $statuses[$this->status->name] : __('Unknown');
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
        if (empty($this->first_name)) {
            throw new Exception(__('Firstname required.'));
        }

        if (empty($this->last_name)) {
            throw new Exception(__('Lastname required.'));
        }

        if (empty($this->phone) || empty($this->mobile)) {
            throw new Exception(__('Phone or Mobile required.'));
        }

        if (empty($this->postal_code)) {
            throw new Exception(__('Postalcode required.'));
        }

        if (empty($this->city)) {
            throw new Exception(__('City required.'));
        }

        if (empty($this->street)) {
            throw new Exception(__('Street required.'));
        }

        if (empty($this->customer_number)) {
            throw new Exception(__('Customer-number required.'));
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
