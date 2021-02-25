import { useState, useEffect } from "react";
import { useClick } from "./customHooks";
import { fileSvc } from "./services";
import "./App.scss";

function App() {
  const [inputRef, updateInputClick] = useClick();
  const [files, updateFiles] = useState([]);
  const [concern, updateConcern] = useState("");
  const [checkboxes, updateCheckboxes] = useState([]);
  const [emailsWithDiscrepancies, updateEmailsWithDiscrepancies] = useState([]);
  const [processedFiles, updateProcessedFiles] = useState([]);
  const [downloadUrl, updateDownloadUrl] = useState("");

  function uploadCsv(file) {
    fileSvc.uploadCsv(file, [updateCheckboxes, normalize], () =>
      updateFiles([...files, file.name])
    );
  }

  async function normalize(rows) {
    try {
      let res = await fetch("/api/files/normalize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rows }),
      });
      res = await res.json();
      console.log(res);
      updateProcessedFiles([...processedFiles, res]);
    } catch (err) {
      console.log(err);
    }
  }

  function selectConcern({ target: { value } }) {
    updateConcern(fileSvc.keyifyArrOfStrings(value.split(" ")));
  }

  function process() {
    const [file1, file2] = processedFiles;
    const emails = fileSvc.getEmails(file1, file2);
    updateEmailsWithDiscrepancies(
      emails.filter((email) =>
        fileSvc.hasDiscrepancy(file1[email], file2[email], concern)
      )
    );
  }

  function reset() {
    updateFiles([]);
    updateConcern("");
    updateCheckboxes([]);
    updateEmailsWithDiscrepancies([]);
    updateProcessedFiles([]);
  }

  function setupDownload() {
    fileSvc.setupDownload(processedFiles, emailsWithDiscrepancies, (blob) =>
      updateDownloadUrl(URL.createObjectURL(blob))
    );
  }

  useEffect(() => {
    setupDownload();
  }, [emailsWithDiscrepancies]);

  return (
    <div className="App">
      <div className="App__file-upload-card">
        <h1 className="App__file-upload-card__title">File Upload</h1>
        {emailsWithDiscrepancies.length > 0 ? (
          <div className="App__file-upload-card__results">
            {emailsWithDiscrepancies.map((email, key) => (
              <div key={key}>{email}</div>
            ))}
            <div className="App__file-upload-card__results__button-container">
              <button
                className="App__file-upload-card__results__button-container__reset"
                onClick={reset}
              >
                reset
              </button>{" "}
              <button className="App__file-upload-card__results__button-container__download">
                <a
                  className="App__file-upload-card__results__button-container__download__link"
                  href={downloadUrl}
                  download="files.csv"
                >
                  download
                </a>
              </button>
            </div>
          </div>
        ) : (
          <div className="App__file-upload-card__results">
            <h4>Files Uploaded:</h4>
            {files.map((file, key) => (
              <span key={key}>
                {file}
                {key + 1 !== files.length ? ", " : ""}
              </span>
            ))}
            {files.length < 2 ? (
              <div className="App__file-upload-card__container">
                <h4>Upload a CSV file</h4>
                <input
                  type="file"
                  className="App__file-upload-card__container__upload"
                  ref={inputRef}
                  onChange={({ target: { files, value } }) => {
                    uploadCsv(files[0]);
                    value = null;
                  }}
                />
                <span
                  onClick={updateInputClick}
                  className="App__file-upload-card__container__upload-overlay"
                ></span>
              </div>
            ) : (
              <div>
                <h3>
                  Concerns<small>(optional)</small>
                </h3>
                <form>
                  {checkboxes.map((checkbox, key) => (
                    <div key={key}>
                      <input
                        type="radio"
                        checked={
                          concern ===
                          fileSvc.keyifyArrOfStrings(checkbox.split(" "))
                        }
                        value={checkbox}
                        name={checkbox}
                        onChange={selectConcern}
                      />
                      {checkbox}
                    </div>
                  ))}
                </form>
                <br />
                <button
                  className="App__file-upload-card__submit"
                  onClick={process}
                >
                  submit
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
