import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { addIcons } from 'ionicons';
import { star, sunny, moon } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, NgSwitch, NgSwitchCase, NgSwitchDefault],
})
export class Tab2Page implements OnInit {
  buttonConfig = {
    expand: 'block',
    shape: 'default',
    fill: 'solid',
    size: 'large',
    color: 'primary',
    icon: 'left' // left, right, only, none
  };

  isDarkMode = false;

  ngOnInit() {
    // Check initial dark mode preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkMode = prefersDark.matches;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
    document.body.classList.toggle('dark', this.isDarkMode);

    // Listen for system dark mode changes
    prefersDark.addEventListener('change', (mediaQuery) => {
      this.isDarkMode = mediaQuery.matches;
      document.documentElement.classList.toggle('dark', this.isDarkMode);
      document.body.classList.toggle('dark', this.isDarkMode);
    });
  }

  constructor() {
    addIcons({
      star,
      sunny,
      moon
    });
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    console.log('Toggling dark mode:', this.isDarkMode);
    // Add/remove dark class from both document element and body for full compatibility
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    if (this.isDarkMode) {
      htmlElement.classList.add('dark');
      bodyElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
      bodyElement.classList.remove('dark');
    }

    console.log('HTML class list:', htmlElement.classList);
    console.log('Body class list:', bodyElement.classList);
  }

  updateButtonStyle(styleType: string, value: string) {
    this.buttonConfig[styleType as keyof typeof this.buttonConfig] = value;
  }

  getButtonCode(): string {
    const { expand, shape, fill, size, color, icon } = this.buttonConfig;
    let buttonContent = '';

    if (icon === 'left') {
      buttonContent = `<ion-icon slot="start" name="star"></ion-icon>My Button`;
    } else if (icon === 'right') {
      buttonContent = `My Button<ion-icon slot="end" name="star"></ion-icon>`;
    } else if (icon === 'only') {
      buttonContent = `<ion-icon slot="icon-only" name="star"></ion-icon>`;
    } else {
      buttonContent = `My Button`;
    }

    return `<ion-button expand="${expand}" shape="${shape}" fill="${fill}" size="${size}" color="${color}">${buttonContent}</ion-button>`;
  }
}
