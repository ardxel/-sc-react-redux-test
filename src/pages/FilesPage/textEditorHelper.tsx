import React from "react";

const TextEditorHelper = () => {
  return (
      <>
        <p>The text editor application allows you to create, modify and delete existing text files.</p>
        <ul style={{listStyle: 'inside'}}>
          <h1 style={{fontSize: '25px'}}>Feature list</h1>
          <li>To view the content inside the product card, click on the magnifying glass icon</li>
          <li>To edit an existing file, click the edit button on the file card</li>
          <li>To delete a file, click on the trash button and confirm the changes in the modal window</li>
          <li>To create a new text document, click on the plus button on the taskbar, and confirm the creation by adding a file name</li>
          <li>Use the search bar to search</li>
        </ul>
      </>
  )
}

export default TextEditorHelper;