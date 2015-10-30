WY.views.welcome_view = (function(){
  var template_loader,
      participants_manager,
      projects_manager,
      detail_page_manager,
      map_manager,
      permalink,
      cities_appended = false,
      index_opened = false,
      content_opened = false;
      
  function welcome_view(params){
    WY.constants.locale = params.locale;
    WY.constants.home_url = params.home_url;

    permalink = params.permalink;

    init();
    init_resize();
    init_history();

    $('h1, .btn-menu, .btn-tj, .btn-ct').click(function(){
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
        },
        {
          name: 'project',
          url: WY.constants.home_url + "/templates/project.ejs"
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
      el: $("#content"),
      permalink: permalink
    });

    map_manager = new WY.models.MapManager({
      el_name: "map-container"
    });



    projects_manager.on('load_complete', function(e){
      participants_manager.init_data(e.data);
      participants_manager.init();
      projects_manager.init();
      detail_page_manager.update();

      participants_manager.append_dom();
      projects_manager.append_dom();
      if (!cities_appended) {
        $('#section-cities').columnize({ width:200, lastNeverTallest: true});
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
      detail_page_manager.init_tmpl({
        artwork: e.tmpl.artwork, 
        project: e.tmpl.project
      });

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
    // flow_column('#section-participants',200);
    var index_height = $('#index').css("height");
    $('#index').css("top", '-' + index_height);    
    console.log ("index_height:" + index_height);
  }

  function flow_column(elem,width){
    //setup
    var container_width = parseFloat($(elem).css('width'));
    var col_count = Math.floor(container_width/width);
    var li_width = Math.round(container_width / col_count * 100)/100 + 'px';

    //set width
    $(elem+' li').each(function(i) {
      console.log('iterating: ' + i);
      $(this).css({
        width: li_width
      });
    });

    console.log (
      ' container_width: ' + container_width +
      ', col_count: ' + col_count +
      ', width_percent: ' + li_width
    );
  }

  function init_history(){
    History.Adapter.bind(window, 'statechange', function(){ 
      var state = History.getState(); 
      var permalink = state.data.permalink; 

      detail_page_manager.update(permalink);
    });

  }



  function show_index(){
    if (!index_opened){
      var index_height = $('#index').css("height");
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
      var index_height = $('#index').css("height");
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
