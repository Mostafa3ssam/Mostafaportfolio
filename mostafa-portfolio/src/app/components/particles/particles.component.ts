import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-particles',
  template: '<canvas class="particles-canvas"></canvas>',
  styleUrls: ['./particles.component.scss']
})
export class ParticlesComponent implements OnInit, AfterViewInit {
  private canvas: HTMLCanvasElement | undefined;
  private ctx: CanvasRenderingContext2D | undefined;
  private particles: any[] = [];
  private particleCount = 50;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.canvas = this.elementRef.nativeElement.querySelector('.particles-canvas');
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d')!;
      this.setupCanvas();
      this.initParticles();
      this.animate();
    }
  }

  private setupCanvas(): void {
    if (!this.canvas) return;
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
      if (this.canvas) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      }
    });
  }

  private initParticles(): void {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * (this.canvas?.width || 0),
        y: Math.random() * (this.canvas?.height || 0),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  private animate(): void {
    if (!this.ctx || !this.canvas) return;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      if (particle.x < 0 || particle.x > this.canvas!.width) particle.vx = -particle.vx;
      if (particle.y < 0 || particle.y > this.canvas!.height) particle.vy = -particle.vy;
      
      this.ctx!.beginPath();
      this.ctx!.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx!.fillStyle = `rgba(34, 211, 238, ${particle.opacity})`;
      this.ctx!.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}