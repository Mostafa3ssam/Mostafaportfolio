import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mostafa-portfolio';
  loading = true;

  ngAfterViewInit() {
    setTimeout(() => { this.loading = false; }, 600);
    this.bindInteractions();
  }

  private bindInteractions() {
    const header = document.querySelector('.site-header') as HTMLElement;
    const offset = header ? header.offsetHeight : 0;
    const w: any = window as any;
    const jq: any = (w as any)['$'];
    if (!jq) return;
    jq(document).on('click', 'a[href^="#"]', function(this: HTMLElement, e: any) {
      const id = jq(this).attr('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id as string) as HTMLElement;
      if (!target) return;
      e.preventDefault();
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
      jq('html, body').animate({ scrollTop: top }, 500);
    });
    jq(document).on('mouseenter', '.card, .project', function(this: HTMLElement) {
      jq(this).addClass('hovered');
    });
    jq(document).on('mouseleave', '.card, .project', function(this: HTMLElement) {
      jq(this).removeClass('hovered');
    });
    const sections = ['home','about','skills','projects','contact'];
    const anchors = Array.from(document.querySelectorAll('.nav a')) as HTMLAnchorElement[];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          anchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
        }
      });
    }, { threshold: 0.6 });
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
  }
}
