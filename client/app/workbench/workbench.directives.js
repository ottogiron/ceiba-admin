define(['app/modules/directives','jquery','jstree'],function(directives,$){
    directives.
        directive('jumJsTree',['$timeout',function($timeout){
            function link(scope,element,attrs){
                function transformtoJSTree(trees) {
                    return _.map(trees, function(tree) {
                        tree.text = tree.name || tree.path;
                        tree.id = tree.path;
                        tree.children = true;
                        if(tree.path){
                            return {
                                id: tree.path,
                                text: tree.name || tree.path,
                                children: true
                            };
                        }
                        
                    });
                }
                
                $(element).jstree({
                    core: {
                        data: loadData
                    }
                });
                
                function loadData(obj,cb){
                    
                    if(scope.loadTree){
                        scope.loadTree(obj,function(trees){
                            var newTree = transformtoJSTree(trees);
                            cb.call(this,newTree);
                        }.bind(this));
                    }
                    else{
                        cb.call(this,[]);
                    }
                    
                }

//                scope.$watch('trees',function(value){
//                       if(value){
//                            var nvalue = transformtoJSTree(value);
//                            $(element).jstree({core:{
//                              data: nvalue
//                          }});
//                       }                   
//                    });                
            }
            
            return {
                link: link
            }; 
    }]);
});
