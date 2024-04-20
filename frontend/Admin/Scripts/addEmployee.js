//function to check if the token is present in the session storage, if not then it will redirect to login page
const isEmployeeValid = () => {
  const token = sessionStorage.getItem("employee");
  if (!token) {
    window.location.href = "/index.html";
  }
};
isEmployeeValid();

const AddEmployeeForm = document.getElementById("employee-form");

//Adding eventlistener for creating Employee
AddEmployeeForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const jsonData = {};
  for (const [key, value] of formData.entries()) {
    jsonData[key] = value;
  }
  handleAddEmployee(jsonData);
});

//Api call for create employee
async function handleAddEmployee(data) {
  try {
    const response = await fetch("http://localhost:3200/api/employee/signup", {
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
      window.location.href = "../Pages/EmployeeList.html";
    }
  } catch (err) {
    console.log(err);
  }
}
