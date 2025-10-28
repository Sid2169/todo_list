// Get the first sidebar and its items for event handling
const sidebar = document.querySelector(".sidebar");
const sidebarItems = sidebar.querySelectorAll(".sidebar_item");

// Get the elements related to tasks and the workspace
const newTaskContainer = document.querySelector(".new-task");
const workspaceTitle = document.querySelector(".workspace_title");
const workspaceContent = document.getElementById("tasks");

// Attach event listeners to sidebar items
sidebarItems.forEach(item => {
    item.addEventListener("click", switchSidebarTab);
});

/**
 * Switch between sidebar tabs and update the view accordingly.
 * @param {Event} e - The event object from the click event.
 */
function switchSidebarTab(e) {
    // Remove 'active' class from all sidebar items
    sidebarItems.forEach(item => item.classList.remove("active"));

    // Add 'active' class to the clicked item
    const clickedItem = e.currentTarget;
    clickedItem.classList.add("active");

    // Update the task container based on the clicked tab
    const contentMap = {
        "Home": () => {
            newTaskContainer.classList.add("active");
        },
        "Today": () => {
            newTaskContainer.classList.remove("active");
        },
        "This Week": () => {
            newTaskContainer.classList.remove("active");
        }
    };

    // Call the corresponding function based on the tab clicked
    const updateContent = contentMap[clickedItem.innerText];
    if (updateContent) {
        updateContent();
    }
}
