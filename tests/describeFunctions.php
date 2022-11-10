<?php
// WARNING : DO NOT FORGET TO ADD THIS FILE IN COMPOSER.JSON -> AUTOLOAD-DEV -> FILES []

use Pest\PendingObjects\TestCall;
use Pest\Exceptions\InvalidPestCommand;
use Pest\Exceptions\ShouldNotHappen;
use App\Tests\Describe;

if (!function_exists('describe')) {
    /**
     * Implementation of the describe method in Pest
     * @param string $name
     * @param Closure $expression
     * @return void
     */
    function describe(string $name, \Closure $expression)
    {
        Describe::openGroup($name);
        $expression();
        Describe::closeGroup();
    }
}

/**
 * Implementation of an it compatible with the new describe method
 * @param string $name
 * @param Closure $expression
 * @return TestCall
 * @throws InvalidPestCommand
 * @throws ShouldNotHappen
 */
function iit(string $name, Closure $expression)
{
    $groupName = Describe::getGroupName();

    return it(chr(8) . chr(8) .  chr(8) . $groupName . $name, $expression)->group(...Describe::$groups);
}
