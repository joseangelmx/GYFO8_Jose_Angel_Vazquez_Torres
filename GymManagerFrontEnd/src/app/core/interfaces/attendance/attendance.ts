import { Members } from "../members/members";

export interface Attendance {
    id:number;
    dateIn:string;
    dateOut:string;
    member : Members;
}
