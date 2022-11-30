import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Summoner } from 'src/app/core/model/Summoner';
import { GameService } from './game.service';

describe('Test game service', () => {
    let service: GameService;

    beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
            ],
        }).compileComponents();
        service = TestBed.inject(GameService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('Should be return a summoner puuid valid', (done) => {
        const pattern: RegExp = new RegExp('^[a-zA-Z0-9_-]{78}$');
        service.getSummonerByName('gob pxxl').subscribe();
        service.summoner$.subscribe((summoner: Summoner) => {
            if (summoner) {
                expect(summoner.puuid).toMatch(pattern);
                done();
            }
        });
    });
});
