import Storage from "./storage.js";
let data = Storage.getItemsStorage();

class ItemController{
  constructor(id, taskName){
    this.id = id;
    this.taskName = taskName;
    this.isComplete = false;
  }

  static *generateId(){
    let id = data.length > 0 ? data[data.length - 1].id : 0;

    while (true) {
      id++
      yield id;
    }
  }

  addItemData(item){
    data.push(item)
  }

  getItemData(){
    return data;
  }
}


export default ItemController;
