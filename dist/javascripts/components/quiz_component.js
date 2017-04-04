"use strict";define(["common"],function(t){function e(t,e){this.extendOptions(t),this.extendData(e),this.isNew=null===e.quiz_id,this.init()}return e.prototype={options:{},data:{},extend:function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);return t},extendOptions:function(t){this.options=this.extend({},this.options),this.extend(this.options,t)},extendData:function(t){this.data=this.extend({},this.data),this.extend(this.data,t)},setData:function(){var t=this.el.querySelector("#question").value,e=this.el.querySelector("#answer_desc"),i=this.el.querySelectorAll(".options"),o=this.el.querySelectorAll(".correct-checkbox");if(e=e?e.value:null,this.isNew?this.data={quiz_id:null,type:this.data.type,quiz_type:this.data.quiz_type,question:t,answer_desc:e,option_group_id:this.data.option_group_id,order:this.options.index,options:[]}:(this.data.question=t,this.data.answer_desc=e,this.data.order=this.options.index,this.data.options=[]),i.length)for(var s=0;s<i.length;s++)this.data.options.push({id:i[s].dataset.optionId,opt_id:this.data.option_group_id,option:i[s].value,iscorrect:o[s].checked?1:0,order:s})},init:function(){if(this.create_quiz(),this.data.quiz_id)switch(this.el.querySelector("#question").value=this.data.question,this.data.quiz_type){case"A":this.el.querySelector("#answer_desc").value=this.data.answer;break;case"B":case"C":for(var t=0;t<this.data.options.length;t++){var e=this.data.options[t];this.create_quiz_options(e)}}this.create_quiz_events(),this.create_option_events(),this.show()},create_quiz_events:function(){this.el.querySelector(".btn-remove-quiz").addEventListener("click",function(t){t.preventDefault(),this.remove()}.bind(this))},create_option_events:function(){if("A"!==this.data.quiz_type){var t=this.el.querySelector("#btn-add-option"),e=this.el.querySelector("#input-add-option");this.el.querySelector(".btn_remove_option"),this.el.querySelector("#option-box");e.addEventListener("keypress",function(t){13===(t.which||t.keyCode)&&e.value&&this.create_quiz_options()}.bind(this)),t.addEventListener("click",function(t){t.preventDefault(),e.value&&this.create_quiz_options()}.bind(this))}},show:function(){this.options.wrapper.appendChild(this.el),this.el.querySelector("#question").focus()},delete:function(){this.options.wrapper.removeChild(this.el)},remove:function(){this.options.parent.removeQuiz(this)},validate:function(){var t,e=this.el.querySelectorAll("input[type=text]:not(#input-add-option)"),i=0;if("A"!==this.data.quiz_type&&e.length<=2)return alert("보기를 2개 이상 입력해주세요."),!1;for(t=0;t<e.length;t++)if(""==e[t].value)return alert("빈칸은 모두 입력해주세요."),e[t].focus(),!1;if("A"!==this.data.quiz_type){for(e=this.el.querySelectorAll(".correct-checkbox"),t=0;t<e.length;t++)e[t].checked&&i++;if(!i)return alert("정답을 체크해주세요."),!1}return!0},create_quiz:function(){this.el=document.createElement("div"),this.el.className="box box-success";var t="";t+='   <div class="box-header" data-index="'+this.options.index+'">',t+='       <i class="fa fa-quora"></i>',t+='       <h3 class="box-title">'+(this.options.index+1)+"번 문제</h3>",t+='       <div class="box-tools pull-right" data-toggle="tooltip" title="" data-original-title="Status">',t+='           <div class="btn-group" data-toggle="btn-toggle">',t+='               <button type="button" class="btn btn-default btn-sm btn-remove-quiz" data-widget="remove">',t+='                   <i class="fa fa-times">  삭제</i>',t+="               </button>",t+="           </div>",t+="       </div>",t+="   </div>","A"===this.data.quiz_type?(t+='   <div class="box-body">',t+='       <div class="form-group">',t+='           <input type="text" class="form-control" name="question" id="question" placeholder="질문을 입력하세요" required autocomplete="off" />',t+="       </div>",t+='       <div class="form-group">',t+='           <input type="text" class="form-control" name="answer_desc" id="answer_desc" placeholder="답변을 입력하세요" required autocomplete="off" />',t+="       </div>",t+="   </div>"):(t+='   <div class="box-body">',t+='       <div class="form-group">',t+='           <input type="text" class="form-control" name="question" id="question" placeholder="질문을 입력하세요" required autocomplete="off" />',t+="       </div>",t+='       <div id="option-box">',t+="       </div>",t+="   </div>",t+='   <div class="box-footer clearfix">',t+='       <div class="input-group">',t+='           <input id="input-add-option" class="form-control" placeholder="추가할 보기 내용을 입력하세요">',t+='           <div class="input-group-btn">',t+='               <button id="btn-add-option" type="button" class="btn btn-default"><i class="fa fa-plus"></i></button>',t+="           </div>",t+="       </div>",t+="   </div>"),this.el.innerHTML=t},create_quiz_options:function(t){var e=this.el.querySelector("#option-box"),i=document.createElement("div"),o=this.el.querySelector("#input-add-option"),s=this;i.className="item",t&&i.setAttribute("data-option-id",t.id),i.onclick=function(e){if("btn-remove-option"==e.target.classList[2])if(t){var i=$(e.target).closest(".item").data("option-id");s.options.parent.deleteQuizOption(i,function(){this.parentNode.removeChild(this)}.bind(this))}else this.parentNode.removeChild(this)};var n="";n+='<div class="form-group">',n+='   <div class="input-group">',n+='       <span class="input-group-addon">',t?("B"===this.data.quiz_type?n+='           <input name="radio-group-'+this.options.index+'" class="correct-checkbox" type="radio" '+(1===t.iscorrect?"checked":"")+" />":n+='           <input type="checkbox" class="correct-checkbox" '+(1===t.iscorrect?"checked":"")+" />",n+="       </span>",n+='       <div class="input-group" style="width: 100%">',n+='           <input type="text" class="form-control options" required autocomplete="off" placeholder="보기를 입력하세요" data-option-id="'+t.id+'" value="'+t.option+'" />'):("B"===this.data.quiz_type?n+='           <input name="radio-group-'+this.options.index+'" class="correct-checkbox" type="radio" />':n+='           <input type="checkbox" class="correct-checkbox" />',n+="       </span>",n+='       <div class="input-group" style="width: 100%">',n+='           <input type="text" class="form-control options" required autocomplete="off" placeholder="보기를 입력하세요" value="'+o.value+'" />'),n+='           <div class="input-group-btn btn-remove-option">',n+='               <button id="btn-remove-option" type="button" class="btn btn-danger btn-remove-option"><i class="fa fa-minus btn-remove-option"></i></button>',n+="           </div>",n+="       </div>",n+="    </div>",n+="</div>",i.innerHTML=n,e.appendChild(i),o.value=""},setIndex:function(t){this.options.index=t;var e=this.el.querySelector(".box-header"),i=this.el.querySelector(".box-title");e.setAttribute("data-index",t+1),i.innerHTML=t+1+"번 문제"}},e});