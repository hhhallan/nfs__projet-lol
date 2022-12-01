import { Position } from "./Position";

export interface Kill {
    killerId: number;
    position: Position;
    timestamp: number;
    victimId: number;
    killerImage: string;
    victimImage: string;
    killerSummonerName: string;
    victimSummonerName: string;
}
