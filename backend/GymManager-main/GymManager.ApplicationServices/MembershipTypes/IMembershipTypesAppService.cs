using GymManager.Core.MembershipTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.ApplicationServices.MembershipTypes
{
    public interface IMembershipTypesAppService
    {
        Task<List<MembershipType>> GetMembershipTypesAsync();

        Task<int> AddMembershipTypesAsync(MembershipType membershipTypes);

        Task DeleteMembershipTypesAsync(int membershipTypesId);

        Task EditMembershipTypesAsync(MembershipType membershipType);
        Task<MembershipType> GetMembershipTypeAsync(int membershipTypeId);
    }
}
