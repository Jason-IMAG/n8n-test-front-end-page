# GitHub Pages 部署指南

本專案已設定自動部署到 GitHub Pages。以下是完整的設定步驟。

## 🚀 快速開始

### 1. 修改環境變數

編輯 `build-config/.env.main` 檔案，替換以下內容：

```bash
# 將 YOUR_GITHUB_USERNAME 改成您的 GitHub 使用者名稱
VITE_APP_URL=https://YOUR_GITHUB_USERNAME.github.io/n8n-test-front-end-page
VITE_APP_ASSET_URL=https://YOUR_GITHUB_USERNAME.github.io/n8n-test-front-end-page

# 填入實際的 API URL
VITE_APP_API_URL=https://your-api-url.com/api

# 填入 LINE LIFF 相關資訊
VITE_LIFF_ID=your-liff-id-here
VITE_LIFF_URL=https://liff.line.me/your-liff-id-here
VITE_LINE_OA_URL=https://line.me/R/ti/p/@your-line-oa
VITE_OFFICIAL_ACCOUNT_ID=@your-official-account-id

# 填入 Google Analytics ID（選用）
VITE_GA4_ID=G-XXXXXXXXXX
```

### 2. 確認 vite.config.ts

確認 `vite.config.ts` 中的 `base` 設定正確：

```typescript
export default defineConfig({
  base: '/n8n-test-front-end-page/', // 您的 repo 名稱
  // ... 其他設定
});
```

### 3. 啟用 GitHub Pages

1. 前往您的 GitHub 倉庫
2. 點擊 **Settings** (設定)
3. 左側選單點擊 **Pages**
4. 在 **Source** 下拉選單選擇 **GitHub Actions**
5. 點擊 **Save** (儲存)

### 4. 推送程式碼

```bash
# 加入所有變更
git add .

# 提交變更
git commit -m "Setup GitHub Pages deployment"

# 推送到 main 分支
git push origin main
```

### 5. 查看部署狀態

1. 前往倉庫的 **Actions** 頁面
2. 查看 "Deploy to GitHub Pages" workflow 執行狀態
3. 等待部署完成（通常需要 1-3 分鐘）

### 6. 訪問網站

部署完成後，您的網站將可在以下網址訪問：

```
https://YOUR_GITHUB_USERNAME.github.io/n8n-test-front-end-page
```

## 📁 環境變數管理

### 環境檔案位置

- `build-config/.env.main` - 主分支（生產環境）
- `build-config/.env.develop` - 開發分支
- `build-config/.env.staging` - 預發布分支

### 工作原理

- GitHub Actions 會根據分支名稱自動載入對應的環境變數檔案
- 推送到 `main` 分支 → 使用 `build-config/.env.main`
- 推送到 `develop` 分支 → 使用 `build-config/.env.develop`

### 本地開發

如需在本地測試生產環境設定：

```bash
# 複製環境變數檔案
cp build-config/.env.main .env.production

# 執行生產環境建置
npm run build

# 預覽建置結果
npm run preview
```

## 🔒 使用 GitHub Secrets（選用）

如果您需要使用敏感資訊（如私密 API keys），可以使用 GitHub Secrets：

### 1. 新增 Secrets

1. 前往倉庫的 **Settings** > **Secrets and variables** > **Actions**
2. 點擊 **New repository secret**
3. 新增您的 secrets，例如：
   - `VITE_APP_API_URL`
   - `VITE_LIFF_ID`
   - `VITE_GA4_ID`

### 2. 修改環境變數檔案

在 `build-config/.env.main` 中使用 placeholder：

```bash
VITE_APP_API_URL=__VITE_APP_API_URL__
VITE_LIFF_ID=__VITE_LIFF_ID__
VITE_GA4_ID=__VITE_GA4_ID__
```

### 3. 更新 GitHub Actions

編輯 `.github/workflows/deploy.yml`，在 "Copy environment config" 步驟中取消註解：

```yaml
- name: Copy environment config
  run: |
    cp build-config/.env.${{ github.ref_name }} .env.production
    # 取消下面的註解並新增更多替換規則
    sed -i "s|__VITE_APP_API_URL__|${{ secrets.VITE_APP_API_URL }}|g" .env.production
    sed -i "s|__VITE_LIFF_ID__|${{ secrets.VITE_LIFF_ID }}|g" .env.production
    sed -i "s|__VITE_GA4_ID__|${{ secrets.VITE_GA4_ID }}|g" .env.production
```

## 🛠️ 故障排除

### 部署失敗

1. 檢查 Actions 頁面的錯誤訊息
2. 確認環境變數檔案格式正確
3. 確認 `vite.config.ts` 中的 `base` 設定正確

### 頁面顯示 404

1. 確認 GitHub Pages 已啟用
2. 確認 Source 設定為 "GitHub Actions"
3. 等待幾分鐘讓 CDN 更新

### 靜態資源載入失敗

1. 確認 `vite.config.ts` 的 `base` 路徑正確
2. 確認環境變數中的 URL 正確
3. 檢查瀏覽器開發者工具的 Network 面板

## 📝 其他注意事項

- ⚠️ 前端環境變數會被打包到 JavaScript 中，任何人都可以看到
- ⚠️ 不要在環境變數中存放真正的機密資訊（如私鑰、密碼）
- ⚠️ `build-config/.env.*` 檔案會被提交到 Git，確保不含敏感資訊
- 💡 每次推送到 `main` 分支都會觸發自動部署
- 💡 建議在 `develop` 分支開發，測試無誤後再合併到 `main`

## 📚 相關文件

- [GitHub Pages 官方文件](https://docs.github.com/pages)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions 文件](https://docs.github.com/actions)

