let positionSelect = ''
let positionInsert = ''

function blurContentAnnotation() {
    if (window.getSelection().rangeCount > 0) {
        positionInsert = window.getSelection().getRangeAt(0)
    }
}

function createSelectSpan(contenu) {
    const span = document.createElement('span')
    span.classList.add("span-annotation")
    span.contentEditable = "true";
    span.setAttribute("type", "STRING")
    span.setAttribute("labelid", "123456789")
    span.onmouseup = function (event) {
        expandSelection(event, this);
    }
    span.onclick = function () {
        spanClick(this);
    }
    span.innerHTML = '<div class="ctn-btn-label-annotation"><button contenteditable="false" class="btn-label-annotation" onmouseup="typeSelectLabelAnnotation(this,event)"><div class="icon icon-type-input"></div></button><button contenteditable="false" class="btn-label-annotation btn-delet-label-annotation" onmouseup="deselectAnnotation(this,event)"><div class="icon icon-select-cancel"></div></button></div>' + contenu
    return span;
}

function insertAnnotation() {
    if (positionInsert === '') {
        // sans cursor ajouter a la fin 
        const div = document.getElementById('divContentAnnotation')
        div.focus()
        const range = window.getSelection()
        range.selectAllChildren(div)
        range.collapseToEnd()
        positionInsert = window.getSelection().getRangeAt(0)
    }
    var selectSpan = createSelectSpan("Entrer le nom du champ");
    positionInsert.insertNode(selectSpan);
    // window.getSelection().empty();
    $("#divContentAnnotation").append("&nbsp;")
    $("#divContentAnnotation").focus()
    //selectionner le text
    var selObj = window.getSelection();
    selObj.modify("extend", "left", "character");
    setTimeout(() => {
        selObj.modify("extend", "right", "character");
    }, 20);
}



function selectAnnotation(thisDiv) {
    var selObj = window.getSelection();
    var docFrag = selObj.getRangeAt(0).cloneContents();
    var selBtnP = selObj.getRangeAt(0).cloneContents().querySelector(".btn-label-annotation");
    var textPure = "";
    if (selObj.toString().trim() != "") { //select not vide

        if (selBtnP == null) {
            textPure = selObj.toString();
        } else {
            // docFrag.querySelector(".btn-label-annotation").replaceChildren();
            // docFrag.querySelector(".btn-delet-label-annotation").replaceChildren();
            textPure = docFrag.textContent
        }
        selObj.deleteFromDocument();
        if (positionSelect === '') {
            positionSelect = selObj.getRangeAt(0)
        }
        var selectSpan = createSelectSpan(textPure);
        positionSelect.insertNode(selectSpan)
        //selectionner le text
        var selObj = window.getSelection();
        selObj.modify("extend", "left", "character");
        setTimeout(() => {
            selObj.modify("extend", "right", "character");
        }, 20);

        positionSelect = "";
        $("#divContentAnnotation").append('&nbsp;')
    }
    // supprimer span vide 
    $('#divContentAnnotation span').each(function () {
        if ($(this).hasClass("span-annotation") && $(this).text().trim() == "") {
            $(this).remove()
        }
    })
}

function keyUpContentAnnotation() {
    //supprimer <font> 
    if ($('#divContentAnnotation font').length > 0) {
        $('#divContentAnnotation font').before($('#divContentAnnotation font').text())
        $('#divContentAnnotation font').remove()
    }
    //supprimer span vide pour copier coller 
    $('#divContentAnnotation span').each(function () {
        if (!$(this).hasClass("span-annotation")) {
            $(this).before($(this).text())
            $(this).remove()
        }
    })
    // supprimer span vide 
    $('#divContentAnnotation span').each(function () {
        if ($(this).hasClass("span-annotation") && $(this).text().trim() == "") {
            $(this).remove()
        }
    })
}

//deselect Annotation
function deselectAnnotation(thisBtn, event) {
    event.preventDefault()
    event.stopPropagation();
    var spanAnnotation = $(thisBtn).parents(".span-annotation");
    var btnLabelAnnotation = spanAnnotation.find(".btn-label-annotation")
    btnLabelAnnotation.remove()
    spanAnnotation.before(spanAnnotation.text())
    spanAnnotation.remove()
    window.getSelection().empty();
}

//typeSelectLabelAnnotation(this)
function typeSelectLabelAnnotation(thisBtn, event) {
    event.preventDefault()
    event.stopPropagation();
    $(thisBtn).parents(".span-annotation").attr("type", "BOOL")
    $("#divContentAnnotation").focus()
}

// spanClick select all
function spanClick(thisSpan) {
    var selObj = window.getSelection();
    if (selObj.rangeCount > 0) {
        var rangeObj = selObj.getRangeAt(0);
        rangeObj.selectNodeContents(thisSpan);
    }
    //selectionner le text
    var selObj = window.getSelection();
    selObj.modify("extend", "left", "character");
    setTimeout(() => {
        selObj.modify("extend", "right", "character");
    }, 20);
}

function expandSelection(event, thisSpan) {
    event.stopPropagation();
    var stringThisSpan = $(thisSpan).text()
    var selObj = window.getSelection();
    if (selObj.rangeCount > 0) {
        var fragment = selObj.getRangeAt(0).cloneContents();
        var rangeObj = selObj.getRangeAt(0);
        rangeObj.deleteContents();
        fragment.querySelector(".span-annotation").replaceChildren();
        var stringSelectSup = fragment.textContent
    }
    var newString = ""

    eMouseUp.eX = event.clientX;
    eMouseUp.eY = event.clientY;

    // get selection direction 
    var selectionDirection = "";
    if (eMouseUp.eY < eMouseDown.eY - 22) {
        selectionDirection = "back";

    } else {
        if (eMouseUp.eX < eMouseDown.eX) {
            selectionDirection = "back";
        } else {
            selectionDirection = "forward";
        }
    }

    if (selectionDirection == "forward") {
        newString = stringSelectSup + stringThisSpan;
    } else if (selectionDirection == "back") {
        newString = stringThisSpan + stringSelectSup;

    }
    var newStringSpan = createSelectSpan(newString);
    thisSpan.before(newStringSpan)
    thisSpan.remove()
}

// click (if dbclick desactive mouseup)
var time = 200;
var timeOut = null;
function mouseUpContentAnnotation(thisDiv) {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
        selectAnnotation(thisDiv);
    }, time);
}
function dblClickContentAnnotation(e, thisDiv) {
    clearTimeout(timeOut);
    var selObj = window.getSelection();
    selObj.modify("extend", "left", "character");
    selectAnnotation(thisDiv);
}


// direction selection 
var eMouseDown = {
    eX: "",
    eY: ""
};
var eMouseUp = {
    eX: "",
    eY: ""
};
function mouseDownContentAnnotation(event) {
    eMouseDown.eX = event.clientX;
    eMouseDown.eY = event.clientY;
}

$(document).keypress(function (e) {
    if (e.shiftKey && e.which == 13) {
        e.preventDefault();
        $("#divContentAnnotation").blur()
        insertAnnotation();
    } 
})




