
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
      <h2><a href="#">About (Typojanchi)</a></h2>
      <div id="index-left"><a href="<? echo $home_url; ?>/en">EN</a> / <a href="<? echo $home_url; ?>/ko"><span lang="ko">한글</a></div>
      <div id="index-right" class="close_index"><a href="#"><img class="icon icons8-Delete" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABnElEQVRoQ+3Z4U3DMBAF4NcJYBQ2ACYpTABsAhvABB0BRmAU2AA91EhRlMjnu/fUqrJ/tokv353VnN0dLmTsLsSBATm3So6KjIqYMjCWlimx6Wl7KnIDYA/gJR2t78ZXAO8AviO3RSFEfAK4Pk7+GJm8cA0BTNoPgPsIJgphdp5mD8ZALsyEmMK9AXhuJSUK4TzLAA7MMsYHgIcWgt/3QNyYNCIDcWFKiCxEjSkjKhAVRoKoQqoYGUIByWKkCBWkFyNHKCFRjAWhhrQwNoQDsoXh5/M3dPiNHXmruyBrmPnzyBFOyBbGgnBC2O4fANwtloaj0fwP0ds0RpYsEdy7cA+zNiwYNWQNweXEwY3SNOQYJWQLMf1aWfczKkgLMa+EpTIKSBRhxVQhvQgbpgLJIiyYLKSKkGMyEBVCiumFqBEyTA/EhZBgohA3ooyJQr4A3M5aDFsXu3KiKT0yZQNIzBUAJ2JZmd9jB908kY9WhAGIYd/UPFCOtMiBayx/KwTinvaSnoqc9kkb0Qfk3MozKjIqYsrAWFqmxKan/QOGW3YzGVri7gAAAABJRU5ErkJggg==" width="24" height="24"></a></div>
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
    <a href="#" class="map-overlays btn-logo">
      <h1>
        <!-- <span lang="ko">타이포잔치2015: 제4회 국제 타이포그래피 비엔날레</span><br>
        Typojanchi 2015: The 4th International Typography Biennale -->
        <img src="<? echo $home_url; ?>/images/typojanchi-h1.png">    
      </h1>
    </a>
    <a href="#" class="map-overlays btn-ct"><img src="<? echo $home_url; ?>/images/ct.png" class="left"></a>
    <a href="#" class="map-overlays btn-tj"><img src="<? echo $home_url; ?>/images/tj.png" class="right"></a>

    <div id="menu-control">
      <a href="#" class="btn-menu"><img class="icon icons8-Up" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABlklEQVRoQ+3Z7U0DMQwG4Lcb0BGYAEagGzACTAYjsEEZASZgBNgAZJFDUZQPf1bo5Pw8pZc8thun6gE7GYedOJCQ/5bJS2TktqDfIvHREEKcC+AEIAwTCdkQVwXyBSAMEwVpEVtVhWEiICNEKMYbskKEYTwhXEQIxgsiRbhjPCAjxDuAm6Z39J65HABWyAxxB+CzgRwBvHaAZowFskLQ5r4bCK1HfcUdo4VwEGToQei5O0YD4SJmEHeMFCJBrCCuGAlEiuBA3DBciAbBhbhgOBAtQgIxY1YQC0IKMWFmECtCA1FjRhAPhBaiwvQg1Kw+StOqGzPdk+jaQR2bO0YNkfP5WdO8bvcxysgDgKdqNQ3CkpFt6R7mEcBzG4nZd2TDaBEekLbMugiatDq17ssFT1JOdbAspVW/hzJDZf0yqskVhFPLszlekOU+ErIM0e+EzAgzUH/TsrSYEcvSYgYqS0saqCwtacTy1GJGLEuLGag8taSBytKSRixPLWbE6O+DetCvvJARnZGQTfdempCLhZq50G4y8gOPao8zyaJ7CgAAAABJRU5ErkJggg==" width="20" height="20"></a>
    </div>
    <div id="lang-control">
      <a href="<? echo $home_url; ?>/ko" class="btn-ko"><span lang="ko">한</a>
      <a href="<? echo $home_url; ?>/en" class="btn-en">EN</a>
    </div>
    <div id="content">
    </div>
    <div id="intro">
      <div class="cols single">
        <div class="logos">
          <img src="<? echo $home_url; ?>/images/ct.svg" class="ct">
        </div>
      </div>
      <div class="cols triple">
        <h2>Typojanchi 2015</h2>
        <h3>The 4th International Typography Biennale</h3>
        <h3>November 11 — December 27, 2015</h3>
        <p class="description">
          The distinguishing characteristics of cities can be found in airports, train stations and public systems, such as road signs or street signs marked with symbols and letters. Such characteristics can also be found in places of natural heritage such as rivers, parks, or artifacts like buildings and monuments. However, the authentic cultural characterof cities, which might be both traditional or vernacular, is acquired and achieved from the lives of people.The resulting languages and structures which exist everywhere in the streets of the city might resemble something akin to a religious confession emanating from the lives of people.
        </p>
        <p class="description">
        These days, commercial signage and street flyers all compete with public sign systems such as speed limits and directional markers.The information of newspapers and magazines has now spread to mobile screens in the palms of people. At all times, the eyes of citizens are permanently occupied. Signage located on and around buildings is static but now equipped with technology and a variety of forms by which they cover the entire facade of the cityscape.
        </p>
        <p class="description">
        Typojanchi 2015 wishes to consider the city’s own typographic cultural aspects. As we mentioned above, we consider these to be authentic locations. Despite the existence of unsightly or perhaps disagreeable objects and structures, we consider these to be authentic scenes in a city. We can recognize these as meaningful components of a diverse, urban environment. And with all of these components, we embark on a celebration or ‘Janchi’(Korean for party/celebration) of typography.This is Typojanchi’s means of interpreting this era and the essential values in this generation, society and community with those who are interested in typographic culture and the city environment. Whether they are designers or artists, it is their perspectives and points of view that we hope to share with this age.
        </p>
      </div>
      <div class="cols single-wider">
        <div class="notice">
          <h2>Typojanchi2015 Open Talk</h2>
          <p class="description">
            NHN Green Factory Connect Hall<br>
            November 12–13<br>
            3–6pm
          </p>
          <h3>November 12</h3>
          <p class="description">
            Adrian Shaughnessy, UK<br>
            Doosup Kim, KR<br>
            Roman Wilhelm, GE<br>
            Asia City Text/ure<br>
          </p>
          <h3>November 13</h3>
          <p class="description">
            Catherine Griffiths, NZ<br>
            Dainippon Typo Organiztion, JP<br>
            Research and Development, SE<br>
            Wang Ziyuan, CN<br>
            Studio Spass, NL<br>
          </p>
          <a href="#">
            <div class="btn">
              Reserve a seat
            </div>
          </a>
        </div>
      </div>
      <div class="cols hr">
      </div>
      <div class="cols single">
        <div class="logos">
          <img src="<? echo $home_url; ?>/images/tj.svg" class="tj">
        </div>
      </div>
      <div class="cols single credit">
        <h4><span class="underline">Director</span></h4>
        <ul class="index-list">
          <li>Kymn Kyungsun<br>Seoul National University</li>
        </ul>
      </div>

      <div class="cols single credit">
        <h4><span class="underline">Special Exhibition Director</span></h4>
        <ul class="index-list">
          <li>Adrian Shaughnessy<br>Royal College of Art</li>
        </ul>
      </div>

      <div class="cols single credit">
        <h4><span class="underline">Hosted By</span></h4>
        <ul class="index-list">
          <li>Ministry of Culture, <br> Sports and Tourism</li>
        </ul>
      </div>

      <div class="cols single credit">
        <h4><span class="underline">Organized By</span></h4>
        <ul class="index-list">
          <li>KCDF(Korean Craft and Design Foundation)</li>
          <li>Korean Society of Typography</li>
        </ul>
      </div>
      <div class="cols single">
        &nbsp;
      </div>
      <div class="cols single credit">  
        <h4><span class="underline">Curators</span></h4>
        <ul class="index-list">
          <li>Chris Ro<br>Hongik University </li>
          <li>Jaemin Lee<br>Studio fnt</li>
          <li>Kiseob Lee<br>Thanks Books</li>
          <li>Moonkyung Choi<br>PaTI</li>
          <li>Ahn Byung-Hak<br>Hongik University </li>
          <li>Fritz Park<br>N&amp;Co</li>
          <li>Goto Tetsuya<br>ooo Projects</li>
          <li>Hyun Cho<br>S/O Project</li>
          <li>Min Byung-Geol<br>The Korean Society of Typography Board</li>
        </ul>
      </div>
      <div class="cols single credit">
        <h4><span class="underline">Organizing Board</span></h4>
        <ul class="index-list">
          <li>Ahn Sang Soo<br> Chairman, Organizing Board</li>
          <li>Lars Muller<br> Lars Müller Publishers</li>
          <li>Neville Brody<br> Royal College of Art </li>
          <li>Paula Scher<br> Pentagram</li>
          <li>Wang Xu<br> wx-design</li>
          <li>Hara Kenya<br> Hara Design Institute </li>
          <li>Jaejun Han<br> Chairman, The Korean Society of Typography </li>
          <li>Yongseob Kim<br> Deputy Manager, Ministry of Culture, Sports and Tourism, of Design Space and Culture </li>
          <li>Jungchul Choi<br> Director, KCDF</li>
        </ul>
      </div>
      <div class="cols single credit">
        <h4><span class="underline">Newsletter Advisory Committee</span></h4>
        <ul class="index-list">
          <li>Catherine Griffiths<br>Studio Catherine Griffiths</li>
          <li>Rob Giampietro<br>Lined &amp; Unlined </li>
          <li>Tetsuya Goto<br>ooo Projects </li>
          <li>Peter Bilak<br>Typotheque</li>
        </ul>
      </div>
      <div class="cols single credit">
        <h4><span class="underline">Promotion Committee</span></h4>
        <ul class="index-list">
          <li>Min Choi<br> Chairman, 2013 Typojanchi Director</li>
          <li>Byungju Lee<br>2011 Typojanchi Director</li>
          <li>Jaewan Jung<br> Yeungnam University </li>
          <li>Jung Jin Yeol<br> Kookmin University </li>
          <li>Seongtae Park<br> Junglim Foundation </li>
          <li>Sujin Park<br> Ewha Womans University</li>
        </li>
      </div>
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













