using GymManager.Core.Members;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace GymManager.DataAccess.Repositories
{
    public class MembersRepository : Repository<int, Member>
    {
        
        public MembersRepository(GymManagerContext context) : base(context)
        {
            
        }

        public override async Task<Member> AddAsync(Member entity)
        {
            var city = await Context.Cities.FindAsync(entity.City.Id);
            var membershiptype = await Context.MembershipTypes.FindAsync(entity.MembershipType.Id);
            entity.City = null;
            entity.MembershipType = null;
            await Context.Members.AddAsync(entity);
            city.Members.Add(entity);
            membershiptype.Members.Add(entity);

            await Context.SaveChangesAsync();

            return entity;
        }

        public override async Task<Member> UpdateAsync(Member entity)
        {
            var city = await Context.Cities.FindAsync(entity.City.Id);
            var membershiptype = await Context.MembershipTypes.FindAsync(entity.MembershipType.Id);
            entity.City = null;
            entity.MembershipType = null;
            var member = await Context.Members.FindAsync(entity.Id);
            //member = entity;
            city.Members.Add(member);
            membershiptype.Members.Add(member);

            member.AllowNewsLetter = entity.AllowNewsLetter;
            member.BirthDay = entity.BirthDay;
            member.Email = entity.Email;
            member.Id = entity.Id;
            member.LastName = entity.LastName;
            member.Name = entity.Name;
            member.RegisteredOn = entity.RegisteredOn;
            member.MembershipEnd = entity.MembershipEnd;

            member.City = city;
            member.MembershipType = membershiptype;

            await Context.SaveChangesAsync();

            return member;
        }

        public override IQueryable<Member> GetAll()
        {
            return Context.Members.Include(x => x.City).Include(x => x.MembershipType);
        }

        public override async Task<Member> GetAsync(int id)
        {
            var member = await Context.Members.Include(x => x.City).Include(x => x.MembershipType).FirstOrDefaultAsync(x => x.Id == id);
            return member;
        }
    }
}
