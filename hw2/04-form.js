
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

// Parse form data submitted by the user
app.use(express.urlencoded({ extended: true }));

// Display the HTML form
app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { username, email, comments, newsletter } = req.body;

  const newsletterStatus = newsletter === 'on' ? 'Yes' : 'No';

  res.send(`
    <h1>Form Submission Results</h1>
    <p><strong>Username:</strong> ${escapeHtml(username)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Comments:</strong> ${escapeHtml(comments || '')}</p>
    <p><strong>Newsletter Signup:</strong> ${newsletterStatus}</p>
    <a href="/form">Back to Form</a>
  `);
});

// Escape user input before displaying it in HTML
function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => {
    const characters = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return characters[char];
  });
}

// Handle unknown routes
app.use((req, res) => {
  res.status(404).send('<h1>404 - page not found</h1>');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
