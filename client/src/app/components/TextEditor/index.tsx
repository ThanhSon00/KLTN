/**
 *
 * TextEditor
 *
 */
import * as React from 'react';
import { MutableRefObject } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';

interface Props {
  editorRef: MutableRefObject<TinyMCEEditor | undefined>;
}

export function TextEditor(props: Props) {
  const { editorRef } = props;

  return (
    <>
      <Editor
        apiKey="uzfna8x9838h6h801vjwhzcj3xghrsam8e9zlj984zzgixsd"
        init={{
          plugins:
            'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck | align lineheight |  numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (request, respondWith) =>
            respondWith.string(() =>
              Promise.reject('See docs to implement AI Assistant'),
            ),
        }}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="Welcome to TinyMCE!"
      />
    </>
  );
}