import React from 'react';
import { DocumentEditor } from '@onlyoffice/document-editor-react';

function MyDocumentEditor(props) {
  // Event handler for when the document is loaded
//   const onDocumentReady = (event) => {
//     console.log('Document is loaded', event);
//   };

  // Other event handlers can be defined here

  return (
    <div style={{ height: '100vh' }}>
    <DocumentEditor
        id="docxForComments"
        documentServerUrl="http://34.131.67.236:80"
        config={props.config}
        height="100%"
        width="100%"
        // events_onDocumenrtReady={onDocumentReady}
        />
   </div>
  );
}

export default MyDocumentEditor;
