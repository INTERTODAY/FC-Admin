"use strict";requirejs(["common","Vimeo","jqueryUploaderService"],function(e,i,o){function d(){var e=c.val();"VIMEO"===e||"YOUTUBE"===e?(u.removeClass("blind"),s.addClass("blind"),r(".video-preview").addClass("blind")):"AQUA"===e&&(s.removeClass("blind"),u.addClass("blind"),r(".video-preview").removeClass("blind"))}function a(){var e=r("#video-title"),i=r("#video-code");return e.val()?!!i.val()||(window.alert("비디오 코드를 입력하세요."),i.focus(),!1):(window.alert("비디오 강좌명을 입력하세요."),e.focus(),!1)}function n(){var i,o,d=r("#video-provider").val();switch(console.log(d),d){case"YOUTUBE":if(i=r("#vimeo-video-code").val(),o=r("#video-player"),!i)return!1;o.html('<iframe width="100%" height="600" src="/api/v1/youtube?id='+i+'"frameborder="0" allowfullscreen></iframe>');break;case"VIMEO":if(i=r("#vimeo-video-code").val(),o=r("#video-player"),!i)return!1;o.html('<iframe src="https://player.vimeo.com/video/'+i+'"?title=0&byline=0&portrait=0" width="100%" height="600" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');break;case"AQUA":i=r("#modify-video").data("video-id"),f.attr("src","/api/v1/aqua?os="+e.getOSName()+"&video_id="+i)}}var r=r||window.$,l=r("#modify-video"),t=r("#uploadVideo"),v=r("#play-video"),c=r("#video-provider"),s=r(".aquaplayer-settings"),u=r(".vimeo-settings"),f=r("#aquaplayer_frame"),m=e.initDataTable(r("#table_add_video"),{buttons:[]}),p=r("#btnApplyVideo");r(function(){d(),n()}),p.bind("click",function(i){i.preventDefault();var o=r("input:first:checked",m.rows({search:"applied"}).nodes()).data();void 0!==o?window.confirm("적용하시겠습니까?")&&(r("#addVideo").modal("hide"),r("#aqua-video-code").val(o.url),f.attr("src","/api/v1/aqua?os="+e.getOSName()+"&video_id="+o.id)):window.alert("비디오를 선택하세요.")}),c.on("change",function(){d()}),t.on("click",function(){var e={uploadFolder:r("#upload_folder").val(),callback:function(e){}};o=new o(e)}),r("#video-code").bind("keypress",function(e){13===(e.which||e.keyCode)&&n()}),v.bind("click",function(e){n()}),l.bind("click",function(e){if(e.preventDefault(),!a())return!1;if(!window.confirm("저장하시겠습니까?"))return!1;var i,o=r("#video-provider").val();"VIMEO"===o||"YOUTUBE"===o?i=r("input[name='vimeo_video_code']").val():"AQUA"===o&&(i=r("input[name='aqua_video_code']").val()),window.axios.post("/course/modify/video",{course_id:r("input[name='course_id']").val(),course_list_id:r(this).data("course-list-id"),video_name:r("input[name='video_name']").val(),video_provider:o,video_code:i,video_id:r(this).data("video-id")}).then(function(e){window.alert("비디오를 저장하였습니다."),window.parent.opener.winpop_listener(!0),window.close()}).catch(function(e){return console.log(e),!1})}),window.onbeforeunload=function(e){if(_confirm)return confirm("진행중인 작업이 모두 사라집니다. 계속하시겠습니까?")}});
//# sourceMappingURL=../../maps/winpops/win_modify_video.js.map
