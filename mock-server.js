import jsonServer from "json-server";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// __dirname 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// 커스텀 라우터 생성
const router = jsonServer.router({});

// 서버 미들웨어 사용
server.use(middlewares);

// 동적 경로 설정 함수
server.use((req, res, next) => {
  const baseDir = path.join(__dirname, "mock-responses"); // JSON 파일이 있는 기본 폴더

  // 요청 경로를 바탕으로 파일 경로 결정
  const filePath = path.join(baseDir, `${req.path}.json`);

  // JSON 파일이 존재하면 해당 파일을 응답으로 전송
  if (fs.existsSync(filePath)) {
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    res.json(jsonData);
  } else {
    next(); // 파일이 없으면 다음 미들웨어로 이동
  }
});

// json-server 라우터 설정
server.use(router);

// 서버 시작
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Mock server is running at http://localhost:${PORT}`);
});
