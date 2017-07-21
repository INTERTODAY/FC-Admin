"use strict";window.requirejs(["common","text!../course.template.html","text!../session.template.html"],function(e,t,n){function i(){var e=y(":checkbox:checked",E.rows({filter:"applied"}).nodes()).map(function(){return y(this).data("id")}).get().join(", ");y("input[name='upload_employee_ids']").val(e)}function a(){var e=0;return y(".point-item").each(function(){y(this).parent().find(".input-group-addon").children("input:checkbox").prop("checked")&&""!==y(this).val()&&(e+=parseInt(y(this).val()))}),y(".badge").text(e),e}function o(e){var t=y(".panel-group").data("selected-course-id"),n=y(".panel[data-id="+t+"]");(void 0===n.data("metadata").sessionLoaded||e)&&window.axios.get("/course/"+t).then(function(e){e.data&&(n.find(".session-content").html(m({session_list:e.data.session_list})),n.data("metadata").sessionLoaded=!0,y(".list-group").sortable({connectWith:".list-group-item",start:function(e,t){y(this).attr("data-previndex",t.item.index())},update:function(e,t){y(this).removeAttr("data-previndex"),v()}}).disableSelection())}).catch(function(e){console.log(e)})}function c(){var e=y("#edu_id").val();window.axios.get("/education/"+e+"/courses").then(function(e){e.data&&y.each(e.data.edu_course_list,function(e,t){y("#course-list").append(f(t)),y(".panel").last().data("metadata",t)})}).catch(function(e){console.log(e)})}function s(e){var t="ul.setup-panel li:eq("+(parseInt(e)-1)+")",n='ul.setup-panel li a[href="#step-'+e+'"]';y(t).removeClass("disabled"),y(n).trigger("click")}function d(e){window.axios.post("/simple_assignment/progress",{step:e,id:C}).then(function(t){return D(e),!0}).catch(function(e){return console.log(e),!1})}function r(){var e=new window.FormData;e.append("upload_type",y("input[name='upload_type']").val()),e.append("upload_employee_ids",y("input[name='upload_employee_ids']").val()),e.append("file-excel",document.getElementById("UploadExcelFile").files[0]),e.append("group_name","간편배정"),e.append("redirect",!1),e.append("id",C),window.axios.post("/assignment/upload",e).then(function(e){e.data&&y("#log_bind_user_id").val(e.data.logBindUserId)}).catch(function(e){console.log(e)})}function l(){var e={name:y("input[name='course_name']").val(),desc:window.tinymce.activeEditor.getContent(),complete_point:y("input[name='complete_point']").val(),quiz_point:y("input[name='quiz_point']").val(),test_point:y("input[name='test_point']").val(),reeltime_point:y("input[name='reeltime_point']").val(),speed_point:y("input[name='speed_point']").val(),reps_point:y("input[name='reps_point']").val(),start_dt:y("input[name='start_dt']").val(),finish_dt:y("input[name='finish_dt']").val(),assigment_id:C,upload_employee_ids:y("input[name='upload_employee_ids']").val(),edu_id:y("#edu_id").val(),log_bind_user_id:y("#log_bind_user_id").val(),training_edu_id:y("#training_edu_id").val(),can_replay:y("#can-replay").prop("checked")?1:0};window.axios.post("/education",e).then(function(e){e.data&&(y("#training_edu_id").val(e.data.trainingEduId),y("#edu_id").val(e.data.eduId))}).catch(function(e){console.log(e)})}function u(){if(!window.confirm("정말 삭제하시겠습니까?"))return!1;var e={id:C};window.axios.delete("/simple_assignment",{params:e}).then(function(e){e.data.success?(window.alert("교육과정을 삭제하였습니다."),window.location.href="/simple_assignment"):window.alert("배정내역을 삭제하지 못하였습니다.")}).catch(function(e){console.log(e)})}function p(){var e=y("ul.select-employee li.active").children().attr("id"),t=null;switch(y("input[name='upload_type']").val(e),e){case"employee":if(!(t=y(":checkbox:checked",E.rows({filter:"applied"}).nodes()).map(function(){return y(this).data("id")}).get().join(", ")))return window.alert("직원을 선택하세요."),!1;y("input[name='upload_employee_ids']").val(t);break;case"excel":if(0===document.getElementById("UploadExcelFile").files.length)return y("#UploadExcelFile").focus(),window.alert("파일을 선택하세요."),!1}return!0}function h(){var e=y("input[name='course_name']"),t=y("#input-course-desc").val();if(""===e.val())return window.alert("교육과정명을 입력하세요."),e.focus(),!1;if(""===t)return window.alert("교육과정에 대한 설명을 입력하세요."),window.tinymce.execCommand("mceFocus",!1,"input-course-desc"),!1;var n=!0,i=0;return y(".point-item").each(function(){if(y(this).parent().find(".input-group-addon").children("input:checkbox").prop("checked")&&""===y(this).val())return window.alert(y(this).prop("placeholder")+" 포인트 점수를 입력하세요."),y(this).focus(),n=!1,!1;i+=parseInt(y(this).val())}),!!n&&(100===i||(window.alert("포인트의 합계는 100점이 되어야 합니다."),!1))}function f(e){return L(e)}function m(e){return Q(e)}function w(e){return window.axios({method:"put",url:"/course/courselist",data:{title:e.children("a").data("title"),course_list_id:e.children("a").data("id"),course_list_order:e.index()}})}function v(){for(var e=[],t=window.$(".session-content > .list-group-item"),n=0;n<t.length;n++)e.push(w(window.$(t[n])));window.axios.all(e).then(function(e){e.forEach(function(e){console.log(e)})})}function _(e){y(e.target).prev(".panel-heading").find(".more-less").toggleClass("glyphicon-plus glyphicon-minus");var t=y(e.target).parents().find(".panel-group"),n=y(e.target).parents().closest(".panel").data("id");t.data("selected-course-id")!==n&&(t.data("selected-course-id",n),o())}function g(){var e=y("#registerCourse"),t={course_name:e.find("input[name='course_name']").val(),course_desc:window.tinymce.activeEditor.getContent(),teacher_name:e.find("input[name='teacher_name']").val(),edu_id:y("#edu_id").val()};window.axios.post("/course",t).then(function(e){if(e.data){if(0===y("#course-list").children().length){y("ul.setup-panel li:eq(3)").removeClass("disabled"),d(4)}y("#course-list").append(f(e.data)),y(".panel").last().data("metadata",e.data)}}).catch(function(e){console.log(e)})}function k(){var e=y("#modifyCourse"),t=y(".panel-group").data("selected-course-id"),n={course_id:t,course_name:e.find("input[name='course_name']").val(),course_desc:window.tinymce.activeEditor.getContent(),teacher_name:e.find("input[name='teacher_name']").val(),course_rate:0,teacher_rate:0};window.axios.put("/course",n).then(function(e){e.data&&(y(".panel[data-id="+e.data.course_id+"]").replaceWith(f(e.data)),y(".panel[data-id="+e.data.course_id+"]").data("metadata",e.data))}).catch(function(e){console.log(e)})}function b(e){var t=y(e.relatedTarget).parents().find(".panel").data("metadata"),n=y(this);n.find("input").val("").end(),window.tinymce.activeEditor.setContent(""),n.find("input[name='course_name']").val(t.course_name),n.find("input[name='teacher_name']").val(t.teacher_name),window.tinymce.get("course_desc").setContent(t.course_desc),n.find("[autofocus]").focus()}var y=window.$,x=window._,C=y("#assignment_id").val(),D=y("#activated_step").val(),z=y("ul.setup-panel li a"),q=y(".setup-content"),I=y("#check-all"),E=e.initDataTable(y("#table_employee"),{lengthMenu:[[5,10,25,50,-1],[5,10,25,50,"전체"]],columnDefs:[{orderable:!1,targets:[0]}]}),W=y("#js-delete-simple-assign"),P=y("#js-save-simple-assign"),F=y(".btn-send-message"),$=y(".message"),L=window.Handlebars.compile(t),Q=window.Handlebars.compile(n),U="scrollbars=yes, toolbar=no, location=no, status=no, menubar=no, resizable=yes, width=1040, height=760, left=0, top=0";if(y(function(){q.hide(),e.initDateTimePicker(y(".date#start_dt"),y(".date#end_dt")),y("ul.setup-panel li").map(function(){for(var e=y(this),t=2;t<=D;t++)t===e.index()+1&&s(t)}),y("#edu_id").val()&&c(),i();var t=y("#input-course-desc_ifr");t&&t.prop("title",""),a()}),window.winpop_listener=function(e){o(e)},I.bind("click",function(){y(":checkbox",E.rows().nodes()).prop("checked",this.checked)}),z.click(function(e){e.preventDefault();var t=y(y(this).attr("href")),n=y(this).closest("li");n.hasClass("disabled")||(z.closest("li").removeClass("active"),n.addClass("active"),q.hide(),t.show())}),D>1){var j="ul.setup-panel li a:eq("+(D-1).toString()+")";y(j).click()}else y("ul.setup-panel li.active a").trigger("click");y(".step1 > .next > a").on("click",function(e){e.preventDefault(),p()&&(s(2),r())}),y(".step2 > .previous > a").on("click",function(e){e.preventDefault(),s(1)}),y(".step2 > .next > a").on("click",function(e){e.preventDefault(),h()&&(s(3),l())}),y(".step3 > .previous > a").on("click",function(e){e.preventDefault(),s(2)}),y(".step3 > .next > a").on("click",function(e){e.preventDefault(),s(4)}),y(".step4 > .previous > a").on("click",function(e){e.preventDefault(),s(3)}),y(".panel-collapse").on("hide.bs.collapse",function(){y(".panel-collapse-clickable").find("i").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down")}),y(".panel-collapse").on("show.bs.collapse",function(){y(".panel-collapse-clickable").find("i").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up")}),W.on("click",u),P.on("click",function(){switch(y("ul.setup-panel li.active").index()+1){case 1:r();break;case 2:l()}}),y(".input-group-addon").children("input:checkbox").on("change",function(){var e=y(this).parent().parent().find(".point-item");e.prop("disabled",!y(this).prop("checked")),y(this).prop("checked")&&e.focus()}),y(".point-item").on("keyup",x.debounce(function(){var e=0;if(y(".point-item").each(function(){if(y(this).parent().find(".input-group-addon").children("input:checkbox").prop("checked")&&""!==y(this).val()&&"0"!==y(this).val()){var t=parseInt(y(this).val());e+=t}else y(this).prop("disabled",!0),y(this).parent().find(".input-group-addon").children("input:checkbox").prop("checked",!1)}),e>0&&y(".badge").text(e),e>100)return window.alert("100점을 초과하였습니다."),!1},300)),y("#registerCourse").submit(function(e){e.preventDefault(),g(),window.tinymce.execCommand("mceFocus",!1,"course_desc"),y(this).modal("toggle")}),y("#modifyCourse").submit(function(e){e.preventDefault(),k(),window.tinymce.execCommand("mceFocus",!1,"course_desc"),y(this).modal("toggle")}),y(".panel-group").on("hidden.bs.collapse",_),y(".panel-group").on("shown.bs.collapse",_),y("#registerCourse").on("hidden.bs.modal",function(){y(this).find("input").val("").end(),window.tinymce.activeEditor.setContent("")}),y("#registerCourse").on("shown.bs.modal",function(){y(this).find("[autofocus]").focus()}),y("#modifyCourse").on("shown.bs.modal",b),y(".panel-group").on("click",".btn-create-video",function(t){t.preventDefault();var n=y(this).attr("data-course-id");e.createWindowPopup("/course/create/video?course_id="+n,"Video",U)}),y(".panel-group").on("click",".btn-create-video",function(t){t.preventDefault();var n=y(this).attr("data-quiz-group"),i=y(this).attr("data-title"),a=y(this).attr("data-type");e.createWindowPopup("/course/quiz?id="+n+"&title="+i+"&type="+a,"Quiz",U)}),y(".panel-group").on("click",".btn-create-quiz",function(t){t.preventDefault();var n=y(this).attr("data-course-id");e.createWindowPopup("/course/create/quiz?course_id="+n+"&type=QUIZ","Quiz",U)}),y(".panel-group").on("click",".btn-create-final",function(t){t.preventDefault();var n=y(this).attr("data-course-id");e.createWindowPopup("/course/create/quiz?course_id="+n+"&type=FINAL","Final",U)}),y(".panel-group").on("click",".btn-create-checklist",function(t){t.preventDefault();var n=y(this).attr("data-course-id");e.createWindowPopup("/course/create/checklist?course_id="+n+"&type=CHECK","Checklist",U)}),y(".panel-group").on("click",".btn-delete-session",function(e){if(e.preventDefault(),!window.confirm("삭제 시 되돌릴 수 없습니다. 정말 삭제하시겠습니까?"))return!1;var t=y(this),n={};switch(n.course_list_id=y(this).parent("span").data("course-list-id"),n.course_list_type=y(this).parent("span").data("type"),y(this).parent("span").data("type")){case"QUIZ":case"FINAL":n.quiz_group_id=y(this).data("quiz-group");break;case"VIDEO":n.video_id=y(this).data("video-id");break;case"CHECKLIST":n.checklist_group_id=y(this).data("checklist-group")}window.axios.delete("/course/courselist",{params:n}).then(function(e){e.data.success?(window.alert("세션을 삭제하였습니다."),t.parents("li").remove()):window.alert("진행한 이력이 있어 세션을 삭제하지 못했습니다. 관리자에게 문의해주시기 바랍니다.")}).catch(function(e){console.log(e)})}),y(".panel-group").on("click",".btn-modify-session",function(t){t.preventDefault();var n=y(this).parent("span").data("course-id"),i=y(this).parent("span").data("course-list-id"),a=y(this).data("video-id"),o=y(this).data("quiz-group"),c=y(this).data("checklist-group"),s=y(this).parent("span").data("type");"VIDEO"===s?e.createWindowPopup("/course/modify/video?course_id="+n+"&course_list_id="+i+"&video_id="+a,"Video",U):"QUIZ"===s||"FINAL"===s?e.createWindowPopup("/course/modify/quiz?course_id="+n+"&course_list_id="+i+"&type="+s+"&quiz_group_id="+o,"Quiz",U):"CHECKLIST"===s&&e.createWindowPopup("/course/modify/checklist?course_id="+n+"&course_list_id="+i+"&type="+s+"&checklist_group_id="+c,"Checklist",U)}),y(".panel-group").on("click",".btn-preview-checklist",function(t){t.preventDefault();var n=window.$(this).parent("span").data("course-list-id");n||(n=window.$(this).data("id")),e.createWindowPopup("/course/checklist?course_list_id="+n,"Checklist",U)}),y(".panel-group").on("click",".btn-solve-quiz",function(t){t.preventDefault();var n=window.$(this).attr("data-quiz-group"),i=window.$(this).attr("data-title"),a=window.$(this).attr("data-type");e.createWindowPopup("/course/quiz?id="+n+"&title="+i+"&type="+a,"Quiz",U)}),y(".panel-group").on("click",".btn-watch-video",function(t){t.preventDefault();var n=window.$(this).attr("data-video-id");e.createWindowPopup("/course/video?id="+n,"Video",U)}),y(".panel-group").on("click",".btn-delete-course",function(){if(window.confirm("선택하신 강의를 삭제하시겠습니까?")){var e=y(".panel-group").data("selected-course-id");window.axios.delete("/course/deactivate",{params:{id:e}}).then(function(t){t.data.success&&y(".panel[data-id="+e+"]").remove()}).catch(function(e){console.log(e)})}}),F.on("click",function(e){e.preventDefault();var t,n=y("ul.select-employee li.active").children().attr("id");switch(n){case"employee":t=window.$(":checkbox:checked",E.rows({filter:"applied"}).nodes()).map(function(){return E.row(window.$(this).parents("tr")).data()[4]}).get().join(",")}if(!t)return window.alert("직원을 선택하세요."),!1;var i=$.val().trim();return""===i?(window.alert("메세지를 입력하세요."),$.focus(),!1):!!window.confirm("메세지를 보내시겠습니까?")&&void window.axios({method:"post",url:"/api/v1/sms/send",data:{phones:t,msg:i}}).then(function(e){!0===e.data.success?window.alert("메세지를 전송하였습니다."):window.alert("알 수 없는 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.")})})});
//# sourceMappingURL=../maps/simple-assignment.js.map
