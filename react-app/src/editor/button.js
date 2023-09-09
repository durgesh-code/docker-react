import React, { useState,useEffect } from 'react';
import MyDocumentEditor from './editor';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import MyComponent from './dummy'

const DataFetchingOnClickWithBearer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editor , setEditor] = useState(false)
  const [error, setError] = useState(null);

  const apiUrl = 'http://34.102.77.113:8080/api/v1/editor/edit/';
  const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1NDg5NDI4LCJpYXQiOjE2OTQxOTM0MjgsImp0aSI6IjkwMDAyY2FlZDFhYjQzZjY4NDEyMTQ4NWMyNTUxNjk4IiwidXNlcl9pZCI6MSwicm9sZSI6IlN1cGVyYWRtaW4iLCJuYW1lIjoiZHVyZ2VzaCB5YWRhdiIsInVzZXJfZW1haWwiOiJkdXJnZXNoQGdtYWlsLmNvbSIsImNvbXBhbnlfaWQiOjF9.5MWT6ptLj3mcme7YYjkfAtXnZf7REyU8YeWDN_ptHkY'; // Replace with your Bearer token

  const fetchData = () => {
    setLoading(true);
    setError(null);

    const requestBody = {
      agreement_id: 58,
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        setLoading(false);
        setData(responseData)
        setEditor(true)

        // Open a new window
        // const newWindow = window.open('', '_blank');
        // newWindow.document.title = 'My Document Editor';

        // // Create a container div within the new window's document
        // const containerDiv = newWindow.document.createElement('div');
        // newWindow.document.body.appendChild(containerDiv);

        // Render the component into the container div
        // ReactDOM.render(
        //   // console.log("in render methode"),
        //   <BrowserRouter>
        //     <Routes>
        //       {/* <Link to = '/editor' target = '_blank'>Click</Link> */}
        //       {/* <Route path="/editor" element={<MyDocumentEditor config={responseData.data.cfg} />} /> */}
        //       <Route path='/editor' element={<MyComponent />} />
        //     </Routes>
        //   </BrowserRouter>,
          // containerDiv
        // );
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };
useEffect(() => {
  fetchData()
},  [])
  return (
    <div>
      {/* {!editor && <h1>Data Fetching On Click With Bearer Token and Body</h1>}
      {!editor && <button onClick={fetchData} disabled={loading}>
        {loading ? 'Fetching Data...' : 'Fetch Data'}
      </button>} */}
      {console.log(editor)}
      {editor && <MyDocumentEditor config = {data.data.cfg}/>}
    </div>
  );
};

export default DataFetchingOnClickWithBearer;
