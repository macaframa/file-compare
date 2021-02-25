const NORMAL_MAP = {
  channel: {
    normalize: (str) =>
      str.split("/")[str.split("/").length - 1].substring(0, 2) === "UC"
        ? {
            original: str,
            updated: str
              .split("/")
              [str.split("/").length - 1].substring(2, str.length),
          }
        : {
            original: str,
            updated: str.split("/")[str.split("/").length - 1],
          },
  },
  count: {
    normalize: (count) => ({
      original: count,
      updated: count.split(",").join(""),
    }),
  },
};

function spreadColumnsOut(row) {
  return row.replace(/['"]+/g, "").split(",");
}

function normalizeRowAndGroupByEmail(row) {
  const [email, channel, ...rest] = spreadColumnsOut(row);
  return {
    [email]: {
      channel: NORMAL_MAP["channel"].normalize(channel),
      count: NORMAL_MAP["count"].normalize(rest.join("")),
    },
  };
}

function normalizeRows(rows) {
  return Object.assign(...rows.map(normalizeRowAndGroupByEmail));
}

module.exports = normalizeRows;
