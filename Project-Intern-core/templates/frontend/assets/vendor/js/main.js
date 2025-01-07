document.addEventListener('DOMContentLoaded', function () {
  // Get all the dropdown items
  const updateLanguage = document.getElementById('update-language');
  const updateCategory = document.getElementById('update-category');
  const updateStatus = document.getElementById('update-status');
  const deleteRecord = document.getElementById('delete-record');

  // Get all the modals
  const languageDialog = document.getElementById('edit-language-dialog');
  const categoryDialog = document.getElementById('edit-category-dialog');
  const statusDialog = document.getElementById('edit-status-dialog');
  const deleteDialog = document.getElementById('delete-dialog');

  // Function to show modal
  function showModal(modal) {
      modal.style.display = 'block';
  }

  // Function to hide modal
  function hideModal(modal) {
      modal.style.display = 'none';
  }

  // Event listeners for the dropdown items
  updateLanguage.addEventListener('click', function () {
      showModal(languageDialog);
  });

  updateCategory.addEventListener('click', function () {
      showModal(categoryDialog);
  });

  updateStatus.addEventListener('click', function () {
      showModal(statusDialog);
  });

  deleteRecord.addEventListener('click', function () {
    showModal(deleteDialog);
  });

  // Close modal when clicking on the close icon
  document.querySelectorAll('.text-close').forEach(function (closeBtn) {
      closeBtn.addEventListener('click', function () {
          const modal = this.closest('.modal');
          hideModal(modal);
      });
  });

  // Close modal when clicking outside the modal content
  window.addEventListener('click', function (event) {
      if (event.target.classList.contains('modal')) {
          hideModal(event.target);
      }
  });

  // Event listeners for the Cancel buttons
  document.querySelectorAll('.btn_cancel').forEach(function (cancelBtn) {
      cancelBtn.addEventListener('click', function (event) {
          event.preventDefault();
          const modal = this.closest('.modal');
          hideModal(modal);
      });
  });

  // Event listeners for the Submit buttons
  document.querySelectorAll('.btn_ok').forEach(function (submitBtn) {
      submitBtn.addEventListener('click', function (event) {
          event.preventDefault();
          const modal = this.closest('.modal');
          alert('Successfull !!!');
          hideModal(modal);
      });
  });
});

function showModal() {
  document.getElementById('delete-dialog').style.display = 'block';
}

window.onclick = function (event) {
  if (event.target == document.getElementById('delete-dialog')) {
      document.getElementById('delete-dialog').style.display = 'none';
  }
}