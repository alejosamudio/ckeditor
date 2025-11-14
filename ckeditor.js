/**
 * This configuration was generated using the CKEditor 5 Builder.
 * You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/
 */

const {
	DecoupledEditor,
	Autosave,
	Essentials,
	Paragraph,
	CloudServices,
	Autoformat,
	TextTransformation,
	LinkImage,
	Link,
	ImageBlock,
	ImageToolbar,
	BlockQuote,
	Bold,
	Bookmark,
	CKBox,
	ImageUpload,
	ImageInsert,
	ImageInsertViaUrl,
	AutoImage,
	PictureEditing,
	CKBoxImageEdit,
	CodeBlock,
	TableColumnResize,
	Table,
	TableToolbar,
	Emoji,
	Mention,
	PasteFromOffice,
	FindAndReplace,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	Heading,
	HorizontalLine,
	ImageCaption,
	ImageResize,
	ImageStyle,
	Indent,
	IndentBlock,
	Code,
	Italic,
	AutoLink,
	ListProperties,
	List,
	MediaEmbed,
	RemoveFormat,
	SpecialCharactersArrows,
	SpecialCharacters,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersLatin,
	SpecialCharactersMathematical,
	SpecialCharactersText,
	Strikethrough,
	Subscript,
	Superscript,
	TableCaption,
	TableCellProperties,
	TableProperties,
	Alignment,
	TodoList,
	Underline,
	BalloonToolbar
} = window.CKEDITOR;

const {
	AIChat,
	AIEditorIntegration,
	AIQuickActions,
	AIReviewMode,
	PasteFromOfficeEnhanced,
	FormatPainter,
	LineHeight,
	RealTimeCollaborativeComments,
	RealTimeCollaborativeEditing,
	PresenceList,
	Comments,
	RealTimeCollaborativeTrackChanges,
	TrackChanges,
	TrackChangesData,
	TrackChangesPreview,
	SlashCommand
} = window.CKEDITOR_PREMIUM_FEATURES;

const LICENSE_KEY =
	'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjQyMDE1OTksImp0aSI6ImNiMWJiNTk0LWIxODEtNGJmMi1iZTA5LTM2ZGM1MjY3MzIxZiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImFhNmQ1YmUwIn0.a4QCfokW3f4OX2Td4j7I5Nv6J9NsaWg4atvrEmD90ijhttvsbqFMfaoJ4a-X_V0ZJ0mxSN6mMf1jjWLJGlV0dQ';

const DOCUMENT_ID = '<YOUR_DOCUMENT_ID>';

const CLOUD_SERVICES_TOKEN_URL =
	'https://uplnolydjmzr.cke-cs.com/token/dev/9dcdd882883e3315126ce6f9865e9ec42fa58287442ece2a12be481798c5?limit=10';
const CLOUD_SERVICES_WEBSOCKET_URL = 'wss://uplnolydjmzr.cke-cs.com/ws';

const editorConfig = {
	toolbar: {
		items: [
			'undo',
			'redo',
			'|',
			'trackChanges',
			'comment',
			'commentsArchive',
			'|',
			'toggleAi',
			'aiQuickActions',
			'|',
			'formatPainter',
			'findAndReplace',
			'|',
			'heading',
			'|',
			'fontSize',
			'fontFamily',
			'fontColor',
			'fontBackgroundColor',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'subscript',
			'superscript',
			'code',
			'removeFormat',
			'|',
			'emoji',
			'specialCharacters',
			'horizontalLine',
			'link',
			'bookmark',
			'insertImage',
			'insertImageViaUrl',
			'ckbox',
			'mediaEmbed',
			'insertTable',
			'blockQuote',
			'codeBlock',
			'|',
			'alignment',
			'lineHeight',
			'|',
			'bulletedList',
			'numberedList',
			'todoList',
			'outdent',
			'indent'
		],
		shouldNotGroupWhenFull: false
	},
	plugins: [
		AIChat,
		AIEditorIntegration,
		AIQuickActions,
		AIReviewMode,
		Alignment,
		Autoformat,
		AutoImage,
		AutoLink,
		Autosave,
		BalloonToolbar,
		BlockQuote,
		Bold,
		Bookmark,
		CKBox,
		CKBoxImageEdit,
		CloudServices,
		Code,
		CodeBlock,
		Comments,
		Emoji,
		Essentials,
		FindAndReplace,
		FontBackgroundColor,
		FontColor,
		FontFamily,
		FontSize,
		FormatPainter,
		Heading,
		HorizontalLine,
		ImageBlock,
		ImageCaption,
		ImageInsert,
		ImageInsertViaUrl,
		ImageResize,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		Indent,
		IndentBlock,
		Italic,
		LineHeight,
		Link,
		LinkImage,
		List,
		ListProperties,
		MediaEmbed,
		Mention,
		Paragraph,
		PasteFromOffice,
		PasteFromOfficeEnhanced,
		PictureEditing,
		PresenceList,
		RealTimeCollaborativeComments,
		RealTimeCollaborativeEditing,
		RealTimeCollaborativeTrackChanges,
		RemoveFormat,
		SlashCommand,
		SpecialCharacters,
		SpecialCharactersArrows,
		SpecialCharactersCurrency,
		SpecialCharactersEssentials,
		SpecialCharactersLatin,
		SpecialCharactersMathematical,
		SpecialCharactersText,
		Strikethrough,
		Subscript,
		Superscript,
		Table,
		TableCaption,
		TableCellProperties,
		TableColumnResize,
		TableProperties,
		TableToolbar,
		TextTransformation,
		TodoList,
		TrackChanges,
		TrackChangesData,
		TrackChangesPreview,
		Underline
	],
	ai: {
		container: {
			type: 'overlay',
			side: 'right'
		},
		chat: {
			models: {},
			context: {
				document: { enabled: true },
				urls: { enabled: true },
				files: { enabled: true }
			}
		}
	},
	balloonToolbar: [
		'comment',
		'|',
		'aiQuickActions',
		'|',
		'bold',
		'italic',
		'|',
		'link',
		'insertImage',
		'|',
		'bulletedList',
		'numberedList'
	],
	cloudServices: {
		tokenUrl: CLOUD_SERVICES_TOKEN_URL,
		webSocketUrl: CLOUD_SERVICES_WEBSOCKET_URL
	},
	collaboration: { channelId: DOCUMENT_ID },
	comments: {
		editorConfig: {
			extraPlugins: [Autoformat, Bold, Italic, List, Mention],
			mention: {
				feeds: [{ marker: '@', feed: [] }]
			}
		}
	},
	fontFamily: { supportAllValues: true },
	fontSize: { options: [10, 12, 14, 'default', 18, 20, 22], supportAllValues: true },
	heading: {
		options: [
			{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
			{ model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
			{ model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
			{ model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
			{ model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
			{ model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
			{ model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
		]
	},
	image: {
		toolbar: [
			'toggleImageCaption',
			'|',
			'imageStyle:alignBlockLeft',
			'imageStyle:block',
			'imageStyle:alignBlockRight',
			'|',
			'resizeImage',
			'|',
			'ckboxImageEdit'
		],
		styles: { options: ['alignBlockLeft', 'block', 'alignBlockRight'] }
	},
	initialData: '<p>Start writing...</p>',
	licenseKey: LICENSE_KEY,
	lineHeight: { supportAllValues: true },
	link: {
		addTargetToExternalLinks: true,
		defaultProtocol: 'https://',
		decorators: {
			toggleDownloadable: {
				mode: 'manual',
				label: 'Downloadable',
				attributes: { download: 'file' }
			}
		}
	},
	list: { properties: { styles: true, startIndex: true, reversed: true } },
	mention: { feeds: [{ marker: '@', feed: [] }] },
	placeholder: 'Type or paste your content here!',
	presenceList: { container: document.querySelector('#editor-presence') },
	sidebar: { container: document.querySelector('#editor-annotations') },
	table: {
		contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
	}
};

// Show config alert if premium keys are missing
configUpdateAlert(editorConfig);

// Initialize editor
DecoupledEditor.create(document.querySelector('#editor'), editorConfig)
	.then(editor => {
		// Append toolbar & menu
		document.querySelector('#editor-toolbar').appendChild(editor.ui.view.toolbar.element);
		document.querySelector('#editor-menu-bar').appendChild(editor.ui.view.menuBarView.element);

		// Expose editor globally
		window.editor = editor;

		// 🔁 Send live updates to Bubble (with debounce)
		let debounceTimer;
		editor.model.document.on('change:data', () => {
			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => {
				const content = editor.getData();
				window.parent.postMessage(
					{ type: 'CKEDITOR_CONTENT_UPDATE', data: content },
					'*'
				);
			}, 300);
		});

		// 📨 Listen for data from Bubble
		window.addEventListener('message', (event) => {
			if (event.data.type === 'LOAD_CONTENT') {
				editor.setData(event.data.data || '');
			}
		});

		// ✅ Notify when ready
		window.parent.postMessage({ type: 'CKEDITOR_READY' }, '*');

		return editor;
	})
	.catch(console.error);

// Premium reminder
function configUpdateAlert(config) {
	if (configUpdateAlert.configUpdateAlertShown) return;

	const isModifiedByUser = (currentValue, forbiddenValue) =>
		currentValue !== forbiddenValue && currentValue !== undefined;

	const valuesToUpdate = [];
	configUpdateAlert.configUpdateAlertShown = true;

	if (!isModifiedByUser(config.licenseKey, '<YOUR_LICENSE_KEY>')) valuesToUpdate.push('LICENSE_KEY');
	if (!isModifiedByUser(config.cloudServices?.tokenUrl, '<YOUR_CLOUD_SERVICES_TOKEN_URL>'))
		valuesToUpdate.push('CLOUD_SERVICES_TOKEN_URL');
	if (!isModifiedByUser(config.cloudServices?.webSocketUrl, '<YOUR_CLOUD_SERVICES_WEBSOCKET_URL>'))
		valuesToUpdate.push('CLOUD_SERVICES_WEBSOCKET_URL');

	if (valuesToUpdate.length) {
		window.alert(
			[
				'Please update the following values in your editor config',
				'to receive full access to Premium Features:',
				'',
				...valuesToUpdate.map(value => ` - ${value}`)
			].join('\n')
		);
	}
}