"use strict";window.define(["common","text!../../../nplayer_wrapper.html","nplayer","nplayer_ui","cdnproxy","nplayer_conf"],function(e,n){function i(e){o=this,o.extendOptions(e),o.init()}var t,a,o=null,w=w||window.$;return i.prototype={options:{},extend:function(e,n){for(var i in n)n.hasOwnProperty(i)&&(e[i]=n[i]);return e},extendOptions:function(e){this.options=this.extend({},this.options),this.extend(this.options,e)},init:function(){o.getEncodedParam(),o.resize()},initPlayer:function(){"ActiveXObject"in window?o.initPlayerWindow():o.initPlayerHTML()},initPlayerHTML:function(){a=new window.NPlayer("video",{controlBox:"nplayer_control.html",visible:!1,mode:"html5"}),window.player=a,window.initNPlayerUI(a),a.bindEvent("Ready",function(){o.reportMessage("ready"),window.proxy_init(function(){window.setPlayerStart(!0),window.setNPlayer(a),window.mygentAuthCall(function(e){window.setMediaInfo(o.options.fileUrl,e);var n=window.getMediaURL(!1);a.open({URL:window.encodeURI(n)})},t)},window.indicateInstall,window.indicateUpdate)}),a.bindEvent("OpenStateChanged",function(e){switch(o.reportMessage("OpenStateChanged"),e){case window.NPlayer.OpenState.Opened:a.setVisible(!0),window.starthtml5State();break;case window.NPlayer.OpenState.Closed:window.Stophtml5State(window.NPlayer.OpenState.Closed)}}),a.bindEvent("PlayStateChanged",function(e){switch(o.reportMessage("PlayStateChanged"),e){case window.NPlayer.PlayState.Playing:a.setVisible(!0);break;case window.NPlayer.PlayState.Stopped:a.setVisible(!1);break;case window.NPlayer.PlayState.Paused:a.setVisible(!0)}}),a.bindEvent("GuardCallback",function(e,n){o.reportMessage("GuardCallback - "+e+" : "+n)}),a.bindEvent("Error",function(e){o.reportMessage("Error - "+e)})},initPlayerWindow:function(){a=new window.NPlayer("video",{controlBox:"nplayer_control.html",visible:!1,mode:"html5"});var e=!1;a.setWatermarkText("watermark"),window.player=a,window.initNPlayerUI(a),a.bindEvent("Ready",function(){o.reportMessage("Ready"),window.loadAquaAxPlugin()&&(a.setCDNAuthParam(t),a.addContextMenu("SystemInfo","sysinfo"),a.open({URL:encodeURI(o.options.fileURL),Subtitles:[{URL:encodeURI("")}]}),e=window.setAquaAxPlugin(o.options.fileURL,t))}),a.bindEvent("OpenStateChanged",function(e){switch(o.reportMessage("OpenStateChanged"),e){case window.NPlayer.OpenState.Opened:a.setVisible(!0);break;case window.NPlayer.OpenState.Closed:}}),a.bindEvent("PlayStateChanged",function(e){switch(o.reportMessage("PlayStateChanged"),e){case window.NPlayer.PlayState.Playing:if(a.setVisible(!0),!0===window.isDup){a.stop(),window.alert(window.NPLAYER_DUP_MSG);break}!0===window.setAxPlugin&&(window.AquaAxPlugin.PlayState=window.NPlayer.PlayState.Playing,window.AquaAxPlugin.OpenStateChange());break;case window.NPlayer.PlayState.Stopped:a.setVisible(!1);break;case window.NPlayer.PlayState.Paused:a.setVisible(!0),!0===window.setAxPlugin&&(window.AquaAxPlugin.PlayState=window.NPlayer.PlayState.Paused,window.AquaAxPlugin.OpenStateChange())}}),a.bindEvent("GuardCallback",function(e,n){!0===window.setAxPlugin&&window.AquaAxPlugin.SendPVLog(e,n)}),a.bindEvent("Error",function(e){w("#video").css("background-image","none")}),a.bindEvent("ContextMenu",function(e){"sysinfo"===e&&!0===window.setAxPlugin&&(window.AquaAxPlugin.LoadSystemInfomation(),window.alert("CPU 정보 : "+window.AquaAxPlugin.DeviceCPU+"\nMEM 정보 : "+window.AquaAxPlugin.DeviceMem+"\nGPU 정보 : "+window.AquaAxPlugin.DeviceGPU+"\n\nIP 정보 : "+window.AquaAxPlugin.DeviceIP+"\nMac 정보 : "+window.AquaAxPlugin.DeviceMac+"\nOS 정보 : "+window.AquaAxPlugin.DeviceOSDesc+"\n해상도 정보 : "+window.AquaAxPlugin.DeviceMonitor+"\nIE 버전 : "+window.AquaAxPlugin.DeviceIE+"\n"))}),window.onunload=function(){!0===window.setAxPlugin&&window.AquaAxPlugin.FinalizeAuth()}},getEncodedParam:function(){window.axios.get("/api/v1/player/encparam").then(function(e){t=e.data.encparam,o.reportMessage(t),o.initPlayer()}).catch(function(e){o.reportError(e)})},reportMessage:function(e){console.log("aquaservice : "+e)},reportError:function(e){console.log("aquaservice : "+e)},resize:function(){w(window).resize(function(){a&&a.getFullscreen()?w("#video").height(w(window).height()):w("#video").height(w(window).height()-w(".wrapper_foot").height())})}},i});
//# sourceMappingURL=../../maps/components/aquaplayer_service.js.map
