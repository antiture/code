let position = ''
let positionInsert = ''
function blurEditAnnotation() {
    if (window.getSelection().rangeCount > 0) {
        positionInsert = window.getSelection().getRangeAt(0)
    }
}

function clickInsertAnnotation() {
    if (positionInsert === '') {
        // sans cursor ajouter a la fin 
        const div = document.getElementById('divContentAnnotation')
        div.focus()
        const range = window.getSelection()
        range.selectAllChildren(div)
        range.collapseToEnd()
        positionInsert = window.getSelection().getRangeAt(0)
    }
    const span = document.createElement('span')
    span.classList.add("span-annotation") 
    span.contentEditable = "true";
    span.setAttribute("type", "STRING")
    span.onmouseup = function (event) {
        stopPropa(event);
    }
    span.onclick = function () {
        spanClick(this);
    }
    span.innerHTML = '<div class="ctn-btn-label-annotation"><button contenteditable="false" class="btn-label-annotation" onclick="typeSelectLabelAnnotation(this)">插</button><button contenteditable="false" class="btn-label-annotation btn-delet-label-annotation" onclick="deselectAnnotation(this)">删</button> </div>Entrer le nom du entité'
    positionInsert.insertNode(span)
    // window.getSelection().empty();
    $("#divContentAnnotation").append("&nbsp;")
    $("#divContentAnnotation").focus()
}
function stopPropa(event) {
    event.stopPropagation();
}

function selectAnnotation(thisDiv) {
    var selObj = window.getSelection();
    var docFrag = selObj.getRangeAt(0).cloneContents();
    var selBtnP = selObj.getRangeAt(0).cloneContents().querySelector(".btn-label-annotation");
    var textPure = "";
    if (selObj.toString() != "") { //select not vide

        // var positionSel = selObj.anchorNode.compareDocumentPosition(selObj.focusNode);
        // if (!positionSel && selObj.anchorOffset > selObj.focusOffset || positionSel === Node.DOCUMENT_POSITION_PRECEDING) {
        //     selObj.modify("extend", "left", "word");
        // }else{
        //     selObj.modify("extend", "right", "word");
        // }

        if (selBtnP == null) {
            textPure = selObj.toString();
        } else {
            docFrag.querySelector(".btn-label-annotation").replaceChildren();
            docFrag.querySelector(".btn-delet-label-annotation").replaceChildren();
            textPure = docFrag.textContent
        }
        selObj.deleteFromDocument();
        if (position === '') {
            position = selObj.getRangeAt(0)
        }
        const span = document.createElement('span')
        span.classList.add("span-annotation")
        span.contentEditable = "true";
        span.setAttribute("type", "STRING")
        span.onmouseup = function (event) {
            stopPropa(event);
        }
        span.onclick = function () {
            spanClick(this);
        }
        span.innerHTML = '<div class="ctn-btn-label-annotation"><button contenteditable="false" class="btn-label-annotation" onclick="typeSelectLabelAnnotation(this)">插</button><button contenteditable="false" class="btn-label-annotation btn-delet-label-annotation" onclick="deselectAnnotation(this)">删</button> </div>' + textPure
        position.insertNode(span)
        position = "";
        // window.getSelection().empty();
        $("#divContentAnnotation").append('&nbsp;')
    }
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
    var rangeObj = selObj.getRangeAt(0);
    rangeObj.selectNodeContents(thisSpan);
}

//typeSelectLabelAnnotation(this)
function typeSelectLabelAnnotation(thisBtn) {
    $(thisBtn).parents(".span-annotation").attr("type","BOOL")
}