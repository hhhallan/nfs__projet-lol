export interface Participant {
    championId: number;
    championName: string;
    summonerName: string;
    image: string;
    kills: number;
    deaths: number;
    assists: number;
    lane: string;
    puuid: string;
    teamId: number;
    participantId: number;
    win: boolean;
}
