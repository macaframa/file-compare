import fileSvc from "../index.js";

describe("fileSvc module", () => {
  describe("#getEmails", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("should not be null", () => {
      const keys = Object.keys(fileSvc);
      expect(keys.includes("getEmails")).toBe(true);
    });

    test("should be callable", () => {
      jest.spyOn(fileSvc, "getEmails").mockImplementation();
      fileSvc.getEmails();
      expect(fileSvc.getEmails).toHaveBeenCalled();
    });

    test("basic functionality", () => {
      const file1 = {
        "1_@email.com": {},
        "2_@email.com": {},
        "3_@email.com": {},
        "4_@email.com": {},
        "5_@email.com": {},
      };
      const file2 = {
        "1_@email.com": {},
        "2_@email.com": {},
        "3_@email.com": {},
        "4_@email.com": {},
        "5_@email.com": {},
      };
      const res = fileSvc.getEmails(file1, file2);
      const emails = [
        "1_@email.com",
        "2_@email.com",
        "3_@email.com",
        "4_@email.com",
        "5_@email.com",
      ];
      res.forEach((r, i) => expect(res.includes(emails[i])).toBe(true));
    });
  });

  describe("#hasDiscrepancy", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
    test("should not be null", () => {
      const keys = Object.keys(fileSvc);
      expect(keys.includes("hasDiscrepancy")).toBe(true);
    });

    test("should be callable", () => {
      jest.spyOn(fileSvc, "hasDiscrepancy").mockImplementation();
      fileSvc.hasDiscrepancy();
      expect(fileSvc.hasDiscrepancy).toHaveBeenCalled();
    });

    test("basic functionality", () => {
      const prop1 = {
        channel: { original: "UC123", updated: "123" },
        count: { original: 123, updated: 123 },
      };
      const prop2 = {
        channel: { original: "UC456", updated: "456" },
        count: { original: 123, updated: 123 },
      };
      const res = fileSvc.hasDiscrepancy(prop1, prop2);

      expect(res).toBe(true);
    });

    test("should work with one discrepancy - count", () => {
      const prop1 = {
        channel: { original: "UC123", updated: "123" },
        count: { original: 12, updated: 12 },
      };
      const prop2 = {
        channel: { original: "UC123", updated: "123" },
        count: { original: 123, updated: 123 },
      };
      const res = fileSvc.hasDiscrepancy(prop1, prop2);

      expect(res).toBe(true);
    });

    test("should work with two discrepancies", () => {
      const prop1 = {
        channel: { original: "UC123", updated: "123" },
        count: { original: 123, updated: 123 },
      };
      const prop2 = {
        channel: { original: "UC456", updated: "456" },
        count: { original: 456, updated: 456 },
      };
      const res = fileSvc.hasDiscrepancy(prop1, prop2);

      expect(res).toBe(true);
    });

    test("should work with no discrepancies", () => {
      const prop1 = {
        channel: { original: "UC123", updated: "123" },
        count: { original: 123, updated: 123 },
      };
      const prop2 = {
        channel: { original: "UC123", updated: "123" },
        count: { original: 123, updated: 123 },
      };
      const res = fileSvc.hasDiscrepancy(prop1, prop2);

      expect(res).toBe(false);
    });

    test("should work with concerns param - channel", () => {
      const prop1 = {
        channel: { original: "UC123", updated: "123" },
        count: { original: 123, updated: 123 },
      };
      const prop2 = {
        channel: { original: "UC123", updated: "123" },
        count: { original: 123, updated: 123 },
      };
      const concern = "channel";
      const res = fileSvc.hasDiscrepancy(prop1, prop2, concern);

      expect(res).toBe(false);
    });

    test("should work with concerns param - count", () => {
      const prop1 = {
        channel: { original: "UC123", updated: "123" },
        count: { original: 123, updated: 123 },
      };
      const prop2 = {
        channel: { original: "UC123", updated: "123" },
        count: { original: 123, updated: 123 },
      };
      const concern = "count";
      const res = fileSvc.hasDiscrepancy(prop1, prop2, concern);

      expect(res).toBe(false);
    });
  });

  describe("#keyifyArrOfStrings", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("should not be null", () => {
      const keys = Object.keys(fileSvc);
      expect(keys.includes("keyifyArrOfStrings")).toBe(true);
    });

    test("should be callable", () => {
      jest.spyOn(fileSvc, "keyifyArrOfStrings").mockImplementation();
      fileSvc.keyifyArrOfStrings();
      expect(fileSvc.keyifyArrOfStrings).toHaveBeenCalled();
    });

    test("basic functionality", () => {
      let value = "Some Key";
      value = fileSvc.keyifyArrOfStrings(value.split(" "));
      expect(value).toBe("key");
    });
  });

  describe("#pluckAndMergeRecords", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("should not be null", () => {
      const keys = Object.keys(fileSvc);
      expect(keys.includes("pluckAndMergeRecords")).toBe(true);
    });

    test("should be callable", () => {
      jest.spyOn(fileSvc, "pluckAndMergeRecords").mockImplementation();
      fileSvc.pluckAndMergeRecords();
      expect(fileSvc.pluckAndMergeRecords).toHaveBeenCalled();
    });

    test("basic functionality", () => {
      const file1 = {
        "1_@email.com": {
          channel: {
            original: "UC123",
            updated: "123",
          },
          count: {
            original: 3,
            updated: 3,
          },
        },
        "2_@email.com": {
          channel: {
            original: "UC456",
            updated: "456",
          },
          count: {
            original: 3,
            updated: 3,
          },
        },
        "3_@email.com": {
          channel: {
            original: "876",
            updated: "876",
          },
          count: {
            original: 3,
            updated: 3,
          },
        },
      };
      const file2 = {
        "1_@email.com": {
          channel: {
            original: "UC1234",
            updated: "1234",
          },
          count: {
            original: 3,
            updated: 3,
          },
        },
        "2_@email.com": {
          channel: {
            original: "UC456",
            updated: "456",
          },
          count: {
            original: 3,
            updated: 3,
          },
        },
        "3_@email.com": {
          channel: {
            original: "876tc",
            updated: "876tc",
          },
          count: {
            original: 3,
            updated: 3,
          },
        },
      };

      const emailsWithDiscrepancies = ["1_@email.com", "3_@email.com"];
      const res = fileSvc.pluckAndMergeRecords(
        [file1, file2],
        emailsWithDiscrepancies
      );
      const csvOutput =
        "1_@email.com, sheet1, sheet2\n ,UC123, UC1234\n ,3, 3\n3_@email.com, sheet1, sheet2\n ,876, 876tc\n ,3, 3";

      expect(res).toBe(csvOutput);
    });
  });

  describe("#setupDownload", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("should not be null", () => {
      const keys = Object.keys(fileSvc);
      expect(keys.includes("setupDownload")).toBe(true);
    });

    test("should be callable", () => {
      jest.spyOn(fileSvc, "setupDownload").mockImplementation();
      fileSvc.setupDownload();
      expect(fileSvc.setupDownload).toHaveBeenCalled();
    });
  });

  describe("#uploadCsv", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("should not be null", () => {
      const keys = Object.keys(fileSvc);
      expect(keys.includes("uploadCsv")).toBe(true);
    });

    test("should be callable", () => {
      jest.spyOn(fileSvc, "uploadCsv").mockImplementation();
      fileSvc.uploadCsv();
      expect(fileSvc.uploadCsv).toHaveBeenCalled();
    });
  });
});
