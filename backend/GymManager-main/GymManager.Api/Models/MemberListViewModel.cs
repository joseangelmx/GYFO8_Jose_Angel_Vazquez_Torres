using GymManager.Core.Members;
using System.Collections.Generic;

namespace GymManager.Api.Models
{
    public class MemberListViewModel
    {
        public int NewMemberCount { get; set; }
        public List<Member> Members { get; set; }
    }
}
