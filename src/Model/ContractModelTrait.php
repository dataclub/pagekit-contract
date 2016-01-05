<?php

namespace Pagekit\Contract\Model;

use Pagekit\Application as App;
use Pagekit\Database\ORM\ModelTrait;

trait ContractModelTrait
{
    use ModelTrait;

    /**
     * {@inheritdoc}
     */
    public static function updateLogin(Contract $contract)
    {
        static::where(['id' => $contract->id])->update(['date' => date('Y-m-d H:i:s')]);
    }

    /**
     * @Saved
     */
    public static function saved($event, Contract $contract)
    {
        $bla = "";
    }

    /**
     * Get all users who have written an article
     */
    public static function getAuthors()
    {
        return self::query()->select('user_id, @system_user.name, @system_user.username')->groupBy('user_id, @system_user.name')->join('@system_user', 'user_id = @system_user.id')->execute()->fetchAll();
    }

    public static function getMultipleVisits(){
        return [
            self::YES => __('Yes'),
            self::NO => __('No')
        ];
    }

    public static function getParticipations(){
        return [
            self::YES => __('Yes'),
            self::NO => __('No')
        ];
    }

    public static function getRandomID(){
        return self::query()->select('uuid() as uid')->from('@contracts')->execute()->fetchAll()[0]['uid'];
    }
}
