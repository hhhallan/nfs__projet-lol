<?php

namespace App\Tests;

class Describe
{
    public static $groups = [];

    /**
     * Opens the describe group
     * @param string $name
     * @return void
     */
    public static function openGroup(string $name): void
    {
        self::$groups[] = $name;
    }

    /**
     * Gets the describe group's name
     * @return string
     */
    public static function getGroupName(): string
    {
        $s = "";
        for ($k = 0; $k < sizeof(self::$groups); ++$k) {
            $s .= self::$groups[$k];
            $s .= ' → ';
        }
        return $s;
    }

    /**
     * Close the describe group
     * @return void
     */
    public static function closeGroup(): void
    {
        if (sizeof(self::$groups) === 0) {
            return;
        }
        array_pop(self::$groups);
    }

}
