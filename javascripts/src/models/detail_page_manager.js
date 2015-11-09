WY.constants.single_projects_routes = {
  "12-exhibition-space": "12-zero-lab",
  "13-website-project": "13-eroonkang",
  "14-docent-video-projects": "14-nolgong",
  "15-opening-performance": "15-dappertutto",
  "16-newsletter-project": "16-mediabus-shinshin",
  "17-archiving-app": "17-rebel9",
  "7-book-bricks": "7-pati"
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
      ga('set', { page: location.path, title: "About / Typojanchi 2015" });
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
      // debugger;
   
      if (_.isUndefined(this.data.type)){
        this.title = this.data["full_name_" + WY.constants.locale];
      } else if (this.data.type == "Project") {
        this.title = this.data["project_name_" + WY.constants.locale];
      } else if (this.data.type == "Venue") {
        this.title = this.data["venue_name_" + WY.constants.locale];
      }

      this.title += " / Typojanchi 2015 / 4회 국제 타이포그래피 비엔날레";

      ga('set', { page: location.path, title: this.title });
      ga('send', 'pageview');

      $("title").text(this.title);
      // debugger;
      var type = _.isUndefined(this.data.type) ? "artwork" : this.data.type.toLowerCase();
      // debugger;
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