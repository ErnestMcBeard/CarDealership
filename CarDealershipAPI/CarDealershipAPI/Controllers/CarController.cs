using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarDealershipAPI.Models;

namespace CarDealershipAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly CarDealershipContext _context;

        public CarController(CarDealershipContext context)
        {
            _context = context;
        }

        // GET: api/Car
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Car>>> GetCars()
        {
            return await _context.Cars.ToListAsync();
        }

        // GET: api/Car/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetCar(string id)
        {
            var car = await _context.Cars.FindAsync(id);

            if (car == null)
            {
                return NotFound();
            }

            return car;
        }

        // PUT: api/Car/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCar(string id, Car car)
        {
            if (id != car.Id)
            {
                return BadRequest();
            }

            _context.Entry(car).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Car
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Car>> PostCar(Car car)
        {
            _context.Cars.Add(car);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CarExists(car.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCar", new { id = car.Id }, car);
        }

        // DELETE: api/Car/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Car>> DeleteCar(string id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null)
            {
                return NotFound();
            }

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();

            return car;
        }

        [HttpPost("query")]
        public async Task<ActionResult<IEnumerable<Car>>> FindCars(CarQuery conditions)
        {
            var cars = _context.Cars.AsEnumerable<Car>();
            List<Car> emptyList = new List<Car>();
            foreach(var car in cars)
            {
                if (QueryCar(car, conditions))
                {
                    emptyList.Add(car);
                }
            }
            return emptyList;
        }

        private bool QueryCar(Car car, CarQuery conditions)
        {
            if (conditions.Make.Length > 0 && !car.Make.Equals(conditions.Make))
            {
                return false;
            }

            if (conditions.Color.Length > 0 && !car.Color.Equals(conditions.Color))
            {
                return false;
            }

            if ((conditions.MinPrice > -1 && conditions.MaxPrice > conditions.MinPrice) &&
                (car.Price >= conditions.MinPrice && car.Price <= conditions.MaxPrice))
            {
                return false;
            }

            if ((conditions.MinMiles > -1 && conditions.MaxMiles > conditions.MinMiles) &&
                (car.Price >= conditions.MinMiles && car.Price <= conditions.MaxMiles))
            {
                return false;
            }

            if (conditions.HasSunroof != null && car.HasSunroof != conditions.HasSunroof)
            {
                return false;
            }

            if (conditions.HasFourWheelDrive != null && car.IsFourWheelDrive != conditions.HasFourWheelDrive)
            {
                return false;
            }

            if (conditions.HasPowerWindows != null && car.HasPowerWindows != conditions.HasPowerWindows)
            {
                return false;
            }

            if (conditions.HasNavigation != null && car.HasNavigation != conditions.HasNavigation)
            {
                return false;
            }

            if (conditions.HasHeatedSeats != null && car.HasHeatedSeats != conditions.HasHeatedSeats)
            {
                return false;
            }

            return true;
        }


        private bool CarExists(string id)
        {
            return _context.Cars.Any(e => e.Id == id);
        }
    }
}
