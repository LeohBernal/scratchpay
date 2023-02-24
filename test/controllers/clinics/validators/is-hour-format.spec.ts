import { IsHourFormat } from '@controllers/clinics/validators';
import { validate } from 'class-validator';

describe('IsHourFormat', () => {
  class TestClass {
    @IsHourFormat()
    hour: string;

    constructor({ hour }: { hour: string }) {
      this.hour = hour;
    }
  }

  it('should validate a valid hour format', async () => {
    // given
    const testObj = new TestClass({ hour: '12:30' });

    // when
    const errors = await validate(testObj);

    // then
    expect(errors.length).toBe(0);
  });

  it('should not validate an invalid hour format', async () => {
    // given
    const testObj = new TestClass({ hour: '25:30' });

    // when
    const errors = await validate(testObj);

    // then
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toEqual({
      customValidation: 'hour must be a valid hour in the format HH:mm',
    });
  });
});
