using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExampleAvatarService.DataTransferObjects
{
    public class AvatarCharacteristicDto
    {

        public int? Id { get; set; }

        public string HairColor { get; set; } = string.Empty;

        public string EyeColor { get; set; } = string.Empty;

        public bool HasEarrings { get; set; } = false;

    }

}