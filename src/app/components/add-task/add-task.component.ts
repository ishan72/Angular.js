import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../TaskInterface';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text: string = '';
  day: string = '';
  reminder: boolean = false;

  subscription: Subscription;
  showAddTask: boolean = false;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  handleAddForm() {
    if (this.text === '' && this.day === '') {
      alert('Fill the text and day field.');
    }
    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };
    this.onAddTask.emit(newTask);
  }
}
