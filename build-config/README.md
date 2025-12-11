# Build Configuration

此資料夾存放不同環境的環境變數設定檔。

## 環境檔案

- `.env.main` - 主分支 (GitHub Pages 部署)
- `.env.develop` - 開發分支
- `.env.staging` - 預發布分支 (如需要)

## 使用方式

### 本地開發

複製對應環境的檔案到專案根目錄：

```bash
# 開發環境
cp build-config/.env.develop .env

# 或生產環境
cp build-config/.env.main .env.production
```

### GitHub Actions 自動部署

GitHub Actions 會自動根據分支名稱載入對應的環境變數檔案：
- `main` 分支 → `build-config/.env.main`
- `develop` 分支 → `build-config/.env.develop`
- `staging` 分支 → `build-config/.env.staging`

## 環境變數說明

### App Configuration
- `VITE_APP_ENV` - 環境名稱
- `VITE_APP_VERSION` - 應用程式版本
- `VITE_APP_URL` - 應用程式網址
- `VITE_APP_API_URL` - API 基礎網址
- `VITE_APP_RESOURCE_URL` - 資源檔案網址
- `VITE_APP_ASSET_URL` - 靜態資源網址
- `VITE_APP_MOCK_USER_LOGIN` - 是否使用模擬登入
- `VITE_APP_API_MOCK_ENABLED` - 是否使用模擬 API

### LINE LIFF Configuration
- `VITE_LIFF_LOGIN_ENABLED` - 是否啟用 LIFF 登入
- `VITE_LIFF_ID` - LIFF ID
- `VITE_LIFF_URL` - LIFF 網址
- `VITE_LINE_OA_URL` - LINE 官方帳號網址
- `VITE_OFFICIAL_ACCOUNT_ID` - LINE 官方帳號 ID

### Coupon Configuration
- `VITE_COUPON_REDEEM_TIMEOUT_MINUTES` - 優惠券兌換逾時分鐘數
- `VITE_COUPON_REMAIN_HINT_THRESHOLD` - 優惠券剩餘提示門檻

### Analytics
- `VITE_GA4_ID` - Google Analytics 4 ID

## 注意事項

⚠️ **安全提醒**：
- 這些檔案會被提交到 Git，請勿在此存放敏感資訊（如 API keys、tokens）
- 如需使用敏感資訊，請使用 GitHub Secrets 並在 workflow 中替換
- 所有前端環境變數都會被打包到 JavaScript 中，任何人都可以看到

