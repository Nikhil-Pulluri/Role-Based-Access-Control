# Employee Management System - Role Based Access System

This project is a backend application for managing employees, featuring CRUD operations, login authentication for employees and admin, and secure password management. Built using modern technologies, it connects to a MongoDB database and exposes RESTful APIs.

---

## Features

- **Employee Management:** Add, update, delete, and retrieve employees.
- **Authentication:** Login functionality for employees and admins.
- **Access Control:** Restrict access based on access status.
- **Password Management:** Secure password updates for employees.

---

## Tech Stack

- **Frontend Framework:** Next.js with Tailwind and ShadCN
- **Backend Framework:** Node.js with Express.js
- **Database:** MongoDB (Mongoose for Object Data Modeling)
- **Authentication:** Basic authentication (password-based)
- **Environment Variables:** `dotenv`
- **Middleware:** `cors`, `body-parser`

---

## Installation and Setup

### Prerequisites

- **Node.js** (>= v14)
- **MongoDB** (Locally installed or a cloud instance like MongoDB Atlas)
- **npm** (>= v6)

### Instructions to run the project

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Nikhil-Pulluri/Role-Based-Access-Control.git
   cd Role-Based-Access-Control
   ```

2. Navigate to the `client` directory:

   ```bash
   cd client
   npm i
   npm run dev
   ```

3. Get back to the root folder
   ```bash
   cd ..
   cd server
   npm i
   npm start
   ```

Now, the frontend and backend servers are running on the ports 3000 and 5000 respectively.

### Open the Next Server Link

1. After running the development server with `npm run dev`, you will see a message in the terminal like this:

➜ Local: http://localhost:3000/

2. Open the `Local` link (e.g., `http://localhost:3000/`) in your browser to view the application.

3. Click on the Admin Portal to redirect to the admin login page

4. Enter the credentials as
   Email : Admin@gmail.com
   Password : Nikhil@123

You may change this password from the admin panel later on.

5. Press on login to enter the admin panel where admin can manage the employees and manage their roles as well.

6. There will be a table and a sidebar consisting of options to change the admin password and logout if needed.

7. The content inside the table is the employee data and their roles including their permission to access the user dashboard which is seperate route only for them.

8. You may add new employees by clicking on the Add New Employee button on the top right side of the table. A dialog box will be shown and we need to add the details of the new employee there. We can also add a new Admin if needed. Please make sure to type the role of the admin "Admin" when new employee is added. In any other cases, please add the details of your choice and press add to add the employee. The default password of any new employee will be "test@123" and it can be changed from the user dashboard after log in that route.

9. There will be two options for every entry in the table. One is "Edit" and another is "Delete". You can click on edit and chane the details of the employee and there will be no option for the admin to change the password of any employee. Any other detail inlcuding email and role can be changed and the admin should press "save" option inorder to save the entry. The other option is Delete where admin can delete the employee and thus removes the access to the user dashboard completely.

10. Inside the Edit, there will be status switch, either Granted or Denied. If Granted, the user can login in to the user dashboard. Please note that user dashboard is different from the admin panel. Only admin can have access to the admin portal or panel. If the switch is turned to denied to any employee, he/she cannot login in to the user dashboard. Please run a trial run to check this feature.

11. This is about the admin panel. Now, please logout and head to the root url http://localhost:3000/ . Now, proceed to the Employee Portal and login using the below credentials. Please note that you may add a new employee in the admin panel and login to that user as well. the default password in that case will be "test@123".
    Email : nikhil@gmail.com
    Password : test@123

12. After log in, we will find the user dashboard and options to change the password to our choice and an option to logout as well. This log in will be possible only if the employee is granted permission in the admin panel. If denied, the employee gets the respective message when login.

13. Following these steps, we can implement the project in the local server.

14. Please test the application in all the ways possible.

I hereby, conclude that I have made the project according the assignment and provided it to the company.
