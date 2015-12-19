WY.constants.single_projects_routes = {
  "11-city-typography-reportage": "11-guteform-jiwon-yu",
  "12-exhibition-space": "12-zero-lab",
  "13-website-project": "13-eroonkang",
  "14-docent-video-projects": "14-nolgong",
  "15-opening-performance": "15-dappertutto",
  "16-newsletter-project": "16-mediabus-shinshin",
  "17-archiving-app": "17-rebel9",
  "18-report-on-the-composition-of-a-city": "18-doosung",
  "19-city-type-bus-project": "19-chae-lee",
  "7-pati": "7-book-bricks"
}
WY.models.DetailPageManager = (function(){
  function DetailPageManager(params){
    this.el = params.el;
    this.permalink = params.permalink;
    this.project_id;
    this.data;
    this.tmpl;

    _.extend(this, Backbone.Events);
    _.bindAll(this, "detail_load_complete_handler", "about_load_complete_handler");
  }

  DetailPageManager.prototype = {
    init_tmpl: function(tmpl){
      this.tmpl = tmpl;
    },

    hide: function(){
      this.el.hide();
    },

    update: function(permalink){
      if (!_.isUndefined(permalink)) {
        this.permalink = permalink;
      }

      if (this.permalink == '' || _.isUndefined(this.permalink)) { 
        return false; 
      } else {
        if (!_.isUndefined(WY.constants.single_projects_routes[this.permalink])){
          var redirect_permalink = WY.constants.single_projects_routes[this.permalink];

          History.pushState({
            permalink: redirect_permalink
          }, "Loading...", WY.constants.home_url + "/" + WY.constants.locale + "/" + redirect_permalink);
          return false;
        }
      }

      this.el.show();
      
      if (this.permalink == "about") {
        this.update_about();
      } else {
        this.update_detail_page();  
      }
      
    },

    update_about: function(){
      $.ajax({
        type: 'GET',
        url: WY.constants.home_url + "/templates/about_" + WY.constants.locale + ".ejs",
        success: this.about_load_complete_handler
      });
    },

    update_detail_page: function(){
      this.project_id = Number(this.permalink.split("-")[0]);

  
      $.ajax({
        type: 'GET',
        url: WY.constants.home_url + '/projects/artworks/' + this.permalink + ".yml",
        success: this.detail_load_complete_handler
      });
    },

    about_load_complete_handler: function(data){
      $("title").text("About / Typojanchi 2015");

      var tmpl = _.template(data);
      this.el.find("#content").empty().append($(tmpl()));
      this.ko_type_adjust();
      this.trigger('load_complete');

      this.add_events();
      ga('set', { page: location.path, title: "About / 타이포잔치 2015 — Typojanchi 2015" });
      ga('send', 'pageview');

    },

    add_events: function(){

      $('.footer_btn, .about_btn').click(function(e){
        e.preventDefault();
        // debugger;
        History.pushState({
          permalink: $(e.currentTarget).data('permalink')
        }, "Loading...", $(e.currentTarget).attr('href'));
      });

    },


    detail_load_complete_handler: function(data){

      this.data = jsyaml.load(data);
    
      if (_.isUndefined(this.data.type)){
        this.title = this.data["full_name_" + WY.constants.locale];
      } else if (this.data.type == "Project") {
        this.title = this.data["project_name_" + WY.constants.locale];
      } else if (this.data.type == "Venue") {
        this.title = this.data["venue_name_" + WY.constants.locale];
      }

      this.title += " / 타이포잔치 2015 — Typojanchi 2015";

      ga('set', { page: location.path, title: this.title });
      ga('send', 'pageview');

      $("title").text(this.title);
      // debugger;
      var type = _.isUndefined(this.data.type) ? "artwork" : this.data.type.toLowerCase();
      // debugger;
      this.init_project_carousel();
      this.el.find("#content").empty().append($(this.tmpl[type]({
        detail: this.data,
        permalink: this.permalink,
        project: WY.constants.projects_data.projects[this.project_id - 1]
      })));


      this.el.find("#content .participant_change_btn").click(function(e){
        e.preventDefault();
        // debugger;
        History.pushState({
          permalink: $(e.currentTarget).data('permalink')
        }, "Loading...", $(e.currentTarget).attr('href'));
      });



      this.add_events();
      this.ko_type_adjust();
      this.trigger('load_complete');
    },

    init_project_carousel: function(){
      if (WY.constants.projects_data.projects[this.project_id - 1].photos.length > 0){

        try{
          this.el.find("#project_carousel").slick('unslick');
          
        } catch(e){

        }
        this.el.find("#project_carousel").height(900);
        this.el.find("#project_carousel").empty().append($(this.tmpl.project_carousel({
          project: WY.constants.projects_data.projects[this.project_id - 1]
        })));

        this.el.find("#project_carousel a").width(WY.constants.screen_width);
        this.el.find("#project_carousel").slick({
          centerMode: true, 
          variableWidth: true,
          centerPadding: '40px',
          dots: false,
          arrows: true
        }); 
      } else {
         try{
          this.el.find("#project_carousel").slick('unslick');
          this.el.find("#project_carousel").height(0);
          
        } catch(e){

        }
      }
      
    },

    ko_type_adjust: function(){
      var rex = new RegExp("([\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF“””‘’A-Za-z0-9,.():&-;]+)(?![^<>&]*>)", "gm");

      this.el.find("#content").find(":lang(ko)").each(function(){
        var $this = $(this);
        var content = $this.html();
        // debugger;
        $this.html(content.replace(rex, "<span class='en-within-ko'>$1</span>"));
      });
    }

  };


  
  return DetailPageManager;
})();