using carManagement.Interface;
using carManagement.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace carManagement.Controllers
{
    //[ApiController]
    [Route("/api/order")]
    public class OrderController : ControllerBase
    {
        private readonly IOrder _orderService;

        public OrderController(IOrder orderService)
        {
            _orderService = orderService;
        }

        // GET: api/order
        [HttpGet("Allorders")]
        public ActionResult<IEnumerable<Order>> GetAllOrders()
        {
            var orders = _orderService.GetAllOrders();
            return Ok(orders);
        }

        // GET: api/order/{id}
        [HttpGet("{id}")]
        public ActionResult<Order> GetOrderById(int id)
        {
            try
            {
                var order = _orderService.GetOrderById(id);
                return Ok(order);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        // POST: api/order
        [HttpPost]
        public ActionResult<Order> PlaceOrder([FromBody] OrderRequest orderRequest)
        {
            if (orderRequest == null)
            {
                return BadRequest("Order request object is null");
            }

            try
            {
                var order = _orderService.PlaceOrder(
                    orderRequest.CarId,
                    orderRequest.UserId,
                    orderRequest.BranchId,
                    orderRequest.StartDate,
                    orderRequest.EndDate,
                    orderRequest.IsPurchase
                );
                return CreatedAtAction(nameof(GetOrderById), new { id = order.OrderId }, order);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // PUT: api/order/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateOrder(int id, [FromBody] Order order)
        {
            if (order == null || order.OrderId != id)
            {
                return BadRequest("Order object is null or ID mismatch");
            }

            try
            {
                var updatedOrder = _orderService.UpdateOrder(id, order);
                return Ok(updatedOrder);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // DELETE: api/order/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            try
            {
                _orderService.DeleteOrder(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}
