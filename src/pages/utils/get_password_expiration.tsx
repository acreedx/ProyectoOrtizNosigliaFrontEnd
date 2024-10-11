export const getPasswordExpiration = () => {
  const today = new Date();
  const passwordExpiration = new Date(today);
  passwordExpiration.setMonth(today.getMonth() + 3);
  return passwordExpiration;
};
