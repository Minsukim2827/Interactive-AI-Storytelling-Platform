import React, { useState, useEffect } from 'react';
import Create from './Create';

function CreatePage() {
  // State variables
  const [forms, setForms] = useState([{ id: 1, inputValue: '', generatedText: '', generatedImage: null }]);
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [pageNumber, setPageNumber] = useState('');
  const [searchError, setSearchError] = useState('');
  const [lastGeneratedImage, setLastGeneratedImage] = useState(null); // stores last generated image for testings

  const addPage = () => { // Add a new page
    const newId = forms.length + 1;
    setForms([...forms, { id: newId, inputValue: '', generatedText: '', generatedImage: null }]);
    setCurrentFormIndex(forms.length); // Navigate to the new form
  };

  const navigateToForm = (index) => { // Navigate to the form at the specified index
    setCurrentFormIndex(index);
  };

  const totalPages = forms.length; // Total number of pages

  const handleUpdateForms = (imageUrl, generatedText, inputValue, formIndex) => {
    setForms(prevForms => {
      return prevForms.map((form, index) => {
        if (index === formIndex) {
          return {
            ...form,
            generatedImage: imageUrl,
            generatedText: generatedText,
            inputValue: inputValue
          };
        }
        return form; // Return the unchanged form if it doesn't match the form index
      });
    });
  };

  useEffect(() => {
    //testing for navbar so produces last generated image
    if (forms.length > 0 && forms[forms.length - 1].generatedImage) {
      setLastGeneratedImage(forms[forms.length - 1].generatedImage);
    }
  }, [forms]);

  console.log(forms)

  return (
    <div className="w-full flex justify-center">
      <div className="w-11/12 max-w-screen-lg flex flex-col items-center">
      <p className="text-center">Page {currentFormIndex + 1} of {totalPages}</p>
        <div className='w-full flex flex-wrap justify-center'>
          {forms.map((form, index) => (
            <div key={form.id} className="relative m-1 border border-black">
              {form.generatedImage ? (
                <img
                  src={form.generatedImage}
                  alt={`Generated Image ${index + 1}`}
                  className="w-16 h-16 cursor-pointer"
                  onClick={() => navigateToForm(index)}
                />
              ) : (
                <div
                  className="w-16 h-16 bg-black cursor-pointer"
                  onClick={() => navigateToForm(index)}
                />
              )}
            </div>
          ))}
          <div className="w-full flex justify-center mt-1">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addPage}> {/* Add a new page */}
            New Page
          </button>
        </div>
        </div>
        <div className='w-full flex flex-wrap justify-center'>
          {forms.map((form, index) => ( // Display the forms
            <div key={form.id} className={`relative ${index === currentFormIndex ? 'block' : 'hidden'}`}>
              <Create
                id={form.id}
                inputValue={form.inputValue}
                generatedText={form.generatedText}
                generatedImage={form.generatedImage}
                onUpdateForms={(imageUrl, generatedText, inputValue) => handleUpdateForms(imageUrl, generatedText, inputValue, index)}
              /> {/* Display the create form */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
}

export default CreatePage;
