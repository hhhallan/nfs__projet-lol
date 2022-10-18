<?php

namespace App\DataFixtures;

use App\Entity\Champion;
use App\Entity\Game;
use App\Entity\GameTimeline;
use App\Entity\Summoner;
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

        // Champions

        $championsResp = $this->client->request('GET', 'https://ddragon.leagueoflegends.com/cdn/12.18.1/data/fr_FR/champion.json');

        $champions = json_decode($championsResp->getContent(), true);

        $imgBaseUrl = 'https://ddragon.leagueoflegends.com/cdn/12.18.1/img/champion/';

        foreach ($champions as $key => $value) {
            if ($key === 'data') {
                foreach ($value as $k => $v) {
                    $champion = (new Champion())
                        ->setChampionId($v['key'])
                        ->setName($v['name'])
                        ->setImage($v['image']['full'] !== null ? $imgBaseUrl . $v['image']['full'] : null);
                    $manager->persist($champion);           
                }
            }
        }

        // \>

        // Get summoner by name

        $summonerNames = ['goodguacamole'];
   
        foreach ($summonerNames as $summonerName) {
            $sumByNameUrl = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' . str_replace(' ', '%20', $summonerName) . '?api_key=' . $apiKey;
    
            $getSumByNameResp = $this->client->request('GET', $sumByNameUrl);

            $summonerInfos = json_decode($getSumByNameResp->getContent(), true);

            $summoner = (new Summoner())
                ->setPuuid($summonerInfos['puuid'])
                ->setName($summonerInfos['name'])
                ->setAccountId($summonerInfos['accountId'])
                ->setProfileIconId($summonerInfos['profileIconId'])
                ->setRevisionDate($summonerInfos['revisionDate'])
                ->setSummonerLevel($summonerInfos['summonerLevel']);

            $manager->persist($summoner);
    
            sleep(1);

            // \>

            // Get last matchs by puuid

            $getMatchByPuuidUrl = 'https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/' . $summonerInfos['puuid'] . '/ids?start=0&count=20&api_key=' . $apiKey;
    
            $getMatchByPuuidResp = $this->client->request('GET', $getMatchByPuuidUrl);
    
            $lastMatches = json_decode($getMatchByPuuidResp->getContent(), true);
    
            sleep(1);

            // \>

            // Get matchs et matchs timeline by match id

            for ($k = 0; $k < sizeof($lastMatches); $k++) { 
                $getMatchByIdUrl = 'https://europe.api.riotgames.com/lol/match/v5/matches/' . $lastMatches[$k] . '?api_key=' . $apiKey;
                
                $getMatchByIdResp = $this->client->request('GET', $getMatchByIdUrl);

                $game = (new Game())
                    ->setMatchId($lastMatches[$k])
                    ->setContent(json_decode($getMatchByIdResp->getContent(), true));

                $manager->persist($game);
    
                sleep(1);
    
                $getMatchTimelineByIdUrl = 'https://europe.api.riotgames.com/lol/match/v5/matches/' . $lastMatches[$k] . '/timeline?api_key=' . $apiKey;
                
                $getMatchTimelineByIdResp = $this->client->request('GET', $getMatchTimelineByIdUrl);

                $gameTimeline = (new GameTimeline())
                    ->setMatchId($lastMatches[$k])
                    ->setContent(json_decode($getMatchTimelineByIdResp->getContent(), true));

                $manager->persist($gameTimeline);

                sleep(1);
            }

            // \>

        } // \foreach>

        $manager->flush();
    } 
}
