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
        return Status::query()->execute()->fetchAll();
    }

    /**
     * Insert new added statuses to the contract_statuses-table
     * @param string $status
     */
    public static function setStatus($value){
        $statuses = self::getStatuses();
        if(!in_array($value, $statuses)){
            if(App::db()->insert('@contract_statuses', ['name' => $value])){
                return self::query()->select('id')->from('@contract_statuses')->where(['name' => $value])->limit(1)->first()->id;
            }
        }

        return false;
    }

    public static function getFirstStatus(){
        $firstStatus = self::query()->select('id')->from('@contract_statuses')->limit(1)->first();

        return $firstStatus == null ? null : $firstStatus->id;
    }
}
