import { StateEnum } from '@enums/state-enum';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

function IsValidState(validationOptions?: ValidationOptions) {
  const states = Object.values(StateEnum);

  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const isValid = states.find(state => state.toLowerCase() === value.toLowerCase());
          return !!isValid;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be one of [${states}]`;
        },
      },
    });
  };
}

export { IsValidState };
