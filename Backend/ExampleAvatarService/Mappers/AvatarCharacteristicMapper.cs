using ExampleAvatarRepository.Entity;
using ExampleAvatarService.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExampleAvatarService.Mappers
{
    public class AvatarCharacteristicMapper
    {

        public static AvatarCharacteristicDto Map(AvatarCharacteristic entity)
        {
            AvatarCharacteristicDto dto = new();
            dto.Id = entity.Id;
            dto.HairColor = entity.HairColor;
            dto.EyeColor = entity.EyeColor;
            dto.HasEarrings = entity.HasEarrings;

            return dto;
        }

        public static AvatarCharacteristic Map(AvatarCharacteristicDto dto)
        {
            AvatarCharacteristic entity = new();

            if (dto.Id != null)
            {
                entity.Id = dto.Id ?? 0;
            }
            entity.HairColor = dto.HairColor;
            entity.EyeColor = dto.EyeColor;
            entity.HasEarrings = dto.HasEarrings;

            return entity;
        }

    }

}
