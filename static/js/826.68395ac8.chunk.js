"use strict";(self.webpackChunkpatolimpiadas_casaes=self.webpackChunkpatolimpiadas_casaes||[]).push([[826],{4826:(e,a,s)=>{s.r(a),s.d(a,{default:()=>j});var t=s(5043),r=s(6213),i=(s(8421),s(3204)),n=s(2314),l=s(5263),c=s(7392),o=s(5865),d=s(4669),h=s(4056),m=s(547),p=s(8185),x=s(3216),g=s(7332),u=s(579);const j=()=>{const[e,a]=(0,t.useState)([]),[s,j]=(0,t.useState)(!0),[f,b]=(0,t.useState)("user"),[v,y]=(0,t.useState)(""),A=(0,x.Zp)(),k="https://api.cadeopato.app.br";(0,t.useEffect)((()=>{(async()=>{j(!0),y("");try{const e=await r.A.get(`${k}/rankings?by=${f}`);a(e.data)}catch(v){console.error("Error fetching rankings:",v),y("N\xe3o foi poss\xedvel carregar os rankings. Por favor, entre em contato com o administrador.")}finally{j(!1)}})()}),[f,k]);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(n.A,{className:"Appbar",position:"sticky",color:"default",children:[(0,u.jsxs)(l.A,{children:[(0,u.jsx)(c.A,{edge:"start",color:"inherit","aria-label":"back",onClick:()=>A(-1),children:(0,u.jsx)(g.A,{})}),(0,u.jsx)(o.A,{component:"div",sx:{flexGrow:1,alignItems:"center",textAlign:"center"},children:(0,u.jsx)("h2",{style:{margin:0},children:"Ranking"})})]}),(0,u.jsxs)(d.A,{value:f,onChange:(e,a)=>{null!==a&&b(a)},"aria-label":"Ranking Tabs",centered:!0,sx:{"& .MuiTab-root":{color:"var(--text-color)",fontFamily:"var(--font-family)","&.Mui-selected":{color:"var(--primary-color)",fontWeight:"bold"}},"& .MuiTabs-indicator":{backgroundColor:"var(--primary-color)",height:"4px"}},children:[(0,u.jsx)(h.A,{label:"Participante",value:"user"}),(0,u.jsx)(h.A,{label:"Casa",value:"house"})]})]}),(0,u.jsx)("div",{className:"container py-4",children:v?(0,u.jsx)(m.A,{severity:"error",children:v}):(0,u.jsx)("div",{className:"list-group mt-3",children:s?Array.from(new Array(5)).map(((e,a)=>(0,u.jsxs)("div",{className:"list-group-item d-flex justify-content-between align-items-center",children:[(0,u.jsx)("div",{className:"d-flex",children:(0,u.jsx)(p.A,{variant:"text",width:"150px",height:30})}),(0,u.jsx)(p.A,{variant:"text",width:"15%",height:20})]},a))):e.map(((e,a)=>(0,u.jsxs)("div",{className:"list-group-item list-group-item-action d-flex justify-content-between align-items-center "+(0===a?"top-rank":""),children:[(0,u.jsxs)("div",{className:"d-flex align-items-center",children:[0===a&&(0,u.jsx)(i.Hu1,{className:"crown-icon text-warning"}),(0,u.jsx)("h5",{className:"mb-0 ml-2",children:e.entity})]}),(0,u.jsxs)("span",{className:"badge badge-primary badge-pill",children:[e.points," pontos"]})]},a)))})})]})}},8421:()=>{}}]);
//# sourceMappingURL=826.68395ac8.chunk.js.map