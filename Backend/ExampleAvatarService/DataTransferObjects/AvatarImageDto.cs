using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExampleAvatarService.DataTransferObjects
{
    public class AvatarImageDto
    {

        public int? Id { get; set; }

        public string Base64 { get; set; } = string.Empty;

    }

}
