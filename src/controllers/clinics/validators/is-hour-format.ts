import { isValidHourFormat } from '@utils/date';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

function IsHourFormat(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const isValid = isValidHourFormat(value);
          return isValid;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid hour in the format HH:mm`;
        },
      },
    });
  };
}

export { IsHourFormat };
