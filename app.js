// Initial employee data with positions provided
let employees = [
    {
        firstName: "John",
        lastName: "D",
        scheduledTime: "9:00 AM - 5:00 PM",
        position: "Picking",  // Updated position
        break1: "10:30 AM - 10:45 AM",
        lunch: "12:30 PM - 1:00 PM",
        break2: "3:00 PM - 3:15 PM"
    },
    {
        firstName: "Jane",
        lastName: "S",
        scheduledTime: "10:00 AM - 6:00 PM",
        position: "Staging",  // Updated position
        break1: "11:30 AM - 11:45 AM",
        lunch: "2:00 PM - 2:30 PM",
        break2: "4:30 PM - 4:45 PM"
    },
    {
        firstName: "Sam",
        lastName: "K",
        scheduledTime: "8:00 AM - 4:00 PM",
        position: "Prepping",  // Updated position
        break1: "9:30 AM - 9:45 AM",
        lunch: "12:00 PM - 12:30 PM",
        break2: "2:30 PM - 2:45 PM"
    },
    {
        firstName: "Chris",
        lastName: "L",
        scheduledTime: "11:00 AM - 7:00 PM",
        position: "Dispensing",  // Updated position
        break1: "12:30 PM - 12:45 PM",
        lunch: "2:30 PM - 3:00 PM",
        break2: "5:00 PM - 5:15 PM"
    },
    {
        firstName: "Taylor",
        lastName: "M",
        scheduledTime: "7:00 AM - 3:00 PM",
        position: "Exceptions",  // Updated position
        break1: "8:30 AM - 8:45 AM",
        lunch: "11:30 AM - 12:00 PM",
        break2: "1:30 PM - 1:45 PM"
    }
];

let editingIndex = -1;  // Index to track which employee we are editing

// Function to convert a time string (e.g., "9:00 AM") to minutes since midnight
// This helps to compare the start times of the employees for sorting purposes
function timeToMinutes(time) {
    const [timePart, period] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
}

// Function to sort employees based on their scheduled start time
function sortEmployees() {
    // Sort the employees array by their start time (the first part of the scheduledTime)
    employees.sort((a, b) => {
        const startTimeA = a.scheduledTime.split(' - ')[0];
        const startTimeB = b.scheduledTime.split(' - ')[0];
        return timeToMinutes(startTimeA) - timeToMinutes(startTimeB);
    });
}

// Function to render the employee schedule to the table
function renderSchedule() {
    sortEmployees();  // Sort employees by scheduled start time
    const scheduleTable = document.getElementById('schedule').getElementsByTagName('tbody')[0];
    scheduleTable.innerHTML = '';  // Clear existing rows from the table

    // Loop through the employees array and create a table row for each employee
    employees.forEach((employee, index) => {
        const row = scheduleTable.insertRow();  // Create a new row for the table

        // Create individual cells for each piece of employee data
        row.insertCell(0).textContent = `${employee.firstName} ${employee.lastName}`;  // Employee name
        row.insertCell(1).textContent = employee.scheduledTime;  // Employee's scheduled time
        row.insertCell(2).textContent = employee.position;  // Employee's position
        row.insertCell(3).textContent = employee.break1;  // Employee's first break
        row.insertCell(4).textContent = employee.lunch;  // Employee's lunch time
        row.insertCell(5).textContent = employee.break2;  // Employee's second break

        // Create a cell for the Edit and Delete buttons
        const actionCell = row.insertCell(6);

        // Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';  // Button text
        editButton.onclick = () => editEmployee(index);  // Edit button handler
        actionCell.appendChild(editButton);  // Add the edit button to the action cell

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Delete';  // Button text
        deleteButton.onclick = () => deleteEmployee(index);  // Delete button handler
        actionCell.appendChild(deleteButton);  // Add the delete button to the action cell
    });
}

// Function to add a new employee or update an existing employee
function addOrUpdateEmployee(event) {
    event.preventDefault();  // Prevent the form from reloading the page when submitted

    // Capture the values entered in the form fields
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const scheduledTime = document.getElementById('scheduledTime').value;
    const position = document.getElementById('position').value;  // Get the selected position from the dropdown
    const break1 = document.getElementById('break1').value;
    const lunch = document.getElementById('lunch').value;
    const break2 = document.getElementById('break2').value;

    // Create a new employee object with the entered details
    const newEmployee = {
        firstName,
        lastName,
        scheduledTime,
        position,
        break1,
        lunch,
        break2
    };

    if (editingIndex === -1) {
        // If we're not editing an employee (editingIndex is -1), add the new employee to the array
        employees.push(newEmployee);
    } else {
        // If we are editing an existing employee, update their data
        employees[editingIndex] = newEmployee;
        editingIndex = -1;  // Reset editing mode after update
        document.getElementById('formTitle').textContent = "Add New Employee";  // Reset form title
        document.getElementById('submitButton').textContent = "Add Employee";  // Reset form button text
    }

    renderSchedule();  // Re-render the table with updated data

    // Reset the form fields
    document.getElementById('employeeForm').reset();
}

// Function to edit an employee's data
function editEmployee(index) {
    const employee = employees[index];

    // Pre-fill the form fields with the selected employee's details
    document.getElementById('firstName').value = employee.firstName;
    document.getElementById('lastName').value = employee.lastName;
    document.getElementById('scheduledTime').value = employee.scheduledTime;
    document.getElementById('position').value = employee.position;  // Populate the position dropdown
    document.getElementById('break1').value = employee.break1;
    document.getElementById('lunch').value = employee.lunch;
    document.getElementById('break2').value = employee.break2;

    editingIndex = index;  // Set the index of the employee being edited

    // Change form title and button text to reflect we're in edit mode
    document.getElementById('formTitle').textContent = "Edit Employee";
    document.getElementById('submitButton').textContent = "Update Employee";
}

// Function to delete an employee
function deleteEmployee(index) {
    // Remove the employee from the array
    employees.splice(index, 1);
    renderSchedule();  // Re-render the table after deletion
}

// Initialize the schedule when the page loads
document.getElementById('employeeForm').addEventListener('submit', addOrUpdateEmployee);

// Render the schedule when the page loads
renderSchedule();
