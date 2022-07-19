// List the current selection in each container
const moduleSelection = {
  "credit-modules": [],
  "attempt-modules": [],
  "planning-modules": [],
};

containers.forEach((container) => {
  container.addEventListener("dragend", () => {
    const currentContainer = container.id; // detecting which container dragged to
    const latestContainer = container.outerText.split("\n"); // outputing all the current content is the latest modified container

    // Update each container with the latest draggables
    for (let title of Object.keys(moduleSelection)) {
      if (title == currentContainer) {
        moduleSelection[title] = latestContainer;
      }
    }
  });

  container.addEventListener("dragover", () => {
    const draggable = document.querySelector(".dragging").textContent;
    // Search if the draggable exists in other containers
    for (const [title, content] of Object.entries(moduleSelection)) {
      if (content.includes(draggable)) {
        // Remove old draggable entries
        content.splice(content.indexOf(draggable), 1);
      }
    }
  });
});

/** Triggers when button is clicked */
function recommendation() {
  console.log(moduleSelection);
}
