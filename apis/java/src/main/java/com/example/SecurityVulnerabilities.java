package com.example;

import java.sql.*;
import java.io.*;
import javax.servlet.http.*;
import java.util.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class SecurityVulnerabilities {
    
    // SQL Injection 취약점
    public void sqlInjectionVulnerable(String userInput) {
        try {
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/test");
            // 취약점: 사용자 입력을 직접 쿼리에 삽입
            String query = "SELECT * FROM users WHERE id = " + userInput;
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(query); // SQL Injection 위험
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
    // XSS 취약점
    public void xssVulnerable(HttpServletRequest request, HttpServletResponse response) {
        try {
            String userInput = request.getParameter("comment");
            // 취약점: 사용자 입력을 직접 HTML에 출력
            response.getWriter().println("<div>" + userInput + "</div>"); // XSS 위험
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    // Command Injection 취약점
    public void commandInjectionVulnerable(String userInput) {
        try {
            // 취약점: 사용자 입력을 직접 명령어에 삽입
            Process process = Runtime.getRuntime().exec("ping " + userInput); // Command Injection 위험
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    // Path Traversal 취약점
    public void pathTraversalVulnerable(String fileName) {
        try {
            // 취약점: 사용자 입력을 파일 경로로 직접 사용
            File file = new File("/var/www/files/" + fileName); // Path Traversal 위험
            FileInputStream fis = new FileInputStream(file);
            byte[] buffer = new byte[1024];
            fis.read(buffer);
            fis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    // Weak Encryption 취약점
    public String weakEncryption(String plaintext) {
        try {
            // 취약점: 하드코딩된 키와 약한 암호화
            String key = "1234567890123456"; // 약한 키
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(), "AES");
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding"); // ECB 모드 사용 (약함)
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            byte[] encrypted = cipher.doFinal(plaintext.getBytes());
            return Base64.getEncoder().encodeToString(encrypted);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    // Weak Hash 취약점
    public String weakHash(String password) {
        try {
            // 취약점: MD5 사용 (약한 해시)
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hash = md.digest(password.getBytes());
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    // Hardcoded Password 취약점
    public void hardcodedPassword() {
        // 취약점: 하드코딩된 비밀번호
        String password = "admin123"; // 하드코딩된 비밀번호
        String dbPassword = "superSecretPassword123"; // 하드코딩된 DB 비밀번호
        System.out.println("Connecting with password: " + password);
    }
    
    // Insecure Random 취약점
    public int insecureRandom() {
        // 취약점: 예측 가능한 난수 생성
        Random random = new Random(); // 예측 가능한 난수
        return random.nextInt(1000);
    }
    
    // Log Injection 취약점
    public void logInjectionVulnerable(String userInput) {
        // 취약점: 사용자 입력을 로그에 직접 기록
        System.out.println("User action: " + userInput); // Log Injection 위험
    }
    
    // Deserialization 취약점
    public void deserializationVulnerable(byte[] data) {
        try {
            // 취약점: 안전하지 않은 역직렬화
            ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(data));
            Object obj = ois.readObject(); // 역직렬화 위험
            ois.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    // Sensitive Data Exposure 취약점
    public void sensitiveDataExposure() {
        // 취약점: 민감한 데이터를 로그에 출력
        String creditCard = "1234-5678-9012-3456";
        String ssn = "123-45-6789";
        System.out.println("Credit Card: " + creditCard); // 민감한 데이터 노출
        System.out.println("SSN: " + ssn); // 민감한 데이터 노출
    }
} 