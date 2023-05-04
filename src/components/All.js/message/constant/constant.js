export const ALLUSER = "allUser";
export const USER = "user";
export const EMAIL = "email";
export const DISPLAYNAME = "displayName";
export const MESSAGES = "messages";
export const CHATID = "chatId";
export const SIGNIN = "/signin";

export const combineId = (userOne, userTwo) => {
  return [userOne, userTwo].sort().join("");
};
