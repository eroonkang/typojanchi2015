<!DOCTYPE html>
<head>

  <title>Typojanchi 2015 / 4회 국제 타이포그래피 비엔날레</title>
  <meta charset="utf-8"></meta>


  <meta property="og:site_name" content="Typojanchi 2015"/> 
  <meta property="og:description" content="Typojanchi 2015"/> 
  <meta name="description" content="Typojanchi 2015" />

  <meta name="title" content="Typojanchi 2015"/>
  <meta property="og:title" content="Typojanchi 2015"/>

  <link rel="canonical" href="http://typojanchi.org/2015">
  <meta property="og:url" content="http://typojanchi.org/2015">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="en_US">

    
  <link rel="stylesheet" media="all" href="style.css"></link>
  <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"></meta>
  <script src="https://code.jquery.com/jquery-1.11.3.js"></script> 

  <link rel="stylesheet" href="fancybox/source/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />
  <script type="text/javascript" src="fancybox/source/jquery.fancybox.pack.js?v=2.1.5"></script>

  <script>

  $( document ).ready(function() {
    ko_type_adjust();
    // $(".fancybox").fancybox({
    //   width: 730,
    // });

    function ko_type_adjust(){
      var rex = new RegExp("([A-Za-z0-9,.\"():&-;]+)(?![^<>&]*>)", "gm");

      $(":lang(ko)").each(function(){
          var $this = $(this);
          var content = $this.html();
          $this.html(content.replace(rex, "<span class='en-within-ko'>$1</span>"));
      });
    }
  });
  </script>  
    <div class="wrapper">
      <div class="logos">
        <img src="images/ct.svg" class="ct">
        <img src="images/tj.svg" class="tj">
      </div>
      <div class="notice">
        <h2 lang="ko">타이포잔치2015<br>오픈토크</h2>
        <p class="description" lang="ko">
          NHN 그린팩토리<br>
          커넥트 홀<br>
          11/12(목) – 11/13(금)<br>
          3–6pm
        </p>
        <a href="https://docs.google.com/forms/d/19u3Rx1UzZBZLn8kLCKjFE_-n1lbRbQNnt15VZkGN4Ow/viewform?embedded=true" class="btn-wrapper fancybox fancybox.iframe"><div class="btn" lang="ko">오픈토크 참가신청</div></a>
        <h3 lang="ko">11월 12일</h3>
        <p class="description" lang="ko">
          에이드리언 쇼너시, 영국<br>
          김두섭, 한국<br>
          로만 빌헬름, 독일<br>
          아시아 시티 텍스트/쳐<br>
        </p>
        <h3 lang="ko">11월 13일</h3>
        <p class="description" lang="ko">
          캐서린 그리피스, 뉴질랜드<br>
          다이니폰 타입, 일본<br>
          리서치 앤 디벨롭먼트, 스웨덴<br>
          왕쯔위안, 중국<br>
          스튜디오 스파스, 네덜란드<br>
        </p>
      </div>
      <div class="notice">
        <h2 lang="ko">Typojanchi 2015<br>Open Talk</h2>
        <p class="description" lang="ko">
          NHN Green factory Connect Hall<br>
          November 12 – 13<br>
          3–6pm
        </p>
        <a href="https://docs.google.com/forms/d/19u3Rx1UzZBZLn8kLCKjFE_-n1lbRbQNnt15VZkGN4Ow/viewform?embedded=true" class="btn-wrapper fancybox fancybox.iframe">
          <div class="btn" lang="ko">
            Reserve a seat
          </div>
        </a>
        <h3 lang="ko">November 12</h3>
        <p class="description" lang="ko">
          Adrian Shaughnessy, UK<br>
          Doosup Kim, KR<br>
          Roman Wilhelm, GE<br>
          Asia City Text/ure<br>
        </p>
        <h3 lang="ko">November 13</h3>
        <p class="description" lang="ko">
          Catherine Griffiths, NZ<br>
          Dainippon Type Organiztion, JP<br>
          Research and Development, SE<br>
          Wang Ziyuan, CN<br>
          Studio Spass, NL<br>
        </p>
      </div>
      <div style="clear:both"></div>
    </div>
    <div class="footer" lang="ko">
          © 타이포잔치 2015 / Typojanchi 2015
    </div>