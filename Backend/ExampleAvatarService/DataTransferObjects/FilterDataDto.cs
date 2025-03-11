using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExampleAvatarService.DataTransferObjects
{
    public class FilterDataDto
    {

        public List<string>? HairColor { get; set; }
    
        public List<string>? EyeColor { get; set; }

        public bool? HasEarrings { get; set; }
    }

}
