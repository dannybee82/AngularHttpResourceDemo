using ExampleAvatarRepository.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExampleAvatarRepository.Repository
{
    public interface IAvatarPersonRepository
    {
        IQueryable<AvatarPerson> GetQueryableData();

        Task<List<AvatarPerson>> GetAll();

        Task<AvatarPerson?> GetById(int id);

        Task Create(AvatarPerson entity);

        Task Update(AvatarPerson entity);

        Task Delete(int id);

        Task StopTracking();
    }

}
