const isHourGreaterThan = (firstTime: string, secondTime: string) => {
  const firstDate = new Date(`2000-01-01T${firstTime}`);
  const secondDate = new Date(`2000-01-01T${secondTime}`);

  return firstDate.getTime() > secondDate.getTime();
};

const isHourGreaterThanOrEqualTo = (firstTime: string, secondTime: string) => {
  const firstDate = new Date(`2000-01-01T${firstTime}`);
  const secondDate = new Date(`2000-01-01T${secondTime}`);

  return firstDate.getTime() >= secondDate.getTime();
};

const isHourSmallerThan = (firstTime: string, secondTime: string) => {
  const firstDate = new Date(`2000-01-01T${firstTime}`);
  const secondDate = new Date(`2000-01-01T${secondTime}`);

  return firstDate.getTime() < secondDate.getTime();
};

const isHourSmallerThanOrEqualTo = (firstTime: string, secondTime: string) => {
  const firstDate = new Date(`2000-01-01T${firstTime}`);
  const secondDate = new Date(`2000-01-01T${secondTime}`);

  return firstDate.getTime() <= secondDate.getTime();
};

const isValidHourFormat = (time: string) => {
  const regex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(time);
};

export { isHourGreaterThan, isHourGreaterThanOrEqualTo, isHourSmallerThan, isHourSmallerThanOrEqualTo, isValidHourFormat };
