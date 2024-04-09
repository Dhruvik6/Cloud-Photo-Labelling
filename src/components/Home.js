import React, { useState } from "react";
import "./Login/Login.css";
import { toast } from "react-toastify";
import { RecognizeImage } from "../apis/apis";
import { Container, Grid, Button, CircularProgress, Card, CardContent, Typography } from "@mui/material";
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
  const handleResetImage = () => {
    setImagePreview("");
    setFileType("");
    setFileName("");
    setBase64Image("");
    setData("");
  };

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
        <Grid item md={6} lg={6}>
          <Card>
            <CardContent>
              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginBottom: "10px" }}
              />
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: "100%", marginBottom: "10px" }} />}
              {isLoading ? (
                <Button fullWidth disabled>
                  <CircularProgress size={24} />
                </Button>
              ) : (
                <Button
                  fullWidth
                  onClick={handleRecognize}
                  variant="contained"
                >
                  Recognize Image
                </Button>
              )}
               {imagePreview && (
                <Button
                  fullWidth
                  onClick={handleResetImage}
                  variant="outlined"
                  color="error"
                  style={{ marginTop: "10px" }}
                >
                  Reset Image
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6} lg={6}>
          <Card>
            <CardContent>
              <div>
                <Typography variant="h6" component="h2" gutterBottom align="center">
                  Recognition Results
                </Typography>
                <table border={1} cellPadding={5} style={{ margin: "0 auto" }}>
                  <thead>
                    <tr>
                      <th>Labels</th>
                      <th>Confidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.labels?.map((val, index) => (
                      <tr key={index}>
                        <td>{val.label}</td>
                        <td>{val.confidence}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  
  );
};

export default Home;
