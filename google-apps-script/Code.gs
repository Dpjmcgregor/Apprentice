/**
 * The Apprentice Pledge — Google Sheet backend.
 *
 * Receives pledge submissions from the website and appends them as a row to
 * the Google Sheet. Deploy as a Web App (see README.md) and put the resulting
 * /exec URL in the site's VITE_PLEDGE_ENDPOINT environment variable.
 *
 * DIAGNOSTICS:
 *   - Open  <your /exec URL>          in a browser  -> health check JSON
 *   - Open  <your /exec URL>?test=1   in a browser  -> writes a TEST row and
 *                                                       shows ok/true or the
 *                                                       exact error message
 *   - Apps Script editor -> Executions: shows every incoming request + errors
 */

// RECOMMENDED: paste your spreadsheet's ID here (the long string in the sheet
// URL between /d/ and /edit). This makes the script work even if it isn't
// "bound" to the sheet. Leave "" to use the bound/active spreadsheet.
var SHEET_ID = "";

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
  return handle_(e, false);
}

function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.test) return handle_(e, true);
  return json_({
    ok: true,
    service: "apprentice-pledge",
    sheet: SHEET_NAME,
    note: "POST to record a pledge, or add ?test=1 to write a test row.",
  });
}

function handle_(e, isTest) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var sheet = getSheet_();
    var p = (e && e.parameter) || {};

    var row = isTest
      ? [
          new Date(),
          "TEST — delete me",
          "Diagnostic",
          "—",
          "—",
          "test@example.com",
          "Test write from ?test=1",
          "",
          "",
          "",
          "",
          "",
        ]
      : [
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
        ];

    sheet.appendRow(row);
    return json_({ ok: true, test: !!isTest, rowsNow: sheet.getLastRow() });
  } catch (err) {
    return json_({ ok: false, error: String((err && err.message) || err) });
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  var ss = SHEET_ID
    ? SpreadsheetApp.openById(SHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  if (!ss) {
    throw new Error(
      "No spreadsheet found. Set SHEET_ID at the top of the script, or create " +
        "the script from inside the sheet via Extensions > Apps Script."
    );
  }

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
