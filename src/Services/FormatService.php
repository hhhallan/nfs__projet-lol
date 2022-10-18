<?php

namespace App\Services;

use App\Entity\Game;
use App\Entity\GameTimeline;

class FormatService {

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
     * @param Game $game
     */
    public function formatGame(Game $game): array {
        $content = $game->getContent();
        $formattedGame = [];

        $formattedGame['matchId'] = $game->getMatchId();
        $formattedGame['gameMode'] = $content['info']['gameMode'];
        $formattedGame['gameDuration'] = $content['info']['gameDuration'];

        foreach ($content as $key1 => $value1) {
            if ($key1 === 'info') {
                foreach ($value1 as $key2 => $value2) {
                    if ($key2 === 'participants') {
                        foreach ($value2 as $key3 => $value3) {
                            $formattedGame['participants'][$key3] = $this->formatArray(['championId', 'championName', 'kills', 'deaths', 'assists', 'lane', 'puuid', 'teamId'], $value3);
                            $formattedGame['participants'][$key3]['participantId'] = $key3 + 1;
                        }
                    }
                }
            }
        }

        return $formattedGame;
    }

    /**
     * Clean match timeline
     * @param array $arr
     * @param array $newArray
     * @return array
     */
    public function cleanMatchTimeline(array $arr, array $newArray): array {
        $fields = ['killerId', 'position', 'victimId', 'timestamp'];
        foreach ($arr as $key => $value) {
            if (is_array($value)) {
                $newArray = $this->cleanMatchTimeline($value, $newArray);
            } else {
                if ($value === 'CHAMPION_KILL') {
                    $newArray[] = $arr;
                    foreach ($newArray as $k => $v) {
                        foreach ($v as $k1 => $v1) {
                            if (!in_array($k1, $fields)) {
                                unset($newArray[$k][$k1]);
                            }
                        }
                    }
                }
            }
        }
        return $newArray;
    }
}
