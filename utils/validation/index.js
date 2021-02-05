export const passwordRegexValidate = (pwd) => {
  const regex =
    '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})';
  return !!pwd.match(regex);
};
