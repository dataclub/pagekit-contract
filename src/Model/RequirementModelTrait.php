<?php

namespace Pagekit\Contract\Model;

use Pagekit\Application as App;
use Pagekit\Database\ORM\ModelTrait;

trait RequirementModelTrait
{
    use ModelTrait;

    /**
     * @Saved
     */
    public static function saved($event, Status $status)
    {
        $bla = "";
    }

    public static function getRequirements()
    {
        $contract_requirement = App::db()->createQueryBuilder()
        ->from('@contract_requirements')
        ->execute('id, name')
        ->fetchAll();

        $requirements = [];
        foreach($contract_requirement as $requirement){
            $requirement = array_values($requirement);
            $requirements[$requirement[0]] = __($requirement[1]);;
        }

        return $requirements;
    }

    /**
     * Insert new added statuses to the contract_status-table
     * @param string $status
     */
    public static function setRequirement($value){
        $requirements = self::getStatuses();
        if(!in_array($value, $requirements)){
            if(App::db()->insert('@contract_requirements', ['name' => $value])){
                return self::query()->select('id')->from('@contract_requirements')->where(['name' => $value])->limit(1)->first()->id;
            }
        }

        return false;
    }

    public static function getFirstStatus(){
        $firstRequirement = self::query()->select('id')->from('@contract_requirements')->limit(1)->first();

        return $firstRequirement == null ? null : $firstRequirement->id;
    }
}
