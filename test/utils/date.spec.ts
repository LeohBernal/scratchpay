import { isHourGreaterThan, isHourGreaterThanOrEqualTo, isHourSmallerThan, isHourSmallerThanOrEqualTo, isValidHourFormat } from '@utils/date';

describe('isHourGreaterThan', () => {
  it('returns true if first time is greater than second time', () => {
    expect(isHourGreaterThan('10:00', '09:00')).toBe(true);
  });

  it('returns false if first time is less than or equal to second time', () => {
    expect(isHourGreaterThan('10:00', '10:00')).toBe(false);
    expect(isHourGreaterThan('09:00', '10:00')).toBe(false);
  });
});

describe('isHourGreaterThanOrEqualTo', () => {
  it('returns true if first time is greater than or equal to second time', () => {
    expect(isHourGreaterThanOrEqualTo('10:00', '09:00')).toBe(true);
    expect(isHourGreaterThanOrEqualTo('10:00', '10:00')).toBe(true);
  });

  it('returns false if first time is less than second time', () => {
    expect(isHourGreaterThanOrEqualTo('09:00', '10:00')).toBe(false);
  });
});

describe('isHourSmallerThan', () => {
  it('returns true if first time is less than second time', () => {
    expect(isHourSmallerThan('09:00', '10:00')).toBe(true);
  });

  it('returns false if first time is greater than or equal to second time', () => {
    expect(isHourSmallerThan('10:00', '10:00')).toBe(false);
    expect(isHourSmallerThan('10:00', '09:00')).toBe(false);
  });
});

describe('isHourSmallerThanOrEqualTo', () => {
  it('returns true if first time is less than or equal to second time', () => {
    expect(isHourSmallerThanOrEqualTo('09:00', '10:00')).toBe(true);
    expect(isHourSmallerThanOrEqualTo('10:00', '10:00')).toBe(true);
  });

  it('returns false if first time is greater than second time', () => {
    expect(isHourSmallerThanOrEqualTo('10:00', '09:00')).toBe(false);
  });
});

describe('isValidHourFormat', () => {
  it('returns true if time is in HH:mm format', () => {
    expect(isValidHourFormat('10:00')).toBe(true);
  });

  it('returns false if time is not in HH:mm format', () => {
    expect(isValidHourFormat('10:0')).toBe(false);
    expect(isValidHourFormat('1000')).toBe(false);
    expect(isValidHourFormat('10:60')).toBe(false);
    expect(isValidHourFormat('25:00')).toBe(false);
  });
});
