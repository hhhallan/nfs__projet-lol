import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertMsToMinutesSeconds'
})
export class ConvertMsToMinutesSecondsPipe implements PipeTransform {

  transform(value: number): string {
    const minutes = Math.floor(value / 60000);
    const seconds = Math.round((value % 60000) / 1000);
    return seconds === 60
    ? `${minutes + 1}:00`
    : `${minutes}:${this.padTo2Digits(seconds)}`;
  }

  private padTo2Digits(number: number): string {
    return number.toString().padStart(2, '0');
  }
}
