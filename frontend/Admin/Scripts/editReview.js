//Checking whether the Emplyee is authenticated or not by checking the token
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

const UpdateBtn = document.getElementById("update-btn");

const UpdateReviewForm = document.getElementById("review-form");
const Reviewer = document.getElementById("reviewer");
const EmployeeDropdown = document.getElementById("employeeDropdown");
const ParticipantsDropdown = document.getElementById("participantsDropdown");
const PerformanceReview = document.getElementById("review");

Reviewer.value = employeeName;

//Adding eventlistener for creating review
UpdateReviewForm.addEventListener("submit", async (event) => {
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
    handleError("Employee can't participate in its one performace review");
    return;
  }

  handleUpdateReview(jsonData);
});

//Function to populate employee dropdown
function populateEmployeeDropdown(employees, review) {
  employees.forEach((employee) => {
    const select = document.createElement("option");
    select.value = `${employee._id}`;
    select.textContent = `${employee.name}`;
    if (select.value === review.employee) select.selected = true;
    EmployeeDropdown.appendChild(select);
  });
}

//Function to populate participants dropdow
function populateParticipantsDropdown(employees, review) {
  employees.forEach((employee) => {
    const select = document.createElement("option");
    select.value = `${employee._id}`;
    select.textContent = `${employee.name}`;
    review.participants.forEach((participant) => {
      if (select.value === participant) select.selected = true;
    });
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
      // populateParticipantsDropdown(res.data);
      // populateEmployeeDropdown(res.data);
      return res.data;
    }
  } catch (err) {
    console.log(err);
  }
}

//Api call for create review
async function handleUpdateReview(data) {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;
  const id = searchParams.get("id");
  try {
    const response = await fetch(`http://localhost:3200/api/review/${id}`, {
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
      window.location.href = "../Pages/ReviewList.html";
    }
  } catch (err) {
    console.log(err);
  }
}

//Function to populate form values
function populateFormValues(review, status) {
  PerformanceReview.value = review.review;
  EmployeeDropdown.disabled = true;
  ParticipantsDropdown.disabled = true;
  if (status === "Completed") {
    PerformanceReview.disabled = true;

    UpdateBtn.textContent = "Back";
    UpdateBtn.addEventListener("click", () => {
      window.location.href = "../Pages/ReviewList.html";
    });
  }
}

//Api call for getting Review data by id
async function handleGetReviewData() {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;
  const id = searchParams.get("id");
  const status = searchParams.get("status");
  if (!id || !status) {
    window.location.href = "../Pages/ReviewList.html";
  }
  try {
    const response = await fetch(`http://localhost:3200/api/review/${id}`, {
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
      const employees = await getAllEmployees();
      populateParticipantsDropdown(employees, res.data);
      populateEmployeeDropdown(employees, res.data);
      populateFormValues(res.data, status);
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

handleGetReviewData();
