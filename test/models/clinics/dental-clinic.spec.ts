import { DentalClinic } from '@models/clinics';

describe('DentalClinic', () => {
  it('should create a DentalClinic instance', () => {
    // given
    const name = 'foo';
    const state = 'California';
    const availability = {
      from: '08:00',
      to: '18:00',
    };

    // when
    const dentalClinic = new DentalClinic({ name, state, availability });

    // then
    expect(dentalClinic).toBeInstanceOf(DentalClinic);
    expect(dentalClinic).toEqual({
      name,
      state,
      availability,
      type: 'DENTAL',
    });
  });
});
