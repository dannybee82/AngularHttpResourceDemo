import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollerService {

  private _scrollervisible: ReplaySubject<boolean>;

  constructor() {
    this._scrollervisible = new ReplaySubject<boolean>(0);
  }

   setScrollervisible(value: boolean) : void {
    this._scrollervisible.next(value);   
  }
  
  getScrollervisible() : ReplaySubject<boolean> {
    return this._scrollervisible;
  }

}