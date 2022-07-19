/** The following code up to the function getDragAfterElement()
 * is from https://youtu.be/jfYWwQrtzzY
 */
const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
    // sort after each drag
    sortModule();
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientX);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

function sortModule() {
  let toSort = document.getElementById("all_modules").children;
  toSort = Array.prototype.slice.call(toSort, 0);
  toSort.sort((a, b) => {
    const aord = +a.id;
    const bord = +b.id;
    return aord - bord < 0 ? -1 : 1;
  });

  let parent = document.getElementById("all_modules");
  parent.innerHTML = "";
  for (let i = 0; i < toSort.length; i++) {
    parent.appendChild(toSort[i]);
  }
}

function getDragAfterElement(container, x) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = x - box.right - box.width / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

// End of cited code
