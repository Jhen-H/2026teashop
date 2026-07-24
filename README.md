# 2026 Tea Shop

班級手搖飲點餐網站。GitHub Pages 網址：[https://jhen-h.github.io/2026teashop/](https://jhen-h.github.io/2026teashop/)

## 使用方式

1. 建立一份 Google 試算表，檔名請使用 `2026手搖飲點餐記錄`。
2. 開啟試算表中的「擴充功能」→「Apps Script」，把 [apps-script/Code.gs](apps-script/Code.gs) 的內容貼入，並部署為 Web app。
3. 取得 Apps Script 的 Web app URL，填入 [config.js](config.js) 的 `ORDER_ENDPOINT`。
4. 將本專案推送到 GitHub，並在 GitHub Pages 開啟靜態網站服務。

## 部署注意事項

- 這個專案已經包含可用於 GitHub Pages 的靜態檔案，推送後即可直接發布。
- 請勿把 [spec](spec) 目錄一起推送到 GitHub Pages 相關部署流程中；目前已在 [.gitignore](.gitignore) 中排除。
