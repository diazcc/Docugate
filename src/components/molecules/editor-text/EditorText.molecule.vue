<!--
    Todo: COMPONENT MODAL PDF VIEWER REUSABLE
    ?To use this component, read carefully what it requires in order to handle the correct data and structure.

    dataEditorText: {
        dataEditor: { // properties for the editor
            setData: () => { },
            content: '',
        },
    }

-->
<template>
    <section class="editor-text">
        <!-- Header options -->

            <ul class="editor-text__header">
                <template v-for="dataImg in arrayActions.actions">
                    <li v-if="dataImg.type === 'divider'" class="editor-text__header__divider"></li>
                    <IcoImg v-else :dataImg="dataImg" class="editor-text__header__icon" />
                </template>
            </ul>
            

        <!-- Editor -->
        <article class="editor-text__editor">
            <Editor @dataEditor="getDataEditor" @sendDataEditor="getSendDataEditor"
                :dataEditor="dataEditorText?.dataEditor" />
        </article>

    </section>

</template>
<script setup lang="ts">
import Editor from '../../atoms/editor-text/EditorText.atom.vue';
import IcoImg from "../../atoms/img/Img.atom.vue";
import { reactive, ref } from "vue";


const arrayActions: any = reactive({
    actions: []
})

const props = defineProps(['dataEditorText']);
const emits = defineEmits(['sendDataEditor'])

function getDataEditor(editor: any) {
    
    arrayActions.actions = [
        {
            id: '',
            name: 'icon blockquote',
            class: 'button-img icon',
            src: '/icon-blockquote.svg',
            type: 'png',
            alt: 'blockquote',
            isActive: () => editor.isActive('blockquote'),
            onClick: () => {
                editor.chain().focus().toggleBlockquote().run()
            }
        },
        {
            id: '',
            name: 'icon bullet list',
            class: 'button-img icon',
            src: '/icon-bullet-list.svg',
            type: 'png',
            alt: 'bullet list',
            isActive: () => editor.isActive('bulletList'),
            onClick: () => {
                editor.chain().focus().toggleBulletList().run()
            }
        },
        {
            id: '',
            name: 'icon ordered list',
            class: 'button-img icon',
            src: '/icon-ordered-list.svg',
            type: 'png',
            alt: 'ordered list',
            isActive: () => editor.isActive('orderedList'),
            onClick: () => {
                editor.chain().focus().toggleOrderedList().run()
            }
        },
        {
            id: '',
            name: 'icon Heading 1',
            class: 'button-img icon',
            src: '/icon-heading1.svg',
            type: 'png',
            alt: 'Heading 1',
            isActive: () => editor.isActive('heading', { level: 1 }),
            onClick: () => {
                editor.chain().focus().toggleHeading({ level: 1 }).run()
            },

        },
        {
            id: '',
            name: 'icon Heading 2',
            class: 'button-img icon',
            src: '/icon-heading2.svg',
            type: 'png',
            alt: 'Heading 2',
            isActive: () => editor.isActive('heading', { level: 2 }),
            onClick: () => {
                editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
        },
        {
            id: '',
            name: 'icon Heading 3',
            class: 'button-img icon',
            src: '/icon-heading3.svg',
            type: 'png',
            alt: 'Heading 3',
            isActive: () => editor.isActive('heading', { level: 3 }),
            onClick: () => {
                editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
        },
        {
            id: '',
            name: 'icon paragrahp',
            class: 'button-img icon',
            src: '/icon-paragraph.svg',
            type: 'png',
            alt: 'paragraph',
            isActive: () => editor.isActive('paragraph'),
            onClick: () => {
                editor.chain().focus().setParagraph().run()
            }
        },
        {
            id: '',
            name: 'icon code block',
            class: 'button-img icon',
            src: '/icon-code-block.svg',
            type: 'png',
            alt: 'code block',
            isActive: () => editor.isActive('codeBlock'),
            onClick: () => {
                editor.chain().focus().toggleCodeBlock().run()
            }
        },
        {
            id: '',
            name: 'icon horizontal rule',
            class: 'button-img icon',
            src: '/icon-horizontal-rule.svg',
            type: 'png',
            alt: 'horizontal rule',
            isActive: () => editor.isActive('horizontalRule'),
            onClick: () => {
                editor.chain().focus().setHorizontalRule().run()
            }
        },
        {
            type: 'divider',
        },
        {
            id: '',
            name: 'icon Bold',
            class: 'button-img icon',
            src: '/icon-bold.svg',
            type: 'png',
            alt: 'Bold',
            isActive: () => editor.isActive('bold'),
            onClick: () => {
                editor.chain().focus().toggleBold().run()
            }
        },
        {
            id: '',
            name: 'icon italic',
            class: 'button-img icon',
            src: '/icon-italic.svg',
            type: 'png',
            alt: 'italic',
            isActive: () => editor.isActive('italic'),
            onClick: () => {
                editor.chain().focus().toggleItalic().run()
            }
        },
        {
            id: '',
            name: 'icon strike',
            class: 'button-img icon',
            src: '/icon-strike.svg',
            type: 'png',
            alt: 'strike',
            isActive: () => editor.isActive('strike'),
            onClick: () => {
                editor.chain().focus().toggleStrike().run()
            }
        },
        {
            id: '',
            name: 'icon underline',
            class: 'button-img icon',
            src: '/icon-underline.svg',
            type: 'png',
            alt: 'underline',
            isActive: () => editor.isActive('underline'),
            onClick: () => {
                editor.chain().focus().toggleUnderline().run()
            }
        },
        {
            id: '',
            name: 'icon code line',
            class: 'button-img icon',
            src: '/icon-code-line.svg',
            type: 'png',
            alt: 'CodeLine',
            isActive: () => editor.isActive('code'),
            onClick: () => {
                editor.chain().focus().toggleCode().run()
            }
        },
        {
            id: '',
            name: 'icon Highlight',
            class: 'button-img icon',
            src: '/icon-highlight.svg',
            type: 'png',
            alt: 'Highlight',
            isActive: () => editor.isActive('highlight'),
            onClick: () => {
                editor.chain().focus().toggleHighlight().run()
            }
        },
        {
            type: 'divider',
        },
        {
            id: '',
            name: 'icon text align left',
            class: 'button-img icon',
            src: '/icon-text-aling-left.svg',
            type: 'png',
            alt: 'text align left',
            isActive: () => editor.isActive({ textAlign: 'left' }),
            onClick: () => {
                editor.chain().focus().setTextAlign('left').run()
            }
        },
        {
            id: '',
            name: 'icon text aling cente',
            class: 'button-img icon',
            src: '/icon-text-aling-center.svg',
            type: 'png',
            alt: 'text aling center',
            isActive: () => editor.isActive({ textAlign: 'center' }),
            onClick: () => {
                editor.chain().focus().setTextAlign('center').run()
            }
        },
        {
            id: '',
            name: 'icon text aling right',
            class: 'button-img icon',
            src: '/icon-text-aling-right.svg',
            type: 'png',
            alt: 'text aling right',
            isActive: () => editor.isActive({ textAlign: 'right' }),
            onClick: () => {
                editor.chain().focus().setTextAlign('right').run()
            }
        },
        {
            id: '',
            name: 'icon text align justify',
            class: 'button-img icon',
            src: '/icon-text-aling-justify.svg',
            type: 'png',
            alt: 'text aling justify',
            isActive: () => editor.isActive({ textAlign: 'justify' }),
            onClick: () => {
                editor.chain().focus().setTextAlign('justify').run()
            }
        },
        {
            type: 'divider',
        },
        {
            id: '',
            name: 'icon undo',
            class: 'button-img icon',
            src: '/icon-undo.svg',
            type: 'png',
            alt: 'undo',
            onClick: () => {
                editor.chain().focus().undo().run()
            }
        },
        {
            id: '',
            name: 'icon redo',
            class: 'button-img icon',
            src: '/icon-redo.svg',
            type: 'png',
            alt: 'redo',
            onClick: () => {
                editor.chain().focus().redo().run()
            }
        },

    ]

}

function getSendDataEditor(data: any) {
    emits('sendDataEditor', data)
}


</script>
<style scoped src="./EditorText.molecule.scss"></style>