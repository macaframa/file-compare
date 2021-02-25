function extractComparableValue(prop, key) {
  return prop[key].updated;
}

function spreadPropsAndExtract(prop, concern = null) {
  const keys = Object.keys(prop);
  return concern
    ? keys
        .filter((key) => concern === key)
        .map((key) => extractComparableValue(prop, key))
    : keys.map((key) => extractComparableValue(prop, key));
}

function readCsv(updateCheckboxes, normalize) {
  return function ({ target: { result } }) {
    const content = result.split("\n");
    const cols = content
      .splice(0, 1)[0]
      .split(",")
      .map((c) => c.trim());
    updateCheckboxes(cols.filter((col) => col !== "Account Email"));
    normalize(content);
  };
}

const fileSvc = {
  getEmails: (file1, file2) =>
    Array.from(new Set(...[Object.keys(file1), Object.keys(file2)])),
  hasDiscrepancy: (prop1, prop2, concern = null) => {
    const [values1, values2] = [
      spreadPropsAndExtract(prop1, concern),
      spreadPropsAndExtract(prop2, concern),
    ];
    return (
      values1.filter((value, index) => value !== values2[index]).length !== 0
    );
  },
  keyifyArrOfStrings: (strs) => {
    return strs[strs.length - 1].toLowerCase();
  },
  pluckAndMergeRecords: (files, discrepancies) => {
    const [file1, file2] = files;
    const filesWithDiscrepancies = discrepancies.reduce((aggregate, email) => {
      const keys = Object.keys(file1[email]);
      const row = `${email}, sheet1, sheet2\n${keys
        .map(
          (key, i) =>
            ` ,${file1[email][key].original}, ${file2[email][key].original}`
        )
        .join("\n")}`;
      return [...aggregate, row];
    }, []);
    return filesWithDiscrepancies.join("\n");
  },
  setupDownload: (processedFiles, emailsWithDiscrepancies, callback) => {
    const csv = `email,\n${fileSvc.pluckAndMergeRecords(
      processedFiles,
      emailsWithDiscrepancies
    )}`;
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });
    callback(blob);
  },
  uploadCsv: (file, functions, callback) => {
    let fileData = new FileReader();
    fileData.onloadend = readCsv(...functions);
    fileData.readAsText(file);
    callback();
  },
};

export default fileSvc;
