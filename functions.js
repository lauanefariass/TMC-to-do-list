import { showItems } from "./index.js";

function deleteItem(id, tasks) {
  let filteredData = tasks.filter((item) => item.id != id);
  showItems(filteredData);
  return filteredData;
}

function edit(id, tasks) {
  // Added tasks as a parameter
  let item = tasks.find((item) => item.id === id);
  if (item) {
    // Check if item exists
    input_edit.value = item.name;
    selectedId = item.id;
  }
}

function SaveEdit(tasks, selectedId) {
  let editedTasks = tasks.map((item) => {
    if (item.id === selectedId) {
    
      return { ...item, name: input_edit.value }; 
    } else {
      return item;
    }
  });

  showItems(editedTasks);
}

export { edit, deleteItem, SaveEdit };
