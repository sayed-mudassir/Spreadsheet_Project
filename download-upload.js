const download = document.getElementById("download");
const upload = document.getElementById("upload");



download.addEventListener("click", ()=>{
    const blob = new Blob([JSON.stringify(state)],{type: "application/json"});
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.href = url;
    link.download = "spreedsheet".json;

    link.click();
});

function updateCellInfoToForm(){
    for(let key in state){
        const data = state[key];
        for(let key in data){
            if(form[key].type === "checkbox"){
                form[key].checked = data[key];
            }
            else{
                form[key].value = data[key];
            }
        }
    }
    // else{
    //     form.reset();
    // }
}

function loadJson(fileData){
     // Clear existing data
    for(let key in fileData){
        let Changedcell = document.getElementById(key);
        Changedcell.innerText = fileData[key].innerText;
        Changedcell.style.fontFamily = fileData[key].fontFaimly;
        Changedcell.style.fontSize = fileData[key].fontSize + "px";
        Changedcell.style.fontWeight = fileData[key].isBold ? "bold" : "normal";
        Changedcell.style.fontStyle = fileData[key].isItalic ? "italic" : "normal";
        Changedcell.style.textDecoration = fileData[key].isUnderline ? "underline" : "normal";
        Changedcell.style.textAlign = fileData[key].align;
        Changedcell.style.color = fileData[key].textColor;
        Changedcell.style.backgroundColor = fileData[key].backgroundColor;
        state[Changedcell.id] = fileData[key];
    }
    // for(let k in state){
    //     if(state[k]){
    //         const data = state[k];
    //         for(let key in data){
    //             debugger;
    //             if(form[key].type === "checkbox"){
    //                 form[key].checked = data[key];
    //             }
    //             else{
    //                 form[key].value = data[key];
    //             }
    //         }
    //     }
    //     else{
    //         form.reset();
    //     }
    // }
    
 }


upload.addEventListener("change", (e)=>{
    let file = e.target.files[0];
    if(file.type != "application/json"){
        alert("please upload json file only");
        return;
    }
    let fileReader = new FileReader();
    fileReader.onload = function (e){
        let fileData = JSON.parse(e.target.result);
        loadJson(fileData);
    }

    fileReader.readAsText(file);
});
