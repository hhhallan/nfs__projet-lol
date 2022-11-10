<?php

namespace App\Tests\Feature;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class FeatureTestCase extends WebTestCase
{

    public static function getClient()
    {
        return static::createClient();
    }
}
