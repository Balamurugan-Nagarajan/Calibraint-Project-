import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    //this will return the string of arrays with the roles---------from the key get the value
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
//get the request object
    const { user } = context.switchToHttp().getRequest<{ user: User }>();
    //iterating throught each roles in the strings array and check if the user object . role includes the string of array
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
