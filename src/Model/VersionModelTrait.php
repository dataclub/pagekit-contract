<?php

namespace Pagekit\Contract\Model;

use Pagekit\Application as App;
use Pagekit\Database\ORM\ModelTrait;

trait VersionModelTrait
{
    use ModelTrait;

    /**
     * @Saved
     */
    public static function saved($event, Version $version)
    {
        $bla = "";
    }

    public static function getVersions()
    {
        $contract_versions = App::db()->createQueryBuilder()
        ->from('@contract_versions')
        ->execute('id, name')
        ->fetchAll();

        $versions = [];
        foreach($contract_versions as $version){
            $version = array_values($version);
            $versions[$version[0]] = __($version[1]);;
        }

        return $versions;
    }

    /**
     * Insert new added versions to the contract_versions-table
     * @param string $version
     */
    public static function setVersion($value){
        $versions = self::getVersions();
        if(!in_array($value, $versions)){
            if(App::db()->insert('@contract_versions', ['name' => $value])){
                return self::query()->select('id')->from('@contract_versions')->where(['name' => $value])->limit(1)->first()->id;
            }
        }

        return false;
    }

    public static function getFirstVersion(){
        return self::query()->select('id')->from('@contract_versions')->limit(1)->first()->id;
    }
}
