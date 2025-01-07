document.addEventListener('DOMContentLoaded', function() {
    const customSelect = document.getElementById('language-select');
    const selected = customSelect.querySelector('.select-selected');
    const items = customSelect.querySelector('.select-items');
    const selectElement = document.getElementById('language');

    selected.addEventListener('click', function() {
        items.style.display = items.style.display === 'block' ? 'none' : 'block';
    });

    items.addEventListener('click', function(event) {
        const target = event.target.closest('div');
        if (target) {
            const value = target.getAttribute('data-value');
            selected.innerHTML = target.innerHTML;
            selectElement.value = value;
            items.style.display = 'none';
        }
    });

    document.addEventListener('click', function(event) {
        if (!customSelect.contains(event.target)) {
            items.style.display = 'none';
        }
    });
});