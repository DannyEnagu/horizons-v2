import { User } from "@prisma/client";

export type CreateUserType = Pick<User,
    'email' |
    'fullName' |
    'kindeId' |
    'avatar' |
    'role'
>;

export type UpdateUserType = Pick<User,
    'id' |
    'email' |
    'fullName' |
    'kindeId' |
    'avatar' |
    'role'
>;

export type DeleteUserType = User['id'];