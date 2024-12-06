import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'; // For loading environment variables

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Define the employee schema with password
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  accessStatus: { type: String, enum: ['Granted', 'Denied'], required: true },
  password: { type: String, required: true }, // Added password field
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

const Employee = mongoose.model('Employee', employeeSchema);

// Routes for CRUD operations

// Create a new employee
app.post('/api/employees', async (req, res) => {
  try {
    const { name, role, email, accessStatus, password } = req.body;

    // console.log(req.body)

    if (!name || !role || !email || !accessStatus || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newEmployee = new Employee({ name, role, email, accessStatus, password });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an employee
app.put('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, email, accessStatus, password } = req.body;

    if (!name || !role || !email || !accessStatus || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, role, email, accessStatus, password },
      { new: true, runValidators: true } // Ensures new values are returned and validated
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an employee
app.delete('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fallback route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
