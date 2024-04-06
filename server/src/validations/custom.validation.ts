import { CustomValidator } from "joi";

export const objectId: CustomValidator = (value: string, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    const message: Record<string, string> = { message: '"{{#label}}" must be a valid mongo id'};
    return helpers.message(message);
  }
  return value;
};

export const password: CustomValidator = (value: string, helpers) => {
  if (value.length < 8) {
    const message: Record<string, string> = { message: 'password must be at least 8 characters'};
    return helpers.message(message);
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    const message: Record<string, string> = { message: 'password must contain at least 1 letter and 1 number'};
    return helpers.message(message);
  }
  return value;
};
