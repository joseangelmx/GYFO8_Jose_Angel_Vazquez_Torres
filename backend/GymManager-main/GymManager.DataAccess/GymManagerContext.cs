using GymManager.Core.Attendances;
using GymManager.Core.EquipmentTypes;
using GymManager.Core.Inventories;
using GymManager.Core.Members;
using GymManager.Core.MembershipTypes;
using GymManager.Core.Sales;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.DataAccess
{
	public class GymManagerContext : IdentityDbContext
	{
		public virtual DbSet<Member> Members { get; set; }
		public virtual DbSet<City> Cities { get; set; }
		public virtual DbSet<MembershipType> MembershipTypes { get; set; }
		public virtual DbSet<Inventory> Inventories { get; set; }
		public virtual DbSet<MesureType> MesureTypes { get; set; }
		public virtual DbSet<ProductType> ProductTypes { get; set; }
		public virtual DbSet<Sale> Sales { get; set; }
		public virtual DbSet<SalesInventory> SalesInventories { get; set; }
		public virtual DbSet<EquipmentType> EquipmentTypes { get; set; }
		public virtual DbSet<Attendance> Attendances { get; set; }

		public GymManagerContext(DbContextOptions<GymManagerContext> options): base(options)
		{

		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			modelBuilder.Entity<SalesInventory>().HasKey(vi => new { vi.InventoryId, vi.SaleId });
			/*modelBuilder.Entity<UserInRoles>().HasKey(vi => new { vi.UserId, vi.RoleId });*/
		}
	}
}
