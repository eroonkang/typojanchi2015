#Typojanchi 2015 Website

로컬에서 설치 및 개발법

##1. node 설치

https://nodejs.org/en/
에서 다운로드 후 설치 

터미널에서 node 타입 후 버전 확인해 주세요.

##2. grunt 패키지 설치

저장소 폴더로 터미널 이동 후 

    (sudo) npm install

이러저러한 에러가 난다면 sudo를 붙여서 인스톨하면 됩니다.

##3. grunt watch 작동

    grunt watch

자바스크립트나 스타일시트의 컴파일 및 패키징을 저장 시마다 업데이트하여 최신 상태로 유지해 줍니다.
컴파일하는데 1-2초 딜레이가 있으므로 그 후 리프레시하여 확인하세요.


##4. 프로젝트 폴더를 /Users/*username*/Sites 로 이동 

*username*이 누구인지 알고 싶다면 

    whoami

로 찾으시면 됩니다.
이를테면 프로젝트 폴더가 현재 바탕화면에 있다고 하면 다음과 같이 입력하면 됩니다.

    mv ~/Desktop/typojanchi2015 ~/Sites/typojanchi2015

##5. 아파치 서버 설정 

###5.1. /etc/apache2/httpd.conf 설정 변경

    sudo vim /etc/apache2/httpd.conf

####5.1.1. php mod, rewrite mod 활성화

다음 두 줄이 주석처리되어 있는데(#) 해제시켜 줍니다.

    LoadModule rewrite_module libexec/apache2/mod_rewrite.so
    LoadModule php5_module libexec/apache2/libphp5.so

####5.1.2. document root, directory를 /Users/*username*/Sites로 변경

다음 두 줄을

    DocumentRoot "/Library/WebServer/Documents"
    <Directory "/Library/WebServer/Documents>

다음과 같이 변경해주세요.

    DocumentRoot "/Users/*username*/Sites"
    <Directory "/Users/*username*/Sites>

바로 밑에 AllowOverride 설정도 All로 변경해 줍니다.
    
    AllowOverride All


###5.2. /etc/apache2/users 에 *username*.conf 추가

    sudo vim /etc/apache2/*username*.conf 

입력 후 다음 내용을 추가해줍니다.

    <Directory "/Users/*username*/Sites">
        AllowOverride All
        Options Indexes MultiViews FollowSymLinks
        Require all granted
    </Directory>

그리고 아파치 서버 재시작

    sudo apachectl restart

##6. 확인 

    localhost/typojanchi2015

브라우저에서 입력 후 잘 되는지 확인합니다.


