<?php

namespace App\UnitTest\Tests;

use App\Services\FormatService;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class FormatMatchTest extends KernelTestCase
{
    public function testEnvironment(): void
    {
        $kernel = self::bootKernel();

        $this->assertSame('test', $kernel->getEnvironment(), 'fjsldfjl');
    }

    public function testGetInstanceOfFormatService(): void
    {
        $formatService = static::getContainer()->get(FormatService::class);

        $this->assertTrue($formatService instanceof FormatService);
    }

    public function testFormattedMatchHasKeys(): void
    {
        $formatService = static::getContainer()->get(FormatService::class);
        $json = file_get_contents(__DIR__ . '/../Data/match.json', true);
        $array = json_decode($json, true);
        $formattedMatch = $formatService->formatMatch($array);

        $this->assertArrayHasKey('matchId', $formattedMatch);
        $this->assertArrayHasKey('gameMode', $formattedMatch);
        $this->assertArrayHasKey('totalKills', $formattedMatch);
        $this->assertArrayHasKey('totalAssists', $formattedMatch);
        $this->assertArrayHasKey('totalDeaths', $formattedMatch);
        $this->assertArrayHasKey('participants', $formattedMatch);
    }
}
