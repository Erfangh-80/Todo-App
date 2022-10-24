import ItemController from "./itemctrl.js";
import UIController from "./uictrl.js";
import Storage from "./storage.js";

class AppController {
  constructor() {
    this.loadAllEvent();
    const ui = new UIController();
  }

  loadAllEvent() {
    const uiCtrl = new UIController();
    const itemCtrl = new ItemController();
    const selectors = new UIController().selectors;

    
    document.querySelector(selectors.addBtn).addEventListener("click", (e) => {
      e.preventDefault();
      
      const taskInput = uiCtrl.getInputTask();
      if (taskInput.value === "") {
        alert("Please fill in the field");
        return;
      }
      
      let generateId = ItemController.generateId();
      let id = generateId.next().value;
      let item = new ItemController(id, taskInput.value);
      itemCtrl.addItemData(item);
      const items = itemCtrl.getItemData();
      uiCtrl.addTask(items);
      Storage.addToStorage(item);
      uiCtrl.clearInput();
    });

    document.querySelector(selectors.taskList).addEventListener("click", (e) => {
      
      if(!e.target.classList.contains("check")){return};

      const item = e.target.parentElement.parentElement;
      uiCtrl.completeTaskItem(item);
      uiCtrl.completeStatusTask(item);
      const items = itemCtrl.getItemData();
      Storage.completeDataStorage(items);
    });

    document.querySelector(selectors.taskList).addEventListener("click", (e) => {
      
      if(!e.target.classList.contains("edit")){return}
      let input = e.target.parentElement.parentElement.children[0].children[0];
      let btnEdit = e.target.parentElement.parentElement.children[1].children[1];
      
      let item = uiCtrl.editTask(input,btnEdit);
      uiCtrl.setEditData(item);
      const items = itemCtrl.getItemData();
      Storage.updatedDataStorage(items);


    });

    document.querySelector(selectors.taskList).addEventListener("click", (e) => {

      if(!e.target.classList.contains("delete")){return}
      let inputTask = e.target.parentElement.parentElement.children[0].children[0];
      let itemTask = e.target.parentElement.parentElement;
      let taskId = inputTask.id.split("-");
      uiCtrl.removeTask(itemTask);
      uiCtrl.setRemoveData(inputTask);
      Storage.removeDataStorage(parseInt(taskId[1]));
    });

    document.querySelector(selectors.sortTask).addEventListener("click", (e) => {
      let sortTasks = e.target.value;
      uiCtrl.sortTasksTodos(sortTasks);
    });

    document.querySelector(selectors.searchTask).addEventListener("keyup", (e) => {
      let serchInputValue = e.target.value.toLowerCase();
      uiCtrl.filterTasks(serchInputValue);
    });
  }
}

export default AppController;
