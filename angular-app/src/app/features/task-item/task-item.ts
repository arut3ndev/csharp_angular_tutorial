import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {TaskItemModel} from './TaskItemModel';
import { TaskItemService } from './TaskItemService';

enum LoadingState {
  DONE,
  LOADING,
  ERROR
}

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem implements OnInit{
  listOfTaskItems: TaskItemModel[] = [];
  loadingState: LoadingState = LoadingState.LOADING;
  readonly LoadingState = LoadingState;
  
  constructor(private taskItemService: TaskItemService) {}

  ngOnInit() {
    this.taskItemService.getAllTasks().subscribe({
      next: (tasks: TaskItemModel[]) => {
        this.listOfTaskItems = tasks;
        this.loadingState = LoadingState.DONE;
      },
      error: (error) => {
        console.error('Error fetching task items:', error);
        this.loadingState = LoadingState.ERROR;
      }
    });
  }
}
