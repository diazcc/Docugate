<!--
    todo COMPONENT Editor.js
    
    ?this component cannot be modify, please read the comments and user the struture defined.

    todo For see more information: https://tiptap.dev/docs/editor/introduction

    ! for unisntall: 'npm uninstall @tiptap/extension-highlight && @tiptap/extension-placeholder && @tiptap/extension-text-align && @tiptap/extension-underline && @tiptap/pm && @tiptap/starter-kit && @tiptap/vue-3' Before uninstall delete all calls of this component.
    
    todo this component need this structure to be call as prop.

    dataEditor: {
        setData: () => { }, // This function sends the html generated in the editor to the "page component" to execute the saving logic.
        content: '', // This key contains the html that the editor will display
    },

    const editor = useEditor({
        /**
            * You need to pass a list of extensions to the 'extensions' property, even if you only want to allow paragraphs.
        */
        extensions: [
            StarterKit,
            Placeholder.configure({
                emptyEditorClass: 'is-editor-empty', // Clase CSS para aplicar cuando el editor está vacío
                placeholder: 'Escribe algo aquí...' // Placeholder predeterminado
            }),
            Highlight.configure({ multicolor: true }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            })
        ],

        /**
            * With the "content" property you can provide the initial content for the editor. It can be HTML or JSON.
        */
        content: props.dataEditor.content, // the prop is passed with the html content that you want to display

        /**
            * The "editable" property determines whether users can write to the editor.
        */
        editable: true,

        /**
            * With "autofocus" you can force the cursor to jump to the editor during initialization.
            * The "autofocus" property has several options, see the documentation for more information: https://tiptap.dev/docs/editor/api/editor#autofocus
        */
        autofocus: false,

        /**
            * By default, Tiptap injects some CSS. With "injectCSS" you can disable that.
        */
        injectCSS: false,
    })

    comandos que considero buenos como opciones para el editor

    /**
        * clearContent: 
        editor.chain().focus().clearContent().run() // este comando
    */

-->
<template>
    <EditorContent id="tiptap_editor" v-if="editor" :editor="editor" class="tiptap" />
</template>

<script setup>
// IMPORTS
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { onMounted, onBeforeUnmount, ref } from "vue";
// ----------------------------------


// VARIABLES OR STATES
const props = defineProps(['dataEditor']); // Use defineProps for can get data in another component.
const emits = defineEmits(['dataEditor', 'sendDataEditor']); // 

const editor = useEditor({
    /**
        * You need to pass a list of extensions to the 'extensions' property, even if you only want to allow paragraphs.
    */
    extensions: [
        StarterKit,
        Placeholder.configure({
            emptyEditorClass: 'is-editor-empty', // Clase CSS para aplicar cuando el editor está vacío
            placeholder: 'Escribe algo aquí...' // Placeholder predeterminado
        }),
        Highlight.configure({ multicolor: true }),
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        Underline,
    ],

    /**
        * With the "content" property you can provide the initial content for the editor. It can be HTML or JSON.
    */
    content: props.dataEditor.content,

    /**
        * The "editable" property determines whether users can write to the editor.
    */
    editable: true,

    /**
        * With "autofocus" you can force the cursor to jump to the editor during initialization.
        * The "autofocus" property has several options, see the documentation for more information: https://tiptap.dev/docs/editor/api/editor#autofocus
    */
    autofocus: false,

    /**
        * By default, Tiptap injects some CSS. With "injectCSS" you can disable that.
    */
    injectCSS: false,
})


// -----------------------------------


// METHODS LIFE CICLES
onMounted(() => {
    emits('dataEditor', editor.value)
})

onBeforeUnmount(() => {
    editor.value.destroy()
});

// -----------------------------------


// FUNCTIONS


props.dataEditor.setData = () => {

    const content = ref(`<body style="word-wrap: break-word; overflow-wrap: break-word;">`);
    content.value += `<style>

    * {
        margin: 0;
        padding: 0;
        list-style: none;
        text-decoration: none;
        font-family: Poppins, sans-serif;
    }

    ul, ol {
        margin: 0 1rem;
        padding: 0 1rem;
    }

    ul > li {
        list-style: initial;
    }

    ol > li {
        list-style: decimal;
    }

    h1 {
        font-size: xx-large;
        line-height: 1.1;
    }

    h2 {
        font-size: x-large;
        line-height: 1.1;
    }

    h3 {
        font-size: large;
        line-height: 1.1;
    }

    h4 {
        font-size: medium;
        line-height: 1.1;
    }

    h5 {
        font-size: small;
        line-height: 1.1;
    }

    h6 {
        font-size: x-small;
        line-height: 1.1;
    }

    code {
        background-color: rgba(#616161, 0.1);
        color: #616161;
    }

    pre {
        background: #0d0d0d;
        color: #fff;
        font-family: "JetBrainsMono", monospace;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
    }

    pre code {
        color: #fff;
        padding: 0;
        background: none;
        font-size: 0.8rem;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    blockquote {
        padding-left: 1rem;
        border-left: 2px solid gray;
    }

    hr {
        border: none;
        border-top: 2px solid gray;
        margin: 2rem 0;
    }

    s {
        text-decoration: line-through;
    }

    u {
        text-decoration: underline;
    }
              
    </style>`
    content.value += editor.value.getHTML()
    content.value += `</body>`

    emits('sendDataEditor', content.value)
    
}

// -----------------------------------

</script>

<style lang="scss" src="./EditorText.atom.scss"></style>
<!--
    todo To modify this component socialice with parners and explain ideas. 
-->