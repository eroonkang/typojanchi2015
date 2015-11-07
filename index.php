<?

include 'route.php';
require_once "spyc.php";

$route = new Route();
$locale = 'ko';
$permalink = '';
$home_url = "/typojanchi2015";
$browser_locale_detect_needed = true;

$route->add('/', function() {
  global $browser_locale_detect_needed;

  $browser_locale_detect_needed = true;
});

$route->add('/ko', function() {
  global $browser_locale_detect_needed;
  $browser_locale_detect_needed = false;
});

$route->add('/en', function() {
  global $locale, $browser_locale_detect_needed;
  $browser_locale_detect_needed = false;
  $locale = "en";
});



$route->add('/ko/.+', function($name) {
  global $locale, $permalink;
  global $browser_locale_detect_needed;
  $browser_locale_detect_needed = false;

  $locale = "ko";
  $permalink = $name;
});

$route->add('/en/.+', function($name) {
  global $locale, $permalink;
  global $browser_locale_detect_needed;
  $browser_locale_detect_needed = false;

  $locale = "en";
  $permalink = $name;
});

$route->submit();



if ($browser_locale_detect_needed){
  $langs = array();

  if (isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
      // break up string into pieces (languages and q factors)
      preg_match_all('/([a-z]{1,8}(-[a-z]{1,8})?)\s*(;\s*q\s*=\s*(1|0\.[0-9]+))?/i', $_SERVER['HTTP_ACCEPT_LANGUAGE'], $lang_parse);

      if (count($lang_parse[1])) {
          // create a list like "en" => 0.8
          $langs = array_combine($lang_parse[1], $lang_parse[4]);
        
          // set default to 1 for any without q factor
          foreach ($langs as $lang => $val) {
              if ($val === '') $langs[$lang] = 1;
          }

          // sort list based on value 
          arsort($langs, SORT_NUMERIC);
      }
  }

  // look through sorted list and use first one that matches our languages
  foreach ($langs as $lang => $val) {
    if (strpos($lang, 'ko') === 0) {
      $locale = "ko";
    } else if (strpos($lang, 'en') === 0) {
      $locale = "en";
    } 
  }

}

$title = "";

if ($permalink == "about"){
  $title = "About /";
} else if (split("-", $permalink[0]) == "city") {
  $title = split("-", $permalink[1]);
} else {
  $yaml_data = Spyc::YAMLLoad('./projects/artworks/'.$permalink.'.yml');
   if ($yaml_data["type"] == "Project") {
    $title = $yaml_data["project_name_".$locale]." / ";
  } else {
    $title = $yaml_data["full_name_".$locale]." / ";
  } 
}



?>

<!DOCTYPE html>
<head>

  <title>
    <? echo $title ?>Typojanchi 2015 / 4회 국제 타이포그래피 비엔날레</title>
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

    
  <link rel="stylesheet" media="all" href="<? echo $home_url; ?>/stylesheets/dist/application.css"></link>

  <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"></meta>
 
  <script src="<? echo $home_url; ?>/javascripts/src/vendor/jquery.js"></script> 
  <script src="<? echo $home_url; ?>/javascripts/src/vendor/underscore-min.js"></script> 
  <script src="<? echo $home_url; ?>/javascripts/src/vendor/backbone-min.js"></script> 
  <script src="<? echo $home_url; ?>/javascripts/src/vendor/jquery.columnizer.js"></script>
  <script src="<? echo $home_url; ?>/javascripts/src/vendor/js-yaml.min.js"></script>
  <script src="<? echo $home_url; ?>/javascripts/src/vendor/retina.min.js"></script>  
  <script src="<? echo $home_url; ?>/javascripts/src/vendor/leaflet-src.js"></script>
  <script src="<? echo $home_url; ?>/javascripts/src/vendor/ngraph.graph.js"></script> 
  <script src="<? echo $home_url; ?>/javascripts/src/vendor/turf.min.js"></script>   
  <script src="<? echo $home_url; ?>/javascripts/src/vendor/rAF.js"></script>
  <script src="<? echo $home_url; ?>/javascripts/src/vendor/vector2.js"></script>
  <script src="<? echo $home_url; ?>/javascripts/src/vendor/jquery.history.js"></script>
  <script src="<? echo $home_url; ?>/javascripts/src/vendor/kerning.js"></script>
  <script src="<? echo $home_url; ?>/javascripts/src/vendor/jquery.word-break-keep-all.js"></script>
  <script src="<? echo $home_url; ?>/javascripts/src/WY.js"></script>
  <script src="<? echo $home_url; ?>/javascripts/src/utils.js"></script>

  <!-- models -->
  <script src="<? echo $home_url; ?>/javascripts/src/models/template_loader.js"></script>
  <script src="<? echo $home_url; ?>/javascripts/src/models/balloon_data.js"></script>
  <script src="<? echo $home_url; ?>/javascripts/src/models/participants_manager.js"></script>
  <script src="<? echo $home_url; ?>/javascripts/src/models/projects_manager.js"></script>
  <script src="<? echo $home_url; ?>/javascripts/src/models/detail_page_manager.js"></script>
  <script src="<? echo $home_url; ?>/javascripts/src/models/marker_node.js"></script>
  <script src="<? echo $home_url; ?>/javascripts/src/models/map_manager.js"></script>
  <script src="<? echo $home_url; ?>/javascripts/src/models/cities_manager.js"></script>

  <!-- views -->
  <script src="<? echo $home_url; ?>/javascripts/src/views/welcome_view.js"></script>

</head>
<body>
  <div id="index">
    <div id="section-header">
      <h2>

  <? echo $yaml_data; ?>
        <a href="<? echo $home_url; ?>/<? echo $locale; ?>/about" data-permalink="about" class="about_btn" lang="<? echo $locale; ?>">
          <? if ($locale == 'ko') { echo "(타이포잔치 2015) 소개"; } ?>
          <? if ($locale == 'en') { echo "About (Typojanchi 2015)"; } ?>
        </a>
      </h2>
      <div id="index-left"><a href="<? echo $home_url; ?>/en">EN</a> / <a href="<? echo $home_url; ?>/ko"><span lang="ko">한글</a></div>
      <div id="index-right" class="close_index"><a href="javascript:void(0);" class="no-underline"><img class="icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABnElEQVRoQ+3Z4U3DMBAF4NcJYBQ2ACYpTABsAhvABB0BRmAU2AA91EhRlMjnu/fUqrJ/tokv353VnN0dLmTsLsSBATm3So6KjIqYMjCWlimx6Wl7KnIDYA/gJR2t78ZXAO8AviO3RSFEfAK4Pk7+GJm8cA0BTNoPgPsIJgphdp5mD8ZALsyEmMK9AXhuJSUK4TzLAA7MMsYHgIcWgt/3QNyYNCIDcWFKiCxEjSkjKhAVRoKoQqoYGUIByWKkCBWkFyNHKCFRjAWhhrQwNoQDsoXh5/M3dPiNHXmruyBrmPnzyBFOyBbGgnBC2O4fANwtloaj0fwP0ds0RpYsEdy7cA+zNiwYNWQNweXEwY3SNOQYJWQLMf1aWfczKkgLMa+EpTIKSBRhxVQhvQgbpgLJIiyYLKSKkGMyEBVCiumFqBEyTA/EhZBgohA3ooyJQr4A3M5aDFsXu3KiKT0yZQNIzBUAJ2JZmd9jB908kY9WhAGIYd/UPFCOtMiBayx/KwTinvaSnoqc9kkb0Qfk3MozKjIqYsrAWFqmxKan/QOGW3YzGVri7gAAAABJRU5ErkJggg==" width="24" height="24"></a></div>
    </div>
    <div id="section-cities">
      <ul class="index-list">
        <? if ($locale == 'ko') { ?>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-amsterdam" class="city_btn" data-permalink="city-amsterdam">암스테르담, 네덜란드</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-auckland" class="city_btn" data-permalink="city-auckland">오클랜드, 뉴질랜드</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-bangkok" class="city_btn" data-permalink="city-bangkok">방콕, 태국</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-basel" class="city_btn" data-permalink="city-basel">바젤, 스위스</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-beijing" class="city_btn" data-permalink="city-beijing">베이징, 중국</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-berlin" class="city_btn" data-permalink="city-berlin">베를린, 독일</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-daegu" class="city_btn" data-permalink="city-daegu">대구, 한국</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-ghent" class="city_btn" data-permalink="city-ghent">겐트, 벨기에</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-gunpo" class="city_btn" data-permalink="city-gunpo">군포, 한국</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-gwacheon" class="city_btn" data-permalink="city-gwacheon">과천, 한국</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-gwangju" class="city_btn" data-permalink="city-gwangju">광주, 한국</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-ho-chi-minh" class="city_btn" data-permalink="city-ho-chi-minh">호치민, 베트남</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-homer" class="city_btn" data-permalink="city-homer">호머, 미국</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-hong-kong" class="city_btn" data-permalink="city-hong-kong">홍콩</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-kyoto" class="city_btn" data-permalink="city-kyoto">교토, 일본</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-london" class="city_btn" data-permalink="city-london">런던, 영국</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-montreuil" class="city_btn" data-permalink="city-montreuil">몽트뢰유, 프랑스</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-new-haven" class="city_btn" data-permalink="city-new-haven">뉴헤이븐, 미국</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-new-york" class="city_btn" data-permalink="city-new-york">뉴욕, 미국</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-osaka" class="city_btn" data-permalink="city-osaka">오사카, 일본</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-paju" class="city_btn" data-permalink="city-paju">파주, 한국</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-paris" class="city_btn" data-permalink="city-paris">파리, 프랑스</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-porto" class="city_btn" data-permalink="city-porto">포르토, 포르투갈</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-rotterdam" class="city_btn" data-permalink="city-rotterdam">로테르담, 네덜란드</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-seoul" class="city_btn" data-permalink="city-seoul">서울, 한국</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-singapore" class="city_btn" data-permalink="city-singapore">싱가폴</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-stockholm" class="city_btn" data-permalink="city-stockholm">스톡홀름, 스웨덴</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-taipei" class="city_btn" data-permalink="city-taipei">타이페이, 대만</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-tokyo" class="city_btn" data-permalink="city-tokyo">도쿄, 일본</a></li>
        <? } else { ?>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-amsterdam" class="city_btn" data-permalink="city-amsterdam">Amsterdam, NL</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-auckland" class="city_btn" data-permalink="city-auckland">Auckland, NZ</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-bangkok" class="city_btn" data-permalink="city-bangkok">Bangkok, TH</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-basel" class="city_btn" data-permalink="city-basel">Basel, CH</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-beijing" class="city_btn" data-permalink="city-beijing">Beijing, CN</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-berlin" class="city_btn" data-permalink="city-berlin">Berlin, DE</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-daegu" class="city_btn" data-permalink="city-daegu">Daegu, KR</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-ghent" class="city_btn" data-permalink="city-ghent">Ghent, BE</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-gunpo" class="city_btn" data-permalink="city-gunpo">Gunpo, KR</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-gwacheon" class="city_btn" data-permalink="city-gwacheon">Gwacheon, KR</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-gwangju" class="city_btn" data-permalink="city-gwangju">Gwangju, KR</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-ho-chi-minh" class="city_btn" data-permalink="city-ho-chi-minh">Ho Chi Minh, VN</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-homer" class="city_btn" data-permalink="city-homer">Homer, US</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-hong-kong" class="city_btn" data-permalink="city-hong-kong">Hong Kong </a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-kyoto" class="city_btn" data-permalink="city-kyoto">Kyoto, JP</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-london" class="city_btn" data-permalink="city-london">London, UK</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-montreuil" class="city_btn" data-permalink="city-montreuil">Montreuil, FR</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-new-haven" class="city_btn" data-permalink="city-new-haven">New Haven, US</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-new-york" class="city_btn" data-permalink="city-new-york">New York, US</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-osaka" class="city_btn" data-permalink="city-osaka">Osaka, JP</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-paju" class="city_btn" data-permalink="city-paju">Paju, KR</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-paris" class="city_btn" data-permalink="city-paris">Paris, FR</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-porto" class="city_btn" data-permalink="city-porto">Porto, PT</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-rotterdam" class="city_btn" data-permalink="city-rotterdam">Rotterdam, NL</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-seoul" class="city_btn" data-permalink="city-seoul">Seoul, KR</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-singapore" class="city_btn" data-permalink="city-singapore">Singapore</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-stockholm" class="city_btn" data-permalink="city-stockholm">Stockholm, SE</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-taipei" class="city_btn" data-permalink="city-taipei">Taipei, TW</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/city-tokyo" class="city_btn" data-permalink="city-tokyo">Tokyo, JP</a></li>
        <? } ?>


      </ul>
    </div>
    <div id="section-participants" class="index-list">
      
    </div>
    <div id="section-projects">
      
    </div>
  </div><!--index-->
  
  <div id="map-outer">
    <div id="map-container">
    </div>
    <a href="<? echo $home_url; ?>/<? echo $locale; ?>" data-permalink="" class="home_btn map-overlays btn-logo">
      <h1>
        <span lang="ko">타이포잔치 2015: 4회 국제 타이포그래피 비엔날레</span><br>
        Typojanchi 2015: The 4th International Typography Biennale
        <!-- <img src="<? echo $home_url; ?>/images/h1_ko.svg" class="title-ko">
        <img src="<? echo $home_url; ?>/images/h1_en.svg" class="title-en"> -->
      </h1>
    </a>
    <a href="<? echo $home_url; ?>/<? echo $locale; ?>/about" data-permalink="about" class="about_btn map-overlays btn-ct"><img src="<? echo $home_url; ?>/images/ct.svg" class="left"></a>
    <a href="<? echo $home_url; ?>/<? echo $locale; ?>/about" data-permalink="about" class="about_btn map-overlays btn-tj"><img src="<? echo $home_url; ?>/images/tj.svg" class="right"></a>

    <div id="menu-control">
      <a href="<? echo $home_url; ?>/<? echo $locale; ?>" data-permalink="" class="home_btn btn-home">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path style="text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;-inkscape-font-specification:Bitstream Vera Sans" d="M 16 2.59375 L 15.28125 3.28125 L 2.28125 16.28125 L 3.71875 17.71875 L 5 16.4375 L 5 27 L 5 28 L 6 28 L 13 28 L 14 28 L 14 27 L 14 18 L 18 18 L 18 27 L 18 28 L 19 28 L 26 28 L 27 28 L 27 27 L 27 16.4375 L 28.28125 17.71875 L 29.71875 16.28125 L 16.71875 3.28125 L 16 2.59375 z M 16 5.4375 L 25 14.4375 L 25 26 L 20 26 L 20 17 L 20 16 L 19 16 L 13 16 L 12 16 L 12 17 L 12 26 L 7 26 L 7 14.4375 L 16 5.4375 z" color="#000" overflow="visible" font-family="Bitstream Vera Sans"/>
        </svg>
      </a>
      <a href="javascript:void(0);" class="btn-menu">
        <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24" enable-background="new 0 0 24 24">
            <path style="text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;-inkscape-font-specification:Bitstream Vera Sans" d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z" color="#000" overflow="visible" enable-background="accumulate" font-family="Bitstream Vera Sans"/>
        </svg>
        <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path style="text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;-inkscape-font-specification:Bitstream Vera Sans" d="M 7 5 L 7 6 L 7 26 L 7 28 L 8.59375 26.8125 L 16 21.25 L 23.40625 26.8125 L 25 28 L 25 26 L 25 6 L 25 5 L 24 5 L 8 5 L 7 5 z M 9 7 L 23 7 L 23 24 L 16.59375 19.1875 L 16 18.75 L 15.40625 19.1875 L 9 24 L 9 7 z" color="#000" overflow="visible" font-family="Bitstream Vera Sans"/>
        </svg> -->
      </a>
    </div>
    <div id="lang-control">
      <a href="<? echo $home_url; ?>/ko/<? echo $permalink; ?>" class="btn-ko"><span lang="ko">한</a>
      <a href="<? echo $home_url; ?>/en/<? echo $permalink; ?>" class="btn-en">EN</a>
    </div>
    <div id="content-outer">
      <div id="content">
      </div>
      <div id="footer">
        <h2>
          <a href="<? echo $home_url; ?>/<? echo $locale; ?>" lang="<? echo $locale; ?>">
            <? if ($locale == 'ko') { echo "© 타이포잔치 2015"; } ?>
            <? if ($locale == 'en') { echo "© Typojanchi 2015"; } ?>
          </a>
        </h2>
        <ul>
          <li>
            <a href="<? echo $home_url; ?>/<? echo $locale; ?>/about" data-permalink="about" class="about_btn" lang="<? echo $locale; ?>">
              <? if ($locale == 'ko') { echo "소개"; } ?>
              <? if ($locale == 'en') { echo "About"; } ?>
            </a>
          </li>
          <li>
            <a href="javascript:void(0);" lang="<? echo $locale; ?>" class="footer-participants">
              <? if ($locale == 'ko') { echo "참여작가"; } ?>
              <? if ($locale == 'en') { echo "Participants"; } ?>
            </a>
          </li>

          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/1-main-exhibition" data-permalink="1-main-exhibition" class="footer_btn" lang="<? echo $locale; ?>">(1)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/2-six-images-six-texts" data-permalink="2-six-images-six-texts" class="footer_btn" lang="<? echo $locale; ?>">(2)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/3-asia-city-texture" data-permalink="3-asia-city-texture" class="footer_btn" lang="<? echo $locale; ?>">(3)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/4--on-the-walls" data-permalink="4--on-the-walls" class="footer_btn" lang="<? echo $locale; ?>">(4)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/5-this-is-seoul-soul" data-permalink="5-this-is-seoul-soul" class="footer_btn" lang="<? echo $locale; ?>">(5)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/6-jongno-ga" data-permalink="6-jongno-ga" class="footer_btn" lang="<? echo $locale; ?>">(6)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/7-book-bricks" data-permalink="7-book-bricks" class="footer_btn" lang="<? echo $locale; ?>">(7)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/8-c-t-welcomes-you" data-permalink="8-c-t-welcomes-you" class="footer_btn" lang="<? echo $locale; ?>">(8)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/9-city-linguistic-playfulness" data-permalink="9-city-linguistic-playfulness" class="footer_btn" lang="<? echo $locale; ?>">(9)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/10-city-of-deficiency" data-permalink="10-city-of-deficiency" class="footer_btn" lang="<? echo $locale; ?>">(10)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/11-city-letter-reportage" data-permalink="11-city-letter-reportage" class="footer_btn" lang="<? echo $locale; ?>">(11)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/12-exhibition-space" data-permalink="12-exhibition-space" class="footer_btn" lang="<? echo $locale; ?>">(12)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/13-website" data-permalink="13-website" class="footer_btn" lang="<? echo $locale; ?>">(13)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/14-docent-video-projects" data-permalink="14-docent-video-projects" class="footer_btn" lang="<? echo $locale; ?>">(14)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/15-opening-performance" data-permalink="15-opening-performance" class="footer_btn" lang="<? echo $locale; ?>">(15)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/16-newsletter-project" data-permalink="16-newsletter-project" class="footer_btn" lang="<? echo $locale; ?>">(16)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/17-archiving-app" data-permalink="17-archiving-app" class="footer_btn" lang="<? echo $locale; ?>">(17)</a></li>
        </ul>
      </div>
    </div>
  </div>
   
  

  <script>
    $(document).ready(function(e){
      WY.views.welcome_view({
        home_url: "<? echo $home_url; ?>",
        locale: "<? echo $locale ?>",
        permalink: "<? echo $permalink ?>"
      });
    });
  </script>
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-69712228-1', 'auto');
    ga('send', 'pageview');

  </script>
</body>













