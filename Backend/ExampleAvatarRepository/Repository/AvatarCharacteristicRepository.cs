using ExampleAvatarRepository.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExampleAvatarRepository.Repository
{
    public class AvatarCharacteristicRepository : IAvatarCharacteristicRepository
    {
        private readonly MainDbContext _dbContext;

        public AvatarCharacteristicRepository(MainDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Create(AvatarCharacteristic entity)
        {
            await _dbContext.AvatarCharacteristics.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var record = await GetById(id);

            if (record != null)
            {
                _dbContext.AvatarCharacteristics.Remove(record);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<List<AvatarCharacteristic>> GetAll()
        {
            return await _dbContext.AvatarCharacteristics
                .AsNoTracking()
                .ToListAsync()
                .ConfigureAwait(false);
        }

        public async Task<AvatarCharacteristic?> GetById(int id)
        {
            return await _dbContext.AvatarCharacteristics
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id == id)
                .ConfigureAwait(false);
        }

        public async Task Update(AvatarCharacteristic entity)
        {
            var record = await GetById(entity.Id);

            if (record != null)
            {
                _dbContext.AvatarCharacteristics.Update(entity);
                await _dbContext.SaveChangesAsync();
            }
        }
        public async Task StopTracking()
        {
            await Task.Run(() => {
                _dbContext.ChangeTracker.Clear();
            });
        }
    }

}