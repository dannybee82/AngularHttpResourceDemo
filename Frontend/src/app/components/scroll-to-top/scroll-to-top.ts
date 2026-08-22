import { Component, HostListener, WritableSignal, signal } from '@angular/core';
import { Scroller } from '../../services/scroller/scroller';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.html',
  styleUrls: ['./scroll-to-top.scss'],
  standalone: true,
  imports: [
    MatIconModule
  ]
})
export class ScrollToTop {

  isVisible: WritableSignal<boolean> = signal(false);

  private max: number = 0;  

  constructor(private scrollerService: Scroller) {
    this.max = document.documentElement.scrollHeight;

    this.scrollerService.getScrollervisible().subscribe((result) => {
      this.isVisible.set(result);

      if(!this.isVisible()) {
        const scrollElement = document.getElementById("scroll-to-top-element");        

        if(scrollElement != undefined) {
          this.scrollToTop();
        }
      }
    });
  }

  @HostListener("window:scroll")
  onWindowScroll() : void {
    let pos: number = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    this.isVisible.set((pos - this.max > 1.0) ? true : false);
  }

  scrollToTop() : void {
    scroll(0, 0);
      this.isVisible.set(false);
  }

  scroll() : void {  
    const scrollElement = document.getElementById("scroll-to-top-element");    

    if(scrollElement != undefined) {
      scrollElement.style.visibility = 'visible';    
    } 
  }

}