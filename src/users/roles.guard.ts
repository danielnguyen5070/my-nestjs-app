import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RequestWithUser } from './request-with-user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) return true; // no roles required

    const req = context.switchToHttp().getRequest<RequestWithUser>();
    req.user = {
      id: 1,
      email: 'test@gmail.com',
      role: 'admin',
    };

    const user = req.user; // assume user is attached

    const hasRole = roles.includes(user.role);

    if (!hasRole) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
