"use strict";requirejs(["jquery"],function(e){function i(){var i=e("#video-title"),r=e("#video-code");return i.val()?!!r.val()||(alert("비디오 코드를 입력하세요."),r.focus(),!1):(alert("비디오 강좌명을 입력하세요."),i.focus(),!1)}function r(){var i=e("#video-code").val(),r=e("#video-provider").val(),o=e("#video-player");if(!i)return!1;switch(r){case"YOUTUBE":o.html('<iframe width="100%" height="600" src="https://www.youtube.com/embed/'+i+'"frameborder="0" allowfullscreen></iframe>');break;case"VIMEO":o.html('<iframe src="https://player.vimeo.com/video/'+i+'"?title=0&byline=0&portrait=0" width="100%" height="600" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')}}var o=e("#modify-video"),t=e("#play-video"),a=!0;e(function(){r()}),e("#video-code").bind("keypress",function(e){var i=e.which||e.keyCode;13===i&&r()}),t.bind("click",function(e){r()}),o.bind("click",function(r){if(r.preventDefault(),!i())return!1;if(!confirm("저장하시겠습니까?"))return!1;var o=e("form").serializeArray();o.push({name:"course_list_id",value:e(this).data("course-list-id")}),o.push({name:"video_id",value:e(this).data("video-id")}),e.ajax({url:e("form").attr("action"),type:"PUT",data:o,contentType:"application/x-www-form-urlencoded; charset=UTF-8",dataType:"html",success:function(e){alert("비디오를 저장하였습니다."),window.parent.opener.location.reload(),a=!1,window.close()}})}),window.onbeforeunload=function(e){if(a)return confirm("진행중인 작업이 모두 사라집니다. 계속하시겠습니까?")}});