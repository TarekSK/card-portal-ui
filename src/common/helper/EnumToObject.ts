export function enumToObject(enumToConvert: any) {
  Object.keys(enumToConvert)
    .filter((v) => isNaN(Number(v)))
    .map((name) => {
      return { id: enumToConvert[name as keyof typeof enumToConvert], name };
    });
}

export const convertEnumToObject = (enumToConvert: any) => {
  return Object.keys(enumToConvert)
    .filter((v) => isNaN(Number(v)))
    .map((name) => {
      return {
        id: enumToConvert[name as keyof typeof enumToConvert] as number,
        name,
      };
    });
};
