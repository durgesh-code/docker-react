// MainComponent.js
import React from 'react';
// import NewTabComponent from './NewTabComponent';

const MainComponent = () => {
  const openInNewTab = () => {
    window.open('/newtab', '_blank'); // This opens a new tab with the URL '/newtab'
  };

  return (
    <div>
      <h1>Main Component</h1>
      <button onClick={openInNewTab}>Open in New Tab</button>
    </div>
  );
};

export default MainComponent;
