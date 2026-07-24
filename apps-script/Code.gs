const SHEET_NAME = '2026手搖飲點餐記錄';
const HEADERS = ['送出時間', '姓名', '飲品', '飲用方式', '單價', '數量', '總價'];

function doGet() {
  const sheet = getOrderSheet_();
  const values = sheet.getDataRange().getDisplayValues();
  const orders = values.slice(1).map(row => ({
    time: row[0], name: row[1], drink: row[2], variant: row[3],
    unitPrice: row[4], quantity: row[5], total: row[6],
  })).reverse();
  return json_({ ok: true, orders });
}

function doPost(e) {
  try {
    let data = {};
    const contentType = (e.postData && e.postData.type) || '';
    if (contentType.indexOf('application/json') !== -1 && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (contentType.indexOf('application/x-www-form-urlencoded') !== -1 && e.postData && e.postData.contents) {
      const params = new URLSearchParams(e.postData.contents);
      data = Object.fromEntries(params.entries());
    } else {
      data = e.parameter || {};
    }
    const sheet = getOrderSheet_();
    sheet.appendRow([
      new Date(), data.name, data.drink, data.variant,
      Number(data.unitPrice), Number(data.quantity), Number(data.total),
    ]);
    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  }
}

function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function getOrderSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  sheet.setFrozenRows(1);
  return sheet;
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
