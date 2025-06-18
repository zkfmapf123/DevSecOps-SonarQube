# 🔍 SonarQube SAST 테스트 예제 코드

이 디렉토리는 SonarQube의 SAST(Static Application Security Testing) 기능을 테스트하기 위한 다양한 보안 취약점 예제 코드들을 포함합니다.

## 📁 프로젝트 구조

```
apis/
├── java-vulnerabilities/          # Java 취약점 예제
│   ├── src/main/java/
│   │   └── com/example/
│   │       └── SecurityVulnerabilities.java
│   ├── pom.xml
│   └── README.md
├── typescript-vulnerabilities/    # TypeScript 취약점 예제
│   ├── src/
│   │   ├── security-vulnerabilities.ts
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── sonar-project.properties      # SonarQube 분석 설정
└── README.md                     # 이 파일
```

## 🚨 포함된 취약점 카테고리

### 🔴 **Critical (치명적)**
- **SQL Injection**: 데이터베이스 조작 공격
- **Command Injection**: 시스템 명령어 실행 공격
- **Path Traversal**: 파일 시스템 접근 공격

### 🟠 **Major (주요)**
- **Cross-Site Scripting (XSS)**: 웹 페이지 조작 공격
- **Weak Encryption**: 약한 암호화 알고리즘
- **Insecure Deserialization**: 안전하지 않은 역직렬화

### 🟡 **Minor (보조)**
- **Hardcoded Password**: 하드코딩된 비밀번호
- **Weak Hash**: 약한 해시 알고리즘
- **Insecure Random**: 예측 가능한 난수

### 🔵 **Info (정보)**
- **Log Injection**: 로그 조작
- **Sensitive Data Exposure**: 민감한 데이터 노출
- **Information Disclosure**: 정보 노출

## 🚀 빠른 시작

### 1. **Java 프로젝트 빌드**
```bash
cd java-vulnerabilities
mvn clean compile
```

### 2. **TypeScript 프로젝트 빌드**
```bash
cd typescript-vulnerabilities
npm install
npm run build
```

### 3. **SonarQube 분석 실행**
```bash
# SonarQube Scanner 설치 (필요한 경우)
# https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/

# 분석 실행
sonar-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=your-sonarqube-token
```

## 🔍 예상 SAST 결과

SonarQube에서 다음과 같은 보안 이슈들이 감지될 것으로 예상됩니다:

### **Java 프로젝트**
- **Critical**: 3개 (SQL Injection, Command Injection, Path Traversal)
- **Major**: 4개 (XSS, Weak Encryption, Deserialization, Sensitive Data)
- **Minor**: 3개 (Hardcoded Password, Weak Hash, Insecure Random)
- **Info**: 2개 (Log Injection, Information Disclosure)

### **TypeScript 프로젝트**
- **Critical**: 3개 (SQL Injection, Command Injection, Path Traversal)
- **Major**: 5개 (XSS, Weak Encryption, Prototype Pollution, NoSQL Injection, Directory Traversal)
- **Minor**: 4개 (Hardcoded Password, Weak Hash, Insecure Random, Weak Session)
- **Info**: 4개 (Log Injection, Sensitive Data, Information Disclosure, Race Condition)

## 📊 SonarQube 대시보드

분석 완료 후 SonarQube 대시보드에서 다음을 확인할 수 있습니다:

1. **Security Hotspots**: 보안 취약점 위치
2. **Security Rating**: 보안 등급 (A~E)
3. **Vulnerabilities**: 취약점 개수 및 심각도
4. **Code Smells**: 코드 품질 이슈
5. **Duplications**: 중복 코드

## 🛠️ 취약점 수정 가이드

각 프로젝트의 README.md 파일에서 취약점 수정 방법을 확인할 수 있습니다:

- [Java 취약점 수정 가이드](./java-vulnerabilities/README.md#취약점-수정-예제)
- [TypeScript 취약점 수정 가이드](./typescript-vulnerabilities/README.md)

## 🔧 SonarQube 설정 팁

### **품질 게이트 설정**
```properties
# sonar-project.properties
sonar.qualitygate.wait=true
```

### **언어별 플러그인**
- Java: SonarJava 플러그인 (기본 포함)
- TypeScript: SonarTS 플러그인 (기본 포함)

### **보안 규칙 활성화**
SonarQube 관리자 페이지에서 다음 규칙들을 활성화하세요:
- Security Hotspots
- OWASP Top 10
- SANS Top 25

## 📚 추가 리소스

- [SonarQube Security Documentation](https://docs.sonarqube.org/latest/user-guide/security/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [SANS Top 25](https://www.sans.org/top25-software-weaknesses/)
- [SonarQube Security Rules](https://rules.sonarsource.com/)

## ⚠️ 중요 주의사항

이 코드는 **교육 및 테스트 목적**으로만 사용하세요. 실제 프로덕션 환경에서는 절대 사용하지 마세요!

모든 취약점은 의도적으로 포함된 것으로, 실제 보안 공격에 사용될 수 있습니다. 