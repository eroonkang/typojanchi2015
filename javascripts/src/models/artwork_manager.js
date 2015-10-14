WY.models.ArtworkManager = (function(){
  function ArtworkManager(params){
    this.el = params.el;
    this.artwork_permalink = params.artwork_permalink;
    this.project_id;
    this.data;
    this.tmpl;

    _.bindAll(this, "load_complete_handler");
  }

  ArtworkManager.prototype = {
    init_tmpl: function(tmpl){
      this.tmpl = tmpl;
    },

    update: function(artwork_permalink){
      if (!_.isUndefined(artwork_permalink)) {
        this.artwork_permalink = artwork_permalink;
      }

      if (this.artwork_permalink == '' || _.isUndefined(this.artwork_permalink)) { 
        return false; 
      }

      this.project_id = Number(this.artwork_permalink.substring(0, 1));

      $.ajax({
        type: 'GET',
        url: WY.constants.home_url + '/projects/artworks/' + this.artwork_permalink + ".yml",
        success: this.load_complete_handler
      });
    },

    load_complete_handler: function(data){

      this.data = jsyaml.load(data);

   
      this.title = this.data["artwork_name_" + WY.constants.locale] + " by " + 
                  this.data["full_name_" + WY.constants.locale] +
                  ":: Typojanchi 2015";

      $("title").text(this.title);
      this.el.empty().append($(this.tmpl({
        artwork: this.data,
        project: WY.constants.projects_data.projects[this.project_id - 1]
      })));


    }

  };

  
  return ArtworkManager;
})();