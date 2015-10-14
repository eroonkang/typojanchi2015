WY.models.ProjectsManager = (function(){
  function ProjectsManager(params){
    this.el = params.el;
    this.tmpl;
    this.data;

    _.extend(this, Backbone.Events);
    _.bindAll(this, "load_complete_handler");
  }

  ProjectsManager.prototype = {
    init_tmpl: function(tmpl){
      this.tmpl = tmpl;
    },

    load: function(){
      $.ajax({
        type: 'GET',
        url: WY.constants.home_url + '/projects/projects.yml',
        success: this.load_complete_handler
      });
    },

    load_complete_handler: function(data){
      this.data = jsyaml.load(data);
      WY.constants.projects_data = this.data;
      this.trigger('load_complete', {data: this.data});
    },

    init: function(){
      this.el.append($(this.tmpl(this.data)));
      this.el.columnize({    width:380, lastNeverTallest: true});
    }
  };

  return ProjectsManager;
})();
