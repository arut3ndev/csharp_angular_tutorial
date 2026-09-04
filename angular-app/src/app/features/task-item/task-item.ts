import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal} from '@angular/core';
import { TaskItemModel } from './TaskItemModel';
import { TaskItemService } from './TaskItemService';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

enum LoadingState {
  DONE,
  LOADING,
  ERROR
}

@Component({
  selector: 'app-task-item',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem implements OnInit{
  listOfTaskItems = signal<TaskItemModel[]>([]);
  loadingState = signal<LoadingState>(LoadingState.DONE);
  readonly LoadingState = LoadingState;
  refreshCounter: number = 0;

  taskForm = new FormGroup({
    title : new FormControl(
      'title',
       [Validators.required, Validators.minLength(2)])
  })
  
  constructor(private taskItemService: TaskItemService) {}

  ngOnInit() : void {
    this.refresh();
  }

  refresh(): void {
  this.loadingState.set(LoadingState.LOADING);
  this.taskItemService.getAllTasks().subscribe({
    next: (tasks: TaskItemModel[]) => {
      this.listOfTaskItems.set(tasks);
      this.loadingState.set(LoadingState.DONE);
    },
    error: (error) => {
      console.log('ERROR:', error);
    }
  });
}

  onSubmit(): void{
    if (!this.taskForm.valid) return;
    const title = this.taskForm.get('title')?.value!;
    const newTask = new TaskItemModel(0, title, false, new Date());
    this.taskItemService.postTaskItem(newTask).subscribe({
      next: (task) => {
        this.refresh();
      },
      error: (error) => {
        alert("error adding item: " + error);
      }
    })
  }

  onToggleChange(taskItem: TaskItemModel, event: Event) : void{
    const checkboxState = (event.target as HTMLInputElement).checked;
    taskItem.isComplete = checkboxState;
    this.taskItemService.putTaskItem(taskItem).subscribe({
      next: (task) => {
        this.refresh();
      },
      error: (error) => {
        alert("error updating item: " + error);
      }
    })
  }

  onDeleteClick(taskItem: TaskItemModel) : void {
    const taskId = taskItem.id;
    this.taskItemService.deleteTaskItem(taskId).subscribe({
      next: () => {
        this.refresh();
      },
      error: (error) => {
        alert("error deleting item: " + error);
      }
    })
  }
}
