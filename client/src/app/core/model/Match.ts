import { Kill } from "./Kill";
import { Participant } from "./Participant";

export interface Match {
    matchId: string;
    gameMode: string;
    gameDuration: number;
    participants: Participant[];
    kills: Kill[];
}
