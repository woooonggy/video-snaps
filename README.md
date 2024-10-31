## 개발 환경
- TypeScript
- React + Vite
---


## 작업 내역
#### 실행 방법

```js
 > npm i
 > npm run dev

 "dev": "concurrently \"npm:mock\" \"vite\"",
 "mock": "node mock-server.js",
```
---

#### 주요 라이브러리
- 상태관리 : recoil
- 스타일 : scss
- shaka @types 미지원으로 인한 cdn 처리
---

#### 참고
- json-server : localhost:3001 (proxy localhost:3000/api->localhost:3001)
- mock setting : root 하위 폴더 구성
```js
server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
```
```
root
├── README.md
├── eslint.config.js
├── index.html
├── mock-responses
│   ├── play
│   └── programs
├── mock-server.js
```
--- 

## 디렉토리 구조
```
src
├── App.css
├── App.tsx
├── assets
│   └── react.svg
├── common
│   ├── constants.comp.tsx
│   ├── constants.ts
│   └── utils.ts
├── components
│   ├── Alert.comp.tsx
│   ├── Alert.module.scss
│   ├── BottomSheet.comp.tsx
│   ├── BottomSheet.module.scss
│   ├── SeekBar.comp.tsx
│   ├── SeekBar.module.scss
│   ├── Swiper.comp.tsx
│   ├── Swiper.module.scss
│   ├── Video.comp.tsx
│   └── Video.module.scss
├── hooks
│   └── useVideoPlayer.tsx
├── index.css
├── main.tsx
├── pages
│   ├── VideoPlayer.tsx
│   └── VideoPlayerList.tsx
├── recoil
│   ├── playState.ts
│   └── programState.ts
├── types
│   ├── api.types.ts
│   ├── component.interfaces.ts
│   └── data.types.ts
└── vite-env.d.ts
```
