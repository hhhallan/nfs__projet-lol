import { Pipe, PipeTransform } from '@angular/core';
import { padTo2Digits } from '../utils/padTo2Digits';

@Pipe({
  name: 'convertSecondsToMinutesSeconds'
})
export class ConvertSecondsToMinutesSecondsPipe implements PipeTransform {

  transform(value: number): string {
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;
    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  }
}
