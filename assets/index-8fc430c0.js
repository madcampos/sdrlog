import{g as F,c as ie,d as j,f as y,h as pe,j as W,p as Y,T as ue,k as V,m as se,n as he,o as ae,s as u,R as p,q as me,u as ge,v as fe,x as n,S as be,t as l,e as E,a as w,w as X,y as oe,r as q,L as Q,z as ye,A as ve,B as we,b as J,C as ee,i as T}from"./search-engine-337e6759.js";import{I18n as R}from"./translations-a98a8f50.js";import{_ as P}from"./index-8427d574.js";import"./gamepad-events-7f4c04b9.js";const $e="https://madcampos.dev/sdrlog/assets/data-eb04b06d.json",O={"de-DE":{icon:"🇩🇪",name:"German"},"fr-FR":{icon:"🇫🇷",name:"French"},"jp-JP":{icon:"🇯🇵",name:"Japanese"},"es-ES":{icon:"🇪🇸",name:"Spanish"},"hu-HU":{icon:"🇭🇺",name:"Hungarian"},"it-IT":{icon:"🇮🇹",name:"Italian"},"pt-BR":{icon:"🇧🇷",name:"Brazilian Portuguese"},"cs-CZ":{icon:"🇨🇿",name:"Czech"},"he-IL":{icon:"🇮🇱",name:"Hebrew"},"pl-PL":{icon:"🇵🇱",name:"Polish"},"fi-FI":{icon:"🇫🇮",name:"Finnish"},"en-US":{icon:"🇺🇸",name:"English"}},z=["Catalyst Game Labs","Cliffhanger Productions","FASA Corporation","Fantasy Productions","Harebrained Schemes","Pegasus Spiele","WizKids Games","Heyne Verlag","Other","Unofficial"],N={novel:{icon:"📚",name:"Novel"},sourcebook:{icon:"📜",name:"Sourcebook"},mission:{icon:"🗺️",name:"Mission"},rulebook:{icon:"📝",name:"Rulebook"},misc:{icon:"🔣",name:"Misc."},magazine:{icon:"📰",name:"Magazine"},boardgame:{icon:"♟️",name:"Boardgame"},videogame:{icon:"🎮",name:"Videogame"},tcg:{icon:"🃏",name:"T.C.G."},unofficial:{icon:"📓",name:"Unofficial"}},U={digital:{icon:"💽",name:"Digital"},scan:{icon:"📠",name:"Scan"},ocr:{icon:"💾",name:"OCR"},print:{icon:"🖨️",name:"Print"},physical:{icon:"🎲",name:"Physical"}},B={ok:{icon:"✅",name:"OK"},missing:{icon:"❌",name:"Missing"},outofscope:{icon:"⛔",name:"Out of scope"},canceled:{icon:"🚫",name:"Canceled"}};async function re(){try{const e=await fetch($e);if(e.ok)return(await e.json()).items}catch(e){console.error("Failed to load data.",e)}return[]}async function K(){const e=await F("items"),t=await re(),s=new Map;for(const a of e)s.set(a.sku[0],a);for(const a of t)s.set(a.sku[0],a);return await ie("items",[...s.entries()]),[...s.values()]}function ne(e){function t(i){const d=(Array.isArray(i)?i:[]).filter(b=>b).map(b=>b.toString());return[...new Set(d)]}function s(i,o,r){const d=i?.toString()??"";return Object.keys(o).includes(d)?d:r}const a={name:e.name?.toString()??"",description:e.description?.toString()??"",notes:e.notes?.toString()??"",edition:Number.parseInt(e.edition?.toString()??"0"),gameDate:/^\d{4}-\d{2}$/iu.test(e.gameDate?.toString()??"")?e.gameDate?.toString():"",category:s(e.category,N,""),status:s(e.status,B,"missing"),type:s(e.type,U,""),publisher:t(e.publisher).filter(i=>z.includes(i)),sku:t(e.sku),originalLanguage:s(e.originalLanguage,O,""),releaseDate:t(e.releaseDate)};if(e.names!==null&&typeof e.names=="object"){a.names={};for(const[i,o]of Object.entries(e.names))/^[a-z]-[A-Z]/u.test(i)&&typeof o=="string"&&(a.names[i]=o)}if(e.links!==null&&typeof e.links=="object"){a.links={};for(const[i,o]of Object.entries(e.links))typeof i=="string"&&typeof o=="string"&&(a.links[i]=o)}return a}async function ke(){const e=j.createOverlay({title:"Read data file"});try{const[t]=await window.showOpenFilePicker({id:"dataFile",startIn:"downloads",excludeAcceptAllOption:!1,types:[{description:"JSON Files",accept:{"text/json":[".json"]}}]});await y("files",void 0,{filePath:"/data.json",fileName:"data.json",fileExtension:".json",mimeType:"text/json",handler:t,hash:await pe(await(await t.getFile()).arrayBuffer())});const s=await t.getFile(),a=JSON.parse(await s.text());if(!a.items)throw new Error("No items found in data file.");const i=a.items.map(o=>ne(o));await ie("items",i.map(o=>[o.sku[0],o]))}catch(t){console.error("Failed to open data file.",t)}e.remove()}async function xe(e,t){const{cover:s,files:a,...i}=t;await y("items",e,i);for await(const o of a??[])await W("files","hash",o.hash)||await y("files",void 0,o);if(s)try{const o=await Y(s,{name:`${e}.jpg`});await y("covers",e,o);const r=await Y(s,{referenceWidth:ue,name:`${e}.jpg`});await y("thumbs",e,r)}catch(o){console.error(`Failed to save material for id "${e}".`,o)}}const L={};function le(e={},t=navigator.language){const s=JSON.stringify({language:t,...e});return L[s]||(L[s]=new Intl.Collator(t,e)),(a,i)=>L[s].compare(a,i)}const M={};function Fe(e,t=navigator.language,s={day:"2-digit",month:"short",timeZone:"UTC",year:"numeric"}){return M[t]||(M[t]=new Intl.DateTimeFormat(t,s)),M[t].format(e)}async function Ie(){const e=j.createOverlay({title:"Export Covers"});try{const t=await window.showDirectoryPicker({id:"coversFolder",startIn:"downloads"}),s=await F("covers");e.total=s.length;for await(const a of s){e.increment(a.name);try{await t.getFileHandle(a.name,{create:!1})}catch{const o=await(await t.getFileHandle(a.name,{create:!0})).createWritable({keepExistingData:!1});await o.truncate(0),await o.write(a),await o.close()}}}catch(t){console.error("Failed to save covers.",t)}e.remove()}async function Se(){const e=j.createOverlay({title:"Export Thumbnails"});try{const t=await window.showDirectoryPicker({id:"thumbsFolder",startIn:"downloads"}),s=await F("thumbs");e.total=s.length;for await(const a of s){e.increment(a.name);try{await t.getFileHandle(a.name,{create:!1})}catch{const o=await(await t.getFileHandle(a.name,{create:!0})).createWritable({keepExistingData:!1});await o.truncate(0),await o.write(a),await o.close()}}}catch(t){console.error("Failed to save thmbs.",t)}e.remove()}function de(e){const t={sku:e.sku,name:e.name,category:e.category,type:e.type,originalLanguage:e.originalLanguage,...Object.keys(e.names??{}).length>0?{names:e.names}:{},description:e.description,...Object.keys(e.links??{}).length>0?{links:e.links}:{},edition:e.edition,publisher:e.publisher,releaseDate:e.releaseDate,gameDate:e.gameDate,status:e.status};return e.notes&&(t.notes=e.notes),t}async function Oe(){const e=j.createOverlay({title:"Export Data"});try{const t=await F("items");if(t.length>0){const a=await(await window.showSaveFilePicker({id:"dataFile",startIn:"downloads",suggestedName:"data.json",excludeAcceptAllOption:!0,types:[{description:"JSON Files",accept:{"text/json":[".json"]}}]})).createWritable();await a.truncate(0),await a.write(JSON.stringify({$schema:"./data.schema.json",items:t},null,"	")),await a.close()}}catch(t){console.error("Failed to export data file.",t)}e.remove()}async function Pe(e){const s=await(await window.showSaveFilePicker({id:"dataFile",startIn:"downloads",suggestedName:`${e.sku[0]}.json`,excludeAcceptAllOption:!0,types:[{description:"JSON Files",accept:{"text/json":[".json"]}}]})).createWritable(),a=de(e);await s.truncate(0),await s.write(JSON.stringify(a,null,"	")),await s.close()}async function _e(e){const t=de(e);await navigator.clipboard.writeText(JSON.stringify(t,null,"	")),alert("Copied to clipboard!")}async function De(){const e=await K(),t=[],s=[];for await(const a of e){const[i]=a.sku,o=await V("covers",i),r=await V("thumbs",i);if(!o)try{(await fetch(`https://madcampos.dev/sdrlog/images/covers/${i}.jpg`,{method:"HEAD"})).ok||t.push(i)}catch{t.push(i)}if(!r)try{(await fetch(`https://madcampos.dev/sdrlog/images/thumbs/${i}.jpg`,{method:"HEAD"})).ok||s.push(i)}catch{s.push(i)}}return{missingCovers:t.sort(),missingThumbs:s.sort()}}async function Ce(){const e=await re(),t=new Map,s=[];for(const a of e){const[i]=a.sku;if(t.get(i)){s.push(i);continue}t.set(i,a)}return s.sort()}async function Ae(){const e=await K(),t=[],s=[];for await(const a of e){const[i]=a.sku,o=await se("files","itemId",i);o.length===0&&a.status!=="canceled"&&t.push(i),o.length===0&&a.status==="ok"&&s.push(i)}return{materialsWithMissingFiles:t.sort(),materialsWithOkStatusButMissingFiles:s.sort()}}async function Ee(){const e=await he("items"),t=await F("files"),s=[];for await(const a of t){if(a.handler.kind!=="file")continue;const i=a.itemId;(!i||!e.includes(i))&&s.push(a.filePath)}return s}async function je(){const e=await F("files"),t=e.map(i=>i.hash),s=[],a=[];for await(const[i,o]of t.entries())if(!a.includes(o)&&t.indexOf(o)!==i){const d=e.filter(c=>c.hash===o).map(c=>c.filePath);s.push(d),a.push(o)}return s}async function Te(){const e=await F("files"),t=[],s=[];for await(const a of e){const i=a.itemId;if(!i||s.includes(i))continue;const d=e.filter(c=>c.itemId===i).map(c=>({filePath:c.filePath,...ae(c.filePath.split("/").pop()??"")})).filter(c=>!c.modifier);if(d.length>1){const c=d.map(b=>b.filePath);t.push(c),s.push(i)}}return t}async function Re(){const e=await Ce(),t=await De(),s=await Ae(),a=await Ee(),i=await je(),o=await Te();console.log({duplicateIds:e,missingCovers:t,missingFiles:s,extraFiles:a,duplicateFiles:i,duplicateIdFiles:o})}var Le=Object.defineProperty,Me=Object.getOwnPropertyDescriptor,$=(e,t,s,a)=>{for(var i=a>1?void 0:a?Me(t,s):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(i=(a?r(t,s,i):r(i))||i);return a&&i&&Le(t,s,i),i};let h=class extends u{static shadowRootOptions={...u.shadowRootOptions,delegatesFocus:!0};#t=!1;constructor(){super(),this.cards=[],this.hidden=!1,this.hasFileSystem=!1,"showOpenFilePicker"in window&&(this.hasFileSystem=!0),this.isDevMode=!1,this.filters=[{icon:"📜",label:"Sourcebooks",filter:"category: sourcebook"},{icon:"📝",label:"Rulebooks",filter:"category: rulebook"},{icon:"🗺️",label:"Adventures & Campaigns",filter:"category: mission"},{icon:"📚",label:"Novels",filter:"category: novel"},{icon:"📰",label:"Magazines",filter:"category: magazine"},{icon:"♟️",label:"Tabletop",filter:"category: boardgame"},{icon:"🃏",label:"Trading Card Game",filter:"category: tcg"},{icon:"🎮",label:"Video Games",filter:"category: videogame"},{icon:"📓",label:"Unofficial",filter:"category: unofficial"},{icon:"🔣",label:"Misc.",filter:"category: misc"},null,{icon:"📚",label:"All",filter:"category: all"}],this.appMenuItems=[{icon:"ℹ️",label:"Tool Information",action:async()=>p.navigate("/info")},{icon:"🌓",label:"Theme Settings",action:async()=>p.navigate("/settings/theme")}],this.fileMenuItems=[null,{icon:"📥",label:"Import Files",action:me},{icon:"📦",label:"Import Data",action:ke},null,{icon:"📂",label:"Import Covers",action:ge},{icon:"🧩",label:"Extract Covers",action:fe},null,{icon:"📤",label:"Export Data",action:Oe},{icon:"🎴",label:"Export Thumbnails",action:Se},{icon:"🖼️",label:"Export Covers",action:Ie}],this.devMenuItems=[null,{icon:"⛔️",label:"Report Data Inconsistencies",action:Re},{icon:"💬",label:"Open CBZ reader",action:async()=>p.navigate("/cbz/test")},{icon:"🕹️",label:"Open Emulator",action:async()=>p.navigate("/emulator/test")},{icon:"📖",label:"Open Epub reader",action:async()=>p.navigate("/epub/test")}]}createRenderRoot(){return this}navigate(){this.hidden=!1}shouldUpdate(e){return this.#t&&super.shouldUpdate(e)}render(){return n`
			<sdr-menu-bar>
				<sdr-dropdown id="filters" icon="︙" trigger-button="x">
					${this.filters.map(e=>e===null?n`<sdr-dropdown-item separator></sdr-dropdown-item>`:n`
							<sdr-dropdown-item
								icon="${e.icon}"
								@click="${()=>be.updateSearchResults(e.filter)}"
							>
								${e.label}
							</sdr-dropdown-item>
						`)}
				</sdr-dropdown>

				<sdr-button id="add-material" @click="${async()=>p.navigate("/item")}" icon="➕"></sdr-button>

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
				${this.cards.map(({name:e,category:t,sku:s,type:a,edition:i,status:o})=>n`
					<sdr-card
						id="${s[0]}"
						.sku="${s}"
						name="${e}"
						category="${t}"
						type="${a}"
						edition="${i}"
						status="${o}"
					></sdr-card>
				`)}
			</main>

			<sdr-update-notify></sdr-update-notify>
		`}async connectedCallback(){super.connectedCallback();const e=await K(),t=le(),s=e.sort(({name:a},{name:i})=>t(a,i));for(const[a,i]of s.entries())this.cards.push({name:i.name,category:i.category,sku:i.sku,type:i.type,edition:i.edition,status:i.status}),this.dispatchEvent(new CustomEvent("itemloaded",{bubbles:!0,composed:!0,detail:{item:a,total:s.length,name:i.name}}));this.#t=!0,this.requestUpdate(),this.dispatchEvent(new CustomEvent("apploaded",{bubbles:!0,composed:!0}))}};$([E({type:Array})],h.prototype,"cards",2);$([l()],h.prototype,"hasFileSystem",2);$([l()],h.prototype,"isDevMode",2);$([l()],h.prototype,"filters",2);$([l()],h.prototype,"appMenuItems",2);$([l()],h.prototype,"fileMenuItems",2);$([l()],h.prototype,"devMenuItems",2);h=$([w("sdr-view-main")],h);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ve=e=>(...t)=>({_$litDirective$:e,values:t});let ze=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,s,a){this._$Ct=t,this._$AM=s,this._$Ci=a}_$AS(t,s){return this.update(t,s)}update(t,s){return this.render(...s)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ne={},S=Ve(class extends ze{constructor(){super(...arguments),this.st=Ne}render(e,t){return t()}update(e,[t,s]){if(Array.isArray(t)){if(Array.isArray(this.st)&&this.st.length===t.length&&t.every((a,i)=>a===this.st[i]))return X}else if(this.st===t)return X;return this.st=Array.isArray(t)?Array.from(t):t,this.render(t,s)}}),Ue=["image","video","audio","text","application/pdf"],Be={".epub":"/epub",".cbz":"/cbz",".smd":"/emulator",".gen":"/emulator",".img":"/emulator",".bin":"/emulator",".smc":"/emulator",".sfc":"/emulator"};async function We(e){const t=Be[e.fileExtension??""];if(t)return p.navigate(`${t}/${e.itemId}`);if(e.handler.kind!=="file"){alert("File not found.");return}await oe(e.handler);const s=await e.handler.getFile();if(!Ue.some(i=>s.type.startsWith(i))){alert(`File type for "${s.name}" not supported.
Try opening it on your file explorer.`);return}const a=URL.createObjectURL(s);return window.open(a,"_blank","noopener,noreferrer")}async function Z(e){const{handler:t}=await W("files","itemId",e)??{};if(!t||t.kind!=="file")throw new Error("File does not exist.");return await oe(t),t.getFile()}const qe="📄",Je=new Map([["application/pdf","📓"],["image","🖼️"],["audio","🔊"],["text","📝"],["video","🎞️"],["application/zip","📦"],["application/epub+zip","📚"]]),Ke=new Map([[".pdf","📓"],[".epub","📚"],[".bin","💾"],[".img","💽"],[".iso","💽"],[".smc","🕹️"],[".smd","🕹️"],[".cbz","💭"],[".apk","🤖"],[".xapk","🤖"],[".doc","🖋️"],[".docx","🖋️"],[".xls","📊"],[".xlsx","📊"],[".ppt","📽️"],[".pptx","📽️"]]);function Ze(e){const t=Je.get(e),s=Ke.get(e);return t??s??qe}const He=`sdr-view-item-details[disabled] .edit-button{display:none}sdr-view-item-details:not([disabled]) .display-button{display:none}sdr-view-item-details #item-content{display:grid;grid-template-columns:clamp(10rem,40%,20rem) 1fr;grid-template-rows:100%;grid-gap:.5rem;grid-template-areas:"image tabs";align-items:start;align-content:start;justify-content:center;height:100%;box-sizing:inherit;overflow:auto;scrollbar-width:thin;scrollbar-color:var(--theme-color) var(--scrollbar-bg)}sdr-view-item-details [slot=title]{--border-color: transparent;--theme-color: var(--accent-color);--small-text: 0}sdr-view-item-details #cover-drop-area{grid-area:image}sdr-view-item-details #cover-drop-area figure{margin:0;padding:0;text-align:center}sdr-view-item-details #cover-drop-area figure img{width:100%;height:100%;object-fit:contain;object-position:center;border-radius:var(--border-radius)}sdr-view-item-details #publisher img{height:1.5rem;max-width:3rem;object-fit:contain}sdr-view-item-details #item-info{display:grid;grid-template-columns:repeat(4,minmax(auto,25%));gap:var(--margin-block);grid-template-rows:repeat(6,auto);grid-template-areas:"sku sku sku sku" "edition category category type" "gamedate gamedate language language" "languages languages languages status" "release release release release" "publisher publisher publisher publisher"}sdr-view-item-details #item-info #sku{grid-area:sku}sdr-view-item-details #item-info #category{grid-area:category}sdr-view-item-details #item-info #type{grid-area:type}sdr-view-item-details #item-info #edition{grid-area:edition}sdr-view-item-details #item-info #originalLanguage{grid-area:language}sdr-view-item-details #item-info #status{grid-area:status}sdr-view-item-details #item-info #gameDate{grid-area:gamedate}sdr-view-item-details #item-info #names{grid-area:languages}sdr-view-item-details #item-info #releaseDate{grid-area:release}sdr-view-item-details #item-info #publisher{grid-area:publisher}@media (max-width: 680px){sdr-view-item-details #item-content{grid-template-columns:1fr;grid-template-rows:10rem 1fr;grid-template-areas:"image" "tabs"}sdr-view-item-details #cover-drop-area figure img{width:fit-content;height:10rem}}
`;var Ge=Object.defineProperty,Ye=Object.getOwnPropertyDescriptor,_=(e,t,s,a)=>{for(var i=a>1?void 0:a?Ye(t,s):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(i=(a?r(t,s,i):r(i))||i);return a&&i&&Ge(t,s,i),i};let v=class extends u{static shadowRootOptions={...u.shadowRootOptions,delegatesFocus:!0};static styles=q(He);#t;constructor(){super(),this.resetMaterial()}#e(e,t){const s=e.target;this.material[t]=t==="edition"?Number.parseInt(s.value):s.value}#s(e,t){const a=e.target.querySelector("sdr-edit-box, sdr-select");let i="";this.material[t]?.includes(a.value)?i="Item already exists in the list.":a.value===""&&(i="Please fill the field."),a.setCustomValidity(i),a.reportValidity()&&(this.material[t]?.push(a.value),this.requestUpdate("material"))}#i(e,t){const s=e.target,[a,i]=s.querySelectorAll("sdr-edit-box, sdr-select");this.material[t]?.[a.value]!==void 0?a.setCustomValidity("Item already exists in the list."):a.value===""&&a.setCustomValidity("Please fill the field."),i.value===""&&i.setCustomValidity("Please fill the field."),a.reportValidity()&&i.reportValidity()&&(this.material[t]={...this.material[t]??{},[a.value]:i.value},this.requestUpdate("material"))}#a(e){const t=e.detail.value,s=e.target.closest("sdr-edit-list");if(!s)return;const a=this.material[s.id];Array.isArray(a)?a.splice(a.indexOf(t),1):this.material[s.id]=Object.fromEntries(Object.entries(a).filter(([i])=>i!==t)),this.requestUpdate("material")}#o(e){const t=e.detail.file;this.coverUrl=Q,this.coverUrl=URL.createObjectURL(t),this.#t=t}async#r(){if(this.material.sku.length>0){const[e]=await window.showOpenFilePicker({id:"newMaterialFile",startIn:"downloads",excludeAcceptAllOption:!1}),t=await ye(e);this.files.push(t),this.requestUpdate("files")}}async#n(e,t){e.preventDefault(),e.stopPropagation();const s=await W("files","hash",t);s&&await We(s)}async#l(){const[e]=this.material.sku;if(e){if(this.isDisplaying=!0,await xe(e,{...this.material,cover:this.#t,files:this.files}),!document.querySelector(`sdr-card[id="${e}"]`)){const t=new ve({name:this.material.name,id:e,sku:this.material.sku,edition:this.material.edition,category:this.material.category,type:this.material.type,status:this.material.status});document.querySelector("main")?.append(t)}alert(`Item # ${e} saved successfully.`)}}#d(){this.open=!1,p.navigate("/")}async navigate(e){let t="New Material";return e.params.id&&(this.resetMaterial(),await this.setMaterial(e.params.id),t=this.material.name),"launchQueue"in window&&window.launchQueue.setConsumer(async s=>{this.resetMaterial();for await(const a of s.files)if(a.kind==="file")try{const o=await(await a.getFile()).text(),r=JSON.parse(o);this.material=ne(r);break}catch(i){console.error(i)}}),this.open=!0,t}resetMaterial(){this.isDisplaying=!1,this.material={category:"",type:"",sku:[],name:"",names:{},description:"",edition:0,publisher:[],gameDate:"",releaseDate:[],status:"",originalLanguage:"",notes:"",links:{}},this.files=[],this.coverUrl=Q}async setMaterial(e){const t=await V("items",e);t&&(this.isDisplaying=!0,this.material=t,we(t.sku[0]).then(s=>{this.coverUrl=s}),se("files","itemId",t.sku[0]).then(s=>{for(const a of s)this.files.push(a)}))}firstUpdated(e){super.firstUpdated(e),this.renderRoot.querySelectorAll("sdr-edit-list").forEach(t=>{t.addEventListener("itemremoved",s=>{this.#a(s)})})}createRenderRoot(){return this}render(){return n`
			<style>${v.styles}</style>
			<sdr-dialog ?open="${this.open}" @close="${()=>this.#d()}">
				<sdr-edit-box slot="title" ?disabled="${this.isDisplaying}" value="${this.material.name}" @input="${e=>this.#e(e,"name")}" @change="${e=>this.#e(e,"name")}"></sdr-edit-box>

				<div id="item-content">
					<sdr-drop-area id="cover-drop-area" ?disabled="${this.isDisplaying}" @dropfile="${e=>this.#o(e)}">
						<figure>
							<img width="100" height="160" id="cover" decoding="async" loading="lazy" role="presentation" src="${this.coverUrl}" />
						</figure>
					</sdr-drop-area>

					<sdr-tabs id="item-details-tabs">
						<sdr-tab slot="tab">Description</sdr-tab>
						<sdr-tab-panel slot="tabpanel">
							<sdr-textarea id="notes" ?disabled="${this.isDisplaying}" ?hidden="${!this.material.notes}" value="${this.material.notes??""}" @input="${e=>this.#e(e,"notes")}" @change="${e=>this.#e(e,"notes")}">
								<span slot="label">Notes</span>
							</sdr-textarea>

							<sdr-textarea id="description" required ?disabled="${this.isDisplaying}" value="${this.material.description}" @input="${e=>this.#e(e,"description")}" @change="${e=>this.#e(e,"description")}">
								<span slot="label">Description</span>
							</sdr-textarea>
						</sdr-tab-panel>

						<sdr-tab slot="tab">Info</sdr-tab>
						<sdr-tab-panel slot="tabpanel">
							<div id="item-info">
								<sdr-edit-list id="sku" open ?disabled="${this.isDisplaying}" @itemadded="${e=>this.#s(e,"sku")}">
									<span slot="label">SKU</span>
									<sdr-edit-box slot="input" pattern="^[A-Z0-9](?:-?[A-Z0-9])+$" required></sdr-edit-box>

									${this.material.sku.map(e=>n`
										<sdr-edit-list-item value="${e}">${e}</sdr-edit-list-item>
									`)}
								</sdr-edit-list>

								<sdr-edit-box type="number" min="1" max="6" step="1" required ?disabled="${this.isDisplaying}" value="${this.material.edition}" @input="${e=>this.#e(e,"edition")}" @change="${e=>this.#e(e,"edition")}">
									<span slot="label">Edition</span>
								</sdr-edit-box>

								<sdr-select id="category" required ?disabled="${this.isDisplaying}" value="${this.material.category}" @input="${e=>this.#e(e,"category")}" @change="${e=>this.#e(e,"category")}">
									<span slot="label">Category</span>

									${S(Object.keys(N),()=>Object.entries(N).map(([e,t])=>n`
										<option value="${e}">${t.icon} ${t.name}</option>
									`))}
								</sdr-select>

								<sdr-select id="type" required ?disabled="${this.isDisplaying}" value="${this.material.type}" @input="${e=>this.#e(e,"type")}" @change="${e=>this.#e(e,"type")}">
									<span slot="label">Type</span>

									${S(Object.keys(U),()=>Object.entries(U).map(([e,t])=>n`
										<option value="${e}">${t.icon} ${t.name}</option>
									`))}
								</sdr-select>

								<sdr-select id="originalLanguage" required ?disabled="${this.isDisplaying}" value="${this.material.originalLanguage}" @input="${e=>this.#e(e,"originalLanguage")}" @change="${e=>this.#e(e,"originalLanguage")}">
									<span slot="label">Original Language</span>

									${S(Object.keys(O),()=>Object.entries(O).map(([e,t])=>n`
										<option value="${e}">${t.icon} ${t.name}</option>
									`))}
								</sdr-select>

								<sdr-edit-list id="releaseDate" open ?disabled="${this.isDisplaying}" @itemadded="${e=>this.#s(e,"releaseDate")}">
									<span slot="label">Release date</span>
									<sdr-edit-box slot="input" type="date" required></sdr-edit-box>

									${this.material.releaseDate?.map(e=>n`
										<sdr-edit-list-item value="${e}">${Fe(new Date(e))}</sdr-edit-list-item>
									`)}
								</sdr-edit-list>

								<sdr-select id="status" required ?disabled="${this.isDisplaying}" value="${this.material.status}" @input="${e=>this.#e(e,"status")}" @change="${e=>this.#e(e,"status")}">
									<span slot="label">Status</span>

									${S(Object.keys(B),()=>Object.entries(B).map(([e,t])=>n`
										<option value="${e}">${t.icon} ${t.name}</option>
									`))}
								</sdr-select>

								<sdr-edit-box id="gameDate" type="month" required ?disabled="${this.isDisplaying}" value="${this.material.gameDate}" @input="${e=>this.#e(e,"gameDate")}" @change="${e=>this.#e(e,"gameDate")}">
									<span slot="label">Game date</span>
								</sdr-edit-box>

								<sdr-edit-list id="names" ?disabled="${this.isDisplaying}" @itemadded="${e=>this.#i(e,"names")}">
									<span slot="label">Names published</span>

									<sdr-select slot="input" required>
										${S(Object.keys(O),()=>Object.entries(O).map(([e,t])=>n`
											<option value="${e}">${t.icon} ${t.name}</option>
										`))}
									</sdr-select>
									<sdr-edit-box slot="input" required placeholder="Name"></sdr-edit-box>

									${Object.entries(this.material.names??{}).map(([e,t])=>{const{name:s,icon:a}=O[e];return n`
											<sdr-edit-list-item value="${e}">
												<abbr title="${s}">${a}</abbr>:
												${t}
											</sdr-edit-list-item>
										`})}
								</sdr-edit-list>

								<sdr-edit-list id="publisher" open ?disabled="${this.isDisplaying}" @itemadded="${e=>this.#s(e,"publisher")}">
									<span slot="label">Publisher</span>
									<sdr-select slot="input" required>
										${S(z,()=>z.map(e=>n`
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
							<sdr-edit-list id="files-list" ?disabled="${this.isDisplaying}" @itemadded="${async()=>this.#r()}">
								<span slot="label">Files</span>
								<label slot="input">Add a file</label>

								${this.files.map(e=>n`
									<sdr-edit-list-item stretch value="${e.itemId??""}">
										<a href="#" rel="noopener noreferrer" @click="${async t=>this.#n(t,e.hash)}">
											${Ze(e.fileExtension??e.mimeType??"")} ${e.fileName}${e.fileExtension}
										</a>
									</sdr-edit-list-item>
								`)}
							</sdr-edit-list>

							<sdr-edit-list id="links" ?disabled="${this.isDisplaying}" @itemadded="${e=>this.#i(e,"links")}">
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
				<sdr-button class="edit-button" slot="footer" icon="💾" @click="${async()=>this.#l()}">
					Save
				</sdr-button>
				<sdr-button class="display-button" slot="footer" icon="📥" @click="${async()=>Pe(this.material)}">
					Export
				</sdr-button>
				<sdr-button class="display-button" slot="footer" icon="📋" @click="${async()=>_e(this.material)}">
					Copy to clipboard
				</sdr-button>
			</sdr-dialog>
		`}};_([E({type:Boolean,reflect:!0,attribute:"disabled"})],v.prototype,"isDisplaying",2);_([l()],v.prototype,"open",2);_([l({hasChanged:(e,t)=>JSON.stringify(t)!==JSON.stringify(e)})],v.prototype,"material",2);_([l()],v.prototype,"files",2);_([l()],v.prototype,"coverUrl",2);v=_([w("sdr-view-item-details")],v);var Xe=Object.defineProperty,Qe=Object.getOwnPropertyDescriptor,H=(e,t,s,a)=>{for(var i=a>1?void 0:a?Qe(t,s):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(i=(a?r(t,s,i):r(i))||i);return a&&i&&Xe(t,s,i),i};let D=class extends u{constructor(){super(),this.open=!1,this.theme="system",J("t",()=>{this.open=!this.open}),localStorage.getItem("app-theme")&&(this.theme=localStorage.getItem("app-theme"),document.body.classList.add(`theme-${this.theme}`))}#t(e){const t=e.target;localStorage.setItem("app-theme",t.value),[...document.body.classList].filter(a=>a.startsWith("theme-")).forEach(a=>{document.body.classList.remove(a)}),document.body.classList.add(`theme-${t.value}`),this.theme=t.value}#e(){this.open=!1,p.navigate("/")}navigate(){return this.open=!0,"Theme Settings"}createRenderRoot(){return this}render(){return n`
		<sdr-dialog id="theme-modal" ?open="${this.open}" @close="${()=>this.#e()}">
			<span slot="title">Theme Settings</span>

			<p>Set the theme for the application:</p>

			<sdr-radio-group
				value="${this.theme}"

				@change="${e=>this.#t(e)}"
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
		`}};H([l()],D.prototype,"open",2);H([l()],D.prototype,"theme",2);D=H([w("sdr-view-theme-settings")],D);var et=Object.defineProperty,tt=Object.getOwnPropertyDescriptor,G=(e,t,s,a)=>{for(var i=a>1?void 0:a?tt(t,s):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(i=(a?r(t,s,i):r(i))||i);return a&&i&&et(t,s,i),i};let C=class extends u{constructor(){super(),this.open=!1,this.language="en-US",J("l",()=>{this.open=!this.open})}async#t(e){const t=e.target;t.value!==R.getLanguage()&&(t.disabled=!0,await R.setLanguage(t.value),location.reload())}#e(){this.open=!1,p.navigate("/")}navigate(){return this.open=!0,(this.shadowRoot?.querySelector("#language-select")).focus(),"Language Settings"}createRenderRoot(){return this}render(){return n`
			<sdr-dialog id="language-modal" ?open="${this.open}" @close="${()=>this.#e()}">
				<span slot="title">Language Settings</span>

				<p>Set the language for the application:</p>
				<p><small><strong>Note:</strong> The page will reload after changing the app language.</small></p>

				<sdr-select
					id="language-select"

					.value="${this.language}"

					@change="${async e=>this.#t(e)}"
				>
					<span slot="label">App Language</span>

					<option value="en-US">English</option>
					<option value="fr-FR">French</option>
					<option value="pt-BR">Brazilian Portuguese</option>
				</sdr-select>
			</sdr-dialog>
		`}connectedCallback(){super.connectedCallback(),requestAnimationFrame(()=>{this.language=R.getLanguage()})}};G([l()],C.prototype,"open",2);G([l()],C.prototype,"language",2);C=G([w("sdr-view-language-settings")],C);const it=`sdr-view-app-info summary h3{display:inline;margin-inline-start:var(--margin-inline)}sdr-view-app-info dt{font-weight:700}sdr-view-app-info code{font-family:ui-monospace,monospace}
`;var st=Object.defineProperty,at=Object.getOwnPropertyDescriptor,ce=(e,t,s,a)=>{for(var i=a>1?void 0:a?at(t,s):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(i=(a?r(t,s,i):r(i))||i);return a&&i&&st(t,s,i),i};let A=class extends u{static styles=q(it);constructor(){super(),this.open=!1,J("i",()=>{this.open=!this.open})}#t(){this.open=!1,p.navigate("/")}navigate(){return this.open=!0,"Information"}createRenderRoot(){return this}render(){return n`
			<style>${A.styles}</style>
			<sdr-dialog ?open="${this.open}" @close="${()=>this.#t()}">
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
		`}};ce([l()],A.prototype,"open",2);A=ce([w("sdr-view-app-info")],A);const ot=new Map([["png","image/png"],["ttf","font/ttf"],["cfg","text/plain"]]);async function rt(){let e=await ee("emulator");if(e.length===0){const s=await(await fetch("https://madcampos.dev/sdrlog/lib/webretro/bundle.zip")).blob(),a=new File([s],"bundle.zip",{type:"application/zip"});"JSZip"in window||(window.JSZip=(await P(()=>import("./jszip.min-62ae0a8e.js").then(o=>o.j),["assets/jszip.min-62ae0a8e.js","assets/_commonjs-dynamic-modules-3f1b5830.js","assets/jszip.min-50baae81.js"])).default);const i=await JSZip.loadAsync(a);for await(const o of Object.values(i.files))if(o.dir){const r=new File([o.name],o.name,{type:"application/x+directory"});await y("emulator",o.name,r)}else{const r=await o.async("blob"),d=o.name.split("/").pop()??"",[c]=d.split(".").reverse(),b=new File([r],d,{type:ot.get(c)??"application/octet-stream"});await y("emulator",o.name,b)}e=await ee("emulator")}return e}const nt=`sdr-view-emulator #emulator-wrapper{--gamepad-button-size: calc(var(--button-size) * 1.5);--gap-size: 1rem;--controller-size: calc(var(--gamepad-button-size) * 2 + var(--gap-size));--padding-size: 1rem;display:grid;grid-template-columns:var(--controller-size) 1fr var(--controller-size);grid-template-rows:1fr;grid-template-areas:"controller-left game controller-right";align-items:stretch;width:100%;height:100%;position:relative;overflow:hidden}sdr-view-emulator canvas{position:absolute;z-index:-1;max-width:calc(100% - var(--padding-size));max-height:calc(100% - var(--padding-size));aspect-ratio:4 / 3;object-fit:contain}sdr-view-emulator #game-wrapper{display:grid;margin:auto;aspect-ratio:4 / 3;width:calc(100% - (var(--padding-size) * 2));height:auto;max-height:calc(100vmin - (var(--padding-size) * 2));max-width:calc(100vmax - (var(--controller-size) * 2) - (var(--padding-size) * 4));place-items:center;place-content:stretch;grid-area:game;align-self:center;justify-self:center;position:relative;overflow:hidden}sdr-view-emulator #game-wrapper>*{width:100%;height:100%;grid-area:1 / 1 / -1 / -1;position:absolute}sdr-view-emulator #game-overlay{display:none;place-items:center;background-color:#00000080;backdrop-filter:blur(5px)}sdr-view-emulator[paused] #game-overlay{display:grid}sdr-view-emulator .controller{display:none;justify-content:end;align-self:end;align-items:center;grid-gap:var(--gap-size);box-sizing:border-box;width:100%;min-height:calc(var(--gamepad-button-size) * 4 + var(--gap-size) * 2)}sdr-view-emulator .controller button{background:var(--button-bg, transparent);border:solid var(--border-width) var(--button-border, transparent);border-radius:var(--pill-border-radius);width:var(--gamepad-button-size);height:var(--gamepad-button-size);padding:0;transition:var(--transition);font:inherit;font-size:2rem;user-select:none;text-align:center}sdr-view-emulator .controller button:focus{outline:none}sdr-view-emulator .controller button:active{border-color:var(--button-bg, transparent);background:var(--button-border, transparent)}sdr-view-emulator #left-controller{grid-area:controller-left;justify-self:start;grid-template-columns:1fr;grid-template-rows:1fr 1fr 2fr;grid-template-areas:"select" "start" "dpad"}sdr-view-emulator #right-controller{grid-area:controller-right;justify-self:end;grid-template-columns:1fr 1fr;grid-template-rows:repeat(3,1fr);grid-template-areas:"l r" "x y" "a b"}sdr-view-emulator #button-select{--button-border: silver;--button-bg: dimgray;width:auto;grid-area:select}sdr-view-emulator #button-start{--button-border: silver;--button-bg: dimgray;width:auto;grid-area:start}sdr-view-emulator #bumper-left{--button-border: silver;--button-bg: dimgray;grid-area:l}sdr-view-emulator #bumper-right{--button-border: silver;--button-bg: dimgray;grid-area:r}sdr-view-emulator #button-a{--button-border: limegreen;--button-bg: green;grid-area:a}sdr-view-emulator #button-b{--button-border: red;--button-bg: darkred;grid-area:b}sdr-view-emulator #button-x{--button-border: blue;--button-bg: darkblue;grid-area:x}sdr-view-emulator #button-y{--button-border: blueviolet;--button-bg: purple;grid-area:y}sdr-view-emulator #dpad{grid-area:dpad;position:relative;width:100%;height:100%}@media (orientation: portrait){:host{transform:rotate(90deg)}}@media (pointer: coarse){.controller{display:grid}}
`;var lt=Object.defineProperty,dt=Object.getOwnPropertyDescriptor,I=(e,t,s,a)=>{for(var i=a>1?void 0:a?dt(t,s):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(i=(a?r(t,s,i):r(i))||i);return a&&i&&lt(t,s,i),i};const ct={select:{key:"Enter",code:"Enter",keyCode:13},start:{key:" ",code:"Space",keyCode:32},leftBumber:{key:"E",code:"KeyE",keyCode:69},rightBumber:{key:"P",code:"KeyP",keyCode:32},up:{key:"ArrowUp",code:"ArrowUp",keyCode:38},down:{key:"ArrowDown",code:"ArrowDown",keyCode:40},left:{key:"ArrowLeft",code:"ArrowLeft",keyCode:37},right:{key:"ArrowRight",code:"ArrowRight",keyCode:39},a:{key:"H",code:"KeyH",keyCode:72},b:{key:"G",code:"KeyG",keyCode:71},x:{key:"Y",code:"KeyY",keyCode:89},y:{key:"T",code:"KeyT",keyCode:84}};let m=class extends u{static shadowRootOptions={...u.shadowRootOptions,delegatesFocus:!0};static styles=q(nt);set paused(e){e?this.#e?.pauseMainLoop():this.#e?.resumeMainLoop(),this.#t=e}get paused(){return this.#t}#t=!1;#e=null;constructor(){super(),this.open=!1,this.#u(),document.addEventListener("keydown",e=>{const t=["8","9","13","19","27","32","33","34","35","36","42","44","45","91","92","93","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","134","135"];this.loaded&&t.includes(e.code)&&e.preventDefault()},{capture:!1,passive:!0}),document.addEventListener("keydown",e=>{this.loaded&&e.key==="F2"&&this.#p()},{capture:!1,passive:!0}),document.addEventListener("keydown",e=>{this.loaded&&e.key==="F3"&&this.#c()},{capture:!1,passive:!0}),document.addEventListener("keydown",e=>{this.loaded&&e.key==="F4"&&this.#e?._cmd_toggle_menu()},{capture:!1,passive:!0}),document.addEventListener("keydown",e=>{this.loaded&&e.key==="Escape"&&(this.paused=!this.paused)}),document.addEventListener("visibilitychange",()=>{const e=document.visibilityState==="visible",t=document.visibilityState==="hidden";this.loaded&&t&&!this.paused&&(this.paused=!0),this.loaded&&e&&this.paused&&(this.paused=!1)},!1)}#s(){this.open=!1,p.navigate("/")}#i(e,t){this.canvas.dispatchEvent(new KeyboardEvent(e,{bubbles:!0,cancelable:!1,shiftKey:!1,ctrlKey:!1,metaKey:!1,altKey:!1,...ct[t]}))}async#a(){const e=(await P(()=>import("./index-9baabb87.js"),[])).default,t=this.dpad,{width:s,height:a}=t.getBoundingClientRect(),i=e.create({zone:t,color:"white",multitouch:!1,position:{top:`${a/2}px`,left:`${s/2}px`},mode:"static",restJoystick:!0,shape:"circle",follow:!1,dynamicPage:!0});let o=null;i.on("move",(r,{direction:d})=>{o=d?.angle??null,o&&this.#i("keydown",o)}),i.on("end",()=>{o&&this.#i("keyup",o)})}#o(){const{width:e,height:t}=this.gameWrapper.getBoundingClientRect();this.#e?.setCanvasSize(e,t)}#r(e){this.#e?.FS.createPath("/",e,!0,!0)}async#n(){const e="/home/web_user/retroarch/",t=await rt();this.#r(e);for await(const[s,a]of t){const i=await a.arrayBuffer();a.type==="application/x+directory"?this.#r(`${e}${a.name}`):this.#e?.FS.writeFile(`${e}${s}`,new Uint8Array(i))}}async#l(e){const t=new Map([["GENESIS","genesis_plus_gx"],["SEGA-CD","genesis_plus_gx"],["SNES","snes9x"]]),s=await Z(e),{id:a}=ae(s.name),i=t.get(a??"")??"",r=(await P(()=>import(`https://madcampos.dev/sdrlog/lib/webretro/${i}_libretro.js`),[])).default;this.#e=r({canvas:this.canvas,onRuntimeInitialized:async()=>{this.#o(),await this.#n();const d=await s.arrayBuffer();this.#e?.FS.writeFile("/rom.bin",new Uint8Array(d)),this.#e?.callMain(this.#e.arguments),this.#o(),this.loaded=!0}})}async#d(){document.fullscreenElement?await document.exitFullscreen():await this.requestFullscreen({navigationUI:"hide"})}#c(){this.#e?._cmd_load_state()}#p(){this.#e?._cmd_savefiles(),this.#e?._cmd_save_state(),window.setTimeout(async()=>{const t="/home/web_user/retroarch/userdata/saves/rom.srm",s="/home/web_user/retroarch/userdata/states/rom.state",a=this.#e?.FS.stat(t)??{size:0},i=this.#e?.FS.stat(s)??{size:0};if(a.size>0&&i.size>0){this.#e?.pauseMainLoop();const o=this.#e?.FS.readFile(t)??new Uint8Array,r=new File([o],t),d=this.#e?.FS.readFile(s)??new Uint8Array,c=new File([d],s);await y("emulator",t,r),await y("emulator",s,c),this.#e?.resumeMainLoop()}},1e3)}#u(){this.#e=null,this.loaded=!1}async navigate(e){if(this.#u(),!!e.params.id)return await this.#l(e.params.id),this.open=!0,"Emulator"}firstUpdated(e){super.firstUpdated(e),this.#a()}createRenderRoot(){return this}render(){return n`
			<style>${m.styles}</style>
			<sdr-dialog ?open="${this.open}" @close="${()=>this.#s()}">
				<sdr-button icon-button slot="title" @click="${()=>this.#e?._cmd_toggle_menu()}">⚙️</sdr-button>
				<hr slot="title">
				<sdr-button icon-button slot="title" @click="${()=>{this.paused=!0}}">⏸️</sdr-button>
				<hr slot="title">
				<sdr-button icon-button slot="title" @click="${()=>this.#c()}">⏮️</sdr-button>
				<sdr-button icon-button slot="title" @click="${()=>this.#p()}">⏭️</sdr-button>
				<hr slot="title">
				<sdr-button icon-button slot="title" @click="${async()=>this.#d()}">🖥️</sdr-button>

				<div id="emulator-wrapper">
					<aside class="controller" id="left-controller">
						<button
							id="button-select"

							@pointerup="${()=>this.#i("keyup","select")}"
							@pointerdown="${()=>this.#i("keydown","select")}"
						>Select</button>
						<button
							id="button-start"

							@pointerup="${()=>this.#i("keyup","start")}"
							@pointerdown="${()=>this.#i("keydown","start")}"
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

							@pointerup="${()=>this.#i("keyup","leftBumper")}"
							@pointerdown="${()=>this.#i("keydown","leftBumper")}"
						>L</button>
						<button
							id="bumper-right"

							@pointerup="${()=>this.#i("keyup","rightBumper")}"
							@pointerdown="${()=>this.#i("keydown","rightBumber")}"
						>R</button>
						<button
							id="button-x"

							@pointerup="${()=>this.#i("keyup","x")}"
							@pointerdown="${()=>this.#i("keydown","x")}"
						>X</button>
						<button
							id="button-y"

							@pointerup="${()=>this.#i("keyup","y")}"
							@pointerdown="${()=>this.#i("keydown","y")}"
						>Y</button>
						<button
							id="button-a"

							@pointerup="${()=>this.#i("keyup","a")}"
							@pointerdown="${()=>this.#i("keydown","a")}"
						>A</button>
						<button
							id="button-b"

							@pointerup="${()=>this.#i("keyup","b")}"
							@pointerdown="${()=>this.#i("keydown","b")}"
						>B</button>
					</aside>
				</div>
			</sdr-dialog>
		`}};I([E({type:Boolean,reflect:!0})],m.prototype,"loaded",2);I([T("#game-canvas")],m.prototype,"canvas",2);I([T("#game-wrapper")],m.prototype,"gameWrapper",2);I([T("#dpad")],m.prototype,"dpad",2);I([l()],m.prototype,"open",2);I([l()],m.prototype,"paused",1);m=I([w("sdr-view-emulator")],m);const pt="data:text/css;base64,LmRhcmsgewoJYmFja2dyb3VuZDogdmFyKC0tZGFyay1iZy1jb2xvcik7Cgljb2xvcjogdmFyKC0tdGV4dC1jb2xvcik7CgoJZm9udC1mYW1pbHk6ICdTZWdvZSBVSScsIFRhaG9tYSwgR2VuZXZhLCBWZXJkYW5hLCBzYW5zLXNlcmlmOwoJZm9udC1zaXplOiBjYWxjKHZhcigtLWJvZHktdGV4dCkgKiAxLjUpOwoKCS13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7Cn0KCjo6c2VsZWN0aW9uIHsKCWJhY2tncm91bmQtY29sb3I6IHZhcigtLXRoZW1lLWNvbG9yKTsKCWNvbG9yOiB2YXIoLS1kYXJrLWJnLWNvbG9yKTsKfQoKOnJvb3QgYm9keTpub3QoW2hpZGRlbl0pIC5kYXJrIDppcygqLCAqOjphZnRlciwgKjo6YmVmb3JlKSB7Cglmb250LWZhbWlseTogJ1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7Cgljb2xvcjogdmFyKC0tdGV4dC1jb2xvcik7Cn0KCjpyb290IC5kYXJrICo6OmZpcnN0LWxldHRlciB7Cglmb250LWZhbWlseTogJ1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7Cn0K";var ut=Object.defineProperty,ht=Object.getOwnPropertyDescriptor,k=(e,t,s,a)=>{for(var i=a>1?void 0:a?ht(t,s):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(i=(a?r(t,s,i):r(i))||i);return a&&i&&ut(t,s,i),i};let g=class extends u{#t;constructor(){super(),this.open=!1,this.#a()}#e(){this.open=!1,p.navigate("/")}#s(e){this.loaded&&(e.key==="ArrowLeft"&&this.showPreviousPage(),e.key==="ArrowRight"&&this.showNextPage())}async#i(e){const t=await Z(e);"JSZip"in window||await P(()=>import("./jszip.min-62ae0a8e.js").then(i=>i.j),["assets/jszip.min-62ae0a8e.js","assets/_commonjs-dynamic-modules-3f1b5830.js","assets/jszip.min-50baae81.js"]),"ePub"in window||await P(()=>import("./epub.min-d6186230.js").then(i=>i.e),["assets/epub.min-d6186230.js","assets/_commonjs-dynamic-modules-3f1b5830.js","assets/jszip.min-50baae81.js"]);const s=ePub(await t.arrayBuffer()),{toc:a}=await s.loaded.navigation;this.#t=s.renderTo(this.renderArea,{width:"100%",height:"100%",flow:"scrolled-doc"}),this.#t.themes.register("dark",pt),this.#t.themes.select("dark"),this.toc=a,this.#t.on("keyup",i=>this.#s(i)),document.addEventListener("keyup",i=>this.#s(i)),this.#t.on("rendered",i=>{this.selectedPage=i.href}),this.#t.on("relocated",i=>{i.atEnd?this.nextPageVisibility="hidden":this.nextPageVisibility="visible",i.atStart?this.previousPageVisibility="hidden":this.previousPageVisibility="visible"}),await this.#t.display(),this.loaded=!0}#a(){this.loaded=!1,this.toc=[],this.selectedPage="",this.nextPageVisibility="hidden",this.previousPageVisibility="hidden",this.#t?.destroy(),this.#t=void 0}async showNextPage(){await this.#t?.next()}async showPreviousPage(){await this.#t?.prev()}async navigate(e){if(this.#a(),this.renderArea.innerHTML="",!!e.params.id)return await this.#i(e.params.id),this.open=!0,"Epub Reader"}createRenderRoot(){return this}render(){return n`
			<sdr-dialog ?open=${this.open} @close=${()=>this.#e()}>
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
					@change="${async e=>this.#t?.display(e.target.value)}"
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
		`}};k([E({type:Boolean,attribute:"loaded"})],g.prototype,"loaded",2);k([l()],g.prototype,"open",2);k([l()],g.prototype,"toc",2);k([l()],g.prototype,"selectedPage",2);k([l()],g.prototype,"nextPageVisibility",2);k([l()],g.prototype,"previousPageVisibility",2);k([T("#book")],g.prototype,"renderArea",2);g=k([w("sdr-view-epub-reader")],g);var mt=Object.defineProperty,gt=Object.getOwnPropertyDescriptor,x=(e,t,s,a)=>{for(var i=a>1?void 0:a?gt(t,s):t,o=e.length-1,r;o>=0;o--)(r=e[o])&&(i=(a?r(t,s,i):r(i))||i);return a&&i&&mt(t,s,i),i};const ft=le({ignorePunctuation:!0,numeric:!0}),te="Default section",bt=new Map([[".png","image/png"],[".apng","image/apng"],[".jpg","image/jpeg"],[".jpeg","image/jpeg"],[".jfif","image/jpeg"],[".pjpeg","image/jpeg"],[".pjp","image/jpeg"],[".avif","image/avif"],[".webp","image/webp"],[".bmp","image/bmp"],[".gif","image/gif"]]);let f=class extends u{static shadowRootOptions={...u.shadowRootOptions,delegatesFocus:!0};#t;constructor(){super(),this.open=!1,this.#o(),document.addEventListener("keyup",e=>{this.loaded&&(e.key==="ArrowLeft"&&this.showPreviousPage(),e.key==="ArrowRight"&&this.showNextPage())},!1),window.addEventListener("wheel",e=>{this.loaded&&(e.shiftKey||(e.preventDefault(),this.renderRoot.querySelector("article")?.scrollBy({left:e.deltaY,behavior:"smooth"})))},{capture:!1,passive:!1})}#e(){this.open=!1,p.navigate("/")}#s([e]){this.#t=e.target,this.#t.previousElementSibling?this.previousPageVisibility="visible":this.previousPageVisibility="hidden",this.#t.nextElementSibling?this.nextPageVisibility="visible":this.nextPageVisibility="hidden",this.selectedPage=this.#t.dataset.folder}async#i(e){if(!e)return{};"JSZip"in window||await P(()=>import("./jszip.min-62ae0a8e.js").then(i=>i.j),["assets/jszip.min-62ae0a8e.js","assets/_commonjs-dynamic-modules-3f1b5830.js","assets/jszip.min-50baae81.js"]);const t=await JSZip.loadAsync(e),s={};for await(const i of Object.values(t.files))if(!i.dir){const o=await i.async("blob"),[r,d=te]=i.name.split("/").reverse(),c=/(?<extension>\.[a-z0-9]{3,})$/u,{extension:b}=c.exec(r)?.groups??{};bt.has(b)&&(d in s||(s[d]=[]),s[d].push({name:r,folder:d,url:URL.createObjectURL(o)}))}return Object.fromEntries(Object.keys(s).sort((i,o)=>o===te?1:ft(i,o)).map(i=>[i,s[i]]))}async#a(e){const t=await Z(e),s=await this.#i(t);for(const i of Object.keys(s)){this.toc.push(i);for(const o of s[i])this.pages.push(o)}const a=new IntersectionObserver(i=>this.#s(i),{threshold:1});this.renderRoot.querySelectorAll("img").forEach(i=>a.observe(i)),this.loaded=!0,[this.selectedPage]=this.toc,this.renderRoot.querySelector("article img:first-child")?.scrollIntoView()}#o(){this.loaded=!1,this.selectedPage="",this.toc=[],this.pages=[],this.nextPageVisibility="hidden",this.previousPageVisibility="hidden"}showNextPage(){this.#t?.nextElementSibling?.scrollIntoView()}showPreviousPage(){this.#t?.previousElementSibling?.scrollIntoView()}async navigate(e){if(this.#o(),!!e.params.id)return await this.#a(e.params.id),this.open=!0,"Comic Book Reader"}createRenderRoot(){return this}render(){return n`
			<sdr-dialog ?open="${this.open}" @close="${()=>this.#e()}">
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
		`}};x([E({type:Boolean,reflect:!0})],f.prototype,"loaded",2);x([l()],f.prototype,"open",2);x([l()],f.prototype,"selectedPage",2);x([l()],f.prototype,"pages",2);x([l()],f.prototype,"toc",2);x([l()],f.prototype,"nextPageVisibility",2);x([l()],f.prototype,"previousPageVisibility",2);f=x([w("sdr-view-cbz-reader")],f);p.init({baseUrl:"https://madcampos.dev/sdrlog/",routes:[{path:"/",view:h},{path:"/item/:id?",view:v},{path:"/info",view:A},{path:"/settings/theme",view:D},{path:"/settings/language",view:C},{path:"/emulator/:id",view:m},{path:"/epub/:id",view:g},{path:"/cbz/:id",view:f}]});
