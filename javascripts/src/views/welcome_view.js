WY.views.welcome_view = (function(){
  function welcome_view(params){
    $('#section-cities').columnize({    width:250, lastNeverTallest: false});
    $('#section-participants').columnize({  width:250, lastNeverTallest: true});
    $('#section-projects').columnize({    width:380, lastNeverTallest: true});
  }

  return welcome_view;
})();
