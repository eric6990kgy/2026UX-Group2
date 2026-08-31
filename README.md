# 樂聲 KTV｜LeSheng KTV
**UX for AI in Karaoke for the Elderly** — 2026 UX 課程專題（Group 2）

專為長者設計的語音搜尋 KTV 唱歌 App，透過「語音說歌名」「哼唱找歌」等低操作門檻的互動方式，降低長者使用行動裝置點歌的認知與操作負擔，並結合社群揪歌功能，讓長者能與親友一起遠端合唱。

本 repository 為 **Hi-fi Prototype** 的前端程式碼實作（React + TypeScript），對應設計流程中的 HW5 產出。

---

## 🔗 專案相關連結

| 內容 | 連結 |
|---|---|
| Hi-fi Prototype（線上 Demo） | https://react-example-ktv.vercel.app/ |
| Lo-fi Prototype（Figma） | [Figma 連結](https://www.figma.com/proto/zik1H3ZvW8xMKTtH3qepSo/Karaoke_UX) |
| 完整作品集 / 研究歷程（訪談、Persona、Affinity Diagram、易用性評估等） | https://112306032.wixsite.com/my-site |

---

## 👤 我在本專案中的角色

在此小組專題中，我主要負責：

- **功能定義（Feature Definition）**：根據使用者訪談與 Persona 分析結果，定義 App 的核心功能範圍與資訊架構（語音／哼唱找歌、瀏覽、我的最愛、社群揪歌、KTV 播放模式）。
- **設計與製作 Prototype**：從 Lo-fi Prototype（Figma）到 Hi-fi Prototype，負責介面設計、互動流程規劃，並實作本 repository 中的 React 前端程式碼，將設計稿轉化為可互動的高保真原型。

> 完整的使用者研究過程（訪談、CI Report、Persona、Affinity Diagram、Sketch、Heuristic Evaluation）請見上方作品集連結。

---

## ✨ 功能特色

| 功能 | 對應頁面 / 元件 | 說明 |
|---|---|---|
| 首頁導覽 | `HomePage` | 提供大字體、大按鈕的入口設計，符合長者友善操作原則 |
| 語音找歌 | `VoiceSearchPage`、`MicButton`、`ListeningOverlay` | 點擊大型麥克風以語音說出歌名或歌手 |
| 哼唱找歌 | `VoiceSearchPage`（哼唱模式）、`useVoiceSearch` | 哼唱旋律，模擬辨識並回傳歌曲結果 |
| 歌曲瀏覽 | `BrowsePage` | 依分類 / 熱門排行瀏覽歌曲清單 |
| 搜尋結果 | `SearchResultsPage` | 呈現語音辨識後的歌曲比對結果 |
| 歌曲詳情 | `SongDetailPage` | 顯示歌曲資訊、歌詞預覽 |
| KTV 播放模式 | `KTVModePage`、`useKTVPlayer` | 大字幕歌詞跟唱介面，強化長者可讀性 |
| 我的最愛 | `FavoritesPage`、`useFavorites` | 收藏常唱歌曲，方便快速再次點播 |
| 社群揪歌 / 邀請好友 | `InvitePage` | 透過 LINE / 簡訊邀請親友，並可加入好友正在演唱的房間 |
| 中 / 英語切換 | `useLanguage`、`LanguageButton` | 全站雙語支援，兼顧不同使用族群 |

> 目前語音辨識、哼唱搜尋為前端模擬（mock）結果，用於原型階段驗證互動流程與可用性，尚未串接真實語音辨識服務。

---

## 🛠️ 技術棧

- **框架**：React 19 + TypeScript
- **建置工具**：Vite 6
- **路由**：React Router v7
- **樣式**：Tailwind CSS 4
- **動畫**：Motion（Framer Motion）
- **圖示**：lucide-react
- **其他**：Axios（API 請求封裝）、Express（後端／伺服器端保留擴充）、@google/genai（預留 Gemini API 整合介面）

---

## 📁 專案結構

```
src/
├── components/       # 依功能模組分類的元件（browse / common / home / ktv / song / voice）
├── hooks/            # 自訂 hooks（語言切換、最愛、KTV 播放器、語音搜尋、Toast）
├── layouts/          # 全站版面（含底部導覽列）
├── mock/             # 展示用假資料（歌曲、歌手、歌詞、使用者）
├── pages/            # 各路由頁面
├── router/           # 路由設定
├── services/         # API 服務封裝
└── types/            # TypeScript 型別定義
```

---

## 🚀 安裝與執行

```bash
# 安裝套件
npm install

# 啟動開發伺服器（預設 http://localhost:3000）
npm run dev

# 建置正式版
npm run build

# 型別檢查
npm run lint
```

### 環境變數

複製 `.env.example` 為 `.env`，並視需求填入：

```
GEMINI_API_KEY="your_gemini_api_key"
APP_URL="your_app_url"
```

---

## 👥 團隊

本專案為 2026 UX 課程 Group 2 之小組協作成果，涵蓋使用者研究、介面設計與原型製作等完整 UX 流程。
