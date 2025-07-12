const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const employeeRoutes = require('./Routes/EmployeeRoutes');
app.use('/api/employees', employeeRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
