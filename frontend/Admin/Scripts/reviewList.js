//Checking whether the Emplyee is authenticated or not by checking the token
const isEmployeeValid = () => {
  const token = sessionStorage.getItem("employee");
  if (!token) {
    window.location.href = "/index.html";
  }
};
isEmployeeValid();

const tableBody = document.getElementById("review-table-body");
const addReview = document.getElementById("add-review-btn");

//adding event listener to move the employee to add review page
addReview.addEventListener("click", () => {
  window.location.href = "../Pages/addReview.html";
});

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
      <td>${review.participants.map((item) => {
        return item.name;
      })}</td>
      <td>${review.review}</td>
      <td>${review.feedbackStatus}</td>
      <td>${review.feedback}</td>
      <td>
        <button class="btn btn-warning m-1" title="Edit the review" onclick="editEventListener('${
          review._id
        }',
      '${review.feedbackStatus}')">View/Edit</button>
      </td>
    `;
      tableBody.appendChild(row);
    });
  }
}

//Api call to get all the reviews data
async function handleGetReviews() {
  try {
    const response = await fetch("http://localhost:3200/api/review", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          sessionStorage.getItem("employee")
        )}`,
      },
    });
    const res = await response.json();
    if (res.success) {
      populateReviewTable(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}

//edit event listener
async function editEventListener(id, status) {
  window.location.href = `../Pages/editReview.html?id=${id}&status=${status}`;
}

handleGetReviews();
