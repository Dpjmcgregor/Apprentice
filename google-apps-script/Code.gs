/**
 * The Apprentice Pledge — Google Sheet backend.
 *
 * Receives pledge submissions from the website and appends them as a row to
 * the bound Google Sheet. Deploy this as a Web App (see README.md) and put the
 * resulting /exec URL in the site's VITE_PLEDGE_ENDPOINT environment variable.
 */

var SHEET_NAME = "Pledges";

var HEADERS = [
  "Timestamp",
  "Full Name",
  "Company",
  "Job Title",
  "Location",
  "Email",
  "Pledge",
  "Already Hires Apprentice",
  "Apprentices In 2026",
  "Sector",
  "Levy Payer",
  "Connect With Another Avenue",
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    var sheet = getSheet_();
    var p = (e && e.parameter) || {};

    sheet.appendRow([
      new Date(),
      p.fullName || "",
      p.company || "",
      p.jobTitle || "",
      p.location || "",
      p.email || "",
      p.pledge || "",
      p.alreadyHire || "",
      p.intendCount || "",
      p.sector || "",
      p.levyPayer || "",
      p.connect || "",
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Lets you sanity-check the deployment in a browser (GET the /exec URL).
function doGet() {
  return json_({ ok: true, service: "apprentice-pledge", sheet: SHEET_NAME });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
