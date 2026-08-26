using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestApi.Data;

namespace TestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskItemController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        public TaskItemController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        [Route("GetTasks")]
        public async Task<IActionResult> GetTasks() 
        {
            var taskItems = await _dbContext.TaskItems.ToListAsync();
            return Ok(taskItems);
        }
    }
}
