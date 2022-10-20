<?php

namespace App\Services;

use App\Repository\GameRepository;
use App\Repository\ChampionRepository;
use App\Repository\SummonerRepository;
use App\Repository\GameTimelineRepository;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

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
     * @var SummonerRepository $summonerRepo
     */
    private SummonerRepository $summonerRepo;

    /**
     * @var GameRepository $gameRepo
     */
    private GameRepository $gameRepo;
    
    /**
     * @var GameTimelineRepository $gameTimelineRepo
     */
    private GameTimelineRepository $gameTimelineRepo;
    
    /**
     * @var ChampionRepository $championRepo
     */
    private ChampionRepository $championRepo;

    public function __construct(
        ParameterBagInterface $parameterBag,
        HttpClientInterface $client,
        FormatService $formatServices,
        SummonerRepository $summonerRepo,
        GameRepository $gameRepo,
        GameTimelineRepository $gameTimelineRepo,
        ChampionRepository $championRepo
    ) {
        $this->parameterBag     = $parameterBag;
        $this->apiKey           = $this->parameterBag->get('api_key');
        $this->client           = $client;
        $this->formatServices   = $formatServices;
        $this->summonerRepo     = $summonerRepo;
        $this->gameRepo         = $gameRepo;
        $this->gameTimelineRepo = $gameTimelineRepo;
        $this->championRepo     = $championRepo;
    }

    public function getSummonerByName(string $name): array
    {
        $summoners = $this->client->request(
            'GET',
            'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' . $name . '?api_key=' . $this->apiKey
        );
        return json_decode($summoners->getContent(), true);
    }

    public function getGamesByPuuid(string $puuid)
    {
        $lastMatchesIds = $this->client->request(
            'GET',
            'https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/' . $puuid . '/ids?start=0&count=20&api_key=' . $this->apiKey
        );
        $lastMatchesIdsResponse = json_decode($lastMatchesIds->getContent(), true);

        if (!$lastMatchesIdsResponse) {
            throw new \Exception('Une erreur est survenue pendant la récupération des matches');
        }

        $games = [];

        for ($k = 0; $k < (sizeof($lastMatchesIdsResponse) == 20 ? 8 : sizeof($lastMatchesIdsResponse)); $k++) { 
            $tmpResp[$k] = json_decode($this->client->request('GET', 'https://europe.api.riotgames.com/lol/match/v5/matches/' . $lastMatchesIdsResponse[$k] . '?api_key=' . $this->apiKey)->getContent(), true);
            if (isset($tmpResp[$k]['info']['gameMode']) && $tmpResp[$k]['info']['gameMode'] === 'CLASSIC') {
                $games[] = $tmpResp[$k];
            }
        }

        $formattedGames = [];
        
        for ($j= 0; $j < sizeof($games); $j++) { 
            $formattedGames[$j] = $this->formatServices->formatMatch($games[$j]);
        }

        return $formattedGames;
    }

    public function getGames(): array
    {
        $games = $this->gameRepo->findAll();
        $gamesTimeline = $this->gameTimelineRepo->findAll();

        $formattedGames = [];

        for ($k = 0; $k < sizeof($games); $k++) { 
            $formattedGames[$k] = $this->formatServices->formatMatch($games[$k]->getContent());
            $formattedGames[$k]['kills'] = $this->formatServices->formatMatchTimeline($gamesTimeline[$k]->getContent(), []);
        }
        return $formattedGames;
    }

    public function getGameById(string $matchId): array
    {
        // $game = $this->gameRepo->findOneBy(['matchId' => $matchId]);
        $game = json_decode($this->client->request('GET', 'https://europe.api.riotgames.com/lol/match/v5/matches/' . $matchId . '?api_key=' . $this->apiKey)->getContent(), true);
        // $gameTimeline = $this->gameTimelineRepo->findOneBy(['matchId' => $matchId]);
        $gameTimeline = json_decode($this->client->request('GET', 'https://europe.api.riotgames.com/lol/match/v5/matches/' . $matchId . '/timeline?api_key=' . $this->apiKey)->getContent(), true);

        $formattedGame = $this->formatServices->formatMatch($game);
        $formattedGame['kills'] = $this->formatServices->formatMatchTimeline($gameTimeline, []);

        return $formattedGame;
    }
}
