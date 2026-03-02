import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { addIcons } from 'ionicons';
import { star } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, NgSwitch, NgSwitchCase, NgSwitchDefault],
})
export class Tab1Page {
  buttonConfig = {
    expand: 'block',
    shape: 'default',
    fill: 'solid',
    size: 'large',
    color: 'primary',
    icon: 'left' // left, right, only, none
  };

  constructor() {
    addIcons({
      star
    });
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
