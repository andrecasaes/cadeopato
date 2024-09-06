"use strict";(self.webpackChunkpatolimpiadas_casaes=self.webpackChunkpatolimpiadas_casaes||[]).push([[900],{7069:(e,r,t)=>{t.r(r),t.d(r,{default:()=>be});var a=t(5043),o=t(6213),n=t(8729),i=t(5475),s=t(2314),l=t(5263),d=t(7392),c=t(5865),u=t(6446),p=t(8587),m=t(8168),b=t(8387),h=t(8610),f=t(3290),v=t(7266),g=t(875),A=t(6803),x=t(4535),y=t(6431),k=t(2532),C=t(2372);function w(e){return(0,C.Ay)("MuiLinearProgress",e)}(0,k.A)("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","dashedColorPrimary","dashedColorSecondary","bar","barColorPrimary","barColorSecondary","bar1Indeterminate","bar1Determinate","bar1Buffer","bar2Indeterminate","bar2Buffer"]);var S=t(579);const j=["className","color","value","valueBuffer","variant"];let $,B,z,M,N,R,P=e=>e;const I=(0,f.i7)($||($=P`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`)),O=(0,f.i7)(B||(B=P`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`)),L=(0,f.i7)(z||(z=P`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`)),T=(e,r)=>"inherit"===r?"currentColor":e.vars?e.vars.palette.LinearProgress[`${r}Bg`]:"light"===e.palette.mode?(0,v.a)(e.palette[r].main,.62):(0,v.e$)(e.palette[r].main,.5),D=(0,x.Ay)("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.root,r[`color${(0,A.A)(t.color)}`],r[t.variant]]}})((e=>{let{ownerState:r,theme:t}=e;return(0,m.A)({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},backgroundColor:T(t,r.color)},"inherit"===r.color&&"buffer"!==r.variant&&{backgroundColor:"none","&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}},"buffer"===r.variant&&{backgroundColor:"transparent"},"query"===r.variant&&{transform:"rotate(180deg)"})})),q=(0,x.Ay)("span",{name:"MuiLinearProgress",slot:"Dashed",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.dashed,r[`dashedColor${(0,A.A)(t.color)}`]]}})((e=>{let{ownerState:r,theme:t}=e;const a=T(t,r.color);return(0,m.A)({position:"absolute",marginTop:0,height:"100%",width:"100%"},"inherit"===r.color&&{opacity:.3},{backgroundImage:`radial-gradient(${a} 0%, ${a} 16%, transparent 42%)`,backgroundSize:"10px 10px",backgroundPosition:"0 -23px"})}),(0,f.AH)(M||(M=P`
    animation: ${0} 3s infinite linear;
  `),L)),_=(0,x.Ay)("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.bar,r[`barColor${(0,A.A)(t.color)}`],("indeterminate"===t.variant||"query"===t.variant)&&r.bar1Indeterminate,"determinate"===t.variant&&r.bar1Determinate,"buffer"===t.variant&&r.bar1Buffer]}})((e=>{let{ownerState:r,theme:t}=e;return(0,m.A)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",backgroundColor:"inherit"===r.color?"currentColor":(t.vars||t).palette[r.color].main},"determinate"===r.variant&&{transition:"transform .4s linear"},"buffer"===r.variant&&{zIndex:1,transition:"transform .4s linear"})}),(e=>{let{ownerState:r}=e;return("indeterminate"===r.variant||"query"===r.variant)&&(0,f.AH)(N||(N=P`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    `),I)})),H=(0,x.Ay)("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.bar,r[`barColor${(0,A.A)(t.color)}`],("indeterminate"===t.variant||"query"===t.variant)&&r.bar2Indeterminate,"buffer"===t.variant&&r.bar2Buffer]}})((e=>{let{ownerState:r,theme:t}=e;return(0,m.A)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left"},"buffer"!==r.variant&&{backgroundColor:"inherit"===r.color?"currentColor":(t.vars||t).palette[r.color].main},"inherit"===r.color&&{opacity:.3},"buffer"===r.variant&&{backgroundColor:T(t,r.color),transition:"transform .4s linear"})}),(e=>{let{ownerState:r}=e;return("indeterminate"===r.variant||"query"===r.variant)&&(0,f.AH)(R||(R=P`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
    `),O)})),W=a.forwardRef((function(e,r){const t=(0,y.b)({props:e,name:"MuiLinearProgress"}),{className:a,color:o="primary",value:n,valueBuffer:i,variant:s="indeterminate"}=t,l=(0,p.A)(t,j),d=(0,m.A)({},t,{color:o,variant:s}),c=(e=>{const{classes:r,variant:t,color:a}=e,o={root:["root",`color${(0,A.A)(a)}`,t],dashed:["dashed",`dashedColor${(0,A.A)(a)}`],bar1:["bar",`barColor${(0,A.A)(a)}`,("indeterminate"===t||"query"===t)&&"bar1Indeterminate","determinate"===t&&"bar1Determinate","buffer"===t&&"bar1Buffer"],bar2:["bar","buffer"!==t&&`barColor${(0,A.A)(a)}`,"buffer"===t&&`color${(0,A.A)(a)}`,("indeterminate"===t||"query"===t)&&"bar2Indeterminate","buffer"===t&&"bar2Buffer"]};return(0,h.A)(o,w,r)})(d),u=(0,g.I)(),f={},v={bar1:{},bar2:{}};if("determinate"===s||"buffer"===s)if(void 0!==n){f["aria-valuenow"]=Math.round(n),f["aria-valuemin"]=0,f["aria-valuemax"]=100;let e=n-100;u&&(e=-e),v.bar1.transform=`translateX(${e}%)`}else 0;if("buffer"===s)if(void 0!==i){let e=(i||0)-100;u&&(e=-e),v.bar2.transform=`translateX(${e}%)`}else 0;return(0,S.jsxs)(D,(0,m.A)({className:(0,b.A)(c.root,a),ownerState:d,role:"progressbar"},f,{ref:r},l,{children:["buffer"===s?(0,S.jsx)(q,{className:c.dashed,ownerState:d}):null,(0,S.jsx)(_,{className:c.bar1,ownerState:d,style:v.bar1}),"determinate"===s?null:(0,S.jsx)(H,{className:c.bar2,ownerState:d,style:v.bar2})]}))}));var F=t(547),G=t(5721),X=t(4628),E=t(8734),U=t(8185),V=t(8266),Z=t(3030),J=t(310),K=t(6236);function Q(e){return(0,C.Ay)("MuiToggleButton",e)}const Y=(0,k.A)("MuiToggleButton",["root","disabled","selected","standard","primary","secondary","sizeSmall","sizeMedium","sizeLarge","fullWidth"]);const ee=a.createContext({});const re=a.createContext(void 0);function te(e,r){return void 0!==r&&void 0!==e&&(Array.isArray(r)?r.indexOf(e)>=0:e===r)}const ae=["value"],oe=["children","className","color","disabled","disableFocusRipple","fullWidth","onChange","onClick","selected","size","value"],ne=(0,x.Ay)(K.A,{name:"MuiToggleButton",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.root,r[`size${(0,A.A)(t.size)}`]]}})((e=>{let r,{theme:t,ownerState:a}=e,o="standard"===a.color?t.palette.text.primary:t.palette[a.color].main;return t.vars&&(o="standard"===a.color?t.vars.palette.text.primary:t.vars.palette[a.color].main,r="standard"===a.color?t.vars.palette.text.primaryChannel:t.vars.palette[a.color].mainChannel),(0,m.A)({},t.typography.button,{borderRadius:(t.vars||t).shape.borderRadius,padding:11,border:`1px solid ${(t.vars||t).palette.divider}`,color:(t.vars||t).palette.action.active},a.fullWidth&&{width:"100%"},{[`&.${Y.disabled}`]:{color:(t.vars||t).palette.action.disabled,border:`1px solid ${(t.vars||t).palette.action.disabledBackground}`},"&:hover":{textDecoration:"none",backgroundColor:t.vars?`rgba(${t.vars.palette.text.primaryChannel} / ${t.vars.palette.action.hoverOpacity})`:(0,J.X4)(t.palette.text.primary,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${Y.selected}`]:{color:o,backgroundColor:t.vars?`rgba(${r} / ${t.vars.palette.action.selectedOpacity})`:(0,J.X4)(o,t.palette.action.selectedOpacity),"&:hover":{backgroundColor:t.vars?`rgba(${r} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.hoverOpacity}))`:(0,J.X4)(o,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:t.vars?`rgba(${r} / ${t.vars.palette.action.selectedOpacity})`:(0,J.X4)(o,t.palette.action.selectedOpacity)}}}},"small"===a.size&&{padding:7,fontSize:t.typography.pxToRem(13)},"large"===a.size&&{padding:15,fontSize:t.typography.pxToRem(15)})})),ie=a.forwardRef((function(e,r){const t=a.useContext(ee),{value:o}=t,n=(0,p.A)(t,ae),i=a.useContext(re),s=(0,Z.A)((0,m.A)({},n,{selected:te(e.value,o)}),e),l=(0,y.b)({props:s,name:"MuiToggleButton"}),{children:d,className:c,color:u="standard",disabled:f=!1,disableFocusRipple:v=!1,fullWidth:g=!1,onChange:x,onClick:k,selected:C,size:w="medium",value:j}=l,$=(0,p.A)(l,oe),B=(0,m.A)({},l,{color:u,disabled:f,disableFocusRipple:v,fullWidth:g,size:w}),z=(e=>{const{classes:r,fullWidth:t,selected:a,disabled:o,size:n,color:i}=e,s={root:["root",a&&"selected",o&&"disabled",t&&"fullWidth",`size${(0,A.A)(n)}`,i]};return(0,h.A)(s,Q,r)})(B),M=i||"";return(0,S.jsx)(ne,(0,m.A)({className:(0,b.A)(n.className,z.root,c,M),disabled:f,focusRipple:!v,ref:r,onClick:e=>{k&&(k(e,j),e.defaultPrevented)||x&&x(e,j)},onChange:x,value:j,ownerState:B,"aria-pressed":C},$,{children:d}))}));var se=t(1637),le=t(7332),de=t(9662);const ce=(0,de.A)((0,S.jsx)("path",{d:"M7.5 21H2V9h5.5zm7.25-18h-5.5v18h5.5zM22 11h-5.5v10H22z"}),"Leaderboard"),ue=(0,de.A)((0,S.jsx)("path",{d:"M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"}),"Check"),pe=(0,de.A)((0,S.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Clear");var me=t(3216);const be=()=>{const{authState:e}=(0,a.useContext)(n.c),[r,t]=(0,a.useState)([]),[p,m]=(0,a.useState)(!0),[b,h]=(0,a.useState)(0),[f,v]=(0,a.useState)(0),[g,A]=(0,a.useState)(0),[x,y]=(0,a.useState)(null),[k,C]=(0,a.useState)(!1),w=(0,me.Zp)();e.user||(window.location.href="/");const j="https://api.cadeopato.app.br";(0,a.useEffect)((()=>{(async()=>{m(!0),y(null);try{const r=(await o.A.get(`${j}/ducks/search?userId=${e.user.selectedUser._id}`)).data;t(r);const a=r.filter((e=>e.found)).length,n=a/r.length*100;h(n),A(a),v(r.length)}catch(x){console.error("Error fetching ducks:",x),y("N\xe3o foi poss\xedvel carregar os dados. Por favor, contate o administrador.")}finally{m(!1)}})()}),[j,e.user.selectedUser._id]);return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)(s.A,{className:"Appbar",position:"sticky",color:"default",children:[(0,S.jsxs)(l.A,{children:[(0,S.jsx)(d.A,{edge:"start",color:"inherit","aria-label":"back",onClick:()=>w(-1),children:(0,S.jsx)(le.A,{})}),(0,S.jsx)(c.A,{component:"div",sx:{flexGrow:1,alignItems:"center",textAlign:"center"},children:(0,S.jsxs)("h2",{style:{margin:0},children:[" ",e.user.selectedUser.username," Dashboard"]})}),(0,S.jsx)(d.A,{edge:"end",color:"inherit",component:i.N_,to:"/ranking","aria-label":"ranking",children:(0,S.jsx)(ce,{})})]}),(0,S.jsxs)(u.A,{sx:{paddingX:2,paddingBottom:2},children:[(0,S.jsx)(W,{variant:"determinate",value:b}),(0,S.jsxs)(c.A,{variant:"body2",color:"textSecondary",align:"center",children:[g," de ",f," patos encontrados"]})]})]}),(0,S.jsxs)("div",{className:"container py-4",children:[x&&(0,S.jsx)(F.A,{severity:"error",sx:{marginBottom:2},children:x}),(0,S.jsx)(G.A,{children:p?Array.from(new Array(5)).map(((e,r)=>(0,S.jsxs)(X.Ay,{className:"duck-list-item",children:[(0,S.jsx)(E.A,{primary:(0,S.jsx)(U.A,{variant:"text",width:"40%",height:30}),secondary:(0,S.jsx)(S.Fragment,{children:(0,S.jsx)(U.A,{variant:"text",width:"60%",height:20})})}),(0,S.jsx)(V.A,{children:(0,S.jsx)(U.A,{variant:"rectangular",width:40,height:40})})]},r))):r.map((e=>(0,S.jsxs)(X.Ay,{className:"duck-list-item",children:[(0,S.jsx)(E.A,{primary:(0,S.jsxs)("h5",{children:["Pato ",e.id]}),secondary:(0,S.jsx)(S.Fragment,{children:(0,S.jsxs)("span",{children:["Tipo: ",e.type]})})}),(0,S.jsx)(V.A,{children:(0,S.jsx)(ie,{value:"check",selected:e.found,onChange:()=>(async(e,a)=>{C(!0);try{await o.A.put(`${j}/ducks/${e}`,{found:a});const n=r.map((r=>r._id===e?{...r,found:a}:r));t(n);const i=n.filter((e=>e.found)).length,s=i/n.length*100;h(s),A(i),v(n.length)}catch(x){console.error(`Error marking duck as ${a?"found":"unfound"}:`,x),y("N\xe3o foi poss\xedvel atualizar o status do pato. Por favor, tente novamente.")}finally{C(!1)}})(e._id,!e.found),className:e.found?"toggle-button-selected":"toggle-button-unselected",disabled:k,children:k?(0,S.jsx)(se.A,{size:24,sx:{color:"var(--accent-color)"}}):e.found?(0,S.jsx)(ue,{style:{color:"#28a745"}}):(0,S.jsx)(pe,{style:{color:"#dc3545"}})})})]},e._id)))})]})]})}},7332:(e,r,t)=>{t.d(r,{A:()=>n});var a=t(9662),o=t(579);const n=(0,a.A)((0,o.jsx)("path",{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"}),"ArrowBack")},2314:(e,r,t)=>{t.d(r,{A:()=>A});var a=t(8587),o=t(8168),n=t(5043),i=t(8387),s=t(8610),l=t(4535),d=t(6431),c=t(6803),u=t(3336),p=t(2532),m=t(2372);function b(e){return(0,m.Ay)("MuiAppBar",e)}(0,p.A)("MuiAppBar",["root","positionFixed","positionAbsolute","positionSticky","positionStatic","positionRelative","colorDefault","colorPrimary","colorSecondary","colorInherit","colorTransparent","colorError","colorInfo","colorSuccess","colorWarning"]);var h=t(579);const f=["className","color","enableColorOnDark","position"],v=(e,r)=>e?`${null==e?void 0:e.replace(")","")}, ${r})`:r,g=(0,l.Ay)(u.A,{name:"MuiAppBar",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.root,r[`position${(0,c.A)(t.position)}`],r[`color${(0,c.A)(t.color)}`]]}})((e=>{let{theme:r,ownerState:t}=e;const a="light"===r.palette.mode?r.palette.grey[100]:r.palette.grey[900];return(0,o.A)({display:"flex",flexDirection:"column",width:"100%",boxSizing:"border-box",flexShrink:0},"fixed"===t.position&&{position:"fixed",zIndex:(r.vars||r).zIndex.appBar,top:0,left:"auto",right:0,"@media print":{position:"absolute"}},"absolute"===t.position&&{position:"absolute",zIndex:(r.vars||r).zIndex.appBar,top:0,left:"auto",right:0},"sticky"===t.position&&{position:"sticky",zIndex:(r.vars||r).zIndex.appBar,top:0,left:"auto",right:0},"static"===t.position&&{position:"static"},"relative"===t.position&&{position:"relative"},!r.vars&&(0,o.A)({},"default"===t.color&&{backgroundColor:a,color:r.palette.getContrastText(a)},t.color&&"default"!==t.color&&"inherit"!==t.color&&"transparent"!==t.color&&{backgroundColor:r.palette[t.color].main,color:r.palette[t.color].contrastText},"inherit"===t.color&&{color:"inherit"},"dark"===r.palette.mode&&!t.enableColorOnDark&&{backgroundColor:null,color:null},"transparent"===t.color&&(0,o.A)({backgroundColor:"transparent",color:"inherit"},"dark"===r.palette.mode&&{backgroundImage:"none"})),r.vars&&(0,o.A)({},"default"===t.color&&{"--AppBar-background":t.enableColorOnDark?r.vars.palette.AppBar.defaultBg:v(r.vars.palette.AppBar.darkBg,r.vars.palette.AppBar.defaultBg),"--AppBar-color":t.enableColorOnDark?r.vars.palette.text.primary:v(r.vars.palette.AppBar.darkColor,r.vars.palette.text.primary)},t.color&&!t.color.match(/^(default|inherit|transparent)$/)&&{"--AppBar-background":t.enableColorOnDark?r.vars.palette[t.color].main:v(r.vars.palette.AppBar.darkBg,r.vars.palette[t.color].main),"--AppBar-color":t.enableColorOnDark?r.vars.palette[t.color].contrastText:v(r.vars.palette.AppBar.darkColor,r.vars.palette[t.color].contrastText)},!["inherit","transparent"].includes(t.color)&&{backgroundColor:"var(--AppBar-background)"},{color:"inherit"===t.color?"inherit":"var(--AppBar-color)"},"transparent"===t.color&&{backgroundImage:"none",backgroundColor:"transparent",color:"inherit"}))})),A=n.forwardRef((function(e,r){const t=(0,d.b)({props:e,name:"MuiAppBar"}),{className:n,color:l="primary",enableColorOnDark:u=!1,position:p="fixed"}=t,m=(0,a.A)(t,f),v=(0,o.A)({},t,{color:l,position:p,enableColorOnDark:u}),A=(e=>{const{color:r,position:t,classes:a}=e,o={root:["root",`color${(0,c.A)(r)}`,`position${(0,c.A)(t)}`]};return(0,s.A)(o,b,a)})(v);return(0,h.jsx)(g,(0,o.A)({square:!0,component:"header",ownerState:v,elevation:4,className:(0,i.A)(A.root,n,"fixed"===p&&"mui-fixed"),ref:r},m))}))},5721:(e,r,t)=>{t.d(r,{A:()=>v});var a=t(8587),o=t(8168),n=t(5043),i=t(8387),s=t(8610),l=t(4535),d=t(6431),c=t(1347),u=t(2532),p=t(2372);function m(e){return(0,p.Ay)("MuiList",e)}(0,u.A)("MuiList",["root","padding","dense","subheader"]);var b=t(579);const h=["children","className","component","dense","disablePadding","subheader"],f=(0,l.Ay)("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.root,!t.disablePadding&&r.padding,t.dense&&r.dense,t.subheader&&r.subheader]}})((e=>{let{ownerState:r}=e;return(0,o.A)({listStyle:"none",margin:0,padding:0,position:"relative"},!r.disablePadding&&{paddingTop:8,paddingBottom:8},r.subheader&&{paddingTop:0})})),v=n.forwardRef((function(e,r){const t=(0,d.b)({props:e,name:"MuiList"}),{children:l,className:u,component:p="ul",dense:v=!1,disablePadding:g=!1,subheader:A}=t,x=(0,a.A)(t,h),y=n.useMemo((()=>({dense:v})),[v]),k=(0,o.A)({},t,{component:p,dense:v,disablePadding:g}),C=(e=>{const{classes:r,disablePadding:t,dense:a,subheader:o}=e,n={root:["root",!t&&"padding",a&&"dense",o&&"subheader"]};return(0,s.A)(n,m,r)})(k);return(0,b.jsx)(c.A.Provider,{value:y,children:(0,b.jsxs)(f,(0,o.A)({as:p,className:(0,i.A)(C.root,u),ref:r,ownerState:k},x,{children:[A,l]}))})}))},1347:(e,r,t)=>{t.d(r,{A:()=>a});const a=t(5043).createContext({})},5263:(e,r,t)=>{t.d(r,{A:()=>f});var a=t(8587),o=t(8168),n=t(5043),i=t(8387),s=t(8610),l=t(6431),d=t(4535),c=t(2532),u=t(2372);function p(e){return(0,u.Ay)("MuiToolbar",e)}(0,c.A)("MuiToolbar",["root","gutters","regular","dense"]);var m=t(579);const b=["className","component","disableGutters","variant"],h=(0,d.Ay)("div",{name:"MuiToolbar",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.root,!t.disableGutters&&r.gutters,r[t.variant]]}})((e=>{let{theme:r,ownerState:t}=e;return(0,o.A)({position:"relative",display:"flex",alignItems:"center"},!t.disableGutters&&{paddingLeft:r.spacing(2),paddingRight:r.spacing(2),[r.breakpoints.up("sm")]:{paddingLeft:r.spacing(3),paddingRight:r.spacing(3)}},"dense"===t.variant&&{minHeight:48})}),(e=>{let{theme:r,ownerState:t}=e;return"regular"===t.variant&&r.mixins.toolbar})),f=n.forwardRef((function(e,r){const t=(0,l.b)({props:e,name:"MuiToolbar"}),{className:n,component:d="div",disableGutters:c=!1,variant:u="regular"}=t,f=(0,a.A)(t,b),v=(0,o.A)({},t,{component:d,disableGutters:c,variant:u}),g=(e=>{const{classes:r,disableGutters:t,variant:a}=e,o={root:["root",!t&&"gutters",a]};return(0,s.A)(o,p,r)})(v);return(0,m.jsx)(h,(0,o.A)({as:d,className:(0,i.A)(g.root,n),ref:r,ownerState:v},f))}))},7328:(e,r,t)=>{t.d(r,{A:()=>o});var a=t(5043);const o=function(e,r){var t,o;return a.isValidElement(e)&&-1!==r.indexOf(null!=(t=e.type.muiName)?t:null==(o=e.type)||null==(o=o._payload)||null==(o=o.value)?void 0:o.muiName)}}}]);
//# sourceMappingURL=900.6698d31b.chunk.js.map