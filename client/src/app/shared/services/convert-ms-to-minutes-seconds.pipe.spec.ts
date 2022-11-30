import { ConvertMsToMinutesSecondsPipe } from './convert-ms-to-minutes-seconds.pipe';

describe('Test ConvertMsToMinutesSecondsPipe pipe', () => {
    let pipe: ConvertMsToMinutesSecondsPipe;

    beforeEach(() => {
        pipe = new ConvertMsToMinutesSecondsPipe();
    });

    it('Should create an instance of ConvertMsToMinutesSecondsPipe', () => {
        expect(pipe).toBeTruthy();
    });

    it('Should be convert digit ms time to string minutes/secondes', () => {
        const ms: number = 224364;
        expect(pipe.transform(ms)).toEqual('3:44');
    });
});
