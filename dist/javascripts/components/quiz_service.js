define(function(i){"use strict";function t(i,t,e){o=this,o.extendOptions(i),o.extendData(t),o.isNew=null===t.course_list_id,o.callback=e,o.setOptions(i),o.init()}i("es6-promise").polyfill();var e=i("quiz_component"),n=i("axios"),o=null;return t.prototype={options:{},data:{},quiz_list:[],extend:function(i,t){for(var e in t)t.hasOwnProperty(e)&&(i[e]=t[e]);return i},extendOptions:function(i){this.options=this.extend({},this.options),this.extend(this.options,i)},extendData:function(i){this.data=this.extend({},this.data),this.extend(this.data,i)},init:function(){if(o.data.quiz_list)for(var i=0;i<o.data.quiz_list.length;i++){var t=o.data.quiz_list[i];switch(t.quiz_type){case"A":o.addQuizSingleAnswer(t);break;case"B":o.addQuizMultiOptionWithOneAnswer(t);break;case"C":o.addQuizMultiOptionWithMultiAnswer(t)}}},setOptions:function(i){function t(i,t){for(var e in t)t.hasOwnProperty(e)&&(i[e]=t[e]);return i}o.options=t({},o.options),t(o.options,i)},getRandomString:function(){return n.get("/api/v1/randomkey")},addQuizSingleAnswer:function(i){var t={wrapper:o.options.wrapper,parent:o,index:i?i.order:o.quiz_list.length};i||(i={quiz_id:null,type:o.data.type,quiz_type:"A",quiz_type_name:"단답형"});var n=new e(t,i);o.quiz_list.push(n)},addQuizMultiOptionWithOneAnswer:function(i){var t={wrapper:o.options.wrapper,parent:o,index:i?i.order:o.quiz_list.length},n=null;i?(n=new e(t,i),o.quiz_list.push(n)):(i={quiz_id:null,type:o.data.type,quiz_type:"B",quiz_type_name:"선택형",option_group_id:o.createGUID()},console.log(i),n=new e(t,i),o.quiz_list.push(n))},addQuizMultiOptionWithMultiAnswer:function(i){var t={wrapper:o.options.wrapper,parent:o,index:i?i.order:o.quiz_list.length},n=null;i?(t.index=i.order,n=new e(t,i),o.quiz_list.push(n)):(i={quiz_id:null,type:o.data.type,quiz_type:"C",quiz_type_name:"다답형",option_group_id:o.createGUID()},console.log(i),n=new e(t,i),o.quiz_list.push(n))},removeQuiz:function(i){return!!confirm("삭제하시겠습니까?")&&void(i.isNew?(i.delete(),o.quiz_list.splice(i.options.index,1),o.updateQuizIndexes()):o.deleteQuiz(i))},deleteQuiz:function(i){n.delete("/course/quiz",{params:{quiz_id:i.data.quiz_id,option_group_id:i.data.option_group_id}}).then(function(t){alert("퀴즈를 삭제하였습니다."),i.delete(),o.quiz_list.splice(i.options.index,1),o.updateQuizIndexes()}).catch(function(i){console.log(i)})},deleteQuizOption:function(i,t){n.delete("/course/quiz/option",{params:{option_id:i}}).then(function(i){alert("보기를 삭제하였습니다."),t()}).catch(function(i){console.log(i)})},validateQuiz:function(){for(var i=!0,t=0;t<o.quiz_list.length;t++){var e=o.quiz_list[t];if(!e.validate()){i=!1;break}}return i},saveSession:function(){console.log("saveSession");var i=o.options.root_wrapper.find("#title").val();return n(o.isNew?{method:"post",url:"/course/quiz/courselist",data:{course_list_id:null,course_id:o.data.course_id,title:i,type:o.data.type,order:o.data.session_count+1,quiz_group_id:o.data.quiz_group_id}}:{method:"put",url:"/course/courselist",data:{course_list_id:o.data.course_list_id,course_list_order:o.data.course_list_order,title:i}})},saveQuiz:function(i){return i.setData(),n(i.isNew?{method:"post",url:"/course/quiz",data:{quiz_group_id:o.data.quiz_group_id,quiz:i.data}}:{method:"put",url:"/course/quiz",data:{quiz_group_id:o.data.quiz_group_id,quiz:i.data}})},saveSessionAndQuiz:function(){return o.quiz_list.length?!!o.validateQuiz()&&(!!confirm("자료를 저장하시겠습니까?")&&void n.all([o.saveSession()]).then(n.spread(function(i){var t=[];o.quiz_list.forEach(function(i){t.push(o.saveQuiz(i))}),n.all(t).then(function(i){i.forEach(function(i){console.log(i.data)}),o.callback("success")})}))):(alert("등록된 퀴즈가 없습니다. 퀴즈 유형을 먼저 선택하세요."),!1)},updateQuizIndexes:function(){for(var i=o.quiz_list,t=0;t<i.length;t++)i[t].setIndex(t)},moveQuizIndexes:function(i,t){var e=o.quiz_list;e.splice(t,0,e.splice(i,1)[0]),o.updateQuizIndexes()},createGUID:function(){function i(){return(65536*(1+Math.random())|0).toString(16).substring(1)}return i()+i()+"-"+i()+"-"+i()+"-"+i()+"-"+i()+i()+i()}},t});