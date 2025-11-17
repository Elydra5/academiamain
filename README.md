# Academia Main() - User Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Login and Registration](#login-and-registration)
3. [Homepage and Navigation](#homepage-and-navigation)
4. [Students Management](#students-management)
5. [Groups Management](#groups-management)
6. [Users Management](#users-management)
7. [Attendance Tracking](#attendance-tracking)
8. [Billing](#billing)
9. [Password Reset](#password-reset)

---

## Introduction

Academia Main() is a web application made as a project of erasmus students to manage students, groups, users, attendance records, and billing information.

### Main Features:
- Student management (create, edit, delete, view details)
- Group management (create, edit, delete, assign students)
- User management (administrators, teachers, students)
- Attendance record tracking and management
- Invoice and receipt generation
- User account management

---

## Login and Registration

### Login Page

**Access:** Automatically displayed when opening the application.

**Function:** Login with existing account or create a new account.

#### Clickable Elements and Functions:

1. **"Login" Tab**
   - Displays the login form
   - Default view

2. **"Register" Tab**
   - Displays the registration form
   - Clicking switches between the two views

3. **Login Form Fields:**
   - **Username Field**
     - Required field
     - Enter the username provided during registration
   - **Password Field**
     - Required field
     - Enter the password associated with the account
   - **"Forgot password?" Link**
     - Redirects to the password reset page
     - Clicking opens the password reset page

4. **"Sign In" Button**
   - Submits the login credentials
   - Displays "Loading..." text while processing
   - Redirects to the Students page after successful login
   - Displays error message below the form if login fails

5. **Registration Form Fields:**
   - **Email Field**
     - Required field
     - Expects valid email format (e.g., user@example.com)
   - **Username Field**
     - Required field
     - Enter a unique username
   - **Password Field**
     - Required field
     - Enter the password for the account
   - **Confirm Password Field**
     - Required field
     - Must match the password field
     - Displays error message if passwords don't match

6. **"Sign Up" Button**
   - Submits the registration data
   - Displays "Loading..." text while processing
   - Automatically switches to login view after successful registration
   - Username is automatically filled in the login field
   - Displays error message if registration fails

**Expected Behavior:**
- After successful login, the system redirects to the Students page
- Failed login attempts display an error message
- After registration, you can immediately log in

---

## Homepage and Navigation

### Navigation Bar (Navbar)

**Location:** At the top of the page, visible to all logged-in users.

**Function:** Quick navigation between different parts of the application.

#### Clickable Elements:

1. **"Academia Main()" Logo**
   - Redirects to the Students page
   - Clicking navigates to the homepage

2. **"Students" Menu Item**
   - Redirects to the Students listing page
   - Highlighted appearance when on active page

3. **"Groups" Menu Item**
   - Redirects to the Groups listing page
   - Highlighted appearance when on active page

4. **"Users" Menu Item**
   - Redirects to the Users listing page
   - Highlighted appearance when on active page

5. **"Attendance" Menu Item**
   - Redirects to the Attendance tracking page
   - Highlighted appearance when on active page

6. **"Billing" Menu Item**
   - Redirects to the Billing page
   - Highlighted appearance when on active page

7. **Language Selector Buttons:**
   - **"ES" Button** - Switches to Spanish language
   - **"EN" Button** - Switches to English language
   - Active language is highlighted

8. **"Logout" Button**
   - Logs out the user
   - Redirects to the login page
   - Clears session data

### Footer

**Location:** At the bottom of the page, visible to all logged-in users.

**Content:**
- Quick links to main pages (Students, Groups, Attendance, Billing)
- Support links (Password Reset)
- Copyright information

---

## Students Management

### Students Listing Page

**Access:** Click on "Students" in the navigation menu.

**Function:** List all students, add new student, view student details.

#### Clickable Elements and Functions:

1. **"Add Student" Button**
   - Located in the top right corner
   - Clicking opens a modal window
   - Used to add a new student

2. **Page Size Selector (Show)**
   - Dropdown menu
   - Options: 10, 20, 30, 50 students per page
   - Changing the value reloads the page with the selected size

3. **Student Cards**
   - Each student is displayed on a card
   - **Clickable:** Clicking the card navigates to the student detail page
   - **Content:**
     - Student avatar (name initials)
     - Full name (first name + last name)
     - Phone number with icon
   - **Arrow Icon:** On the right side, indicates it's clickable

4. **Pagination**
   - If there are more students than the page size, pagination appears
   - **Previous Page Button:** Goes back to the previous page (disabled on first page)
   - **Page Number Buttons:** Jump directly to a specific page
   - **Next Page Button:** Advances to the next page (disabled on last page)
   - **Page Information:** Shows total number of students and the current range displayed

5. **Empty State**
   - If there are no students, a message is displayed
   - "No students" text and icon
   - "Get started" message

#### Add New Student Modal

**Opening:** Click the "Add Student" button.

**Fields:**
- **First Name** - Required field, text
- **Last Name** - Required field, text
- **Phone Number** - Optional field, text

**Buttons:**
- **"Cancel" Button:**
  - Closes the modal window
  - Does not save the data
  - Modal can also be closed by clicking the background

- **"Create Student" Button:**
  - Creates the new student
  - Adds it to the list
  - Closes the modal window
  - Displays error message if creation fails

### Student Detail Page

**Access:** Click on a student card from the listing page.

**Function:** View detailed information about a student, edit, delete, assign to group.

#### Clickable Elements and Functions:

1. **"Back" Button**
   - Located in the top left corner
   - Navigates to the Students listing page

2. **"Edit" Button**
   - Located in the top right corner
   - Clicking opens the edit modal
   - Used to modify student information

3. **"Delete" Button**
   - Located in the top right corner, next to the Edit button
   - Clicking displays a confirmation dialog
   - After confirmation, deletes the student
   - After deletion, redirects to the Students listing page

4. **Student Information Display:**
   - **Name:** Large, highlighted text
   - **Enrollment Date:** Displayed as a badge
   - **Phone Number:** With icon and label
   - **Enrollment Date in Details:** Full date format

5. **Group Assignment Section:**
   - **Group Selector Dropdown:**
     - Lists all available groups
     - "Select group" default option
     - Disabled if there are no groups
   - **"Enroll" Button:**
     - Assigns the student to the selected group
     - Displays "Enrolling..." text while processing
     - Shows success message after successful operation
     - Shows error message if operation fails
   - **Feedback Messages:**
     - Success message in green
     - Error message in red

#### Edit Student Modal

**Opening:** Click the "Edit" button.

**Fields:**
- **First Name** - Text field, editable
- **Last Name** - Text field, editable
- **Phone Number** - Text field, editable
- **Enrollment Date** - Date picker field

**Buttons:**
- **"Cancel" Button:**
  - Closes the modal window
  - Does not save changes

- **"Save" Button:**
  - Saves the modifications
  - Updates the student information
  - Closes the modal window
  - Displays error message if save fails

---

## Groups Management

### Groups Listing Page

**Access:** Click on "Groups" in the navigation menu.

**Function:** List all groups, create new group, view group details.

#### Clickable Elements and Functions:

1. **"Add Group" Button**
   - Located in the top right corner
   - Clicking opens a modal window
   - Used to create a new group

2. **Group Cards**
   - Each group is displayed on a card
   - **Clickable:** Clicking the card navigates to the group detail page
   - **Content:**
     - Group icon
     - Group name
     - Long description (if available)
     - Number of students displayed as a badge
   - **Arrow Icon:** On the right side, indicates it's clickable

3. **Empty State**
   - If there are no groups, a message is displayed
   - "No groups" text and icon
   - "Get started" message

#### Create New Group Modal

**Opening:** Click the "Add Group" button.

**Fields:**
- **Name** - Required field, text
- **Short Description** - Optional field, text
- **Moodle ID** - Optional field, number
- **End Date** - Optional field, date picker
- **Teacher** - Optional field, dropdown menu (from users list)
- **Long Description** - Optional field, multi-line text

**Buttons:**
- **"Cancel" Button:**
  - Closes the modal window
  - Does not save the data

- **"Create Group" Button:**
  - Creates the new group
  - Adds it to the list
  - Closes the modal window
  - Displays error message if creation fails

### Group Detail Page

**Access:** Click on a group card from the listing page.

**Function:** View detailed information about a group, edit, delete, list students in the group.

#### Clickable Elements and Functions:

1. **"Back" Button**
   - Located in the top left corner
   - Navigates to the Groups listing page

2. **"Edit" Button**
   - Located in the top right corner
   - Clicking opens the edit modal
   - Used to modify group information

3. **"Delete" Button**
   - Located in the top right corner, next to the Edit button
   - Clicking displays a confirmation dialog
   - After confirmation, deletes the group
   - After deletion, redirects to the Groups listing page

4. **Group Information Display:**
   - **Name:** Large, highlighted text
   - **Status Badge:** Active/Inactive status
   - **Teacher Badge:** If a teacher is assigned
   - **Short Description:** If provided
   - **Long Description:** If provided
   - **Teacher Name:** If assigned
   - **Moodle ID:** If provided
   - **Start Date:** If provided
   - **End Date:** If provided
   - **Status:** Active or Inactive

5. **Students Section:**
   - **"Students in Group" Title:**
     - Lists students belonging to the group
   - **Student Cards:**
     - Each student is displayed on a card
     - **Clickable:** Clicking the card navigates to the student detail page
     - **Content:**
       - Student icon
       - Full name
       - Phone number (if available)
       - Enrollment date (if available)
     - **Arrow Icon:** On the right side
   - **Empty State:**
     - If there are no students in the group, "No students" message is displayed

#### Edit Group Modal

**Opening:** Click the "Edit" button.

**Fields:**
- **Name** - Text field, editable
- **Short Description** - Text field, editable
- **Long Description** - Multi-line text field, editable
- **Moodle ID** - Number field, editable
- **Start Date** - Date picker field
- **End Date** - Text field (date format)
- **Status** - Dropdown menu (Active/Inactive)
- **Teacher** - Text field, editable

**Buttons:**
- **"Cancel" Button:**
  - Closes the modal window
  - Does not save changes

- **"Save" Button:**
  - Saves the modifications
  - Updates the group information
  - Closes the modal window
  - Displays error message if save fails

---

## Users Management

### Users Listing Page

**Access:** Click on "Users" in the navigation menu.

**Function:** List all users, create new user, view user details.

#### Clickable Elements and Functions:

1. **"Add User" Button**
   - Located in the top right corner
   - Clicking opens a modal window
   - Used to create a new user

2. **User Cards**
   - Each user is displayed on a card
   - **Clickable:** Clicking the card navigates to the user detail page
   - **Content:**
     - User icon
     - Username
     - Email address (if available, otherwise "No email")
     - Role badge (admin, teacher, student, or "User")
   - **Arrow Icon:** On the right side, indicates it's clickable

3. **Empty State**
   - If there are no users, a message is displayed
   - "No users" text and icon
   - "Get started" message

#### Create New User Modal

**Opening:** Click the "Add User" button.

**Fields:**
- **Username** - Required field, text
- **Email** - Optional field, email format
- **Password** - Required field, password type
- **Role** - Optional field, dropdown menu:
  - Admin
  - Teacher
  - Student

**Buttons:**
- **"Cancel" Button:**
  - Closes the modal window
  - Does not save the data

- **"Create User" Button:**
  - Creates the new user
  - Adds it to the list
  - Closes the modal window
  - Displays error message if creation fails

### User Detail Page

**Access:** Click on a user card from the listing page.

**Function:** View detailed information about a user, edit, delete.

#### Clickable Elements and Functions:

1. **"Back" Button**
   - Located in the top left corner
   - Navigates to the Users listing page

2. **"Edit" Button**
   - Located in the top right corner
   - Clicking opens the edit modal
   - Used to modify user information

3. **"Delete" Button**
   - Located in the top right corner, next to the Edit button
   - Clicking displays a confirmation dialog
   - After confirmation, deletes the user
   - After deletion, redirects to the Users listing page

4. **User Information Display:**
   - **Name:** Large, highlighted text (first name + last name if available, otherwise username)
   - **Role Badge:** Displays the user's role
   - **Status Badge:** Active/Inactive status (color-coded)
   - **Username:** In detailed information
   - **Email:** In detailed information (if available, otherwise "No email")
   - **Role:** In detailed information
   - **First Name:** If provided
   - **Last Name:** If provided
   - **Moodle ID:** If provided
   - **Last Login:** Date and time format (or "Never" if never logged in)
   - **Status:** Active or Inactive

#### Edit User Modal

**Opening:** Click the "Edit" button.

**Fields:**
- **Username** - Text field, editable
- **First Name** - Text field, editable
- **Last Name** - Text field, editable
- **Email** - Email field, editable
- **Role** - Dropdown menu (Admin, Teacher, Student)
- **Moodle ID** - Number field, editable
- **Status** - Dropdown menu (Active: 1, Inactive: 0)

**Buttons:**
- **"Cancel" Button:**
  - Closes the modal window
  - Does not save changes

- **"Save" Button:**
  - Saves the modifications
  - Updates the user information
  - Closes the modal window
  - Displays error message if save fails

---

## Attendance Tracking

### Attendance Page

**Access:** Click on "Attendance" in the navigation menu.

**Function:** List attendance records, create new attendance record, edit, delete, generate receipts.

#### Clickable Elements and Functions:

1. **"Add Attendance" Button**
   - Located in the top right corner
   - Clicking opens a modal window
   - Used to record new attendance

2. **Success Message**
   - Green alert box
   - Appears after successful operations (create, edit, delete, receipt generation)
   - Automatically disappears after 3 seconds

3. **Attendance Table**
   - Displays all attendance records in table format
   - **Columns:**
     - **Student:** Student's full name
     - **Group:** Group name
     - **Date:** Attendance date
     - **Duration:** Formatted in hours and minutes
     - **Teacher:** Teacher's username
     - **Hourly Rate:** In euros
     - **Receipt:** Badge indicates if receipt has been generated
     - **Actions:** Action buttons

4. **Action Buttons (in each row):**
   - **Edit Icon Button:**
     - Clicking opens the edit modal
     - Used to modify attendance record
   - **Delete Icon Button:**
     - Clicking displays a confirmation dialog
     - After confirmation, deletes the attendance record
   - **Generate Receipt Icon Button:**
     - Only appears if no receipt has been generated yet
     - Clicking opens the receipt generation modal

5. **Empty State**
   - If there are no attendance records, a message is displayed in the table
   - "No attendance" text and icon
   - "Get started" message

#### Create New Attendance Record Modal

**Opening:** Click the "Add Attendance" button.

**Fields (all required):**
- **Student** - Dropdown menu, selectable from students list
- **Group** - Dropdown menu, selectable from groups list
- **Date** - Date picker field
- **Duration** - Number field, in minutes (minimum 1 minute)
- **Teacher** - Dropdown menu, selectable from teachers list
- **Hourly Rate** - Number field, in euros, with decimals (minimum 0)

**Buttons:**
- **"Cancel" Button:**
  - Closes the modal window
  - Does not save the data

- **"Create Attendance" Button:**
  - Creates the new attendance record
  - Adds it to the table
  - Closes the modal window
  - Success message appears
  - Error message appears in the modal if creation fails

#### Edit Attendance Record Modal

**Opening:** Click the edit icon button in a row.

**Fields (all required):**
- **Student** - Dropdown menu, selectable from students list
- **Group** - Dropdown menu, selectable from groups list
- **Date** - Date picker field
- **Duration** - Number field, in minutes (minimum 1 minute)
- **Teacher** - Dropdown menu, selectable from teachers list
- **Hourly Rate** - Number field, in euros, with decimals (minimum 0)

**Buttons:**
- **"Cancel" Button:**
  - Closes the modal window
  - Does not save changes

- **"Save" Button:**
  - Saves the modifications
  - Updates the attendance record in the table
  - Closes the modal window
  - Success message appears
  - Error message appears in the modal if save fails

#### Generate Receipt Modal

**Opening:** Click the generate receipt icon button in a row (only visible if no receipt has been generated yet).

**Function:** Generate PDF receipt for the attendance record.

**Information Display:**
- Student name
- Date
- Duration

**Fields (all optional):**
- **Hours** - Number field, with decimals
  - If not provided, automatically calculated (duration / 60)
- **Hourly Rate** - Number field, in euros, with decimals
  - If not provided, uses the attendance record's hourly rate
- **Payment Method** - Text field (e.g., Cash, Card, etc.)

**Buttons:**
- **"Cancel" Button:**
  - Closes the modal window
  - Does not generate receipt

- **"Generate Receipt" Button:**
  - Generates the PDF receipt
  - Displays "Generating..." text while processing
  - After successful generation, automatically downloads the PDF file
  - Updates the attendance record (adds receipt ID)
  - Closes the modal window
  - Success message appears
  - Error message appears in the modal if generation fails

---

## Billing

### Billing Page

**Access:** Click on "Billing" in the navigation menu.

**Function:** Generate invoices for students.

#### Clickable Elements and Functions:

1. **Invoice Generation Form**
   - Located in a central card
   - Titled "Generate Invoice"

2. **Error Message**
   - Red alert box
   - Appears when there are invalid data or errors
   - At the top of the form

3. **Success Message**
   - Green alert box
   - Appears after successful invoice generation
   - At the top of the form

4. **Form Fields (all required):**
   - **Student** - Dropdown menu, selectable from students list
     - "Select a student" default option
     - Disabled while loading
   - **Hours Studied** - Number field, with decimals
     - Minimum 0.01
     - Disabled while generating invoice
   - **Total Amount** - Number field, in euros, with decimals
     - Minimum 0.01
     - Disabled while generating invoice

5. **"Reset" Button**
   - Secondary button
   - Clears all fields
   - Resets to default values
   - Disabled while generating invoice

6. **"Generate Invoice" Button**
   - Primary button
   - Submits the data to the server
   - Displays "Generating..." text while processing
   - Disabled while processing
   - After successful generation:
     - Automatically downloads the PDF invoice
     - Success message appears
     - Automatically resets the form after 2 seconds
   - Error message appears if generation fails

7. **Loading State**
   - "Loading students..." text
   - Appears while loading students

**Expected Behavior:**
- Invoice downloads in PDF format
- File name format: `invoice_[student_id]_[timestamp].pdf`
- Invoice contains student information, hours studied, and total amount

---

## Password Reset

### Password Reset Page

**Access:** 
- Click "Forgot password?" link on the login page
- Click "Forgot Password" link in the footer

**Function:** Send password reset link to email address.

#### Clickable Elements and Functions:

1. **"Back to Login" Link**
   - Located in the top left corner
   - With back icon
   - Navigates to the login page

2. **Email Field**
   - Required field
   - Expects email format
   - Placeholder: "Enter your email"

3. **"Send Reset Link" Button**
   - Submits the password reset request
   - Displays "Sending..." text while processing
   - Disabled while processing
   - After successful sending:
     - Success message appears: "Password reset link has been sent to your email."
     - Email field is cleared
   - Error message appears if sending fails

4. **Success Message**
   - Green message
   - Appears after successful email sending

5. **Error Message**
   - Red message
   - Appears if there's an error

**Expected Behavior:**
- System sends an email to the provided address
- Email contains the password reset link
- Clicking the link allows setting a new password

---

## General Functions and Notes

### Modal Windows

- **Closing Methods:**
  - Click "Cancel" or "Close" button
  - Click on the modal background (overlay)
  - ESC key (browser dependent)

### Error Messages

- Displayed in red color
- Usually at the top of the form or in the modal
- Provide detailed information about the error

### Success Messages

- Displayed in green color
- Appear after successful operations
- Usually automatically disappear after a few seconds

### Loading States

- "Loading..." or similar text appears
- Buttons are disabled while loading
- Spinner or similar animations may appear

### Validation

- Required fields marked with (*)
- Email format validation
- Number field validation
- Date field validation
- Password match validation (during registration)

### Navigation

- No breadcrumb navigation, but "Back" buttons assist navigation
- Active page highlighted in navigation menu
- Automatic redirection after operations

### Responsive Design

- Application is responsive, works on different screen sizes
- Usable on mobile and tablet devices

---

## Troubleshooting

### Common Problems and Solutions:

1. **Cannot log in:**
   - Check username and password
   - Try the password reset function

2. **Data not displaying:**
   - Refresh the page (F5)
   - Check internet connection
   - Wait a few seconds for loading

3. **Error message appears:**
   - Read the error message details
   - Try the operation again
   - If the problem persists, contact the administrator

4. **PDF not downloading:**
   - Check browser download settings
   - Try in a different browser
   - Check if downloads are blocked

---

## Additional Information

This documentation applies to the current version of the Academia Main() application. The application is under continuous development, so some features may change.

---

**Documentation Version:** 1.0  
**Last Updated:** 2025

