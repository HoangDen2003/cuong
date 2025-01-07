// select all
// Function to update the state of the "select all" checkbox
function updateSelectAllState() {
  const checkboxes = document.querySelectorAll(
    ".dt-checkboxes.form-check-input"
  );
  const selectAllCheckbox = document.getElementById("select-all");
  const allChecked = Array.from(checkboxes).every(
    (checkbox) => checkbox.checked
  );
  selectAllCheckbox.checked = allChecked;
}

// Add an event listener to the "select all" checkbox
document.getElementById("select-all").addEventListener("change", function () {
  const checkboxes = document.querySelectorAll(
    ".dt-checkboxes.form-check-input"
  );
  checkboxes.forEach((checkbox) => {
    checkbox.checked = this.checked;
  });
});

// Add an event listener to each individual checkbox
document
  .querySelectorAll(".dt-checkboxes.form-check-input")
  .forEach((checkbox) => {
    checkbox.addEventListener("change", updateSelectAllState);
  });

updateSelectAllState();
