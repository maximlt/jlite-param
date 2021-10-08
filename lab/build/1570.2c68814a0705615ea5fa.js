"use strict";(self.webpackChunk_JUPYTERLAB_CORE_OUTPUT=self.webpackChunk_JUPYTERLAB_CORE_OUTPUT||[]).push([[1570],{31570:(e,t,s)=>{s.r(t),s.d(t,{Completer:()=>E,CompleterModel:()=>v,CompletionConnector:()=>_,CompletionHandler:()=>d,ContextConnector:()=>u,ICompletionManager:()=>q,KernelConnector:()=>h});var i=s(1468),n=s(28685),o=s(41649),r=s(21731);class a extends r.DataConnector{fetch(e){return Promise.reject("Attempting to fetch with DummyConnector. Please ensure connector responseType is set.")}}const l="jp-mod-completer-enabled",c="jp-mod-completer-active";class d{constructor(e){this._editor=null,this._enabled=!1,this._pending=0,this._isDisposed=!1,this.completer=e.completer,this.completer.selected.connect(this.onCompletionSelected,this),this.completer.visibilityChanged.connect(this.onVisibilityChanged,this),this._connector=e.connector}get connector(){return"responseType"in this._connector?new a:this._connector}set connector(e){this._connector=e}get editor(){return this._editor}set editor(e){if(e===this._editor)return;let t=this._editor;if(t&&!t.isDisposed){const e=t.model;t.host.classList.remove(l),t.host.classList.remove(c),e.selections.changed.disconnect(this.onSelectionsChanged,this),e.value.changed.disconnect(this.onTextChanged,this)}if(this.completer.reset(),this.completer.editor=e,t=this._editor=e,t){const e=t.model;this._enabled=!1,e.selections.changed.connect(this.onSelectionsChanged,this),e.value.changed.connect(this.onTextChanged,this),this.onSelectionsChanged()}}get isDisposed(){return this._isDisposed}dispose(){this.isDisposed||(this._isDisposed=!0,o.Signal.clearData(this))}invoke(){n.MessageLoop.sendMessage(this,d.Msg.InvokeRequest)}processMessage(e){switch(e.type){case d.Msg.InvokeRequest.type:this.onInvokeRequest(e)}}getState(e,t){return{text:e.model.value.text,lineHeight:e.lineHeight,charWidth:e.charWidth,line:t.line,column:t.column}}onCompletionSelected(e,t){const s=e.model,i=this._editor;if(!i||!s)return;const n=s.createPatch(t);if(!n)return;const{start:o,end:r,value:a}=n,l=i.getOffsetAt(i.getCursorPosition());i.model.sharedModel.updateSource(o,r,a),l<=r&&l>=o&&i.setCursorPosition(i.getPositionAt(o+a.length))}onInvokeRequest(e){if(!this.completer.model)return;if(this.completer.model.original)return;const t=this._editor;t&&this._makeRequest(t.getCursorPosition()).catch((e=>{console.warn("Invoke request bailed",e)}))}onSelectionsChanged(){const e=this.completer.model,t=this._editor;if(!t)return;const s=t.host;if(!e)return this._enabled=!1,void s.classList.remove(l);if(e.subsetMatch)return;const i=t.getCursorPosition(),n=t.getLine(i.line);if(!n)return this._enabled=!1,e.reset(!0),void s.classList.remove(l);const{start:o,end:r}=t.getSelection();return o.column!==r.column||o.line!==r.line||n.slice(0,i.column).match(/^\s*$/)?(this._enabled=!1,e.reset(!0),void s.classList.remove(l)):(this._enabled||(this._enabled=!0,s.classList.add(l)),void e.handleCursorChange(this.getState(t,t.getCursorPosition())))}onTextChanged(){const e=this.completer.model;if(!e||!this._enabled)return;const t=this.editor;if(!t)return;const{start:s,end:i}=t.getSelection();s.column===i.column&&s.line===i.line&&e.handleTextChange(this.getState(t,t.getCursorPosition()))}onVisibilityChanged(e){e.isDisposed||e.isHidden?this._editor&&(this._editor.host.classList.remove(c),this._editor.focus()):this._editor&&this._editor.host.classList.add(c)}_makeRequest(e){const t=this.editor;if(!t)return Promise.reject(new Error("No active editor"));const s=t.model.value.text,n=i.Text.jsIndexToCharIndex(t.getOffsetAt(e),s),o=++this._pending,r=this.getState(t,e),a={text:s,offset:n};return this._isICompletionItemsConnector(this._connector)?this._connector.fetch(a).then((e=>{if(this._validate(o,a),!e)throw new Error(`Invalid request: ${a}`);this._onFetchItemsReply(r,e)})).catch((e=>{this._onFailure()})):this._connector.fetch(a).then((e=>{if(this._validate(o,a),!e)throw new Error(`Invalid request: ${a}`);this._onReply(r,e)})).catch((e=>{this._onFailure()}))}_isICompletionItemsConnector(e){return e.responseType===d.ICompletionItemsResponseType}_validate(e,t){if(this.isDisposed)throw new Error("Handler is disposed");if(e!==this._pending)throw new Error("A newer completion request is pending")}_updateModel(e,t,s){const n=this.completer.model,o=e.text;return n?(n.original=e,n.cursor={start:i.Text.charIndexToJsIndex(t,o),end:i.Text.charIndexToJsIndex(s,o)},n):null}_onReply(e,t){const s=this._updateModel(e,t.start,t.end);if(!s)return;const i=[],n=new Set(t.matches||[]);t.matches&&n.forEach((e=>{i.push(e)}));const o=(t.metadata||{})._jupyter_types_experimental,r={};o&&o.forEach((e=>{const t=e.text,s=e.type;n.has(t)&&"<unknown>"!==s&&(r[t]=s)})),s.setOptions(i,r)}_onFetchItemsReply(e,t){const s=this._updateModel(e,t.start,t.end);s&&s.setCompletionItems&&s.setCompletionItems(t.items)}_onFailure(){const e=this.completer.model;e&&e.reset(!0)}}!function(e){let t;e.ICompletionItemsResponseType="ICompletionItemsReply",function(e){e.InvokeRequest=new n.Message("invoke-request")}(t=e.Msg||(e.Msg={}))}(d||(d={}));class h extends r.DataConnector{constructor(e){super(),this._session=e.session}async fetch(e){var t;const s=null===(t=this._session)||void 0===t?void 0:t.kernel;if(!s)throw new Error("No kernel for completion request.");const i={code:e.text,cursor_pos:e.offset},n=(await s.requestComplete(i)).content;if("ok"!==n.status)throw new Error("Completion fetch failed to return successfully.");return{start:n.cursor_start,end:n.cursor_end,matches:n.matches,metadata:n.metadata}}}class u extends r.DataConnector{constructor(e){super(),this._editor=e.editor}fetch(e){return this._editor?new Promise((e=>{e(m.contextHint(this._editor))})):Promise.reject("No editor")}}var m,p;!function(e){e.contextHint=function(e){const t=e.getCursorPosition(),s=e.getTokenForPosition(t),i=function(e,t){return t.getTokens().filter((t=>0===t.value.indexOf(e.value)&&t.value!==e.value))}(s,e).filter((e=>e.type)).map((e=>e.value)),n=Array.from(new Set(i));return{start:s.offset,end:s.offset+s.value.length,matches:n,metadata:{}}}}(m||(m={}));class _ extends r.DataConnector{constructor(e){super(),this._kernel=new h(e),this._context=new u(e)}fetch(e){return Promise.all([this._kernel.fetch(e),this._context.fetch(e)]).then((([e,t])=>p.mergeReplies(e,t)))}}!function(e){e.mergeReplies=function(e,t){if(0===e.matches.length)return t;if(0===t.matches.length)return e;const s=e.matches.slice(),i=s.reduce(((e,t)=>(e[t]=null,e)),{});return t.matches.forEach((e=>{e in i||s.push(e)})),Object.assign(Object.assign({},e),{matches:s})}}(p||(p={}));var g,f=s(58623),C=s(93315);class v{constructor(){this._current=null,this._cursor=null,this._isDisposed=!1,this._completionItems=[],this._options=[],this._original=null,this._query="",this._subsetMatch=!1,this._typeMap={},this._orderedTypes=[],this._stateChanged=new o.Signal(this)}get stateChanged(){return this._stateChanged}get original(){return this._original}set original(e){this._original===e||this._original&&e&&C.JSONExt.deepEqual(e,this._original)||(this._reset(),this._current=this._original=e,this._stateChanged.emit(void 0))}get current(){return this._current}set current(e){if(this._current===e||this._current&&e&&C.JSONExt.deepEqual(e,this._current))return;const t=this._original;if(!t)return;const s=this._cursor;if(!s)return;const i=this._current=e;if(!i)return void this._stateChanged.emit(void 0);const n=t.text.split("\n")[t.line],o=i.text.split("\n")[i.line];if(!this._subsetMatch&&o.length<n.length)return void this.reset(!0);const{start:r,end:a}=s;let l=i.text.substring(r);const c=t.text.substring(a);l=l.substring(0,l.lastIndexOf(c)),this._query=l,this._stateChanged.emit(void 0)}get cursor(){return this._cursor}set cursor(e){this.original&&(this._cursor=e)}get query(){return this._query}set query(e){this._query=e}get subsetMatch(){return this._subsetMatch}set subsetMatch(e){this._subsetMatch=e}get isDisposed(){return this._isDisposed}dispose(){this._isDisposed||(this._isDisposed=!0,o.Signal.clearData(this))}completionItems(){let e=this._query;return e?this._markup(e):this._completionItems}setCompletionItems(e){C.JSONExt.deepEqual(e,this._completionItems)||(this._completionItems=e,this._orderedTypes=g.findOrderedCompletionItemTypes(this._completionItems),this._stateChanged.emit(void 0))}items(){return this._filter()}options(){return(0,f.iter)(this._options)}typeMap(){return this._typeMap}orderedTypes(){return this._orderedTypes}setOptions(e,t){const s=(0,f.toArray)(e||[]),i=t||{};C.JSONExt.deepEqual(s,this._options)&&C.JSONExt.deepEqual(i,this._typeMap)||(s.length?(this._options=s,this._typeMap=i,this._orderedTypes=g.findOrderedTypes(i)):(this._options=[],this._typeMap={},this._orderedTypes=[]),this._stateChanged.emit(void 0))}handleCursorChange(e){if(!this._original)return;const{column:t,line:s}=e,{current:i,original:n}=this;if(!n)return;if(s!==n.line)return void this.reset(!0);if(t<n.column)return void this.reset(!0);const{cursor:o}=this;if(!o||!i)return;const r=o.end-o.start,a=n.text.split("\n")[n.line],l=i.text.split("\n")[i.line].length-a.length;t>n.column+r+l&&this.reset(!0)}handleTextChange(e){const t=this._original;if(!t)return;const{text:s,column:i,line:n}=e,o=s.split("\n")[n][i-1];o&&o.match(/\S/)||e.column>=t.column?this.current=e:this.reset(!1)}createPatch(e){const t=this._original,s=this._cursor,i=this._current;if(!t||!s||!i)return;let{start:n,end:o}=s;return o+=i.text.length-t.text.length,{start:n,end:o,value:e}}reset(e=!1){!e&&this._subsetMatch||(this._reset(),this._stateChanged.emit(void 0))}_markup(e){const t=this._completionItems;let s=[];for(let i of t){const t=i.label.indexOf("("),n=t>-1?i.label.substring(0,t):i.label;let o=f.StringExt.matchSumOfSquares(n,e);if(o){let e=f.StringExt.highlight(i.label,o.indices,g.mark);s.push(Object.assign(Object.assign({},i),{documentation:i.documentation,label:e.join(""),insertText:i.insertText?i.insertText:i.label,score:o.score}))}}return s.sort(g.scoreCmp2),s.forEach((e=>{delete e.score})),s}_filter(){const e=this._options||[],t=this._query;if(!t)return(0,f.map)(e,(e=>({raw:e,text:e})));const s=[];for(const i of e){const e=f.StringExt.matchSumOfSquares(i,t);if(e){const t=f.StringExt.highlight(i,e.indices,g.mark);s.push({raw:i,score:e.score,text:t.join("")})}}return(0,f.map)(s.sort(g.scoreCmp),(e=>({text:e.text,raw:e.raw})))}_reset(){this._current=null,this._cursor=null,this._completionItems=[],this._options=[],this._original=null,this._query="",this._subsetMatch=!1,this._typeMap={},this._orderedTypes=[]}}!function(e){const t=["function","instance","class","module","keyword"],s=t.reduce(((e,t)=>(e[t]=null,e)),{});e.mark=function(e){return`<mark>${e}</mark>`},e.scoreCmp=function(e,t){const s=e.score-t.score;return 0!==s?s:e.raw.localeCompare(t.raw)},e.scoreCmp2=function(e,t){var s,i,n;const o=e.score-t.score;return 0!==o?o:null!==(n=null===(s=e.insertText)||void 0===s?void 0:s.localeCompare(null!==(i=t.insertText)&&void 0!==i?i:""))&&void 0!==n?n:0},e.findOrderedCompletionItemTypes=function(e){const s=new Set;e.forEach((e=>{!e.type||t.includes(e.type)||s.has(e.type)||s.add(e.type)}));const i=Array.from(s);return i.sort(((e,t)=>e.localeCompare(t))),t.concat(i)},e.findOrderedTypes=function(e){const i=Object.keys(e).map((t=>e[t])).filter((e=>!!e&&!(e in s))).sort(((e,t)=>e.localeCompare(t)));return t.concat(i)}}(g||(g={}));var y=s(28367),x=s(38397),I=s(18151);const b="jp-Completer-item",w="jp-mod-active",S=!0;class E extends I.Widget{constructor(e){super({node:document.createElement("div")}),this._activeIndex=0,this._editor=null,this._model=null,this._resetFlag=!1,this._selected=new o.Signal(this),this._visibilityChanged=new o.Signal(this),this._indexChanged=new o.Signal(this),this._lastSubsetMatch="",this._renderer=e.renderer||E.defaultRenderer,this.model=e.model||null,this.editor=e.editor||null,this.addClass("jp-Completer")}get activeIndex(){return this._activeIndex}get editor(){return this._editor}set editor(e){this._editor=e}get selected(){return this._selected}get visibilityChanged(){return this._visibilityChanged}get indexChanged(){return this._indexChanged}get model(){return this._model}set model(e){(e||this._model)&&e!==this._model&&(this._model&&this._model.stateChanged.disconnect(this.onModelStateChanged,this),this._model=e,this._model&&this._model.stateChanged.connect(this.onModelStateChanged,this))}dispose(){this._model=null,super.dispose()}handleEvent(e){if(!this.isHidden&&this._editor)switch(e.type){case"keydown":this._evtKeydown(e);break;case"mousedown":this._evtMousedown(e);break;case"scroll":this._evtScroll(e)}}reset(){this._activeIndex=0,this._lastSubsetMatch="",this._model&&this._model.reset(!0)}selectActive(){const e=this.node.querySelector(".jp-mod-active");e?(this._selected.emit(e.getAttribute("data-value")),this.reset()):this.reset()}onAfterAttach(e){document.addEventListener("keydown",this,S),document.addEventListener("mousedown",this,S),document.addEventListener("scroll",this,S)}onBeforeDetach(e){document.removeEventListener("keydown",this,S),document.removeEventListener("mousedown",this,S),document.removeEventListener("scroll",this,S)}onModelStateChanged(){this.isAttached&&(this._activeIndex=0,this.update())}onUpdateRequest(e){const t=this._model;if(!t)return;if(this._resetFlag)return this._resetFlag=!1,void(this.isHidden||(this.hide(),this._visibilityChanged.emit(void 0)));let s=null,i=t.completionItems&&t.completionItems();if(s=i&&i.length?this._createCompletionItemNode(t,i):this._createIItemNode(t),!s)return;s.querySelectorAll(`.${b}`)[this._activeIndex].classList.add(w);let n=document.createElement("div");n.className="jp-Completer-docpanel",s.appendChild(n),this._updateDocPanel(),t.query||!this._populateSubset()?this.isHidden?(this.show(),this._setGeometry(),this._visibilityChanged.emit(void 0)):this._setGeometry():this.update()}_createCompletionItemNode(e,t){if(!t.length)return this._resetFlag=!0,this.reset(),this.isHidden||(this.hide(),this._visibilityChanged.emit(void 0)),null;let s=this.node;s.textContent="";let i=e.orderedTypes(),n=document.createElement("ul");n.className="jp-Completer-list";for(let e of t){if(!this._renderer.createCompletionItemNode)return null;let t=this._renderer.createCompletionItemNode(e,i);n.appendChild(t)}return s.appendChild(n),s}_createIItemNode(e){const t=(0,f.toArray)(e.items());if(!t||!t.length)return this._resetFlag=!0,this.reset(),this.isHidden||(this.hide(),this._visibilityChanged.emit(void 0)),null;const s=(0,f.toArray)(e.options());if(1===s.length)return this._selected.emit(s[0]),this.reset(),null;const i=this.node;i.textContent="";const n=e.orderedTypes();let o=document.createElement("ul");o.className="jp-Completer-list";for(const s of t){const t=this._renderer.createItemNode(s,e.typeMap(),n);o.appendChild(t)}return i.appendChild(o),i}_cycle(e){const t=this.node.querySelectorAll(`.${b}`),s=this._activeIndex;let i=this.node.querySelector(".jp-mod-active");if(i.classList.remove(w),"up"===e)this._activeIndex=0===s?t.length-1:s-1;else if("down"===e)this._activeIndex=s<t.length-1?s+1:0;else{const n=this.node.getBoundingClientRect().height,o=i.getBoundingClientRect().height,r=Math.floor(n/o);this._activeIndex="pageUp"===e?s-r:s+r,this._activeIndex=Math.min(Math.max(0,this._activeIndex),t.length-1)}i=t[this._activeIndex],i.classList.add(w);let n=this.node.querySelector(".jp-Completer-list");x.ElementExt.scrollIntoViewIfNeeded(n,i),this._indexChanged.emit(this._activeIndex),this._updateDocPanel()}_evtKeydown(e){if(!this.isHidden&&this._editor)if(this._editor.host.contains(e.target))switch(e.keyCode){case 9:{e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation();const t=this._model;if(!t)return;const s=t.completionItems&&t.completionItems();if(s&&1===s.length)return this._selected.emit(s[0].insertText||s[0].label),void this.reset();const i=this._populateSubset();return t.query&&t.query!=this._lastSubsetMatch&&(t.subsetMatch=!0,this._selected.emit(t.query),t.subsetMatch=!1,this._lastSubsetMatch=t.query),i&&this.update(),void this._cycle(e.shiftKey?"up":"down")}case 27:return e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),void this.reset();case 33:case 34:case 38:case 40:{e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation();const t=M.keyCodeMap[e.keyCode];return void this._cycle(t)}default:return}else this.reset()}_evtMousedown(e){if(this.isHidden||!this._editor)return;if(M.nonstandardClick(e))return void this.reset();let t=e.target;for(;t!==document.documentElement;){if(t.classList.contains(b))return e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),this._selected.emit(t.getAttribute("data-value")),void this.reset();if(t===this.node)return e.preventDefault(),e.stopPropagation(),void e.stopImmediatePropagation();t=t.parentElement}this.reset()}_evtScroll(e){if(this.isHidden||!this._editor)return;const{node:t}=this;t.contains(e.target)||requestAnimationFrame((()=>{this._setGeometry()}))}_populateSubset(){const{model:e}=this;if(!e)return!1;const t=this.node.querySelectorAll(`.${b}`),s=M.commonSubset(M.itemValues(t)),{query:i}=e;return!(!s||s===i||0!==s.indexOf(i)||(e.query=s,0))}_setGeometry(){const{node:e}=this,t=this._model,s=this._editor;if(!(s&&t&&t.original&&t.cursor))return;const i=t.cursor.start,n=s.getPositionAt(i),o=s.getCoordinateForPosition(n),r=window.getComputedStyle(e),a=parseInt(r.borderLeftWidth,10)||0,l=parseInt(r.paddingLeft,10)||0;y.HoverBox.setGeometry({anchor:o,host:s.host,maxHeight:300,minHeight:20,node:e,offset:{horizontal:a+l},privilege:"below",style:r})}_updateDocPanel(){var e,t;let s=this.node.querySelector(".jp-Completer-docpanel");if(!s)return;if(!(null===(e=this.model)||void 0===e?void 0:e.completionItems))return;let i=null===(t=this.model)||void 0===t?void 0:t.completionItems();if(!i)return void s.setAttribute("style","display:none");let n=i[this._activeIndex];if(n)if(s.textContent="",n.documentation){let e;e=this._renderer.createDocumentationNode?this._renderer.createDocumentationNode(n):E.defaultRenderer.createDocumentationNode(n),s.appendChild(e),s.setAttribute("style","")}else s.setAttribute("style","display:none");else s.setAttribute("style","display:none")}}var M;!function(e){class t{createCompletionItemNode(e,t){let s=this._createBaseNode(e.insertText||e.label);return e.deprecated&&s.classList.add("jp-Completer-deprecated"),this._constructNode(s,this._createMatchNode(e.label),!!e.type,e.type,t,e.icon)}createItemNode(e,t,s){return this._constructNode(this._createBaseNode(e.raw),this._createMatchNode(e.text),!C.JSONExt.deepEqual(t,{}),t[e.raw]||"",s)}createDocumentationNode(e){let t=document.createElement("pre");return t.textContent=e.documentation||"",t}_createBaseNode(e){const t=document.createElement("li");return t.className=b,t.setAttribute("data-value",e),t}_createMatchNode(e){const t=document.createElement("code");return t.className="jp-Completer-match",t.innerHTML=y.defaultSanitizer.sanitize(e,{allowedTags:["mark"]}),t}_constructNode(e,t,s,i,n,o){if(o){const t=o.element({className:"jp-Completer-type jp-Completer-icon"});e.appendChild(t)}else if(s){const t=document.createElement("span");t.textContent=(i[0]||"").toLowerCase();const s=n.indexOf(i)%10+1;t.className="jp-Completer-type jp-Completer-monogram",t.setAttribute("data-color-index",s.toString()),e.appendChild(t)}else{const t=document.createElement("span");t.className="jp-Completer-monogram",e.appendChild(t)}if(e.appendChild(t),s){e.title=i;const t=document.createElement("code");t.className="jp-Completer-typeExtended",t.textContent=i.toLocaleLowerCase(),e.appendChild(t)}else{const t=document.createElement("span");t.className="jp-Completer-typeExtended",e.appendChild(t)}return e}}e.Renderer=t,e.defaultRenderer=new t}(E||(E={})),function(e){e.keyCodeMap={38:"up",40:"down",33:"pageUp",34:"pageDown"},e.commonSubset=function(e){const t=e.length;let s="";if(t<2)return s;const i=e[0].length;for(let n=0;n<i;n++){const i=e[0][n];for(let o=1;o<t;o++)if(e[o][n]!==i)return s;s+=i}return s},e.itemValues=function(e){const t=[];for(let s=0,i=e.length;s<i;s++){const i=e[s].getAttribute("data-value");i&&t.push(i)}return t},e.nonstandardClick=function(e){return 0!==e.button||e.altKey||e.ctrlKey||e.shiftKey||e.metaKey}}(M||(M={}));const q=new C.Token("@jupyterlab/completer:ICompletionManager")}}]);
//# sourceMappingURL=1570.2c68814a0705615ea5fa.js.map