WY.models.ProjectsManager = (function(){
  function ProjectsManager(params){
    this.el = params.el;
    this.tmpl;
    this.inner_dom;
    this.data;
    this.appended;

    _.extend(this, Backbone.Events);
    _.bindAll(this, "columnize_complete_handler", "load_complete_handler", "project_btn_click_handler");
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
      this.inner_dom = $(this.tmpl(this.data));
    },


    columnize_complete_handler: function(e){
      this.trigger('columnize_complete');
    },
    // recolumnize: function(){
    //   this.el.columnize({ buildOnce: true, width:400, lastNeverTallest: true});  
    // },

    append_dom: function(){
      if (!_.isUndefined(this.inner_dom) && !this.appended){
        this.el.append(this.inner_dom);
        this.el.columnize({ doneFunc: this.columnize_complete_handler, width:400, lastNeverTallest: true});    
        this.appended = true;
      }

      this.el.find(".project_btn").click(this.project_btn_click_handler);
    },

    project_btn_click_handler: function(e){
      e.preventDefault();

      History.pushState({
        permalink: $(e.currentTarget).data('permalink')
      }, "Loading...", $(e.currentTarget).attr('href'));

    }
  };

  return ProjectsManager;
})();
