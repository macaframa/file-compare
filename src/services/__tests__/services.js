import * as Services from "../index";

describe("Services proxy", () => {
  describe("fileSvc", () => {
    test("should be exported", () => {
      expect(Services.fileSvc).not.toBe(null);
    });
  });
});
