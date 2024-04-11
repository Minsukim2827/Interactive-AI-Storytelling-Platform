import React, { useState } from 'react';
import Create from './Create';

function CreatePage() {
  // State variables
 const [forms, setForms] = useState([{ id: 1, inputValue: '', generatedText: '', generatedImage: null }]);
 const [currentFormIndex, setCurrentFormIndex] = useState(0);
 const [pageNumber, setPageNumber] = useState('');
 const [searchError, setSearchError] = useState('');

 const addPage = () => { // Add a new page
    const newId = forms.length + 1;
    setForms([...forms, { id: newId, inputValue: '', generatedText: '', generatedImage: null }]); 
    setCurrentFormIndex(forms.length); // Navigate to the new form
 };

 const navigateToForm = (index) => { // Navigate to the form at the specified index
    setCurrentFormIndex(index);
 };

 const goToPage = () => { // Go to the page number entered in the input field
    const pageNumberInt = parseInt(pageNumber, 10); // Convert the page number to an integer
    if (isNaN(pageNumberInt) || pageNumberInt <= 0 || pageNumberInt > forms.length) { // Check if the page number is invalid
      setSearchError('Page number is invalid');
    } else { // Navigate to the specified page
      setCurrentFormIndex(pageNumberInt - 1);
      setPageNumber('');
      setSearchError('');
    }
 };

 const handleSearchChange = (e) => { // Handle input change for page number
    setPageNumber(e.target.value);
 };

 const totalPages = forms.length; // Total number of pages

 return (
    <div className="flex">
      <div className="w-1/5 mr-4">
      <p className="text-center mb-4">Page {currentFormIndex + 1} of {totalPages}</p>
        {/* {forms.map((form, index) => (
          <div key={form.id} className="mb-4" onClick={() => navigateToForm(index)}>
            {form.generatedImage && <img src={form.generatedImage} alt="Preview" className="w-full" />}
          </div> 
        ))} */}
        <form onSubmit={(e) => { e.preventDefault(); goToPage(); }} className="mb-4">
          <input
            type="text"
            value={pageNumber}
            onChange={handleSearchChange}
            className="w-full border border-gray-300 rounded px-2 py-1"
            placeholder="Go to Page"
          /> {/* Input field for entering the page number */}
          <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Go</button> 
        </form>
        {searchError && <p className="text-red-500">{searchError}</p>}
      </div>
      <div className='w-4/5 flex flex-wrap'>
        {forms.map((form, index) => ( // Display the forms
          <div key={form.id} style={{ display: index === currentFormIndex ? 'block' : 'none' }}>
            <Create
              id={form.id}
              inputValue={form.inputValue}
              generatedText={form.generatedText}
              generatedImage={form.generatedImage}
            /> {/* Display the create form */}
          </div>
        ))}
      </div>
      <div className="w-full md:w-auto ml-auto mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addPage}> {/* Add a new page */}
          New Page
        </button>
      </div>
    </div>
 );
}

export default CreatePage;
