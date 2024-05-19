import React, { useRef, useEffect , useState } from 'react';
import './button.css';
import { DocumentEditorContainerComponent, Toolbar , WordExport , SfdtExport  } from '@syncfusion/ej2-react-documenteditor';
import { registerLicense } from '@syncfusion/ej2-base';
import userEvent from '@testing-library/user-event';

DocumentEditorContainerComponent.Inject(Toolbar);
DocumentEditorContainerComponent.Inject(WordExport);
DocumentEditorContainerComponent.Inject(SfdtExport);
registerLicense("ORg4AjUWIQA/Gnt2UFhhQlJBfVldXHxLflFyVWJYdV54fldBcC0sT3RfQFljTH5Rd0RjUH1bd3NVQw==");

function AppTest({fileUrl , isEditable , userName , onClose}) {
    const containerRef = useRef(null);
    const [fileContent, setFileContent] = useState(null);
    console.log(fileUrl , userName , onClose)

    const onCreated = () => {
        const container = containerRef.current;
        container.documentEditor.currentUser = userName;
        container.documentEditor.userColor = '#fff000';
        container.documentEditor.restrictEditing = false;
        console.log(container.documentEditor.currentUser)

        console.log(onClose)

        const uploadDocument = new FormData();
        console.log("file url " , fileUrl)
        uploadDocument.append('DocumentName', fileUrl);
        const url = container.serviceUrl + "LoadDocument";
        const httpRequest = new XMLHttpRequest();
        httpRequest.open('POST', url, true);
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    container.documentEditor.open(httpRequest.responseText);
                }
            }
        };
        httpRequest.send(uploadDocument);

        setInterval(() => {
            updateDocumentEditorSize();
        }, 100);

        window.addEventListener("resize", onWindowResize);
    };

    const onSave = async () => {
        const container = containerRef.current;
        console.log("Saving document...");

        if (container && container.documentEditor) {
            const blob = await container.documentEditor.saveAsBlob("Docx");
            console.log("Blob received:", blob);
            setFileContent(blob);
            console.log("File content saved to variable.");
            return blob
        } else {
            console.error("Document editor is not available.");
        }
    };

    const onWindowResize = () => {
        updateDocumentEditorSize();
    };

    const updateDocumentEditorSize = () => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const container = containerRef.current;
        container.documentEditor.resize(windowWidth, windowHeight);
    };

    const handleClose = async () => {
        if (onClose && typeof onClose === 'function') {
            const blob = await onSave()
            onClose(blob);
        }
    };

    useEffect(() => {
        const handleBeforeUnload = ()=>{
            handleClose()
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    } , [fileContent]);

    return (
        <div>
            <div id="default_title_bar" className="e-de-ctn-title"></div>
            <button onClick={handleClose}>Save</button>
            <DocumentEditorContainerComponent
                id="container"
                ref={containerRef}
                height={'590px'}
                serviceUrl="http://172.17.0.1:6002/api/documenteditor/"
                enableToolbar={true}
                created={onCreated}
                currentUser={userName}
            />
        </div>
    );
}

export default AppTest;
