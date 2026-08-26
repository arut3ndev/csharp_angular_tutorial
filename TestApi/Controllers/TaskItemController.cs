using Microsoft.AspNetCore.Mvc;

namespace TestApi
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskItemController : ControllerBase
    {
        [HttpGet]
        [Route("GetTasks")]
        public IActionResult GetTasks() 
        {
            List<TaskItem> taskItems = new List<TaskItem>();
            TaskItem taskItem = new TaskItem(
                1,
                "Sample Task",
                false,
                DateTime.Now
            );
            TaskItem taskItem2 = new TaskItem(
                2,
                "Sample Task 2",
                true,
                DateTime.Today.AddDays(-1)
            );
            taskItems.Add(taskItem);
            taskItems.Add(taskItem2);
            return Ok(taskItems);
        }
    }
}
