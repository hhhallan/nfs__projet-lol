import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  /**
   * Return responsive x point
   * @param {number} baseValue 
   * @returns {number}
   */
  toX(baseValue: number): number {
    return baseValue * 0.06;
  }

  /**
   * Return responsive y point
   * @param {number} baseValue 
   * @returns {number}
   */
  toY(baseValue: number): number {
    return 900 - (baseValue * 0.06);
  }
}
