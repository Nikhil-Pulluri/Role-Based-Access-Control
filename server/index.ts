import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

// Employee Model
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json()); // to parse JSON requests

// MongoDB connection using environment variable
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/employeeDB'; // Fallback to local if not defined
mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

// CRUD Routes for managing employees
// Create a new employee
app.post('/api/employees', async (req: Request, res: Response) => {
  const { name, position, department, email, phone } = req.body;

  const newEmployee = new Employee({
    name,
    position,
    department,
    email,
    phone,
  });

  try {
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all employees
app.get('/api/employees', async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an employee
app.put('/api/employees/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, position, department, email, phone } = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
      name,
      position,
      department,
      email,
      phone,
    }, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an employee
app.delete('/api/employees/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Starting the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
