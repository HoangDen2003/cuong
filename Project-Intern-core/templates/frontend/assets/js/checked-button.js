document.addEventListener('DOMContentLoaded', (event) => {
    const actionButton = document.querySelector('.btn.btn-secondary.item');
    const checkboxes = document.querySelectorAll('.dt-checkboxes.form-check-input');
    const selectAllCheckbox = document.querySelector('#select-all');

    function toggleActionButton() {
        const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
        actionButton.disabled = !isChecked;
        if (isChecked) {
            actionButton.classList.remove('disabled');
        } else {
            actionButton.classList.add('disabled');
        }
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', toggleActionButton);
    });

    selectAllCheckbox.addEventListener('change', (event) => {
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
        toggleActionButton();
    });

    // Initialize button state on page load
    toggleActionButton();
});