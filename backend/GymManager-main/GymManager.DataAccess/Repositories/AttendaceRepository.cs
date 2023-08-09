using GymManager.Core.Attendances;
using GymManager.Core.Members;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.DataAccess.Repositories
{
    public class AttendaceRepository : Repository<int, Attendance>
    {
        public AttendaceRepository(GymManagerContext context) : base(context)
        {

        }

        public override async Task<Attendance> AddAsync(Attendance entity)
        {
            var member = await Context.Members.FindAsync(entity.Member.Id);

            entity.Member = null;
            entity.DateIn = DateTime.Now;
            await Context.Attendances.AddAsync(entity);
            member.Attendances.Add(entity);

            await Context.SaveChangesAsync();

            return entity;
        }

        public override async Task<Attendance> UpdateAsync(Attendance entity)
        {
            var member = await Context.Members.FindAsync(entity.Member.Id);

            var attendance = await Context.Attendances.FindAsync(entity.Id);
            attendance.DateOut = DateTime.Now;

            await Context.SaveChangesAsync();

            return attendance;
        }

        public override IQueryable<Attendance> GetAll() 
        {
            return Context.Attendances.Include(x => x.Member);
        }
    }
}
