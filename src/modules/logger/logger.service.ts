import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  log(message: string, context: any, stack?: string) {
    super.log(message, context.constructor.name);
    stack && super.printStackTrace(stack);
  }
}
