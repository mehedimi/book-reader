import{a as p,_ as f,u as _}from"./useHttp-Cd46308I.js";import{d as g,g as h,h as k,c as v,a as t,u as o,i as b,j as B,o as V}from"./index-CGetryrB.js";import{u as $,_ as N}from"./useBook-BaAb14vQ.js";const R=g({__name:"AuthorBooks",setup(x){const a=h(null),e=B(),r=_(),{isLoading:n,s,books:m,setTermId:d}=$({termId:Number(e.params.id)});function l(){a.value=null,r.get("/authors",{params:{id:e.params.id}}).then(({data:{data:u}})=>{a.value=u})}return l(),k(e,()=>{l(),d(Number(e.params.id))}),(u,i)=>(V(),v("div",null,[t(p,{title:a.value?`By ${a.value.name}`:"Loading..."},null,8,["title"]),t(f,{modelValue:o(s),"onUpdate:modelValue":i[0]||(i[0]=c=>b(s)?s.value=c:null),"is-loading":o(n)},null,8,["modelValue","is-loading"]),t(N,{books:o(m),"is-loading":o(n)},null,8,["books","is-loading"])]))}});export{R as default};