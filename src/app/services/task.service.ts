import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer, of } from 'rxjs';
import { Task } from '../TaskInterface';
import { TASK } from '../mock-task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTasks(item: Task): Observable<Task> {
    const url = `${this.apiUrl}/${item.id}`;
    return this.http.delete<Task>(url);
  }

  onToggleReminder(item: Task): Observable<Task> {
    const url = `${this.apiUrl}/${item.id}`;
    return this.http.put<Task>(url, item, httpOptions);
  }

  onAddItem(item: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, item, httpOptions);
  }
}
