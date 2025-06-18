# 🔄 GitHub Actions SonarQube SAST 워크플로우

이 디렉토리는 SonarQube SAST 분석을 자동화하는 GitHub Actions 워크플로우들을 포함합니다.

## 📁 워크플로우 파일

### 1. **Java SonarQube SAST** (`java-sonarqube.yml`)
- **대상**: `apis/java-vulnerabilities/` 디렉토리
- **트리거**: main/develop 브랜치 push, PR, 수동 실행
- **기능**:
  - JDK 11 설정
  - Maven 빌드 및 컴파일
  - SonarQube SAST 분석
  - PR 코멘트 자동 생성
  - 분석 리포트 아티팩트 저장

### 2. **TypeScript SonarQube SAST** (`typescript-sonarqube.yml`)
- **대상**: `apis/typescript-vulnerabilities/` 디렉토리
- **트리거**: main/develop 브랜치 push, PR, 수동 실행
- **기능**:
  - Node.js 18 설정
  - TypeScript 빌드
  - SonarQube SAST 분석
  - npm audit 보안 검사
  - PR 코멘트 자동 생성
  - 분석 리포트 아티팩트 저장

## 🔧 설정 요구사항

### **GitHub Secrets 설정**
다음 시크릿들을 GitHub 저장소에 등록해야 합니다:

1. **SONAR_HOST_URL**: SonarQube 서버 URL
   ```
   예: https://sonarqube.your-domain.com
   ```

2. **SONAR_TOKEN**: SonarQube 인증 토큰
   ```
   SonarQube > My Account > Security > Generate Tokens
   ```


### **SonarQube 프로젝트 설정**
각 프로젝트가 SonarQube에 미리 생성되어 있어야 합니다:
- `java-vulnerabilities`
- `typescript-vulnerabilities`

## 🚀 워크플로우 실행

### **자동 실행**
- `main` 또는 `develop` 브랜치에 push
- 해당 디렉토리 변경사항이 있는 PR 생성

### **수동 실행**
1. GitHub 저장소 > Actions 탭
2. 원하는 워크플로우 선택
3. "Run workflow" 버튼 클릭

## 📊 예상 결과

### **Java 프로젝트 분석 결과**
- **Critical**: 3개 취약점 (SQL Injection, Command Injection, Path Traversal)
- **Major**: 4개 취약점 (XSS, Weak Encryption, Deserialization, Sensitive Data)
- **Minor**: 3개 취약점 (Hardcoded Password, Weak Hash, Insecure Random)
- **Info**: 2개 취약점 (Log Injection, Information Disclosure)

### **TypeScript 프로젝트 분석 결과**
- **Critical**: 3개 취약점 (SQL Injection, Command Injection, Path Traversal)
- **Major**: 5개 취약점 (XSS, Weak Encryption, Prototype Pollution, NoSQL Injection, Directory Traversal)
- **Minor**: 4개 취약점 (Hardcoded Password, Weak Hash, Insecure Random, Weak Session)
- **Info**: 4개 취약점 (Log Injection, Sensitive Data, Information Disclosure, Race Condition)

## 🔍 PR 코멘트 기능

Pull Request가 생성되면 자동으로 다음과 같은 정보가 포함된 코멘트가 추가됩니다:

- 📊 분석 결과 요약
- 🔗 SonarQube 대시보드 링크
- 🚨 예상 보안 이슈 목록
- 📝 다음 단계 가이드

## 📦 아티팩트

각 워크플로우 실행 후 다음 아티팩트가 생성됩니다:
- **sonarqube-report**: Java 분석 리포트
- **sonarqube-report-typescript**: TypeScript 분석 리포트

아티팩트는 30일간 보관되며, GitHub Actions 탭에서 다운로드 가능합니다.

## ⚙️ 커스터마이징

### **분석 설정 변경**
워크플로우 파일의 `args` 섹션에서 SonarQube 분석 옵션을 수정할 수 있습니다:

```yaml
args: >
  -Dsonar.projectKey=your-project-key
  -Dsonar.projectName=Your Project Name
  -Dsonar.sources=your/source/path
  # 추가 옵션들...
```

### **품질 게이트 설정**
```yaml
-Dsonar.qualitygate.wait=true
```

### **브랜치 필터링**
```yaml
on:
  push:
    branches: [ main, develop, feature/* ]
```

## 🛠️ 문제 해결

### **일반적인 문제들**

1. **SonarQube 연결 실패**
   - `SONAR_HOST_URL`과 `SONAR_TOKEN` 확인
   - SonarQube 서버 상태 확인

2. **빌드 실패**
   - 의존성 설치 확인
   - 소스 코드 문법 오류 확인

3. **분석 결과 없음**
   - 소스 코드 경로 설정 확인
   - 파일 확장자 필터 확인

### **로그 확인**
GitHub Actions 탭에서 각 스텝의 로그를 확인하여 문제를 진단할 수 있습니다.

## 📚 추가 리소스
- [SonarQube GitHub Actions 가이드](https://docs.sonarqube.org/latest/analysis/github-integration/)
- [GitHub Actions 공식 문서](https://docs.github.com/en/actions)
- [SonarQube Quality Gate 설정](https://docs.sonarqube.org/latest/user-guide/quality-gates/) 