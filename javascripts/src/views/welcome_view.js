WY.views.welcome_view = (function(){
  var template_loader,
      participants_manager,
      projects_manager,
      artwork_manager,
      map_manager,
      artwork_permalink,
      cities_appended = false;
      
  function welcome_view(params){
    WY.constants.locale = params.locale;
    WY.constants.home_url = params.home_url;

    artwork_permalink = params.artwork_permalink;

    init();
    init_resize();

    $('h1').click(function(){
      show_index();
    });

    $('.close_index').click(function(){
      hide_index();
    });

  }

  function init_resize(){
    $(window).resize(function(e){
      WY.constants.screen_width = $(window).width();
      WY.constants.screen_height = $(window).height();
      set_map_height();
    });

    $(window).trigger('resize');
  }

  function init(){
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
        }
      ]
    });
    participants_manager = new WY.models.ParticipantsManager({
      el: $('#section-participants')
    });

    projects_manager = new WY.models.ProjectsManager({
      el: $('#section-projects')
    });


    artwork_manager = new WY.models.ArtworkManager({
      el: $("#content"),
      artwork_permalink: artwork_permalink
    });

    map_manager = new WY.models.MapManager({
      el_name: "map-container"
    });



    projects_manager.on('load_complete', function(e){
      participants_manager.init_data(e.data);
      participants_manager.init();
      projects_manager.init();
      artwork_manager.update();

      participants_manager.append_dom();
      projects_manager.append_dom();
      if (!cities_appended) {
        $('#section-cities').columnize({ width:200, lastNeverTallest: false});
        cities_appended = true;
      }

      set_map_height();
      ko_type_adjust();
      set_index_pos();
      map_manager.init();
    });


    template_loader.on('load_complete', function(e){
      participants_manager.init_tmpl(e.tmpl.participants);
      projects_manager.init_tmpl(e.tmpl.projects);
      artwork_manager.init_tmpl(e.tmpl.artwork);

      projects_manager.load();
    });

    template_loader.load();
  }

  function ko_type_adjust(){
    var rex = new RegExp("([a-zA-Z0-9_]+\.?[a-zA-Z0-9_]+)", "gm");

    $(":lang(ko)").each(function(){
        var $this = $(this);
        var content = $this.html();
        $this.html(content.replace(rex, "<span class='en-within-ko'>$1</span>"));
    });
  }

  function set_map_height(){
    $('#map-container, #map-outer').css("height", WY.constants.screen_height);
  }

  function set_index_pos(){
    var index_height = $('#index').css("height");
    $('#index').css("top", '-' + index_height);    
  }

  function show_index(){
    var index_height = $('#index').css("height");
    $('#map-outer').addClass('map-down');
    $('#index').css('visibility','visible');
    $('#map-outer, #index').animate({
      top: "+=" + index_height,
    }, 800, function() {
      // Animation complete.
    });
  }

  function hide_index(){
    var index_height = $('#index').css("height");
    $('#map-outer').removeClass('map-down');
    $('#map-outer, #index').animate({
      top: "-=" + index_height,
    }, 800, function() {
      $('#index').css('visibility','hidden');
    });
  }

  return welcome_view;
})();
