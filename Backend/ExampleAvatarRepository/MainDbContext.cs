using ExampleAvatarRepository.DummyData;
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
            //Add dummy data to the database.
            modelBuilder.Entity<AvatarCharacteristic>().HasData(
                CreateDummyAvatarCharacteristic.Create()
            );

            modelBuilder.Entity<AvatarImage>().HasData(
                CreateDummyAvatarImage.Create()
            );

            modelBuilder.Entity<AvatarPerson>().HasData(
                CreateDummyAvatarPerson.Create()
            );
        }

    }

}