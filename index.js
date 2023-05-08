import { save_task, refresh_tasklist } from './gui_utils.js';
// import {Database} from './database.js';

// let database = Database.getInstance();
// database.create_task("Hello World");
// database.update_complete(0);

document.addEventListener('DOMContentLoaded', function() {
    let addButton = document.querySelector('.add');
    addButton.addEventListener('click', add_task);
    refresh_tasklist();
});


function add_task() {
    // Retrieve value and save new task
    let input = document.getElementById('desc');
    let desc = input.value;
    let id = save_task(desc);

    // Refresh tasklist with new tasks
    refresh_tasklist();
}
