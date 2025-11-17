import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mostafa-portfolio';
  loading = true;
  mobileMenuOpen = false;
  isScrolled = false;
  lastScrollY = 0;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Theme is initialized in ThemeService constructor
  }

  ngAfterViewInit() {
    setTimeout(() => { this.loading = false; }, 600);
    this.bindInteractions();
    this.setupScrollListener();
    this.setupClickOutsideListener();
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  setupScrollListener() {
    let ticking = false;
    
    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      this.isScrolled = currentScrollY > 50;
      
      const header = document.querySelector('.site-header') as HTMLElement;
      if (header) {
        if (this.isScrolled) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
      
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    }, { passive: true });
  }

  setupClickOutsideListener() {
    document.addEventListener('click', (event: Event) => {
      if (!this.mobileMenuOpen) return;
      
      const target = event.target as HTMLElement;
      const mobileMenu = document.querySelector('.mobile-menu');
      const menuToggle = document.querySelector('.mobile-menu-toggle');
      
      if (mobileMenu && menuToggle && 
          !mobileMenu.contains(target) && 
          !menuToggle.contains(target)) {
        this.closeMobileMenu();
      }
    });
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
