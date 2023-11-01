import * as bcrypt from 'bcrypt';

export const createHashedPassword = async (value: string) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(value, salt);

  return hashedPassword;
};

export const validatePassword = async (
  value: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(value, hashedPassword);
};
