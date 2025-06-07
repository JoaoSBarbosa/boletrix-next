import {RoleType} from "@/types/role/RoleType";

export type UserResponseType = {
    id: number;
    name: string;
    email: string;
    roles: RoleType[];
}
