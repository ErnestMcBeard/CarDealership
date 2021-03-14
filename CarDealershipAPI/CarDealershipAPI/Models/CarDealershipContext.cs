using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealershipAPI.Models
{
    public class CarDealershipContext : DbContext
    {
        public CarDealershipContext(DbContextOptions<CarDealershipContext> options) : base(options) { }

        public DbSet<Car> Cars { get; set; }
    }
}
