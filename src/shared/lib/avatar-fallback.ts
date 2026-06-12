export const avatarName = (name: string) => {
  return name
    .split(" ", 2)
    .map((i) => i[0])
    .join("")
    .toLocaleUpperCase();
};
