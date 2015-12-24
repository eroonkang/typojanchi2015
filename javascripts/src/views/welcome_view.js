WY.views.welcome_view = (function(){
  var template_loader,
      participants_manager,
      projects_manager,
      detail_page_manager,
      map_manager,
      cities_manager,
      permalink,
      index_height,
      cities_appended = false,
      index_opened = false,
      content_opened = false;
      
  function welcome_view(params){
    WY.constants.locale = params.locale;
    WY.constants.home_url = params.home_url;

    permalink = params.permalink;

    init_history();
    init();
    init_resize();
    init_btn_events();

  }

  function init_resize(){
    $(window).resize(function(e){
      WY.constants.screen_width = $(window).width();
      WY.constants.screen_height = $(window).height();
      
    });

    $(window).trigger('resize');
  }

  function init_btn_events(){

    $('.btn-menu').click(function(e){
      if (!index_opened) {
        show_index();
      } else {
        hide_index(); 
        $(window).scrollTop(0);       
      }
    });

    $('.close_index').click(hide_index);

    $('.footer-participants').click(function(){
      $(window).scrollTop(0);
      show_index();
    });
  }

  function init(){

    $("body").on('click', 'a[data-lightbox=image]', function(e) {
      imagesLoaded($("#lightbox"), function(e){
          
        $('img').each(function(){
          new RetinaImage(this);
        });
      });
    });

    template_loader = new WY.models.TemplateLoader({
      lists: [
        {
          name: 'participants',
          url: WY.constants.home_url + '/templates/participants.ejs'
        },
        {
          name: 'projects',
          url: WY.constants.home_url + '/templates/projects.ejs' 
        },
        {
          name: 'artwork',
          url: WY.constants.home_url + '/templates/artwork.ejs'
        },
        {
          name: 'project',
          url: WY.constants.home_url + "/templates/project.ejs"
        },
        {
          name: 'project_carousel',
          url: WY.constants.home_url + "/templates/project_carousel.ejs"
        },
        {
          name: 'venue',
          url: WY.constants.home_url + "/templates/venue.ejs"
        }
      ]
    });
    participants_manager = new WY.models.ParticipantsManager({
      el: $('#section-participants')
    });

    projects_manager = new WY.models.ProjectsManager({
      el: $('#section-projects')
    });


    detail_page_manager = new WY.models.DetailPageManager({
      el: $("#content-outer"),
      permalink: permalink
    });

    map_manager = new WY.models.MapManager({
      el_name: "map-container"
    });

    cities_manager = new WY.models.CitiesManager({
      el: $("#section-cities")
    });



    projects_manager.on('load_complete', function(e){
      participants_manager.init_data(e.data);
      participants_manager.init();
      projects_manager.init();
      
      cities_manager.init();
      cities_manager.on('city_pan_to', function(e){
        hide_index();  
        detail_page_manager.hide();
        map_manager.set_map_height(WY.constants.screen_height);
        map_manager.city_pan_to(e.latlng, e.zoom);
      });

      
      participants_manager.append_dom();
      participants_manager.on('columnize_complete', columnize_complete_handler);

      projects_manager.append_dom();
      projects_manager.on('columnize_complete', columnize_complete_handler);

      if (!cities_appended) {
        $('#section-cities').columnize({ doneFunc: columnize_complete_handler, width:200, lastNeverTallest: true});
        cities_appended = true;
      }

      ko_type_adjust();
      set_index_pos();
      map_manager.init();
      map_manager.set_map_height(WY.constants.screen_height);


      if (permalink.split("-")[0] != "city") {

        if (permalink == "" || permalink == "about") {
          map_manager.set_detail(false);
        } else {
          map_manager.set_detail(true);
        }
        detail_page_manager.update();
      } else {
        cities_manager.city_pan(permalink);
      }
      

      $(".about_btn").click(function(e){
        e.preventDefault();

        History.pushState({
          permalink: $(e.currentTarget).data('permalink')
        }, "Loading...", $(e.currentTarget).attr('href'));
      });

      $(".home_btn").click(function(e){
        e.preventDefault();

        hide_index();
        map_manager.reset();
        detail_page_manager.hide();

        History.pushState({
          permalink: $(e.currentTarget).data('permalink')
        }, "Loading...", $(e.currentTarget).attr('href'));
      });
    });

    map_manager.on('load_complete', function(e){
      if (permalink != '' && permalink != "about" && permalink.split("-")[0] != "city") {
        // debugger;
        map_manager.permalink = permalink;
        // map_manager.update_bound(permalink);  
        
      }
    });

    detail_page_manager.on('load_complete', function(e){

      if (index_opened) {
        hide_index();
      }
      else {
        $(window).scrollTop(0);
      }

      if (detail_page_manager.permalink == "about") {
        map_manager.set_map_height(WY.constants.screen_height * 0.5);
      } else {
        map_manager.set_map_height(WY.constants.screen_height * 0.65);
      }
      // $('.map-overlays').hide();
      $('#content-outer').css({
        visibility: "visible",
        position: "relative",
        top: "0px"
      });
      // $('.project-participants ul').columnize({ width:200, lastNeverTallest: true});
      // ko_type_adjust();
    });


    template_loader.on('load_complete', function(e){
      participants_manager.init_tmpl(e.tmpl.participants);
      projects_manager.init_tmpl(e.tmpl.projects);
      detail_page_manager.init_tmpl({
        artwork: e.tmpl.artwork, 
        project: e.tmpl.project,
        venue: e.tmpl.venue,
        project_carousel: e.tmpl.project_carousel
      });

      projects_manager.load();
    });

    template_loader.load();

    lightbox.option({
      'resizeDuration': 0,
      'fadeDuration': 100,
      'wrapAround': true,
      'disableScrolling': true,
      'positionFromTop' : 50,
      'showImageNumberLabel' : false
    })

  }

  function columnize_complete_handler(e){
    index_height = $('#index').height();

    if (index_opened) {
      $("#map-outer").css({
        top: index_height
      });
      $(window).scrollTop(0);

    }

  }


  function ko_type_adjust(){
    var rex = new RegExp("([\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\?“””‘’A-Za-z0-9,.():&-;]+)(\?![^<>&]*>)", "gm");

    $(":lang(ko)").each(function(){
        var $this = $(this);
        var content = $this.html();
        $this.html(content.replace(rex, "<span class='en-within-ko'>$1</span>"));
    });
  }


  function init_history(){
    History.Adapter.bind(window, 'statechange', function(){ 
      var state = History.getState(); 
      permalink = state.data.permalink;

      if (permalink && permalink.split("-")[0] == "city") {

        cities_manager.city_pan(permalink);

      } else {
        switch (permalink) {
          case "":
            map_manager.set_detail(false);
            map_manager.reset();

            $("title").text("타이포잔치 2015 — Typojanchi 2015");
            ga('set', { page: location.path, title: "타이포잔치 2015 — Typojanchi 2015" });
            ga('send', 'pageview');
        
            $('#content-outer').css({
              visibility: "hidden",
              position: "absolute",
              top: "-10px"
            });
            break;
          case "about":
            map_manager.set_detail(false);
            map_manager.set_map_height(WY.constants.screen_height * 0.5);
            detail_page_manager.update(permalink);
            break;
          default:
            map_manager.set_detail(true);
            map_manager.set_map_height(WY.constants.screen_height * 0.65);
            map_manager.update_bound(permalink);
            detail_page_manager.update(permalink);
            break;
        }
      }
  
      $(".btn-ko-with-permalink").attr('href', WY.constants.home_url + "/ko/" + permalink);
      $(".btn-en-with-permalink").attr('href', WY.constants.home_url + "/en/" + permalink);


      
    });

  }

  function set_index_pos(){
    index_height = $('#index').height();
    $('#index').css("top", -index_height);    
    console.log ("index_height:" + index_height);
  }

  // function set_footer_pos(){
  //   var content_height = $('#content').css("height");
  //   var nav_height = $('.left-nav').css("height");
  //   if (content_height < nav_height) {
  //     $('#content').css("height", nav_height);    
  //   }
  //   // console.log ("content_height:" + content_height + " nav_height:" + nav_height);
  // }

  function show_index(){
    if (!index_opened){
      // var index_height = $('#index').css("height");
      console.log ("index_height:" + index_height);
      $('#map-outer').addClass('map-down');
      $('#index').css('visibility','visible');
      $('#map-outer, #index').animate({
        top: "+=" + index_height,
        easing: 'swing'
      }, 500, function() {
        index_opened = true;
      });
    }
  }

  function hide_index(){
    if (index_opened){
      // var index_height = $('#index').css("height");
      $('#map-outer').removeClass('map-down');
      $('#map-outer, #index').animate({
        top: "-=" + index_height,
        easing: 'swing'
      }, 500, function() {
        $('#index').css('visibility','hidden');
        index_opened = false;
      });
    }
  }

  return welcome_view;
})();
