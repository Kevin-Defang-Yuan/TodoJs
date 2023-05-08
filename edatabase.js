import {Task} from './task.js'; 

class Database {
    constructor() {
        if (window.localStorage.getItem("tasks") === null) {
            window.localStorage.setItem("tasks", JSON.stringify([])); 
        }

        this.index = 0; 
    }

    update_storage(tasks) {
        window.localStorage.setItem("tasks", JSON.stringify(tasks)); 
    }

    get_data() {
        let data = window.localStorage.getItem("tasks");
        return JSON.parse(data);
    }

    create_task(desc) {
        let task = new Task(this.index, desc);
        this.add_item(task);
        this.update_index(); 

        return task.get_id();

    }

    update_index() {
        this.index++; 
    }

    add_item(task) {
        let tasks = this.get_data();
        tasks.push(task);
        window.localStorage.setItem("tasks", JSON.stringify(tasks));

    }

    update_desc(id, new_desc) {
        let tasks = this.get_data(); 
        let index = this.find_item_with_id(id);
        if (index >= 0) {
            tasks[index].desc = new_desc; 
        }

        this.update_storage(tasks);
    }

    update_complete(id) {
        let tasks = this.get_data(); 
        let index = this.find_item_with_id(id);
        if (index >= 0) {
            tasks[index].complete = !tasks[index].complete; 
        }
        this.update_storage(tasks);


    }

    delete_item(id) {
        let tasks = this.get_data(); 
        let index = this.find_item_with_id(id);
        console.log(index);
        if (index >= 0) {
            tasks.splice(index, 1);
        }
        this.update_storage(tasks);
    }

    find_item_with_id(id) {
        let tasks = this.get_data(); 
        for (let i = 0; i < this.get_size(); i++) {
            if (tasks[i].id == id) {
                return i;
            }
        }
        return -1; 
    }

    get_size() {
        return this.get_data().length; 
    }

    print_data() {
        for (let i = 0; i < this.get_size(); i++) {
            console.log(this.data[i].to_string());
        }
    }

    get_all_tasks() {
        //Json
        return this.get_data();

    }
}

Database.instance = null;

Database.getInstance = function() {
    if (!Database.instance) {
        Database.instance = new Database();
    }
    return Database.instance; 
};

export {Database};