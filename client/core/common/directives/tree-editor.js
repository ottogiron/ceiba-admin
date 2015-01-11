define(['core/modules/directives'],function(directives){
directives.
    directive('jumTreeEditor',[function() {
        return {
          restrict: 'E',
          require: 'ngModel',
          templateUrl: 'core/common/directives/templates/tree-editor.html',
          link: function(scope, element, attrs, ngModel){
              if(!ngModel) return;
              
              ngModel.$render = function(){
                 // element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
              };
          }
        };
  }]);
});


