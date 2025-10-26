﻿namespace TodoApp.Api.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Status { get; set; } = "pending";
        public DateTime Created_At { get; set; } = DateTime.Now;
    }
}
