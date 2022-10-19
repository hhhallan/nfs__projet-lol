<?php

namespace App\Controller\API;

use App\Entity\Summoner;
use App\Repository\ChampionRepository;
use App\Repository\GameRepository;
use App\Repository\GameTimelineRepository;
use App\Repository\SummonerRepository;
use App\Services\FormatService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api")
 */
class GameController extends AbstractController
{
    private FormatService $formatServices;

    private GameRepository $gameRepo;

    private GameTimelineRepository $gameTimelineRepo;

    private ChampionRepository $championRepo;

    private SummonerRepository $summonerRepo;

    public function __construct(
        FormatService $formatServices,
        GameRepository $gameRepo,
        GameTimelineRepository $gameTimelineRepo,
        ChampionRepository $championRepo,
        SummonerRepository $summonerRepo
    ) {
        $this->formatServices   = $formatServices;
        $this->gameRepo         = $gameRepo;
        $this->gameTimelineRepo = $gameTimelineRepo;
        $this->championRepo     = $championRepo;
        $this->summonerRepo     = $summonerRepo;
    }

    /**
     * @Route("/get-games", name="get_games", methods={"GET"})
     */
    public function getGames(): JsonResponse
    {
        $games = $this->gameRepo->findAll();
        $gamesTimeline = $this->gameTimelineRepo->findAll();

        $formattedGames = [];

        for ($k = 0; $k < sizeof($games); $k++) { 
            $formattedGames[$k] = $this->formatServices->formatGame($games[$k]);
            $formattedGames[$k]['kills'] = $this->formatServices->cleanMatchTimeline($gamesTimeline[$k]->getContent(), []);
        }

        return $this->json($formattedGames);
    }

    /**
     * @Route("/get-game/{id}", name="get_game", methods={"GET"})
     */
    public function getGameById(string $id): JsonResponse
    {
        try {
            $game = $this->gameRepo->findOneBy(['matchId' => $id]);
            $gamesTimeline = $this->gameTimelineRepo->findOneBy(['matchId' => $id]);
            $formattedGame = $this->formatServices->formatGame($game);
            $formattedGame['kills'] = $this->formatServices->cleanMatchTimeline($gamesTimeline->getContent(), []);

            return $this->json($formattedGame);
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    /**
     * @Route("/get-champion/{id}", name="get_champion", methods={"GET"})
     */
    public function getChampion(int $id): JsonResponse
    {
        try {
            $champion = $this->championRepo->findOneBy(['championId' => $id]);

            return $this->json($champion);
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    /**
     * @Route("/get-summoner/{name}", name="get_champion_thumbnail", methods={"GET"})
     */
    public function getSummoner(string $name): JsonResponse
    {
        try {
            $sumonner = $this->summonerRepo->findLikeName($name);
            return $this->json($sumonner);
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }
}
