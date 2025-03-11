using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExampleAvatarService.DataTransferObjects
{
    public class AvatarPersonDto
    {

        public int? Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int Age { get; set; }

        public AvatarImageDto? AvatarImage { get; set; }

        public AvatarCharacteristicDto? AvatarCharacteristic { get; set; }

    }

}
