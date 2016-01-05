<?php

namespace Pagekit\Contract\Model;

use Pagekit\Application as App;
use Pagekit\Database\ORM\ModelTrait;

trait StatusModelTrait
{
    use ModelTrait;

    /**
     * @Saved
     */
    public static function saved($event, Status $status)
    {
        $bla = "";
    }

    public static function getStatuses()
    {
        $contract_status = App::db()->createQueryBuilder()
        ->from('@contract_status')
        ->execute('id, name')
        ->fetchAll();

        $statuses = [];
        foreach($contract_status as $status){
            $status = array_values($status);
            $statuses[$status[0]] = __($status[1]);;
        }

        return $statuses;
    }

    /**
     * Insert new added statuses to the contract_status-table
     * @param string $status
     */
    public static function setStatus($value){
        $statuses = self::getStatuses();
        if(!in_array($value, $statuses)){
            if(App::db()->insert('@contract_status', ['name' => $value])){
                return self::query()->select('id')->from('@contract_status')->where(['name' => $value])->limit(1)->first()->id;
            }
        }

        return false;
    }

    public static function getFirstStatus(){
        return self::query()->select('id')->from('@contract_status')->limit(1)->first()->id;
    }
}
