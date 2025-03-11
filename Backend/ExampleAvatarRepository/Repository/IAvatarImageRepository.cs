using ExampleAvatarRepository.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExampleAvatarRepository.Repository
{
    public interface IAvatarImageRepository
    {
        Task<List<AvatarImage>> GetAll();

        Task<AvatarImage?> GetById(int id);

        Task Create(AvatarImage entity);

        Task Update(AvatarImage entity);

        Task Delete(int id);
    }

}
