import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskService } from '../../services/task';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Task } from '../../models/task';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-or-edit-task',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './create-or-edit-task.html',
  styleUrl: './create-or-edit-task.css',
})
export class CreateOrEditTask implements OnInit {
  private readonly taskService = inject(TaskService);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly taskId = signal<string | null>(null);
  readonly form = this.formBuilder.group({
    name: ['', Validators.required],
    isDone: [false, Validators.required]
  });

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const task = await this.taskService.getTask(id);
      this.taskId.set(id);
      this.form.patchValue(task);
    }
  }

  createOrEdit() {
    const task = this.form.getRawValue() as Task;

    if (this.taskId()) {
      task.id = this.taskId()!;
      this.taskService.editTask(task);
    } else {
      this.taskService.createTask(task);
      this.router.navigateByUrl('');
    }
  }
}