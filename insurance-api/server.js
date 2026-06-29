const express = require('express');
const policiesRouter = require('./routes/policies');

const app = express();
app.use(express.json());

app.use('/api/policies', policiesRouter);

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Insurance API is running' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Insurance API listening on port ${port}`);
});
