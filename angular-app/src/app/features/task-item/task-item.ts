import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
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
  listOfTaskItems: TaskItemModel[] = [];
  loadingState: LoadingState = LoadingState.LOADING;
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
  console.log('refresh() called');

  this.loadingState = LoadingState.LOADING;

  this.taskItemService.getAllTasks().subscribe({
    next: (tasks: TaskItemModel[]) => {
      this.listOfTaskItems = tasks;
      this.loadingState = LoadingState.DONE;

      console.log('STATE:', this.loadingState);
      console.log('DONE:', LoadingState.DONE);
    },

    error: (error) => {
      console.log('ERROR:', error);

      this.loadingState = LoadingState.ERROR;
    },

    complete: () => {
      console.log('REQUEST COMPLETE');
    }
  });
}

  onSubmit(){
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
}
