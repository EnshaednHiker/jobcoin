import { hasEscapedCharacter, isNumberString } from "..";

describe("hasEscapedCharacter", () => {
  // <>&'"\/
  it("should return true if < is present", () => {
    expect(hasEscapedCharacter("foo<")).toBe(true);
  });

  it("should return true if > is present", () => {
    expect(hasEscapedCharacter("foo>")).toBe(true);
  });

  it("should return true if & is present", () => {
    expect(hasEscapedCharacter("foo&")).toBe(true);
  });

  it("should return true if ' is present", () => {
    expect(hasEscapedCharacter("foo'")).toBe(true);
  });

  it('should return true if " is present', () => {
    expect(hasEscapedCharacter('foo"')).toBe(true);
  });

  it("should return true if / is present", () => {
    expect(hasEscapedCharacter("foo/")).toBe(true);
  });

  it("should return true if \\ is present", () => {
    expect(hasEscapedCharacter("foo\\")).toBe(true);
  });

  it("should return false if no escaped characters are present", () => {
    expect(hasEscapedCharacter("foo")).toBe(false);
  });
});

describe("isNumberString", () => {
  it("should return true if only numbers in a string are present", () => {
    expect(isNumberString("0")).toBe(true);
    expect(isNumberString("34.5")).toBe(true);
    expect(isNumberString("1045")).toBe(true);
    expect(isNumberString("45.67")).toBe(true);
    expect(isNumberString("6.3456")).toBe(true);
    expect(isNumberString("0.3456")).toBe(true);
    expect(isNumberString(".3456")).toBe(true);
  });

  it("should return false if any other character besides a number in a string are present", () => {
    expect(isNumberString("0a")).toBe(false);
    expect(isNumberString("foo")).toBe(false);
    expect(isNumberString("Alice1")).toBe(false);
    expect(isNumberString("B0b")).toBe(false);
    expect(isNumberString("35?")).toBe(false);
    expect(isNumberString("35.?")).toBe(false);
    expect(isNumberString("a.0")).toBe(false);
    expect(isNumberString(".a")).toBe(false);
  });
});
