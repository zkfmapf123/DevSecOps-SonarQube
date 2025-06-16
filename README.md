# SonarQube 구축

## Github 적용

### 소나큐브 접속
![1](./public/1.png)

### SonarQube Github 설정 구성 
#### Enterpsise -> https://github.company.com/api/v3
#### Other -> https://api.github.com/
![2](./public/2.png)

### Github Apps 만들기
![3](./public/3.png)

### Github Apps 만들기-2
#### Homepage / Callback / Webhook URL 동일

![4](./public/4.png)

### App Install 하기
![5](./public/5.png)

### Private Key 생성
![6](./public/6.png)

## Github Apps 설정 시, Repository Permissin

```sh
- Repository Permissions
    - Checks -> Read / Writer
    - Metadata -> Read-only
    - Pull requests -> Read / Write
    - Comit Status -> Read-only
- Any Account
```