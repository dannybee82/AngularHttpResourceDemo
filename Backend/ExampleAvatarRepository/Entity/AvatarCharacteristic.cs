using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExampleAvatarRepository.Entity
{

    [Table("AvatarCharacteristic", Schema = "AvatarsExample")]
    public class AvatarCharacteristic
    {

        [Key]
        public int Id { get; set; }

        public string HairColor { get; set; } = string.Empty;

        public string EyeColor { get; set; } = string.Empty;

        public bool HasEarrings { get; set; } = false;
    }

}