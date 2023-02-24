import { IsValidState } from '@controllers/clinics/validators';
import { StateEnum } from '@enums/state-enum';
import { validate } from 'class-validator';

describe('IsValidState', () => {
  class TestClass {
    @IsValidState()
    state: string;

    constructor({ state }: { state: string }) {
      this.state = state;
    }
  }

  it('should validate a valid state', async () => {
    const testObj = new TestClass({ state: 'Alaska' });

    const errors = await validate(testObj);

    expect(errors.length).toBe(0);
  });

  it('should not validate an invalid state', async () => {
    const testObj = new TestClass({ state: 'São Paulo' });

    const errors = await validate(testObj);

    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toEqual({
      customValidation: `state must be one of [${Object.values(StateEnum)}]`,
    });
  });
});
