<?php

namespace Pagekit\Contract\Model;

use Pagekit\Application as App;
use Pagekit\Database\ORM\ModelTrait;

trait ContractModelTrait
{
    use ModelTrait;

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

    public static function getRandomSQLID(){
        return self::query()->select('uuid() as uid')->from('@contracts')->execute()->fetchAll()[0]['uid'];
    }
    public static function getRandomID(){

        if (function_exists('com_create_guid')){
            return com_create_guid();
        }else{
            return sprintf( '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
                // 32 bits for "time_low"
                mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ),

                // 16 bits for "time_mid"
                mt_rand( 0, 0xffff ),

                // 16 bits for "time_hi_and_version",
                // four most significant bits holds version number 4
                mt_rand( 0, 0x0fff ) | 0x4000,

                // 16 bits, 8 bits for "clk_seq_hi_res",
                // 8 bits for "clk_seq_low",
                // two most significant bits holds zero and one for variant DCE1.1
                mt_rand( 0, 0x3fff ) | 0x8000,

                // 48 bits for "node"
                mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff )
            );
        }
    }
}
