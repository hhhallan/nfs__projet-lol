import { Kill } from "./Kill";
import { Participant } from "./Participant";

export interface MatchDetails {
    matchId: string;
    gameMode: string;
    gameDuration: number;
    totalKills: number;
    totalAssists: number;
    totalDeaths: number;
    participants: Participant[];
    kills: Kill[];
}
