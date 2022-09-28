<?php

namespace App\Controller\API;

use App\Repository\GameRepository;
use App\Repository\GameTimelineRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api")
 */
class GameController extends AbstractController
{
    private GameRepository $gameRepo;

    private GameTimelineRepository $gameTimelineRepo;

    public function __construct(
        GameRepository $gameRepo,
        GameTimelineRepository $gameTimelineRepo
    ) {
        $this->gameRepo         = $gameRepo;
        $this->gameTimelineRepo = $gameTimelineRepo;
    }

    /**
     * @Route("/get-games", name="get_games", methods={"GET"})
     */
    public function getGames(): JsonResponse
    {
        $games = $this->gameRepo->findAll();
        return $this->json($games);
    }

    /**
     * @Route("/get-games-timeline", name="get_games_timeline", methods={"GET"})
     */
    public function getGamesTimeline(): JsonResponse
    {
        $gamesTimeline = $this->gameTimelineRepo->findAll();
        return $this->json($gamesTimeline);
    }
}
