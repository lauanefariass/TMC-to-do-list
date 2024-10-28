const input = document.querySelector(".todo-input");
const input_edit = document.querySelector(".todo-input-edit");
const apply_btn = document.getElementById("apply-btn");
const edit_btn = document.getElementById("edit-btn");
const todo_items = document.querySelector(".todo-items");
let tasks = [];
let selectedId = null;

apply_btn.addEventListener("click", () => {
  let note_value = input.value.trim();
  if (note_value) {
    tasks.push({ name: note_value, id: Date.now() });
    input.value = "";
    showItems(tasks);
    bootstrap.Modal.getInstance(document.getElementById("exampleModal")).hide();
  } else {
    alert("Por favor, insira uma tarefa.");
  }
});


function showItems(data) {
  todo_items.innerHTML = data
    .map((item) => {
      return `<div class="todo-item">
                        <div class="todo-text">
                            <input type="checkbox" id="task-${item.id}" onchange="toggleText(this)">
                            <label for="task-${item.id}" class="my-text">${item.name}</label>
                        </div>
                        <div class="icons">
                            <img src="./image/pen.svg" alt="Edit" class="edit-icon" data-id="${item.id}" />
                            <img src="./image/trash-svgrepo-com 1.svg" alt="Delete" onclick="deleteTask(${item.id})" />
                        </div>
                    </div>`;
    })
    .join(" ");
}


todo_items.addEventListener("click", (event) => {
  if (event.target.classList.contains("edit-icon")) {
    const id = event.target.getAttribute("data-id");
    const item = tasks.find((task) => task.id === Number(id));
    if (item) {
      input_edit.value = item.name;
      selectedId = item.id;
     
      const editModal = new bootstrap.Modal(
        document.getElementById("editModal")
      );
      editModal.show();
    }
  }
});


edit_btn.addEventListener("click", () => {
  if (selectedId !== null) {
    SaveEdit();
  }
});

function deleteTask(id) {
  tasks = tasks.filter((item) => item.id !== id);
  showItems(tasks);
}


function SaveEdit() {
  tasks = tasks.map((item) => {
    if (item.id === selectedId) {
      return { ...item, name: input_edit.value.trim() };
    } else {
      return item;
    }
  });

  input_edit.value = ""; 
  selectedId = null; 
  showItems(tasks);
  bootstrap.Modal.getInstance(document.getElementById("editModal")).hide(); 
}


function toggleText(checkbox) {
  const label = checkbox.nextElementSibling;
  if (checkbox.checked) {
    label.classList.add("checked");
  } else {
    label.classList.remove("checked");
  }
}


showItems(tasks);
