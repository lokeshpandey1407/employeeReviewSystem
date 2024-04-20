const LoginForm = document.getElementById("login-form");
const error = document.getElementById("error-message");

//Event listener to add the submit functionality to the signin form
LoginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  handleSignInEmployee(email, password);
});

//Api call to signin
async function handleSignInEmployee(email, password) {
  try {
    const response = await fetch("http://localhost:3200/api/employee/signin", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const res = await response.json();

    if (res.success) {
      sessionStorage.setItem("employee", JSON.stringify(res.data));
      const payload = res.data.split(".")[1];
      const decodedPayload = JSON.parse(atob(payload));
      const employeeRole = decodedPayload.employeeRole;
      if (employeeRole === "Admin") {
        window.location.href = "./Admin/Pages/EmployeeList.html";
      } else if (employeeRole === "Employee") {
        window.location.href = "./Employee/Pages/ReviewList.html";
      }
    } else {
      handleError(res.message);
    }
  } catch (err) {
    console.log(err);
  }
}

//Function to show Errors
const handleError = (message) => {
  error.textContent = message;
  error.classList.remove("d-none");

  setTimeout(() => {
    error.textContent = "";
    error.classList.add("d-none");
  }, 3000);
};
