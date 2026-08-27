public class TaskItem
{
    public long Id { get; set; }
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

    public TaskItem(long id, string title)
    {
        Id = id;
        Title = title;
        IsCompleted = false;
        CreatedAt = DateTime.Now;
    }
}