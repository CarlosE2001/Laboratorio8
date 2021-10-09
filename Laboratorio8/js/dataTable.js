class DataTable {
    constructor(dataOrigin, context) {
        this.dataOrigin = dataOrigin;
        this.context = context;
    }
    fillContext() {
        fetch(this.dataOrigin)
            .then(response => {
                return response.json();
            })
            .then(data => {

                let table = document.querySelector("#mainTable");
                let tr = document.createElement("tr");
                console.log(data[0]);
                for (const key in data[0]) {
                    let th = document.createElement("th");
                    let text = document.createTextNode(key);
                    th.appendChild(text);
                    tr.appendChild(th);
                }
                table.appendChild(tr)
                for (const object of data) {
                    let tr = document.createElement("tr");
                    for (const key in object) {
                        let td = document.createElement("td");
                        let text = document.createTextNode(object[key]);
                        td.appendChild(text);
                        tr.appendChild(td);
                    }
                    table.appendChild(tr);
                }
                table.classList.add("table");
                document.querySelector("#ProductsContext").appendChild(table);
            })
            .catch(error => {
                console.log(error);
            })
    }
}