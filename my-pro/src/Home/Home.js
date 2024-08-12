import { FaSearch, FaUpload } from "react-icons/fa"; // Import the FaSearch and FaUpload components from the react-icons/fa library
import Header from "../Components/Header/Header";
import "./Home.css";
import React, { useState, useEffect } from "react"; // Import the useState and useEffect functions from the react library
import { Scrollbars } from 'react-custom-scrollbars-2';

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [textSearch, settextSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleInputChange(event) {
    console.log("test")
    setInputValue(event.target.value);
    setSelectedFile(null);
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      //setInputValue(file.name); // Set the input value to the file name
      const reader = new FileReader();
      reader.onloadend = async () => {
        setUploadedImage(reader.result);
      };
      
      if (file) {
        reader.readAsDataURL(file);
      }
    }
    
  }
  useEffect(() => {
    console.log('Uploaded image state updated:', uploadedImage);
    // this.base64String = uploadedImage.split(',')[1];
    testCall(uploadedImage); 
  }, [uploadedImage]);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };
  async function testCall(img) {
    try {
      setIsLoading(true);
      setTableData([]);
      setInputValue('')
      const base64String = img?.split(',')[1];  // Remove the prefix
      const utf8EncodedString = unescape(encodeURIComponent(base64String));
      const payload = {
        image: utf8EncodedString, // base64 encoded image string
      };
      const response = await fetch("http://127.0.0.1:8000/image-to-text/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }); // Replace with your API endpoint
      const data = await response.json();
      setTableData(data);
      settextSearch(false)
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  }

    const handleSearchClick = async () => {
      console.log('Search icon clicked!');
      if(inputValue.length > 0){
        try {
          setTableData([]);
          const payload = {
            message: inputValue, // base64 encoded image string
          };
          setIsLoading(true);
          const response = await fetch("http://127.0.0.1:8000/text_to_data/", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputValue }),
          }); // Replace with your API endpoint
          const data = await response.json();
          setTableData(data);
          settextSearch(true)
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.error("Error fetching data:", error);
        }
      }
    };
  const fruitNames = tableData ? Object.keys(tableData): [];
  // const nutrientKeys = fruitNames.length > 0 ? Object.keys(tableData[fruitNames[0]]) : [];

  return (
<div className="main">
  <div className="home">
    <Header />
  </div>
  
  <div className="content-container">
    <div className="content">
    <div className="input-wrapper">
  <input
    type="text"
    value={inputValue}
    onChange={handleInputChange}
    onKeyDown={handleKeyDown}
    className="text-input"
    placeholder="Enter text or upload a file"
  />
  <input
    type="file"
    onChange={handleFileChange}
    className="file-input"
    accept="image/*"
  />
  <FaUpload className="upload-icon" onClick={() => !isLoading && document.querySelector('.file-input').click()}/>
  <FaSearch className="search-icon" onClick={handleSearchClick} disabled={isLoading}/>
 
</div>
    </div>
    {isLoading && <div className="loader"></div>}
    {tableData != '' && (
      <div className="nutrition-container">
        {!textSearch && uploadedImage && (
      <div className="image-preview">
        <img src={uploadedImage} alt="Uploaded Preview" />
      </div>
    )}
        {Object.entries(tableData).map(([fruit, nutrients]) => (
         <Scrollbars style={{ width: '350px', height: '500px' }}>
          <div key={fruit} className="nutrition-card">
            <h2 className="fruit-name">{fruit.charAt(0).toUpperCase() + fruit.slice(1)}</h2>
            <ul className="nutrition-list">
              {Object.entries(nutrients).map(([key, value]) => (
                <li key={key} className="nutrition-item">
                  <span className="nutrient-name">{key.charAt(0).toUpperCase() + key.slice(1)}:</span> 
                  <span className="nutrient-value">{value}</span>
                </li>
              ))}
            </ul>
          </div>
          </Scrollbars>
        ))}
      </div>
    )}
  </div>
</div>
    )
};
export default Home;