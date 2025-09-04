// projects/usersmodule/src/lib/base-dto.ts
import { type ValidationError } from 'class-validator';
import { validateAndBuildDto } from '../validation';

export class DtoValidationError extends Error {
  constructor(public readonly errors: ValidationError[]) {
    super(DtoValidationError.format(errors));
    this.name = 'DtoValidationError';
  }

  private static format(errors: ValidationError[]): string {
    const messages: string[] = [];
    const walk = (errs: ValidationError[]) => {
      for (const e of errs) {
        if (e.constraints) messages.push(...Object.values(e.constraints));
        if (e.children && e.children.length) walk(e.children);
      }
    };
    walk(errors);
    return messages.join('; ');
  }
}

export abstract class BaseDto {
  // Evita instanciación directa sin pasar por create (y por tanto, sin validar)
  protected constructor() {}

  static async create<T extends BaseDto>(this: new () => T, init: Partial<T>): Promise<T> {
    const { instance, errors } = await validateAndBuildDto(this, init);
    if (errors.length) {
      throw new DtoValidationError(errors);
    }
    return instance;
  }
}
