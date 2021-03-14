using CarDealershipAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace CarDealershipAPI
{
    public class DataGenerator
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new CarDealershipContext(serviceProvider.GetRequiredService<DbContextOptions<CarDealershipContext>>()))
            {
                if (context.Cars.Any())
                {
                    return;
                }

                using (StreamReader r = new StreamReader("./Assets/InitialCars.json"))
                {
                    string json = r.ReadToEnd();
                    List<Car> items = JsonConvert.DeserializeObject<List<Car>>(json);
                    context.Cars.AddRange(items.ToArray());
                    context.SaveChanges();
                }
            }
        }
    }
}
