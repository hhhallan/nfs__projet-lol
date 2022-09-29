<?php

namespace App\Services;

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

    public function formatGame(array $game) {
        $formattedGame = [];

        $formattedGame['summoners'] = $game['metadata']['participants'];
        $formattedGame['gameDuration'] = $game['info']['gameDuration'];
        $formattedGame['gameMode'] = $game['info']['gameMode'];

        foreach ($game as $key1 => $value1) {
            if ($key1 === 'info') {
                foreach ($value1 as $key2 => $value2) {
                    if ($key2 === 'participants') {
                        foreach ($value2 as $key3 => $value3) {
                            $formattedGame['participants'][$key3] = $this->formatArray(['championId', 'championName', 'kills', 'deaths', 'assists', 'lane', 'puuid', 'teamId'], $value3);
                        }
                    }
                }
            }
        }

        return $formattedGame;
    }
}
