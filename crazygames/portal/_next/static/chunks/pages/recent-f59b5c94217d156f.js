(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[42854],{30120:function(e,t,n){"use strict";var i=n(61354),r=n(37078);const s=(0,n(19762).Z)(),o=(0,i.Z)({defaultTheme:s,defaultClassName:"MuiBox-root",generateClassName:r.Z.generate});t.Z=o},91655:function(e,t,n){"use strict";n.d(t,{Z:function(){return P}});var i=n(63366),r=n(87462),s=n(67294),o=n(86010),a=n(70917),c=n(94780);function l(e){return String(e).match(/[\d.\-+]*\s*(.*)/)[1]||""}function u(e){return parseFloat(e)}var d=n(41796),h=n(81719),p=n(6446),m=n(1588),f=n(34867);function g(e){return(0,f.Z)("MuiSkeleton",e)}(0,m.Z)("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);var v=n(85893);const b=["animation","className","component","height","style","variant","width"];let x,y,j,Z,w=e=>e;const O=(0,a.F4)(x||(x=w`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),C=(0,a.F4)(y||(y=w`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),k=(0,h.ZP)("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!1!==n.animation&&t[n.animation],n.hasChildren&&t.withChildren,n.hasChildren&&!n.width&&t.fitContent,n.hasChildren&&!n.height&&t.heightAuto]}})((({theme:e,ownerState:t})=>{const n=l(e.shape.borderRadius)||"px",i=u(e.shape.borderRadius);return(0,r.Z)({display:"block",backgroundColor:e.vars?e.vars.palette.Skeleton.bg:(0,d.Fq)(e.palette.text.primary,"light"===e.palette.mode?.11:.13),height:"1.2em"},"text"===t.variant&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${i}${n}/${Math.round(i/.6*10)/10}${n}`,"&:empty:before":{content:'"\\00a0"'}},"circular"===t.variant&&{borderRadius:"50%"},"rounded"===t.variant&&{borderRadius:(e.vars||e).shape.borderRadius},t.hasChildren&&{"& > *":{visibility:"hidden"}},t.hasChildren&&!t.width&&{maxWidth:"fit-content"},t.hasChildren&&!t.height&&{height:"auto"})}),(({ownerState:e})=>"pulse"===e.animation&&(0,a.iv)(j||(j=w`
      animation: ${0} 1.5s ease-in-out 0.5s infinite;
    `),O)),(({ownerState:e,theme:t})=>"wave"===e.animation&&(0,a.iv)(Z||(Z=w`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 1.6s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),C,(t.vars||t).palette.action.hover)));var P=s.forwardRef((function(e,t){const n=(0,p.Z)({props:e,name:"MuiSkeleton"}),{animation:s="pulse",className:a,component:l="span",height:u,style:d,variant:h="text",width:m}=n,f=(0,i.Z)(n,b),x=(0,r.Z)({},n,{animation:s,component:l,variant:h,hasChildren:Boolean(f.children)}),y=(e=>{const{classes:t,variant:n,animation:i,hasChildren:r,width:s,height:o}=e,a={root:["root",n,i,r&&"withChildren",r&&!s&&"fitContent",r&&!o&&"heightAuto"]};return(0,c.Z)(a,g,t)})(x);return(0,v.jsx)(k,(0,r.Z)({as:l,ref:t,className:(0,o.Z)(y.root,a),ownerState:x},f,{style:(0,r.Z)({width:m,height:u},d)}))}))},61354:function(e,t,n){"use strict";n.d(t,{Z:function(){return p}});var i=n(87462),r=n(63366),s=n(67294),o=n(86010),a=n(5151),c=n(86523),l=n(39707),u=n(96682),d=n(85893);const h=["className","component"];function p(e={}){const{defaultTheme:t,defaultClassName:n="MuiBox-root",generateClassName:p,styleFunctionSx:m=c.Z}=e,f=(0,a.ZP)("div",{shouldForwardProp:e=>"theme"!==e&&"sx"!==e&&"as"!==e})(m);return s.forwardRef((function(e,s){const a=(0,u.Z)(t),c=(0,l.Z)(e),{className:m,component:g="div"}=c,v=(0,r.Z)(c,h);return(0,d.jsx)(f,(0,i.Z)({as:g,ref:s,className:(0,o.Z)(m,p?p(n):n),theme:a},v))}))}},50645:function(e,t,n){"use strict";var i=n(59499),r=n(67294),s=n(90335),o=n(34386),a=n(47638),c=n(85893);function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){(0,i.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}t.Z=e=>{let{games:t,justifyContent:n,slidesToLoadEagerly:i,preventZoom:l,contentVisibility:d,containIntrinsicSize:h,customStyles:p,transformOrigin:m,thumbIconFn:f,thumbIcon:g,isResponsive:v,isResponsiveGrid:b,imgResponsiveSizes:x,sx:y}=e;const{crazyAnalyticsService:j}=r.useContext(o.Z).services;return(0,c.jsx)(a.MM,{contentVisibility:d,containIntrinsicSize:h,style:u(u({},p),{},{justifyContent:n}),isResponsive:v,sx:y,children:t.map(((e,n)=>e.loading?(0,c.jsx)(s.Z,{},e.slug):(0,c.jsx)(a.oZ,{game:e,transformOrigin:m,preventZoom:l,eagerLoading:i?n<i:void 0,iconFn:f,icon:g,onClickAction:()=>{j.gameClickedFromList(t)},isResponsive:v,isResponsiveGrid:b,imgResponsiveSizes:x},e.slug)))})}},90335:function(e,t,n){"use strict";var i=n(59499),r=n(67294),s=n(91655),o=n(52261),a=n(62097),c=n(85893);function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){(0,i.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}t.Z=e=>{let{isFeatured:t,sx:n,isResponsive:i}=e;const l=r.useContext(o.ZP).isDesktop,d=(0,a.Z)().dimensions.gameThumb,h=t?d.featuredWidth:l?d.width:d.mobileWidth,p=t?d.featuredHeight:d.height;return(0,c.jsx)(s.Z,{sx:u({position:"relative",borderRadius:e=>e.spacing()},n),variant:"rectangular",width:i?"100%":h,height:i?"100%":p,className:"skeleton"})}},89087:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return k}});var i=n(67294),r=n(49501),s=n(55424),o=n(28710),a=n(26086),c=n(74167),l=n(62097),u=n(30120),d=n(81719),h=n(83747);const p=(0,d.ZP)("div",{shouldForwardProp:e=>"isDesktop"!==e})((e=>{let{theme:{spacing:t,dimensions:n},isDesktop:i}=e;return{paddingLeft:i?t(1):void 0,minHeight:`calc(100vh - ${n.header.height+n.footer.height}px)`}})),m=(0,d.ZP)("div")((()=>({"& span":{color:h.D.brand[60],fontWeight:800},"&:hover":{cursor:"pointer",opacity:.8},"& svg":{marginBottom:-7,marginRight:4}})));var f=n(50645),g=n(73927),v=n(34386),b=n(52261),x=n(21818),y=n(70612),j=n(43506),Z=n(85893);var w=()=>{const[e,t]=i.useState(null),{spacing:n}=(0,l.Z)(),{services:s}=i.useContext(v.Z),{isDesktop:o}=i.useContext(b.ZP),{openDrawer:a}=i.useContext(x.rf),{user:c}=i.useContext(j.S);return i.useEffect((()=>{const e=s.recentlyPlayedService.getGames();t(e)}),[s]),(0,Z.jsxs)(p,{isDesktop:o,children:[(0,Z.jsxs)("div",{style:{display:"flex",flexDirection:"column",marginTop:n(2)},children:[(0,Z.jsx)(u.Z,{sx:{px:2,pb:2,pt:{xs:2,h2:4}},children:(0,Z.jsx)("h1",{children:(0,Z.jsx)(r.cC,{id:"common.menu.recent"})})}),(0,Z.jsx)("div",{style:{paddingLeft:n(2),marginTop:n(-1),height:23},onClick:()=>{a("myGames")},children:!c&&(0,Z.jsx)(m,{children:(0,Z.jsx)(r.cC,{id:"recent.createAccount.subtitle",values:{addLink:(0,Z.jsxs)("span",{children:[(0,Z.jsx)(y.Z,{}),(0,Z.jsx)(r.cC,{id:"recent.createAccount.link"})]})}})})})]}),(0,Z.jsx)("div",{style:{display:"flex",alignItems:"flex-start"},children:(0,Z.jsx)("div",{style:{width:"100%",padding:n(2)},children:e&&(0,Z.jsx)(f.Z,{games:e,justifyContent:"center",isResponsive:!0,isResponsiveGrid:!0,sx:g.Dx,imgResponsiveSizes:g.L})})})]})},O=n(48266),C=n(94704);var k=(0,c.Z)("recent")((0,C.Z)((()=>{const{i18n:e}=(0,r.mV)(),{routeHelper:t}=i.useContext(O.Z),n=t.recentPageAlternativeLinks(),c=t.recentPageCanonical();return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(o.Z,{canonical:c,alternatives:n,title:e._({id:"recent.head.title"}),metaDescription:e._({id:"recent.head.metaDescription"})}),(0,Z.jsx)(s.Z,{alternatives:n,children:(0,Z.jsx)(a.Z,{children:(0,Z.jsx)(w,{})})})]})})))},62478:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/recent",function(){return n(89087)}])}},function(e){e.O(0,[58254,37164,69157,47638,49774,92888,40179],(function(){return t=62478,e(e.s=t);var t}));var t=e.O();_N_E=t}]);