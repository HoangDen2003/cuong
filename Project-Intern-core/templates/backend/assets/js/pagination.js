document.addEventListener("DOMContentLoaded", function () {
  var rowsPerPage = 10;
  const select = document.querySelector("select.form-select");

  const rows = document.querySelectorAll(".table tbody tr");

  select.addEventListener("change", function () {
    rowsPerPage = parseInt(select.value, 10);
    updatePagination();
  });

  let currentPage = 1;
  let pageCount = Math.ceil(rows.length / rowsPerPage);

  const pagination = document.querySelector(".pagination");

  function createPaginationButton(label) {
    const li = document.createElement("li");
    li.classList.add("page-item");
    const a = document.createElement("a");
    a.classList.add("page-link");
    a.href = "#";
    a.textContent = label;
    li.appendChild(a);
    return li;
  }

  function showPage(pageNumber) {
    const startIndex = (pageNumber - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    rows.forEach((row, index) => {
      row.style.display =
        index >= startIndex && index < endIndex ? "table-row" : "none";
    });

    const pageLinks = document.querySelectorAll(
      ".pagination .page-item .page-link"
    );
    pageLinks.forEach((link) => {
      link.parentElement.classList.remove("active");
      if (link.textContent === String(pageNumber)) {
        link.parentElement.classList.add("active");
      }
    });

    currentPage = pageNumber;
  }

  function updatePagination() {
    pagination.innerHTML = "";

    const prevButton = createPaginationButton("Previous");
    prevButton.addEventListener("click", function () {
      if (currentPage > 1) {
        showPage(--currentPage);
      }
    });
    pagination.appendChild(prevButton);

    pageCount = Math.ceil(rows.length / rowsPerPage);
    for (let i = 1; i <= pageCount; i++) {
      const pageButton = createPaginationButton(i);
      pageButton.addEventListener("click", function () {
        showPage(i);
      });
      pagination.appendChild(pageButton);
    }

    const nextButton = createPaginationButton("Next");
    nextButton.addEventListener("click", function () {
      if (currentPage < pageCount) {
        showPage(++currentPage);
      }
    });
    pagination.appendChild(nextButton);

    showPage(currentPage);
  }

  updatePagination();
});
