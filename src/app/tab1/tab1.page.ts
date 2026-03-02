import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  sparklesOutline, 
  settingsOutline, 
  rocketOutline, 
  playOutline, 
  cubeOutline, 
  shieldCheckmarkOutline, 
  analyticsOutline, 
  bulbOutline, 
  speedometerOutline, 
  phonePortraitOutline, 
  lockClosedOutline, 
  chevronForwardOutline, 
  starOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButton, 
    IonIcon
  ]
})
export class Tab1Page implements OnInit {

  constructor() {
    addIcons({
      sparklesOutline,
      settingsOutline,
      rocketOutline,
      playOutline,
      cubeOutline,
      shieldCheckmarkOutline,
      analyticsOutline,
      bulbOutline,
      speedometerOutline,
      phonePortraitOutline,
      lockClosedOutline,
      chevronForwardOutline,
      starOutline
    });
  }

  ngOnInit() {
    this.initCounterAnimation();
    this.initScrollAnimations();
  }

  initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter: Element) => {
      const target = +counter.getAttribute('data-target')!;
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60 FPS
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toLocaleString();
        }
      }, 16);
    };

    // Intersection Observer to trigger animation when in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });

    counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  initScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .stat-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('fade-in-up');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    elements.forEach(element => {
      observer.observe(element);
    });
  }

  handleGetStarted() {
    console.log('Get Started clicked');
    // Add your navigation logic here
  }

  handleWatchDemo() {
    console.log('Watch Demo clicked');
    // Add your video player logic here
  }

  handleLearnMore(feature: string) {
    console.log(`Learn more about ${feature}`);
    // Add your navigation logic here
  }

  handleStartTrial() {
    console.log('Start Free Trial clicked');
    // Add your sign up logic here
  }
}
