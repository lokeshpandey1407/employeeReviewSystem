const navbarContainer = document.getElementById("navbar-container");

navbarContainer.innerHTML = `<nav class="navbar navbar-expand-lg navbar-light bg-info">
<a class="navbar-brand" href="#">Placement Cell</a>
<button
  class="navbar-toggler"
  type="button"
  data-bs-toggle="collapse"
  data-bs-target="#navbarNav"
  aria-controls="navbarNav"
  aria-expanded="false"
  aria-label="Toggle navigation"
>
  <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarNav">
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link" href="./EmployeeList.html">Employee</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="./reviewList.html">Review</a>
    </li>
    <li class="nav-item">
      <button class="nav-link" id="logout">Logout</button>
    </li>
  </ul>
</div>
</nav>`;

const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem("employee");
  window.location.href = "/index.html";
});
