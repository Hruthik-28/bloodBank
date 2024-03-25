# Blood Bank Management System

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js installed on your machine
- MySQL database set up and running
- Basic understanding of MySQL, Express, Node.js, and React

## Installation

To install the dependencies and set up the project, follow these steps:

1. Clone the repository to your local machine:
```
  git clone https://github.com/Hruthik-28/bloodBank
```

2. Navigate to the project directory:
```
  cd bloodBank
```

3. Install server dependencies:
```
  cd server
```
```
  npm i 
```

4. Install client dependencies:
```
  cd client
```
```
  npm i 
```

5.  Create a `.env` file in the project root and add the following environment variables::

```
  HOST=localhost
  USER=root
  PASSWORD=your_sql_password
  DATABASE=blood_bank
  CORS_ORIGIN=http://localhost:5173
```

## Before starting the server:

1. open ur sql in cmd
2. create a db called bloodBank
3. create the following tables

```
  CREATE TABLE Admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);



CREATE TABLE BloodStock (
    blood_group VARCHAR(5) PRIMARY KEY,
    total_units INT
);



CREATE TABLE Donations (
    donation_id INT AUTO_INCREMENT PRIMARY KEY,
    donor_id INT,
    blood_group VARCHAR(5) NOT NULL,
    units_donated INT NOT NULL,
    donation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    donation_status ENUM('pending','approved','rejected','no_action'),
    FOREIGN KEY (donor_id) REFERENCES Donors(donor_id)
);



CREATE TABLE Donors (
    donor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    blood_group VARCHAR(5) NOT NULL,
    password VARCHAR(50) NOT NULL,
    total_donated_units INT,
    total_requests INT,
    requests_pending INT,
    requests_accepted INT,
    requests_rejected INT,
    disease_status VARCHAR(100)
);



CREATE TABLE Patients (
    patient_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    blood_group VARCHAR(5) NOT NULL,
    password VARCHAR(50) NOT NULL,
    total_requests INT,
    requests_pending INT,
    requests_accepted INT,
    requests_rejected INT,
    disease_status VARCHAR(100)
);



CREATE TABLE Requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    blood_group VARCHAR(5) NOT NULL,
    units_requested INT NOT NULL,
    request_status ENUM('pending','approved','rejected','no_action') DEFAULT 'pending',
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id)
);
```

To start the development server, follow these steps:

1. In the server directory, start the server:
```
  npm run dev
```

2. In the client directory, start the frontend:
```
  npm run dev
```

