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

##3. 파이선 웹서버와 grunt watch 작동

터미널 창을 두개를 띄운 후 두 개의 서버(?) 를 띄워야 합니다.

###3.1. 파이선 로컬웹서버 

    python -m SimpleHTTPServer 

Ajax 등을 로컬에서 테스트하는 용도로 로컬 웹서버를 띄우는 명령입니다. 


###3.2. grunt watcher 

    grunt watch

자바스크립트나 스타일시트의 컴파일 및 패키징을 저장 시마다 업데이트하여 최신 상태로 유지해 줍니다.
컴파일하는데 1-2초 딜레이가 있으므로 그 후 리프레시하여 확인하세요.



