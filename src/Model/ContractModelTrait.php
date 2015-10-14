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
        static::where(['id' => $contract->id])->update(['login' => date('Y-m-d H:i:s')]);
    }

    /**
     * {@inheritdoc}
     */
    public static function updateAccess(Contract $contract)
    {
        static::where(['id' => $contract->id])->update(['access' => date('Y-m-d H:i:s')]);
    }

    /**
     * Finds user's roles.
     *
     * @param  Contract $contract
     * @return Role[]
     */
    public static function findRoles(Contract $contract)
    {
        static $cached = [];

        if ($ids = array_diff($contract->roles, array_keys($cached))) {
            $cached += Role::where('id IN ('.implode(',', $contract->roles).')')->get();
        }

        return array_intersect_key($cached, array_flip($contract->roles));
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
}
