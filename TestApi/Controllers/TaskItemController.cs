using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestApi.Data;

namespace TestApi.Controllers;

[ApiController]
[Route("api/tasks")]
public class TaskItemController : ControllerBase
{
    private readonly AppDbContext _dbContext;
    public TaskItemController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTask(long id)
    {
        var getTaskFromDb = await _dbContext.TaskItems.FindAsync(id);

        if (getTaskFromDb == null)
        {
            return NotFound("Kind sir, the item wasn't found in our repository!");
        }   
        return Ok(getTaskFromDb);
    }

    [HttpGet]
    [Route("getAll")]
    public async Task<IActionResult> GetAllTasks() 
    {
        var taskItems = await _dbContext.TaskItems.ToListAsync();
        return Ok(taskItems);
    }

    [HttpPost]
    public async Task<IActionResult> PostTaskItem(TaskItem taskItem)
    {
        _dbContext.TaskItems.Add(taskItem);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction(
            nameof(GetTask),
            new {id = taskItem.Id},
            taskItem
        );
    }

    [HttpPut("{id}")]

    public async Task<IActionResult> PutTaskItem(long id, TaskItem taskItem)
    {
        if(id != taskItem.Id)
        {
            return BadRequest();
        }   

        var getTaskItem = await _dbContext.TaskItems.FindAsync(id);

        if(getTaskItem == null) return NotFound();

        getTaskItem.Title = taskItem.Title;

        try
        {
            await _dbContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException) when (!TaskItemExists(id))
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTaskItem(long id)
    {
        var taskItem = await _dbContext.TaskItems.FindAsync(id);
        if (taskItem == null) return NotFound();
        try
        {
            _dbContext.TaskItems.Remove(taskItem);
            await _dbContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException) when (!TaskItemExists(id))
        {
            return NotFound();
        }

        return NoContent();
    }


    private bool TaskItemExists(long id)
    {
        return _dbContext.TaskItems.Any(e => e.Id == id);
    }
}
