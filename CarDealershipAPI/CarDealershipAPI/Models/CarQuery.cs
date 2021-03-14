using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealershipAPI.Models
{
    [Serializable]
    public class CarQuery
    {
        [JsonProperty]
        public string Make { get; set; }

        [JsonProperty]
        public string Color { get; set; }

        [JsonProperty]
        public int MinPrice { get; set; }

        [JsonProperty]
        public int MaxPrice { get; set; }

        [JsonProperty]
        public int MinMiles { get; set; }

        [JsonProperty]
        public int MaxMiles { get; set; }

        [JsonProperty]
        public bool? HasSunroof { get; set; }

        [JsonProperty]
        public bool? HasFourWheelDrive { get; set; }

        [JsonProperty]
        public bool? HasPowerWindows { get; set; }

        [JsonProperty]
        public bool? HasNavigation { get; set; }

        [JsonProperty]
        public bool? HasHeatedSeats { get; set; }
    }
}
