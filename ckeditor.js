/**
 * CKEditor 5 + Bubble — Minimal Bridge Version (Option B)
 * -------------------------------------------------------
 * Clean, simple, stable communication:
 *
 *   Editor → Bubble:
 *      - EDITOR_READY
 *      - CONTENT_UPDATE
 *
 *   Bubble → Editor:
 *      - LOAD_CONTENT
 *
 * No handshake, no queues, no ACKs, no RPC, no extra complexity.
 */

const BRIDGE_ID = "CKE_BUBBLE_MINI_V1";

/* ----------------------------------------------------------
   POST MESSAGE HELPERS
----------------------------------------------------------- */

function sendToParent(type, payload = {}) {
    window.parent?.postMessage(
        {
            bridge: BRIDGE_ID,
            type,
            payload,
        },
        "*"
    );
}

/* ----------------------------------------------------------
   RECEIVE COMMANDS FROM BUBBLE
----------------------------------------------------------- */

window.addEventListener("message", (event) => {
    const msg = event.data;
    if (!msg || msg.bridge !== BRIDGE_ID) return;

    if (msg.type === "LOAD_CONTENT") {
        if (window.editor) {
            try {
                window.suppressEditorEvents = true;
                window.editor.setData(msg.payload.html || "");
            } finally {
                setTimeout(() => (window.suppressEditorEvents = false), 10);
            }
        }
    }
});

/* ----------------------------------------------------------
   WAIT FOR GLOBAL UMD BUNDLES
----------------------------------------------------------- */

function waitForCkGlobals(attempt = 0) {
    if (window.CKEDITOR && window.CKEDITOR_PREMIUM_FEATURES) {
        return initializeEditor(window.CKEDITOR, window.CKEDITOR_PREMIUM_FEATURES);
    }

    if (attempt > 40) {
        console.error("[CKEditor] UMD bundles did not load.");
        return;
    }

    setTimeout(() => waitForCkGlobals(attempt + 1), 150);
}

waitForCkGlobals();

/* ----------------------------------------------------------
   INITIALIZE EDITOR (SINGLE INSTANCE)
----------------------------------------------------------- */

function initializeEditor(CKEDITOR, PREMIUM) {
    const {
        DecoupledEditor,
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
    } = CKEDITOR;

    const {
        AIChat,
        AIEditorIntegration,
        AIQuickActions,
        AIReviewMode,
        PasteFromOfficeEnhanced,
        FormatPainter
    } = PREMIUM;

    /* ------------------------------------------------------
       EDITOR CONFIG
    ------------------------------------------------------ */

    const editorConfig = {
        toolbar: {
            items: [
                "undo", "redo", "|",
                "bold", "italic", "underline", "strikethrough",
                "|",
                "heading",
                "fontSize", "fontFamily", "fontColor", "fontBackgroundColor",
                "|",
                "link", "insertImage", "insertTable",
                "blockQuote", "codeBlock",
                "|",
                "bulletedList", "numberedList",
                "|",
                "outdent", "indent"
            ]
        },
        plugins: [
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
        placeholder: "Start writing...",
        initialData: "<p>Start writing...</p>",
        licenseKey: "YOUR_LICENSE_KEY"
    };

    DecoupledEditor.create(document.querySelector("#editor"), editorConfig)
        .then(editor => {
            // Attach toolbar & menu bar
            document.querySelector("#editor-toolbar").appendChild(editor.ui.view.toolbar.element);

            window.editor = editor;
            window.suppressEditorEvents = false;

            // Emit content updates
            editor.model.document.on("change:data", () => {
                if (window.suppressEditorEvents) return;

                sendToParent("CONTENT_UPDATE", {
                    html: editor.getData()
                });
            });

            // Tell Bubble the editor is ready
            sendToParent("EDITOR_READY", {
                timestamp: Date.now()
            });

        })
        .catch(err => {
            console.error("CKEditor failed to initialize:", err);
        });
}