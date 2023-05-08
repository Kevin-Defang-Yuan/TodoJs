import {Database} from './edatabase.js';
import {Task} from './task.js'; 

export async function refresh_tasklist() {
    let database = Database.getInstance(); 
    // Retrieve tasklist container
    let tasklist = document.querySelector('.tasklist');

    tasklist.innerHTML = null;
    let tasks = await database.get_all_tasks();

    tasks.forEach(function(task) {
        let new_task = create_task_div(task.id, task.desc, task.complete);
        // Load task into list
        tasklist.appendChild(new_task); 
    });
}

export function save_task(desc) {
    let database = Database.getInstance(); 
    let task_id = database.create_task(desc);
    return task_id; 
}

function create_task_div(id, desc, complete) {
    // Create new task div
    // Task Div
    let task = document.createElement('div');
    task.className = 'task';

    let desc_display = create_desc_div(id, desc);
    let check = create_check_div(id, complete);
    let edit = create_edit_div(id);
    let del = create_del_div(id);
    
    // Load children into parent div
    task.appendChild(desc_display);
    task.appendChild(check);
    task.appendChild(edit);
    task.appendChild(del);

    return task;
}

function create_desc_div(id, desc) {
    // Desc Div
    let desc_display = document.createElement('input');
    desc_display.type = 'text';
    desc_display.className = 'attr-desc';
    desc_display.id = 'desc_display-' + id;
    desc_display.value = desc;
    desc_display.disabled = true; 
    desc_display.addEventListener('keydown', (event) => {
        if (event.code === "Enter") {
            desc_display.disabled = true; 
            update_desc(desc_display);
        }
    });
    return desc_display;
}

function create_check_div(id, complete) {
    // Check Div along with checkbox
    let check = document.createElement('div');
    check.className = "check";
    let checkbox = document.createElement('input');
    checkbox.id = "checkbox-" + id;
    checkbox.className = "checkbox";
    checkbox.type = "checkbox";
    if (complete) {
        checkbox.checked = true;
    }
    checkbox.addEventListener('change', function() {
        checked(checkbox);
    });

    check.appendChild(checkbox);
    return check;
}

function create_edit_div(id) {
    // Edit Div
    let edit = document.createElement('button');
    edit.id = "edit-" + id;
    edit.className = "edit";
    edit.addEventListener('click', function() {
        set_editable(edit);
    });
    return edit;
}

function create_del_div(id) {
    // Delete Div, also add icon
    let icon = document.createElement('i');
    icon.className = "fa-solid fa-trash-can";

    let del = document.createElement('button');
    del.id = "delete-" + id;
    del.className = "delete"; 
    del.addEventListener('click', function() {
        remove_task(del);
    });

    del.appendChild(icon); 
    return del; 
}

function checked(checkbox) {
    const id = parse_id(checkbox.id);
    let database = Database.getInstance();
    database.update_complete(id);
    refresh_tasklist();
}

function set_editable(edit) {
    const id = parse_id(edit.id);
    // Look for the input div and set to enabled
    let desc_input = document.getElementById('desc_display-' + id);
    desc_input.disabled = false; 
}

function update_desc(desc_input) {
    const id = parse_id(desc_input.id);
    let database = Database.getInstance();
    database.update_desc(id, desc_input.value);
}

function remove_task(del) {
    // Get id
    const id = parse_id(del.id);

    // Delete task from database
    let database = Database.getInstance();
    database.delete_item(id);
    refresh_tasklist();
}

function parse_id(str) {
    const substrings = str.split('-');

    // Get last substring as that contains the id
    return substrings[1]; 
}

