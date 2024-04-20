//function to check if the token is present in the session storage, if not then it will redirect to login page
let token;
const isEmployeeValid = () => {
  token = sessionStorage.getItem("employee");
  if (!token) {
    window.location.href = "/index.html";
  }
};
isEmployeeValid();

const error = document.getElementById("error-message");

const payload = token.split(".")[1];
const decodedPayload = JSON.parse(atob(payload));
const employeeId = decodedPayload.employeeId;
const employeeName = decodedPayload.employeeName;

const AddReviewForm = document.getElementById("review-form");
const Reviewer = document.getElementById("reviewer");
const EmployeeDropdown = document.getElementById("employeeDropdown");
const ParticipantsDropdown = document.getElementById("participantsDropdown");

Reviewer.value = employeeName;

//Adding eventlistener for creating review
AddReviewForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let jsonData = {};

  //Getting form data from add review form
  const formData = new FormData(event.target);
  for (const [key, value] of formData.entries()) {
    if (key === "participants") continue;
    jsonData[key] = value;
  }

  // Making SelectedParticipants Array

  const selectedParticipants = Array.from(
    ParticipantsDropdown.selectedOptions
  ).map((option) => option.value);
  jsonData["participants"] = selectedParticipants;

  // Checking so that Employee cannot be added as a participants to its own performance review
  if (selectedParticipants.includes(jsonData.employee)) {
    handleError("Employee can't participate in it's own performace review");
    return;
  }

  //Checking that Admin cannot review himself
  if (jsonData.employee === employeeId) {
    handleError("Admin cannot review himself.");
    return;
  }

  handleAddReview(jsonData);
});

//Function to populate employee dropdown
function populateEmployeeDropdown(employees) {
  employees.forEach((employee) => {
    const select = document.createElement("option");
    select.value = `${employee._id}`;
    select.textContent = `${employee.name}`;
    EmployeeDropdown.appendChild(select);
  });
}

//Function to populate participants dropdow
function populateParticipantsDropdown(employees) {
  employees.forEach((employee) => {
    const select = document.createElement("option");
    select.value = `${employee._id}`;
    select.textContent = `${employee.name}`;
    ParticipantsDropdown.appendChild(select);
  });
}

//Api call to get all the employees to populate the dropdown select
async function getAllEmployees() {
  try {
    const response = await fetch("http://localhost:3200/api/employee", {
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
      populateParticipantsDropdown(res.data);
      populateEmployeeDropdown(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}

//Api call for create review
async function handleAddReview(data) {
  try {
    const response = await fetch("http://localhost:3200/api/review", {
      method: "POST",
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
      window.location.href = "../Pages/ReviewList.html";
    }
  } catch (err) {
    console.log(err);
  }
}

//Handle errors
const handleError = (message) => {
  error.textContent = message;
  error.classList.remove("d-none");

  setTimeout(() => {
    error.textContent = "";
    error.classList.add("d-none");
  }, 3000);
};

getAllEmployees();
