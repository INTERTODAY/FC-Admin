"use strict";requirejs(["common"],function(e){e.initDataTable($("#table_achievement_user_details"),{order:[[0,"asc"]]}),$("#modal-achievement-user-details").on("show.bs.modal",function(e){axios.get("/achievement/user/education",{params:{training_user_id:$(e.relatedTarget).data("training-user-id")}}).then(function(e){$("#table_education_details > tbody ").html("");for(var t=e.data.list,s="",a=0;a<t.length;a++)s="<tr>",s+="  <td>"+t[a].course_name+"</td>",s+="  <td>",s+='    <div class="progress progress-xs">',s+='      <div class="progress-bar progress-bar-green progress-bar-striped" style="width: '+t[a].completed_rate+'%"></div>',s+="    </div>",s+="  </td>",s+='  <td class="center">',100===t[a].completed_rate?s+='    <span class="badge bg-green">':s+='    <span class="badge bg-red">',s+="      "+t[a].completed_rate+"%",s+="    </span>",s+="  </td>",t[a].course_start_dt&&t[a].course_end_dt?s+='  <td class="center">'+t[a].course_start_dt+" ~ "+t[a].course_end_dt+"</td>":s+='  <td class="center"></td>',s+="</tr>",$("#table_education_details > tbody ").append(s)}).catch(function(e){console.error(e)})})});