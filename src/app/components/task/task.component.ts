import { Component } from '@angular/core';
import { Task } from '../../TaskInterface';
import { TaskService } from '../../services/task.service';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgStyle,
    NgClass,
    AddTaskComponent,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  task: Task[] = [];
  faTimes = faTimes;
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getServerTask();
  }

  getServerTask() {
    this.taskService.getTasks().subscribe((tasks) => (this.task = tasks));
  }

  onDeleteClick(task: Task) {
    this.taskService.deleteTasks(task).subscribe(() => this.getServerTask());
  }
  onDoubleClick(task: Task) {
    task.reminder = !task.reminder;
    this.taskService
      .onToggleReminder(task)
      .subscribe(() => this.getServerTask());
  }

  addTask(newTask: Task) {
    const payload: Task = {
      id: this.task.length + 1,
      text: newTask.text,
      day: newTask.day,
      reminder: newTask.reminder,
    };
    this.taskService.onAddItem(payload).subscribe(() => this.getServerTask());
  }
}
