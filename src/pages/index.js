
require(["../scripts/config.js"], function(){
	require(["common","jquery", "swiper","a", "fontscroll"], function(com, $, Swiper, a ){
		
		$(function(){
			$.ajax({
				url : "/userinfo",
				success : function(data){
					console.log(data);
				}
			})
		})
		
	})
})

