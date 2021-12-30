export const hasEscapedCharacter = (textString: string) => {
  const regex = /[<>&'"\\/]/g;
  return regex.test(textString);
};
