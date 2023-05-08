import {Task} from './task.js'; 

class Database {
    constructor() {
        this.data = [];
        this.index = 0; 
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
        this.data.push(task);
    }

    update_desc(id, new_desc) {
        let index = this.find_item_with_id(id);
        if (index >= 0) {
            this.data[index].set_desc(new_desc); 
        }

    }

    update_complete(id) {
        let index = this.find_item_with_id(id);
        if (index >= 0) {
            this.data[index].toggle_status(); 
        }

    }

    delete_item(id) {
        let index = this.find_item_with_id(id);
        if (index >= 0) {
            this.data.splice(index, 1);
        }
    }

    find_item_with_id(id) {
        for (let i = 0; i < this.get_size(); i++) {
            if (this.data[i].get_id() == id) {
                return i;
            }
        }
        return -1; 
    }

    get_size() {
        return this.data.length; 
    }

    print_data() {
        for (let i = 0; i < this.get_size(); i++) {
            console.log(this.data[i].to_string());
        }
    }

    get_all_tasks() {
        //Json
        let res = []
        for (let i = 0; i < this.get_size(); i++) {
            res.push({
                "Id": this.data[i].get_id(),
                "Description": this.data[i].get_desc(),
                "Complete": this.data[i].complete 
            });
        }
        return res; 
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