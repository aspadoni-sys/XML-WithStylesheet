const express = require('express');
const axios = require('axios');
// const { DOMParser, XMLSerializer } = require('xmldom');

const app = express();
const port = 3000;

// Imposta il motore di rendering HTML
app.set('view engine', 'ejs');

// Percorso principale per visualizzare la pagina HTML
app.get('/', (req, res) => {
  res.render('index');
});

// Endpoint per ottenere l'XML dall'API
app.get('/getXml', async (req, res) => {
  try {
    const xmlResponse = await axios.get('https://www.fatturapa.gov.it/export/documenti/fatturapa/v1.2/IT01234567890_FPR01.xml');
    res.status(200).send(xmlResponse.data);
  } catch (error) {
    console.error('Errore nel recupero dell\'XML:', error.message);
    res.status(500).send('Errore interno del server');
  }
});

// Endpoint per ottenere l'XSL dall'API
app.get('/getXsl', async (req, res) => {
  try {
    const xslResponse = await axios.get('https://www.fatturapa.gov.it/export/documenti/fatturapa/v1.2.1/Foglio_di_stile_fatturaordinaria_v1.2.1.xsl');
    res.status(200).send(xslResponse.data);
  } catch (error) {
    console.error('Errore nel recupero dell\'XSL:', error.message);
    res.status(500).send('Errore interno del server');
  }
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server in esecuzione su http://localhost:${port}`);
});
