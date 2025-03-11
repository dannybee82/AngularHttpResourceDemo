using ExampleAvatarRepository.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExampleAvatarRepository.Repository
{
    public interface IAvatarCharacteristicRepository
    {
        Task<List<AvatarCharacteristic>> GetAll();

        Task<AvatarCharacteristic?> GetById(int id);

        Task Create(AvatarCharacteristic entity);

        Task Update(AvatarCharacteristic entity);

        Task Delete(int id);
    }

}
