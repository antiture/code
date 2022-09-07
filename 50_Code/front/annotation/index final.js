// label annotation//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function annotationCustomField(thisBtn, event) {
    cutDown = false
    event.preventDefault()
    event.stopPropagation();
    var label = $(thisBtn).parents(".span-annotation")
    var labelId = label.attr("labelid");
    var labelName = label.text();
    var labelType = label.attr("labeltype")
    var elementList = label.attr("elementlist")
    $.ajax({
        type: "GET",
        url: "/CustomField/annotationCustomField?labelId=" + labelId + "&labelName=" + labelName + "&labelType=" + labelType + "&elementList=" + elementList,
        success: function (resp) {
            $(".modalpartial").html(resp);
            $(".modalpartial").modal({
                escapeClose: false,
                clickClose: false,
                showClose: false,
                closeExisting: false
            });
        }
    });
}

//typeSelectLabelAnnotation(this)
function typeSelectLabelAnnotation(thisBtn, event) {
    event.preventDefault()
    event.stopPropagation();
    $(thisBtn).parents(".span-annotation").attr("type", "BOOL")
    $("#divContentAnnotation").focus()
}


// label annotation//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let positionSelect = ''
let positionInsert = ''
let cutDown = false
let cutDownId =""
var ctnBtnLabel = '<div class="ctn-btn-label-annotation"><button contenteditable="false" type="button" class="btn-label-annotation btn-label-annotation-cf" onmouseup="annotationCustomField(this,event)"><div class="icon icon-type-input"></div></button><button contenteditable="false" class="btn-label-annotation btn-delet-label-annotation" type="button" onmouseup="deselectAnnotation(this,event)"><div class="icon icon-select-cancel"></div></button></div>'

function blurContentAnnotation() {
    if (window.getSelection().rangeCount > 0) {
        positionInsert = window.getSelection().getRangeAt(0)
    }
}

function createSelectSpan(contenu) {
    const span = document.createElement('span')
    span.classList.add("span-annotation")
    span.contentEditable = "true";
    span.setAttribute("labeltype", "text")
    span.setAttribute("labelid", "")
    span.setAttribute("elementlist", "")
    span.onmouseup = function (event) {
        expandSelection(event, this);
    }
    span.onmousedown = function (event) {
        cutDownSelection(event, this);
    }
    span.ondblclick = function (event) {
        spanDbClick(event, this);
    }
    span.onclick = function () {
        spanClick(this);
    }
    span.innerHTML = ctnBtnLabel + contenu
    return span;
}
function getLabelId(selectSpan) {
    $.ajax({
        type: "GET",
        url: "/CustomField/getLabelId",
        success: function (resp) {
            selectSpan.setAttribute("labelid", resp)
        }
    });
}

function insertAnnotation() {
    var range = document.getSelection().getRangeAt(0);
    // interdit insert when postion at span
    if ($(range.startContainer).parents(".span-annotation") > 0 || range.startContainer.parentNode.classList[0] == "span-annotation") {
        return false;
    }
    // if positionInsert is in div
    if (positionInsert === '' || $(range.startContainer).parents("#divContentAnnotation") == 0) {
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
    // inner guid
    getLabelId(selectSpan);
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
        // cut down selection
        if (cutDown == true) {
            $(selectSpan).before($(selectSpan).text())
            $(selectSpan).remove()
            replenishBtnLable(cutDownId)
            window.getSelection().empty();
            cutDown = false
        }
        // inner guid
        getLabelId(selectSpan);
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
    cutDown = false
}

function cutDownSelection(event, thisSpan) {
    event.stopPropagation()
    cutDownId = $(thisSpan).attr("labelid") 
    cutDown = true
}

function replenishBtnLable(thisSpanId){
    var thisSpan = $(".span-annotation[labelid='" + thisSpanId + "']") 
    if(!$(thisSpan).find(".ctn-btn-label-annotation").length > 0){ 
        thisSpan.prepend(ctnBtnLabel)
    }
    cutDown = false
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
    // add button en cas delete 
    $('#divContentAnnotation .span-annotation').each(function () {
        if(!$(this).find(".ctn-btn-label-annotation").length > 0){ 
            $(this).prepend(ctnBtnLabel)
        }
    })

}

//deselect Annotation
function deselectAnnotation(thisBtn, event) {
    cutDown = false
    event.preventDefault()
    event.stopPropagation();
    var spanAnnotation = $(thisBtn).parents(".span-annotation");
    var btnLabelAnnotation = spanAnnotation.find(".btn-label-annotation")
    btnLabelAnnotation.remove()
    spanAnnotation.before(spanAnnotation.text())
    spanAnnotation.remove()
    window.getSelection().empty();
}

// spanClick select all
function spanClick(thisSpan) {
    cutDown = false
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
function spanDbClick(event, thisSpan){
    event.preventDefault()
    event.stopPropagation()
    $(thisSpan).find(".btn-label-annotation-cf").mouseup()
    window.getSelection().empty();
}
function expandSelection(event, thisSpan) {
    event.stopPropagation(); 
    if(cutDown==true){
        console.log("object");
        return false;
    }
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

    // fusion attribute 
    var labelId = $(thisSpan).attr("labelid");
    var labelType = $(thisSpan).attr("labeltype")
    var elementList = $(thisSpan).attr("elementlist")
    $(newStringSpan).attr("labelid", labelId)
    $(newStringSpan).attr("labeltype", labelType)
    $(newStringSpan).attr("elementlist", elementList)

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
    //supprimer span vide pour copier coller 
    $('#divContentAnnotation span').each(function () {
        if (!$(this).hasClass("span-annotation")) {
            $(this).before($(this).text())
            $(this).remove()
        }
    })
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




