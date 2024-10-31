## 개발 환경
- TypeScript
- React + Vite
---

## 작업 내역 설명

- 실행 방법

```js
 > npm i
 > npm run dev

 "dev": "concurrently \"npm:mock\" \"vite\"",
 "mock": "node mock-server.js",
```

---
## 참고
- json-server : localhost:3001 (proxy localhost:3000/api->localhost:3001)
