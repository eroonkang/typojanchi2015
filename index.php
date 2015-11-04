<?

include 'route.php';

$route = new Route();
$locale = 'ko';
$permalink = '';
$home_url = "/typojanchi2015";

$route->add('/', function() {
});

$route->add('/ko', function() {
});

$route->add('/en', function() {
  global $locale;
  $locale = "en";
});



$route->add('/ko/.+', function($name) {
  global $locale, $permalink;
  $locale = "ko";
  $permalink = $name;
});

$route->add('/en/.+', function($name) {
  global $locale, $permalink;
  $locale = "en";
  $permalink = $name;
});

$route->submit();

?>

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
        <li><a href="javascript:void(0)" class="city_btn">Seoul, KR</a></li>
        <li><a href="javascript:void(0)" class="city_btn">London, UK</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Auckland, NZ</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Stockholm, SE</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Amsterdam, NL</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Tokyo, JP</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Osaka, JP</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Berlin, DE</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Rotterdam, NL</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Porto, PT</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Beijing, CN</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Paris, FR</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Derby, UK</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Gunpo, KR</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Los Angeles, US</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Mexico City, MX</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Chicago, US</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Hong Kong</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Taipei, TW</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Bangkok, TH</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Ho Chi Minh, VN</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Singapore</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Basel, CH</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Montreuil, FR</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Homer, US</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Daegu, KR</a></li>
        <li><a href="javascript:void(0)" class="city_btn">New York, US</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Paju, KR</a></li>
        <li><a href="javascript:void(0)" class="city_btn">New Haven, US</a></li>
        <li><a href="javascript:void(0)" class="city_btn">Ghent, UK</a></li>
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
    <a href="<? echo $home_url; ?>/<? echo $locale; ?>" data-permalink="" class="map-overlays btn-logo">
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
      <a href="<? echo $home_url; ?>/<? echo $locale; ?>" data-permalink="" class="btn-home">
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
            <a href="<? echo $home_url; ?>/<? echo $locale; ?>/about" lang="<? echo $locale; ?>">
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

          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/1-main-exhibition" lang="<? echo $locale; ?>">(1)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/2-six-images-six-texts" lang="<? echo $locale; ?>">(2)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/3-asia-city-texture" lang="<? echo $locale; ?>">(3)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/4--on-the-walls" lang="<? echo $locale; ?>">(4)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/5-this-is-seoul-soul" lang="<? echo $locale; ?>">(5)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/6-jongno-ga" lang="<? echo $locale; ?>">(6)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/7-book-bricks" lang="<? echo $locale; ?>">(7)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/8-c-t-welcomes-you" lang="<? echo $locale; ?>">(8)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/9-city-linguistic-playfulness" lang="<? echo $locale; ?>">(9)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/10-city-of-deficiency" lang="<? echo $locale; ?>">(10)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/11-city-letter-reportage" lang="<? echo $locale; ?>">(11)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/12-exhibition-space" lang="<? echo $locale; ?>">(12)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/13-website" lang="<? echo $locale; ?>">(13)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/14-docent-video-projects" lang="<? echo $locale; ?>">(14)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/15-opening-performance" lang="<? echo $locale; ?>">(15)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/16-newsletter-project" lang="<? echo $locale; ?>">(16)</a></li>
          <li><a href="<? echo $home_url; ?>/<? echo $locale; ?>/17-archiving-app" lang="<? echo $locale; ?>">(17)</a></li>
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
</body>













