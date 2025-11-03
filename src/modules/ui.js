/**
 * ui.js
 * UI interaction module for Capiche task management application
 * Handles sidebar navigation and view switching
 */

// ============================================
// DOM Element References
// ============================================

const sidebar = document.querySelector(".sidebar");
const navItems = document.querySelectorAll(".nav-item");
const addTaskWrapper = document.querySelector(".add-task-wrapper");
const workspaceTitle = document.querySelector(".workspace__title");
const taskList = document.getElementById("taskList");

// ============================================
// Navigation Views Configuration
// ============================================

const NAV_VIEWS = {
  HOME: "Home",
  TODAY: "Today",
  THIS_WEEK: "This Week",
};

// ============================================
// Event Listeners Setup
// ============================================

/**
 * Initialize navigation event listeners
 * Attaches click handlers to all navigation items
 */
function initializeNavigation() {
  navItems.forEach((navItem) => {
    navItem.addEventListener("click", handleNavItemClick);
  });
}

// ============================================
// Event Handlers
// ============================================

/**
 * Handle navigation item click
 * Updates active state and shows/hides add task button
 * @param {Event} event - Click event object
 */
function handleNavItemClick(event) {
  const clickedItem = event.currentTarget;
  const viewName = getNavItemLabel(clickedItem);

  // Update active navigation item
  setActiveNavItem(clickedItem);

  // Update view-specific UI
  updateViewUI(viewName);
}

// ============================================
// UI Update Functions
// ============================================

/**
 * Set the active navigation item
 * Removes active class from all items and adds to clicked item
 * @param {HTMLElement} activeItem - The navigation item to activate
 */
function setActiveNavItem(activeItem) {
  // Remove active state from all nav items
  const activeNavItems = sidebar.querySelectorAll(".nav-item--active");
  activeNavItems.forEach((item) => {
    item.classList.remove("nav-item--active");
  });

  // Add active state to clicked item
  activeItem.classList.add("nav-item--active");
}

/**
 * Update UI elements based on selected view
 * Shows add task button only for Home view
 * @param {string} viewName - Name of the selected view
 */
function updateViewUI(viewName) {
  // Show add task button only in Home view
  if (viewName === NAV_VIEWS.HOME) {
    showAddTaskButton();
  } else {
    hideAddTaskButton();
  }

  // Update workspace title (if needed in future)
  // workspaceTitle.textContent = viewName;
}

/**
 * Show the add task button
 */
function showAddTaskButton() {
  addTaskWrapper.style.display = "block";
}

/**
 * Hide the add task button
 */
function hideAddTaskButton() {
  addTaskWrapper.style.display = "none";
}

// ============================================
// Helper Functions
// ============================================

/**
 * Get the label text from a navigation item
 * @param {HTMLElement} navItem - Navigation item element
 * @returns {string} Label text of the navigation item
 */
function getNavItemLabel(navItem) {
  const labelElement = navItem.querySelector(".nav-item__label");
  return labelElement ? labelElement.textContent.trim() : "";
}

// ============================================
// Initialization
// ============================================

/**
 * Initialize the UI module when DOM is ready
 */
function init() {
  initializeNavigation();

  // Set initial state (Home view active by default)
  const homeNavItem = navItems[0];
  if (homeNavItem) {
    updateViewUI(NAV_VIEWS.HOME);
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// ============================================
// Public API (if module exports are needed)
// ============================================

// Uncomment if using ES6 modules:
// export { initializeNavigation, setActiveNavItem, updateViewUI };
