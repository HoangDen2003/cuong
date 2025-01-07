const menuItem = document.querySelector("ul.menu-inner");

menuItem.addEventListener("click", function (e) {
  const target = e.target.closest("li.menu-item");

  if (target) {
    // Find the parent menu item
    const parentMenuItem = target
      .closest("ul.menu-sub")
      ?.closest("li.menu-item");

    // Remove the "active" class from all menu items
    document.querySelectorAll("li.menu-item").forEach((item) => {
      item.classList.remove("active");
    });

    // Add the "active" class to the parent menu item if it exists
    if (parentMenuItem) {
      // Add the "active" class to the clicked menu item
      target.classList.add("active");

      parentMenuItem.classList.add("active");
      parentMenuItem.classList.add("open");
    }
  }
});
