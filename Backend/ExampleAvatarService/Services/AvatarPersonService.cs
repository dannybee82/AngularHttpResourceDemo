using ExampleAvatarRepository.Entity;
using ExampleAvatarRepository.Repository;
using ExampleAvatarService.DataTransferObjects;
using ExampleAvatarService.Mappers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExampleAvatarService.Services
{
    public class AvatarPersonService : IAvatarPersonService
    {
        private readonly IAvatarPersonRepository _avatarPersonRepository;
        private readonly IAvatarCharacteristicRepository _avatarCharacteristicRepository;
        private readonly IAvatarImageRepository _avatarImageRepository;

        public AvatarPersonService(
            IAvatarPersonRepository avatarPersonRepository, 
            IAvatarCharacteristicRepository avatarCharacteristicRepository,
            IAvatarImageRepository avatarImageRepository)
        {
            _avatarPersonRepository = avatarPersonRepository;
            _avatarCharacteristicRepository = avatarCharacteristicRepository;
            _avatarImageRepository = avatarImageRepository;
        }

        public async Task CreateAvatarPerson(AvatarPersonDto dto)
        {
            try
            {
                await _avatarPersonRepository.Create(AvatarPersonMapper.Map(dto));
            }
            catch(Exception ex)
            {
                throw new Exception("Something went wrong: " + ex.Message + " - " + ex.InnerException);
            }
        }

        public async Task DeleteAvatarPerson(int id)
        {
            try
            {
                var record = await _avatarPersonRepository.GetById(id);

                if(record != null)
                {
                    await _avatarPersonRepository.StopTracking();
                    await _avatarPersonRepository.Delete(record.Id);

                    if (record.AvatarCharacteristicId != null)
                    {
                        await _avatarCharacteristicRepository.StopTracking();
                        await _avatarCharacteristicRepository.Delete(record.AvatarCharacteristicId ?? 0);
                    }

                    if(record.AvatarImageId != null)
                    {
                        await _avatarImageRepository.StopTracking();
                        await _avatarImageRepository.Delete(record.AvatarImageId ?? 0);
                    }                    
                }                
            }
            catch (Exception ex)
            {
                throw new Exception("Something went wrong: " + ex.Message + " - " + ex.InnerException);
            }
        }

        public async Task<List<AvatarPersonDto>> FilterAvatars(FilterDataDto filters)
        {
            try
            {
                var query = _avatarPersonRepository.GetQueryableData();

                if(filters.HairColor != null)
                {
                    if(filters.HairColor.Count() > 0)
                    {
                        query = query.Where(x => filters.HairColor.Contains(x.AvatarCharacteristic != null ? x.AvatarCharacteristic.HairColor : ""));
                    }
                }

                if (filters.EyeColor != null)
                {
                    if (filters.EyeColor.Count() > 0)
                    {
                        query = query.Where(x => filters.EyeColor.Contains(x.AvatarCharacteristic != null ? x.AvatarCharacteristic.EyeColor : ""));
                    }
                }

                if(filters.HasEarrings != null)
                {
                    if(filters.HasEarrings == true)
                    {
                        bool[] bothValues = new bool[] { true, false };
                        query = query.Where(x => x.AvatarCharacteristic != null ? x.AvatarCharacteristic.HasEarrings == filters.HasEarrings : true);
                    }                    
                }

                var records = await query.ToListAsync().ConfigureAwait(false);

                List<AvatarPersonDto> list = new();

                foreach (var record in records)
                {
                    list.Add(AvatarPersonMapper.Map(record));
                }

                return list;
            }
            catch (Exception ex)
            {
                throw new Exception("Something went wrong: " + ex.Message + " - " + ex.InnerException);
            }
        }

        public async Task<List<AvatarPersonDto>> GetAllAvatarPersons()
        {
            try
            {
                var records = await _avatarPersonRepository.GetAll();

                List<AvatarPersonDto> list = new();

                foreach (var record in records)
                {
                    list.Add(AvatarPersonMapper.Map(record));
                }

                return list;
            }
            catch (Exception ex)
            {
                throw new Exception("Something went wrong: " + ex.Message + " - " + ex.InnerException);
            }
        }

        public async Task<AvatarPersonDto> GetAvatarPersonById(int id)
        {
            try
            {
                var record = await _avatarPersonRepository.GetById(id);

                if(record == null)
                {
                    throw new Exception("Unknown record id.");
                }

                return AvatarPersonMapper.Map(record);
            }
            catch (Exception ex)
            {
                throw new Exception("Something went wrong: " + ex.Message + " - " + ex.InnerException);
            }
        }

        public async Task UpdateAvatarPerson(AvatarPersonDto dto)
        {
            try
            {
                await _avatarPersonRepository.Update(AvatarPersonMapper.Map(dto));
            }
            catch (Exception ex)
            {
                throw new Exception("Something went wrong: " + ex.Message + " - " + ex.InnerException);
            }
        }

    }

}
