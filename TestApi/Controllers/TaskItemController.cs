using Microsoft.AspNetCore.Mvc;

namespace TestApi
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskItemController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetTasks() 
        {
            List<TaskItem> taskItems = new List<TaskItem>();
            TaskItem taskItem = new TaskItem(
                
            )
        }
    }
}
