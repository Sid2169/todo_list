/**
 * Creates a task object with properties for managing task details.
 * @param {string} title - The title of the task.
 * @param {string} details - Additional details about the task.
 * @param {string} date - The due date for the task.
 * @param {string} priority - The priority level of the task.
 * @param {boolean} [completed=false] - The completion status of the task.
 * @returns {Object} The task object with methods to interact with its properties.
 */
function task(title, details, date, priority, completed = false) {
    return {
        title,
        details,
        date,
        priority,

        // Method to log task information
        getInfo: () => {
            console.log(`${title} - ${details} - ${date} - ${priority} - ${completed}`);
        },

        // Getter for completed property
        get completed() {
            return completed;
        },

        // Setter for completed property with validation
        set completed(value) {
            if (typeof value === 'boolean') {
                completed = value;
            }
        }
    };
}

// Export the task function for use in other modules
export { task };
