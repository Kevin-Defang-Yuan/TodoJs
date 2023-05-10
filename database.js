class Database {
    constructor() {
        this.index_key = "Indexes";
        if (this.key_exists(this.index_key) === false) {
            this.init_index_map();
        }
    }

    // Public
    add_item(key, object) {      
        if (this.key_exists(key) === false) {
            this.init_key(key);
        }

        if (this.index_exists(key) === false) {
            this.new_index(key);
        }
        let json_val = this.get_json(key);

        // Update object id
        const id = this.get_index(key);
        object.id = id; 
        json_val.push(JSON.stringify(object));
        this.save(key, json_val);
        this.update_index(key); 
        return id; 
    }

    //Public
    delete_item(key, id) {
        let json_list = this.get_json_list(key);
        json_list.forEach((json, i, array) => {
            if (json["id"] == id) {
                array.splice(i, 1);
            } 
        });

        this.save_list(key, json_list);
    }

    //Public
    update(key, id, attr, new_value) {
        let json_list = this.get_json_list(key);
        json_list.forEach((json) => {
            if (json["id"] == id) {
                json[attr] = new_value;
            }
        });
        this.save_list(key, json_list);
    }

    init_index_map() {
        window.localStorage.setItem(this.index_key, JSON.stringify({}));
    }

    

    new_index(key) {
        let json_val = this.get_json(this.index_key);
        json_val[key] = 0;
        this.save(this.index_key, json_val);
    }

    index_exists(key) {
        let json_val = this.get_json(this.index_key);
        if (Object.keys(json_val).length === 0) {
            return false;
        }

        if (json_val.hasOwnProperty(key)) {
            return true;
        }
        return false;
    }

    get_index(key) {
        let json_val = this.get_json(this.index_key);
        return json_val[key];
    }

    update_index(key) {
        let json_val = this.get_json(this.index_key);
        json_val[key]++; 
        this.save(this.index_key, json_val);
    }

    init_key(key) {
        window.localStorage.setItem(key, JSON.stringify([]));
    }

    key_exists(key) {
        if (window.localStorage.getItem(key) === null) {
            return false;
        }
        return true;
    }

    get_value(key, cb) {
        let val = this.get_json(key);
        let json_list = val.map((json) => {
            return JSON.parse(json);
        })
        let object_list = json_list.map(cb);
        return object_list;
    } 

    get_json(key) {
        let data = JSON.parse(window.localStorage.getItem(key));
        return data;
    }

    get_json_list(key) {
        let data = JSON.parse(window.localStorage.getItem(key));

        let data_list = data.map((json) => {
            return JSON.parse(json);
        });
        return data_list;
    }

    save(key, data) {
        window.localStorage.setItem(key, JSON.stringify(data));
    }

    save_list(key, json_list) {
        let string_list = json_list.map((json) => {
            return JSON.stringify(json);
        });
        this.save(key, string_list);
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