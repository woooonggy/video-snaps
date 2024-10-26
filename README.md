# React + TypeScript + Vite

SSR을 굳이 요구하지 않는 프로젝트로 보였으며 간단한 설정과 빠른 빌드 속도 및 작업이 가능하여 vite를 선택하였습니다.

## 작업 내역 설명

- 실행 방법

```js
 > npm i
 > npm run dev

 "dev": "concurrently \"npm:mock\" \"vite\"",
 "mock": "node mock-server.js",
```

- json-server : localhost:3001 (proxy localhost:3000/api->localhost:3001)
- recoil : 단순하고 직관적으로 클라이언트 상태 관리 가능하다고 판단하여 적용
- scss: 스타일링 시 더 나은 구조 또는 재사용성, mixin 등의 기능을 고려하여 적용
