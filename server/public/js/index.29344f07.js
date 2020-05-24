(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["index"],{"1e4b":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("Posts")},a=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("h1",[e._v("Latest Posts")]),n("div",{staticClass:"create-post"},[n("label",{attrs:{for:"create-post"}},[e._v("Say Something...")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.text,expression:"text"}],attrs:{type:"text",id:"create-post",placeholder:"Create a post"},domProps:{value:e.text},on:{input:function(t){t.target.composing||(e.text=t.target.value)}}}),n("button",{on:{click:function(t){return e.createHandler()}}},[e._v("Post!")])]),n("hr"),e.error?n("p",{staticClass:"error"},[e._v(e._s(e.error))]):e._e(),n("div",{staticClass:"posts-container"},e._l(e.getPosts.data,(function(t,r){return n("div",{key:t._id,staticClass:"post",attrs:{index:r}},[e._v(" "+e._s(t.created_at)+" "),n("i",{staticClass:"fa fa-trash",on:{click:function(n){return e.deleteHandler(t._id)}}}),n("p",{staticClass:"text"},[e._v(e._s(t.text))])])})),0),e.getPosts.total>5?n("Pagination",{staticClass:"pagination",attrs:{fetch:e.fetchPosts,get:e.getPosts}}):e._e()],1)},o=[],s=(n("96cf"),n("1da1")),c=n("5530"),l=n("2f62"),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"pages"},[n("div",{staticClass:"paginate-left-container"},[n("div",{staticClass:"pagination left",class:{"disabled-pagination":e.disabledLeft},on:{click:e.paginate}},[e._v(" < ")])]),n("div",{staticClass:"page-container"},[e.overflow&&(e.get.current_page>3||2===e.get.current_page)?n("div",{staticClass:"page selectable",on:{click:function(t){return e.fetch(1)}}},[e._v(" "+e._s(1)+" ")]):e._e(),e.enterPageOne?n("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.enterPageClickOutside,expression:"enterPageClickOutside"}],staticClass:"page"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.enterPageOneValue,expression:"enterPageOneValue"}],attrs:{"data-enter":"1",type:"number",placeholder:"pg."},domProps:{value:e.enterPageOneValue},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.enterPageHandler(t)},input:function(t){t.target.composing||(e.enterPageOneValue=t.target.value)}}})]):e._e(),e.overflow&&e.get.current_page>2&&!e.enterPageOne?n("div",{staticClass:"page",on:{click:function(t){e.enterPageOne=!0}}},[e._v(" ... ")]):e._e(),n("div",{staticClass:"page selectable"},[e._v(" "+e._s(e.get.current_page)+" ")]),e.overflow&&e.get.current_page<e.get.last_page-1&&!e.enterPageTwo?n("div",{staticClass:"page",on:{click:function(t){e.enterPageTwo=!0}}},[e._v(" ... ")]):e._e(),e.enterPageTwo?n("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.enterPageClickOutside,expression:"enterPageClickOutside"}],staticClass:"page"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.enterPageTwoValue,expression:"enterPageTwoValue"}],attrs:{"data-enter":"2",type:"number",placeholder:"pg."},domProps:{value:e.enterPageTwoValue},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.enterPageHandler(t)},input:function(t){t.target.composing||(e.enterPageTwoValue=t.target.value)}}})]):e._e(),e.overflow&&e.get.current_page!==e.get.last_page?n("div",{staticClass:"page selectable",on:{click:function(t){e.fetch(e.get.last_page),e.selectedPage()}}},[e._v(" "+e._s(e.get.last_page)+" ")]):e._e()]),n("div",{staticClass:"paginate-right-container mobile"},[n("div",{staticClass:"pagination right",class:{"disabled-pagination":e.disabledRight},on:{click:e.paginate}},[e._v(" > ")])])])},d=[];n("caad"),n("a9e3"),n("2532"),n("a4d3"),n("e01a"),n("d28b"),n("e260"),n("d3b7"),n("3ca3"),n("ddb0"),n("a630"),n("fb6a"),n("b0c0"),n("25f0");function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function f(e,t){if(e){if("string"===typeof e)return g(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(e,t):void 0}}function p(e){if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=f(e))){var t=0,n=function(){};return{s:n,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a,i=!0,o=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return i=e.done,e},e:function(e){o=!0,a=e},f:function(){try{i||null==r["return"]||r["return"]()}finally{if(o)throw a}}}}var v={name:"Page",props:["get","fetch"],data:function(){return{overflow:!1,enterPageOne:!1,enterPageTwo:!1,enterPageOneValue:"",enterPageTwoValue:""}},computed:{disabledLeft:function(){return 1===this.get.current_page},disabledRight:function(){return this.get.current_page===this.get.last_page}},methods:{selectedPage:function(){var e,t=document.querySelectorAll(".page"),n=p(t);try{for(n.s();!(e=n.n()).done;){var r=e.value;this.get.current_page===Number(r.innerText)?r.className="page selected":r.className="page selectable"}}catch(a){n.e(a)}finally{n.f()}},pageOverflow:function(){this.get.last_page>3?this.overflow=!0:this.overflow=!1},enterPageHandler:function(e){var t=Number(this.enterPageOneValue),n=Number(this.enterPageTwoValue);"1"===e.target.dataset.enter?t<this.get.last_page+1&&t>0?(this.fetch(t),this.enterPageOne=!1,this.enterPageOneValue=""):(t>this.get.last_page||0===t||""===this.enterPageOneValue)&&(e.target.style.border="1px solid red",this.enterPageOneValue=""):n<this.get.last_page+1&&n>0?(this.fetch(n),this.enterPageTwo=!1,this.enterPageTwoValue=""):(n>this.get.last_page||0===n||""===this.enterPageTwoValue)&&(e.target.style.border="1px solid red",this.enterPageTwoValue="")},enterPageClickOutside:function(){this.enterPageOne=!1,this.enterPageTwo=!1},paginate:function(e){e.target.className.includes("left")&&this.get.current_page>1?this.fetch(this.get.current_page-1):e.target.className.includes("right")&&this.get.current_page<this.get.last_page&&this.fetch(this.get.current_page+1)}},mounted:function(){this.selectedPage(),this.pageOverflow()},updated:function(){this.selectedPage()}},h=v,b=n("2877"),m=Object(b["a"])(h,u,d,!1,null,null,null),y=m.exports,_={name:"PostComponent",components:{Pagination:y},data:function(){return{error:"",text:""}},computed:Object(c["a"])({},Object(l["c"])(["getPosts","getAuthenticated"])),methods:Object(c["a"])(Object(c["a"])({},Object(l["b"])(["createPost","deletePost","fetchPosts"])),{},{createHandler:function(){this.getAuthenticated?""!==this.text?(this.createPost(this.text),this.error=""):this.error="Post cannot be blank":this.error="Must be logged in to create post"},deleteHandler:function(e){var t={id:e,page:this.getPosts.current_page};this.getAuthenticated?this.deletePost(t):this.error="Must be logged in to delete post"}}),created:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.fetchPosts();case 2:case"end":return t.stop()}}),t)})))()}},P=_,x=Object(b["a"])(P,i,o,!1,null,"242bf928",null),w=x.exports,O={name:"index",metaInfo:function(){return{title:"Home",meta:[{name:"description",content:"The home page of ".concat(this.$appName)},{property:"og:description",content:"The home page of ".concat(this.$appName)}]}},components:{Posts:w}},C=O,A=Object(b["a"])(C,r,a,!1,null,null,null);t["default"]=A.exports},2532:function(e,t,n){"use strict";var r=n("23e7"),a=n("5a34"),i=n("1d80"),o=n("ab13");r({target:"String",proto:!0,forced:!o("includes")},{includes:function(e){return!!~String(i(this)).indexOf(a(e),arguments.length>1?arguments[1]:void 0)}})},"25f0":function(e,t,n){"use strict";var r=n("6eeb"),a=n("825a"),i=n("d039"),o=n("ad6d"),s="toString",c=RegExp.prototype,l=c[s],u=i((function(){return"/a/b"!=l.call({source:"a",flags:"b"})})),d=l.name!=s;(u||d)&&r(RegExp.prototype,s,(function(){var e=a(this),t=String(e.source),n=e.flags,r=String(void 0===n&&e instanceof RegExp&&!("flags"in c)?o.call(e):n);return"/"+t+"/"+r}),{unsafe:!0})},"3ca3":function(e,t,n){"use strict";var r=n("6547").charAt,a=n("69f3"),i=n("7dd0"),o="String Iterator",s=a.set,c=a.getterFor(o);i(String,"String",(function(e){s(this,{type:o,string:String(e),index:0})}),(function(){var e,t=c(this),n=t.string,a=t.index;return a>=n.length?{value:void 0,done:!0}:(e=r(n,a),t.index+=e.length,{value:e,done:!1})}))},"44e7":function(e,t,n){var r=n("861d"),a=n("c6b6"),i=n("b622"),o=i("match");e.exports=function(e){var t;return r(e)&&(void 0!==(t=e[o])?!!t:"RegExp"==a(e))}},"4df4":function(e,t,n){"use strict";var r=n("0366"),a=n("7b0b"),i=n("9bdd"),o=n("e95a"),s=n("50c4"),c=n("8418"),l=n("35a1");e.exports=function(e){var t,n,u,d,g,f,p=a(e),v="function"==typeof this?this:Array,h=arguments.length,b=h>1?arguments[1]:void 0,m=void 0!==b,y=l(p),_=0;if(m&&(b=r(b,h>2?arguments[2]:void 0,2)),void 0==y||v==Array&&o(y))for(t=s(p.length),n=new v(t);t>_;_++)f=m?b(p[_],_):p[_],c(n,_,f);else for(d=y.call(p),g=d.next,n=new v;!(u=g.call(d)).done;_++)f=m?i(d,b,[u.value,_],!0):u.value,c(n,_,f);return n.length=_,n}},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,n){var r=n("1d80"),a=n("5899"),i="["+a+"]",o=RegExp("^"+i+i+"*"),s=RegExp(i+i+"*$"),c=function(e){return function(t){var n=String(r(t));return 1&e&&(n=n.replace(o,"")),2&e&&(n=n.replace(s,"")),n}};e.exports={start:c(1),end:c(2),trim:c(3)}},"5a34":function(e,t,n){var r=n("44e7");e.exports=function(e){if(r(e))throw TypeError("The method doesn't accept regular expressions");return e}},6547:function(e,t,n){var r=n("a691"),a=n("1d80"),i=function(e){return function(t,n){var i,o,s=String(a(t)),c=r(n),l=s.length;return c<0||c>=l?e?"":void 0:(i=s.charCodeAt(c),i<55296||i>56319||c+1===l||(o=s.charCodeAt(c+1))<56320||o>57343?e?s.charAt(c):i:e?s.slice(c,c+2):o-56320+(i-55296<<10)+65536)}};e.exports={codeAt:i(!1),charAt:i(!0)}},7156:function(e,t,n){var r=n("861d"),a=n("d2bb");e.exports=function(e,t,n){var i,o;return a&&"function"==typeof(i=t.constructor)&&i!==n&&r(o=i.prototype)&&o!==n.prototype&&a(e,o),e}},a630:function(e,t,n){var r=n("23e7"),a=n("4df4"),i=n("1c7e"),o=!i((function(e){Array.from(e)}));r({target:"Array",stat:!0,forced:o},{from:a})},a9e3:function(e,t,n){"use strict";var r=n("83ab"),a=n("da84"),i=n("94ca"),o=n("6eeb"),s=n("5135"),c=n("c6b6"),l=n("7156"),u=n("c04e"),d=n("d039"),g=n("7c73"),f=n("241c").f,p=n("06cf").f,v=n("9bf2").f,h=n("58a8").trim,b="Number",m=a[b],y=m.prototype,_=c(g(y))==b,P=function(e){var t,n,r,a,i,o,s,c,l=u(e,!1);if("string"==typeof l&&l.length>2)if(l=h(l),t=l.charCodeAt(0),43===t||45===t){if(n=l.charCodeAt(2),88===n||120===n)return NaN}else if(48===t){switch(l.charCodeAt(1)){case 66:case 98:r=2,a=49;break;case 79:case 111:r=8,a=55;break;default:return+l}for(i=l.slice(2),o=i.length,s=0;s<o;s++)if(c=i.charCodeAt(s),c<48||c>a)return NaN;return parseInt(i,r)}return+l};if(i(b,!m(" 0o1")||!m("0b1")||m("+0x1"))){for(var x,w=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof w&&(_?d((function(){y.valueOf.call(n)})):c(n)!=b)?l(new m(P(t)),n,w):P(t)},O=r?f(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),C=0;O.length>C;C++)s(m,x=O[C])&&!s(w,x)&&v(w,x,p(m,x));w.prototype=y,y.constructor=w,o(a,b,w)}},ab13:function(e,t,n){var r=n("b622"),a=r("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[a]=!1,"/./"[e](t)}catch(r){}}return!1}},ad6d:function(e,t,n){"use strict";var r=n("825a");e.exports=function(){var e=r(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},caad:function(e,t,n){"use strict";var r=n("23e7"),a=n("4d64").includes,i=n("44d2"),o=n("ae40"),s=o("indexOf",{ACCESSORS:!0,1:0});r({target:"Array",proto:!0,forced:!s},{includes:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}}),i("includes")},d28b:function(e,t,n){var r=n("746f");r("iterator")},ddb0:function(e,t,n){var r=n("da84"),a=n("fdbc"),i=n("e260"),o=n("9112"),s=n("b622"),c=s("iterator"),l=s("toStringTag"),u=i.values;for(var d in a){var g=r[d],f=g&&g.prototype;if(f){if(f[c]!==u)try{o(f,c,u)}catch(v){f[c]=u}if(f[l]||o(f,l,d),a[d])for(var p in i)if(f[p]!==i[p])try{o(f,p,i[p])}catch(v){f[p]=i[p]}}}},e01a:function(e,t,n){"use strict";var r=n("23e7"),a=n("83ab"),i=n("da84"),o=n("5135"),s=n("861d"),c=n("9bf2").f,l=n("e893"),u=i.Symbol;if(a&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var d={},g=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),t=this instanceof g?new u(e):void 0===e?u():u(e);return""===e&&(d[t]=!0),t};l(g,u);var f=g.prototype=u.prototype;f.constructor=g;var p=f.toString,v="Symbol(test)"==String(u("test")),h=/^Symbol\((.*)\)[^)]+$/;c(f,"description",{configurable:!0,get:function(){var e=s(this)?this.valueOf():this,t=p.call(e);if(o(d,e))return"";var n=v?t.slice(7,-1):t.replace(h,"$1");return""===n?void 0:n}}),r({global:!0,forced:!0},{Symbol:g})}},fb6a:function(e,t,n){"use strict";var r=n("23e7"),a=n("861d"),i=n("e8b5"),o=n("23cb"),s=n("50c4"),c=n("fc6a"),l=n("8418"),u=n("b622"),d=n("1dde"),g=n("ae40"),f=d("slice"),p=g("slice",{ACCESSORS:!0,0:0,1:2}),v=u("species"),h=[].slice,b=Math.max;r({target:"Array",proto:!0,forced:!f||!p},{slice:function(e,t){var n,r,u,d=c(this),g=s(d.length),f=o(e,g),p=o(void 0===t?g:t,g);if(i(d)&&(n=d.constructor,"function"!=typeof n||n!==Array&&!i(n.prototype)?a(n)&&(n=n[v],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return h.call(d,f,p);for(r=new(void 0===n?Array:n)(b(p-f,0)),u=0;f<p;f++,u++)f in d&&l(r,u,d[f]);return r.length=u,r}})}}]);
//# sourceMappingURL=index.29344f07.js.map