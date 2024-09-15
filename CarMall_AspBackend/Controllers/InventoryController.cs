using carManagement.Models;
using carManagement.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace carManagement.Controllers
{
    //[ApiController]
    [Route("/api/inventory")]
    public class InventoryController : ControllerBase
    {
        private readonly InventoryService _inventoryService;

        public InventoryController(InventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }

        // GET: api/inventory
        [HttpGet("Allinventories")]
        public ActionResult<IEnumerable<Inventory>> GetAllInventory()
        {
            var inventories = _inventoryService.GetAllInventory();
            return Ok(inventories);
        }

        // GET: api/inventory/{id}
        [HttpGet("{id}")]
        public ActionResult<Inventory> GetInventoryById(int id)
        {
            try
            {
                var inventory = _inventoryService.GetInventoryById(id);
                return Ok(inventory);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        // POST: api/inventory
        [HttpPost]
        public ActionResult<Inventory> CreateInventory([FromBody] Inventory inventory)
        {
            if (inventory == null)
            {
                return BadRequest("Inventory object is null");
            }

            _inventoryService.CreateInventory(inventory);
            return CreatedAtAction(nameof(GetInventoryById), new { id = inventory.InventoryId }, inventory);
        }

        // PUT: api/inventory/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateInventory(int id, [FromBody] Inventory inventory)
        {
            if (inventory == null || inventory.InventoryId != id)
            {
                return BadRequest("Inventory object is null or ID mismatch");
            }

            try
            {
                _inventoryService.UpdateInventory(inventory);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }


        // DELETE: api/inventory/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteInventory(int id)
        {
            try
            {
                _inventoryService.DeleteInventory(id);
                return NoContent();  // NoContent status code indicates that the request was successful but there's no content to return.
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}
