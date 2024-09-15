using carManagement.Models;
using carManagement.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace carManagement.Controllers
{
    [ApiController]
    [Route("api/cars")]
    public class CarController : ControllerBase
    {
        private readonly CarService _carService;

        public CarController(CarService carService)
        {
            _carService = carService;
        }

        // GET: api/car
        [HttpGet("Allcars")]
        public ActionResult<IEnumerable<Car>> GetAllCars()
        {
            var cars = _carService.GetAllCars();
            return Ok(cars);
        }

        // GET: api/car/{id}
        [HttpGet("{id}")]
        public ActionResult<Car> GetCarById(int id)
        {
            try
            {
                var car = _carService.GetCarById(id);
                return Ok(car);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        // POST: api/car
        [HttpPost]
        public ActionResult<Car> CreateCar([FromBody] Car car)
        {
            if (car == null)
            {
                return BadRequest("Car object is null");
            }

            _carService.CreateCar(car);
            return CreatedAtAction(nameof(GetCarById), new { id = car.CarId }, car);
        }

        // PUT: api/car/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateCar(int id, [FromBody] Car car)
        {
            if (car == null || car.CarId != id)
            {
                return BadRequest("Car object is null or ID mismatch");
            }

            try
            {
                _carService.UpdateCar(car);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        // DELETE: api/car/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteCar(int id)
        {
            try
            {
                _carService.DeleteCar(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}
