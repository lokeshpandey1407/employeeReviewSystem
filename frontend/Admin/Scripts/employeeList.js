//Checking whether the Emplyee is authenticated or not by checking the token
const isEmployeeValid = () => {
  const token = sessionStorage.getItem("employee");
  if (!token) {
    window.location.href = "/index.html";
  }
};
isEmployeeValid();

const tableBody = document.getElementById("employee-table-body");
const addEmployee = document.getElementById("add-employee-btn");

//adding event listener to move the employee to add employee page
addEmployee.addEventListener("click", () => {
  window.location.href = "../Pages/addEmployee.html";
});

//Function to pupulate Employees table
function populateEmployeeTable(employees) {
  tableBody.innerHTML = "";
  if (employees.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = `<td colspan="7" class="text-center">No data available</td>`;
    tableBody.appendChild(emptyRow);
  } else {
    employees.forEach((employee, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
    <td>${index + 1}</td>
      <td>${employee.name}</td>
      <td>${employee.profile}</td>
      <td>${employee.email}</td>
      <td>${employee.manager}</td>
      <td>${employee.role}</td>
      <td>
        <button class="btn btn-warning m-1" title="Edit the employee" onclick="editEventListener('${
          employee._id
        }')">Edit</button>
         <button class="btn btn-danger" title="Delete the employee" onclick="deleteEventListener('${
           employee._id
         }')">Delete</button>
      </td>
    `;
      tableBody.appendChild(row);
    });
  }
}

//Api call to get all the employees data
async function handleGetEmployees() {
  try {
    const response = await fetch("http://localhost:3200/api/employee", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          sessionStorage.getItem("employee")
        )}`,
      },
    });
    const res = await response.json();
    if (res.success) {
      populateEmployeeTable(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}

//edit event listener
async function editEventListener(id) {
  window.location.href = `../Pages/editemployee.html?id=${id}`;
}

//delete event handler
async function deleteEventListener(id) {
  const answer = confirm("Are you sure you want to delete the record");
  if (answer) {
    handleDeleteEmployee(id);
  }
}

//Api call to delete employee
async function handleDeleteEmployee(id) {
  try {
    const response = await fetch(`http://localhost:3200/api/employee/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          sessionStorage.getItem("employee")
        )}`,
      },
    });
    const res = await response.json();
    if (res.success) {
      location.reload();
    }
  } catch (err) {
    console.log(err);
  }
}

handleGetEmployees();
