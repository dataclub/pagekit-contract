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
        return Version::query()->execute()->fetchAll();
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
        $firstVersion = self::query()->select('id')->from('@contract_versions')->limit(1)->first();

        return $firstVersion == null ? null : $firstVersion->id;
    }
}
