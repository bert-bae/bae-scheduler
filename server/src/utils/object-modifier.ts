export const omitKeys = (data: object, omit: Array<string>): object => {
  omit.forEach((key) => {
    delete data[key];
  });

  return data;
};
