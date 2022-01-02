export const hasEscapedCharacter = (textString: string) => {
  const regex = /[<>&'"\\/]/g;
  return regex.test(textString);
};

export const isNumberString = (textString: string) => {
  const regex = /^-?\d*\.?\d*$/;
  return regex.test(textString);
};
