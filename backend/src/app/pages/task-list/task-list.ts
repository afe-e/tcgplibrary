import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task';
import { RouterModule } from '@angular/router';
import { Unsubscribe } from '@firebase/messaging/sw';

@Component({
  selector: 'app-task-list',
  imports: [RouterModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit, OnDestroy {
  private readonly taskService = inject(TaskService);
  readonly tasks = signal<Task[]>([]);
  private watchTasksUnsubscribe: Unsubscribe | null = null;

  async ngOnInit() {
    this.watchTasksUnsubscribe = this.taskService.watchTasks(this.tasks);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  ngOnDestroy(): void {
    this.watchTasksUnsubscribe?.();
  }
}
