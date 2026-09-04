import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { TaskItemModel } from "./TaskItemModel";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class TaskItemService {
    httpClient : HttpClient = inject(HttpClient)
    private readonly apiUrl : string = 'http://localhost:8080/api/taskItem';

    getAllTasks() : Observable<TaskItemModel[]> {
        return this.httpClient.get<TaskItemModel[]>(this.apiUrl);
    }

    postTaskItem(task: TaskItemModel): Observable<TaskItemModel> {
    return this.httpClient.post<TaskItemModel>(this.apiUrl, task);
    }
    
    putTaskItem(task: TaskItemModel): Observable<TaskItemModel> {
      return this.httpClient.put<TaskItemModel>(`${this.apiUrl}/${task.id}`, task);
    }

    deleteTaskItem(taskId: number): Observable<void> {
      return this.httpClient.delete<void>(`${this.apiUrl}/${taskId}`);
    }
      
}