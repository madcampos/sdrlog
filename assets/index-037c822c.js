import{g as k,c as ie,d as T,f as y,h as de,j as z,p as J,T as ce,k as V,m as ae,n as pe,o as se,s as h,R as u,q as ue,u as he,v as me,y as l,S as ge,t as d,e as j,a as w,x as Z,w as oe,r as U,L as H,z as fe,A as be,B as ye,b as B,C as G,i as R}from"./search-engine-5be68fb2.js";import{I18n as a}from"./translations-7061f55f.js";import{_ as O}from"./index-aea20218.js";import"./gamepad-events-7f4c04b9.js";const ve="https://madcampos.dev/sdrlog/assets/data-74ecd8d6.json";async function re(){try{const e=await fetch(ve);if(e.ok)return(await e.json()).items}catch(e){console.error("Failed to load data.",e)}return[]}async function N(){const e=await k("items"),t=await re(),s=new Map;for(const o of e)s.set(o.sku[0],o);for(const o of t)s.set(o.sku[0],o);return await ie("items",[...s.entries()]),[...s.values()]}async function we(){const e=T.createOverlay({title:a.t`Read data file`});try{const[t]=await window.showOpenFilePicker({id:"dataFile",startIn:"downloads",excludeAcceptAllOption:!1,types:[{description:a.t`JSON Files`,accept:{"text/json":[".json"]}}]});await y("files",void 0,{filePath:"/data.json",fileName:"data.json",fileExtension:".json",mimeType:"text/json",handler:t,hash:await de(await(await t.getFile()).arrayBuffer())});const s=await t.getFile(),o=JSON.parse(await s.text());await ie("items",o.items.map(i=>[i.sku[0],i]))}catch(t){console.error("Failed to open data file.",t)}e.remove()}async function $e(e,t){const{cover:s,files:o,...i}=t;await y("items",e,i);for await(const r of o??[])await z("files","hash",r.hash)||await y("files",void 0,r);if(s)try{const r=await J(s);await y("covers",e,r);const n=await J(s,{referenceWidth:ce});await y("thumbs",e,n)}catch(r){console.error(`Failed to save material for id "${e}".`,r)}}const L={};function ne(e={},t=navigator.language){const s=JSON.stringify({language:t,...e});return L[s]||(L[s]=new Intl.Collator(t,e)),(o,i)=>L[s].compare(o,i)}const M={};function xe(e,t=navigator.language,s={day:"2-digit",month:"short",timeZone:"UTC",year:"numeric"}){return M[t]||(M[t]=new Intl.DateTimeFormat(t,s)),M[t].format(e)}async function Fe(){const e=T.createOverlay({title:a.t`Export Covers`});try{const t=await window.showDirectoryPicker({id:"coversFolder",startIn:"downloads"}),s=await k("covers");e.total=s.length;for await(const o of s){e.increment(o.name);try{await t.getFileHandle(o.name,{create:!1})}catch{const r=await(await t.getFileHandle(o.name,{create:!0})).createWritable({keepExistingData:!1});await r.truncate(0),await r.write(o),await r.close()}}}catch(t){console.error("Failed to save covers.",t)}e.remove()}async function ke(){const e=T.createOverlay({title:a.t`Export Thumbnails`});try{const t=await window.showDirectoryPicker({id:"thumbsFolder",startIn:"downloads"}),s=await k("thumbs");e.total=s.length;for await(const o of s){e.increment(o.name);try{await t.getFileHandle(o.name,{create:!1})}catch{const r=await(await t.getFileHandle(o.name,{create:!0})).createWritable({keepExistingData:!1});await r.truncate(0),await r.write(o),await r.close()}}}catch(t){console.error("Failed to save thmbs.",t)}e.remove()}async function Ie(){const e=T.createOverlay({title:a.t`Export Data`});try{const t=await k("items");if(t.length>0){const o=await(await window.showSaveFilePicker({id:"dataFile",startIn:"downloads",suggestedName:"data.json",excludeAcceptAllOption:!0,types:[{description:a.t`JSON Files`,accept:{"text/json":[".json"]}}]})).createWritable();await o.truncate(0),await o.write(JSON.stringify({$schema:"./data.schema.json",items:t},null,"	")),await o.close()}}catch(t){console.error("Failed to export data file.",t)}e.remove()}async function Pe(e){const s=await(await window.showSaveFilePicker({id:"dataFile",startIn:"downloads",suggestedName:`${e.sku[0]}.json`,excludeAcceptAllOption:!0,types:[{description:a.t`JSON Files`,accept:{"text/json":[".json"]}}]})).createWritable();await s.truncate(0),await s.write(JSON.stringify(e,null,"	")),await s.close()}async function Se(){const e=await N(),t=[],s=[];for await(const o of e){const[i]=o.sku,r=await V("covers",i),n=await V("thumbs",i);if(!r)try{(await fetch(`https://madcampos.dev/sdrlog/images/covers/${i}.jpg`,{method:"HEAD"})).ok||t.push(i)}catch{t.push(i)}if(!n)try{(await fetch(`https://madcampos.dev/sdrlog/images/thumbs/${i}.jpg`,{method:"HEAD"})).ok||s.push(i)}catch{s.push(i)}}return{missingCovers:t.sort(),missingThumbs:s.sort()}}async function Oe(){const e=await re(),t=new Map,s=[];for(const o of e){const[i]=o.sku;if(t.get(i)){s.push(i);continue}t.set(i,o)}return s.sort()}async function _e(){const e=await N(),t=[],s=[];for await(const o of e){const[i]=o.sku,r=await ae("files","itemId",i);r.length===0&&o.status!=="canceled"&&t.push(i),r.length===0&&o.status==="ok"&&s.push(i)}return{materialsWithMissingFiles:t.sort(),materialsWithOkStatusButMissingFiles:s.sort()}}async function Ce(){const e=await pe("items"),t=await k("files"),s=[];for await(const o of t){if(o.handler.kind!=="file")continue;const i=o.itemId;(!i||!e.includes(i))&&s.push(o.filePath)}return s}async function De(){const e=await k("files"),t=e.map(i=>i.hash),s=[],o=[];for await(const[i,r]of t.entries())if(!o.includes(r)&&t.indexOf(r)!==i){const c=e.filter(p=>p.hash===r).map(p=>p.filePath);s.push(c),o.push(r)}return s}async function Ee(){const e=await k("files"),t=[],s=[];for await(const o of e){const i=o.itemId;if(!i||s.includes(i))continue;const c=e.filter(p=>p.itemId===i).map(p=>({filePath:p.filePath,...se(p.filePath.split("/").pop()??"")})).filter(p=>!p.modifier);if(c.length>1){const p=c.map(C=>C.filePath);t.push(p),s.push(i)}}return t}async function Ae(){const e=await Oe(),t=await Se(),s=await _e(),o=await Ce(),i=await De(),r=await Ee();console.log({duplicateIds:e,missingCovers:t,missingFiles:s,extraFiles:o,duplicateFiles:i,duplicateIdFiles:r})}var je=Object.defineProperty,Te=Object.getOwnPropertyDescriptor,$=(e,t,s,o)=>{for(var i=o>1?void 0:o?Te(t,s):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(o?n(t,s,i):n(i))||i);return o&&i&&je(t,s,i),i};let m=class extends h{static shadowRootOptions={...h.shadowRootOptions,delegatesFocus:!0};#t=!1;constructor(){super(),this.cards=[],this.hidden=!1,this.hasFileSystem=!1,"showOpenFilePicker"in window&&(this.hasFileSystem=!0),this.isDevMode=!1,this.filters=[{icon:"📜",label:"$t{Sourcebooks}",filter:"category: sourcebook"},{icon:"📝",label:"$t{Rulebooks}",filter:"category: rulebook"},{icon:"🗺️",label:"$t{Adventures & Campaigns}",filter:"category: mission"},{icon:"📚",label:"$t{Novels}",filter:"category: novel"},{icon:"📰",label:"$t{Magazines}",filter:"category: magazine"},{icon:"♟️",label:"$t{Tabletop}",filter:"category: boardgame"},{icon:"🃏",label:"$t{Trading Card Game}",filter:"category: tcg"},{icon:"🎮",label:"$t{Video Games}",filter:"category: videogame"},{icon:"📓",label:"$t{Unofficial}",filter:"category: unofficial"},{icon:"🔣",label:"$t{Misc.}",filter:"category: misc"},null,{icon:"📚",label:"$t{All}",filter:"category: all"}],this.appMenuItems=[{icon:"ℹ️",label:"$t{Tool Information}",action:async()=>u.navigate("/info")},{icon:"💬",label:"$t{Language Settings}",action:async()=>u.navigate("/settings/language")},{icon:"🌓",label:"$t{Theme Settings}",action:async()=>u.navigate("/settings/theme")}],this.fileMenuItems=[null,{icon:"📥",label:"$t{Import Files}",action:ue},{icon:"📦",label:"$t{Import Data}",action:we},null,{icon:"📂",label:"$t{Import Covers}",action:he},{icon:"🧩",label:"$t{Extract Covers}",action:me},null,{icon:"📤",label:"$t{Export Data}",action:Ie},{icon:"🎴",label:"$t{Export Thumbnails}",action:ke},{icon:"🖼️",label:"$t{Export Covers}",action:Fe}],this.devMenuItems=[null,{icon:"⛔️",label:"Report Data Inconsistencies",action:Ae},{icon:"💬",label:"Open CBZ reader",action:async()=>u.navigate("/cbz/test")},{icon:"🕹️",label:"Open Emulator",action:async()=>u.navigate("/emulator/test")},{icon:"📖",label:"Open Epub reader",action:async()=>u.navigate("/epub/test")}]}createRenderRoot(){return this}navigate(){this.hidden=!1}shouldUpdate(e){return this.#t&&super.shouldUpdate(e)}render(){return l`
			<sdr-menu-bar>
				<sdr-dropdown id="filters" icon="︙" trigger-button="x">
					${this.filters.map(e=>e===null?l`<sdr-dropdown-item separator></sdr-dropdown-item>`:l`
							<sdr-dropdown-item
								icon="${e.icon}"
								@click="${()=>ge.updateSearchResults(e.filter)}"
							>
								${e.label}
							</sdr-dropdown-item>
						`)}
				</sdr-dropdown>

				<sdr-button id="add-material" @click="${async()=>u.navigate("/item")}" icon="➕"></sdr-button>

				<sdr-search-box></sdr-search-box>

				<sdr-dropdown id="app-menu" icon="⚙️" align-right trigger-button="start">
					${this.appMenuItems.map(e=>e===null?l`<sdr-dropdown-item separator></sdr-dropdown-item>`:l`
							<sdr-dropdown-item icon="${e.icon}" @click="${()=>e.action()}">${e.label}</sdr-dropdown-item>`)}

					${this.hasFileSystem?this.fileMenuItems.map(e=>e===null?l`<sdr-dropdown-item separator></sdr-dropdown-item>`:l`
								<sdr-dropdown-item icon="${e.icon}" @click="${()=>e.action()}">${e.label}</sdr-dropdown-item>`):""}

					${this.isDevMode?this.devMenuItems.map(e=>e===null?l`<sdr-dropdown-item separator></sdr-dropdown-item>`:l`
								<sdr-dropdown-item icon="${e.icon}" @click="${()=>e.action()}">${e.label}</sdr-dropdown-item>`):""}
				</sdr-dropdown>
			</sdr-menu-bar>

			<main role="list">
				${this.cards.map(({name:e,category:t,sku:s,type:o,edition:i,status:r})=>l`
					<sdr-card
						id="${s[0]}"
						.sku="${s}"
						name="${e}"
						category="${t}"
						type="${o}"
						edition="${i}"
						status="${r}"
					></sdr-card>
				`)}
			</main>

			<sdr-update-notify></sdr-update-notify>
		`}async connectedCallback(){super.connectedCallback();const e=await N(),t=ne(),s=e.sort(({name:o},{name:i})=>t(o,i));for(const[o,i]of s.entries())this.cards.push({name:i.name,category:i.category,sku:i.sku,type:i.type,edition:i.edition,status:i.status}),this.dispatchEvent(new CustomEvent("itemloaded",{bubbles:!0,composed:!0,detail:{item:o,total:s.length,name:i.name}}));this.#t=!0,this.requestUpdate(),this.dispatchEvent(new CustomEvent("apploaded",{bubbles:!0,composed:!0}))}};$([j({type:Array})],m.prototype,"cards",2);$([d()],m.prototype,"hasFileSystem",2);$([d()],m.prototype,"isDevMode",2);$([d()],m.prototype,"filters",2);$([d()],m.prototype,"appMenuItems",2);$([d()],m.prototype,"fileMenuItems",2);$([d()],m.prototype,"devMenuItems",2);m=$([w("sdr-view-main")],m);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Re=e=>(...t)=>({_$litDirective$:e,values:t});let Le=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,s,o){this._$Ct=t,this._$AM=s,this._$Ci=o}_$AS(t,s){return this.update(t,s)}update(t,s){return this.render(...s)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Me={},P=Re(class extends Le{constructor(){super(...arguments),this.ot=Me}render(e,t){return t()}update(e,[t,s]){if(Array.isArray(t)){if(Array.isArray(this.ot)&&this.ot.length===t.length&&t.every((o,i)=>o===this.ot[i]))return Z}else if(this.ot===t)return Z;return this.ot=Array.isArray(t)?Array.from(t):t,this.render(t,s)}}),Ve=["image","video","audio","text","application/pdf"],ze={".epub":"/epub",".cbz":"/cbz",".smd":"/emulator",".gen":"/emulator",".img":"/emulator",".bin":"/emulator",".smc":"/emulator",".sfc":"/emulator"};async function Ue(e){const t=ze[e.fileExtension??""];if(t)return u.navigate(`${t}/${e.itemId}`);if(e.handler.kind!=="file"){alert(`${a.t`File not found.`}`);return}await oe(e.handler);const s=await e.handler.getFile();if(!Ve.some(i=>s.type.startsWith(i))){alert(`${a.t`File type for`} "${s.name}" ${a.t`not supported.\nTry opening it on your file explorer.`}`);return}const o=URL.createObjectURL(s);return window.open(o,"_blank","noopener,noreferrer")}async function W(e){const{handler:t}=await z("files","itemId",e)??{};if(!t||t.kind!=="file")throw new Error(a.t`File does not exist.`);return await oe(t),t.getFile()}const Be="📄",Ne=new Map([["application/pdf","📓"],["image","🖼️"],["audio","🔊"],["text","📝"],["video","🎞️"],["application/zip","📦"],["application/epub+zip","📚"]]),We=new Map([[".pdf","📓"],[".epub","📚"],[".bin","💾"],[".img","💽"],[".iso","💽"],[".smc","🕹️"],[".smd","🕹️"],[".cbz","💭"],[".apk","🤖"],[".xapk","🤖"],[".doc","🖋️"],[".docx","🖋️"],[".xls","📊"],[".xlsx","📊"],[".ppt","📽️"],[".pptx","📽️"]]);function qe(e){const t=Ne.get(e),s=We.get(e);return t??s??Be}const S={"de-DE":{icon:"🇩🇪",name:a.t`German`},"fr-FR":{icon:"🇫🇷",name:a.t`French`},"jp-JP":{icon:"🇯🇵",name:a.t`Japanese`},"es-ES":{icon:"🇪🇸",name:a.t`Spanish`},"hu-HU":{icon:"🇭🇺",name:a.t`Hungarian`},"it-IT":{icon:"🇮🇹",name:a.t`Italian`},"pt-BR":{icon:"🇧🇷",name:a.t`Brazilian Portuguese`},"cs-CZ":{icon:"🇨🇿",name:a.t`Czech`},"he-IL":{icon:"🇮🇱",name:a.t`Hebrew`},"pl-PL":{icon:"🇵🇱",name:a.t`Polish`},"fi-FI":{icon:"🇫🇮",name:a.t`Finnish`},"en-US":{icon:"🇺🇸",name:a.t`English`}},Y=["Catalyst Game Labs","Cliffhanger Productions","FASA Corporation","Fantasy Productions","Harebrained Schemes","Pegasus Spiele","WizKids Games","Heyne Verlag","Other","Unofficial"],X={novel:{icon:"📚",name:a.t`Novel`},sourcebook:{icon:"📜",name:a.t`Sourcebook`},mission:{icon:"🗺️",name:a.t`Mission`},rulebook:{icon:"📝",name:a.t`Rulebook`},misc:{icon:"🔣",name:a.t`Misc.`},magazine:{icon:"📰",name:a.t`Magazine`},boardgame:{icon:"♟️",name:a.t`Boardgame`},videogame:{icon:"🎮",name:a.t`Videogame`},tcg:{icon:"🃏",name:a.t`T.C.G.`},unofficial:{icon:"📓",name:a.t`Unofficial`}},Q={digital:{icon:"💽",name:a.t`Digital`},scan:{icon:"📠",name:a.t`Scan`},ocr:{icon:"💾",name:a.t`OCR`},print:{icon:"🖨️",name:a.t`Print`},physical:{icon:"🎲",name:a.t`Physical`}},ee={ok:{icon:"✅",name:a.t`OK`},missing:{icon:"❌",name:a.t`Missing`},outofscope:{icon:"⛔",name:a.t`Out of scope`},canceled:{icon:"🚫",name:a.t`Canceled`}},Ke=`sdr-view-item-details[disabled] #cancel-button{display:none}sdr-view-item-details[disabled] #save-button{display:none}sdr-view-item-details:not([disabled]) #edit-button{display:none}sdr-view-item-details:not([disabled]) #export-button{display:none}sdr-view-item-details #item-content{display:grid;grid-template-columns:clamp(10rem,40%,20rem) 1fr;grid-template-rows:100%;grid-gap:.5rem;grid-template-areas:"image tabs";align-items:start;align-content:start;justify-content:center;height:100%;box-sizing:inherit;overflow:auto;scrollbar-width:thin;scrollbar-color:var(--theme-color) var(--scrollbar-bg)}sdr-view-item-details [slot=title]{--border-color: transparent;--theme-color: var(--accent-color);--small-text: 0}sdr-view-item-details #cover-drop-area{grid-area:image}sdr-view-item-details #cover-drop-area figure{margin:0;padding:0;text-align:center}sdr-view-item-details #cover-drop-area figure img{width:100%;height:100%;object-fit:contain;object-position:center;border-radius:var(--border-radius)}sdr-view-item-details #publisher img{height:1.5rem;max-width:3rem;object-fit:contain}sdr-view-item-details #item-info{display:grid;grid-template-columns:repeat(4,minmax(auto,25%));gap:var(--margin-block);grid-template-rows:repeat(6,auto);grid-template-areas:"sku sku sku sku" "edition category category type" "gamedate gamedate language language" "languages languages languages status" "release release release release" "publisher publisher publisher publisher"}sdr-view-item-details #item-info #sku{grid-area:sku}sdr-view-item-details #item-info #category{grid-area:category}sdr-view-item-details #item-info #type{grid-area:type}sdr-view-item-details #item-info #edition{grid-area:edition}sdr-view-item-details #item-info #originalLanguage{grid-area:language}sdr-view-item-details #item-info #status{grid-area:status}sdr-view-item-details #item-info #gameDate{grid-area:gamedate}sdr-view-item-details #item-info #names{grid-area:languages}sdr-view-item-details #item-info #releaseDate{grid-area:release}sdr-view-item-details #item-info #publisher{grid-area:publisher}@media (max-width: 680px){sdr-view-item-details #item-content{grid-template-columns:1fr;grid-template-rows:10rem 1fr;grid-template-areas:"image" "tabs"}sdr-view-item-details #cover-drop-area figure img{width:fit-content;height:10rem}}
`;var Je=Object.defineProperty,Ze=Object.getOwnPropertyDescriptor,_=(e,t,s,o)=>{for(var i=o>1?void 0:o?Ze(t,s):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(o?n(t,s,i):n(i))||i);return o&&i&&Je(t,s,i),i};let v=class extends h{static shadowRootOptions={...h.shadowRootOptions,delegatesFocus:!0};static styles=U(Ke);#t;constructor(){super(),this.resetMaterial()}#e(e,t){const s=e.target;this.material[t]=t==="edition"?Number.parseInt(s.value):s.value}#a(e,t){const o=e.target.querySelector("sdr-edit-box, sdr-select");let i="";this.material[t]?.includes(o.value)?i=a.t`Item already exists in the list.`:o.value===""&&(i=a.t`Please fill the field.`),o.setCustomValidity(i),o.reportValidity()&&(this.material[t]?.push(o.value),this.requestUpdate("material"))}#i(e,t){const s=e.target,[o,i]=s.querySelectorAll("sdr-edit-box, sdr-select");this.material[t]?.[o.value]!==void 0?o.setCustomValidity(a.t`Item already exists in the list.`):o.value===""&&o.setCustomValidity(a.t`Please fill the field.`),i.value===""&&i.setCustomValidity(a.t`Please fill the field.`),o.reportValidity()&&i.reportValidity()&&(this.material[t]={...this.material[t]??{},[o.value]:i.value},this.requestUpdate("material"))}#s(e){const t=e.detail.value,s=e.target.closest("sdr-edit-list");if(!s)return;const o=this.material[s.id];Array.isArray(o)?this.material[s.id].splice(this.material[s.id].indexOf(t),1):this.material[s.id]=Object.fromEntries(Object.entries(this.material[s.id]).filter(([i])=>i!==t)),this.requestUpdate("material")}#o(e){const t=e.detail.file;this.coverUrl=H,this.coverUrl=URL.createObjectURL(t)}async#r(){if(this.material.sku.length>0){const[e]=await window.showOpenFilePicker({id:"newMaterialFile",startIn:"downloads",excludeAcceptAllOption:!1}),t=await fe(e);this.files.push(t),this.requestUpdate("files")}}async#n(e,t){e.preventDefault(),e.stopPropagation();const s=await z("files","hash",t);s&&await Ue(s)}async#l(){const[e]=this.material.sku;if(e){if(this.isDisplaying=!0,await $e(e,{...this.material,cover:this.#t,files:this.files}),!document.querySelector(`sdr-card[id="${e}"]`)){const t=new be({name:this.material.name,id:e,sku:this.material.sku,edition:this.material.edition,category:this.material.category,type:this.material.type,status:this.material.status});document.querySelector("main")?.append(t)}alert(`${a.t`Item #`} ${e} ${a.t`saved successfully.`}`)}}#d(){this.open=!1,u.navigate("/")}async navigate(e){let t=a.t`New Material`;return e.params.id&&(this.resetMaterial(),await this.setMaterial(e.params.id),t=this.material.name),this.open=!0,t}resetMaterial(){this.isDisplaying=!1,this.material={category:"",type:"",sku:[],name:"",names:{},description:"",edition:0,publisher:[],gameDate:"",releaseDate:[],status:"",originalLanguage:"",notes:"",links:{}},this.files=[],this.coverUrl=H}async setMaterial(e){const t=await V("items",e);t&&(this.isDisplaying=!0,this.material=t,ye(t.sku[0]).then(s=>{this.coverUrl=s}),ae("files","itemId",t.sku[0]).then(s=>{for(const o of s)this.files.push(o)}))}firstUpdated(e){super.firstUpdated(e),this.renderRoot.querySelectorAll("sdr-edit-list").forEach(t=>{t.addEventListener("itemremoved",s=>{this.#s(s)})})}createRenderRoot(){return this}render(){return l`
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
						<sdr-tab slot="tab">$t{Description}</sdr-tab>
						<sdr-tab-panel slot="tabpanel">
							<sdr-textarea id="notes" ?disabled="${this.isDisplaying}" ?hidden="${!this.material.notes}" value="${this.material.notes??""}" @input="${e=>this.#e(e,"notes")}" @change="${e=>this.#e(e,"notes")}">
								<span slot="label">$t{Notes}</span>
							</sdr-textarea>

							<sdr-textarea id="description" required ?disabled="${this.isDisplaying}" value="${this.material.description}" @input="${e=>this.#e(e,"description")}" @change="${e=>this.#e(e,"description")}">
								<span slot="label">$t{Description}</span>
							</sdr-textarea>
						</sdr-tab-panel>

						<sdr-tab slot="tab">$t{Info}</sdr-tab>
						<sdr-tab-panel slot="tabpanel">
							<div id="item-info">
								<sdr-edit-list id="sku" open ?disabled="${this.isDisplaying}" @itemadded="${e=>this.#a(e,"sku")}">
									<span slot="label">$t{SKU}</span>
									<sdr-edit-box slot="input" pattern="^[A-Z0-9](?:-?[A-Z0-9])+$" required></sdr-edit-box>

									${this.material.sku.map(e=>l`
										<sdr-edit-list-item value="${e}">${e}</sdr-edit-list-item>
									`)}
								</sdr-edit-list>

								<sdr-edit-box type="number" min="1" max="6" step="1" required ?disabled="${this.isDisplaying}" value="${this.material.edition}" @input="${e=>this.#e(e,"edition")}" @change="${e=>this.#e(e,"edition")}">
									<span slot="label">$t{Edition}</span>
								</sdr-edit-box>

								<sdr-select id="category" required ?disabled="${this.isDisplaying}" value="${this.material.category}" @input="${e=>this.#e(e,"category")}" @change="${e=>this.#e(e,"category")}">
									<span slot="label">$t{Category}</span>

									${P(Object.keys(X),()=>Object.entries(X).map(([e,t])=>l`
										<option value="${e}">${t.icon} ${t.name}</option>
									`))}
								</sdr-select>

								<sdr-select id="type" required ?disabled="${this.isDisplaying}" value="${this.material.type}" @input="${e=>this.#e(e,"type")}" @change="${e=>this.#e(e,"type")}">
									<span slot="label">$t{Type}</span>

									${P(Object.keys(Q),()=>Object.entries(Q).map(([e,t])=>l`
										<option value="${e}">${t.icon} ${t.name}</option>
									`))}
								</sdr-select>

								<sdr-select id="originalLanguage" required ?disabled="${this.isDisplaying}" value="${this.material.originalLanguage}" @input="${e=>this.#e(e,"originalLanguage")}" @change="${e=>this.#e(e,"originalLanguage")}">
									<span slot="label">$t{Original Language}</span>

									${P(Object.keys(S),()=>Object.entries(S).map(([e,t])=>l`
										<option value="${e}">${t.icon} ${t.name}</option>
									`))}
								</sdr-select>

								<sdr-edit-list id="releaseDate" open ?disabled="${this.isDisplaying}" @itemadded="${e=>this.#a(e,"releaseDate")}">
									<span slot="label">$t{Release date}</span>
									<sdr-edit-box slot="input" type="date" required></sdr-edit-box>

									${this.material.releaseDate?.map(e=>l`
										<sdr-edit-list-item value="${e}">${xe(new Date(e))}</sdr-edit-list-item>
									`)}
								</sdr-edit-list>

								<sdr-select id="status" required ?disabled="${this.isDisplaying}" value="${this.material.status}" @input="${e=>this.#e(e,"status")}" @change="${e=>this.#e(e,"status")}">
									<span slot="label">$t{Status}</span>

									${P(Object.keys(ee),()=>Object.entries(ee).map(([e,t])=>l`
										<option value="${e}">${t.icon} ${t.name}</option>
									`))}
								</sdr-select>

								<sdr-edit-box id="gameDate" type="month" required ?disabled="${this.isDisplaying}" value="${this.material.gameDate}" @input="${e=>this.#e(e,"gameDate")}" @change="${e=>this.#e(e,"gameDate")}">
									<span slot="label">$t{Game date}</span>
								</sdr-edit-box>

								<sdr-edit-list id="names" ?disabled="${this.isDisplaying}" @itemadded="${e=>this.#i(e,"names")}">
									<span slot="label">$t{Names published}</span>

									<sdr-select slot="input" required>
										${P(Object.keys(S),()=>Object.entries(S).map(([e,t])=>l`
											<option value="${e}">${t.icon} ${t.name}</option>
										`))}
									</sdr-select>
									<sdr-edit-box slot="input" required placeholder="$t{Name}"></sdr-edit-box>

									${Object.entries(this.material.names??{}).map(([e,t])=>l`
										<sdr-edit-list-item value="${e}">
											<abbr title="${S[e].name}">${S[e].icon}</abbr>:
											${t}
										</sdr-edit-list-item>
									`)}
								</sdr-edit-list>

								<sdr-edit-list id="publisher" open ?disabled="${this.isDisplaying}" @itemadded="${e=>this.#a(e,"publisher")}">
									<span slot="label">$t{Publisher}</span>
									<sdr-select slot="input" required>
										${P(Y,()=>Y.map(e=>l`
											<option>${e}</option>
										`))}
									</sdr-select>

									${this.material.publisher.map(e=>l`
										<sdr-edit-list-item value="${e}">
											<abbr title="${e}">
												<img alt="${e}" src="${"https://madcampos.dev/sdrlog/"}images/publishers/${e}.png"/>
											</abbr>
										</sdr-edit-list-item>
									`)}
								</sdr-edit-list>
							</div>
						</sdr-tab-panel>

						<sdr-tab slot="tab">$t{Files & Links}</sdr-tab>
						<sdr-tab-panel slot="tabpanel" id="files">
							<sdr-edit-list id="files-list" ?disabled="${this.isDisplaying}" @itemadded="${async()=>this.#r()}">
								<span slot="label">$t{Files}</span>
								<label slot="input">$t{Add a file}</label>

								${this.files.map(e=>l`
									<sdr-edit-list-item stretch value="${e.itemId??""}">
										<a href="#" rel="noopener noreferrer" @click="${async t=>this.#n(t,e.hash)}">
											${qe(e.fileExtension??e.mimeType??"")} ${e.fileName}${e.fileExtension}
										</a>
									</sdr-edit-list-item>
								`)}
							</sdr-edit-list>

							<sdr-edit-list id="links" ?disabled="${this.isDisplaying}" @itemadded="${e=>this.#i(e,"links")}">
								<span slot="label">$t{Online links}</span>
								<sdr-edit-box slot="input" type="url" id="link-url" placeholder="$t{URL}" required></sdr-edit-box>
								<sdr-edit-box slot="input" type="text" id="link-title" placeholder="$t{Name}" required></sdr-edit-box>

								${Object.entries(this.material.links??{}).map(([e,t])=>l`
									<sdr-edit-list-item stretch value=${e}>
										<a href="${e}" rel="noopener noreferrer" target="_blank">${t}</a>
									</sdr-edit-list-item>
								`)}
							</sdr-edit-list>
						</sdr-tab-panel>
					</sdr-tabs>
				</div>

				<sdr-button id="cancel-button" slot="footer" icon="❌" @click="${()=>{this.isDisplaying=!this.isDisplaying}}">
					$t{Cancel}
				</sdr-button>
				<sdr-button id="edit-button" slot="footer" icon="✏️" @click="${()=>{this.isDisplaying=!this.isDisplaying}}">
					$t{Edit}
				</sdr-button>
				<sdr-button id="save-button" slot="footer" icon="💾" @click="${async()=>this.#l()}">
					$t{Save}
				</sdr-button>
				<sdr-button id="export-button" slot="footer" icon="📥" @click="${async()=>Pe(this.material)}">
					$t{Export}
				</sdr-button>
			</sdr-dialog>
		`}};_([j({type:Boolean,reflect:!0,attribute:"disabled"})],v.prototype,"isDisplaying",2);_([d()],v.prototype,"open",2);_([d({hasChanged:(e,t)=>JSON.stringify(t)!==JSON.stringify(e)})],v.prototype,"material",2);_([d()],v.prototype,"files",2);_([d()],v.prototype,"coverUrl",2);v=_([w("sdr-view-item-details")],v);var He=Object.defineProperty,Ge=Object.getOwnPropertyDescriptor,q=(e,t,s,o)=>{for(var i=o>1?void 0:o?Ge(t,s):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(o?n(t,s,i):n(i))||i);return o&&i&&He(t,s,i),i};let D=class extends h{constructor(){super(),this.open=!1,this.theme="system",B("t",()=>{this.open=!this.open}),localStorage.getItem("app-theme")&&(this.theme=localStorage.getItem("app-theme"),document.body.classList.add(`theme-${this.theme}`))}#t(e){const t=e.target;localStorage.setItem("app-theme",t.value),[...document.body.classList].filter(o=>o.startsWith("theme-")).forEach(o=>{document.body.classList.remove(o)}),document.body.classList.add(`theme-${t.value}`),this.theme=t.value}#e(){this.open=!1,u.navigate("/")}navigate(){return this.open=!0,a.t`Theme Settings`}createRenderRoot(){return this}render(){return l`
		<sdr-dialog id="theme-modal" ?open="${this.open}" @close="${()=>this.#e()}">
			<span slot="title">$t{Theme Settings}</span>

			<p>$t{Set the theme for the application:}</p>

			<sdr-radio-group
				value="${this.theme}"

				@change="${e=>this.#t(e)}"
			>
				<sdr-radio-item icon="🌓" value="system">
					<span slot="title">$t{System Theme}</span>
					<span>$t{Follows the system defined theme.}</span>
				</sdr-radio-item>
				<sdr-radio-item icon="🌞" value="light">
					<span slot="title">$t{Light Theme}</span>
					<span>$t{Always use a light theme.}</span>
				</sdr-radio-item>
				<sdr-radio-item icon="🌚" value="dark">
					<span slot="title">$t{Dark Theme}</span>
					<span>$t{Always use a dark theme.}</span>
				</sdr-radio-item>
			</sdr-radio-group>
		</sdr-dialog>
		`}};q([d()],D.prototype,"open",2);q([d()],D.prototype,"theme",2);D=q([w("sdr-view-theme-settings")],D);var Ye=Object.defineProperty,Xe=Object.getOwnPropertyDescriptor,K=(e,t,s,o)=>{for(var i=o>1?void 0:o?Xe(t,s):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(o?n(t,s,i):n(i))||i);return o&&i&&Ye(t,s,i),i};let E=class extends h{constructor(){super(),this.open=!1,this.language="en-US",B("l",()=>{this.open=!this.open})}async#t(e){const t=e.target;t.value!==a.getLanguage()&&(t.disabled=!0,await a.setLanguage(t.value),location.reload())}#e(){this.open=!1,u.navigate("/")}navigate(){return this.open=!0,(this.shadowRoot?.querySelector("#language-select")).focus(),a.t`Language Settings`}createRenderRoot(){return this}render(){return l`
			<sdr-dialog id="language-modal" ?open="${this.open}" @close="${()=>this.#e()}">
				<span slot="title">$t{Language Settings}</span>

				<p>$t{Set the language for the application:}</p>
				<p><small><strong>$t{Note:}</strong> $t{The page will reload after changing the app language.}</small></p>

				<sdr-select
					id="language-select"

					.value="${this.language}"

					@change="${async e=>this.#t(e)}"
				>
					<span slot="label">$t{App Language}</span>

					<option value="en-US">$t{English}</option>
					<option value="fr-FR">$t{French}</option>
					<option value="pt-BR">$t{Brazilian Portuguese}</option>
				</sdr-select>
			</sdr-dialog>
		`}connectedCallback(){super.connectedCallback(),requestAnimationFrame(()=>{this.language=a.getLanguage()})}};K([d()],E.prototype,"open",2);K([d()],E.prototype,"language",2);E=K([w("sdr-view-language-settings")],E);const Qe=`sdr-view-app-info summary h3{display:inline;margin-inline-start:var(--margin-inline)}sdr-view-app-info dt{font-weight:700}sdr-view-app-info code{font-family:ui-monospace,monospace}
`;var et=Object.defineProperty,tt=Object.getOwnPropertyDescriptor,le=(e,t,s,o)=>{for(var i=o>1?void 0:o?tt(t,s):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(o?n(t,s,i):n(i))||i);return o&&i&&et(t,s,i),i};let A=class extends h{static styles=U(Qe);constructor(){super(),this.open=!1,B("i",()=>{this.open=!this.open})}#t(){this.open=!1,u.navigate("/")}navigate(){return this.open=!0,a.t`Information`}createRenderRoot(){return this}render(){return l`
			<style>${A.styles}</style>
			<sdr-dialog ?open="${this.open}" @close="${()=>this.#t()}">
				<span slot="title">${a.t`Information`}</span>

				<details open>
					<summary><h3>${a.t`Collection Organization`}</h3></summary>
					<p>${a.t`The material here presented is organized into the following categories:`}</p>
					<dl>
						<dt>${a.t`Sourcebooks`}</dt>
						<dd>${a.t`These books are a mix of rules and setting. As such, they contain setting information applicable to any edition of the game, and statistics that may need a little updating.`}</dd>

						<dt>${a.t`Rulebooks`}</dt>
						<dd>${a.t`These books are primarily rules, and tend to be replaced quickly when a new edition of the game is released. They can be difficult to use with other editions.`}</dd>

						<dt>${a.t`Adventures & Campaigns`}</dt>
						<dd>${a.t`Missions, adventures and campaigns including the`} <em>${a.t`Shadowrun Missions`}</em> ${a.t`seasons and the`} <em>${a.t`Enhanced Fiction`}</em> ${a.t`series.`}</dd>

						<dt>${a.t`Novels`}</dt>
						<dd>${a.t`The romances written with the Sixth World as a base.`}</dd>

						<dt>${a.t`Magazines`}</dt>
						<dd>${a.t`Official (or semi-official) magazines published about the Shadowrun Universe.`}</dd>

						<dt>${a.t`Tabletop`}</dt>
						<dd>${a.t`Tabletop, boardgames and other physical games.`}</dd>

						<dt><abbr title="${a.t`Trade Card Game`}">${a.t`T.C.G.`}</abbr></dt>
						<dd>${a.t`Trading Card Games based on the Shadowrun universe.`}</dd>

						<dt>${a.t`Video Games`}</dt>
						<dd>${a.t`Video Games produced based on the Shadowrun universe.`}</dd>

						<dt>${a.t`Unofficial`}</dt>
						<dd>${a.t`Items that influenced the game and have a historical importance but are not official.`}</dd>

						<dt>${a.t`Misc.`}</dt>
						<dd>${a.t`Conversion sheets, April's fool jokes and other items that don't go on the other categories.`}</dd>
					</dl>
				</details>

				<details>
					<summary><h3>${a.t`Search Options`}</h3></summary>
					<p>${a.t`The search is done by tags, which follow the format:`} <code>${a.t`tag: term`}</code>${a.t`, where tag is one of the listed below.`}</p>
					<p>${a.t`The default search is by name, so you don't need the tag for it, but if you use more than one tag for searching you will need to specify the`} <code>name</code> ${a.t`tag to search by name.`}</p>

					<h4>${a.t`Tags list`}</h4>
					<dl>
						<dt>${a.t`Name`} (<code>name</code>)</dt>
						<dd>${a.t`The name of the material. Also the default search tag, if none is provided it will be used.`}</dd>

						<dt>${a.t`Category`} (<code>category</code>)</dt>
						<dd>${a.t`The category the material fits in, it is one of the categories listed above.`}</dd>

						<dt>${a.t`SKU`} (<code>sku</code>)</dt>
						<dd>${a.t`The`} <abbr title="${a.t`Stock Keeping Unit`}">${a.t`SKU`}</abbr> ${a.t`of the item, it's used also as an identifier as most of them are unique.`}</dd>

						<dt>${a.t`Edition`} (<code>edition</code>)</dt>
						<dd>${a.t`The edition of the publication, ranging from`} <code>1</code> ${a.t`to`} <code>6</code>.</dd>

						<dt>${a.t`Type`} (<code>type</code>)</dt>
						<dd>
							<p>${a.t`The availability of the material, based on how it is more easely found or it's "best" version is presented.`}</p>
							<p>${a.t`It may be one of the following:`}</p>
							<ul>
								<li><strong>${a.t`Digital`} (<code>digital</code>):</strong> ${a.t`It is available in natively digital format.`}</li>
								<li><strong>${a.t`Print`} (<code>print</code>):</strong> ${a.t`It is available in printed format only, not having a scan or a digital version.`}</li>
								<li><strong>${a.t`Scan`} (<code>scan</code>):</strong> ${a.t`It is a scan of a printed material. Usually in a not so good quality, or without OCR/searching.`}</li>
								<li><strong>${a.t`OCR`} (<code>ocr</code>):</strong> ${a.t`An OCR scan of the printed format or searchable PDF, it is usually good quality.`}</li>
								<li><strong>${a.t`Physical`} (<code>physical</code>):</strong> ${a.t`The material is only available in physical format other than a book (set of cards, boardgame, miniatures, etc.) that would not make sense to have it "scanned".`}</li>
							</ul>
						</dd>

						<dt>${a.t`Status`} (<code>status</code>)</dt>
						<dd>
							<p>${a.t`If the material is in the scope of a digital collection.`}</p>
							<p>${a.t`May be one of the following:`}</p>
							<ul>
								<li><strong>${a.t`Missing`} (<code>missing</code>):</strong> ${a.t`The item is missing from the collection.`}</li>
								<li><strong>${a.t`Out of scope`} (<code>outofscope</code>):</strong> ${a.t`The item is either physical, limited edition or unreleased so it's out of the scope of the collection.`}</li>
								<li><strong>${a.t`Canceled`} (<code>canceled</code>):</strong> ${a.t`The item was announced but then canceled. It is kept here for historical reasons.`}</li>
							</ul>
						</dd>
					</dl>
				</details>

				<details>
					<summary><h3>${a.t`Material Files naming convension`}</h3></summary>

					<p>${a.t`To have a file associated to an item in the collection when using the`} <em>${a.t`"Import Files"`}</em> ${a.t`option the file name have to be in the following convension:`}
					</p>

					<blockquote>
						<code>${a.t`sku`}</code> (<code>${a.t`modifier`}</code>) - <code>${a.t`name`}</code>.<code>${a.t`extension`}</code>
					</blockquote>

					<dl>
						<dt><code>${a.t`sku`}</code></dt>
						<dd>${a.t`The item's first published SKU, it is used as an unique identifier.`}</dd>

						<dt><code>${a.t`modifier`}</code> ${a.t`(optional)`}</dt>
						<dd>
							<p>${a.t`One optional modifier to diferentiate this file from the "main" file(s) for this item.`}</p>
							<p>${a.t`May be one of the following`}</p>
							<ul>
								<li><strong>${a.t`A (attechement)`}</strong>: ${a.t`An attachement like a map, handout or sound file.`}</li>
								<li><strong>${a.t`D (draft)`}</strong>: ${a.t`An extra draft that is (semi-)official and add content to the main material.`}</li>
								<li><strong>${a.t`E (errata)`}</strong>: ${a.t`An simple errata or revision of the material.`}</li>
								<li><strong>${a.t`T (translation)`}</strong>: ${a.t`An important translation with additional content or with significant differences from the main item.`}</li>
								<li><strong>${a.t`X (extra)`}</strong>: ${a.t`A miscelanious extra to the main item.`}</li>
							</ul>
						</dd>

						<dt><code>${a.t`name`}</code></dt>
						<dd>${a.t`The item's name.`}</dd>

						<dt><code>${a.t`extension`}</code></dt>
						<dd>${a.t`The item's file extension.`}</dd>
					</dl>
				</details>
			</sdr-dialog>
		`}};le([d()],A.prototype,"open",2);A=le([w("sdr-view-app-info")],A);const it=new Map([["png","image/png"],["ttf","font/ttf"],["cfg","text/plain"]]);async function at(){let e=await G("emulator");if(e.length===0){const s=await(await fetch("https://madcampos.dev/sdrlog/lib/webretro/bundle.zip")).blob(),o=new File([s],"bundle.zip",{type:"application/zip"});"JSZip"in window||(window.JSZip=(await O(()=>import("./jszip.min-2f4a7b1a.js").then(r=>r.j),["assets/jszip.min-2f4a7b1a.js","assets/_commonjs-dynamic-modules-3f1b5830.js"])).default);const i=await JSZip.loadAsync(o);for await(const r of Object.values(i.files))if(r.dir){const n=new File([r.name],r.name,{type:"application/x+directory"});await y("emulator",r.name,n)}else{const n=await r.async("blob"),c=r.name.split("/").pop()??"",[p]=c.split(".").reverse(),C=new File([n],c,{type:it.get(p)??"application/octet-stream"});await y("emulator",r.name,C)}e=await G("emulator")}return e}const st=`sdr-view-emulator #emulator-wrapper{--gamepad-button-size: calc(var(--button-size) * 1.5);--gap-size: 1rem;--controller-size: calc(var(--gamepad-button-size) * 2 + var(--gap-size));--padding-size: 1rem;display:grid;grid-template-columns:var(--controller-size) 1fr var(--controller-size);grid-template-rows:1fr;grid-template-areas:"controller-left game controller-right";align-items:stretch;width:100%;height:100%;position:relative;overflow:hidden}sdr-view-emulator canvas{position:absolute;z-index:-1;max-width:calc(100% - var(--padding-size));max-height:calc(100% - var(--padding-size));aspect-ratio:4 / 3;object-fit:contain}sdr-view-emulator #game-wrapper{display:grid;margin:auto;aspect-ratio:4 / 3;width:calc(100% - (var(--padding-size) * 2));height:auto;max-height:calc(100vmin - (var(--padding-size) * 2));max-width:calc(100vmax - (var(--controller-size) * 2) - (var(--padding-size) * 4));place-items:center;place-content:stretch;grid-area:game;align-self:center;justify-self:center;position:relative;overflow:hidden}sdr-view-emulator #game-wrapper>*{width:100%;height:100%;grid-area:1 / 1 / -1 / -1;position:absolute}sdr-view-emulator #game-overlay{display:none;place-items:center;background-color:#00000080;backdrop-filter:blur(5px)}sdr-view-emulator[paused] #game-overlay{display:grid}sdr-view-emulator .controller{display:none;justify-content:end;align-self:end;align-items:center;grid-gap:var(--gap-size);box-sizing:border-box;width:100%;min-height:calc(var(--gamepad-button-size) * 4 + var(--gap-size) * 2)}sdr-view-emulator .controller button{background:var(--button-bg, transparent);border:solid var(--border-width) var(--button-border, transparent);border-radius:var(--pill-border-radius);width:var(--gamepad-button-size);height:var(--gamepad-button-size);padding:0;transition:var(--transition);font:inherit;font-size:2rem;user-select:none;text-align:center}sdr-view-emulator .controller button:focus{outline:none}sdr-view-emulator .controller button:active{border-color:var(--button-bg, transparent);background:var(--button-border, transparent)}sdr-view-emulator #left-controller{grid-area:controller-left;justify-self:start;grid-template-columns:1fr;grid-template-rows:1fr 1fr 2fr;grid-template-areas:"select" "start" "dpad"}sdr-view-emulator #right-controller{grid-area:controller-right;justify-self:end;grid-template-columns:1fr 1fr;grid-template-rows:repeat(3,1fr);grid-template-areas:"l r" "x y" "a b"}sdr-view-emulator #button-select{--button-border: silver;--button-bg: dimgray;width:auto;grid-area:select}sdr-view-emulator #button-start{--button-border: silver;--button-bg: dimgray;width:auto;grid-area:start}sdr-view-emulator #bumper-left{--button-border: silver;--button-bg: dimgray;grid-area:l}sdr-view-emulator #bumper-right{--button-border: silver;--button-bg: dimgray;grid-area:r}sdr-view-emulator #button-a{--button-border: limegreen;--button-bg: green;grid-area:a}sdr-view-emulator #button-b{--button-border: red;--button-bg: darkred;grid-area:b}sdr-view-emulator #button-x{--button-border: blue;--button-bg: darkblue;grid-area:x}sdr-view-emulator #button-y{--button-border: blueviolet;--button-bg: purple;grid-area:y}sdr-view-emulator #dpad{grid-area:dpad;position:relative;width:100%;height:100%}@media (orientation: portrait){:host{transform:rotate(90deg)}}@media (pointer: coarse){.controller{display:grid}}
`;var ot=Object.defineProperty,rt=Object.getOwnPropertyDescriptor,I=(e,t,s,o)=>{for(var i=o>1?void 0:o?rt(t,s):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(o?n(t,s,i):n(i))||i);return o&&i&&ot(t,s,i),i};const nt={select:{key:"Enter",code:"Enter",keyCode:13},start:{key:" ",code:"Space",keyCode:32},leftBumber:{key:"E",code:"KeyE",keyCode:69},rightBumber:{key:"P",code:"KeyP",keyCode:32},up:{key:"ArrowUp",code:"ArrowUp",keyCode:38},down:{key:"ArrowDown",code:"ArrowDown",keyCode:40},left:{key:"ArrowLeft",code:"ArrowLeft",keyCode:37},right:{key:"ArrowRight",code:"ArrowRight",keyCode:39},a:{key:"H",code:"KeyH",keyCode:72},b:{key:"G",code:"KeyG",keyCode:71},x:{key:"Y",code:"KeyY",keyCode:89},y:{key:"T",code:"KeyT",keyCode:84}};let g=class extends h{static shadowRootOptions={...h.shadowRootOptions,delegatesFocus:!0};static styles=U(st);set paused(e){e?this.#e?.pauseMainLoop():this.#e?.resumeMainLoop(),this.#t=e}get paused(){return this.#t}#t=!1;#e=null;constructor(){super(),this.open=!1,this.#u(),document.addEventListener("keydown",e=>{const t=["8","9","13","19","27","32","33","34","35","36","42","44","45","91","92","93","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","134","135"];this.loaded&&t.includes(e.code)&&e.preventDefault()},{capture:!1,passive:!0}),document.addEventListener("keydown",e=>{this.loaded&&e.key==="F2"&&this.#p()},{capture:!1,passive:!0}),document.addEventListener("keydown",e=>{this.loaded&&e.key==="F3"&&this.#c()},{capture:!1,passive:!0}),document.addEventListener("keydown",e=>{this.loaded&&e.key==="F4"&&this.#e?._cmd_toggle_menu()},{capture:!1,passive:!0}),document.addEventListener("keydown",e=>{this.loaded&&e.key==="Escape"&&(this.paused=!this.paused)}),document.addEventListener("visibilitychange",()=>{const e=document.visibilityState==="visible",t=document.visibilityState==="hidden";this.loaded&&t&&!this.paused&&(this.paused=!0),this.loaded&&e&&this.paused&&(this.paused=!1)},!1)}#a(){this.open=!1,u.navigate("/")}#i(e,t){this.canvas.dispatchEvent(new KeyboardEvent(e,{bubbles:!0,cancelable:!1,shiftKey:!1,ctrlKey:!1,metaKey:!1,altKey:!1,...nt[t]}))}async#s(){const e=(await O(()=>import("./index-9baabb87.js"),[])).default,t=this.dpad,{width:s,height:o}=t.getBoundingClientRect(),i=e.create({zone:t,color:"white",multitouch:!1,position:{top:`${o/2}px`,left:`${s/2}px`},mode:"static",restJoystick:!0,shape:"circle",follow:!1,dynamicPage:!0});let r=null;i.on("move",(n,{direction:c})=>{r=c?.angle??null,r&&this.#i("keydown",r)}),i.on("end",()=>{r&&this.#i("keyup",r)})}#o(){const{width:e,height:t}=this.gameWrapper.getBoundingClientRect();this.#e?.setCanvasSize(e,t)}#r(e){this.#e?.FS.createPath("/",e,!0,!0)}async#n(){const e="/home/web_user/retroarch/",t=await at();this.#r(e);for await(const[s,o]of t){const i=await o.arrayBuffer();o.type==="application/x+directory"?this.#r(`${e}${o.name}`):this.#e?.FS.writeFile(`${e}${s}`,new Uint8Array(i))}}async#l(e){const t=new Map([["GENESIS","genesis_plus_gx"],["SEGA-CD","genesis_plus_gx"],["SNES","snes9x"]]),s=await W(e),{id:o}=se(s.name),i=t.get(o??"")??"",n=(await O(()=>import(`https://madcampos.dev/sdrlog/lib/webretro/${i}_libretro.js`),[])).default;this.#e=n({canvas:this.canvas,onRuntimeInitialized:async()=>{this.#o(),await this.#n();const c=await s.arrayBuffer();this.#e?.FS.writeFile("/rom.bin",new Uint8Array(c)),this.#e?.callMain(this.#e.arguments),this.#o(),this.loaded=!0}})}async#d(){document.fullscreenElement?await document.exitFullscreen():await this.requestFullscreen({navigationUI:"hide"})}#c(){this.#e?._cmd_load_state()}#p(){this.#e?._cmd_savefiles(),this.#e?._cmd_save_state(),window.setTimeout(async()=>{const t="/home/web_user/retroarch/userdata/saves/rom.srm",s="/home/web_user/retroarch/userdata/states/rom.state",o=this.#e?.FS.stat(t)??{size:0},i=this.#e?.FS.stat(s)??{size:0};if(o.size>0&&i.size>0){this.#e?.pauseMainLoop();const r=this.#e?.FS.readFile(t)??new Uint8Array,n=new File([r],t),c=this.#e?.FS.readFile(s)??new Uint8Array,p=new File([c],s);await y("emulator",t,n),await y("emulator",s,p),this.#e?.resumeMainLoop()}},1e3)}#u(){this.#e=null,this.loaded=!1}async navigate(e){if(this.#u(),!!e.params.id)return await this.#l(e.params.id),this.open=!0,"Emulator"}firstUpdated(e){super.firstUpdated(e),this.#s()}createRenderRoot(){return this}render(){return l`
			<style>${g.styles}</style>
			<sdr-dialog ?open="${this.open}" @close="${()=>this.#a()}">
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
		`}};I([j({type:Boolean,reflect:!0})],g.prototype,"loaded",2);I([R("#game-canvas")],g.prototype,"canvas",2);I([R("#game-wrapper")],g.prototype,"gameWrapper",2);I([R("#dpad")],g.prototype,"dpad",2);I([d()],g.prototype,"open",2);I([d()],g.prototype,"paused",1);g=I([w("sdr-view-emulator")],g);const lt="data:text/css;base64,LmRhcmsgewoJYmFja2dyb3VuZDogdmFyKC0tZGFyay1iZy1jb2xvcik7Cgljb2xvcjogdmFyKC0tdGV4dC1jb2xvcik7CgoJZm9udC1mYW1pbHk6ICdTZWdvZSBVSScsIFRhaG9tYSwgR2VuZXZhLCBWZXJkYW5hLCBzYW5zLXNlcmlmOwoJZm9udC1zaXplOiBjYWxjKHZhcigtLWJvZHktdGV4dCkgKiAxLjUpOwoKCS13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7Cn0KCjo6c2VsZWN0aW9uIHsKCWJhY2tncm91bmQtY29sb3I6IHZhcigtLXRoZW1lLWNvbG9yKTsKCWNvbG9yOiB2YXIoLS1kYXJrLWJnLWNvbG9yKTsKfQoKOnJvb3QgYm9keTpub3QoW2hpZGRlbl0pIC5kYXJrIDppcygqLCAqOjphZnRlciwgKjo6YmVmb3JlKSB7Cglmb250LWZhbWlseTogJ1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7Cgljb2xvcjogdmFyKC0tdGV4dC1jb2xvcik7Cn0KCjpyb290IC5kYXJrICo6OmZpcnN0LWxldHRlciB7Cglmb250LWZhbWlseTogJ1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7Cn0K";var dt=Object.defineProperty,ct=Object.getOwnPropertyDescriptor,x=(e,t,s,o)=>{for(var i=o>1?void 0:o?ct(t,s):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(o?n(t,s,i):n(i))||i);return o&&i&&dt(t,s,i),i};let f=class extends h{#t;constructor(){super(),this.open=!1,this.#s()}#e(){this.open=!1,u.navigate("/")}#a(e){this.loaded&&(e.key==="ArrowLeft"&&this.showPreviousPage(),e.key==="ArrowRight"&&this.showNextPage())}async#i(e){const t=await W(e);"JSZip"in window||await O(()=>import("./jszip.min-2f4a7b1a.js").then(i=>i.j),["assets/jszip.min-2f4a7b1a.js","assets/_commonjs-dynamic-modules-3f1b5830.js"]),"ePub"in window||await O(()=>import("./epub.min-ae445f80.js").then(i=>i.e),["assets/epub.min-ae445f80.js","assets/_commonjs-dynamic-modules-3f1b5830.js","assets/jszip.min-2f4a7b1a.js"]);const s=ePub(await t.arrayBuffer()),{toc:o}=await s.loaded.navigation;this.#t=s.renderTo(this.renderArea,{width:"100%",height:"100%",flow:"scrolled-doc"}),this.#t.themes.register("dark",lt),this.#t.themes.select("dark"),this.toc=o,this.#t.on("keyup",i=>this.#a(i)),document.addEventListener("keyup",i=>this.#a(i)),this.#t.on("rendered",i=>{this.selectedPage=i.href}),this.#t.on("relocated",i=>{i.atEnd?this.nextPageVisibility="hidden":this.nextPageVisibility="visible",i.atStart?this.previousPageVisibility="hidden":this.previousPageVisibility="visible"}),await this.#t.display(),this.loaded=!0}#s(){this.loaded=!1,this.toc=[],this.selectedPage="",this.nextPageVisibility="hidden",this.previousPageVisibility="hidden",this.#t?.destroy(),this.#t=void 0}async showNextPage(){await this.#t?.next()}async showPreviousPage(){await this.#t?.prev()}async navigate(e){if(this.#s(),this.renderArea.innerHTML="",!!e.params.id)return await this.#i(e.params.id),this.open=!0,"Epub Reader"}createRenderRoot(){return this}render(){return l`
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
					@change="${e=>this.#t?.display(e.target.value)}"
				>
					${this.toc.map(e=>e.subitems?l`
								<optgroup label="${e.label}">
									${e.subitems.map(t=>l`<option value="${t.href}">${t.label}</option>`)}
								</optgroup>
							`:l`<option value="${e.href}">${e.label}</option>`)}
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
		`}};x([j({type:Boolean,attribute:"loaded"})],f.prototype,"loaded",2);x([d()],f.prototype,"open",2);x([d()],f.prototype,"toc",2);x([d()],f.prototype,"selectedPage",2);x([d()],f.prototype,"nextPageVisibility",2);x([d()],f.prototype,"previousPageVisibility",2);x([R("#book")],f.prototype,"renderArea",2);f=x([w("sdr-view-epub-reader")],f);var pt=Object.defineProperty,ut=Object.getOwnPropertyDescriptor,F=(e,t,s,o)=>{for(var i=o>1?void 0:o?ut(t,s):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(o?n(t,s,i):n(i))||i);return o&&i&&pt(t,s,i),i};const ht=ne({ignorePunctuation:!0,numeric:!0}),te=a.t`Default section`,mt=new Map([[".png","image/png"],[".apng","image/apng"],[".jpg","image/jpeg"],[".jpeg","image/jpeg"],[".jfif","image/jpeg"],[".pjpeg","image/jpeg"],[".pjp","image/jpeg"],[".avif","image/avif"],[".webp","image/webp"],[".bmp","image/bmp"],[".gif","image/gif"]]);let b=class extends h{static shadowRootOptions={...h.shadowRootOptions,delegatesFocus:!0};#t;constructor(){super(),this.open=!1,this.#o(),document.addEventListener("keyup",e=>{this.loaded&&(e.key==="ArrowLeft"&&this.showPreviousPage(),e.key==="ArrowRight"&&this.showNextPage())},!1),window.addEventListener("wheel",e=>{this.loaded&&(e.shiftKey||(e.preventDefault(),this.renderRoot.querySelector("article")?.scrollBy({left:e.deltaY,behavior:"smooth"})))},{capture:!1,passive:!1})}#e(){this.open=!1,u.navigate("/")}#a([e]){this.#t=e.target,this.#t.previousElementSibling?this.previousPageVisibility="visible":this.previousPageVisibility="hidden",this.#t.nextElementSibling?this.nextPageVisibility="visible":this.nextPageVisibility="hidden",this.selectedPage=this.#t.dataset.folder}async#i(e){if(!e)return{};"JSZip"in window||await O(()=>import("./jszip.min-2f4a7b1a.js").then(i=>i.j),["assets/jszip.min-2f4a7b1a.js","assets/_commonjs-dynamic-modules-3f1b5830.js"]);const t=await JSZip.loadAsync(e),s={};for await(const i of Object.values(t.files))if(!i.dir){const r=await i.async("blob"),[n,c=te]=i.name.split("/").reverse(),p=/(?<extension>\.[a-z0-9]{3,})$/u,{extension:C}=p.exec(n)?.groups??{};mt.has(C)&&(c in s||(s[c]=[]),s[c].push({name:n,folder:c,url:URL.createObjectURL(r)}))}return Object.fromEntries(Object.keys(s).sort((i,r)=>r===te?1:ht(i,r)).map(i=>[i,s[i]]))}async#s(e){const t=await W(e),s=await this.#i(t);for(const i of Object.keys(s)){this.toc.push(i);for(const r of s[i])this.pages.push(r)}const o=new IntersectionObserver(i=>this.#a(i),{threshold:1});this.renderRoot.querySelectorAll("img").forEach(i=>o.observe(i)),this.loaded=!0,[this.selectedPage]=this.toc,this.renderRoot.querySelector("article img:first-child")?.scrollIntoView()}#o(){this.loaded=!1,this.selectedPage="",this.toc=[],this.pages=[],this.nextPageVisibility="hidden",this.previousPageVisibility="hidden"}showNextPage(){this.#t?.nextElementSibling?.scrollIntoView()}showPreviousPage(){this.#t?.previousElementSibling?.scrollIntoView()}async navigate(e){if(this.#o(),!!e.params.id)return await this.#s(e.params.id),this.open=!0,"Comic Book Reader"}createRenderRoot(){return this}render(){return l`
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
					${this.toc.map(e=>l`<option>${e}</option>`)}
				</sdr-select>
				<sdr-button
					icon-button
					slot="title"
					class="title-menu"
					style="visibility: ${this.nextPageVisibility}"
					@click="${()=>this.showNextPage()}"
				>⏭️</sdr-button>

				<article id="comic">
					${this.pages.map(e=>l`
						<img src="${e.url}" alt="${e.name}" loading="lazy" decoding="async" data-folder="${e.folder}"/>
					`)}
				</article>

				<div id="comic-book-overlay">
					<progress></progress>
				</div>
			</sdr-dialog>
		`}};F([j({type:Boolean,reflect:!0})],b.prototype,"loaded",2);F([d()],b.prototype,"open",2);F([d()],b.prototype,"selectedPage",2);F([d()],b.prototype,"pages",2);F([d()],b.prototype,"toc",2);F([d()],b.prototype,"nextPageVisibility",2);F([d()],b.prototype,"previousPageVisibility",2);b=F([w("sdr-view-cbz-reader")],b);u.init({baseUrl:"https://madcampos.dev/sdrlog/",routes:[{path:"/",view:m},{path:"/item/:id?",view:v},{path:"/info",view:A},{path:"/settings/theme",view:D},{path:"/settings/language",view:E},{path:"/emulator/:id",view:g},{path:"/epub/:id",view:f},{path:"/cbz/:id",view:b}]});
