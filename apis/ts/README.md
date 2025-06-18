# TypeScript SAST 취약점 예제

SonarQube SAST 테스트를 위한 TypeScript 보안 취약점 예제 코드입니다.

## 🚨 포함된 취약점들

### 1. **SQL Injection**
- 사용자 입력을 직접 SQL 쿼리에 삽입
- 예: `SELECT * FROM users WHERE id = ${userInput}`

### 2. **Cross-Site Scripting (XSS)**
- 사용자 입력을 HTML에 직접 출력
- 예: `<div>${userInput}</div>`

### 3. **Command Injection**
- 사용자 입력을 시스템 명령어에 삽입
- 예: `ping ${userInput}`

### 4. **Path Traversal**
- 사용자 입력을 파일 경로로 직접 사용
- 예: `/var/www/files/${fileName}`

### 5. **Weak Encryption**
- 하드코딩된 키와 약한 암호화 알고리즘
- ECB 모드 사용

### 6. **Weak Hash**
- MD5 해시 사용
- 취약한 해시 알고리즘

### 7. **Hardcoded Password**
- 소스 코드에 비밀번호 하드코딩
- 민감한 정보 노출

### 8. **Insecure Random**
- 예측 가능한 난수 생성
- `Math.random()` 사용

### 9. **Log Injection**
- 사용자 입력을 로그에 직접 기록
- 로그 조작 가능

### 10. **Sensitive Data Exposure**
- 민감한 데이터를 로그에 출력
- 신용카드, SSN 등 노출

### 11. **Prototype Pollution**
- 사용자 입력을 객체에 직접 할당
- `Object.assign()` 사용

### 12. **NoSQL Injection**
- MongoDB 쿼리에 사용자 입력 직접 삽입
- NoSQL 데이터베이스 공격

### 13. **Directory Traversal**
- 파일 경로 검증 없이 사용자 입력 사용
- 시스템 파일 접근 가능

### 14. **Weak Session Management**
- 약한 세션 ID 생성
- 예측 가능한 세션

### 15. **Information Disclosure**
- 상세한 에러 정보 노출
- 스택 트레이스 등

### 16. **Insecure Deserialization**
- 안전하지 않은 JSON 역직렬화
- `JSON.parse()` 사용

### 17. **Race Condition**
- 동시성 문제
- 비동기 작업에서 발생

## 🚀 실행 방법

### 1. 의존성 설치
```bash
npm install
```

### 2. TypeScript 컴파일
```bash
npm run build
```

### 3. 취약점 예제 실행
```bash
npm start
```

### 4. 취약점 서버 실행
```bash
npm run dev -- --server --port 3000
```

## 📝 테스트 URL (서버 모드)

- **XSS 테스트**: `http://localhost:3000/xss?input=<script>alert('XSS')</script>`
- **SQL Injection 테스트**: `http://localhost:3000/sql?id=1;DROP TABLE users;--`
- **Path Traversal 테스트**: `http://localhost:3000/file?file=../../../etc/passwd`
