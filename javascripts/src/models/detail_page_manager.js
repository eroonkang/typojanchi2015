WY.models.DetailPageManager = (function(){
  function DetailPageManager(params){
    this.el = params.el;
    this.permalink = params.permalink;
    this.project_id;
    this.data;
    this.tmpl;

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

      this.project_id = Number(this.permalink.substring(0, 1));

      $.ajax({
        type: 'GET',
        url: WY.constants.home_url + '/projects/artworks/' + this.permalink + ".yml",
        success: this.load_complete_handler
      });
    },

    load_complete_handler: function(data){

      this.data = jsyaml.load(data);
      // debugger;
   
      this.title = this.data["artwork_name_" + WY.constants.locale] + " by " + 
                  this.data["full_name_" + WY.constants.locale] +
                  ":: Typojanchi 2015";

      $("title").text(this.title);
      
      this.el.empty().append($(this.tmpl({
        artwork: this.data,
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