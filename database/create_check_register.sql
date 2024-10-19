-- SQLite does not use the "CREATE DATABASE" command, so you can skip that.
-- The database will be created when you first open the SQLite file.

-- Create the Codes table
CREATE TABLE Codes (
    CheckCode CHAR(3) NOT NULL,
    Description VARCHAR(100) NOT NULL,
    Category VARCHAR(100) NOT NULL,
    Status VARCHAR(10),
    PRIMARY KEY (CheckCode)
);

-- Create the CHKREG_2024 table
CREATE TABLE CHKREG_2024 (
    CheckNO CHAR(8) NOT NULL,
    checkDate TEXT NOT NULL,  -- SQLite uses TEXT for dates, or you can store as INTEGER (Unix time)
    checkCode CHAR(3) NOT NULL,
    checkAmount REAL NOT NULL,  -- SQLite does not have a MONEY type, use REAL or INTEGER
    checkDescription VARCHAR(100) NOT NULL,
    checkUserDef1 VARCHAR(10),
    checkUserDef2 VARCHAR(10)
);

-- Insert data into the Codes table
INSERT INTO Codes (CheckCode, Description, Category, Status) VALUES
    ('001', 'Utility Payment', 'Bills', 'Active'),
    ('002', 'Grocery Purchase', 'Food', 'Active'),
    ('003', 'Car Maintenance', 'Automobile', 'Inactive'),
    ('004', 'Internet Bill', 'Bills', 'Active'),
    ('005', 'Rent Payment', 'Housing', 'Active'),
    ('006', 'Gym Membership', 'Health', 'Active'),
    ('007', 'Insurance Payment', 'Finance', 'Active'),
    ('008', 'Clothing Purchase', 'Apparel', 'Active'),
    ('009', 'Medical Bills', 'Health', 'Active'),
    ('010', 'Dining Out', 'Food', 'Active');

-- Insert data into the CHKREG_2024 table
INSERT INTO CHKREG_2024 (CheckNO, checkDate, checkCode, checkAmount, checkDescription, checkUserDef1, checkUserDef2) VALUES
    ('CHK00001', '2024-01-15', '001', 150.75, 'Electricity Bill Payment', 'Note1', 'Note2'),
    ('CHK00002', '2024-02-10', '002', 85.20, 'Weekly Groceries', 'NoteA', 'NoteB'),
    ('CHK00003', '2024-03-05', '003', 300.00, 'Car Tire Replacement', NULL, NULL),
    ('CHK00004', '2024-01-20', '004', 60.00, 'Internet Bill Payment', 'ISP1', 'Monthly'),
    ('CHK00005', '2024-02-01', '005', 1200.00, 'Rent Payment for February', 'Landlord', 'Apartment'),
    ('CHK00006', '2024-02-12', '006', 45.00, 'Monthly Gym Membership', 'Fitness', 'Health'),
    ('CHK00007', '2024-03-01', '007', 250.00, 'Car Insurance Payment', 'InsuranceCo', 'Car'),
    ('CHK00008', '2024-03-15', '008', 200.00, 'Clothing Purchase', 'Mall', 'Shirts'),
    ('CHK00009', '2024-03-20', '009', 350.00, 'Medical Bills for Checkup', 'Clinic', 'Health'),
    ('CHK00010', '2024-03-25', '010', 75.00, 'Dinner at Restaurant', 'Italian', 'Dinner'),
    ('CHK00011', '2024-04-01', '001', 160.50, 'Water Bill Payment', 'Utility', 'Water'),
    ('CHK00012', '2024-04-05', '002', 95.00, 'Grocery Shopping', 'Supermart', 'Food'),
    ('CHK00013', '2024-04-10', '003', 400.00, 'Brake Repair', 'AutoShop', 'Car'),
    ('CHK00014', '2024-04-15', '004', 65.00, 'Internet Bill Payment', 'ISP1', 'Monthly'),
    ('CHK00015', '2024-04-20', '005', 1200.00, 'Rent Payment for April', 'Landlord', 'Apartment'),
    ('CHK00016', '2024-04-25', '006', 50.00, 'Gym Membership Renewal', 'Fitness', 'Monthly'),
    ('CHK00017', '2024-05-01', '007', 300.00, 'Home Insurance Payment', 'InsuranceCo', 'Home'),
    ('CHK00018', '2024-05-05', '008', 150.00, 'Clothing Purchase', 'Boutique', 'Dress'),
    ('CHK00019', '2024-05-10', '009', 500.00, 'Medical Surgery Payment', 'Hospital', 'Health'),
    ('CHK00020', '2024-05-15', '010', 80.00, 'Lunch at Cafe', 'Cafe', 'Brunch'),
    ('CHK00021', '2024-05-20', '001', 175.00, 'Electricity Bill Payment', 'Utility', 'Electric'),
    ('CHK00022', '2024-05-25', '002', 110.00, 'Weekly Groceries', 'Supermart', 'Food'),
    ('CHK00023', '2024-06-01', '003', 600.00, 'Car Battery Replacement', 'AutoShop', 'Car'),
    ('CHK00024', '2024-06-05', '004', 70.00, 'Internet Bill Payment', 'ISP2', 'Monthly'),
    ('CHK00025', '2024-06-10', '005', 1200.00, 'Rent Payment for June', 'Landlord', 'Apartment'),
    ('CHK00026', '2024-06-15', '006', 55.00, 'Gym Membership', 'Fitness', 'Health'),
    ('CHK00027', '2024-06-20', '007', 280.00, 'Car Insurance Renewal', 'InsuranceCo', 'Car'),
    ('CHK00028', '2024-06-25', '008', 180.00, 'Summer Clothes', 'Outlet', 'Shorts'),
    ('CHK00029', '2024-07-01', '009', 250.00, 'Medical Consultation', 'Doctor', 'Checkup'),
    ('CHK00030', '2024-07-05', '010', 100.00, 'Dinner at Bistro', 'French', 'Dinner'),
    ('CHK00031', '2024-07-10', '001', 155.00, 'Gas Bill Payment', 'Utility', 'Gas'),
    ('CHK00032', '2024-07-15', '002', 120.00, 'Grocery Shopping', 'Supermart', 'Food'),
    ('CHK00033', '2024-07-20', '003', 450.00, 'Car Oil Change', 'AutoShop', 'Car'),
    ('CHK00034', '2024-07-25', '004', 75.00, 'Internet Bill Payment', 'ISP3', 'Monthly'),
    ('CHK00035', '2024-08-01', '005', 1250.00, 'Rent Payment for August', 'Landlord', 'Apartment'),
    ('CHK00036', '2024-08-05', '006', 60.00, 'Gym Membership Renewal', 'Fitness', 'Monthly'),
    ('CHK00037', '2024-08-10', '007', 310.00, 'Home Insurance', 'InsuranceCo', 'House'),
    ('CHK00038', '2024-08-15', '008', 220.00, 'New Shoes Purchase', 'ShoeStore', 'Sneakers'),
    ('CHK00039', '2024-08-20', '009', 400.00, 'Specialist Consultation', 'Clinic', 'Specialist'),
    ('CHK00040', '2024-08-25', '010', 90.00, 'Lunch at Restaurant', 'Indian', 'Meal'),
    ('CHK00041', '2024-09-01', '001', 145.00, 'Electricity Bill Payment', 'Utility', 'Electric'),
    ('CHK00042', '2024-09-05', '002', 130.00, 'Groceries for the Month', 'Supermart', 'Food'),
    ('CHK00043', '2024-09-10', '003', 350.00, 'Car AC Repair', 'AutoShop', 'Car'),
    ('CHK00044', '2024-09-15', '004', 80.00, 'Internet Bill Payment', 'ISP4', 'Monthly'),
    ('CHK00045', '2024-09-20', '005', 1250.00, 'Rent Payment for September', 'Landlord', 'Apartment'),
    ('CHK00046', '2024-09-25', '006', 70.00, 'Gym Membership', 'Fitness', 'Monthly'),
    ('CHK00047', '2024-10-01', '007', 290.00, 'Car Insurance Payment', 'InsuranceCo', 'Car'),
    ('CHK00048', '2024-10-05', '008', 160.00, 'Clothing Shopping', 'Mall', 'Jeans'),
    ('CHK00049', '2024-10-10', '009', 320.00, 'Dental Bills', 'Dentist', 'Dental'),
    ('CHK00050', '2024-10-15', '010', 85.00, 'Dinner at Pizzeria', 'PizzaPlace', 'Dinner');

