using ExampleAvatarRepository.DummyData;
using ExampleAvatarRepository.DummyData.DummyAvatarImages;
using ExampleAvatarRepository.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExampleAvatarRepository
{
    public class MainDbContext : DbContext
    {
        public DbSet<AvatarPerson> AvatarPersons { get; set; }

        public DbSet<AvatarImage> AvatarImages { get; set; }

        public DbSet<AvatarCharacteristic> AvatarCharacteristics { get; set; }


        public MainDbContext(DbContextOptions<MainDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Add dummy data to the database.
            // Characteristics
            var allCharacteristics = CreateDummyAvatarCharacteristic.Create();

            // Add indexes.
            for (int i = 0; i < allCharacteristics.Count(); i++)
            {
                allCharacteristics[i].Id = i + 1;
            }

            modelBuilder.Entity<AvatarCharacteristic>().HasData(
                allCharacteristics
            );

            // Images
            var allImages = CreateDummyAvatarImagePart_001.Create()
                .Concat(CreateDummyAvatarImagePart_002.Create())
                .Concat(CreateDummyAvatarImagePart_003.Create())
                .Concat(CreateDummyAvatarImagePart_004.Create())
                .Concat(CreateDummyAvatarImagePart_005.Create())
                .Concat(CreateDummyAvatarImagePart_006.Create())
            .ToList();

            // Add indexes.
            for (int i = 0; i < allImages.Count(); i++)
            {
                allImages[i].Id = i + 1;
            }

            modelBuilder.Entity<AvatarImage>().HasData(
                allImages
            );

            // Avatars
            var allAvatars = CreateDummyAvatarPerson.Create();

            // Add indexes.
            for (int i = 0; i < allAvatars.Count(); i++)
            {
                allAvatars[i].Id = i + 1;
                allAvatars[i].AvatarImageId = i + 1;
                allAvatars[i].AvatarCharacteristicId = i + 1;
            }

            modelBuilder.Entity<AvatarPerson>().HasData(
                allAvatars
            );
        }

    }

}