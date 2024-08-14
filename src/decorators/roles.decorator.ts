import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

//ROLES_KEY : array of strings with the roles
//this is defined inside the controller as a decorator by passing the string of array.