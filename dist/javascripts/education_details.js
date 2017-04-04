"use strict";requirejs(["common"],function(t){function e(){var t=[],e=0,i=0;return $("#draggablePanelList").find("li.list-group-item").each(function(a){var n={id:$(this).data("course-group-id"),course_id:$(this).data("course-id"),course_group_id:$(this).data("course-group-key"),order:e};n.id?$(this).is(":visible")?n.mode="UPDATE":n.mode="DELETE":n.mode="INSERT",t.push(n),"DELETE"!==n.mode&&(i+=1,e+=1)}),{data:t,valid_course_count:i}}function i(){var t=s.find("option:selected").val(),e=s.find("option:selected").text(),i=$("#course_group_key").val(),a="",n=$('.list-group-item[data-course-id="'+t+'" ]');if(n.length)return n.show(),!1;a+='<li class="list-group-item" data-course-id="'+t+'" data-course-group-id="" data-course-group-key="'+i+'">',a+='    <div class="course">',a+='        <span class="handle ui-sortable-handle">',a+='            <i class="fa fa-ellipsis-v"></i>',a+='            <i class="fa fa-ellipsis-v"></i>',a+="        </span>",a+=e,a+='        <a href="#" class="btn-delete-course">',a+='            <i class="fa fa-remove text-red"></i>',a+="        </a>",a+="    </div>",a+="</li>",l.append(a)}function a(t){t.hide()}function n(){var t=0;return p.find("input").each(function(e,i){$(i).is(":visible")&&(t+=parseInt($(i).val()))}),t}function d(t){var e=t.val();if(0==e&&e.length>=1&&$(t).val(0),e.length>=3&&(alert("허용 범위를 넘었습니다."),t.val(0)),""===e&&t.val(0),"0"===e.split("")[0]){var i=e.split(""),a=i.length;a>=2&&(e=e.slice(1,a)),t.val(e)}}var o=$(".btn-modify-edu"),r=$("#btnDeleteEducation"),c=$("#btn-add-course-edu"),s=$("#select-course-list"),l=$("#draggablePanelList"),u=0,f=$("#frm_point_weight"),p=$("#pointWeight"),h=$(".total_point"),v=$(".btn-register-point-weight");$(function(){$("#draggablePanelList").sortable({placeholder:"sort-highlight",handle:".handle",forcePlaceholderSize:!0,zIndex:999999,start:function(t,e){$(this).attr("data-previndex",e.item.index())},update:function(t,e){var i=e.item.index(),a=$(this).attr("data-previndex");$(this).removeAttr("data-previndex"),console.log("newIndex : "+i+" oldIndex : "+a)}});var t=moment().format(),e=moment().add(6,"days");$("#start_dt").datetimepicker({defaultDate:t,format:"YYYY-MM-DD",showTodayButton:!0}),$("#end_dt").datetimepicker({defaultDate:e,format:"YYYY-MM-DD",useCurrent:!1,showTodayButton:!0}),$("#start_dt").on("dp.change",function(t){$("#end_dt").data("DateTimePicker").minDate(t.date)}),$("#end_dt").on("dp.change",function(t){$("#start_dt").data("DateTimePicker").maxDate(t.date)}),tinymce.init({selector:".course-desc"})}),r.bind("click",function(){if(!confirm("삭제 시 되돌릴 수 없습니다. 정말 삭제하시겠습니까?"))return!1;var t={edu_id:$(this).data("edu-id")};axios.delete("/education/deactivate",{params:t}).then(function(t){t.data.success?(alert("교육과정을 삭제하였습니다."),location.href="/education"):alert("교육과정을 삭제하였습니다.")}).catch(function(t){console.log(t)})}),o.bind("click",function(){var t=$(".course-name"),i=tinymce.activeEditor.getContent(),a=e();return""==t.val()?(alert("교육과정명을 입력하세요."),t.focus(),!1):""===i?(alert("교육과정 소개를 입력해주세요."),i.focus(),!1):a.valid_course_count?!!confirm("수정하시겠습니까?")&&void axios({method:"put",url:"/education/modify/edu",data:{id:$("#edu_id").val(),name:t.val().trim(),desc:i,course_group_list:a.data,start_dt:$("#start_dt").find("input").val()+" 00:00:00",end_dt:$("#end_dt").find("input").val()+" 23:59:59"}}).then(function(t){1==t.data.success?alert("교육과정을 수정하였습니다."):alert("알 수 없는 오류가 발생했습니다. 잠시 후에 다시 시도해주세요."),window.location.reload()}):(alert("강의를 추가해주세요."),!1)}),$(".btn-delete-course").bind("click",function(){a($(this).parent().parent())}),c.bind("click",function(){i()}),l.on("click","> li",function(t){a($(t.target).parent().parent().parent())}),v.bind("click",function(t){100!==n()?(alert("포인트의 합계가 100이 되어야 합니다. 설정 값을 다시 확인해 주세요"),t.preventDefault()):f.submit()}),p.find("input").bind("blur",function(){d($(this)),h.html(n())}),p.find("input").each(function(t,e){if("hidden"!==$(e).attr("type")){""===$(e).val()&&($(e).val(0),u=0),u+=parseInt($(e).val()),h.html(u)}}),p.find("input").bind("keydown",function(t){if(190===t.keyCode||13===t.keyCode)return!1;h.html(n())})});