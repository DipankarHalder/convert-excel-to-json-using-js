let viewKeys = document.getElementById('datakeys');
let viewData = document.getElementById('allDatas');
let ExcelToJSON = function () {
    this.parseExcel = function (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let data = e.target.result;
            let workbook = XLSX.read(data, { type: 'binary' });
            workbook.SheetNames.forEach(function (sheetName) {
                let XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                let json_object = JSON.stringify(XL_row_object);
                let datas = JSON.parse(json_object);
                let col = [];
                let table = document.createElement("table");
                table.className = "table table-striped";
                let tr = table.insertRow(-1);
                let thead = document.createElement("thead");
                let tbody = document.createElement("tbody");
                for (let i = 0; i < datas.length; i++) {
                    for (let key in datas[i]) {
                        if (col.indexOf(key) === -1) {
                            col.push(key);
                        }
                    }
                }
                for (let i = 0; i < col.length; i++) {
                    let th = document.createElement("th");
                    th.innerHTML = col[i];
                    tr.appendChild(th);
                    thead.appendChild(tr);
                }
                table.appendChild(thead);
                for (let i = 0; i < datas.length; i++) {
                    tr = table.insertRow(-1);
                    for (let j = 0; j < col.length; j++) {
                        let tabCell = tr.insertCell(-1);
                        tabCell.innerHTML = datas[i][col[j]];
                        tbody.appendChild(tr);
                    }
                }
                table.appendChild(tbody);
                let divContainer = document.getElementById("showData");
                divContainer.innerHTML = "";
                divContainer.appendChild(table);
            })
        };
        reader.onerror = function (ex) {
            console.log(ex);
        };
        reader.readAsBinaryString(file);
    };
};
function handleFileSelect(evt) {
    let files = evt.target.files;
    let xl2json = new ExcelToJSON();
    xl2json.parseExcel(files[0]);
}
document.getElementById('uploadExcel').addEventListener('change', handleFileSelect, false);