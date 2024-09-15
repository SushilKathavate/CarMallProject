using carManagement.Data;
using carManagement.Interface;
using carManagement.Models;
using System.Collections.Generic;
using System.Linq;

namespace carManagement.Services
{
    public class CarService : ICar
    {
        private readonly ApplicationDbContext _context;

        public CarService(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Car> GetAllCars()
        {
            return _context.Car.ToList();
        }

        public Car GetCarById(int id)
        {
            var car = _context.Car.Find(id);
            if (car == null)
            {
                throw new KeyNotFoundException("Car not found");
            }
            return car;
        }

        public void CreateCar(Car car)
        {
            _context.Car.Add(car);
            _context.SaveChanges();
        }

        public void UpdateCar(Car car)
        {
            var existingCar = _context.Car.Find(car.CarId);
            if (existingCar == null)
            {
                throw new KeyNotFoundException("Car not found");
            }

            // Update properties here
            existingCar.Model = car.Model;
            existingCar.Brand = car.Brand;
            existingCar.PricePerDay = car.PricePerDay;
            existingCar.PurchasePrice = car.PurchasePrice;
            existingCar.IsAvailable = car.IsAvailable;

            _context.Car.Update(existingCar);
            _context.SaveChanges();
        }

        public void DeleteCar(int id)
        {
            var car = _context.Car.Find(id);
            if (car == null)
            {
                throw new KeyNotFoundException("Car not found");
            }

            _context.Car.Remove(car);
            _context.SaveChanges();
        }

        public IEnumerable<Branch> SearchBranchesByCarName(string carName)
        {
            return _context.Branch
                .Where(b => b.Cars.Any(c => c.CarName.Contains(carName)))
                .ToList();
        }
    }
}
