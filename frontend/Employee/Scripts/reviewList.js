//Checking whether the Emplyee is authenticated or not by checking the token
let token;
const isEmployeeValid = () => {
  token = sessionStorage.getItem("employee");
  if (!token) {
    window.location.href = "/index.html";
  }
};
isEmployeeValid();

//decoding the token and getting employeeid and name
const payload = token.split(".")[1];
const decodedPayload = JSON.parse(atob(payload));
const employeeId = decodedPayload.employeeId;
const employeeName = decodedPayload.employeeName;

const tableBody = document.getElementById("review-table-body");
const addReview = document.getElementById("add-review-btn");
const Feedback = document.getElementById("feedback");
const SubmitFeedback = document.getElementById("submit-feedback");

//Function to pupulate Review table
function populateReviewTable(reviews) {
  tableBody.innerHTML = "";
  if (reviews.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = `<td colspan="8" class="text-center">No data available</td>`;
    tableBody.appendChild(emptyRow);
  } else {
    reviews.forEach((review, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
    <td>${index + 1}</td>
      <td>${review.reviewer.name}</td>
      <td>${review.employee.name}</td>
      <td>${review.review}</td>
      <td>${review.feedback}</td>
      <td>${review.feedbackStatus}</td>
     
      <td>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Feedback
        </button>
      </td>
    `;
      SubmitFeedback.addEventListener("click", () => {
        handleSubmitFeedback(review._id);
      });
      tableBody.appendChild(row);
    });
  }
}

//Api call to submit feedback
async function handleSubmitFeedback(id) {
  const feedback = Feedback.value;
  if (feedback === "") {
    return;
  }
  const data = { feedback: feedback, feedbackStatus: "Completed" };
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
      Feedback.value = "";
      location.reload();
    }
  } catch (err) {
    console.log(err);
  }
}

//Api call to get all the reviews data of the employee
async function handleGetReviews() {
  try {
    const response = await fetch(
      `http://localhost:3200/api/review/all/${employeeId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(
            sessionStorage.getItem("employee")
          )}`,
        },
      }
    );
    const res = await response.json();
    if (res.success) {
      populateReviewTable(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}

handleGetReviews();
