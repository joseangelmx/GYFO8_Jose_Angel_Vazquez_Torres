using AutoMapper;
using GymManager.ApplicationServices.DTOs.Attendances;
using GymManager.ApplicationServices.DTOs.EquipmentTypes;
using GymManager.ApplicationServices.DTOs.Members;
using GymManager.ApplicationServices.DTOs.MembershipTypes;
using GymManager.ApplicationServices.DTOs.Users;
using GymManager.Core.Attendances;
using GymManager.Core.EquipmentTypes;
using GymManager.Core.Members;
using GymManager.Core.MembershipTypes;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManager.ApplicationServices
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<City, CityDto>();
            CreateMap<City, NewCityDto>();
            CreateMap<City, EditCityDto>();
            CreateMap<CityDto, City>();
            CreateMap<NewCityDto, City>();
            CreateMap<EditCityDto, City>();

            CreateMap<Member, MemberDto>()
                .ForMember(dest => dest.CityId, opt => opt.MapFrom(src => src.City.Id))
                .ForMember(dest => dest.MembershipTypeId, opt => opt.MapFrom(src => src.MembershipType.Id));

            CreateMap<Member, NewMemberDto>()
                .ForMember(dest => dest.CityId, opt => opt.MapFrom(src => src.City.Id))
                .ForMember(dest => dest.MembershipTypeId, opt => opt.MapFrom(src => src.MembershipType.Id));

            CreateMap<Member, EditMemberDto>()
                .ForMember(dest => dest.CityId, opt => opt.MapFrom(src => src.City.Id))
                .ForMember(dest => dest.MembershipTypeId, opt => opt.MapFrom(src => src.MembershipType.Id));

            CreateMap<MemberDto, Member>()
                .ForPath(dest => dest.City.Id, opt => opt.MapFrom(src => src.CityId))
                .ForPath(dest => dest.MembershipType.Id, opt => opt.MapFrom(src => src.MembershipTypeId));

            CreateMap<NewMemberDto, Member>()
                .ForPath(dest => dest.City.Id, opt => opt.MapFrom(src => src.CityId))
                .ForPath(dest => dest.MembershipType.Id, opt => opt.MapFrom(src => src.MembershipTypeId));
            CreateMap<EditMemberDto, Member>()
                .ForPath(dest => dest.City.Id, opt => opt.MapFrom(src => src.CityId))
                .ForPath(dest => dest.MembershipType.Id, opt => opt.MapFrom(src => src.MembershipTypeId));

            CreateMap<MembershipType, MembershipTypeDto>();
            CreateMap<MembershipType, NewMembershipTypeDto>();
            CreateMap<MembershipType, EditMembershipTypeDto>();
            CreateMap<MembershipTypeDto, MembershipType>();
            CreateMap<NewMembershipTypeDto, MembershipType>();
            CreateMap<EditMembershipTypeDto, MembershipType>();
            
            CreateMap<EquipmentType, EquipmentTypeDto>();
            CreateMap<EquipmentType, NewEquipmentTypeDto>();
            CreateMap<EquipmentType, EditEquipmentTypeDto>();
            CreateMap<EquipmentTypeDto, EquipmentType>();
            CreateMap<NewEquipmentTypeDto, EquipmentType>();
            CreateMap<EditEquipmentTypeDto, EquipmentType>();

            CreateMap<IdentityUser, UserDto>();
            CreateMap<IdentityUser, NewUserDto>();
            CreateMap<IdentityUser, EditUserDto>();
            CreateMap<UserDto, IdentityUser>();
            CreateMap<NewUserDto, IdentityUser>();
            CreateMap<EditUserDto, IdentityUser>();

            CreateMap<Attendance, AttendanceDto>();
            CreateMap<AttendanceDto, Attendance>();


        }
    }
}
