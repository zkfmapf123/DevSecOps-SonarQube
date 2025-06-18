import * as childProcess from 'child_process';
import * as crypto from 'crypto';
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

export class SecurityVulnerabilities {
    
    // SQL Injection 취약점
    public sqlInjectionVulnerable(userInput: string): void {
        // 취약점: 사용자 입력을 직접 쿼리에 삽입
        const query = `SELECT * FROM users WHERE id = ${userInput}`; // SQL Injection 위험
        console.log('Executing query:', query);
    }
    
    // XSS 취약점
    public xssVulnerable(userInput: string): string {
        // 취약점: 사용자 입력을 직접 HTML에 삽입
        return `<div>${userInput}</div>`; // XSS 위험
    }
    
    // Command Injection 취약점
    public commandInjectionVulnerable(userInput: string): void {
        try {
            // 취약점: 사용자 입력을 직접 명령어에 삽입
            const command = `ping ${userInput}`; // Command Injection 위험
            childProcess.exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error('Error:', error);
                    return;
                }
                console.log('Output:', stdout);
            });
        } catch (error) {
            console.error('Command execution error:', error);
        }
    }
    
    // Path Traversal 취약점
    public pathTraversalVulnerable(fileName: string): void {
        try {
            // 취약점: 사용자 입력을 파일 경로로 직접 사용
            const filePath = path.join('/var/www/files', fileName); // Path Traversal 위험
            const content = fs.readFileSync(filePath, 'utf8');
            console.log('File content:', content);
        } catch (error) {
            console.error('File read error:', error);
        }
    }
    
    // Weak Encryption 취약점
    public weakEncryption(plaintext: string): string {
        // 취약점: 하드코딩된 키와 약한 암호화
        const key = '1234567890123456'; // 약한 키
        const cipher = crypto.createCipher('aes-128-ecb', key); // ECB 모드 사용 (약함)
        let encrypted = cipher.update(plaintext, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
    
    // Weak Hash 취약점
    public weakHash(password: string): string {
        // 취약점: MD5 사용 (약한 해시)
        const hash = crypto.createHash('md5').update(password).digest('hex');
        return hash;
    }
    
    // Hardcoded Password 취약점
    public hardcodedPassword(): void {
        // 취약점: 하드코딩된 비밀번호
        const password = 'admin123'; // 하드코딩된 비밀번호
        const dbPassword = 'superSecretPassword123'; // 하드코딩된 DB 비밀번호
        console.log('Connecting with password:', password);
    }
    
    // Insecure Random 취약점
    public insecureRandom(): number {
        // 취약점: 예측 가능한 난수 생성
        return Math.random(); // 예측 가능한 난수
    }
    
    // Log Injection 취약점
    public logInjectionVulnerable(userInput: string): void {
        // 취약점: 사용자 입력을 로그에 직접 기록
        console.log('User action:', userInput); // Log Injection 위험
    }
    
    // Sensitive Data Exposure 취약점
    public sensitiveDataExposure(): void {
        // 취약점: 민감한 데이터를 로그에 출력
        const creditCard = '1234-5678-9012-3456';
        const ssn = '123-45-6789';
        console.log('Credit Card:', creditCard); // 민감한 데이터 노출
        console.log('SSN:', ssn); // 민감한 데이터 노출
    }
    
    // Prototype Pollution 취약점
    public prototypePollutionVulnerable(userInput: any): void {
        // 취약점: 사용자 입력을 객체에 직접 할당
        const obj: any = {};
        Object.assign(obj, userInput); // Prototype Pollution 위험
        console.log('Object:', obj);
    }
    
    // NoSQL Injection 취약점
    public noSqlInjectionVulnerable(userInput: string): void {
        // 취약점: 사용자 입력을 MongoDB 쿼리에 직접 삽입
        const query = `{"username": "${userInput}"}`; // NoSQL Injection 위험
        console.log('MongoDB query:', query);
    }
    
    // Directory Traversal 취약점
    public directoryTraversalVulnerable(filePath: string): void {
        try {
            // 취약점: 사용자 입력을 파일 경로로 직접 사용
            const fullPath = path.resolve('/var/www/files', filePath); // Directory Traversal 위험
            const stats = fs.statSync(fullPath);
            console.log('File stats:', stats);
        } catch (error) {
            console.error('File access error:', error);
        }
    }
    
    // Weak Session Management 취약점
    public weakSessionManagement(): void {
        // 취약점: 약한 세션 ID 생성
        const sessionId = Math.random().toString(36).substring(2); // 약한 세션 ID
        console.log('Session ID:', sessionId);
    }
    
    // Information Disclosure 취약점
    public informationDisclosure(error: Error): void {
        // 취약점: 상세한 에러 정보 노출
        console.error('Detailed error:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        }); // 정보 노출 위험
    }
    
    // Insecure Deserialization 취약점
    public insecureDeserialization(data: string): void {
        try {
            // 취약점: 안전하지 않은 역직렬화
            const obj = JSON.parse(data); // 역직렬화 위험
            console.log('Deserialized object:', obj);
        } catch (error) {
            console.error('Deserialization error:', error);
        }
    }
    
    // Race Condition 취약점
    public raceConditionVulnerable(): void {
        // 취약점: 경쟁 상태 가능성
        let counter = 0;
        
        // 여러 비동기 작업이 동시에 counter를 수정
        setTimeout(() => { counter++; }, 100);
        setTimeout(() => { counter++; }, 100);
        setTimeout(() => { counter++; }, 100);
        
        console.log('Counter:', counter); // 예측 불가능한 결과
    }
}

// Express.js 취약점 예제
export class ExpressVulnerabilities {
    private app = express();
    
    constructor() {
        this.setupVulnerableRoutes();
    }
    
    private setupVulnerableRoutes(): void {
        // XSS 취약점이 있는 라우트
        this.app.get('/xss', (req, res) => {
            const userInput = req.query.input as string;
            // 취약점: 사용자 입력을 직접 HTML에 출력
            res.send(`<div>${userInput}</div>`); // XSS 위험
        });
        
        // SQL Injection 취약점이 있는 라우트
        this.app.get('/sql', (req, res) => {
            const userId = req.query.id as string;
            // 취약점: 사용자 입력을 직접 쿼리에 삽입
            const query = `SELECT * FROM users WHERE id = ${userId}`; // SQL Injection 위험
            res.send(`Query: ${query}`);
        });
        
        // Path Traversal 취약점이 있는 라우트
        this.app.get('/file', (req, res) => {
            const fileName = req.query.file as string;
            try {
                // 취약점: 사용자 입력을 파일 경로로 직접 사용
                const filePath = path.join('/var/www/files', fileName); // Path Traversal 위험
                const content = fs.readFileSync(filePath, 'utf8');
                res.send(content);
            } catch (error) {
                res.status(500).send('File not found');
            }
        });
    }
    
    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Vulnerable server running on port ${port}`);
        });
    }
} 