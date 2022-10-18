<?php

namespace App\Controller\API;

use App\Repository\GameRepository;
use App\Repository\GameTimelineRepository;
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

    public function __construct(
        FormatService $formatServices,
        GameRepository $gameRepo,
        GameTimelineRepository $gameTimelineRepo
    ) {
        $this->formatServices   = $formatServices;
        $this->gameRepo         = $gameRepo;
        $this->gameTimelineRepo = $gameTimelineRepo;
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

    // /**
    //  * @Route("/get-games-timeline", name="get_games_timeline", methods={"GET"})
    //  */
    // public function getGamesTimeline(): JsonResponse
    // {
    //     $gamesTimeline = $this->gameTimelineRepo->findAll();
    //     // $gamesTimeline = $this->gameTimelineRepo->findOneBy(['id'=>1]);

    //     // $g = $this->formatServices->cleanMatchTimeline($gamesTimeline->getContent(), []);


    //     return $this->json($gamesTimeline);
    // }
}
