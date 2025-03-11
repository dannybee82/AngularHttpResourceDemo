using ExampleAvatarRepository.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExampleAvatarRepository.Repository
{
    public class AvatarImageRepository : IAvatarImageRepository
    {
        private readonly MainDbContext _dbContext;

        public AvatarImageRepository(MainDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Create(AvatarImage entity)
        {
            await _dbContext.AvatarImages.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var record = await GetById(id);

            if (record != null)
            {
                _dbContext.AvatarImages.Remove(record);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<List<AvatarImage>> GetAll()
        {
            return await _dbContext.AvatarImages
                .AsNoTracking()
                .ToListAsync()
                .ConfigureAwait(false);
        }

        public async Task<AvatarImage?> GetById(int id)
        {
            return await _dbContext.AvatarImages
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id == id)
                .ConfigureAwait(false);
        }

        public async Task Update(AvatarImage entity)
        {
            var record = await GetById(entity.Id);

            if (record != null)
            {
                _dbContext.AvatarImages.Update(entity);
                await _dbContext.SaveChangesAsync();
            }
        }

    }

}
