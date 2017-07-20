"use strict";window.requirejs(["common","text!../course.template.html","text!../session.template.html"],function(e,t,n){function i(){var e=b(":checkbox:checked",E.rows({filter:"applied"}).nodes()).map(function(){return b(this).data("id")}).get().join(", ");b("input[name='upload_employee_ids']").val(e)}function a(e){var t=b(".panel-group").data("selected-course-id"),n=b(".panel[data-id="+t+"]");(void 0===n.data("metadata").sessionLoaded||e)&&window.axios.get("/course/"+t).then(function(e){e.data&&(n.find(".session-content").html(h({session_list:e.data.session_list})),n.data("metadata").sessionLoaded=!0,b(".list-group").sortable({connectWith:".list-group-item",start:function(e,t){b(this).attr("data-previndex",t.item.index())},update:function(e,t){b(this).removeAttr("data-previndex"),w()}}).disableSelection())}).catch(function(e){console.log(e)})}function o(){var e=b("#edu_id").val();window.axios.get("/education/"+e+"/courses").then(function(e){e.data&&b.each(e.data.edu_course_list,function(e,t){b("#course-list").append(f(t)),b(".panel").last().data("metadata",t)})}).catch(function(e){console.log(e)})}function c(e){var t="ul.setup-panel li:eq("+(parseInt(e)-1)+")",n='ul.setup-panel li a[href="#step-'+e+'"]';b(t).removeClass("disabled"),b(n).trigger("click")}function s(e){window.axios.post("/simple_assignment/progress",{step:e,id:x}).then(function(t){return C(e),!0}).catch(function(e){return console.log(e),!1})}function d(){var e=new window.FormData;e.append("upload_type",b("input[name='upload_type']").val()),e.append("upload_employee_ids",b("input[name='upload_employee_ids']").val()),e.append("file-excel",document.getElementById("UploadExcelFile").files[0]),e.append("group_name","간편배정"),e.append("redirect",!1),e.append("id",x),window.axios.post("/assignment/upload",e).then(function(e){e.data&&b("#log_bind_user_id").val(e.data.logBindUserId)}).catch(function(e){console.log(e)})}function r(){var e={name:b("input[name='course_name']").val(),desc:window.tinymce.activeEditor.getContent(),complete_point:b("input[name='complete_point']").val(),quiz_point:b("input[name='quiz_point']").val(),test_point:b("input[name='test_point']").val(),reeltime_point:b("input[name='reeltime_point']").val(),speed_point:b("input[name='speed_point']").val(),reps_point:b("input[name='reps_point']").val(),start_dt:b("input[name='start_dt']").val(),finish_dt:b("input[name='finish_dt']").val(),assigment_id:x,upload_employee_ids:b("input[name='upload_employee_ids']").val(),edu_id:b("#edu_id").val(),log_bind_user_id:b("#log_bind_user_id").val(),training_edu_id:b("#training_edu_id").val()};window.axios.post("/education",e).then(function(e){e.data&&(b("#training_edu_id").val(e.data.trainingEduId),b("#edu_id").val(e.data.eduId))}).catch(function(e){console.log(e)})}function l(){if(!window.confirm("정말 삭제하시겠습니까?"))return!1;var e={id:x};window.axios.delete("/simple_assignment",{params:e}).then(function(e){e.data.success?(window.alert("교육과정을 삭제하였습니다."),window.location.href="/simple_assignment"):window.alert("배정내역을 삭제하지 못하였습니다.")}).catch(function(e){console.log(e)})}function u(){var e=b("ul.select-employee li.active").children().attr("id"),t=null;switch(b("input[name='upload_type']").val(e),e){case"employee":if(!(t=b(":checkbox:checked",E.rows({filter:"applied"}).nodes()).map(function(){return b(this).data("id")}).get().join(", ")))return window.alert("직원을 선택하세요."),!1;b("input[name='upload_employee_ids']").val(t);break;case"excel":if(0===document.getElementById("UploadExcelFile").files.length)return b("#UploadExcelFile").focus(),window.alert("파일을 선택하세요."),!1}return!0}function p(){var e=b("input[name='course_name']"),t=window.tinymce.activeEditor.getContent();if(""===e.val())return window.alert("교육과정명을 입력하세요."),e.focus(),!1;if(""===t)return window.alert("교육과정에 대한 설명을 입력하세요."),window.tinymce.execCommand("mceFocus",!1,"input-course-desc"),!1;var n=!0,i=0;return b(".point-item").each(function(){if(b(this).parent().find(".input-group-addon").children("input:checkbox").prop("checked")&&""===b(this).val())return window.alert(b(this).prop("placeholder")+" 포인트 점수를 입력하세요."),b(this).focus(),n=!1,!1;i+=parseInt(b(this).val())}),!!n&&(100===i||(window.alert("포인트의 합계는 100점이 되어야 합니다."),!1))}function f(e){return $(e)}function h(e){return L(e)}function m(e){return window.axios({method:"put",url:"/course/courselist",data:{title:e.children("a").data("title"),course_list_id:e.children("a").data("id"),course_list_order:e.index()}})}function w(){for(var e=[],t=window.$(".session-content > .list-group-item"),n=0;n<t.length;n++)e.push(m(window.$(t[n])));window.axios.all(e).then(function(e){e.forEach(function(e){console.log(e)})})}function v(e){b(e.target).prev(".panel-heading").find(".more-less").toggleClass("glyphicon-plus glyphicon-minus");var t=b(e.target).parents().find(".panel-group"),n=b(e.target).parents().closest(".panel").data("id");t.data("selected-course-id")!==n&&(t.data("selected-course-id",n),a())}function _(){var e=b("#registerCourse"),t={course_name:e.find("input[name='course_name']").val(),course_desc:window.tinymce.activeEditor.getContent(),teacher_name:e.find("input[name='teacher_name']").val(),edu_id:b("#edu_id").val()};window.axios.post("/course",t).then(function(e){if(e.data){if(0===b("#course-list").children().length){b("ul.setup-panel li:eq(3)").removeClass("disabled"),s(4)}b("#course-list").append(f(e.data)),b(".panel").last().data("metadata",e.data)}}).catch(function(e){console.log(e)})}function g(){var e=b("#modifyCourse"),t=b(".panel-group").data("selected-course-id"),n={course_id:t,course_name:e.find("input[name='course_name']").val(),course_desc:window.tinymce.activeEditor.getContent(),teacher_name:e.find("input[name='teacher_name']").val(),course_rate:0,teacher_rate:0};window.axios.put("/course",n).then(function(e){e.data&&(b(".panel[data-id="+e.data.course_id+"]").replaceWith(f(e.data)),b(".panel[data-id="+e.data.course_id+"]").data("metadata",e.data))}).catch(function(e){console.log(e)})}function k(e){var t=b(e.relatedTarget).parents().find(".panel").data("metadata"),n=b(this);n.find("input").val("").end(),window.tinymce.activeEditor.setContent(""),n.find("input[name='course_name']").val(t.course_name),n.find("input[name='teacher_name']").val(t.teacher_name),window.tinymce.get("course_desc").setContent(t.course_desc),n.find("[autofocus]").focus()}var b=window.$,y=window._,x=b("#assignment_id").val(),C=b("#activated_step").val(),D=b("ul.setup-panel li a"),z=b(".setup-content"),q=b("#check-all"),E=e.initDataTable(b("#table_employee"),{lengthMenu:[[5,10,25,50,-1],[5,10,25,50,"전체"]],columnDefs:[{orderable:!1,targets:[0]}]}),I=b("#js-delete-simple-assign"),W=b("#js-save-simple-assign"),P=b(".btn-send-message"),F=b(".message"),$=window.Handlebars.compile(t),L=window.Handlebars.compile(n),Q="scrollbars=yes, toolbar=no, location=no, status=no, menubar=no, resizable=yes, width=1040, height=760, left=0, top=0";if(b(function(){z.hide(),e.initDateTimePicker(b(".date#start_dt"),b(".date#end_dt")),b("ul.setup-panel li").map(function(){for(var e=b(this),t=2;t<=C;t++)t===e.index()+1&&c(t)}),b("#edu_id").val()&&o(),i()}),window.winpop_listener=function(e){a(e)},q.bind("click",function(){b(":checkbox",E.rows().nodes()).prop("checked",this.checked)}),D.click(function(e){e.preventDefault();var t=b(b(this).attr("href")),n=b(this).closest("li");n.hasClass("disabled")||(D.closest("li").removeClass("active"),n.addClass("active"),z.hide(),t.show())}),C>1){var U="ul.setup-panel li a:eq("+(C-1).toString()+")";b(U).click()}else b("ul.setup-panel li.active a").trigger("click");b(".step1 > .next > a").on("click",function(e){e.preventDefault(),u()&&(c(2),d())}),b(".step2 > .previous > a").on("click",function(e){e.preventDefault(),c(1)}),b(".step2 > .next > a").on("click",function(e){e.preventDefault(),p()&&(c(3),r())}),b(".step3 > .previous > a").on("click",function(e){e.preventDefault(),c(2)}),b(".step3 > .next > a").on("click",function(e){e.preventDefault(),c(4)}),b(".step4 > .previous > a").on("click",function(e){e.preventDefault(),c(3)}),b(".panel-collapse").on("hide.bs.collapse",function(){b(".panel-collapse-clickable").find("i").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down")}),b(".panel-collapse").on("show.bs.collapse",function(){b(".panel-collapse-clickable").find("i").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up")}),I.on("click",l),W.on("click",function(){switch(b("ul.setup-panel li.active").index()+1){case 1:d();break;case 2:r()}}),b(".input-group-addon").children("input:checkbox").on("change",function(){var e=b(this).parent().parent().find(".point-item");e.prop("disabled",!b(this).prop("checked")),b(this).prop("checked")&&e.focus()}),b(".point-item").on("keyup",y.debounce(function(){var e=0;if(b(".point-item").each(function(){b(this).parent().find(".input-group-addon").children("input:checkbox").prop("checked")&&""!==b(this).val()&&(e+=parseInt(b(this).val()))}),e>0&&b(".badge").text(e),e>100)return window.alert("100점을 초과하였습니다."),!1},300)),b("#registerCourse").submit(function(e){e.preventDefault(),_(),window.tinymce.execCommand("mceFocus",!1,"course_desc"),b(this).modal("toggle")}),b("#modifyCourse").submit(function(e){e.preventDefault(),g(),window.tinymce.execCommand("mceFocus",!1,"course_desc"),b(this).modal("toggle")}),b(".panel-group").on("hidden.bs.collapse",v),b(".panel-group").on("shown.bs.collapse",v),b("#registerCourse").on("hidden.bs.modal",function(){b(this).find("input").val("").end(),window.tinymce.activeEditor.setContent("")}),b("#registerCourse").on("shown.bs.modal",function(){b(this).find("[autofocus]").focus()}),b("#modifyCourse").on("shown.bs.modal",k),b(".panel-group").on("click",".btn-create-video",function(t){t.preventDefault();var n=b(this).attr("data-course-id");e.createWindowPopup("/course/create/video?course_id="+n,"Video",Q)}),b(".panel-group").on("click",".btn-create-video",function(t){t.preventDefault();var n=b(this).attr("data-quiz-group"),i=b(this).attr("data-title"),a=b(this).attr("data-type");e.createWindowPopup("/course/quiz?id="+n+"&title="+i+"&type="+a,"Quiz",Q)}),b(".panel-group").on("click",".btn-create-quiz",function(t){t.preventDefault();var n=b(this).attr("data-course-id");e.createWindowPopup("/course/create/quiz?course_id="+n+"&type=QUIZ","Quiz",Q)}),b(".panel-group").on("click",".btn-create-final",function(t){t.preventDefault();var n=b(this).attr("data-course-id");e.createWindowPopup("/course/create/quiz?course_id="+n+"&type=FINAL","Final",Q)}),b(".panel-group").on("click",".btn-create-checklist",function(t){t.preventDefault();var n=b(this).attr("data-course-id");e.createWindowPopup("/course/create/checklist?course_id="+n+"&type=CHECK","Checklist",Q)}),b(".panel-group").on("click",".btn-delete-session",function(e){if(e.preventDefault(),!window.confirm("삭제 시 되돌릴 수 없습니다. 정말 삭제하시겠습니까?"))return!1;var t=b(this),n={};switch(n.course_list_id=b(this).parent("span").data("course-list-id"),n.course_list_type=b(this).parent("span").data("type"),b(this).parent("span").data("type")){case"QUIZ":case"FINAL":n.quiz_group_id=b(this).data("quiz-group");break;case"VIDEO":n.video_id=b(this).data("video-id");break;case"CHECKLIST":n.checklist_group_id=b(this).data("checklist-group")}window.axios.delete("/course/courselist",{params:n}).then(function(e){e.data.success?(window.alert("세션을 삭제하였습니다."),t.parents("li").remove()):window.alert("진행한 이력이 있어 세션을 삭제하지 못했습니다. 관리자에게 문의해주시기 바랍니다.")}).catch(function(e){console.log(e)})}),b(".panel-group").on("click",".btn-modify-session",function(t){t.preventDefault();var n=b(this).parent("span").data("course-id"),i=b(this).parent("span").data("course-list-id"),a=b(this).data("video-id"),o=b(this).data("quiz-group"),c=b(this).data("checklist-group"),s=b(this).parent("span").data("type");"VIDEO"===s?e.createWindowPopup("/course/modify/video?course_id="+n+"&course_list_id="+i+"&video_id="+a,"Video",Q):"QUIZ"===s||"FINAL"===s?e.createWindowPopup("/course/modify/quiz?course_id="+n+"&course_list_id="+i+"&type="+s+"&quiz_group_id="+o,"Quiz",Q):"CHECKLIST"===s&&e.createWindowPopup("/course/modify/checklist?course_id="+n+"&course_list_id="+i+"&type="+s+"&checklist_group_id="+c,"Checklist",Q)}),b(".panel-group").on("click",".btn-preview-checklist",function(t){t.preventDefault();var n=window.$(this).parent("span").data("course-list-id");n||(n=window.$(this).data("id")),e.createWindowPopup("/course/checklist?course_list_id="+n,"Checklist",Q)}),b(".panel-group").on("click",".btn-solve-quiz",function(t){t.preventDefault();var n=window.$(this).attr("data-quiz-group"),i=window.$(this).attr("data-title"),a=window.$(this).attr("data-type");e.createWindowPopup("/course/quiz?id="+n+"&title="+i+"&type="+a,"Quiz",Q)}),b(".panel-group").on("click",".btn-watch-video",function(t){t.preventDefault();var n=window.$(this).attr("data-video-id");e.createWindowPopup("/course/video?id="+n,"Video",Q)}),b(".panel-group").on("click",".btn-delete-course",function(){if(window.confirm("선택하신 강의를 삭제하시겠습니까?")){var e=b(".panel-group").data("selected-course-id");window.axios.delete("/course/deactivate",{params:{id:e}}).then(function(t){t.data.success&&b(".panel[data-id="+e+"]").remove()}).catch(function(e){console.log(e)})}}),P.on("click",function(e){e.preventDefault();var t,n=b("ul.select-employee li.active").children().attr("id");switch(n){case"employee":t=window.$(":checkbox:checked",E.rows({filter:"applied"}).nodes()).map(function(){return E.row(window.$(this).parents("tr")).data()[4]}).get().join(",")}if(!t)return window.alert("직원을 선택하세요."),!1;var i=F.val().trim();return""===i?(window.alert("메세지를 입력하세요."),F.focus(),!1):!!window.confirm("메세지를 보내시겠습니까?")&&void window.axios({method:"post",url:"/api/v1/sms/send",data:{phones:t,msg:i}}).then(function(e){!0===e.data.success?window.alert("메세지를 전송하였습니다."):window.alert("알 수 없는 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.")})})});
//# sourceMappingURL=../maps/simple-assignment.js.map
