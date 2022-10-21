<?php

namespace App\Controller\API;

use App\Repository\ChampionRepository;
use App\Repository\SummonerRepository;
use App\Controller\AbstractApiController;
use App\Services\MatchesService;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @Route("/api/v1")
 */
class GameController extends AbstractApiController
{
    /**
     * @var MatchesService $matchesService
     */
    private MatchesService $matchesService;

    /**
     * @var ChampionRepository $championRepo
     */
    private ChampionRepository $championRepo;

    /**
     * @var SummonerRepository $summonerRepo
     */
    private SummonerRepository $summonerRepo;

    public function __construct(
        MatchesService $matchesService,
        ChampionRepository $championRepo,
        SummonerRepository $summonerRepo
    ) {
        $this->matchesService   = $matchesService;
        $this->championRepo     = $championRepo;
        $this->summonerRepo     = $summonerRepo;
    }

    /**
     * @Route("/summoners/by-name/{name}", methods={"GET"})
     */
    public function getSummonerByName(string $name): JsonResponse
    {
        try {
            $summoners = $this->matchesService->getSummonerByName($name);
            return $this->json($summoners);
        } catch (\Throwable $th) {
            return $this->failure($th->getMessage());
        }
    }

    /**
     * @Route("/matches/by-puuid/{puuid}", methods={"GET"})
     */
    public function getGamesByPuuid(string $puuid): JsonResponse
    {
        try {
            $games = $this->matchesService->getGamesByPuuid($puuid);
            return $this->json($games);
        } catch (\Throwable $th) {
            return $this->failure($th->getMessage());
        }
    }

    /**
     * @Route("/matches", methods={"GET"})
     */
    public function getGames(): JsonResponse
    {
        try {
            $games = $this->matchesService->getGames();
            return $this->json($games);
        } catch (\Throwable $th) {
            return $this->failure($th->getMessage());
        }
    }

    /**
     * @Route("/match/{matchId}", methods={"GET"})
     */
    public function getGameById(string $matchId): JsonResponse
    {
        try {
            $game = $this->matchesService->getGameById($matchId);
            return $this->json($game);
        } catch (\Throwable $th) {
            return $this->failure($th->getMessage());
        }
    }

    /**
     * @Route("/champion/{championId}", methods={"GET"})
     */
    public function getChampion(int $championId): JsonResponse
    {
        try {
            return $this->json($this->championRepo->findOneBy(['championId' => $championId]));
        } catch (\Throwable $th) {
            return $this->failure($th->getMessage());
        }
    }

    /**
     * @Route("/champions", methods={"GET"})
     */
    public function getChampions(int $championId): JsonResponse
    {
        try {
            return $this->json($this->championRepo->findAll());
        } catch (\Throwable $th) {
            return $this->failure($th->getMessage());
        }
    }

    /**
     * @Route("/summoner/{summonerName}", methods={"GET"})
     */
    public function getSummoner(string $summonerName): JsonResponse
    {
        try {
            return $this->json($this->summonerRepo->findLikeName($summonerName));
        } catch (\Throwable $th) {
            return $this->failure($th->getMessage());
        }
    }
}
