import ItemController from "./itemctrl";

class UIController {
  constructor() {
    this.selectors = {
      addBtn: "#add-Task",
      taskInput: "#new-TaskList",
      taskList: "#Tasks",
      task: ".task",
      completeBtn: ".check",
      editBtn: ".edit",
      deleteBtn: ".delete",
      sortTask: ".sort-Tasks",
      searchTask: "#search"
    };
    let items = new ItemController().getItemData();
    this.addTask(items);
  }

  getInputTask() {
    let taskName = document.querySelector(this.selectors.taskInput);
    return taskName;
  }

  addTask(items) {
    let html = "";
    items.map((item) => {
      html += `
      <div class="task ${item.isComplete === false ? "" : "complete"}">
        <div class="content">
          <input id="Task-${item.id}" type="text" class="text" value="${item.taskName}" readonly>
        </div>
        <div class="actions">
          <i class="fas fa-check check"></i>
          <i class="fas fa-edit edit"></i>
          <i class="fas fa-trash delete"></i>
        </div>
      </div>
      `;
      document.querySelector(this.selectors.taskList).innerHTML = html;
    });
  }

  clearInput() {
    document.querySelector(this.selectors.taskInput).value = "";
  }

  completeTaskItem(item) {
    item.classList.toggle("complete");
  }

  completeStatusTask(item) {
    let itemId = item.children[0].children[0].id.split("-");
    let items = new ItemController().getItemData();
    let id = parseInt(itemId[1]);
    items.map((item) => {
      if (item.id === id) {
        item.isComplete === false
          ? (item.isComplete = true)
          : (item.isComplete = false);
      }
    });
  }

  editTask(input, editBtn) {
    let completeBtn = document.querySelectorAll(this.selectors.completeBtn);

    if (editBtn.classList.contains("fa-edit")) {
      input.removeAttribute("readonly");
      editBtn.classList.replace("fa-edit", "fa-save");
      completeBtn.forEach((item) => {
        item.style.display = "none";
      });
    } else {
      input.setAttribute("readonly", "readonly");
      editBtn.classList.replace("fa-save", "fa-edit");
      completeBtn.forEach((item) => {
        item.style.display = "block";
      });
    }
    return input;
  }

  setEditData(input) {
    let itemId = input.id.split("-");
    let id = parseInt(itemId[1]);
    let items = new ItemController().getItemData();
    items.map((item) => {
      if (item.id === id) {
        item.taskName = input.value;
      }
    });
  }

  removeTask(item) {
    item.remove();
  }

  setRemoveData(input) {
    let itemId = input.id.split("-");
    let id = parseInt(itemId[1]);
    let items = new ItemController().getItemData();

    items.splice(items.indexOf(id), 1);
  }

  sortTasksTodos(value) {
    
    let tasks = document.querySelectorAll(this.selectors.task);
    tasks.forEach((task) => {
      switch (value) {
        case "all":
          task.style.display = "flex";
          break;

        case "completed":
          if (task.classList.contains("complete")) {
            task.style.display = "flex";
          }else{
            task.style.display = "none";
          }
          break;

        case "uncompleted":
          if (task.classList.contains("complete")) {
            task.style.display = "none";
          }else{
            task.style.display = "flex";
          }
          break;
      }
    });
  }

  filterTasks(valueSearch){
    
    let tasks = document.querySelectorAll(this.selectors.task);
    tasks.forEach((item => {
      let task = item.children[0].children[0].value.toLocaleLowerCase();
      if(task.indexOf(valueSearch) != -1){
        item.style.display = "flex";
      }else{
        item.style.display = "none";
      }
    }));
  }
}

export default UIController;
