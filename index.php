<?

include 'route.php';

$route = new Route();
$locale = 'ko';
$artwork_permalink = '';
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
  global $locale, $artwork_permalink;
  $locale = "ko";
  $artwork_permalink = $name;
});

$route->add('/en/.+', function($name) {
  global $locale, $artwork_permalink;
  $locale = "en";
  $artwork_permalink = $name;
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
  <script src="<? echo $home_url; ?>/javascripts/src/WY.js"></script>
  <script src="<? echo $home_url; ?>/javascripts/src/utils.js"></script>
  <script src="<? echo $home_url; ?>/javascripts/src/vendor/kerning.js"></script>

  <!-- models -->
  <script src="<? echo $home_url; ?>/javascripts/src/models/template_loader.js"></script>
  <script src="<? echo $home_url; ?>/javascripts/src/models/participants_manager.js"></script>
  <script src="<? echo $home_url; ?>/javascripts/src/models/projects_manager.js"></script>
  <script src="<? echo $home_url; ?>/javascripts/src/models/artwork_manager.js"></script>

  <!-- views -->
  <script src="<? echo $home_url; ?>/javascripts/src/views/welcome_view.js"></script>

</head>
<body>
  <div id="index">
  <div id="section-header">
    <h2><a href="#">About (Typojanchi)</a></h2>
    <div id="lang-en" lang="en"><a href="<? echo $home_url; ?>/en">EN</a></div>
    <div id="lang-ko" lang="ko"><a href="<? echo $home_url; ?>/ko">한글</a></div>
  </div>
  <div id="section-cities">
    <ul class="index-list">
      <li><a href="#">Seoul, KR</a></li>
      <li><a href="#">London, UK</a></li>
      <li><a href="#">Auckland, NZ</a></li>
      <li><a href="#">Stockholm, SE</a></li>
      <li><a href="#">Amsterdam, NL</a></li>
      <li><a href="#">Tokyo,JP</a></li>
      <li><a href="#">Osaka, JP</a></li>
      <li><a href="#">Berlin, DE</a></li>
      <li><a href="#">Rotterdam, NL</a></li>
      <li><a href="#">Porto, PT</a></li>
      <li><a href="#">Beijing, CN</a></li>
      <li><a href="#">Paris, FR</a></li>
      <li><a href="#">Derby, UK</a></li>
      <li><a href="#">Gunpo, KR</a></li>
      <li><a href="#">Los Angeles, US</a></li>
      <li><a href="#">Mexico City, MX</a></li>
      <li><a href="#">Chicago, US</a></li>
      <li><a href="#">Hong Kong</a></li>
      <li><a href="#">Taipei, TW</a></li>
      <li><a href="#">Bangkok, TH</a></li>
      <li><a href="#">Ho Chi Minh, VN</a></li>
      <li><a href="#">Singapore</a></li>
      <li><a href="#">Basel, CH</a></li>
      <li><a href="#">Montreuil, FR</a></li>
      <li><a href="#">Homer, US</a></li>
      <li><a href="#">Daegu, KR</a></li>
      <li><a href="#">New York, US</a></li>
      <li><a href="#">Paju, KR</a></li>
      <li><a href="#">New Haven, US</a></li>
      <li><a href="#">Ghent, UK</a></li>
      <li class="removeiflast">&nbsp;</li>
    </ul>
  </div>
  <div id="section-participants">
    
  </div>
  <div id="section-projects">
    
  </div>
  </div><!--index-->
  <div id="map-container">
    <iframe width="98%" height="700px" frameBorder="0" src="https://a.tiles.mapbox.com/v4/eroon26.36545472.html?access_token=pk.eyJ1IjoiZXJvb24yNiIsImEiOiJjaWY3cWhsbnkweGVuczNrcnZoNHB4dGhoIn0.oFbWC28lxCKcOIDiffQZuw"></iframe>
  </div>
  <div id="content">
   
  </div>

  <script>
    $(document).ready(function(e){
      WY.views.welcome_view({
        home_url: "<? echo $home_url; ?>",
        locale: "<? echo $locale ?>",
        artwork_permalink: "<? echo $artwork_permalink ?>"
      });
    });
  </script>
</body>













