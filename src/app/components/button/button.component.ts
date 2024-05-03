import { NgStyle } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() text: string | undefined;
  @Input() color: string | undefined;
  @Output() btnClick: EventEmitter<string> = new EventEmitter();

  onButtonClick() {
    this.btnClick.emit();
  }
}
