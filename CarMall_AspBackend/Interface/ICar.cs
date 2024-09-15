using carManagement.Models;

namespace carManagement.Interface
{
    public interface ICar
    {
        IEnumerable<Car> GetAllCars();
        Car GetCarById(int id);
        void CreateCar(Car car);
        void UpdateCar(Car car);
        void DeleteCar(int id);
    }
}
