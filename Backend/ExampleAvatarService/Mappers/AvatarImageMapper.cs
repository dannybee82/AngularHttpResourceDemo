using ExampleAvatarRepository.Entity;
using ExampleAvatarService.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExampleAvatarService.Mappers
{
    public class AvatarImageMapper
    {

        public static AvatarImageDto Map(AvatarImage entity)
        {
            AvatarImageDto dto = new();
            dto.Id = entity.Id;
            dto.Base64 = entity.Base64;

            return dto;
        }

        public static AvatarImage Map(AvatarImageDto dto)
        {
            AvatarImage entity = new();

            if (dto.Id != null)
            {
                entity.Id = dto.Id ?? 0;
            }
            entity.Base64 = dto.Base64;

            return entity;
        }

    }

}