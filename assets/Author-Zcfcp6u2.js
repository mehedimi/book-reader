import{b as _,_ as v,a as x,u as b}from"./MenuBar.vue_vue_type_script_setup_true_lang-PMYQMoSD.js";import{e as p,f as a,F as V,i as y,k as o,l as k,u as m,h as t,t as l,r,m as i}from"./index-Df2CPguN.js";const A={class:"grid grid-cols-2 gap-5 my-8"},B={class:"flex justify-between items-center"},C={class:"text-4xl font-bold"},L={class:"text-gray-500 mt-6"},$=p({__name:"TaxonomyList",props:{taxonomies:{}},setup(f){return(s,n)=>(o(),a("div",A,[(o(!0),a(V,null,y(s.taxonomies,e=>(o(),a("a",{class:k(["bg-gradient-to-bl p-5 rounded-2xl text-gray-600",m(_)[e.id%m(_).length]])},[t("div",B,[t("h2",C,l(e.name[0]),1),t("span",null,"("+l(e.count)+")",1)]),t("p",L,l(e.name),1)],2))),256))]))}}),S=p({__name:"Author",setup(f){const s=r(!1),n=r(""),e=b(),u=r([]);function h(){s.value=!0,e.get("/authors").then(({data:{data:c}})=>{u.value=c}).finally(()=>{s.value=!1})}return h(),(c,d)=>(o(),a("div",null,[i(x,{title:"Authors"}),i(v,{modelValue:n.value,"onUpdate:modelValue":d[0]||(d[0]=g=>n.value=g),placeholder:"Search authors...","is-loading":s.value},null,8,["modelValue","is-loading"]),i($,{taxonomies:u.value},null,8,["taxonomies"])]))}});export{S as default};
