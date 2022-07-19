// List the current selection in each container
const moduleSelection = {
  "credit-modules": [],
  "attempt-modules": [],
  "planning-modules": [],
};

containers.forEach((container) => {
  container.addEventListener("dragend", () => {
    // detecting which container dragged to
    const currentContainer = container.id;
    // outputing all the current content is the latest modified container
    const latestContainer = container.outerText.split("\n");

    // Update each container with the latest draggables
    for (let title of Object.keys(moduleSelection)) {
      if (title == currentContainer) {
        moduleSelection[title] = latestContainer;
      }
    }
  });

  container.addEventListener("dragover", () => {
    // All the current modules on the left list
    // const all_modules = document.getElementById("all_modules").outerText.split("\n");
    // the current draggable's content
    const draggable = document.querySelector(".dragging").textContent;

    // loop through both index and value just in case
    for (const [title, content] of Object.entries(moduleSelection)) {
      // Search if the draggable exists in other containers
      // Search if the draggable exists in all_modules list
      if (content.includes(draggable)) {
        // Remove old draggable entries
        content.splice(content.indexOf(draggable), 1);
      }
    }
  });
});

/** Triggers when button is clicked */
function recommendation() {
  // output the current selection in the console
  console.log(moduleSelection);
  const suggestion = document.getElementById("suggestion-message");

  let length = 0;
  for (let title of Object.keys(moduleSelection)) {
    length += moduleSelection[title].length;
  }
  // output the total selection modules number in the suggestion box
  suggestion.innerHTML = "You have selected " + length + " modules";
}



