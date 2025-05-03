export const wait = (second: number) => {
  const start = new Date();

  while (new Date().getTime() - start.getTime() <= second * 1000);
};

export const waitAsync = (second: number) => {
  return new Promise((res) => setTimeout(res, second * 1000));
};
