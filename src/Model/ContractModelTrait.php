<?php

namespace Pagekit\Contract\Model;

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
     * {@inheritdoc}
     */
    public static function updateAccess(Contract $contract)
    {
        static::where(['id' => $contract->id])->update(['access' => date('Y-m-d H:i:s')]);
    }

    /**
     * @Saved
     */
    public static function saved($event, Contract $contract)
    {
        if (!$contract->hasRole(Role::ROLE_AUTHENTICATED)) {
            $contract->roles[] = Role::ROLE_AUTHENTICATED;
        }
    }

    /**
     * Get all users who have written an article
     */
    public static function getAuthors()
    {
        return self::query()->select('user_id', 'name', 'username')->groupBy('user_id', 'name')->join('@system_user', 'user_id = @system_user.id')->execute()->fetchAll();
    }

    public static function getStatuses()
    {
        return [
            self::STATUS_ACTIVE => __('Active'),
            self::STATUS_BLOCKED => __('Blocked')
        ];
    }
}
