# Java SAST 취약점 예제

SonarQube SAST 테스트를 위한 Java 보안 취약점 예제 코드입니다.

## 🚨 포함된 취약점들

### 1. **SQL Injection**
- 사용자 입력을 직접 SQL 쿼리에 삽입
- `Statement` 사용으로 인한 취약점
- 예: `"SELECT * FROM users WHERE id = " + userInput`

### 2. **Cross-Site Scripting (XSS)**
- 사용자 입력을 HTML에 직접 출력
- `HttpServletResponse`에 직접 출력
- 예: `response.getWriter().println("<div>" + userInput + "</div>")`

### 3. **Command Injection**
- 사용자 입력을 시스템 명령어에 삽입
- `Runtime.getRuntime().exec()` 사용
- 예: `"ping " + userInput`

### 4. **Path Traversal**
- 사용자 입력을 파일 경로로 직접 사용
- 경로 검증 없이 파일 접근
- 예: `new File("/var/www/files/" + fileName)`

### 5. **Weak Encryption**
- 하드코딩된 키와 약한 암호화 알고리즘
- ECB 모드 사용
- 예: `AES/ECB/PKCS5Padding`

### 6. **Weak Hash**
- MD5 해시 사용
- 취약한 해시 알고리즘
- 예: `MessageDigest.getInstance("MD5")`

### 7. **Hardcoded Password**
- 소스 코드에 비밀번호 하드코딩
- 민감한 정보 노출
- 예: `String password = "admin123"`

### 8. **Insecure Random**
- 예측 가능한 난수 생성
- `Random` 클래스 사용
- 예: `new Random().nextInt(1000)`

### 9. **Log Injection**
- 사용자 입력을 로그에 직접 기록
- 로그 조작 가능
- 예: `System.out.println("User action: " + userInput)`

### 10. **Deserialization**
- 안전하지 않은 역직렬화
- `ObjectInputStream` 사용
- 예: `ois.readObject()`

### 11. **Sensitive Data Exposure**
- 민감한 데이터를 로그에 출력
- 신용카드, SSN 등 노출
- 예: `System.out.println("Credit Card: " + creditCard)`

## 🚀 실행 방법

### 1. Maven 빌드
```bash
mvn clean compile
```

### 2. JAR 파일 생성
```bash
mvn package
```

### 3. 실행
```bash
java -cp target/java-vulnerabilities-1.0.0.jar com.example.SecurityVulnerabilities
```

## 🔍 SonarQube 분석

### 1. **SonarQube Scanner 설정**
```bash
# sonar-project.properties 파일 생성
sonar.projectKey=java-vulnerabilities
sonar.projectName=Java Vulnerabilities Example
sonar.projectVersion=1.0.0
sonar.sources=src/main/java
sonar.java.binaries=target/classes
sonar.java.libraries=target/lib/*.jar
```

### 2. **분석 실행**
```bash
sonar-scanner
```

### 3. **Maven 플러그인 사용**
```bash
mvn sonar:sonar \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=your-token
```

## 📊 예상 SAST 결과

SonarQube에서 다음과 같은 보안 이슈들이 감지될 것으로 예상됩니다:

- **Critical**: SQL Injection, Command Injection
- **Major**: XSS, Path Traversal, Weak Encryption
- **Minor**: Hardcoded Password, Weak Hash, Insecure Random
- **Info**: Log Injection, Sensitive Data Exposure

## 🛠️ 취약점 수정 예제

### SQL Injection 수정
```java
// 취약한 코드
String query = "SELECT * FROM users WHERE id = " + userInput;

// 안전한 코드
PreparedStatement pstmt = conn.prepareStatement("SELECT * FROM users WHERE id = ?");
pstmt.setString(1, userInput);
```

### XSS 수정
```java
// 취약한 코드
response.getWriter().println("<div>" + userInput + "</div>");

// 안전한 코드
String escapedInput = StringEscapeUtils.escapeHtml4(userInput);
response.getWriter().println("<div>" + escapedInput + "</div>");
```

## ⚠️ 주의사항

이 코드는 **교육 목적**으로만 사용하세요. 실제 프로덕션 환경에서는 절대 사용하지 마세요!

## 📚 추가 리소스

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [SonarQube Security Rules](https://rules.sonarsource.com/java/tag/security)
- [Java Security Best Practices](https://www.oracle.com/java/technologies/javase/seccodeguide.html) 