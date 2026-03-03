import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { sunny, moon } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButton, 
    IonIcon
  ]
})
export class Tab2Page implements OnInit, OnDestroy {
  timeString: string = '';
  dateString: string = '';
  hourHandStyle: string = '';
  minuteHandStyle: string = '';
  secondHandStyle: string = '';
  isDarkMode: boolean = true;
  timer: any;
  timeOfDay: string = 'night'; // morning, afternoon, evening, night
  gradientStyle: string = '';

  constructor() {
    addIcons({
      sunny,
      moon
    });
  }

  ngOnInit() {
    // Initialize dark mode
    document.body.classList.add('dark');
    
    // Set initial time
    this.updateClock();
    
    // Update clock every second
    this.timer = setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  updateClock() {
    const now = new Date();
    
    // Digital clock
    this.timeString = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    
    this.dateString = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Determine time of day
    this.updateTimeOfDay(now.getHours());

    // Analog clock
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourDegrees = (hours * 30) + (minutes / 2);
    const minuteDegrees = (minutes * 6) + (seconds / 10);
    const secondDegrees = seconds * 6;

    this.hourHandStyle = `rotate(${hourDegrees}deg)`;
    this.minuteHandStyle = `rotate(${minuteDegrees}deg)`;
    this.secondHandStyle = `rotate(${secondDegrees}deg)`;
  }

  updateTimeOfDay(hours: number) {
    if (hours >= 5 && hours < 12) {
      this.timeOfDay = 'Morning';
      this.gradientStyle = 'linear-gradient(135deg, #ff9a56 0%, #ff6a3c 50%, #ff4757 100%)'; // Sunrise colors
    } else if (hours >= 12 && hours < 17) {
      this.timeOfDay = 'Afternoon';
      this.gradientStyle = 'linear-gradient(135deg, #ffcc00 0%, #ff9900 50%, #ff6600 100%)'; // Afternoon sky
    } else if (hours >= 17 && hours < 21) {
      this.timeOfDay = 'Evening';
      this.gradientStyle = 'linear-gradient(135deg, #ff6b6b 0%, #ffa502 50%, #ff4757 100%)'; // Sunset colors
    } else {
      this.timeOfDay = 'Night';
      this.gradientStyle = 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'; // Night sky
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}
