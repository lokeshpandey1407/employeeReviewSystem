//Checking whether the Emplyee is authenticated or not by checking the token
const isEmployeeValid = () => {
  const token = sessionStorage.getItem("employee");
  if (!token) {
    window.location.href = "/index.html";
  }
};
isEmployeeValid();

//Getting fields
const AddEmployeeForm = document.getElementById("employee-form");
const EmployeeName = document.getElementById("name");
const JobProfile = document.getElementById("profile");
const Role = document.getElementById("role");
const Email = document.getElementById("email");
const Manager = document.getElementById("manager");

//Function to populate Edit employee form values
function populateFormValues(data) {
  EmployeeName.value = data.name;
  JobProfile.value = data.profile;
  Role.value = data.role;
  Email.value = data.email;
  Manager.value = data.manager;
}

//Adding eventlistener for updating the employee data
AddEmployeeForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const jsonData = {};
  for (const [key, value] of formData.entries()) {
    jsonData[key] = value;
  }
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;
  const id = searchParams.get("id");
  handleUpdateEmployee(id, jsonData);
});

//Api call for get employee data
async function handleGetEmployeeData() {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;
  const id = searchParams.get("id");
  try {
    const response = await fetch(`http://localhost:3200/api/employee/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(
          sessionStorage.getItem("employee")
        )}`,
      },
    });
    const res = await response.json();
    if (res.success) {
      populateFormValues(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}

//Api call for update employee
async function handleUpdateEmployee(id, data) {
  try {
    const response = await fetch(`http://localhost:3200/api/employee/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(
          sessionStorage.getItem("employee")
        )}`,
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (res.success) {
      window.location.href = "../Pages/EmployeeList.html";
    }
  } catch (err) {
    console.log(err);
  }
}

handleGetEmployeeData();
