import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";

const GifContainer = styled("div")({
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
});

const GifImage = styled("img")({
  maxWidth: "100%",
  height: "auto",
});

const GifSearch = () => {
  const [gifNumber, setGifNumber] = useState("");
  const [gifUrl, setGifUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `{APILINK-REEMPLAZAR}/api`
      );

      if (
        response.data && 
        response.data.results &&
        response.data.results.length > 0
      ) {
        const randomIndex = Math.floor(
          Math.random() * response.data.results.length
        );
        const randomGifUrl =
          response.data.results[randomIndex].media[0].tinygif.url;

        setGifUrl(randomGifUrl);
        setError("");
      } else {
        setError("La estructura de los datos de la respuesta no es válida.");
      }
    } catch (error) {
      console.error(error);
      setError("Hubo un error al obtener el GIF.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Buscador de GIFs
          </Typography>
          <Divider />
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="number"
              value={gifNumber}
              onChange={(e) => setGifNumber(e.target.value)}
              placeholder="Ingrese un número"
              required
              margin="normal"
            />
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Buscar
              </Button>
            </Box>
          </form>
          {error && (
            <Typography variant="body1" color="error" align="center" mt={2}>
              {error}
            </Typography>
          )}
          {gifUrl && (
            <GifContainer>
              <GifImage src={gifUrl} alt="GIF" />
            </GifContainer>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default GifSearch;
