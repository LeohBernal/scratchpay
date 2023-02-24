import { VetClinic } from '@models/clinics';

describe('VetClinic', () => {
  it('should create a VetClinic instance', () => {
    // given
    const name = 'foo';
    const state = 'California';
    const availability = {
      from: '08:00',
      to: '18:00',
    };

    // when
    const dentalClinic = new VetClinic({ name, state, availability });

    // then
    expect(dentalClinic).toBeInstanceOf(VetClinic);
    expect(dentalClinic).toEqual({
      name,
      state,
      availability,
      type: 'VET',
    });
  });
});
