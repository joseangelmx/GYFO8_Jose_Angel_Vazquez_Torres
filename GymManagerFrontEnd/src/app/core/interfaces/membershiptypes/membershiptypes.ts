import { Member } from "../city/city";

export interface MembershipType {
    id: number;
    name: string;
    cost: number;
    createdOn: string;
    duration: number;
    members: Member[];
    numberOfMembers: number;
  }
