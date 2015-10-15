WY.views.welcome_view = (function(){
  var template_loader,
      participants_manager,
      projects_manager,
      artwork_manager,
      map_manager,
      screen_width, 
      screen_height,
      artwork_permalink;
      
  function welcome_view(params){
    WY.constants.locale = params.locale;
    WY.constants.home_url = params.home_url;

    artwork_permalink = params.artwork_permalink;
    $('#section-cities').columnize({    width:250, lastNeverTallest: false});

    init();
    init_resize();

  }

  function init_resize(){
    $(window).resize(function(e){
      screen_width = $(window).width();
      screen_height = $(window).height();
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

    map_manager.init();


    projects_manager.on('load_complete', function(e){
      participants_manager.init_data(e.data);
      participants_manager.init();
      projects_manager.init();
      artwork_manager.update();

      ko_type_adjust();
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
  return welcome_view;
})();
