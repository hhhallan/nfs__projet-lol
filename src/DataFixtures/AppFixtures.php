<?php

namespace App\DataFixtures;

use App\Entity\Game;
use App\Entity\GameTimeline;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class AppFixtures extends Fixture
{
    private ParameterBagInterface $parameterBag;

    private HttpClientInterface $client;

    public function __construct(
        ParameterBagInterface $parameterBag,
        HttpClientInterface $client
    ) {
        $this->parameterBag = $parameterBag;
        $this->client       = $client;
    }

    public function load(ObjectManager $manager): void
    {
        $apiKey = $this->parameterBag->get('api_key');
        
        $summonerName = $this->parameterBag->get('summoner_name');

        $sumByNameUrl = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' . $summonerName . '?api_key=' . $apiKey;

        $getSumByNameResp = $this->client->request('GET', $sumByNameUrl);

        $puuid = json_decode($getSumByNameResp->getContent(), true)['puuid'];

        usleep(500);

        $getMatchByPuuidUrl = 'https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/' . $puuid . '/ids?start=0&count=20&api_key=' . $apiKey;

        $getMatchByPuuidResp = $this->client->request('GET', $getMatchByPuuidUrl);

        $lastMatches = json_decode($getMatchByPuuidResp->getContent(), true);

        usleep(500);

        for ($k = 0; $k < sizeof($lastMatches); $k++) { 
            $getMatchByIdUrl = 'https://europe.api.riotgames.com/lol/match/v5/matches/' . $lastMatches[$k] . '?api_key=' . $apiKey;
            $getMatchByIdResp = $this->client->request('GET', $getMatchByIdUrl);
            $game = (new Game())
                ->setContent(json_decode($getMatchByIdResp->getContent(), true));
            $manager->persist($game);

            usleep(100);

            $getMatchTimelineByIdUrl = 'https://europe.api.riotgames.com/lol/match/v5/matches/' . $lastMatches[$k] . '/timeline?api_key=' . $apiKey;
            $getMatchTimelineByIdResp = $this->client->request('GET', $getMatchTimelineByIdUrl);
            $gameTimeline = (new GameTimeline())
                ->setContent(json_decode($getMatchTimelineByIdResp->getContent(), true));
            $manager->persist($gameTimeline);
        }

        $manager->flush(); 
    }
}
