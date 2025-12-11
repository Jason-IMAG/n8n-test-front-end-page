# React TypeScript Vite Template

## Project Introduction

React TypeScript Vite Template。

## Version Information

- Project Version: 1.0

## Development Team

- PM:
- FE:
- BE:
- UI:

## Git Branch

- main
- staging
- develop

## Style Guide

- 可以使用Scss或Tailwind，若使用Tailwind，請確保 index.css 包含 Tailwind 的設定（開啟 @import 'tailwindcss'; 註解）。
- 為了適應不同手機裝置，請使用百分比單位 vw 。
- 請使用 module.scss 撰寫 SCSS 樣式。

## Notes

- **LIFF 登入設定**：環境變數 VITE_LIFF_LOGIN_ENABLED 用於控制是否使用 LIFF 進行認證。若不需要實現登入功能，請將 VITE_LIFF_LOGIN_ENABLED 設置為 false。
- **API 登入設定**：環境變數 VITE_APP_API_MOCK_ENABLED 用於設定是否使用模擬api登入的功能。若不需要實現模擬api登入的功能，請將 VITE_APP_API_MOCK_ENABLED 設置為 false。

## CICD

### GitHub Pages 部署

專案已設定自動部署到 GitHub Pages。當推送到 `main` 分支時，會自動觸發部署流程。

#### 部署步驟

1. **啟用 GitHub Pages**
   - 前往倉庫的 Settings > Pages
   - Source 選擇 "GitHub Actions"

2. **設定環境變數**
   - 環境變數檔案位於 `build-config/` 資料夾
   - 根據分支自動載入對應的 `.env` 檔案：
     - `main` → `build-config/.env.main`
     - `develop` → `build-config/.env.develop`
     - `staging` → `build-config/.env.staging`

3. **修改環境變數**
   - 編輯 `build-config/.env.main` 中的設定
   - 將 `YOUR_GITHUB_USERNAME` 替換為您的 GitHub 使用者名稱
   - 填入正確的 API URL、LIFF ID 等資訊

4. **推送程式碼**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

5. **查看部署狀態**
   - 前往 Actions 頁面查看部署進度
   - 部署完成後可在 `https://YOUR_USERNAME.github.io/n8n-test-front-end-page` 訪問

#### 使用 GitHub Secrets（選用）

如果需要使用敏感資訊：

1. 前往倉庫的 Settings > Secrets and variables > Actions
2. 新增 Repository secrets
3. 在 `.github/workflows/deploy.yml` 的 "Copy environment config" 步驟中取消註解 sed 指令
4. 在 `build-config/.env.main` 中使用 placeholder（如 `__VITE_APP_API_URL__`）

### AWS 部署（UAT）

- 請到 github repo 中設定環境變數
- Environment secrets 請找 TL 進行設定

#### Environments
- uat-deploy

#### Environment secrets
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY

#### Environment variables
- CLOUDFRONT_DISTRIBUTION_ID
- S3_BUCKET_NAME

## Folder Structure
AKIA4J6PDYZOJBVJULGZ

```
liff-token-login-frontend-template-vite
├─ .eslintrc
├─ .prettierrc
├─ README.md
├─ build-config  // env檔案
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ images
│     └─ vector.png
├─ src
│  ├─ App.tsx
│  ├─ apps
│  │  ├─ api
│  │  │  ├─ api.ts    // api 攔截器
│  │  │  ├─ index.ts
│  │  │  └─ user
│  │  │     ├─ index.ts
│  │  │     ├─ user.api.ts
│  │  │     └─ user.dto.ts
│  │  ├─ components
│  │  │  └─ index.tsx
│  │  ├─ global
│  │  │  ├─ const
│  │  │  │  ├─ env.ts
│  │  │  │  └─ index.ts
│  │  │  └─ types
│  │  │     ├─ index.ts
│  │  │     └─ typeError.ts  // 整理所有 error code
│  │  ├─ hooks
│  │  │  └─ index.tsx
│  │  ├─ layouts
│  │  │  ├─ index.tsx
│  │  │  ├─ layout
│  │  │  │  ├─ Layout.module.scss
│  │  │  │  ├─ Layout.tsx
│  │  │  │  └─ index.tsx
│  │  │  └─ login-guard     // 登入驗證
│  │  │     ├─ LiffLoginGuard.tsx
│  │  │     └─ index.ts
│  │  ├─ pages
│  │  │  ├─ example-page
│  │  │  │  ├─ ExamplePage.module.scss
│  │  │  │  ├─ ExamplePage.tsx
│  │  │  │  └─ index.tsx
│  │  │  └─ index.tsx
│  │  └─ utils
│  │     ├─ getAssetUrl.ts
│  │     └─ index.ts
│  ├─ assets
│  │  ├─ fonts
│  │  │  └─ Satisfy-Regular.ttf
│  │  └─ images
│  │     └─ vector.png
│  ├─ index.css
│  ├─ main.tsx
│  ├─ routes.tsx
│  └─ vite-env.d.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ vite.config.ts
└─ yarn.lock

```

```
建立檔案及資料夾請依循以下規則：

pages
    ├── home-page  // 資料夾命名規則：單字間用-連接
    │   ├── HomePage.jsx       // HomePage 主程式; 檔案命名規則：駝峰
    │   ├── HomePage.module.scss // HomePage 樣式
    │   └── index.jsx          // 導出home-page元件
    ├── example-page
    │   ├── ExamplePage.jsx    // ExamplePage 主程式
    │   ├── ExamplePage.module.scss // ExamplePage 樣式
    │   └── index.jsx          // 導出example-page元件
    └── index.jsx              // 導出pages下所有元件

```
