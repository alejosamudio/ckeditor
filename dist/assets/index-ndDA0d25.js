(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const{DecoupledEditor:p,Autosave:g,Essentials:f,Paragraph:b,CloudServices:C,Autoformat:s,TextTransformation:k,LinkImage:I,Link:y,ImageBlock:E,ImageToolbar:S,BlockQuote:L,Bold:c,Bookmark:w,CKBox:T,ImageUpload:v,ImageInsert:R,ImageInsertViaUrl:O,AutoImage:_,PictureEditing:U,CKBoxImageEdit:A,CodeBlock:N,TableColumnResize:x,Table:K,TableToolbar:P,Emoji:B,Mention:d,PasteFromOffice:D,FindAndReplace:W,FontBackgroundColor:F,FontColor:V,FontFamily:H,FontSize:M,Heading:J,HorizontalLine:z,ImageCaption:Y,ImageResize:j,ImageStyle:G,Indent:Q,IndentBlock:Z,Code:q,Italic:u,AutoLink:X,ListProperties:$,List:m,MediaEmbed:ee,RemoveFormat:te,SpecialCharactersArrows:ie,SpecialCharacters:oe,SpecialCharactersCurrency:ne,SpecialCharactersEssentials:ae,SpecialCharactersLatin:re,SpecialCharactersMathematical:le,SpecialCharactersText:se,Strikethrough:ce,Subscript:de,Superscript:ue,TableCaption:me,TableCellProperties:he,TableProperties:pe,Alignment:ge,TodoList:fe,Underline:be,BalloonToolbar:Ce}=window.CKEDITOR,{AIChat:ke,AIEditorIntegration:Ie,AIQuickActions:ye,AIReviewMode:Ee,PasteFromOfficeEnhanced:Se,FormatPainter:Le,LineHeight:we,RealTimeCollaborativeComments:Te,RealTimeCollaborativeEditing:ve,PresenceList:Re,Comments:Oe,RealTimeCollaborativeTrackChanges:_e,TrackChanges:Ue,TrackChangesData:Ae,TrackChangesPreview:Ne,SlashCommand:xe}=window.CKEDITOR_PREMIUM_FEATURES,Ke="eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjQyMDE1OTksImp0aSI6ImNiMWJiNTk0LWIxODEtNGJmMi1iZTA5LTM2ZGM1MjY3MzIxZiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImFhNmQ1YmUwIn0.a4QCfokW3f4OX2Td4j7I5Nv6J9NsaWg4atvrEmD90ijhttvsbqFMfaoJ4a-X_V0ZJ0mxSN6mMf1jjWLJGlV0dQ",Pe="<YOUR_DOCUMENT_ID>",Be="https://uplnolydjmzr.cke-cs.com/token/dev/9dcdd882883e3315126ce6f9865e9ec42fa58287442ece2a12be481798c5?limit=10",De="wss://uplnolydjmzr.cke-cs.com/ws",h={toolbar:{items:["undo","redo","|","trackChanges","comment","commentsArchive","|","toggleAi","aiQuickActions","|","formatPainter","findAndReplace","|","heading","|","fontSize","fontFamily","fontColor","fontBackgroundColor","|","bold","italic","underline","strikethrough","subscript","superscript","code","removeFormat","|","emoji","specialCharacters","horizontalLine","link","bookmark","insertImage","insertImageViaUrl","ckbox","mediaEmbed","insertTable","blockQuote","codeBlock","|","alignment","lineHeight","|","bulletedList","numberedList","todoList","outdent","indent"],shouldNotGroupWhenFull:!1},plugins:[ke,Ie,ye,Ee,ge,s,_,X,g,Ce,L,c,w,T,A,C,q,N,Oe,B,f,W,F,V,H,M,Le,J,z,E,Y,R,O,j,G,S,v,Q,Z,u,we,y,I,m,$,ee,d,b,D,Se,U,Re,Te,ve,_e,te,xe,oe,ie,ne,ae,re,le,se,ce,de,ue,K,me,he,x,pe,P,k,fe,Ue,Ae,Ne,be],ai:{container:{type:"overlay",side:"right"},chat:{models:{},context:{document:{enabled:!0},urls:{enabled:!0},files:{enabled:!0}}}},balloonToolbar:["comment","|","aiQuickActions","|","bold","italic","|","link","insertImage","|","bulletedList","numberedList"],cloudServices:{tokenUrl:Be,webSocketUrl:De},collaboration:{channelId:Pe},comments:{editorConfig:{extraPlugins:[s,c,u,m,d],mention:{feeds:[{marker:"@",feed:[]}]}}},fontFamily:{supportAllValues:!0},fontSize:{options:[10,12,14,"default",18,20,22],supportAllValues:!0},heading:{options:[{model:"paragraph",title:"Paragraph",class:"ck-heading_paragraph"},{model:"heading1",view:"h1",title:"Heading 1",class:"ck-heading_heading1"},{model:"heading2",view:"h2",title:"Heading 2",class:"ck-heading_heading2"},{model:"heading3",view:"h3",title:"Heading 3",class:"ck-heading_heading3"},{model:"heading4",view:"h4",title:"Heading 4",class:"ck-heading_heading4"},{model:"heading5",view:"h5",title:"Heading 5",class:"ck-heading_heading5"},{model:"heading6",view:"h6",title:"Heading 6",class:"ck-heading_heading6"}]},image:{toolbar:["toggleImageCaption","|","imageStyle:alignBlockLeft","imageStyle:block","imageStyle:alignBlockRight","|","resizeImage","|","ckboxImageEdit"],styles:{options:["alignBlockLeft","block","alignBlockRight"]}},initialData:`<h2>Congratulations on setting up CKEditor 5! 🎉</h2>
<p>
	You've successfully created a CKEditor 5 project. This powerful text editor
	will enhance your application, enabling rich text editing capabilities that
	are customizable and easy to use.
</p>
<h3>What's next?</h3>
<ol>
	<li>
		<strong>Integrate into your app</strong>: time to bring the editing into
		your application. Take the code you created and add to your application.
	</li>
	<li>
		<strong>Explore features:</strong> Experiment with different plugins and
		toolbar options to discover what works best for your needs.
	</li>
	<li>
		<strong>Customize your editor:</strong> Tailor the editor's
		configuration to match your application's style and requirements. Or
		even write your plugin!
	</li>
</ol>
<p>
	Keep experimenting, and don't hesitate to push the boundaries of what you
	can achieve with CKEditor 5. Your feedback is invaluable to us as we strive
	to improve and evolve. Happy editing!
</p>
<h3>Helpful resources</h3>
<ul>
	<li>📝 <a href="https://portal.ckeditor.com/checkout?plan=free">Trial sign up</a>,</li>
	<li>📕 <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/index.html">Documentation</a>,</li>
	<li>⭐️ <a href="https://github.com/ckeditor/ckeditor5">GitHub</a> (star us if you can!),</li>
	<li>🏠 <a href="https://ckeditor.com">CKEditor Homepage</a>,</li>
	<li>🧑‍💻 <a href="https://ckeditor.com/ckeditor-5/demo/">CKEditor 5 Demos</a>,</li>
</ul>
<h3>Need help?</h3>
<p>
	See this text, but the editor is not starting up? Check the browser's
	console for clues and guidance. It may be related to an incorrect license
	key if you use premium features or another feature-related requirement. If
	you cannot make it work, file a GitHub issue, and we will help as soon as
	possible!
</p>
`,licenseKey:Ke,lineHeight:{supportAllValues:!0},link:{addTargetToExternalLinks:!0,defaultProtocol:"https://",decorators:{toggleDownloadable:{mode:"manual",label:"Downloadable",attributes:{download:"file"}}}},list:{properties:{styles:!0,startIndex:!0,reversed:!0}},mention:{feeds:[{marker:"@",feed:[]}]},placeholder:"Type or paste your content here!",presenceList:{container:document.querySelector("#editor-presence")},sidebar:{container:document.querySelector("#editor-annotations")},table:{contentToolbar:["tableColumn","tableRow","mergeTableCells","tableProperties","tableCellProperties"]}};l(h);p.create(document.querySelector("#editor"),h).then(i=>(document.querySelector("#editor-toolbar").appendChild(i.ui.view.toolbar.element),document.querySelector("#editor-menu-bar").appendChild(i.ui.view.menuBarView.element),i));function l(i){if(l.configUpdateAlertShown)return;const o=(a,e)=>!(a===e||a===void 0),n=[];l.configUpdateAlertShown=!0,o(i.licenseKey,"<YOUR_LICENSE_KEY>")||n.push("LICENSE_KEY"),o(i.cloudServices?.tokenUrl,"<YOUR_CLOUD_SERVICES_TOKEN_URL>")||n.push("CLOUD_SERVICES_TOKEN_URL"),o(i.cloudServices?.webSocketUrl,"<YOUR_CLOUD_SERVICES_WEBSOCKET_URL>")||n.push("CLOUD_SERVICES_WEBSOCKET_URL"),n.length&&window.alert(["Please update the following values in your editor config","to receive full access to Premium Features:","",...n.map(a=>` - ${a}`)].join(`
`))}
