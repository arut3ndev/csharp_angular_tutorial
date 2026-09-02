export class TaskItemModel {
    id: number;
    title: string;
    isComplete: boolean;
    createdAt: Date;

    constructor(id: number, title: string, isComplete: boolean, createdAt: Date) {
        this.id = id;
        this.title = title;
        this.isComplete = isComplete;
        this.createdAt = createdAt;
    }
}   