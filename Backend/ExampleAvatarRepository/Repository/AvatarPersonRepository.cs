using ExampleAvatarRepository.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExampleAvatarRepository.Repository
{
    public class AvatarPersonRepository : IAvatarPersonRepository
    {
        private readonly MainDbContext _dbContext;

        public AvatarPersonRepository(MainDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Create(AvatarPerson entity)
        {
            await _dbContext.AvatarPersons.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var record = await GetById(id);

            if (record != null)
            {
                _dbContext.AvatarPersons.Remove(record);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<List<AvatarPerson>> GetAll()
        {
            return await _dbContext.AvatarPersons
                .AsNoTracking()
                .Include(x => x.AvatarImage)
                .Include(x => x.AvatarCharacteristic)
                .OrderByDescending(x => x.Id)
                .ToListAsync()
                .ConfigureAwait(false);
        }

        public async Task<AvatarPerson?> GetById(int id)
        {
            return await _dbContext.AvatarPersons
                .AsNoTracking()
                .Include(x => x.AvatarImage)
                .Include(x => x.AvatarCharacteristic)
                .SingleOrDefaultAsync(x => x.Id == id)
                .ConfigureAwait(false);
        }

        public IQueryable<AvatarPerson> GetQueryableData()
        {
            return _dbContext.AvatarPersons
                .AsNoTracking()
                .Include(x => x.AvatarImage)
                .Include(x => x.AvatarCharacteristic)
                .OrderByDescending(x => x.Id);
        }

        public async Task Update(AvatarPerson entity)
        {
            var record = await GetById(entity.Id);

            if (record != null)
            {
                _dbContext.AvatarPersons.Update(entity);
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
