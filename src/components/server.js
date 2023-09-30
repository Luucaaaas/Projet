const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  database: 'your_database',
});

connection.connect((error) => {
  if (error) {
    console.error('Erreur lors de la connexion à la base de données', error);
  } else {
    console.log('Connexion à la base de données réussie');
  }
});

const app = express();
app.use(express.json());

app.get('/api/messages', (req, res) => {
  const query = 'SELECT content FROM messages';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des messages', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/messages', (req, res) => {
  const { content } = req.body;
  const query = 'INSERT INTO messages (content) VALUES (?)';
  connection.query(query, [content], (error, results) => {
    if (error) {
      console.error('Erreur lors de l\'ajout du message', error);
      res.status(500).json({ error: 'Erreur lors de l\'ajout du message' });
    } else {
      res.status(201).json(results);
    }
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Serveur démarré surle port ${port}`);
});