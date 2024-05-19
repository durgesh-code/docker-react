import React , {useState} from 'react';
import AppTest from './button';

const MyComponent = () => {
  const fileUrl = "https://storage.googleapis.com/legal-app/new-company-74/MMish%20Private%20Limited%20TEST/new-company-74_MMishPrivateLimitedTEST_v1_2024-05-08T130809.docx?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=lagalapp-storage%40neat-gasket-395017.iam.gserviceaccount.com%2F20240517%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240517T040554Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=022863ae8ba55a90341f5274f051368b77f4ce8f2a7e0b636aa39823d39ef1cd16809ac3b730251b7430632763dd612c8ad9ab7e75f41932dfab0e82823e2c9bc9118707a6c5e0f602b72359927086a1f6435058f5682611f650e2d80c94a83a91462cc77ce74bf8b2a9445185b3dab201d1d1d5a332429b239746c90a1c442101b1e809856ad6847a65de18e1a1385c1869a54dca9a46528026e33565e5e792ce944ed8a7b192040cdba8e0b87a367e3d00d0dd2a4ac4fd13f4cfb66eb3745d64cbe0544f5376be79ee3cfa855a85331c9928f1b236f880ca94c078c5acb5fbbcb7fd93ca9ee020fe752f452738743b6c1ac9059d59d6eedc57145b582829ac";
  const userName = "durgesh"
  const [blobData, setBlobData] = useState(null);

    const handleDocumentEditorClose = (blob) => {
        console.log("================================================")
        console.log("Blob data received in parent component:", blob);
        setBlobData(blob); // Set the Blob data in state or perform other actions
        // setShowDocumentEditor(false); // Close the DocumentEditor component
        console.log(blobData)

        const file = new File([blob], 'document.docx', { type: blob.type });

        const formData = new FormData();
        formData.append('agreement_id', 165);
        formData.append('agreement_file', file);

        try {
            const response = fetch('http://172.17.0.1:8080/api/v1/contract/save_agreement_file/', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1OTIxNzMyLCJpYXQiOjE3MTU5MTg3MzIsImp0aSI6IjkzYzgxNTRhNzA5ZDQ3ODg5Y2VhYTc2ZTA4YjViZWNmIiwidXNlcl9pZCI6MzMsInJvbGUiOiJMZWdhbHRlYW0iLCJuYW1lIjoidGVzdF91c2VyIiwidXNlcl9lbWFpbCI6ImR1cmdlc2hMVDQ0NEBkaXNwb3N0YWJsZS5jb20iLCJjb21wYW55X2lkIjoxOX0.pKGKeW9GNBOpeeNV6Eas_0BNYHHoOa5Lwr35xL23sxg'
                },
                body: formData,
            });

            if (response.ok) {
                console.log('File successfully sent to backend');
            } else {
                console.error('Failed to send file to backend');
            }
        } catch (error) {
            console.error('Error sending file to backend:', error);
        }
    };
  return (
    <div>
      <AppTest fileUrl={fileUrl} userName={userName} onClose={handleDocumentEditorClose}/>
    </div>
  );
};

export default MyComponent;
