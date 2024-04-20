//function to check if the employee is valid
let token;
const isEmployeeValid = () => {
  token = sessionStorage.getItem("employee");
  if (!token) {
    window.location.href = "/index.html";
  }
};
isEmployeeValid();

const payload = token.split(".")[1];
const decodedPayload = JSON.parse(atob(payload));
const employeeId = decodedPayload.employeeId;
const employeeName = decodedPayload.employeeName;

const tableBody = document.getElementById("participation-table-body");

//Function to pupulate Participation table
function populateParticipationTable(participations) {
  tableBody.innerHTML = "";
  if (participations.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = `<td colspan="8" class="text-center">No data available</td>`;
    tableBody.appendChild(emptyRow);
  } else {
    participations.forEach((participation, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
    <td>${index + 1}</td>
      <td>${employeeName}</td>
      <td>${participation.reviewer.name}</td>
      <td>${participation.employee.name}</td>
      <td>${participation.review}</td>
      <td>${participation.feedback}</td>
      <td>${participation.feedbackStatus}</td>`;
      tableBody.appendChild(row);
    });
  }
}

//Api call to get Employee data
async function handleGetEmployeeData() {
  const id = employeeId;
  try {
    const response = await fetch(`http://localhost:3200/api/employee/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          sessionStorage.getItem("employee")
        )}`,
      },
    });
    const res = await response.json();
    if (res.success) {
      populateParticipationTable(res?.data?.participatedInPerformanceReviews);
    }
  } catch (err) {
    console.log(err);
  }
}

handleGetEmployeeData();
