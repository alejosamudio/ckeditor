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

const Bridge = (() => {
        const BRIDGE_ID = 'CKE_BUBBLE_BRIDGE_V1';
        const VERSION = '1.0.0';
        const search = typeof window.location?.search === 'string' ? window.location.search : '';
        const params = new URLSearchParams(search);
        let storedDebug = false;

        try {
                storedDebug = window.localStorage?.getItem('ckeBridgeDebug') === 'true';
        } catch (error) {
                storedDebug = false;
        }

        let debugEnabled =
                params.get('debug') === '1' ||
                params.get('debug') === 'true' ||
                storedDebug ||
                window.CKEDITOR_BRIDGE_DEBUG === true;

        const logPrefix = '[CKEditorBridge]';
        const isEmbedded = window.parent !== window;
        let parentReady = !isEmbedded;
        let targetOrigin = isEmbedded ? '*' : window.origin;
        let handshakeTimer = null;
        let handshakeAttempts = 0;
        const MAX_HANDSHAKE_ATTEMPTS = 20;
        const outgoingQueue = [];
        const pendingEditorActions = [];
        const parentReadyCallbacks = [];
        const messageHandlers = new Map();
        let editorInstance = null;

        const constants = {
                BRIDGE_ID,
                VERSION,
                get DEBUG() {
                        return debugEnabled;
                },
                isEmbedded
        };

        function log(...args) {
                if (debugEnabled) {
                        console.log(logPrefix, ...args);
                }
        }

        function setDebug(enabled) {
                debugEnabled = Boolean(enabled);

                try {
                        window.localStorage?.setItem('ckeBridgeDebug', debugEnabled ? 'true' : 'false');
                } catch (error) {
                        // LocalStorage might be unavailable (e.g. in private mode). Ignore errors silently.
                }

                if (debugEnabled) {
                        console.log(logPrefix, 'Debug mode enabled');
                } else {
                        console.log(logPrefix, 'Debug mode disabled');
                }
        }

        function composeMessage(type, payload = {}, overrides = {}) {
                return {
                        bridge: BRIDGE_ID,
                        version: VERSION,
                        type,
                        payload,
                        direction: overrides.direction || 'editor->parent',
                        timestamp: Date.now(),
                        requestId: overrides.requestId ?? null,
                        messageId: overrides.messageId || `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
                };
        }

        function doPost(message) {
                const origin = targetOrigin || '*';

                if (isEmbedded) {
                        window.parent.postMessage(message, origin);
                } else {
                        window.postMessage(message, origin);
                }

                log('Sent message', message, '→', origin);
        }

        function flushQueue() {
                if (!parentReady) return;

                while (outgoingQueue.length) {
                        doPost(outgoingQueue.shift());
                }
        }

        function send(type, payload = {}, options = {}) {
                const message = composeMessage(type, payload, options);

                if (parentReady || type === 'EDITOR_READY') {
                        doPost(message);
                } else {
                        log('Queueing message until parent is ready', message);
                        outgoingQueue.push(message);
                }
        }

        function startHandshake() {
                if (!isEmbedded) {
                        log('Not embedded in an iframe. Parent communication disabled.');
                        parentReady = true;
                        flushQueue();
                        return;
                }

                if (handshakeTimer) return;
                handshakeAttempts = 0;

                const emitReady = () => {
                        handshakeAttempts += 1;
                        send('EDITOR_READY', {
                                attempt: handshakeAttempts,
                                isEmbedded,
                                userAgent: navigator.userAgent
                        });
                };

                emitReady();

                handshakeTimer = window.setInterval(() => {
                        if (parentReady) {
                                window.clearInterval(handshakeTimer);
                                handshakeTimer = null;
                                return;
                        }

                        if (handshakeAttempts >= MAX_HANDSHAKE_ATTEMPTS) {
                                window.clearInterval(handshakeTimer);
                                handshakeTimer = null;
                                log('No handshake acknowledgement received. Proceeding with wildcard origin.');
                                parentReady = true;
                                flushQueue();
                                return;
                        }

                        emitReady();
                }, 500);
        }

        function setTargetOrigin(origin) {
                if (origin && origin !== 'null') {
                        targetOrigin = origin;
                        log('Target origin updated to', targetOrigin);
                }
        }

        function acknowledgeParent(origin, payload = {}) {
                if (!parentReady) {
                        parentReady = true;

                        if (payload && payload.targetOrigin) {
                                targetOrigin = payload.targetOrigin;
                        } else {
                                setTargetOrigin(origin);
                        }

                        if (handshakeTimer) {
                                window.clearInterval(handshakeTimer);
                                handshakeTimer = null;
                        }

                        log('Handshake completed with parent.');
                        flushQueue();
                        send('EDITOR_READY_ACK', { receivedAt: Date.now() });

                        while (parentReadyCallbacks.length) {
                                const callback = parentReadyCallbacks.shift();

                                try {
                                        callback({ origin: targetOrigin });
                                } catch (error) {
                                        console.error(logPrefix, 'Parent ready callback failed', error);
                                }
                        }
                } else if (targetOrigin === '*' && origin && origin !== 'null') {
                        setTargetOrigin(origin);
                }
        }

        function withEditor(callback) {
                if (editorInstance) {
                        callback(editorInstance);
                } else {
                        pendingEditorActions.push(callback);
                }
        }

        function setEditor(editor) {
                editorInstance = editor;

                while (pendingEditorActions.length) {
                        const action = pendingEditorActions.shift();

                        try {
                                action(editorInstance);
                        } catch (error) {
                                console.error(logPrefix, 'Deferred editor action failed', error);
                        }
                }
        }

        function onParentReady(callback) {
                if (typeof callback !== 'function') return;

                if (parentReady) {
                        callback({ origin: targetOrigin });
                } else {
                        parentReadyCallbacks.push(callback);
                }
        }

        function registerHandler(type, handler) {
                if (typeof handler === 'function') {
                        messageHandlers.set(type, handler);
                }
        }

        window.addEventListener('message', event => {
                const data = event.data;

                if (!data || data.bridge !== BRIDGE_ID) return;
                if (isEmbedded && event.source !== window.parent) return;
                if (data.direction && data.direction !== 'parent->editor') return;

                log('Received message', data, 'from', event.origin);

                if (!parentReady || data.type === 'PARENT_READY') {
                        acknowledgeParent(event.origin, data.payload || {});
                } else if (targetOrigin === '*' && event.origin && event.origin !== 'null') {
                        setTargetOrigin(event.origin);
                }

                const handler = messageHandlers.get(data.type);

                if (handler) {
                        try {
                                handler({
                                        payload: data.payload || {},
                                        requestId: data.requestId ?? null,
                                        event,
                                        send
                                });
                        } catch (error) {
                                console.error(logPrefix, `Error handling message ${data.type}`, error);
                                send('HANDLER_ERROR', {
                                        type: data.type,
                                        message: error?.message || 'Unknown handler error'
                                });
                        }
                } else if (data.type !== 'PARENT_READY') {
                        log('No handler registered for type', data.type);
                }
        });

        return {
                send,
                startHandshake,
                setEditor,
                withEditor,
                onParentReady,
                registerHandler,
                setDebug,
                constants
        };
})();

window.CKEDITOR_BUBBLE_BRIDGE = Bridge;

let suppressChangeEvents = false;

function applyExternalContent(html, { ackType, requestId, reason, focus } = {}) {
        Bridge.withEditor(editor => {
                suppressChangeEvents = true;
                let success = false;
                let errorMessage = null;

                try {
                        editor.setData(typeof html === 'string' ? html : '');

                        if (focus) {
                                editor.editing.view.focus();
                        }

                        success = true;
                } catch (error) {
                        errorMessage = error?.message || 'Unknown error applying editor content.';
                        console.error('[CKEditorBridge] Failed to apply content from parent', error);
                        Bridge.send('CONTENT_ERROR', {
                                requestId,
                                reason,
                                message: errorMessage,
                                timestamp: Date.now()
                        });
                }

                window.setTimeout(() => {
                        suppressChangeEvents = false;

                        if (ackType) {
                                Bridge.send(ackType, {
                                        requestId,
                                        status: success ? 'ok' : 'error',
                                        reason,
                                        message: errorMessage,
                                        timestamp: Date.now()
                                });
                        }

                        if (success) {
                                Bridge.send('CONTENT_SYNC', {
                                        requestId,
                                        html: editor.getData(),
                                        reason,
                                        timestamp: Date.now()
                                });
                        }
                }, 0);
        });
}

Bridge.registerHandler('INIT', ({ payload, requestId }) => {
        applyExternalContent(payload?.html ?? '', {
                ackType: 'INIT_ACK',
                requestId,
                reason: 'init',
                focus: payload?.focus === true
        });
});

Bridge.registerHandler('SET_CONTENT', ({ payload, requestId }) => {
        applyExternalContent(payload?.html ?? '', {
                ackType: 'SET_CONTENT_ACK',
                requestId,
                reason: payload?.reason || 'set-content',
                focus: payload?.focus === true
        });
});

Bridge.registerHandler('CLEAR_CONTENT', ({ requestId }) => {
        applyExternalContent('', {
                ackType: 'CLEAR_CONTENT_ACK',
                requestId,
                reason: 'clear-content'
        });
});

Bridge.registerHandler('REQUEST_CONTENT', ({ requestId }) => {
        Bridge.withEditor(editor => {
                Bridge.send('CONTENT_SYNC', {
                        requestId,
                        html: editor.getData(),
                        reason: 'requested-sync',
                        timestamp: Date.now()
                });
        });
});

Bridge.registerHandler('PING', ({ requestId, payload }) => {
        Bridge.send('PONG', {
                requestId,
                echo: payload?.echo ?? null,
                timestamp: Date.now()
        });
});

Bridge.registerHandler('SET_DEBUG', ({ payload, requestId }) => {
        const desiredState =
                typeof payload?.enabled === 'boolean' ? payload.enabled : !Bridge.constants.DEBUG;

        Bridge.setDebug(desiredState);
        Bridge.send('SET_DEBUG_ACK', {
                requestId,
                status: 'ok',
                enabled: Bridge.constants.DEBUG,
                timestamp: Date.now()
        });
});

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

const CHANGE_DEBOUNCE_MS = 250;

// Initialize editor
DecoupledEditor.create(document.querySelector('#editor'), editorConfig)
        .then(editor => {
                // Append toolbar & menu
                document.querySelector('#editor-toolbar').appendChild(editor.ui.view.toolbar.element);
                document.querySelector('#editor-menu-bar').appendChild(editor.ui.view.menuBarView.element);

                // Expose editor globally
                window.editor = editor;
                Bridge.setEditor(editor);

                // 🔁 Send live updates to Bubble (with debounce)
                let debounceTimer;
                editor.model.document.on('change:data', () => {
                        if (suppressChangeEvents) {
                                return;
                        }

                        window.clearTimeout(debounceTimer);
                        debounceTimer = window.setTimeout(() => {
                                const html = editor.getData();
                                Bridge.send('CONTENT_CHANGE', {
                                        html,
                                        reason: 'user-input',
                                        timestamp: Date.now()
                                });
                        }, CHANGE_DEBOUNCE_MS);
                });

                Bridge.onParentReady(() => {
                        Bridge.send('CONTENT_SYNC', {
                                html: editor.getData(),
                                reason: 'initial-sync',
                                timestamp: Date.now()
                        });
                });

                Bridge.startHandshake();

                return editor;
        })
        .catch(error => {
                console.error(error);
                Bridge.send('EDITOR_ERROR', {
                        message: error?.message || 'Failed to initialize CKEditor.',
                        stack: error?.stack || null,
                        timestamp: Date.now()
                });
        });

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