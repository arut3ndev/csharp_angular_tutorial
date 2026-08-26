public class TaskItem
{
    public int Id { get; set; }
    public string Title { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime CreatedAt { get; set; }

    public TaskItem()
    {
        Id = 0;
        Title = string.Empty;
        IsCompleted = false;
        CreatedAt = DateTime.Now;
    }

    public TaskItem(int id, string title, bool isCompleted, DateTime createdAt)
    {
        Id = id;
        Title = title;
        IsCompleted = isCompleted;
        CreatedAt = createdAt;
    }
}