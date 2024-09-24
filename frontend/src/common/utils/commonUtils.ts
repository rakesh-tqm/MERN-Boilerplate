export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const modifyFieldName = (name: string) => {
  const splitted = name.split("__");
  return capitalizeFirstLetter(splitted.at(-1) as string);
};
