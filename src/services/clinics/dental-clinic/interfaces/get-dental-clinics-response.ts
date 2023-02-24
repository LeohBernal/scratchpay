type GetDentalClinicsResponse = {
  name: string;
  stateName: string;
  availability: {
    from: string;
    to: string;
  };
}[];

export { GetDentalClinicsResponse };
