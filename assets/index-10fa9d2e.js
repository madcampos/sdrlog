import{g as R,d as yt,f as pe,h as E,i as oi,j as He,p as pt,T as ni,k as fe,l as wt,m as li,o as $t,s as k,b as c,R as y,q as di,u as ci,v as pi,x as n,S as hi,n as X,t as A,w as ht,y as _t,r as Ye,L as kt,z as ui,A as mi,B as gi,c as Xe,C as ut,a as he}from"./search-engine-8ef14249.js";import{I18n as ve}from"./translations-a98a8f50.js";import{_ as U}from"./index-e073fea2.js";import"./gamepad-events-7f4c04b9.js";const fi="https://madcampos.dev/sdrlog/assets/data-eb04b06d.json",N={"de-DE":{icon:"🇩🇪",name:"German"},"fr-FR":{icon:"🇫🇷",name:"French"},"jp-JP":{icon:"🇯🇵",name:"Japanese"},"es-ES":{icon:"🇪🇸",name:"Spanish"},"hu-HU":{icon:"🇭🇺",name:"Hungarian"},"it-IT":{icon:"🇮🇹",name:"Italian"},"pt-BR":{icon:"🇧🇷",name:"Brazilian Portuguese"},"cs-CZ":{icon:"🇨🇿",name:"Czech"},"he-IL":{icon:"🇮🇱",name:"Hebrew"},"pl-PL":{icon:"🇵🇱",name:"Polish"},"fi-FI":{icon:"🇫🇮",name:"Finnish"},"en-US":{icon:"🇺🇸",name:"English"}},be=["Catalyst Game Labs","Cliffhanger Productions","FASA Corporation","Fantasy Productions","Harebrained Schemes","Pegasus Spiele","WizKids Games","Heyne Verlag","Other","Unofficial"],ye={novel:{icon:"📚",name:"Novel"},sourcebook:{icon:"📜",name:"Sourcebook"},mission:{icon:"🗺️",name:"Mission"},rulebook:{icon:"📝",name:"Rulebook"},misc:{icon:"🔣",name:"Misc."},magazine:{icon:"📰",name:"Magazine"},boardgame:{icon:"♟️",name:"Boardgame"},videogame:{icon:"🎮",name:"Videogame"},tcg:{icon:"🃏",name:"T.C.G."},unofficial:{icon:"📓",name:"Unofficial"}},we={digital:{icon:"💽",name:"Digital"},scan:{icon:"📠",name:"Scan"},ocr:{icon:"💾",name:"OCR"},print:{icon:"🖨️",name:"Print"},physical:{icon:"🎲",name:"Physical"}},$e={ok:{icon:"✅",name:"OK"},missing:{icon:"❌",name:"Missing"},outofscope:{icon:"⛔",name:"Out of scope"},canceled:{icon:"🚫",name:"Canceled"}};async function St(){try{const e=await fetch(fi);if(e.ok)return(await e.json()).items}catch(e){console.error("Failed to load data.",e)}return[]}async function Qe(){const e=await R("items"),t=await St(),i=new Map;for(const s of e)i.set(s.sku[0],s);for(const s of t)i.set(s.sku[0],s);return await yt("items",[...i.entries()]),[...i.values()]}function Ft(e){function t(a){const p=(Array.isArray(a)?a:[]).filter(O=>O).map(O=>O.toString());return[...new Set(p)]}function i(a,r,o){const p=a?.toString()??"";return Object.keys(r).includes(p)?p:o}const s={name:e.name?.toString()??"",description:e.description?.toString()??"",notes:e.notes?.toString()??"",edition:Number.parseInt(e.edition?.toString()??"0"),gameDate:/^\d{4}-\d{2}$/iu.test(e.gameDate?.toString()??"")?e.gameDate?.toString():"",category:i(e.category,ye,""),status:i(e.status,$e,"missing"),type:i(e.type,we,""),publisher:t(e.publisher).filter(a=>be.includes(a)),sku:t(e.sku),originalLanguage:i(e.originalLanguage,N,""),releaseDate:t(e.releaseDate)};if(e.names!==null&&typeof e.names=="object"){s.names={};for(const[a,r]of Object.entries(e.names))/^[a-z]-[A-Z]/u.test(a)&&typeof r=="string"&&(s.names[a]=r)}if(e.links!==null&&typeof e.links=="object"){s.links={};for(const[a,r]of Object.entries(e.links))typeof a=="string"&&typeof r=="string"&&(s.links[a]=r)}return s}async function vi(){const e=pe.createOverlay({title:"Read data file"});try{const[t]=await window.showOpenFilePicker({id:"dataFile",startIn:"downloads",excludeAcceptAllOption:!1,types:[{description:"JSON Files",accept:{"text/json":[".json"]}}]});await E("files",void 0,{filePath:"/data.json",fileName:"data.json",fileExtension:".json",mimeType:"text/json",handler:t,hash:await oi(await(await t.getFile()).arrayBuffer())});const i=await t.getFile(),s=JSON.parse(await i.text());if(!s.items)throw new Error("No items found in data file.");const a=s.items.map(r=>Ft(r));await yt("items",a.map(r=>[r.sku[0],r]))}catch(t){console.error("Failed to open data file.",t)}e.remove()}async function bi(e,t){const{cover:i,files:s,...a}=t;await E("items",e,a);for await(const r of s??[])await He("files","hash",r.hash)||await E("files",void 0,r);if(i)try{const r=await pt(i,{name:`${e}.jpg`});await E("covers",e,r);const o=await pt(i,{referenceWidth:ni,name:`${e}.jpg`});await E("thumbs",e,o)}catch(r){console.error(`Failed to save material for id "${e}".`,r)}}const me={};function xt(e={},t=navigator.language){const i=JSON.stringify({language:t,...e});return me[i]||(me[i]=new Intl.Collator(t,e)),(s,a)=>me[i].compare(s,a)}const ge={};function yi(e,t=navigator.language,i={day:"2-digit",month:"short",timeZone:"UTC",year:"numeric"}){return ge[t]||(ge[t]=new Intl.DateTimeFormat(t,i)),ge[t].format(e)}async function wi(){const e=pe.createOverlay({title:"Export Covers"});try{const t=await window.showDirectoryPicker({id:"coversFolder",startIn:"downloads"}),i=await R("covers");e.total=i.length;for await(const s of i){e.increment(s.name);try{await t.getFileHandle(s.name,{create:!1})}catch{const r=await(await t.getFileHandle(s.name,{create:!0})).createWritable({keepExistingData:!1});await r.truncate(0),await r.write(s),await r.close()}}}catch(t){console.error("Failed to save covers.",t)}e.remove()}async function $i(){const e=pe.createOverlay({title:"Export Thumbnails"});try{const t=await window.showDirectoryPicker({id:"thumbsFolder",startIn:"downloads"}),i=await R("thumbs");e.total=i.length;for await(const s of i){e.increment(s.name);try{await t.getFileHandle(s.name,{create:!1})}catch{const r=await(await t.getFileHandle(s.name,{create:!0})).createWritable({keepExistingData:!1});await r.truncate(0),await r.write(s),await r.close()}}}catch(t){console.error("Failed to save thmbs.",t)}e.remove()}function It(e){const t={sku:e.sku,name:e.name,category:e.category,type:e.type,originalLanguage:e.originalLanguage,...Object.keys(e.names??{}).length>0?{names:e.names}:{},description:e.description,...Object.keys(e.links??{}).length>0?{links:e.links}:{},edition:e.edition,publisher:e.publisher,releaseDate:e.releaseDate,gameDate:e.gameDate,status:e.status};return e.notes&&(t.notes=e.notes),t}async function _i(){const e=pe.createOverlay({title:"Export Data"});try{const t=await R("items");if(t.length>0){const s=await(await window.showSaveFilePicker({id:"dataFile",startIn:"downloads",suggestedName:"data.json",excludeAcceptAllOption:!0,types:[{description:"JSON Files",accept:{"text/json":[".json"]}}]})).createWritable();await s.truncate(0),await s.write(JSON.stringify({$schema:"./data.schema.json",items:t},null,"	")),await s.close()}}catch(t){console.error("Failed to export data file.",t)}e.remove()}async function ki(e){const i=await(await window.showSaveFilePicker({id:"dataFile",startIn:"downloads",suggestedName:`${e.sku[0]}.json`,excludeAcceptAllOption:!0,types:[{description:"JSON Files",accept:{"text/json":[".json"]}}]})).createWritable(),s=It(e);await i.truncate(0),await i.write(JSON.stringify(s,null,"	")),await i.close()}async function Si(e){const t=It(e);await navigator.clipboard.writeText(JSON.stringify(t,null,"	")),alert("Copied to clipboard!")}async function Fi(){const e=await Qe(),t=[],i=[];for await(const s of e){const[a]=s.sku,r=await fe("covers",a),o=await fe("thumbs",a);if(!r)try{(await fetch(`https://madcampos.dev/sdrlog/images/covers/${a}.jpg`,{method:"HEAD"})).ok||t.push(a)}catch{t.push(a)}if(!o)try{(await fetch(`https://madcampos.dev/sdrlog/images/thumbs/${a}.jpg`,{method:"HEAD"})).ok||i.push(a)}catch{i.push(a)}}return{missingCovers:t.sort(),missingThumbs:i.sort()}}async function xi(){const e=await St(),t=new Map,i=[];for(const s of e){const[a]=s.sku;if(t.get(a)){i.push(a);continue}t.set(a,s)}return i.sort()}async function Ii(){const e=await Qe(),t=[],i=[];for await(const s of e){const[a]=s.sku,r=await wt("files","itemId",a);r.length===0&&s.status!=="canceled"&&t.push(a),r.length===0&&s.status==="ok"&&i.push(a)}return{materialsWithMissingFiles:t.sort(),materialsWithOkStatusButMissingFiles:i.sort()}}async function Ci(){const e=await li("items"),t=await R("files"),i=[];for await(const s of t){if(s.handler.kind!=="file")continue;const a=s.itemId;(!a||!e.includes(a))&&i.push(s.filePath)}return i}async function Pi(){const e=await R("files"),t=e.map(a=>a.hash),i=[],s=[];for await(const[a,r]of t.entries())if(!s.includes(r)&&t.indexOf(r)!==a){const p=e.filter(u=>u.hash===r).map(u=>u.filePath);i.push(p),s.push(r)}return i}async function Oi(){const e=await R("files"),t=[],i=[];for await(const s of e){const a=s.itemId;if(!a||i.includes(a))continue;const p=e.filter(u=>u.itemId===a).map(u=>({filePath:u.filePath,...$t(u.filePath.split("/").pop()??"")})).filter(u=>!u.modifier);if(p.length>1){const u=p.map(O=>O.filePath);t.push(u),i.push(a)}}return t}async function Ei(){const e=await xi(),t=await Fi(),i=await Ii(),s=await Ci(),a=await Pi(),r=await Oi();console.log({duplicateIds:e,missingCovers:t,missingFiles:i,extraFiles:s,duplicateFiles:a,duplicateIdFiles:r})}var Ct=Object.defineProperty,Di=Object.getOwnPropertyDescriptor,Ai=(e,t,i)=>t in e?Ct(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,T=(e,t,i,s)=>{for(var a=s>1?void 0:s?Di(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(a=(s?o(t,i,a):o(a))||a);return s&&a&&Ct(t,i,a),a},Ti=(e,t,i)=>(Ai(e,typeof t!="symbol"?t+"":t,i),i),Pt=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},Wi=(e,t,i)=>(Pt(e,t,"read from private field"),i?i.call(e):t.get(e)),Li=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},Ri=(e,t,i,s)=>(Pt(e,t,"write to private field"),s?s.call(e,i):t.set(e,i),i),Q;let S=class extends k{constructor(){super(),Li(this,Q,!1),this.cards=[],this.hidden=!1,this.hasFileSystem=!1,"showOpenFilePicker"in window&&(this.hasFileSystem=!0),this.isDevMode=!1,this.filters=[{icon:"📜",label:"Sourcebooks",filter:"category: sourcebook"},{icon:"📝",label:"Rulebooks",filter:"category: rulebook"},{icon:"🗺️",label:"Adventures & Campaigns",filter:"category: mission"},{icon:"📚",label:"Novels",filter:"category: novel"},{icon:"📰",label:"Magazines",filter:"category: magazine"},{icon:"♟️",label:"Tabletop",filter:"category: boardgame"},{icon:"🃏",label:"Trading Card Game",filter:"category: tcg"},{icon:"🎮",label:"Video Games",filter:"category: videogame"},{icon:"📓",label:"Unofficial",filter:"category: unofficial"},{icon:"🔣",label:"Misc.",filter:"category: misc"},null,{icon:"📚",label:"All",filter:"category: all"}],this.appMenuItems=[{icon:"ℹ️",label:"Tool Information",action:async()=>y.navigate("/info")},{icon:"🌓",label:"Theme Settings",action:async()=>y.navigate("/settings/theme")}],this.fileMenuItems=[null,{icon:"📥",label:"Import Files",action:di},{icon:"📦",label:"Import Data",action:vi},null,{icon:"📂",label:"Import Covers",action:ci},{icon:"🧩",label:"Extract Covers",action:pi},null,{icon:"📤",label:"Export Data",action:_i},{icon:"🎴",label:"Export Thumbnails",action:$i},{icon:"🖼️",label:"Export Covers",action:wi}],this.devMenuItems=[null,{icon:"⛔️",label:"Report Data Inconsistencies",action:Ei},{icon:"💬",label:"Open CBZ reader",action:async()=>y.navigate("/cbz/test")},{icon:"🕹️",label:"Open Emulator",action:async()=>y.navigate("/emulator/test")},{icon:"📖",label:"Open Epub reader",action:async()=>y.navigate("/epub/test")}]}createRenderRoot(){return this}navigate(){this.hidden=!1}shouldUpdate(e){return Wi(this,Q)&&super.shouldUpdate(e)}render(){return n`
			<sdr-menu-bar>
				<sdr-dropdown id="filters" icon="︙" trigger-button="x">
					${this.filters.map(e=>e===null?n`<sdr-dropdown-item separator></sdr-dropdown-item>`:n`
							<sdr-dropdown-item
								icon="${e.icon}"
								@click="${()=>hi.updateSearchResults(e.filter)}"
							>
								${e.label}
							</sdr-dropdown-item>
						`)}
				</sdr-dropdown>

				<sdr-button id="add-material" @click="${async()=>y.navigate("/item")}" icon="➕"></sdr-button>

				<sdr-search-box></sdr-search-box>

				<sdr-dropdown id="app-menu" icon="⚙️" align-right trigger-button="start">
					${this.appMenuItems.map(e=>e===null?n`<sdr-dropdown-item separator></sdr-dropdown-item>`:n`
							<sdr-dropdown-item icon="${e.icon}" @click="${()=>e.action()}">${e.label}</sdr-dropdown-item>`)}

					${this.hasFileSystem?this.fileMenuItems.map(e=>e===null?n`<sdr-dropdown-item separator></sdr-dropdown-item>`:n`
								<sdr-dropdown-item icon="${e.icon}" @click="${()=>e.action()}">${e.label}</sdr-dropdown-item>`):""}

					${this.isDevMode?this.devMenuItems.map(e=>e===null?n`<sdr-dropdown-item separator></sdr-dropdown-item>`:n`
								<sdr-dropdown-item icon="${e.icon}" @click="${()=>e.action()}">${e.label}</sdr-dropdown-item>`):""}
				</sdr-dropdown>
			</sdr-menu-bar>

			<main role="list">
				${this.cards.map(({name:e,category:t,sku:i,type:s,edition:a,status:r})=>n`
					<sdr-card
						id="${i[0]}"
						.sku="${i}"
						name="${e}"
						category="${t}"
						type="${s}"
						edition="${a}"
						status="${r}"
					></sdr-card>
				`)}
			</main>

			<sdr-update-notify></sdr-update-notify>
		`}async connectedCallback(){super.connectedCallback();const e=await Qe(),t=xt(),i=e.sort(({name:s},{name:a})=>t(s,a));for(const[s,a]of i.entries())this.cards.push({name:a.name,category:a.category,sku:a.sku,type:a.type,edition:a.edition,status:a.status}),this.dispatchEvent(new CustomEvent("itemloaded",{bubbles:!0,composed:!0,detail:{item:s,total:i.length,name:a.name}}));Ri(this,Q,!0),this.requestUpdate(),this.dispatchEvent(new CustomEvent("apploaded",{bubbles:!0,composed:!0}))}};Q=new WeakMap;Ti(S,"shadowRootOptions",{...k.shadowRootOptions,delegatesFocus:!0});T([X({type:Array})],S.prototype,"cards",2);T([c()],S.prototype,"hasFileSystem",2);T([c()],S.prototype,"isDevMode",2);T([c()],S.prototype,"filters",2);T([c()],S.prototype,"appMenuItems",2);T([c()],S.prototype,"fileMenuItems",2);T([c()],S.prototype,"devMenuItems",2);S=T([A("sdr-view-main")],S);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mi=e=>(...t)=>({_$litDirective$:e,values:t});let Vi=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,s){this._$Ct=t,this._$AM=i,this._$Ci=s}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const zi={},V=Mi(class extends Vi{constructor(){super(...arguments),this.nt=zi}render(e,t){return t()}update(e,[t,i]){if(Array.isArray(t)){if(Array.isArray(this.nt)&&this.nt.length===t.length&&t.every((s,a)=>s===this.nt[a]))return ht}else if(this.nt===t)return ht;return this.nt=Array.isArray(t)?Array.from(t):t,this.render(t,i)}}),Ni=["image","video","audio","text","application/pdf"],ji={".epub":"/epub",".cbz":"/cbz",".smd":"/emulator",".gen":"/emulator",".img":"/emulator",".bin":"/emulator",".smc":"/emulator",".sfc":"/emulator"};async function Bi(e){const t=ji[e.fileExtension??""];if(t)return y.navigate(`${t}/${e.itemId}`);if(e.handler.kind!=="file"){alert("File not found.");return}await _t(e.handler);const i=await e.handler.getFile();if(!Ni.some(a=>i.type.startsWith(a))){alert(`File type for "${i.name}" not supported.
Try opening it on your file explorer.`);return}const s=URL.createObjectURL(i);return window.open(s,"_blank","noopener,noreferrer")}async function et(e){const{handler:t}=await He("files","itemId",e)??{};if(!t||t.kind!=="file")throw new Error("File does not exist.");return await _t(t),t.getFile()}const Ui="📄",qi=new Map([["application/pdf","📓"],["image","🖼️"],["audio","🔊"],["text","📝"],["video","🎞️"],["application/zip","📦"],["application/epub+zip","📚"]]),Ji=new Map([[".pdf","📓"],[".epub","📚"],[".bin","💾"],[".img","💽"],[".iso","💽"],[".smc","🕹️"],[".smd","🕹️"],[".cbz","💭"],[".apk","🤖"],[".xapk","🤖"],[".doc","🖋️"],[".docx","🖋️"],[".xls","📊"],[".xlsx","📊"],[".ppt","📽️"],[".pptx","📽️"]]);function Ki(e){const t=qi.get(e),i=Ji.get(e);return t??i??Ui}const Zi=`sdr-view-item-details[disabled] .edit-button{display:none}sdr-view-item-details:not([disabled]) .display-button{display:none}sdr-view-item-details #item-content{display:grid;grid-template-columns:clamp(10rem,40%,20rem) 1fr;grid-template-rows:100%;grid-gap:.5rem;grid-template-areas:"image tabs";align-items:start;place-content:start center;height:100%;box-sizing:inherit;overflow:auto;scrollbar-width:thin;scrollbar-color:var(--theme-color) var(--scrollbar-bg)}sdr-view-item-details [slot=title]{--border-color: transparent;--theme-color: var(--accent-color);--small-text: 0}sdr-view-item-details #cover-drop-area{grid-area:image}sdr-view-item-details #cover-drop-area figure{margin:0;padding:0;text-align:center}sdr-view-item-details #cover-drop-area figure img{width:100%;height:100%;object-fit:contain;object-position:center;border-radius:var(--border-radius)}sdr-view-item-details #publisher img{height:1.5rem;max-width:3rem;object-fit:contain}sdr-view-item-details #item-info{display:grid;grid-template-columns:repeat(4,minmax(auto,25%));gap:var(--margin-block);grid-template-rows:repeat(6,auto);grid-template-areas:"sku sku sku sku" "edition category category type" "gamedate gamedate language language" "languages languages languages status" "release release release release" "publisher publisher publisher publisher"}sdr-view-item-details #item-info #sku{grid-area:sku}sdr-view-item-details #item-info #category{grid-area:category}sdr-view-item-details #item-info #type{grid-area:type}sdr-view-item-details #item-info #edition{grid-area:edition}sdr-view-item-details #item-info #originalLanguage{grid-area:language}sdr-view-item-details #item-info #status{grid-area:status}sdr-view-item-details #item-info #gameDate{grid-area:gamedate}sdr-view-item-details #item-info #names{grid-area:languages}sdr-view-item-details #item-info #releaseDate{grid-area:release}sdr-view-item-details #item-info #publisher{grid-area:publisher}@media (max-width: 680px){sdr-view-item-details #item-content{grid-template-columns:1fr;grid-template-rows:10rem 1fr;grid-template-areas:"image" "tabs"}sdr-view-item-details #cover-drop-area figure img{width:fit-content;height:10rem}}
`;var Ot=Object.defineProperty,Gi=Object.getOwnPropertyDescriptor,Hi=(e,t,i)=>t in e?Ot(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,J=(e,t,i,s)=>{for(var a=s>1?void 0:s?Gi(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(a=(s?o(t,i,a):o(a))||a);return s&&a&&Ot(t,i,a),a},Et=(e,t,i)=>(Hi(e,typeof t!="symbol"?t+"":t,i),i),tt=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},Yi=(e,t,i)=>(tt(e,t,"read from private field"),i?i.call(e):t.get(e)),I=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},Xi=(e,t,i,s)=>(tt(e,t,"write to private field"),s?s.call(e,i):t.set(e,i),i),d=(e,t,i)=>(tt(e,t,"access private method"),i),ue,m,v,Z,ee,te,_e,ke,Dt,Se,At,Fe,Tt,xe,Wt,Ie,Lt,Ce,Rt;let F=class extends k{constructor(){super(),I(this,m),I(this,Z),I(this,te),I(this,ke),I(this,Se),I(this,Fe),I(this,xe),I(this,Ie),I(this,Ce),I(this,ue,void 0),this.resetMaterial()}async navigate(e){let t="New Material";return e.params.id&&(this.resetMaterial(),await this.setMaterial(e.params.id),t=this.material.name),"launchQueue"in window&&window.launchQueue.setConsumer(async i=>{this.resetMaterial();for await(const s of i.files)if(s.kind==="file")try{const r=await(await s.getFile()).text(),o=JSON.parse(r);this.material=Ft(o);break}catch(a){console.error(a)}}),this.open=!0,t}resetMaterial(){this.isDisplaying=!1,this.material={category:"",type:"",sku:[],name:"",names:{},description:"",edition:0,publisher:[],gameDate:"",releaseDate:[],status:"",originalLanguage:"",notes:"",links:{}},this.files=[],this.coverUrl=kt}async setMaterial(e){const t=await fe("items",e);t&&(this.isDisplaying=!0,this.material=t,ui(t.sku[0]).then(i=>{this.coverUrl=i}),wt("files","itemId",t.sku[0]).then(i=>{for(const s of i)this.files.push(s)}))}firstUpdated(e){super.firstUpdated(e),this.renderRoot.querySelectorAll("sdr-edit-list").forEach(t=>{t.addEventListener("itemremoved",i=>{d(this,ke,Dt).call(this,i)})})}createRenderRoot(){return this}render(){return n`
			<style>${F.styles}</style>
			<sdr-dialog ?open="${this.open}" @close="${()=>d(this,Ce,Rt).call(this)}">
				<sdr-edit-box slot="title" ?disabled="${this.isDisplaying}" value="${this.material.name}" @input="${e=>d(this,m,v).call(this,e,"name")}" @change="${e=>d(this,m,v).call(this,e,"name")}"></sdr-edit-box>

				<div id="item-content">
					<sdr-drop-area id="cover-drop-area" ?disabled="${this.isDisplaying}" @dropfile="${e=>d(this,Se,At).call(this,e)}">
						<figure>
							<img width="100" height="160" id="cover" decoding="async" loading="lazy" role="presentation" src="${this.coverUrl}" />
						</figure>
					</sdr-drop-area>

					<sdr-tabs id="item-details-tabs">
						<sdr-tab slot="tab">Description</sdr-tab>
						<sdr-tab-panel slot="tabpanel">
							<sdr-textarea id="notes" ?disabled="${this.isDisplaying}" ?hidden="${!this.material.notes}" value="${this.material.notes??""}" @input="${e=>d(this,m,v).call(this,e,"notes")}" @change="${e=>d(this,m,v).call(this,e,"notes")}">
								<span slot="label">Notes</span>
							</sdr-textarea>

							<sdr-textarea id="description" required ?disabled="${this.isDisplaying}" value="${this.material.description}" @input="${e=>d(this,m,v).call(this,e,"description")}" @change="${e=>d(this,m,v).call(this,e,"description")}">
								<span slot="label">Description</span>
							</sdr-textarea>
						</sdr-tab-panel>

						<sdr-tab slot="tab">Info</sdr-tab>
						<sdr-tab-panel slot="tabpanel">
							<div id="item-info">
								<sdr-edit-list id="sku" open ?disabled="${this.isDisplaying}" @itemadded="${e=>d(this,Z,ee).call(this,e,"sku")}">
									<span slot="label">SKU</span>
									<sdr-edit-box slot="input" pattern="^[A-Z0-9](?:-?[A-Z0-9])+$" required></sdr-edit-box>

									${this.material.sku.map(e=>n`
										<sdr-edit-list-item value="${e}">${e}</sdr-edit-list-item>
									`)}
								</sdr-edit-list>

								<sdr-edit-box type="number" min="1" max="6" step="1" required ?disabled="${this.isDisplaying}" value="${this.material.edition}" @input="${e=>d(this,m,v).call(this,e,"edition")}" @change="${e=>d(this,m,v).call(this,e,"edition")}">
									<span slot="label">Edition</span>
								</sdr-edit-box>

								<sdr-select id="category" required ?disabled="${this.isDisplaying}" value="${this.material.category}" @input="${e=>d(this,m,v).call(this,e,"category")}" @change="${e=>d(this,m,v).call(this,e,"category")}">
									<span slot="label">Category</span>

									${V(Object.keys(ye),()=>Object.entries(ye).map(([e,t])=>n`
										<option value="${e}">${t.icon} ${t.name}</option>
									`))}
								</sdr-select>

								<sdr-select id="type" required ?disabled="${this.isDisplaying}" value="${this.material.type}" @input="${e=>d(this,m,v).call(this,e,"type")}" @change="${e=>d(this,m,v).call(this,e,"type")}">
									<span slot="label">Type</span>

									${V(Object.keys(we),()=>Object.entries(we).map(([e,t])=>n`
										<option value="${e}">${t.icon} ${t.name}</option>
									`))}
								</sdr-select>

								<sdr-select id="originalLanguage" required ?disabled="${this.isDisplaying}" value="${this.material.originalLanguage}" @input="${e=>d(this,m,v).call(this,e,"originalLanguage")}" @change="${e=>d(this,m,v).call(this,e,"originalLanguage")}">
									<span slot="label">Original Language</span>

									${V(Object.keys(N),()=>Object.entries(N).map(([e,t])=>n`
										<option value="${e}">${t.icon} ${t.name}</option>
									`))}
								</sdr-select>

								<sdr-edit-list id="releaseDate" open ?disabled="${this.isDisplaying}" @itemadded="${e=>d(this,Z,ee).call(this,e,"releaseDate")}">
									<span slot="label">Release date</span>
									<sdr-edit-box slot="input" type="date" required></sdr-edit-box>

									${this.material.releaseDate?.map(e=>n`
										<sdr-edit-list-item value="${e}">${yi(new Date(e))}</sdr-edit-list-item>
									`)}
								</sdr-edit-list>

								<sdr-select id="status" required ?disabled="${this.isDisplaying}" value="${this.material.status}" @input="${e=>d(this,m,v).call(this,e,"status")}" @change="${e=>d(this,m,v).call(this,e,"status")}">
									<span slot="label">Status</span>

									${V(Object.keys($e),()=>Object.entries($e).map(([e,t])=>n`
										<option value="${e}">${t.icon} ${t.name}</option>
									`))}
								</sdr-select>

								<sdr-edit-box id="gameDate" type="month" required ?disabled="${this.isDisplaying}" value="${this.material.gameDate}" @input="${e=>d(this,m,v).call(this,e,"gameDate")}" @change="${e=>d(this,m,v).call(this,e,"gameDate")}">
									<span slot="label">Game date</span>
								</sdr-edit-box>

								<sdr-edit-list id="names" ?disabled="${this.isDisplaying}" @itemadded="${e=>d(this,te,_e).call(this,e,"names")}">
									<span slot="label">Names published</span>

									<sdr-select slot="input" required>
										${V(Object.keys(N),()=>Object.entries(N).map(([e,t])=>n`
											<option value="${e}">${t.icon} ${t.name}</option>
										`))}
									</sdr-select>
									<sdr-edit-box slot="input" required placeholder="Name"></sdr-edit-box>

									${Object.entries(this.material.names??{}).map(([e,t])=>{const{name:i,icon:s}=N[e];return n`
											<sdr-edit-list-item value="${e}">
												<abbr title="${i}">${s}</abbr>:
												${t}
											</sdr-edit-list-item>
										`})}
								</sdr-edit-list>

								<sdr-edit-list id="publisher" open ?disabled="${this.isDisplaying}" @itemadded="${e=>d(this,Z,ee).call(this,e,"publisher")}">
									<span slot="label">Publisher</span>
									<sdr-select slot="input" required>
										${V(be,()=>be.map(e=>n`
											<option>${e}</option>
										`))}
									</sdr-select>

									${this.material.publisher.map(e=>n`
										<sdr-edit-list-item value="${e}">
											<abbr title="${e}">
												<img alt="${e}" src="${"https://madcampos.dev/sdrlog/"}images/publishers/${e}.png"/>
											</abbr>
										</sdr-edit-list-item>
									`)}
								</sdr-edit-list>
							</div>
						</sdr-tab-panel>

						<sdr-tab slot="tab">Files & Links</sdr-tab>
						<sdr-tab-panel slot="tabpanel" id="files">
							<sdr-edit-list id="files-list" ?disabled="${this.isDisplaying}" @itemadded="${async()=>d(this,Fe,Tt).call(this)}">
								<span slot="label">Files</span>
								<label slot="input">Add a file</label>

								${this.files.map(e=>n`
									<sdr-edit-list-item stretch value="${e.itemId??""}">
										<a href="#" rel="noopener noreferrer" @click="${async t=>d(this,xe,Wt).call(this,t,e.hash)}">
											${Ki(e.fileExtension??e.mimeType??"")} ${e.fileName}${e.fileExtension}
										</a>
									</sdr-edit-list-item>
								`)}
							</sdr-edit-list>

							<sdr-edit-list id="links" ?disabled="${this.isDisplaying}" @itemadded="${e=>d(this,te,_e).call(this,e,"links")}">
								<span slot="label">Online links</span>
								<sdr-edit-box slot="input" type="url" id="link-url" placeholder="URL" required></sdr-edit-box>
								<sdr-edit-box slot="input" type="text" id="link-title" placeholder="Name" required></sdr-edit-box>

								${Object.entries(this.material.links??{}).map(([e,t])=>n`
									<sdr-edit-list-item stretch value=${e}>
										<a href="${e}" rel="noopener noreferrer" target="_blank">${t}</a>
									</sdr-edit-list-item>
								`)}
							</sdr-edit-list>
						</sdr-tab-panel>
					</sdr-tabs>
				</div>

				<sdr-button class="edit-button" slot="footer" icon="❌" @click="${()=>{this.isDisplaying=!this.isDisplaying}}">
					Cancel
				</sdr-button>
				<sdr-button class="display-button" slot="footer" icon="✏️" @click="${()=>{this.isDisplaying=!this.isDisplaying}}">
					Edit
				</sdr-button>
				<sdr-button class="edit-button" slot="footer" icon="💾" @click="${async()=>d(this,Ie,Lt).call(this)}">
					Save
				</sdr-button>
				<sdr-button class="display-button" slot="footer" icon="📥" @click="${async()=>ki(this.material)}">
					Export
				</sdr-button>
				<sdr-button class="display-button" slot="footer" icon="📋" @click="${async()=>Si(this.material)}">
					Copy to clipboard
				</sdr-button>
			</sdr-dialog>
		`}};ue=new WeakMap;m=new WeakSet;v=function(e,t){const i=e.target;this.material[t]=t==="edition"?Number.parseInt(i.value):i.value};Z=new WeakSet;ee=function(e,t){const s=e.target.querySelector("sdr-edit-box, sdr-select");let a="";this.material[t]?.includes(s.value)?a="Item already exists in the list.":s.value===""&&(a="Please fill the field."),s.setCustomValidity(a),s.reportValidity()&&(this.material[t]?.push(s.value),this.requestUpdate("material"))};te=new WeakSet;_e=function(e,t){const i=e.target,[s,a]=i.querySelectorAll("sdr-edit-box, sdr-select");this.material[t]?.[s.value]!==void 0?s.setCustomValidity("Item already exists in the list."):s.value===""&&s.setCustomValidity("Please fill the field."),a.value===""&&a.setCustomValidity("Please fill the field."),s.reportValidity()&&a.reportValidity()&&(this.material[t]={...this.material[t]??{},[s.value]:a.value},this.requestUpdate("material"))};ke=new WeakSet;Dt=function(e){const t=e.detail.value,i=e.target.closest("sdr-edit-list");if(!i)return;const s=this.material[i.id];Array.isArray(s)?s.splice(s.indexOf(t),1):this.material[i.id]=Object.fromEntries(Object.entries(s).filter(([a])=>a!==t)),this.requestUpdate("material")};Se=new WeakSet;At=function(e){const t=e.detail.file;this.coverUrl=kt,this.coverUrl=URL.createObjectURL(t),Xi(this,ue,t)};Fe=new WeakSet;Tt=async function(){if(this.material.sku.length>0){const[e]=await window.showOpenFilePicker({id:"newMaterialFile",startIn:"downloads",excludeAcceptAllOption:!1}),t=await mi(e);this.files.push(t),this.requestUpdate("files")}};xe=new WeakSet;Wt=async function(e,t){e.preventDefault(),e.stopPropagation();const i=await He("files","hash",t);i&&await Bi(i)};Ie=new WeakSet;Lt=async function(){const[e]=this.material.sku;if(e){if(this.isDisplaying=!0,await bi(e,{...this.material,cover:Yi(this,ue),files:this.files}),!document.querySelector(`sdr-card[id="${e}"]`)){const t=new gi({name:this.material.name,id:e,sku:this.material.sku,edition:this.material.edition,category:this.material.category,type:this.material.type,status:this.material.status});document.querySelector("main")?.append(t)}alert(`Item # ${e} saved successfully.`)}};Ce=new WeakSet;Rt=function(){this.open=!1,y.navigate("/")};Et(F,"shadowRootOptions",{...k.shadowRootOptions,delegatesFocus:!0});Et(F,"styles",Ye(Zi));J([X({type:Boolean,reflect:!0,attribute:"disabled"})],F.prototype,"isDisplaying",2);J([c()],F.prototype,"open",2);J([c({hasChanged:(e,t)=>JSON.stringify(t)!==JSON.stringify(e)})],F.prototype,"material",2);J([c()],F.prototype,"files",2);J([c()],F.prototype,"coverUrl",2);F=J([A("sdr-view-item-details")],F);var Qi=Object.defineProperty,ea=Object.getOwnPropertyDescriptor,it=(e,t,i,s)=>{for(var a=s>1?void 0:s?ea(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(a=(s?o(t,i,a):o(a))||a);return s&&a&&Qi(t,i,a),a},ta=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},mt=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},gt=(e,t,i)=>(ta(e,t,"access private method"),i),Pe,Mt,Oe,Vt;let H=class extends k{constructor(){super(),mt(this,Pe),mt(this,Oe),this.open=!1,this.theme="system",Xe("t",()=>{this.open=!this.open}),localStorage.getItem("app-theme")&&(this.theme=localStorage.getItem("app-theme"),document.body.classList.add(`theme-${this.theme}`))}navigate(){return this.open=!0,"Theme Settings"}createRenderRoot(){return this}render(){return n`
		<sdr-dialog id="theme-modal" ?open="${this.open}" @close="${()=>gt(this,Oe,Vt).call(this)}">
			<span slot="title">Theme Settings</span>

			<p>Set the theme for the application:</p>

			<sdr-radio-group
				value="${this.theme}"

				@change="${e=>gt(this,Pe,Mt).call(this,e)}"
			>
				<sdr-radio-item icon="🌓" value="system">
					<span slot="title">System Theme</span>
					<span>Follows the system defined theme.</span>
				</sdr-radio-item>
				<sdr-radio-item icon="🌞" value="light">
					<span slot="title">Light Theme</span>
					<span>Always use a light theme.</span>
				</sdr-radio-item>
				<sdr-radio-item icon="🌚" value="dark">
					<span slot="title">Dark Theme</span>
					<span>Always use a dark theme.</span>
				</sdr-radio-item>
			</sdr-radio-group>
		</sdr-dialog>
		`}};Pe=new WeakSet;Mt=function(e){const t=e.target;localStorage.setItem("app-theme",t.value),[...document.body.classList].filter(s=>s.startsWith("theme-")).forEach(s=>{document.body.classList.remove(s)}),document.body.classList.add(`theme-${t.value}`),this.theme=t.value};Oe=new WeakSet;Vt=function(){this.open=!1,y.navigate("/")};it([c()],H.prototype,"open",2);it([c()],H.prototype,"theme",2);H=it([A("sdr-view-theme-settings")],H);var ia=Object.defineProperty,aa=Object.getOwnPropertyDescriptor,at=(e,t,i,s)=>{for(var a=s>1?void 0:s?aa(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(a=(s?o(t,i,a):o(a))||a);return s&&a&&ia(t,i,a),a},sa=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},ft=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},vt=(e,t,i)=>(sa(e,t,"access private method"),i),Ee,zt,De,Nt;let Y=class extends k{constructor(){super(),ft(this,Ee),ft(this,De),this.open=!1,this.language="en-US",Xe("l",()=>{this.open=!this.open})}navigate(){return this.open=!0,(this.shadowRoot?.querySelector("#language-select")).focus(),"Language Settings"}createRenderRoot(){return this}render(){return n`
			<sdr-dialog id="language-modal" ?open="${this.open}" @close="${()=>vt(this,De,Nt).call(this)}">
				<span slot="title">Language Settings</span>

				<p>Set the language for the application:</p>
				<p><small><strong>Note:</strong> The page will reload after changing the app language.</small></p>

				<sdr-select
					id="language-select"

					.value="${this.language}"

					@change="${async e=>vt(this,Ee,zt).call(this,e)}"
				>
					<span slot="label">App Language</span>

					<option value="en-US">English</option>
					<option value="fr-FR">French</option>
					<option value="pt-BR">Brazilian Portuguese</option>
				</sdr-select>
			</sdr-dialog>
		`}connectedCallback(){super.connectedCallback(),requestAnimationFrame(()=>{this.language=ve.getLanguage()})}};Ee=new WeakSet;zt=async function(e){const t=e.target;t.value!==ve.getLanguage()&&(t.disabled=!0,await ve.setLanguage(t.value),location.reload())};De=new WeakSet;Nt=function(){this.open=!1,y.navigate("/")};at([c()],Y.prototype,"open",2);at([c()],Y.prototype,"language",2);Y=at([A("sdr-view-language-settings")],Y);const ra=`sdr-view-app-info summary h3{display:inline;margin-inline-start:var(--margin-inline)}sdr-view-app-info dt{font-weight:700}sdr-view-app-info code{font-family:ui-monospace,monospace}
`;var jt=Object.defineProperty,oa=Object.getOwnPropertyDescriptor,na=(e,t,i)=>t in e?jt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,Bt=(e,t,i,s)=>{for(var a=s>1?void 0:s?oa(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(a=(s?o(t,i,a):o(a))||a);return s&&a&&jt(t,i,a),a},la=(e,t,i)=>(na(e,typeof t!="symbol"?t+"":t,i),i),da=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},ca=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},pa=(e,t,i)=>(da(e,t,"access private method"),i),Ae,Ut;let q=class extends k{constructor(){super(),ca(this,Ae),this.open=!1,Xe("i",()=>{this.open=!this.open})}navigate(){return this.open=!0,"Information"}createRenderRoot(){return this}render(){return n`
			<style>${q.styles}</style>
			<sdr-dialog ?open="${this.open}" @close="${()=>pa(this,Ae,Ut).call(this)}">
				<span slot="title">Information</span>

				<details open>
					<summary><h3>Collection Organization</h3></summary>
					<p>The material here presented is organized into the following categories:</p>
					<dl>
						<dt>Sourcebooks</dt>
						<dd>These books are a mix of rules and setting. As such, they contain setting information applicable to any edition of the game, and statistics that may need a little updating.</dd>

						<dt>Rulebooks</dt>
						<dd>These books are primarily rules, and tend to be replaced quickly when a new edition of the game is released. They can be difficult to use with other editions.</dd>

						<dt>Adventures & Campaigns</dt>
						<dd>Missions, adventures and campaigns including the <em>Shadowrun Missions</em> seasons and the <em>Enhanced Fiction</em> series.</dd>

						<dt>Novels</dt>
						<dd>The romances written with the Sixth World as a base.</dd>

						<dt>$Magazines</dt>
						<dd>Official (or semi-official) magazines published about the Shadowrun Universe.</dd>

						<dt>Tabletop</dt>
						<dd>Tabletop, boardgames and other physical games.</dd>

						<dt><abbr title="Trade Card Game">T.C.G.</abbr></dt>
						<dd>Trading Card Games based on the Shadowrun universe.</dd>

						<dt>Video Games</dt>
						<dd>Video Games produced based on the Shadowrun universe.</dd>

						<dt>Unofficial</dt>
						<dd>Items that influenced the game and have a historical importance but are not official.</dd>

						<dt>Misc.</dt>
						<dd>Conversion sheets, April's fool jokes and other items that don't go on the other categories.</dd>
					</dl>
				</details>

				<details>
					<summary><h3>Search Options</h3></summary>
					<p>The search is done by tags, which follow the format: <code>tag: term</code>, where tag is one of the listed below.</p>
					<p>The default search is by name, so you don't need the tag for it, but if you use more than one tag for searching you will need to specify the <code>name</code> tag to search by name.</p>

					<h4>Tags list</h4>
					<dl>
						<dt>Name (<code>name</code>)</dt>
						<dd>The name of the material. Also the default search tag, if none is provided it will be used.</dd>

						<dt>Category (<code>category</code>)</dt>
						<dd>The category the material fits in, it is one of the categories listed above.</dd>

						<dt>SKU (<code>sku</code>)</dt>
						<dd>The <abbr title="Stock Keeping Unit">SKU</abbr> of the item, it's used also as an identifier as most of them are unique.</dd>

						<dt>Edition (<code>edition</code>)</dt>
						<dd>The edition of the publication, ranging from <code>1</code> to <code>6</code>.</dd>

						<dt>Type (<code>type</code>)</dt>
						<dd>
							<p>The availability of the material, based on how it is more easely found or it's "best" version is presented.</p>
							<p>It may be one of the following:</p>
							<ul>
								<li><strong>Digital (<code>digital</code>):</strong> It is available in natively digital format.</li>
								<li><strong>Print (<code>print</code>):</strong> It is available in printed format only, not having a scan or a digital version.</li>
								<li><strong>Scan (<code>scan</code>):</strong> It is a scan of a printed material. Usually in a not so good quality, or without OCR/searching.</li>
								<li><strong>OCR (<code>ocr</code>):</strong> An OCR scan of the printed format or searchable PDF, it is usually good quality.</li>
								<li><strong>Physical (<code>physical</code>):</strong> The material is only available in physical format other than a book (set of cards, boardgame, miniatures, etc.) that would not make sense to have it "scanned".</li>
							</ul>
						</dd>

						<dt>Status (<code>status</code>)</dt>
						<dd>
							<p>If the material is in the scope of a digital collection.</p>
							<p>May be one of the following:</p>
							<ul>
								<li><strong>Missing (<code>missing</code>):</strong> The item is missing from the collection.</li>
								<li><strong>Out of scope (<code>outofscope</code>):</strong> The item is either physical, limited edition or unreleased so it's out of the scope of the collection.</li>
								<li><strong>Canceled (<code>canceled</code>):</strong> The item was announced but then canceled. It is kept here for historical reasons.</li>
							</ul>
						</dd>
					</dl>
				</details>

				<details>
					<summary><h3>Material Files naming convension</h3></summary>

					<p>To have a file associated to an item in the collection when using the <em>"Import Files"</em> option the file name have to be in the following convension:
					</p>

					<blockquote>
						<code>sku</code> (<code>modifier</code>) - <code>name</code>.<code>extension</code>
					</blockquote>

					<dl>
						<dt><code>sku</code></dt>
						<dd>The item's first published SKU, it is used as an unique identifier.</dd>

						<dt><code>modifier</code> (optional)</dt>
						<dd>
							<p>One optional modifier to diferentiate this file from the "main" file(s) for this item.</p>
							<p>May be one of the following</p>
							<ul>
								<li><strong>A (attechement)</strong>: An attachement like a map, handout or sound file.</li>
								<li><strong>D (draft)</strong>: An extra draft that is (semi-)official and add content to the main material.</li>
								<li><strong>E (errata)</strong>: An simple errata or revision of the material.</li>
								<li><strong>T (translation)</strong>: An important translation with additional content or with significant differences from the main item.</li>
								<li><strong>X (extra)</strong>: A miscelanious extra to the main item.</li>
							</ul>
						</dd>

						<dt><code>name</code></dt>
						<dd>The item's name.</dd>

						<dt><code>extension</code></dt>
						<dd>The item's file extension.</dd>
					</dl>
				</details>
			</sdr-dialog>
		`}};Ae=new WeakSet;Ut=function(){this.open=!1,y.navigate("/")};la(q,"styles",Ye(ra));Bt([c()],q.prototype,"open",2);q=Bt([A("sdr-view-app-info")],q);const ha=new Map([["png","image/png"],["ttf","font/ttf"],["cfg","text/plain"]]);async function ua(){let e=await ut("emulator");if(e.length===0){const i=await(await fetch("https://madcampos.dev/sdrlog/lib/webretro/bundle.zip")).blob(),s=new File([i],"bundle.zip",{type:"application/zip"});"JSZip"in window||(window.JSZip=(await U(()=>import("./jszip.min-6a70bc42.js").then(r=>r.j),["assets/jszip.min-6a70bc42.js","assets/_commonjs-dynamic-modules-abcdc8f6.js"])).default);const a=await JSZip.loadAsync(s);for await(const r of Object.values(a.files))if(r.dir){const o=new File([r.name],r.name,{type:"application/x+directory"});await E("emulator",r.name,o)}else{const o=await r.async("blob"),p=r.name.split("/").pop()??"",[u]=p.split(".").reverse(),O=new File([o],p,{type:ha.get(u)??"application/octet-stream"});await E("emulator",r.name,O)}e=await ut("emulator")}return e}const ma=`sdr-view-emulator #emulator-wrapper{--gamepad-button-size: calc(var(--button-size) * 1.5);--gap-size: 1rem;--controller-size: calc(var(--gamepad-button-size) * 2 + var(--gap-size));--padding-size: 1rem;display:grid;grid-template-columns:var(--controller-size) 1fr var(--controller-size);grid-template-rows:1fr;grid-template-areas:"controller-left game controller-right";align-items:stretch;width:100%;height:100%;position:relative;overflow:hidden}sdr-view-emulator canvas{position:absolute;z-index:-1;max-width:calc(100% - var(--padding-size));max-height:calc(100% - var(--padding-size));aspect-ratio:4 / 3;object-fit:contain}sdr-view-emulator #game-wrapper{display:grid;margin:auto;aspect-ratio:4 / 3;width:calc(100% - (var(--padding-size) * 2));height:auto;max-height:calc(100vmin - (var(--padding-size) * 2));max-width:calc(100vmax - (var(--controller-size) * 2) - (var(--padding-size) * 4));place-items:center;place-content:stretch;grid-area:game;place-self:center center;position:relative;overflow:hidden}sdr-view-emulator #game-wrapper>*{width:100%;height:100%;grid-area:1 / 1 / -1 / -1;position:absolute}sdr-view-emulator #game-overlay{display:none;place-items:center;background-color:#00000080;backdrop-filter:blur(5px)}sdr-view-emulator[paused] #game-overlay{display:grid}sdr-view-emulator .controller{display:none;justify-content:end;align-self:end;align-items:center;grid-gap:var(--gap-size);box-sizing:border-box;width:100%;min-height:calc(var(--gamepad-button-size) * 4 + var(--gap-size) * 2)}sdr-view-emulator .controller button{background:var(--button-bg, transparent);border:solid var(--border-width) var(--button-border, transparent);border-radius:var(--pill-border-radius);width:var(--gamepad-button-size);height:var(--gamepad-button-size);padding:0;transition:var(--transition);font:inherit;font-size:2rem;user-select:none;text-align:center}sdr-view-emulator .controller button:focus{outline:none}sdr-view-emulator .controller button:active{border-color:var(--button-bg, transparent);background:var(--button-border, transparent)}sdr-view-emulator #left-controller{grid-area:controller-left;justify-self:start;grid-template-columns:1fr;grid-template-rows:1fr 1fr 2fr;grid-template-areas:"select" "start" "dpad"}sdr-view-emulator #right-controller{grid-area:controller-right;justify-self:end;grid-template-columns:1fr 1fr;grid-template-rows:repeat(3,1fr);grid-template-areas:"l r" "x y" "a b"}sdr-view-emulator #button-select{--button-border: silver;--button-bg: dimgray;width:auto;grid-area:select}sdr-view-emulator #button-start{--button-border: silver;--button-bg: dimgray;width:auto;grid-area:start}sdr-view-emulator #bumper-left{--button-border: silver;--button-bg: dimgray;grid-area:l}sdr-view-emulator #bumper-right{--button-border: silver;--button-bg: dimgray;grid-area:r}sdr-view-emulator #button-a{--button-border: limegreen;--button-bg: green;grid-area:a}sdr-view-emulator #button-b{--button-border: red;--button-bg: darkred;grid-area:b}sdr-view-emulator #button-x{--button-border: blue;--button-bg: darkblue;grid-area:x}sdr-view-emulator #button-y{--button-border: blueviolet;--button-bg: purple;grid-area:y}sdr-view-emulator #dpad{grid-area:dpad;position:relative;width:100%;height:100%}@media (orientation: portrait){:host{transform:rotate(90deg)}}@media (pointer: coarse){.controller{display:grid}}
`;var qt=Object.defineProperty,ga=Object.getOwnPropertyDescriptor,fa=(e,t,i)=>t in e?qt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,M=(e,t,i,s)=>{for(var a=s>1?void 0:s?ga(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(a=(s?o(t,i,a):o(a))||a);return s&&a&&qt(t,i,a),a},Jt=(e,t,i)=>(fa(e,typeof t!="symbol"?t+"":t,i),i),st=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},f=(e,t,i)=>(st(e,t,"read from private field"),i?i.call(e):t.get(e)),$=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},rt=(e,t,i,s)=>(st(e,t,"write to private field"),s?s.call(e,i):t.set(e,i),i),l=(e,t,i)=>(st(e,t,"access private method"),i),ie,h,Te,Kt,g,b,We,Zt,le,Le,de,Re,ot,Gt,Me,Ht,Ve,Yt,ae,ze,se,Ne,re,je;const va={select:{key:"Enter",code:"Enter",keyCode:13},start:{key:" ",code:"Space",keyCode:32},leftBumber:{key:"E",code:"KeyE",keyCode:69},rightBumber:{key:"P",code:"KeyP",keyCode:32},up:{key:"ArrowUp",code:"ArrowUp",keyCode:38},down:{key:"ArrowDown",code:"ArrowDown",keyCode:40},left:{key:"ArrowLeft",code:"ArrowLeft",keyCode:37},right:{key:"ArrowRight",code:"ArrowRight",keyCode:39},a:{key:"H",code:"KeyH",keyCode:72},b:{key:"G",code:"KeyG",keyCode:71},x:{key:"Y",code:"KeyY",keyCode:89},y:{key:"T",code:"KeyT",keyCode:84}};let _=class extends k{constructor(){super(),$(this,Te),$(this,g),$(this,We),$(this,le),$(this,de),$(this,ot),$(this,Me),$(this,Ve),$(this,ae),$(this,se),$(this,re),$(this,ie,!1),$(this,h,null),this.open=!1,l(this,re,je).call(this),document.addEventListener("keydown",e=>{const t=["8","9","13","19","27","32","33","34","35","36","42","44","45","91","92","93","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","134","135"];this.loaded&&t.includes(e.code)&&e.preventDefault()},{capture:!1,passive:!0}),document.addEventListener("keydown",e=>{this.loaded&&e.key==="F2"&&l(this,se,Ne).call(this)},{capture:!1,passive:!0}),document.addEventListener("keydown",e=>{this.loaded&&e.key==="F3"&&l(this,ae,ze).call(this)},{capture:!1,passive:!0}),document.addEventListener("keydown",e=>{this.loaded&&e.key==="F4"&&f(this,h)?._cmd_toggle_menu()},{capture:!1,passive:!0}),document.addEventListener("keydown",e=>{this.loaded&&e.key==="Escape"&&(this.paused=!this.paused)}),document.addEventListener("visibilitychange",()=>{const e=document.visibilityState==="visible",t=document.visibilityState==="hidden";this.loaded&&t&&!this.paused&&(this.paused=!0),this.loaded&&e&&this.paused&&(this.paused=!1)},!1)}set paused(e){e?f(this,h)?.pauseMainLoop():f(this,h)?.resumeMainLoop(),rt(this,ie,e)}get paused(){return f(this,ie)}async navigate(e){if(l(this,re,je).call(this),!!e.params.id)return await l(this,Me,Ht).call(this,e.params.id),this.open=!0,"Emulator"}firstUpdated(e){super.firstUpdated(e),l(this,We,Zt).call(this)}createRenderRoot(){return this}render(){return n`
			<style>${_.styles}</style>
			<sdr-dialog ?open="${this.open}" @close="${()=>l(this,Te,Kt).call(this)}">
				<sdr-button icon-button slot="title" @click="${()=>f(this,h)?._cmd_toggle_menu()}">⚙️</sdr-button>
				<hr slot="title">
				<sdr-button icon-button slot="title" @click="${()=>{this.paused=!0}}">⏸️</sdr-button>
				<hr slot="title">
				<sdr-button icon-button slot="title" @click="${()=>l(this,ae,ze).call(this)}">⏮️</sdr-button>
				<sdr-button icon-button slot="title" @click="${()=>l(this,se,Ne).call(this)}">⏭️</sdr-button>
				<hr slot="title">
				<sdr-button icon-button slot="title" @click="${async()=>l(this,Ve,Yt).call(this)}">🖥️</sdr-button>

				<div id="emulator-wrapper">
					<aside class="controller" id="left-controller">
						<button
							id="button-select"

							@pointerup="${()=>l(this,g,b).call(this,"keyup","select")}"
							@pointerdown="${()=>l(this,g,b).call(this,"keydown","select")}"
						>Select</button>
						<button
							id="button-start"

							@pointerup="${()=>l(this,g,b).call(this,"keyup","start")}"
							@pointerdown="${()=>l(this,g,b).call(this,"keydown","start")}"
						>Start</button>
						<div id="dpad"></div>
					</aside>
					<article id="game-wrapper">
						<div id="game-overlay">
							<button
								type="button"
								id="pause-button"

								@click="${()=>{this.paused=!0}}"
							>▶️</button>
						</div>
						<canvas id="game-canvas"></canvas>
					</article>
					<aside class="controller" id="right-controller">
						<button
							id="bumper-left"

							@pointerup="${()=>l(this,g,b).call(this,"keyup","leftBumper")}"
							@pointerdown="${()=>l(this,g,b).call(this,"keydown","leftBumper")}"
						>L</button>
						<button
							id="bumper-right"

							@pointerup="${()=>l(this,g,b).call(this,"keyup","rightBumper")}"
							@pointerdown="${()=>l(this,g,b).call(this,"keydown","rightBumber")}"
						>R</button>
						<button
							id="button-x"

							@pointerup="${()=>l(this,g,b).call(this,"keyup","x")}"
							@pointerdown="${()=>l(this,g,b).call(this,"keydown","x")}"
						>X</button>
						<button
							id="button-y"

							@pointerup="${()=>l(this,g,b).call(this,"keyup","y")}"
							@pointerdown="${()=>l(this,g,b).call(this,"keydown","y")}"
						>Y</button>
						<button
							id="button-a"

							@pointerup="${()=>l(this,g,b).call(this,"keyup","a")}"
							@pointerdown="${()=>l(this,g,b).call(this,"keydown","a")}"
						>A</button>
						<button
							id="button-b"

							@pointerup="${()=>l(this,g,b).call(this,"keyup","b")}"
							@pointerdown="${()=>l(this,g,b).call(this,"keydown","b")}"
						>B</button>
					</aside>
				</div>
			</sdr-dialog>
		`}};ie=new WeakMap;h=new WeakMap;Te=new WeakSet;Kt=function(){this.open=!1,y.navigate("/")};g=new WeakSet;b=function(e,t){this.canvas.dispatchEvent(new KeyboardEvent(e,{bubbles:!0,cancelable:!1,shiftKey:!1,ctrlKey:!1,metaKey:!1,altKey:!1,...va[t]}))};We=new WeakSet;Zt=async function(){const e=(await U(()=>import("./index-9baabb87.js"),[])).default,t=this.dpad,{width:i,height:s}=t.getBoundingClientRect(),a=e.create({zone:t,color:"white",multitouch:!1,position:{top:`${s/2}px`,left:`${i/2}px`},mode:"static",restJoystick:!0,shape:"circle",follow:!1,dynamicPage:!0});let r=null;a.on("move",(o,{direction:p})=>{r=p?.angle??null,r&&l(this,g,b).call(this,"keydown",r)}),a.on("end",()=>{r&&l(this,g,b).call(this,"keyup",r)})};le=new WeakSet;Le=function(){const{width:e,height:t}=this.gameWrapper.getBoundingClientRect();f(this,h)?.setCanvasSize(e,t)};de=new WeakSet;Re=function(e){f(this,h)?.FS.createPath("/",e,!0,!0)};ot=new WeakSet;Gt=async function(){const e="/home/web_user/retroarch/",t=await ua();l(this,de,Re).call(this,e);for await(const[i,s]of t){const a=await s.arrayBuffer();s.type==="application/x+directory"?l(this,de,Re).call(this,`${e}${s.name}`):f(this,h)?.FS.writeFile(`${e}${i}`,new Uint8Array(a))}};Me=new WeakSet;Ht=async function(e){const t=new Map([["GENESIS","genesis_plus_gx"],["SEGA-CD","genesis_plus_gx"],["SNES","snes9x"]]),i=await et(e),{id:s}=$t(i.name),a=t.get(s??"")??"",o=(await U(()=>import(`https://madcampos.dev/sdrlog/lib/webretro/${a}_libretro.js`),[])).default;rt(this,h,o({canvas:this.canvas,onRuntimeInitialized:async()=>{l(this,le,Le).call(this),await l(this,ot,Gt).call(this);const p=await i.arrayBuffer();f(this,h)?.FS.writeFile("/rom.bin",new Uint8Array(p)),f(this,h)?.callMain(f(this,h).arguments),l(this,le,Le).call(this),this.loaded=!0}}))};Ve=new WeakSet;Yt=async function(){document.fullscreenElement?await document.exitFullscreen():await this.requestFullscreen({navigationUI:"hide"})};ae=new WeakSet;ze=function(){f(this,h)?._cmd_load_state()};se=new WeakSet;Ne=function(){f(this,h)?._cmd_savefiles(),f(this,h)?._cmd_save_state(),window.setTimeout(async()=>{const t="/home/web_user/retroarch/userdata/saves/rom.srm",i="/home/web_user/retroarch/userdata/states/rom.state",s=f(this,h)?.FS.stat(t)??{size:0},a=f(this,h)?.FS.stat(i)??{size:0};if(s.size>0&&a.size>0){f(this,h)?.pauseMainLoop();const r=f(this,h)?.FS.readFile(t)??new Uint8Array,o=new File([r],t),p=f(this,h)?.FS.readFile(i)??new Uint8Array,u=new File([p],i);await E("emulator",t,o),await E("emulator",i,u),f(this,h)?.resumeMainLoop()}},1e3)};re=new WeakSet;je=function(){rt(this,h,null),this.loaded=!1};Jt(_,"shadowRootOptions",{...k.shadowRootOptions,delegatesFocus:!0});Jt(_,"styles",Ye(ma));M([X({type:Boolean,reflect:!0})],_.prototype,"loaded",2);M([he("#game-canvas")],_.prototype,"canvas",2);M([he("#game-wrapper")],_.prototype,"gameWrapper",2);M([he("#dpad")],_.prototype,"dpad",2);M([c()],_.prototype,"open",2);M([c()],_.prototype,"paused",1);_=M([A("sdr-view-emulator")],_);const ba="data:text/css;base64,LmRhcmsgewoJYmFja2dyb3VuZDogdmFyKC0tZGFyay1iZy1jb2xvcik7Cgljb2xvcjogdmFyKC0tdGV4dC1jb2xvcik7CgoJZm9udC1mYW1pbHk6ICdTZWdvZSBVSScsIFRhaG9tYSwgR2VuZXZhLCBWZXJkYW5hLCBzYW5zLXNlcmlmOwoJZm9udC1zaXplOiBjYWxjKHZhcigtLWJvZHktdGV4dCkgKiAxLjUpOwoKCS13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7Cn0KCjo6c2VsZWN0aW9uIHsKCWJhY2tncm91bmQtY29sb3I6IHZhcigtLXRoZW1lLWNvbG9yKTsKCWNvbG9yOiB2YXIoLS1kYXJrLWJnLWNvbG9yKTsKfQoKOnJvb3QgYm9keTpub3QoW2hpZGRlbl0pIC5kYXJrIDppcygqLCAqOjphZnRlciwgKjo6YmVmb3JlKSB7Cglmb250LWZhbWlseTogJ1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7Cgljb2xvcjogdmFyKC0tdGV4dC1jb2xvcik7Cn0KCjpyb290IC5kYXJrICo6OmZpcnN0LWxldHRlciB7Cglmb250LWZhbWlseTogJ1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7Cn0K";var ya=Object.defineProperty,wa=Object.getOwnPropertyDescriptor,W=(e,t,i,s)=>{for(var a=s>1?void 0:s?wa(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(a=(s?o(t,i,a):o(a))||a);return s&&a&&ya(t,i,a),a},nt=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},C=(e,t,i)=>(nt(e,t,"read from private field"),i?i.call(e):t.get(e)),K=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},Xt=(e,t,i,s)=>(nt(e,t,"write to private field"),s?s.call(e,i):t.set(e,i),i),j=(e,t,i)=>(nt(e,t,"access private method"),i),w,Be,Qt,ce,Ue,qe,ei,oe,Je;let P=class extends k{constructor(){super(),K(this,Be),K(this,ce),K(this,qe),K(this,oe),K(this,w,void 0),this.open=!1,j(this,oe,Je).call(this)}async showNextPage(){await C(this,w)?.next()}async showPreviousPage(){await C(this,w)?.prev()}async navigate(e){if(j(this,oe,Je).call(this),this.renderArea.innerHTML="",!!e.params.id)return await j(this,qe,ei).call(this,e.params.id),this.open=!0,"Epub Reader"}createRenderRoot(){return this}render(){return n`
			<sdr-dialog ?open=${this.open} @close=${()=>j(this,Be,Qt).call(this)}>
				<sdr-button
					icon-button
					slot="title"
					class="title-menu"
					style="visibility: ${this.previousPageVisibility}"
					@click="${async()=>this.showPreviousPage()}"
				>⏮️</sdr-button>
				<sdr-select
					id="toc"
					slot="title"
					class="title-menu"
					.value="${this.selectedPage}"
					@change="${async e=>C(this,w)?.display(e.target.value)}"
				>
					${this.toc.map(e=>e.subitems?n`
								<optgroup label="${e.label}">
									${e.subitems.map(t=>n`<option value="${t.href}">${t.label}</option>`)}
								</optgroup>
							`:n`<option value="${e.href}">${e.label}</option>`)}
				</sdr-select>
				<sdr-button
					icon-button
					slot="title"
					class="title-menu"
					style="visibility: ${this.nextPageVisibility}"
					@click="${async()=>this.showNextPage()}"
				>⏭️</sdr-button>
				<article id="book">
				</article>
				<div id="load-overlay">
					<progress></progress>
				</div>
			</sdr-dialog>
		`}};w=new WeakMap;Be=new WeakSet;Qt=function(){this.open=!1,y.navigate("/")};ce=new WeakSet;Ue=function(e){this.loaded&&(e.key==="ArrowLeft"&&this.showPreviousPage(),e.key==="ArrowRight"&&this.showNextPage())};qe=new WeakSet;ei=async function(e){const t=await et(e);"JSZip"in window||await U(()=>import("./jszip.min-6a70bc42.js").then(a=>a.j),["assets/jszip.min-6a70bc42.js","assets/_commonjs-dynamic-modules-abcdc8f6.js"]),"ePub"in window||await U(()=>import("./epub.min-2f89b1d8.js").then(a=>a.e),["assets/epub.min-2f89b1d8.js","assets/_commonjs-dynamic-modules-abcdc8f6.js","assets/jszip.min-6a70bc42.js"]);const i=ePub(await t.arrayBuffer()),{toc:s}=await i.loaded.navigation;Xt(this,w,i.renderTo(this.renderArea,{width:"100%",height:"100%",flow:"scrolled-doc"})),C(this,w).themes.register("dark",ba),C(this,w).themes.select("dark"),this.toc=s,C(this,w).on("keyup",a=>j(this,ce,Ue).call(this,a)),document.addEventListener("keyup",a=>j(this,ce,Ue).call(this,a)),C(this,w).on("rendered",a=>{this.selectedPage=a.href}),C(this,w).on("relocated",a=>{a.atEnd?this.nextPageVisibility="hidden":this.nextPageVisibility="visible",a.atStart?this.previousPageVisibility="hidden":this.previousPageVisibility="visible"}),await C(this,w).display(),this.loaded=!0};oe=new WeakSet;Je=function(){this.loaded=!1,this.toc=[],this.selectedPage="",this.nextPageVisibility="hidden",this.previousPageVisibility="hidden",C(this,w)?.destroy(),Xt(this,w,void 0)};W([X({type:Boolean,attribute:"loaded"})],P.prototype,"loaded",2);W([c()],P.prototype,"open",2);W([c()],P.prototype,"toc",2);W([c()],P.prototype,"selectedPage",2);W([c()],P.prototype,"nextPageVisibility",2);W([c()],P.prototype,"previousPageVisibility",2);W([he("#book")],P.prototype,"renderArea",2);P=W([A("sdr-view-epub-reader")],P);var ti=Object.defineProperty,$a=Object.getOwnPropertyDescriptor,_a=(e,t,i)=>t in e?ti(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,L=(e,t,i,s)=>{for(var a=s>1?void 0:s?$a(t,i):t,r=e.length-1,o;r>=0;r--)(o=e[r])&&(a=(s?o(t,i,a):o(a))||a);return s&&a&&ti(t,i,a),a},ka=(e,t,i)=>(_a(e,typeof t!="symbol"?t+"":t,i),i),lt=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},G=(e,t,i)=>(lt(e,t,"read from private field"),i?i.call(e):t.get(e)),z=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},Sa=(e,t,i,s)=>(lt(e,t,"write to private field"),s?s.call(e,i):t.set(e,i),i),B=(e,t,i)=>(lt(e,t,"access private method"),i),D,Ke,ii,dt,ai,ct,si,Ze,ri,ne,Ge;const Fa=xt({ignorePunctuation:!0,numeric:!0}),bt="Default section",xa=new Map([[".png","image/png"],[".apng","image/apng"],[".jpg","image/jpeg"],[".jpeg","image/jpeg"],[".jfif","image/jpeg"],[".pjpeg","image/jpeg"],[".pjp","image/jpeg"],[".avif","image/avif"],[".webp","image/webp"],[".bmp","image/bmp"],[".gif","image/gif"]]);let x=class extends k{constructor(){super(),z(this,Ke),z(this,dt),z(this,ct),z(this,Ze),z(this,ne),z(this,D,void 0),this.open=!1,B(this,ne,Ge).call(this),document.addEventListener("keyup",e=>{this.loaded&&(e.key==="ArrowLeft"&&this.showPreviousPage(),e.key==="ArrowRight"&&this.showNextPage())},!1),window.addEventListener("wheel",e=>{this.loaded&&(e.shiftKey||(e.preventDefault(),this.renderRoot.querySelector("article")?.scrollBy({left:e.deltaY,behavior:"smooth"})))},{capture:!1,passive:!1})}showNextPage(){G(this,D)?.nextElementSibling?.scrollIntoView()}showPreviousPage(){G(this,D)?.previousElementSibling?.scrollIntoView()}async navigate(e){if(B(this,ne,Ge).call(this),!!e.params.id)return await B(this,Ze,ri).call(this,e.params.id),this.open=!0,"Comic Book Reader"}createRenderRoot(){return this}render(){return n`
			<sdr-dialog ?open="${this.open}" @close="${()=>B(this,Ke,ii).call(this)}">
				<sdr-button
					icon-button
					slot="title"
					class="title-menu"
					style="visibility: ${this.previousPageVisibility}"
					@click="${()=>this.showPreviousPage()}"
				>⏮️</sdr-button>
				<sdr-select
					id="toc"
					slot="title"
					class="title-menu"
					.value="${this.selectedPage}"
					@change="${()=>this.renderRoot.querySelector(`[data-folder="${this.selectedPage}"]`)?.scrollIntoView()}"
				>
					${this.toc.map(e=>n`<option>${e}</option>`)}
				</sdr-select>
				<sdr-button
					icon-button
					slot="title"
					class="title-menu"
					style="visibility: ${this.nextPageVisibility}"
					@click="${()=>this.showNextPage()}"
				>⏭️</sdr-button>

				<article id="comic">
					${this.pages.map(e=>n`
						<img src="${e.url}" alt="${e.name}" loading="lazy" decoding="async" data-folder="${e.folder}"/>
					`)}
				</article>

				<div id="comic-book-overlay">
					<progress></progress>
				</div>
			</sdr-dialog>
		`}};D=new WeakMap;Ke=new WeakSet;ii=function(){this.open=!1,y.navigate("/")};dt=new WeakSet;ai=function([e]){Sa(this,D,e.target),G(this,D).previousElementSibling?this.previousPageVisibility="visible":this.previousPageVisibility="hidden",G(this,D).nextElementSibling?this.nextPageVisibility="visible":this.nextPageVisibility="hidden",this.selectedPage=G(this,D).dataset.folder};ct=new WeakSet;si=async function(e){if(!e)return{};"JSZip"in window||await U(()=>import("./jszip.min-6a70bc42.js").then(a=>a.j),["assets/jszip.min-6a70bc42.js","assets/_commonjs-dynamic-modules-abcdc8f6.js"]);const t=await JSZip.loadAsync(e),i={};for await(const a of Object.values(t.files))if(!a.dir){const r=await a.async("blob"),[o,p=bt]=a.name.split("/").reverse(),u=/(?<extension>\.[a-z0-9]{3,})$/u,{extension:O}=u.exec(o)?.groups??{};xa.has(O)&&(p in i||(i[p]=[]),i[p].push({name:o,folder:p,url:URL.createObjectURL(r)}))}return Object.fromEntries(Object.keys(i).sort((a,r)=>r===bt?1:Fa(a,r)).map(a=>[a,i[a]]))};Ze=new WeakSet;ri=async function(e){const t=await et(e),i=await B(this,ct,si).call(this,t);for(const a of Object.keys(i)){this.toc.push(a);for(const r of i[a])this.pages.push(r)}const s=new IntersectionObserver(a=>B(this,dt,ai).call(this,a),{threshold:1});this.renderRoot.querySelectorAll("img").forEach(a=>s.observe(a)),this.loaded=!0,[this.selectedPage]=this.toc,this.renderRoot.querySelector("article img:first-child")?.scrollIntoView()};ne=new WeakSet;Ge=function(){this.loaded=!1,this.selectedPage="",this.toc=[],this.pages=[],this.nextPageVisibility="hidden",this.previousPageVisibility="hidden"};ka(x,"shadowRootOptions",{...k.shadowRootOptions,delegatesFocus:!0});L([X({type:Boolean,reflect:!0})],x.prototype,"loaded",2);L([c()],x.prototype,"open",2);L([c()],x.prototype,"selectedPage",2);L([c()],x.prototype,"pages",2);L([c()],x.prototype,"toc",2);L([c()],x.prototype,"nextPageVisibility",2);L([c()],x.prototype,"previousPageVisibility",2);x=L([A("sdr-view-cbz-reader")],x);y.init({baseUrl:"https://madcampos.dev/sdrlog/",routes:[{path:"/",view:S},{path:"/item/:id?",view:F},{path:"/info",view:q},{path:"/settings/theme",view:H},{path:"/settings/language",view:Y},{path:"/emulator/:id",view:_},{path:"/epub/:id",view:P},{path:"/cbz/:id",view:x}]});
