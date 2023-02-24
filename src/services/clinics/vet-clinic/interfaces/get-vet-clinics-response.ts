type GetVetClinicsResponse = {
  clinicName: string;
  stateCode: string;
  opening: {
    from: string;
    to: string;
  };
}[];

export { GetVetClinicsResponse };
