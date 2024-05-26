const download = document.getElementById("download");
const upload = document.getElementById("upload");

// function updateFormAccordingTheUploadFile(state,Changedcell){
//     if(state[Changedcell.id]){
//         const data = state[Changedcell.id];
//         for(let i in data){
//             debugger;
//             if(i === "innerText" || i==="innertext") {
//                 continue;
//             }
//             else if(form[i].type === "checkbox"){
//                 form[i].checked = data[i];
//             }
//             else{
//                 form[i].value = data[i];
//             }
//         }
//     }
//     form.reset();
// } // this function is not working as per expection needed to be fixed 

download.addEventListener("click", ()=>{
    const blob = new Blob([JSON.stringify(state)],{type: "application/json"});
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.href = url;
    link.download = "spreedsheet.json";

    link.click();
});


function loadJson(fileData){
    
    for(let key in fileData){
        let Changedcell = document.getElementById(key);
        state[Changedcell.id] = fileData[key];
        Changedcell.innerText = fileData[key].innerText;
        Changedcell.style.fontFamily = fileData[key].fontFaimly;
        Changedcell.style.fontSize = fileData[key].fontSize + "px";
        Changedcell.style.fontWeight = fileData[key].isBold ? "bold" : "normal";
        Changedcell.style.fontStyle = fileData[key].isItalic ? "italic" : "normal";
        Changedcell.style.textDecoration = fileData[key].isUnderline ? "underline" : "normal";
        Changedcell.style.textAlign = fileData[key].align;
        Changedcell.style.color = fileData[key].textColor;
        Changedcell.style.backgroundColor = fileData[key].backgroundColor;
        // updateFormAccordingTheUploadFile(state, Changedcell);
    }
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
