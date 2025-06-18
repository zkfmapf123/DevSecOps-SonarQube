import { ExpressVulnerabilities, SecurityVulnerabilities } from './security-vulnerabilities';

// SAST 테스트를 위한 메인 실행 파일
export class VulnerabilityDemo {
    private securityVulns = new SecurityVulnerabilities();
    private expressVulns = new ExpressVulnerabilities();
    
    public runAllVulnerabilities(): void {
        console.log('🚨 SAST 테스트용 취약점 예제 실행 중...\n');
        
        // SQL Injection 테스트
        this.securityVulns.sqlInjectionVulnerable("1; DROP TABLE users; --");
        
        // XSS 테스트
        const xssResult = this.securityVulns.xssVulnerable("<script>alert('XSS')</script>");
        console.log('XSS Result:', xssResult);
        
        // Command Injection 테스트
        this.securityVulns.commandInjectionVulnerable("localhost; rm -rf /");
        
        // Path Traversal 테스트
        this.securityVulns.pathTraversalVulnerable("../../../etc/passwd");
        
        // Weak Encryption 테스트
        const encrypted = this.securityVulns.weakEncryption("secret data");
        console.log('Encrypted:', encrypted);
        
        // Weak Hash 테스트
        const hashed = this.securityVulns.weakHash("password123");
        console.log('Hashed:', hashed);
        
        // Hardcoded Password 테스트
        this.securityVulns.hardcodedPassword();
        
        // Insecure Random 테스트
        const random = this.securityVulns.insecureRandom();
        console.log('Random:', random);
        
        // Log Injection 테스트
        this.securityVulns.logInjectionVulnerable("malicious\nlog\ninjection");
        
        // Sensitive Data Exposure 테스트
        this.securityVulns.sensitiveDataExposure();
        
        // Prototype Pollution 테스트
        this.securityVulns.prototypePollutionVulnerable({
            "__proto__": { "isAdmin": true }
        });
        
        // NoSQL Injection 테스트
        this.securityVulns.noSqlInjectionVulnerable('{"$gt": ""}');
        
        // Directory Traversal 테스트
        this.securityVulns.directoryTraversalVulnerable("../../../etc/shadow");
        
        // Weak Session Management 테스트
        this.securityVulns.weakSessionManagement();
        
        // Information Disclosure 테스트
        this.securityVulns.informationDisclosure(new Error("Internal server error details"));
        
        // Insecure Deserialization 테스트
        this.securityVulns.insecureDeserialization('{"constructor": {"prototype": {"isAdmin": true}}}');
        
        // Race Condition 테스트
        this.securityVulns.raceConditionVulnerable();
        
        console.log('\n✅ 모든 취약점 예제가 실행되었습니다.');
        console.log('🔍 이제 SonarQube에서 SAST 분석을 실행하세요!');
    }
    
    public startVulnerableServer(port: number = 3000): void {
        console.log(`🚨 취약점이 있는 서버를 포트 ${port}에서 시작합니다...`);
        this.expressVulns.start(port);
        console.log(`📝 테스트 URL:`);
        console.log(`   XSS: http://localhost:${port}/xss?input=<script>alert('XSS')</script>`);
        console.log(`   SQL: http://localhost:${port}/sql?id=1;DROP TABLE users;--`);
        console.log(`   File: http://localhost:${port}/file?file=../../../etc/passwd`);
    }
}

// 메인 실행
if (require.main === module) {
    const demo = new VulnerabilityDemo();
    
    // 명령행 인수 확인
    const args = process.argv.slice(2);
    
    if (args.includes('--server')) {
        const port = parseInt(args[args.indexOf('--port') + 1]) || 3000;
        demo.startVulnerableServer(port);
    } else {
        demo.runAllVulnerabilities();
    }
} 