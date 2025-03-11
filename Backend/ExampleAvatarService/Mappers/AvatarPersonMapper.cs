using ExampleAvatarRepository.Entity;
using ExampleAvatarService.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExampleAvatarService.Mappers
{
    public class AvatarPersonMapper
    {

        public static AvatarPersonDto Map(AvatarPerson entity)
        {
            AvatarPersonDto dto = new();
            dto.Id = entity.Id;
            dto.Name = entity.Name;
            dto.Age = entity.Age;

            if (entity.AvatarImage != null)
            {
                dto.AvatarImage = AvatarImageMapper.Map(entity.AvatarImage);
            }

            if (entity.AvatarCharacteristic != null)
            {
                dto.AvatarCharacteristic = AvatarCharacteristicMapper.Map(entity.AvatarCharacteristic);
            }

            return dto;
        }

        public static AvatarPerson Map(AvatarPersonDto dto)
        {
            AvatarPerson entity = new();

            if (dto.Id != null)
            {
                entity.Id = dto.Id ?? 0;
            }
            entity.Name = dto.Name;
            entity.Age = dto.Age;

            if(dto.AvatarImage != null)
            {
                entity.AvatarImage = AvatarImageMapper.Map(dto.AvatarImage);

                if(dto.AvatarImage.Id != null)
                {
                    entity.AvatarImageId = dto.AvatarImage.Id;
                }
            }

            if(dto.AvatarCharacteristic != null)
            {
                entity.AvatarCharacteristic = AvatarCharacteristicMapper.Map(dto.AvatarCharacteristic);

                if(dto.AvatarCharacteristic.Id != null)
                {
                    entity.AvatarCharacteristicId = dto.AvatarCharacteristic.Id;
                }
            }

            return entity;
        }

    }

}
