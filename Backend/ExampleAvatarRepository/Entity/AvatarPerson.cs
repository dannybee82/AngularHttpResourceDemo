using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExampleAvatarRepository.Entity
{

    [Table("AvatarPerson", Schema = "AvatarsExample")]
    public class AvatarPerson
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int Age { get; set; }

        [ForeignKey("AvatarImage")]
        public int? AvatarImageId { get; set; }

        public AvatarImage? AvatarImage { get; set; }

        [ForeignKey("AvatarCharacteristic")]
        public int? AvatarCharacteristicId { get; set; }

        public AvatarCharacteristic? AvatarCharacteristic { get; set; }

    }

}
