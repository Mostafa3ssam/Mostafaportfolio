import { Directive, ElementRef, Input, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInView]'
})
export class InViewDirective implements OnInit, OnDestroy {
  @Input() inViewDelay = 0;
  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2, private zone: NgZone) {}

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'reveal');
    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => this.el.nativeElement.classList.add('in-view'), this.inViewDelay);
          }
        });
      }, { threshold: 0.15 });
      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}