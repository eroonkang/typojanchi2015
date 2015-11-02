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

    update: function(permalink){
      if (!_.isUndefined(permalink)) {
        this.permalink = permalink;
      }

      if (this.permalink == '' || _.isUndefined(this.permalink)) { 
        return false; 
      }

      if (this.permalink == "about") {
        this.update_about();
      } else {
        this.update_detail_page();  
      }
      
    },

    update_about: function(){
      $.ajax({
        type: 'GET',
        url: WY.constants.home_url + "/about_" + WY.constants.locale + ".html",
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
      $("title").text("About :: Typojanchi 2015");

      this.el.empty().append($(data));
      this.trigger('load_complete');
    },


    detail_load_complete_handler: function(data){

      this.data = jsyaml.load(data);
      // debugger;
   
      
      this.title = _.isUndefined(this.data.type) ? this.data["full_name_" + WY.constants.locale] : this.data["project_name_" + WY.constants.locale];
      this.title += " :: Typojanchi 2015";

      $("title").text(this.title);
      // debugger;
      var type = _.isUndefined(this.data.type) ? "artwork" : this.data.type.toLowerCase();
      // debugger;
      this.el.empty().append($(this.tmpl[type]({
        detail: this.data,
        project: WY.constants.projects_data.projects[this.project_id - 1]
      })));

      this.el.find(".participant_change_btn").click(function(e){
        e.preventDefault();
        // debugger;
        History.pushState({
          permalink: $(e.currentTarget).data('permalink')
        }, "Loading...", $(e.currentTarget).attr('href'));
      });

      this.trigger('load_complete');
    }

  };

  
  return DetailPageManager;
})();