(function(t){function e(e){for(var n,i,o=e[0],s=e[1],c=e[2],p=0,f=[];p<o.length;p++)i=o[p],l[i]&&f.push(l[i][0]),l[i]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n]);u&&u(e);while(f.length)f.shift()();return a.push.apply(a,c||[]),r()}function r(){for(var t,e=0;e<a.length;e++){for(var r=a[e],n=!0,o=1;o<r.length;o++){var s=r[o];0!==l[s]&&(n=!1)}n&&(a.splice(e--,1),t=i(i.s=r[0]))}return t}var n={},l={main:0},a=[];function i(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=n,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(r,n,function(e){return t[e]}.bind(null,n));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],s=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=s;a.push(["a1ec","chunk-vendors"]),r()})({"0ec3":function(t,e,r){"use strict";var n=r("6ea7"),l=r.n(n);l.a},"6ea7":function(t,e,r){},"74bf":function(t,e,r){"use strict";var n=r("77e0"),l=r.n(n);l.a},"77e0":function(t,e,r){},a1ec:function(t,e,r){"use strict";r.r(e);r("cadf"),r("551c"),r("f751"),r("097d");var n=r("2b0e"),l=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"wrapper"},[r("div",{staticClass:"tab-wrapper"},t._l(t.tabs,function(e,n,l){return r("div",{staticClass:"tab-item",class:{"tab-item-active":t.currentTab===n},on:{click:function(e){return t.clickTabItem(n,l)}}},[t._v(t._s(n))])}),0),r("vue-horizontal-scroll",{ref:"vue-horizontal-scroll",on:{scrollEnd:t.horizontalScroll}},t._l(t.tabs,function(e,n,l){return r("vue-vertical-scroll",{key:n,ref:"vertical-scroll-"+n,refInFor:!0,attrs:{verticalScrollOpt:{pullDownRefresh:!0}},on:{pullingUp:function(e){return t.pullingUp(n)},pullingDown:function(e){return t.pullingDown(n)}}},[r("div",{staticClass:"content-wrapper"},[e.data?r("div",{staticClass:"content-wrapper-list"},t._l(e.data,function(e,l){return l%2===1?r("img",{key:l,attrs:{src:e.urls.thumb},on:{load:function(e){return t.refreshWrapper(n)}}}):t._e()}),0):r("div",{staticClass:"load-mask"},[t._v("加载中 请稍后...")]),e.data?r("div",{staticClass:"content-wrapper-list"},t._l(e.data,function(e,l){return l%2===0?r("img",{key:l,attrs:{src:e.urls.thumb},on:{load:function(e){return t.refreshWrapper(n)}}}):t._e()}),0):t._e()]),e.data?r("div",{staticClass:"load-more"},[t._v(t._s(t.tabs[n].isEnd?"没有了...":"加载中..."))]):t._e()])}),1)],1)},a=[],i=(r("96cf"),r("3b8d")),o=r("a4bb"),s=r.n(o),c=r("7f43"),u=r.n(c),p={name:"App",data:function(){return{tabs:{Nature:{data:null,page:1,isEnd:!1},Beauty:{data:null,page:1,isEnd:!1},Sports:{data:null,page:1,isEnd:!1},Sea:{data:null,page:1,isEnd:!1},Flower:{data:null,page:1,isEnd:!1},Animals:{data:null,page:1,isEnd:!1},Food:{data:null,page:1,isEnd:!1},Drink:{data:null,page:1,isEnd:!1},Arts:{data:null,page:1,isEnd:!1}},currentTab:"Nature"}},methods:{horizontalScroll:function(t){this.currentTab=s()(this.tabs)[t],this.findDataBy(s()(this.tabs)[t])},clickTabItem:function(t,e){this.currentTab=t,console.log(this.$refs["vue-horizontal-scroll"]),this.$refs["vue-horizontal-scroll"].goToPage(e)},findDataBy:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e){var r,n,l=this,a=arguments;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r=a.length>1&&void 0!==a[1]&&a[1],t.prev=1,r&&(this.tabs[e].page=1),t.next=5,u.a.get("https://dscsdoj.top/api/source/unsplash?size=12&type=".concat(e,"&page=").concat(this.tabs[e].page));case 5:n=t.sent,this.tabs[e].page++,this.tabs[e].data&&!r||(this.tabs[e].data=[]),this.tabs[e].data=this.tabs[e].data.concat(n.data.data.results),this.$nextTick(function(){r?(l.$refs["vertical-scroll-"+e][0].BScroll.finishPullDown(),l.$refs["vertical-scroll-"+e][0].BScroll.refresh()):(l.$refs["vertical-scroll-"+e][0].BScroll.refresh(),l.$refs["vertical-scroll-"+e][0].BScroll.finishPullUp())}),t.next=16;break;case 12:t.prev=12,t.t0=t["catch"](1),window.alert("加载失败，请重试"),r?(this.$refs["vertical-scroll-"+e][0].BScroll.finishPullDown(),this.$refs["vertical-scroll-"+e][0].BScroll.refresh()):(this.$refs["vertical-scroll-"+e][0].BScroll.refresh(),this.$refs["vertical-scroll-"+e][0].BScroll.finishPullUp());case 16:case"end":return t.stop()}},t,this,[[1,12]])}));function e(e){return t.apply(this,arguments)}return e}(),pullingDown:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.findDataBy(e,!0);case 1:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),pullingUp:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.findDataBy(e);case 1:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),refreshWrapper:function(t){this.$refs["vertical-scroll-"+t][0].BScroll.refresh()}},mounted:function(){this.findDataBy("Nature")}},f=p,h=(r("d66a"),r("2877")),d=Object(h["a"])(f,l,a,!1,null,null,null),v=d.exports,g=(r("7f7f"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"vue-horizontal-wrapper",staticClass:"vue-horizontal-wrapper"},[r("div",{ref:"vue-horizontal",staticClass:"vue-horizontal",style:{height:t.defaultHeight,width:t.horizontalWidth}},[t._t("default")],2)])}),b=[],w=r("5176"),S=r.n(w),m=r("1fba"),y={name:"vue-horizontal-scroll",props:{options:{type:Object,default:function(){return{}}},height:{type:String,default:""}},data:function(){return{BScroll:null,currentIdx:0,defaultHeight:"100vh",horizontalWidth:"100vw",horizontalScrollDefaultOpt:{scrollX:!0,scrollY:!1,momentum:!1,bounce:!0,eventPassthrough:"vertical",click:!1,snap:{loop:!1,stepX:0,threshold:.2}}}},methods:{computedHeight:function(){if(this.height)return this.defaultHeight=this.height;var t=window.screen.height,e=this.BScroll.wrapperOffset.top;this.defaultHeight=t+e+"px"},computedWidth:function(){var t=this;this.horizontalWidth=this.$refs["vue-horizontal"].children.length+"00vw",this.$nextTick(function(){t.initBScroll()})},goToPage:function(t){this.BScroll.goToPage(t,0)},initBScroll:function(){var t=this,e=S()(this.horizontalScrollDefaultOpt,this.options);this.BScroll=new m["a"](this.$refs["vue-horizontal-wrapper"],e),this.BScroll.on("scrollEnd",function(){t.currentIdx=t.BScroll.getCurrentPage().pageX,t.$emit("scrollEnd",t.currentIdx)}),this.computedHeight()}},mounted:function(){this.computedWidth()}},B=y,O=(r("0ec3"),Object(h["a"])(B,g,b,!1,null,null,null)),_=O.exports,D=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"vue-vertical-wrapper",staticClass:"vue-vertical-wrapper"},[r("div",{staticClass:"vue-vertical"},[t.verticalScrollOpt.pullDownRefresh?r("div",{staticClass:"refresh-status-bar"},[t._v(t._s(t.pullDownStatus))]):t._e(),t._t("default")],2)])},$=[],z={name:"vue-vertical-scroll",props:{verticalScrollOpt:{type:Object,default:function(){return{}}},pullDownStatusKeyOpt:{type:Object,default:function(){return{"下拉刷新":"下拉刷新...","释放刷新":"释放刷新...","正在载入":"正在载入..."}}}},data:function(){return{BScroll:null,verticalScrollDefaultOpt:{click:!0,scrollY:!0,bounce:!0,eventPassthrough:"horizontal",probeType:3,pullUpLoad:50},pullDownStatus:this.pullDownStatusKeyOpt["下拉刷新"]}},methods:{initBScroll:function(){var t=this,e=S()(this.verticalScrollDefaultOpt,this.verticalScrollOpt);this.BScroll=new m["a"](this.$refs["vue-vertical-wrapper"],e),this.BScroll.on("scroll",function(){40===t.BScroll.y&&(t.pullDownStatus=t.pullDownStatusKeyOpt["正在载入"]),t.BScroll.y<40&&(t.pullDownStatus=t.pullDownStatusKeyOpt["下拉刷新"]),t.BScroll.y>40&&(t.pullDownStatus=t.pullDownStatusKeyOpt["释放刷新"])}),this.BScroll.on("pullingUp",function(){t.$emit("pullingUp")}),this.BScroll.on("pullingDown",function(){t.$emit("pullingDown")})}},mounted:function(){this.initBScroll()}},k=z,x=(r("74bf"),Object(h["a"])(k,D,$,!1,null,null,null)),j=x.exports,E=function(t){t.component(_.name,_),t.component(j.name,j)},P={install:E};n["a"].use(P),new n["a"]({render:function(t){return t(v)}}).$mount("#app")},bba2:function(t,e,r){},d66a:function(t,e,r){"use strict";var n=r("bba2"),l=r.n(n);l.a}});
//# sourceMappingURL=main.7d8d589a.js.map