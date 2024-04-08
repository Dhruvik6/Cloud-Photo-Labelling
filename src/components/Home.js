import React, { useState } from "react";
import "./Login/Login.css";
import { toast } from "react-toastify";
import { RecognizeImage } from "../apis/apis";
import Spinner from "./Spinner/Spinner";

const Home = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileName, setFileName] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
      convertToBase64(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setFileType(file.type);
      setFileName(file.name);
    }
  };

  const convertToBase64 = (image) => {
    const imageBase64 = image.split(",")[1];
    setBase64Image(imageBase64);
  };

  const handleRecognize = async () => {
    try {
      setIsLoading(true);
      const requestBody = {
        image: `data:${fileType};base64,${base64Image}`,
        imageName: fileName,
      };
      const response = await RecognizeImage(requestBody);
      if (response?.data) {
        setData(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-lg-6">
          <form>
            <div className="input-group mb-3">
              <div className="custom-file">
                <input
                  type="file"
                  name="file"
                  className="custom-file-input"
                  id="inputFile"
                  required
                  onChange={handleImageChange}
                />
                <label className="custom-file-label" htmlFor="inputFile">
                  Choose file
                </label>
              </div>
            </div>
          </form>
          {imagePreview && <img src={imagePreview} alt="Preview" />}
          {isLoading ? (
            <div className="btn btn-block spinnerContainer">
              <Spinner />
            </div>
          ) : (
            <button
              type="submit"
              className="btn btn-block"
              onClick={handleRecognize}
              style={{marginBottom:"50px"}}
            >
              Recognize Image
            </button>
          )}
        </div>
        <div className="col-md-6 col-lg-6">
          <div>
            <table border={2} cellPadding={5}>
              <tr>
                <th>Labels</th>
                <th>Confidence</th>
              </tr>
              {data?.labels?.map((val, index) => (
                <tr key={index}>
                  <td>{val.label}</td>
                  <td>{val.confidence}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
