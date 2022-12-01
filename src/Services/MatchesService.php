<?php

namespace App\Services;

use App\Repository\GameRepository;
use App\Repository\GameTimelineRepository;
use Exception;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;

class MatchesService
{
    /**
     * @var string $apiKey
     */
    private string $apiKey;

    /**
     * @var ParameterBagInterface $parameterBag
     */
    private ParameterBagInterface $parameterBag;

    /**
     * @var HttpClientInterface $client
     */
    private HttpClientInterface $client;

    /**
     * @var FormatService $formatServices
     */
    private FormatService $formatServices;

    /**
     * @var GameRepository $gameRepo
     */
    private GameRepository $gameRepo;
    
    /**
     * @var GameTimelineRepository $gameTimelineRepo
     */
    private GameTimelineRepository $gameTimelineRepo;
    
    public function __construct(
        ParameterBagInterface $parameterBag,
        HttpClientInterface $client,
        FormatService $formatServices,
        GameRepository $gameRepo,
        GameTimelineRepository $gameTimelineRepo
    ) {
        $this->parameterBag     = $parameterBag;
        $this->apiKey           = $this->parameterBag->get('api_key');
        $this->client           = $client;
        $this->formatServices   = $formatServices;
        $this->gameRepo         = $gameRepo;
        $this->gameTimelineRepo = $gameTimelineRepo;
    }

    /**
     * Fetch summoner by summoner name
     * @param string $name
     * @return array
     */
    public function getSummonerByName(string $name): array
    {
        $summoners = $this->client->request(
            'GET',
            'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' . $name . '?api_key=' . $this->apiKey
        );
        return json_decode($summoners->getContent(), true);
    }

    /**
     * Fetch summoner name by puuid
     * @param string $puuid 
     * @return string 
     * @throws TransportExceptionInterface 
     * @throws RedirectionExceptionInterface 
     * @throws ClientExceptionInterface 
     * @throws ServerExceptionInterface 
     * @throws Exception 
     */
    private function getSummonerNameByPuuid(string $puuid): string{
        $summoner = json_decode($this->client->request('GET', 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/' . $puuid . '?api_key=' . $this->apiKey)->getContent(), true);
        if (!$summoner) {
            throw new Exception('Une erreur est survenue');
        }
        return $summoner['name'];
    }

    /**
     * Fetch a last matches id
     * @param $puuid
     * @return array
     */
    private function getLastMatchesId(string $puuid): array
    {
        $response = $this->client->request(
            'GET',
            'https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/' . $puuid . '/ids?start=0&count=20&api_key=' . $this->apiKey
        );
        return json_decode($response->getContent(), true);
    }

    /**
     * Fetch a last 8 CLASSIC matches by summoner puuid
     * @param string $puuid
     * @return array
     */
    public function getGamesByPuuid(string $puuid): array
    {
        $lastMatchesIdsResponse = $this->getLastMatchesId($puuid);
        $games = [];
        for ($k = 0; $k < (sizeof($lastMatchesIdsResponse) == 20 ? 8 : sizeof($lastMatchesIdsResponse)); $k++) { 
            $tmpResponse[$k] = json_decode($this->client->request('GET', 'https://europe.api.riotgames.com/lol/match/v5/matches/' . $lastMatchesIdsResponse[$k] . '?api_key=' . $this->apiKey)->getContent(), true);
            if (isset($tmpResponse[$k]['info']['gameMode']) && $tmpResponse[$k]['info']['gameMode'] === 'CLASSIC') {
                $games[] = $tmpResponse[$k];
            }
        }
        $formattedGames = [];
        for ($j= 0; $j < sizeof($games); $j++) { 
            $formattedGames[$j] = $this->formatServices->formatMatch($games[$j]);
        }
        return $formattedGames;
    }

    /**
     * Fetch all matches
     * @return array
     */
    public function getGames(): array
    {
        $games = $this->gameRepo->findAll();
        $gamesTimeline = $this->gameTimelineRepo->findAll();
        $formattedGames = [];
        for ($k = 0; $k < sizeof($games); $k++) { 
            $formattedGames[$k] = $this->formatServices->formatMatch($games[$k]->getContent());
            $formattedGames[$k]['kills'] = $this->formatServices->formatMatchTimeline($gamesTimeline[$k]->getContent(), $formattedGames[$k]['participants'], []);
        }
        return $formattedGames;
    }

    /**
     * Fetch match and match timeline by match id and return formatted array
     * @param string $matchId
     * @return array
     */
    public function getGameById(string $matchId): array
    {
        $game = json_decode($this->client->request('GET', 'https://europe.api.riotgames.com/lol/match/v5/matches/' . $matchId . '?api_key=' . $this->apiKey)->getContent(), true);
        $gameTimeline = json_decode($this->client->request('GET', 'https://europe.api.riotgames.com/lol/match/v5/matches/' . $matchId . '/timeline?api_key=' . $this->apiKey)->getContent(), true);
        $formattedGame = $this->formatServices->formatMatch($game);
        foreach ($formattedGame['participants'] as $key => $value) {
            $formattedGame['participants'][$key]['summonerName'] = $this->getSummonerNameByPuuid($value['puuid']);
        }
        $formattedGame['kills'] = $this->formatServices->formatMatchTimeline($gameTimeline, $formattedGame['participants'], []);
        return $formattedGame;
    }
}
