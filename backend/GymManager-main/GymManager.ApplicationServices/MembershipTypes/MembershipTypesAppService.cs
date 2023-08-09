using GymManager.Core.MembershipTypes;
using GymManager.DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.ApplicationServices.MembershipTypes
{
    public class MembershipTypesAppService : IMembershipTypesAppService
    {
        private readonly IRepository<int, MembershipType> _repository;
        public MembershipTypesAppService(IRepository<int, MembershipType> repository)
        {
            _repository = repository;
        }

        public async Task<int> AddMembershipTypesAsync(MembershipType membershipTypes)
        {
            await _repository.AddAsync(membershipTypes);

            return membershipTypes.Id;
        }

        public async Task DeleteMembershipTypesAsync(int membershipTypesId)
        {
            await _repository.DeleteAsync(membershipTypesId);
        }

        public async Task EditMembershipTypesAsync(MembershipType membershipTypes)
        {
            await _repository.UpdateAsync(membershipTypes);
        }

        public async Task<MembershipType> GetMembershipTypeAsync(int membershipTypesId)
        {
            return await _repository.GetAsync(membershipTypesId);
        }

        public async Task<List<MembershipType>> GetMembershipTypesAsync()
        {
            return await _repository.GetAll().ToListAsync();
        }

        /*public List<MembershipType> GetMembershipTypes()
        {
            /*List<MembershipType> membershipTypes = new List<MembershipType>();
            membershipTypes.Add(new MembershipType 
            {
                Name = "Half Time Student",
                Cost = 25.0,
                Duration = 1
            });
            membershipTypes.Add(new MembershipType
            {
                Name = "Full Time Student",
                Cost = 15.0,
                Duration = 1
            });
            membershipTypes.Add(new MembershipType
            {
                Name = "Couples (Each)",
                Cost = 30.0,
                Duration = 1
            });
            membershipTypes.Add(new MembershipType
            {
                Name = "Coporate (min 4 members)",
                Cost = 30.0,
                Duration = 1
            });
            membershipTypes.Add(new MembershipType
            {
                Name = "Monthly Membership",
                Cost = 35.5,
                Duration = 1
            });
            membershipTypes.Add(new MembershipType
            {
                Name = "Premium Monthly",
                Cost = 50.0,
                Duration = 1
            });
            membershipTypes.Add(new MembershipType
            {
                Name = "2 Month's Membership",
                Cost = 60.0,
                Duration = 1
            });
            membershipTypes.Add(new MembershipType
            {
                Name = "3 Month's Membership",
                Cost = 50.0,
                Duration = 3
            });
            membershipTypes.Add(new MembershipType
            {
                Name = "6 Month's Membership",
                Cost = 200.0,
                Duration = 6
            });
            membershipTypes.Add(new MembershipType
            {
                Name = "12 Month's Membership",
                Cost = 380.0,
                Duration = 12
            });
            return MembershipTypes;
        }*/
    }
}
