let positionSelect = ''
let positionInsert = ''

function blurEditAnnotation() {
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
    span.innerHTML = '<div class="ctn-btn-label-annotation"><button contenteditable="false" class="btn-label-annotation" onclick="typeSelectLabelAnnotation(this)"><div class="icon icon-type-input"></div></button><button contenteditable="false" class="btn-label-annotation btn-delet-label-annotation" onclick="deselectAnnotation(this)"><div class="icon icon-select-cancel"></div></button></div>' + contenu
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
}



function selectAnnotation(thisDiv) {
    var selObj = window.getSelection();
    var docFrag = selObj.getRangeAt(0).cloneContents();
    var selBtnP = selObj.getRangeAt(0).cloneContents().querySelector(".btn-label-annotation");
    var textPure = "";
    if (selObj.toString().trim() != "") { //select not vide
        // var positionSel = selObj.anchorNode.compareDocumentPosition(selObj.focusNode);
        // if (!positionSel && selObj.anchorOffset > selObj.focusOffset || positionSel === Node.DOCUMENT_POSITION_PRECEDING) {
        //     selObj.modify("extend", "left", "word");
        // }else{
        //     selObj.modify("extend", "right", "word");
        // }

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
        positionSelect = "";
        // window.getSelection().empty();
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
}

//deselect Annotation
function deselectAnnotation(thisBtn) {
    var spanAnnotation = $(thisBtn).parents(".span-annotation");
    var btnLabelAnnotation = spanAnnotation.find(".btn-label-annotation")
    btnLabelAnnotation.remove()
    spanAnnotation.before(spanAnnotation.text())
    spanAnnotation.remove()
    window.getSelection().empty();
}

// spanClick select all
function spanClick(thisSpan) {
    var selObj = window.getSelection();
    if (selObj.rangeCount > 0) {
        var rangeObj = selObj.getRangeAt(0);
        rangeObj.selectNodeContents(thisSpan);
    }
}

//typeSelectLabelAnnotation(this)
function typeSelectLabelAnnotation(thisBtn) {
    $(thisBtn).parents(".span-annotation").attr("type", "BOOL")
    $("#divContentAnnotation").focus()
}

function expandSelection(event, thisSpan) {
    event.stopPropagation();
    // var stringThisSpan = $(thisSpan).text()
    // var selObj = window.getSelection();
    // if (selObj.rangeCount > 0) {
    //     var fragment = selObj.getRangeAt(0).cloneContents();
    //     var rangeObj = selObj.getRangeAt(0);
    //     rangeObj.deleteContents();
    //     fragment.querySelector(".span-annotation").replaceChildren();
    //     var stringSelectSup = fragment.textContent
    //     console.log(stringSelectSup)
    // }
    // var newString = ""
    // var positionSel = selObj.anchorNode.compareDocumentPosition(selObj.focusNode);
    // if (!positionSel && selObj.anchorOffset > selObj.focusOffset || positionSel === Node.DOCUMENT_POSITION_PRECEDING) {
    //     newString = stringThisSpan + stringSelectSup;
    // } else {
    //     newString = stringSelectSup + stringThisSpan;
    // }
    // console.log(newString);
    // var newStringSpan = createSelectSpan(newString);
    // thisSpan.before(newStringSpan)
    // thisSpan.remove()
}



// click (if dbclick desactive mouseup)

var time = 200;
var timeOut  = null;

function mouseUpContentAnnotation(thisDiv){
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

 