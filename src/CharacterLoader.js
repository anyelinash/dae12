import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button, Typography, Grid, Card, CardContent, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

// Definir la función fuera del componente
const loadCharacters = (setCharacters, setLoading) => {
  setLoading(true);

  axios
    .get('https://swapi.dev/api/people/')
    .then((response) => {
      setCharacters(response.data.results);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    });
};

function CharacterLoader() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const searchCharacters = (term) => {
    setLoading(true);

    axios
      .get(`https://swapi.dev/api/people/?search=${term}`)
      .then((response) => {
        setCharacters(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Realizar la búsqueda en tiempo real
    searchCharacters(term);
  };

  const styles = {
    container: {
      marginTop: '20px',
    },
    button: {
      marginTop: '10px',
      marginBottom: '20px',
    },
    heading: {
      color: '#0D0F68',
      fontFamily: 'Roboto',
    },
    searchInputContainer: {
      position: 'relative',
      marginBottom: '10px',
    },
    searchInput: {
      width: '100%',
    },
    searchIcon: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
    },
  };

  return (
    <Container sx={styles.container}>
      <Typography variant="h3" gutterBottom sx={styles.heading}>
        Personajes de Star Wars
      </Typography>
      <div style={styles.searchInputContainer}>
        <TextField
          label="Buscar personaje"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={styles.searchInput}
        />
        <SearchOutlinedIcon onClick={() => searchCharacters(searchTerm)} style={styles.searchIcon} />
      </div>
      {/* Referenciar la función correctamente en el evento onClick */}
      <Button variant="contained" onClick={() => loadCharacters(setCharacters, setLoading)} disabled={loading} sx={styles.button}>
        {loading ? 'Cargando Personajes...' : 'Cargar Personajes'}
      </Button>
      <Grid container spacing={3}>
        {characters.map((character, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {character.name}
                </Typography>
                <Typography color="textSecondary">
                  <strong>Género:</strong> {character.gender}
                  <br />
                  <strong>Año de nacimiento:</strong> {character.birth_year}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CharacterLoader;
