const input = document.querySelector(".todo-input");
const addButton = document.querySelector(".add-button");
const todosHtml = document.querySelector(".todos");
const emptyImage = document.querySelector(".empty-image");
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
const deleteAllButton = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");
let filter = '';

showTodos();

function getTodoHtml(todo, index) {
  if (filter && filter !== todo.status) {
    return '';
  }
  let checked = todo.status === "completed" ? "checked" : "";
  return `
    <li class="todo">
      <label for="${index}">
        <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
        <span class="${checked}">${todo.name}</span>
      </label>
      <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i style="font-size:24px" class="fa">&#xf057;</i></button>
    </li>
  `;
}

function showTodos() {
  if (todosJson.length === 0) {
    todosHtml.innerHTML = '';
    if (emptyImage) emptyImage.style.display = 'block';
  } else {
    todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
    if (emptyImage) emptyImage.style.display = 'none';
  }
}

function addTodo(todo) {
  input.value = "";
  todosJson.unshift({ name: todo, status: "pending" });
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
}

input.addEventListener("keyup", (e) => {
  let todo = input.value.trim();
  if (todo && e.key === "Enter") {
    addTodo(todo);
  }
});

addButton.addEventListener("click", () => {
  let todo = input.value.trim();
  if (todo) {
    addTodo(todo);
  }
});

function updateStatus(checkbox) {
  const todoElement = checkbox.parentNode;
  const todoName = todoElement.querySelector('span');
  if (checkbox.checked) {
    todoName.classList.add('checked');
    const todoIndex = Array.from(todosHtml.children).indexOf(todoElement);
    todosJson[todoIndex].status = 'completed'; // Change 'complete' to 'completed'
  } else {
    todoName.classList.remove('checked');
    const todoIndex = Array.from(todosHtml.children).indexOf(todoElement);
    todosJson[todoIndex].status = 'pending';
  }
  localStorage.setItem('todos', JSON.stringify(todosJson));
}

function remove(button) {
  const index = button.dataset.index;
  todosJson.splice(index, 1);
  showTodos();
  localStorage.setItem("todos", JSON.stringify(todosJson));
}

filters.forEach(function (el) {
  el.addEventListener("click", (e) => {
    filters.forEach(tag => tag.classList.remove('active'));
    el.classList.add('active');
    filter = e.target.dataset.filter || '';
    showTodos();
  });
});

deleteAllButton.addEventListener("click", () => {
  todosJson = [];
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
});