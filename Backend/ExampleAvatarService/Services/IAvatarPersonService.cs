using ExampleAvatarService.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExampleAvatarService.Services
{

    public interface IAvatarPersonService
    {
        Task CreateAvatarPerson(AvatarPersonDto dto);

        Task UpdateAvatarPerson(AvatarPersonDto dto);

        Task DeleteAvatarPerson(int id);

        Task<List<AvatarPersonDto>> GetAllAvatarPersons();

        Task<AvatarPersonDto> GetAvatarPersonById(int id);

        Task<List<AvatarPersonDto>> FilterAvatars(FilterDataDto filters);
    }

}