using Microsoft.AspNetCore.Mvc;

namespace Pipmon
{
    public class WorldController : Controller
    {
        [HttpGet("world/data")]
        public IActionResult Get()
        {
            var coordinates = new List<WorldCoordinate>
            {
                new WorldCoordinate(0, 0, "grass"),
                new WorldCoordinate(1, 0, "grass"),
                new WorldCoordinate(0, 1, "grass"),
                new WorldCoordinate(1, 1, "water"),
                new WorldCoordinate(2, 0, "grass"),
            };

            return Ok(coordinates);
        }
    }
}