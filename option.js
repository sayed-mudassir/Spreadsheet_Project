const activeCellElement = document.querySelector(".selected-cell")
const form = document.getElementById("options-form")
const exp = document.getElementById("expression")
let selectedcell = null;
const state = {};
const defaultState = {
    innertext : "",
    isBold : false,
    align : "left",
    isUnderline : false,
    isItalic : false,
    fontSize : 16,
    fontFaimly : "Sans Sherif",
    textColor : "#000000",
    backgroundColor : "#ffffff"
}
function applyCellInfoToForm(){
    if(state[selectedcell.id]){
        const data = state[selectedcell.id];
        for(let key in data){
            if(form[key].type === "checkbox"){
                form[key].checked = data[key];
            }
            else{
                form[key].value = data[key];
            }
        }
    }
    else{
        form.reset();
    }
}
function onChangeInnerText(e){
    if(state[selectedcell.id]){
        state[selectedcell.id].innerText = selectedcell.innerText;
    }
    else{
        state[selectedcell.id] = {...defaultState,innerText: selectedcell.innerText};
    }
}

function onFocusCell(e){
    if(selectedcell){
        selectedcell.classList.remove("active-cell");
    }
    selectedcell = e.target;
    activeCellElement.innerText = selectedcell.id;
    selectedcell.classList.add("active-cell");
    applyCellInfoToForm();
}
function applyStylesToSelectedCell(styles){
    selectedcell.style.fontFamily = styles.fontFaimly;
    selectedcell.style.fontSize = styles.fontSize + "px";
    selectedcell.style.fontWeight = styles.isBold ? "bold" : "normal";
    selectedcell.style.fontStyle = styles.isItalic ? "italic" : "normal";
    selectedcell.style.textDecoration = styles.isUnderline ? "underline" : "normal";
    selectedcell.style.textAlign = styles.align;
    selectedcell.style.color = styles.textColor;
    selectedcell.style.backgroundColor = styles.backgroundColor;
}
form.addEventListener("change",(e)=>{
    if(!selectedcell){
        alert("plese select a cell");
        form.reset();
        return;
    }
    const formData = {
        fontFaimly : form["fontFaimly"].value,
        fontSize : form["fontSize"].value,
        isBold : form["isBold"].checked,
        isItalic : form["isItalic"].checked,
        isUnderline : form["isUnderline"].checked,
        align : form["align"].value,
        textColor:form["textColor"].value,
        backgroundColor : form["backgroundColor"].value
    };
    state[selectedcell.id] = {...formData,innerText: selectedcell.innerText}; 
    applyStylesToSelectedCell(formData);
});

exp.addEventListener("keyup", (e)=>{
    if(e.code === "Enter" && selectedcell){
        let expression = exp.innerText;
        let result = eval(`${exp.value}`);
        selectedcell.innerText = result;
    }
})