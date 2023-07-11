import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetOriginUrl = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const urlCall = `${request.protocol}://${request.headers.host}/`;

    return urlCall;
  },
);
