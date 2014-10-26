define(['app/modules/directives'],function(directives){
directives.
    directive('jumPropertiesEditor',[function() {
        return {
          restrict: 'E',
          require: 'ngModel',
          templateUrl: 'app/common/directives/templates/properties-editor.html',
          link: function(scope, element, attrs, ngModel){
              if(!ngModel) return;
              
              ngModel.$render = function(){
                  element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
              };
          }
        };
  }]);
});


