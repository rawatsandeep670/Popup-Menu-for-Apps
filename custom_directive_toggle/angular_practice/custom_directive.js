(function(){
	'use strict'
	var app=angular.module("customDirectiveApp", []);
	app.directive("myToggle", function($timeout){
	
	return {

		restrict : 'E',
		replace : true,
		scope : {
			icon : "@",
			iconPosition : "@",
			iconHeight : "@",
                        iconWidth : "@",
			containerWidth : "@",
			containerHeight : "@"
		},
		transclude : true,
		template : '<div class="toggle_top"><div style="width:100%; height:{{iconHeight}}"><div class="toggle_btn" style="float:{{iconPosition}}; width:{{iconWidth}}"><img src="{{icon}}" class="temp_directive_class"/></div></div><div class="toggle_inner" style="position: absolute; width : {{containerWidth}}; height : {{containerHeight}}"><ng-transclude></ng-transclude></div></div>',
		link : function(scope, ele, attr){
			var btn=angular.element(ele).find("img");
			btn.attr("draggable", "false");
			if(scope.iconPosition=="defined"){
				scope.iconPosition="left";
			}
			
			
			var inner_div=angular.element(document.getElementsByClassName("toggle_inner")[0]);
			var toggle_btn=angular.element(document.getElementsByClassName("toggle_btn")[0]);
			
			if(scope.iconPosition=="left")
			{
				inner_div.addClass("toggle_inner_exit");
				inner_div.addClass("toggle_inner_left");
				inner_div.children().children().addClass("temp_directive_class");
				btn.bind("click", function(e){
					inner_div.toggleClass("toggle_inner_exit");
				
				});
			}
			
			if(scope.iconPosition=="right"){
				
				inner_div.addClass("toggle_inner_right");
				inner_div.addClass(" toggle_inner_exit_right");
				
				inner_div.children().children().addClass("temp_directive_class");
				btn.bind("click", function(e){
					inner_div.toggleClass("toggle_inner_exit_right");
				
				});
			}
			
			angular.element(document.querySelector("html")).bind("click", function(e){
				
				if(scope.iconPosition=="left")
				{
					if((e.target.className).indexOf("toggle_inner")!=-1){}
					else if(e.target.className=="temp_directive_class" || (e.target.className).indexOf("temp_directive_class")!=-1){}
					else
					{
						inner_div.addClass("toggle_inner_exit");
					}
				}
				if(scope.iconPosition=="right")
				{
					if((e.target.className).indexOf("toggle_inner")!=-1){}
					else if(e.target.className=="temp_directive_class" || (e.target.className).indexOf("temp_directive_class")!=-1){}
					else
					{
						inner_div.addClass("toggle_inner_exit_right");
					}
				}
			});
                        
                        btn.bind("mouseover", function(){
                            btn.addClass("img-mouse-over-add");
                        });
                        btn.bind("mouseleave", function(){
                            btn.removeClass("img-mouse-over-add");
                        });
		}
	}
	
	});
	
})();