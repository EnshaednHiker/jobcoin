export const hasEscapedCharacter = (textString: string) => {
  const regex = /[<>&'"\\/]/g;
  return regex.test(textString);
};

export const isNumberString = (textString: string) => {
  const regex = /([0-9])/g;
  return regex.test(textString);
};
