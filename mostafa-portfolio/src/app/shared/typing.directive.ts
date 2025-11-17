import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTyping]'
})
export class TypingDirective implements OnInit {
  @Input() typingSpeed: number = 100;
  @Input() typingDelay: number = 500;
  @Input() loop: boolean = false;
  
  private originalText: string = '';

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.originalText = this.element.nativeElement.textContent.trim();
    this.startTyping();
  }

  private startTyping() {
    this.element.nativeElement.textContent = '';
    this.typeText(0);
  }

  private typeText(index: number) {
    if (index < this.originalText.length) {
      this.element.nativeElement.textContent += this.originalText.charAt(index);
      setTimeout(() => this.typeText(index + 1), this.typingSpeed);
    } else if (this.loop) {
      setTimeout(() => this.startTyping(), this.typingDelay);
    }
  }
}