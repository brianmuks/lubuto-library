const fs = require("fs");

export function write2File({ path, file }) {
  fs.writeFile(path, file, function (err) {
    if (err) {
      return;
    }
  });
}

export function readFileContent({ path }) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}
