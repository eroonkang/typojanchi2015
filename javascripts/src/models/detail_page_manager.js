WY.models.DetailPageManager = (function(){
  function DetailPageManager(params){
    this.el = params.el;
    this.permalink = params.permalink;
    this.project_id;
    this.data;
    this.tmpl

    _.bindAll(this, "load_complete_handler");
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

      this.project_id = Number(this.permalink.split("-")[0]);

      $.ajax({
        type: 'GET',
        url: WY.constants.home_url + '/projects/artworks/' + this.permalink + ".yml",
        success: this.load_complete_handler
      });
    },

    load_complete_handler: function(data){

      // hide_index()f를 부르고 싶은데 방법이 없다.
      // if (index_opened) {
      //   hide_index();
      // }
      // else {
      //   this.scrollTop(0);
      // }

      // set mat height도 마찬가지
      $('#map-container, #map-outer').css("height", WY.constants.screen_height/2);


      this.data = jsyaml.load(data);
      // debugger;
   
      
      this.title = _.isUndefined(this.data.type) ? this.data["full_name_" + WY.constants.locale] : this.data["project_name_" + WY.constants.locale];
      this.title += " :: Typojanchi 2015";

      $("title").text(this.title);
      debugger;
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


    }

  };

  
  return DetailPageManager;
})();