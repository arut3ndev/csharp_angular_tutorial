using Microsoft.EntityFrameworkCore;

namespace TestApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }

    public DbSet<TaskItem> TaskItems => Set<TaskItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TaskItem>().HasData(
            new TaskItem
            {
                Id = 1,
                Title = "Sample Task",
                IsCompleted = false,
                CreatedAt = DateTime.Now
            },
            new TaskItem
            {
                Id = 2,
                Title = "Sample Task 2",
                IsCompleted = true,
                CreatedAt = DateTime.Today.AddDays(-1)
            }
        );
    }
}