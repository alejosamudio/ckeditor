/**
 * CKEditor 5 + Bubble — Minimal Bridge Version (Option B)
 * SAFE VERSION — NO AUTO INITIALIZATION
 * -------------------------------------------------------
 *   Editor → Bubble:
 *      - EDITOR_READY
 *      - CONTENT_UPDATE
 *
 *   Bubble → Editor:
 *      - LOAD_EDITOR   (triggers create)
 *      - LOAD_CONTENT  (sets content after create)
 */

const BRIDGE_ID = "CKE_BUBBLE_MINI_V1";

/* ----------------------------------------------------------
   POST MESSAGE → BUBBLE
----------------------------------------------------------- */

function sendToParent(type, payload = {}) {
    window.parent?.postMessage(
        { bridge: BRIDGE_ID, type, payload },
        "*"
    );
}

/* ----------------------------------------------------------
   GLOBALS
----------------------------------------------------------- */

window.editor = null;
window.suppressEditorEvents = false;

/* ----------------------------------------------------------
   MESSAGE HANDLER FROM BUBBLE
----------------------------------------------------------- */

window.addEventListener("message", (event) => {
    const msg = event.data;
    if (!msg || msg.bridge !== BRIDGE_ID) return;

    // 1) Bubble tells us to create the editor
    if (msg.type === "LOAD_EDITOR") {
        initializeEditorSafely();
        return;
    }

    // 2) Bubble sends updated HTML
    if (msg.type === "LOAD_CONTENT") {
        if (!window.editor) return;

        window.suppressEditorEvents = true;
        try {
            window.editor.setData(msg.payload.html || "");
        } finally {
            setTimeout(() => (window.suppressEditorEvents = false), 10);
        }
    }
});

/* ----------------------------------------------------------
   WAIT FOR CKEditor's UMD bundles
----------------------------------------------------------- */

function waitForCkGlobals(callback, attempt = 0) {
    if (window.CKEDITOR && window.CKEDITOR_PREMIUM_FEATURES) {
        return callback();
    }

    if (attempt > 40) {
        console.error("[CKEditor] UMD bundles did not load");
        return;
    }

    setTimeout(() => waitForCkGlobals(callback, attempt + 1), 150);
}

/* ----------------------------------------------------------
   PROTECTED INITIALIZATION
----------------------------------------------------------- */

function initializeEditorSafely() {
    if (window.editor) {
        console.warn("Editor already initialized — ignoring LOAD_EDITOR");
        return;
    }

    waitForCkGlobals(() => {
        initializeEditor(window.CKEDITOR, window.CKEDITOR_PREMIUM_FEATURES);
    });
}

/* ----------------------------------------------------------
   EDITOR CREATION LOGIC (NO AUTO-RUN)
----------------------------------------------------------- */

function initializeEditor(CKEDITOR, PREMIUM) {
    const {
        DecoupledEditor,
        Alignment, Autoformat, AutoImage, AutoLink, Autosave,
        BalloonToolbar, BlockQuote, Bold, Bookmark, CKBox, CKBoxImageEdit,
        CloudServices, Code, CodeBlock, Comments, Emoji, Essentials,
        FindAndReplace, FontBackgroundColor, FontColor, FontFamily, FontSize,
        Heading, HorizontalLine, ImageBlock, ImageCaption, ImageInsert,
        ImageInsertViaUrl, ImageResize, ImageStyle, ImageToolbar, ImageUpload,
        Indent, IndentBlock, Italic, LineHeight, Link, LinkImage,
        List, ListProperties, MediaEmbed, Mention, Paragraph, PasteFromOffice,
        PictureEditing, PresenceList, RealTimeCollaborativeComments,
        RealTimeCollaborativeEditing, RealTimeCollaborativeTrackChanges,
        RemoveFormat, SlashCommand, SpecialCharacters,
        SpecialCharactersArrows, SpecialCharactersCurrency,
        SpecialCharactersEssentials, SpecialCharactersLatin,
        SpecialCharactersMathematical, SpecialCharactersText,
        Strikethrough, Subscript, Superscript, Table, TableCaption,
        TableCellProperties, TableColumnResize, TableProperties, TableToolbar,
        TextTransformation, TodoList, TrackChanges, TrackChangesData,
        TrackChangesPreview, Underline
    } = CKEDITOR;

    const {
        AIChat, AIEditorIntegration, AIQuickActions,
        AIReviewMode, PasteFromOfficeEnhanced, FormatPainter
    } = PREMIUM;

    const editorConfig = {
        toolbar: {
            items: [
                "undo", "redo", "|",
                "bold", "italic", "underline", "strikethrough", "|",
                "heading",
                "fontSize", "fontFamily", "fontColor", "fontBackgroundColor", "|",
                "link", "insertImage", "insertTable",
                "blockQuote", "codeBlock", "|",
                "bulletedList", "numberedList", "|",
                "outdent", "indent"
            ]
        },
        plugins: [
            Alignment, Autoformat, AutoImage, AutoLink, Autosave, BalloonToolbar,
            BlockQuote, Bold, Bookmark, CKBox, CKBoxImageEdit, CloudServices,
            Code, CodeBlock, Comments, Emoji, Essentials, FindAndReplace,
            FontBackgroundColor, FontColor, FontFamily, FontSize, FormatPainter,
            Heading, HorizontalLine, ImageBlock, ImageCaption, ImageInsert,
            ImageInsertViaUrl, ImageResize, ImageStyle, ImageToolbar, ImageUpload,
            Indent, IndentBlock, Italic, LineHeight, Link, LinkImage, List,
            ListProperties, MediaEmbed, Mention, Paragraph, PasteFromOffice,
            PasteFromOfficeEnhanced, PictureEditing, PresenceList,
            RealTimeCollaborativeComments, RealTimeCollaborativeEditing,
            RealTimeCollaborativeTrackChanges, RemoveFormat, SlashCommand,
            SpecialCharacters, SpecialCharactersArrows, SpecialCharactersCurrency,
            SpecialCharactersEssentials, SpecialCharactersLatin,
            SpecialCharactersMathematical, SpecialCharactersText,
            Strikethrough, Subscript, Superscript, Table, TableCaption,
            TableCellProperties, TableColumnResize, TableProperties, TableToolbar,
            TextTransformation, TodoList, TrackChanges, TrackChangesData,
            TrackChangesPreview, Underline
        ],
        placeholder: "Start writing...",
        initialData: "<p>Start writing...</p>",
        licenseKey: "YOUR_LICENSE_KEY"
    };

    DecoupledEditor.create(document.querySelector("#editor"), editorConfig)
        .then(editor => {
            document.querySelector("#editor-toolbar").appendChild(editor.ui.view.toolbar.element);

            window.editor = editor;

            editor.model.document.on("change:data", () => {
                if (window.suppressEditorEvents) return;

                sendToParent("CONTENT_UPDATE", {
                    html: editor.getData()
                });
            });

            sendToParent("EDITOR_READY", { timestamp: Date.now() });
        })
        .catch(err => console.error("CKEditor failed:", err));
}