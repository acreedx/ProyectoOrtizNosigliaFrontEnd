export const birthDateFormater = (birthDate: Date) => {
  const formatedDate = birthDate.toISOString().split("T")[0];
  return formatedDate;
};
