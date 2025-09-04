import { validate, type ValidationError, type ValidatorOptions } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export async function validateAndBuildDto<T>(
  dtoClass: new () => T,
  data: Partial<T>,
  validatorOptions: ValidatorOptions = {
    whitelist: true,
    forbidNonWhitelisted: true,
  }
): Promise<{ instance: T; errors: ValidationError[] }> {
  // Construye la instancia con los datos y hace conversiones implícitas (e.g. "1" -> 1)
  const instance = plainToInstance(dtoClass, data as object, {
    enableImplicitConversion: true,
    exposeDefaultValues: true,
  });

  const errors = await validate(instance as object, validatorOptions);
  return { instance, errors };
}

// Mantiene la firma original pero ahora sí valida contra "data"
export async function validateDto<T>(
  dtoClass: new () => T,
  data: Partial<T>,
  validatorOptions: ValidatorOptions = {}
): Promise<ValidationError[]> {
  const { errors } = await validateAndBuildDto(dtoClass, data, validatorOptions);
  return errors;
}
