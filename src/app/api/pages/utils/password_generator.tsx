const SPECIAL_CHARACTERS = "@$!%*?&";
export const generatePassword = async (
  name: string,
  lastname: string,
  identification: string,
) => {
  const firstLetterName = name.charAt(0).toUpperCase();
  const firstLetterLastname = lastname.charAt(0);
  const firstFiveId = identification.substring(0, 5);
  const randomSpecialChar = SPECIAL_CHARACTERS.charAt(
    Math.floor(Math.random() * SPECIAL_CHARACTERS.length),
  );
  const password = `${firstLetterName}${firstLetterLastname}${firstFiveId}${randomSpecialChar}`;
  return password;
};
