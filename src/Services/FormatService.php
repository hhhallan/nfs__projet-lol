<?php

namespace App\Services;

use App\Repository\ChampionRepository;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class FormatService {
    /**
     * @var ChampionRepository $championRepo
     */
    private ChampionRepository $championRepo;

    /**
     * @var ParameterBagInterface
     */
    private ParameterBagInterface $parameterBag;

    /**
     * @var string
     */
    private string $defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg';

    public function __construct(
        ChampionRepository $championRepo,
        ParameterBagInterface $parameterBag
    )
    {
        $this->championRepo = $championRepo;
        $this->parameterBag = $parameterBag;
    }

    /**
     * Return new array with expected keys form array
     * @param array $expectedKeys // => ex : ['key1', 'key2', ...]
     * @param array $array
     * @return array
     */
    public function formatArray(array $expectedKeys, array $array): array {
        $arrK = array_keys($array);
        $arrV = array_values($array);
        $newArray = [];
        foreach ($expectedKeys as $key) {
            for ($k = 0; $k < sizeof($array); $k++) { 
                if ($arrK[$k] === $key) {
                    $newArray[$key] = $arrV[$k];
                }
            }
        }
        return $newArray;
    }

    /**
     * Format match
     * @param array $game
     * @return array
     */
    public function formatMatch(array $game): array {
        $formattedGame = [];
        $formattedGame['matchId'] = $game['metadata']['matchId'];
        $formattedGame['gameMode'] = $game['info']['gameMode'];
        $formattedGame['gameDuration'] = $game['info']['gameDuration'];
        $formattedGame['totalKills'] = 0;
        $formattedGame['totalAssists'] = 0;
        $formattedGame['totalDeaths'] = 0;
        foreach ($game as $key1 => $value1) {
            if ($key1 === 'info') {
                foreach ($value1 as $key2 => $value2) {
                    if ($key2 === 'participants') {
                        foreach ($value2 as $key3 => $value3) {
                            $formattedGame['participants'][$key3] = $this->formatArray(['championId', 'championName', 'kills', 'deaths', 'assists', 'lane', 'puuid', 'teamId', 'participantId', 'win'], $value3);
                            $formattedGame['participants'][$key3]['image'] = $this->championRepo->findOneBy(['championId' => $value3['championId']]) !== null ? $this->championRepo->findOneBy(['championId' => $value3['championId']])->getImage() : $this->defaultImage;
                            $formattedGame['totalKills'] += intval($value3['kills']);
                            $formattedGame['totalAssists'] += intval($value3['assists']);
                            $formattedGame['totalDeaths'] += intval($value3['deaths']);
                        }
                    }
                }
            }
        }
        return $formattedGame;
    }

    /**
     * Get image of participant champion by his id
     * @param array $participants 
     * @param int $participantId 
     * @return mixed 
     */
    private function getImageByParticipantId(array $participants, int $participantId) {
        foreach ($participants as $key => $value) {
            foreach ($value as $key1 => $value1) {
                if ($key1 === 'participantId') {
                    if ($value1 === $participantId) {
                        return $value['image'];
                    }
                }
            }
        }
    }

    /**
     * Format match timeline
     * @param array $array
     * @param array $newArray
     * @return array
     */
    public function formatMatchTimeline(array $array, array $participants, array $newArray): array {
        $expectedKeys = ['killerId', 'position', 'victimId', 'timestamp'];
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $newArray = $this->formatMatchTimeline($value, $participants, $newArray);
            } else {
                if ($value === 'CHAMPION_KILL') {
                    $newArray[] = $array;
                    foreach ($newArray as $k => $v) {
                        foreach ($v as $k1 => $v1) {
                            if (!in_array($k1, $expectedKeys)) {
                                unset($newArray[$k][$k1]);
                            }
                            // dd($participants);
                            $newArray[$k]['killerImage'] = $this->getImageByParticipantId($participants, $v['killerId']) ?? $participants[0]['image'];
                            $newArray[$k]['victimImage'] = $this->getImageByParticipantId($participants, $v['victimId']) ?? $participants[0]['image'];
                        }
                    }
                }
            }
        }
        return $newArray;
    }
}
