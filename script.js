const headRow = document.getElementById("head-row");
const sno = document.getElementById("sno");
const body = document.getElementById("body");
const row = 100, columns = 26;
for(let i = 1; i<=columns; i++){
    const headCell = document.createElement("div");
    if(i>0){
    headCell.className = "col-head";
    headCell.innerText = String.fromCharCode(i+64); // "A" => 65  
    }
    headRow.appendChild(headCell);
}
for(let i = 0; i<row;i++){
    const snoCell = document.createElement("div");
    snoCell.innerText = i+1;
    snoCell.className = "sno-cell";
    sno.appendChild(snoCell);
}

for(let i = 1; i<=row; i++){
    const row = document.createElement("div");
    row.className = "row"
    for(let j = 1; j<=columns;j++){
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.contentEditable = true;
        cell.id = `${String.fromCharCode(j+64)}${i}`;
        cell.addEventListener("input",onChangeInnerText)
        cell.addEventListener("focus",onFocusCell);
        row.appendChild(cell);
    }
    body.appendChild(row);
}