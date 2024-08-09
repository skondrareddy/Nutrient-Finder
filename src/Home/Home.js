import { FaSearch, FaUpload } from "react-icons/fa"; // Import the FaSearch and FaUpload components from the react-icons/fa library
import Header from "../Components/Header/Header";
import "./Home.css";
import React, { useState } from "react"; // Import the useState function from the react library

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  function handleInputChange(event) {
    setInputValue(event.target.value);
    setSelectedFile(null);
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setInputValue(file.name); // Set the input value to the file name
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  function testCall() {
    fetch("http://127.0.0.1:8000/api/test/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <div className="home">
        <Header />
      </div>
      <div className="content">
        <div className="input-wrapper">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="text-input"
            placeholder="Enter text or upload a file"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input"
            accept="image/*"
          />
          <FaUpload className="upload-icon" />
        </div>
        <FaSearch className="search-icon" />
      </div>
      <div className="image-preview">
        <div>
          <img src={uploadedImage} alt="Uploaded Preview" />
        </div>
        <div className="nutrition-info">
          <span style={{ fontSize: "1.3em", backgroundColor: "#b4b9ce" }}>
            Nutrient type
          </span>
          <span>Calories</span>
          <span>Protein</span>
          <span>Fat</span>
          <span>Carbohydrates</span>
          <span>Fiber</span>
          <span>Sugar</span>
          <span>Cholesterol</span>
          <span>Calcium</span>
          <span>Iron</span>
          <span>Magnesium</span>
          <span>Phosphorus</span>
          <span>Potassium</span>
          <span>Sodium</span>
          <span>Zinc</span>
          <span>Vitamin A</span>
          {/* <table className="nutrition-table">
            <thead>
              <tr>
                <th>Calories</th>
                <th>Protein</th>
                <th>Fat</th>
                <th>Carbohydrates</th>
                <th>Fiber</th>
                <th>Sugar</th>
                <th>Cholesterol</th>
                <th>Calcium</th>
                <th>Iron</th>
                <th>Magnesium</th>
                <th>Phosphorus</th>
                <th>Potassium</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>100gm</td>
                <td>100gm</td>
                <td>100gm</td>
                <td>100gm</td>
                <td>100gm</td>
                <td>100gm</td>
                <td>100gm</td>
                <td>100gm</td>
                <td>100gm</td>
                <td>100gm</td>
                <td>100gm</td>
                <td>100gm</td>
              </tr>
            </tbody>
          </table> */}
        </div>
        <div className="nutrition-info">
          <span style={{ fontSize: "1.3em", backgroundColor: "#b4b9ce" }}>
            Calorific value
          </span>
          <span>100 cal</span>
          <span>100 cal</span>
          <span>100 cal</span>
          <span>100 cal</span>
          <span>100 cal</span>
          <span>100 cal</span>
          <span>100 cal</span>
          <span>100 cal</span>
          <span>100 cal</span>
          <span>100 cal</span>
          <span>100 cal</span>
          <span>100 cal</span>
          <span>100 cal</span>
          <span>100 cal</span>
          <span>100 cal</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
