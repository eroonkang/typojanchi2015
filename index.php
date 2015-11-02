
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

  <title>Typojanchi 2015</title>
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
  <script src="<? echo $home_url; ?>/javascripts/src/WY.js"></script>
  <script src="<? echo $home_url; ?>/javascripts/src/utils.js"></script>

  <!-- models -->
  <script src="<? echo $home_url; ?>/javascripts/src/models/template_loader.js"></script>
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
      <h2><a href="<? echo $home_url; ?>/<? echo $locale; ?>/about" data-permalink="about" class="about_btn">About (Typojanchi)</a></h2>
      <div id="index-left"><a href="<? echo $home_url; ?>/en">EN</a> / <a href="<? echo $home_url; ?>/ko"><span lang="ko">한글</a></div>
      <div id="index-right" class="close_index"><a href="javascript:void(0);"><img class="icon icons8-Delete" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABnElEQVRoQ+3Z4U3DMBAF4NcJYBQ2ACYpTABsAhvABB0BRmAU2AA91EhRlMjnu/fUqrJ/tokv353VnN0dLmTsLsSBATm3So6KjIqYMjCWlimx6Wl7KnIDYA/gJR2t78ZXAO8AviO3RSFEfAK4Pk7+GJm8cA0BTNoPgPsIJgphdp5mD8ZALsyEmMK9AXhuJSUK4TzLAA7MMsYHgIcWgt/3QNyYNCIDcWFKiCxEjSkjKhAVRoKoQqoYGUIByWKkCBWkFyNHKCFRjAWhhrQwNoQDsoXh5/M3dPiNHXmruyBrmPnzyBFOyBbGgnBC2O4fANwtloaj0fwP0ds0RpYsEdy7cA+zNiwYNWQNweXEwY3SNOQYJWQLMf1aWfczKkgLMa+EpTIKSBRhxVQhvQgbpgLJIiyYLKSKkGMyEBVCiumFqBEyTA/EhZBgohA3ooyJQr4A3M5aDFsXu3KiKT0yZQNIzBUAJ2JZmd9jB908kY9WhAGIYd/UPFCOtMiBayx/KwTinvaSnoqc9kkb0Qfk3MozKjIqYsrAWFqmxKan/QOGW3YzGVri7gAAAABJRU5ErkJggg==" width="24" height="24"></a></div>
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
    <a href="javascript:void(0);" class="map-overlays btn-logo">
      <h1>
        <!-- <span lang="ko">타이포잔치2015: 제4회 국제 타이포그래피 비엔날레</span><br>
        Typojanchi 2015: The 4th International Typography Biennale -->
        <img src="<? echo $home_url; ?>/images/typojanchi-h1.png">    
      </h1>
    </a>
    <a href="javascript:void(0);" class="map-overlays btn-ct"><img src="<? echo $home_url; ?>/images/ct.png" class="left"></a>
    <a href="javascript:void(0);" class="map-overlays btn-tj"><img src="<? echo $home_url; ?>/images/tj.png" class="right"></a>

    <div id="menu-control">
      <a href="javascript:void(0);" class="btn-menu"><img class="icon icons8-Up" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABlklEQVRoQ+3Z7U0DMQwG4Lcb0BGYAEagGzACTAYjsEEZASZgBNgAZJFDUZQPf1bo5Pw8pZc8thun6gE7GYedOJCQ/5bJS2TktqDfIvHREEKcC+AEIAwTCdkQVwXyBSAMEwVpEVtVhWEiICNEKMYbskKEYTwhXEQIxgsiRbhjPCAjxDuAm6Z39J65HABWyAxxB+CzgRwBvHaAZowFskLQ5r4bCK1HfcUdo4VwEGToQei5O0YD4SJmEHeMFCJBrCCuGAlEiuBA3DBciAbBhbhgOBAtQgIxY1YQC0IKMWFmECtCA1FjRhAPhBaiwvQg1Kw+StOqGzPdk+jaQR2bO0YNkfP5WdO8bvcxysgDgKdqNQ3CkpFt6R7mEcBzG4nZd2TDaBEekLbMugiatDq17ssFT1JOdbAspVW/hzJDZf0yqskVhFPLszlekOU+ErIM0e+EzAgzUH/TsrSYEcvSYgYqS0saqCwtacTy1GJGLEuLGag8taSBytKSRixPLWbE6O+DetCvvJARnZGQTfdempCLhZq50G4y8gOPao8zyaJ7CgAAAABJRU5ErkJggg==" width="20" height="20"></a>
    </div>
    <div id="lang-control">
      <a href="<? echo $home_url; ?>/ko" class="btn-ko"><span lang="ko">한</a>
      <a href="<? echo $home_url; ?>/en" class="btn-en">EN</a>
    </div>
    <div id="content">
    </div>
  </div>

  
<!--   <a id="map-expander">

  </a> -->
   
  

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













