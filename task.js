export class Task {
    constructor(id, desc) {
        this.id = id;
        this.desc = desc;
        this.complete = false;
    }

    to_JSON() {
        return JSON.stringify(this); 
    }

    set_desc(d) {
        this.desc = d;
    }
    toggle_status() {
        this.complete = !this.complete; 
    }
    get_id() {
        return this.id;
    }
    get_desc() {
        return this.desc;
    }
    get_completed() {
        return this.complete; 
    }
    to_string() {
        let res = "{" + this.id + "}" + " {" + this.complete + "}" + " " + this.desc;
        return res; 
    }
}

export function JSON_to_object(json) {
    let task = new Task(json.id, json.desc);
    task.complete = json.complete;
    return task;
}