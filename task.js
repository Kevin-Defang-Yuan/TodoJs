export class Task {
    constructor(desc, complete=false, id=null) {
        this.id = id;
        this.desc = desc;
        this.complete = complete;
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
    get_complete() {
        return this.complete; 
    }
    to_string() {
        let res = "{" + this.id + "}" + " {" + this.complete + "}" + " " + this.desc;
        return res; 
    }
}

export function convert_JSON_to_task(json) {
    let task = new Task(json["desc"], json["complete"], json["id"]);
    return task;
}