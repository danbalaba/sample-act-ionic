import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, calculatorOutline, bookOutline } from 'ionicons/icons';
import { NgIf, NgFor } from '@angular/common';

interface HistoryItem {
  expression: string;
  result: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, NgIf, NgFor]
})
export class Tab3Page {
  currentValue: string = '0';
  expression: string = '';
  previousValue: string = '';
  operator: string | null = null;
  shouldResetDisplay: boolean = false;
  history: HistoryItem[] = [];
  memoryValue: number | null = null;

  constructor() {
    addIcons({
      'trash-outline': trashOutline,
      'calculator-outline': calculatorOutline,
      'book-outline': bookOutline
    });
  }

  // Clear all values
  clear() {
    this.currentValue = '0';
    this.expression = '';
    this.previousValue = '';
    this.operator = null;
    this.shouldResetDisplay = false;
  }

  // Clear entry
  clearEntry() {
    this.currentValue = '0';
  }

  // Toggle positive/negative sign
  toggleSign() {
    if (this.currentValue === '0') return;
    this.currentValue = this.currentValue.startsWith('-') 
      ? this.currentValue.slice(1) 
      : '-' + this.currentValue;
  }

  // Calculate percentage
  percentage() {
    const value = parseFloat(this.currentValue);
    this.currentValue = (value / 100).toString();
  }

  // Memory functions
  memoryClear() {
    this.memoryValue = null;
  }

  memoryRecall() {
    if (this.memoryValue !== null) {
      this.currentValue = this.memoryValue.toString();
      this.shouldResetDisplay = false;
    }
  }

  memoryAdd() {
    const value = parseFloat(this.currentValue);
    if (this.memoryValue === null) {
      this.memoryValue = value;
    } else {
      this.memoryValue += value;
    }
  }

  memorySubtract() {
    const value = parseFloat(this.currentValue);
    if (this.memoryValue === null) {
      this.memoryValue = -value;
    } else {
      this.memoryValue -= value;
    }
  }

  // Clear history
  clearHistory() {
    this.history = [];
  }

  // Append number to display
  appendNumber(num: string) {
    if (this.shouldResetDisplay) {
      this.currentValue = num;
      this.shouldResetDisplay = false;
    } else {
      if (this.currentValue === '0' && num !== '.') {
        this.currentValue = num;
      } else {
        if (this.currentValue === '0' && num === '0') {
          return;
        }
        this.currentValue += num;
      }
    }
  }

  // Append decimal point
  appendDecimal() {
    if (this.shouldResetDisplay) {
      this.currentValue = '0.';
      this.shouldResetDisplay = false;
    } else {
      if (!this.currentValue.includes('.')) {
        this.currentValue += '.';
      }
    }
  }

  // Append operator
  appendOperator(op: string) {
    if (this.operator && !this.shouldResetDisplay) {
      this.calculate();
    }

    this.operator = op;
    this.previousValue = this.currentValue;
    this.expression = `${this.currentValue} ${this.getOperatorSymbol(op)}`;
    this.shouldResetDisplay = true;
  }

  // Calculate result
  calculate() {
    if (!this.operator || !this.previousValue) return;

    const prev = parseFloat(this.previousValue);
    const curr = parseFloat(this.currentValue);
    let result: number;

    switch (this.operator) {
      case '+':
        result = prev + curr;
        break;
      case '-':
        result = prev - curr;
        break;
      case '*':
        result = prev * curr;
        break;
      case '/':
        if (curr === 0) {
          this.currentValue = 'Error';
          this.operator = null;
          this.previousValue = '';
          this.expression = '';
          this.shouldResetDisplay = true;
          return;
        }
        result = prev / curr;
        break;
      default:
        return;
    }

    const resultStr = Number.isInteger(result) ? result.toString() : result.toFixed(6).replace(/\.?0*$/, '');
    
    const fullExpression = `${this.expression} ${this.currentValue}`;
    this.history.unshift({
      expression: fullExpression,
      result: resultStr
    });

    if (this.history.length > 10) {
      this.history = this.history.slice(0, 10);
    }

    this.currentValue = resultStr;
    this.expression = fullExpression;
    this.previousValue = '';
    this.operator = null;
    this.shouldResetDisplay = true;
  }

  // Get operator symbol for display
  getOperatorSymbol(op: string): string {
    switch (op) {
      case '+':
        return '+';
      case '-':
        return '−';
      case '*':
        return '×';
      case '/':
        return '÷';
      default:
        return op;
    }
  }
}
