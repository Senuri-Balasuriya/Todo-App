using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Data;
using TodoApp.Api.Models;

namespace TodoApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly AppDbContext _context;
        public TaskController(AppDbContext context) => _context = context;

        // POST api/task
        [HttpPost]
        public async Task<IActionResult> AddTask(TaskItem task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Task added successfully!" });
        }

        // GET api/task
        [HttpGet]
        public async Task<IActionResult> GetRecentTasks()
        {
            var tasks = await _context.Tasks
                .Where(t => t.Status == "pending")
                .OrderByDescending(t => t.Created_At)
                .Take(5)
                .ToListAsync();

            return Ok(tasks);
        }

        // PUT api/task/{id}/done
        [HttpPut("{id}/done")]
        public async Task<IActionResult> MarkAsDone(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            task.Status = "done";
            await _context.SaveChangesAsync();
            return Ok(new { message = "Task marked as done!" });
        }
    }
}
