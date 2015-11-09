WY.models.ParticipantsManager = (function(){
  function ParticipantsManager(params){
    this.el = params.el;
    this.tmpl;
    this.inner_dom;
    this.data;
    this.appended = false;

    _.extend(this, Backbone.Events);
    _.bindAll(this, "columnize_complete_handler");
  }

  ParticipantsManager.prototype = {
    init_tmpl: function(tmpl){
      this.tmpl = tmpl;
    },

    init_data: function(data){
      this.data = data;
    },

    init: function(){
      this.inner_dom = $(this.tmpl(this.data))
    },

    columnize_complete_handler: function(e){
      this.trigger('columnize_complete');
    },

    // recolumnize: function(){
    //   this.el.columnize({ buildOnce: true, width:200, lastNeverTallest: true});
    // },

    append_dom: function(){
      if (!_.isUndefined(this.inner_dom) && !this.appended){
        this.el.append(this.inner_dom);
        this.el.columnize({ doneFunc: this.columnize_complete_handler, width:200, lastNeverTallest: true});
        this.appended = true;
      }

      this.el.find(".participant_change_btn").click(function(e){
        e.preventDefault();
        // debugger;
        History.pushState({
          permalink: $(e.currentTarget).data('permalink')
        }, "Loading...", $(e.currentTarget).attr('href'));
      });
    }
  };

  return ParticipantsManager;
})();
