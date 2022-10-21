import { Pipe, PipeTransform } from '@angular/core';
import { padTo2Digits } from '../utils/padTo2Digits';

@Pipe({
  name: 'convertMsToMinutesSeconds'
})
export class ConvertMsToMinutesSecondsPipe implements PipeTransform {

  transform(value: number): string {
    const minutes = Math.floor(value / 60000);
    const seconds = Math.round((value % 60000) / 1000);
    return seconds === 60
    ? `${minutes + 1}:00`
    : `${minutes}:${padTo2Digits(seconds)}`;
  }
}
