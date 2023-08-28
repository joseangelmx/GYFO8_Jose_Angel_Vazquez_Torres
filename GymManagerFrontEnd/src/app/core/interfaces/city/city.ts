export interface MembershipType {
    id: number;
    name: string;
    cost: number;
    createdOn: string;
    duration: number;
    members: string[];
  }
  
  export interface Attendance {
    id: number;
    dateIn: string;
    dateOut: string;
    member: string;
  }
  
  export interface Member {
    id: number;
    name: string;
    lastName: string;
    birthDay: string;
    email: string;
    allowNewsLetter: boolean;
    registeredOn: string;
    membershipEnd: string;
    city: string;
    membershipType: MembershipType;
    attendances: Attendance[];
  }
  
  export interface City {
    id: number;
    name: string;
    members: Member[];
    numberOfMembers: number; // New property to store the number of members
  }
  