

class Storage{
  constructor(){}
  static addToStorage(item){
    let items;
    if(localStorage.getItem("tasks") === null){
      items = [];
    }else{
      items = JSON.parse(localStorage.getItem("tasks"));
    }

    items.push(item);
    localStorage.setItem("tasks", JSON.stringify(items))
  }

  static getItemsStorage(){
    let items;
    if(localStorage.getItem("tasks") === null){
      items = [];
    }else{
      items = JSON.parse(localStorage.getItem("tasks"));
    }

    return items;
  }

  static updatedDataStorage(itemUpdated){
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    
    tasks.forEach((item, index) => {
      if(item.id === itemUpdated[index].id){
        item.taskName = itemUpdated[index].taskName;
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  static completeDataStorage(itemCompleted){
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    tasks.forEach((item, index) => {
      if(item.id === itemCompleted[index].id){
        item.isComplete = itemCompleted[index].isComplete;
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  static removeDataStorage(id){
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    tasks.forEach((item, index) => {
      if(item.id === id){
        tasks.splice(index,1);
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}


export default Storage;
