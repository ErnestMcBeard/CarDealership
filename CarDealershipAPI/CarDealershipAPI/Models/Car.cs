namespace CarDealershipAPI.Models
{
    public class Car
    {
        public string Id { get; set; }

        public string Make { get; set; }

        public int Year { get; set; }

        public string Color { get; set; }

        public int Price { get; set; }

        public bool HasSunroof { get; set; }

        public bool IsFourWheelDrive { get; set; }

        public bool HasLowMiles { get; set; }

        public bool HasPowerWindows { get; set; }

        public bool HasNavigation { get; set; }

        public bool HasHeatedSeats { get; set; }
    }
}
