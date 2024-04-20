const RegistrationForm = document.getElementById("registration-form");
const error = document.getElementById("error-message");

//Adding event listener for signup
RegistrationForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const manager = document.getElementById("manager").value;
  const profile = document.getElementById("profile").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;
  await handleRegisterEmployee(name, email, password, role, manager, profile);
});

//Api call to signup
async function handleRegisterEmployee(
  name,
  email,
  password,
  role,
  manager,
  profile
) {
  try {
    const response = await fetch("http://localhost:3200/api/employee/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role, manager, profile }),
    });
    const res = await response.json();
    if (res.success) {
      window.location.href = "./index.html";
    } else {
      handleError(res.message);
    }
  } catch (err) {
    console.log(err);
  }
}

//error handler function to show error
const handleError = (message) => {
  error.textContent = message;
  error.classList.remove("d-none");
};
