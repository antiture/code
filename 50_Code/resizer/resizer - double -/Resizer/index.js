var optionsEx = {
    widthCenter: 400,
    limL: 100,
    startLeft: 100
}

var isResizingEx = false
var inerOffsetRight = parseInt(localStorage.getItem('resizerInOffsetRight'))
var limR= inerOffsetRight + optionsEx.widthCenter

function setlimR(){
    inerOffsetRight = parseInt(localStorage.getItem('resizerInOffsetRight'))
    limR =  inerOffsetRight + 400
}
$(function () {
    if (localStorage.getItem('resizerExOffsetRight') == null) {
        setStartEx()
    }
    ResizerExMain()
})
$(window).resize(function () {
    setStartEx()
});
function setStartEx() {
    var containerEx = $('#ctnDisplay.resizable');
    $("#resizableResizerEx").css('right', containerEx.width() - optionsEx.startLeft);
    $(".left-ex").css('right', containerEx.width() - optionsEx.startLeft);
    $(".right-ex").css('width', containerEx.width() - optionsEx.startLeft);
    localStorage.setItem("resizerExOffsetRight", containerEx.width() - optionsEx.startLeft);
}
function ResizerExMain() {
    
    var resizerEx = $('#resizableResizerEx');
    var containerEx = $('#ctnDisplay.resizable');
    var leftEx = $('.left-ex');
    var rightEx = $('.right-ex');
    var offsetRight = 0;
    if (localStorage.getItem('resizerExOffsetRight') != null) {
        if (localStorage.getItem('resizerExOffsetRight') > containerEx.width() - optionsEx.limL) {
            offsetRight = containerEx.width() - optionsEx.limL;
        } else {
            offsetRight = localStorage.getItem('resizerExOffsetRight');
        }
    } else {
        offsetRight = optionsEx.startLeft;
    }
    offsetRight = offsetRight + "px";
    leftEx.css('right', offsetRight);
    resizerEx.css('right', offsetRight);
    rightEx.css('width', offsetRight);

    resizerEx.on('mousedown', function () {
        isResizingEx = true;
        $(".shield-ex").addClass("shield-ex-on");
    });

    $(window).on('mousemove', function (x) {
        if (!isResizingEx) return true;
        x.stopPropagation();
        var offsetRight = containerEx.width() - (x.clientX - containerEx.offset().left);
        if (offsetRight <= limR) {
            console.log(limR)
            console.log(inerOffsetRight)
            leftEx.css({ 'right': limR });
            resizerEx.css('right', limR);
            rightEx.css({ 'width': limR });
            localStorage.setItem("resizerExOffsetRight", limR);
        } else if (offsetRight >= containerEx.width() - optionsEx.limL) {
            console.log(2);
            leftEx.css({ 'right': containerEx.width() - optionsEx.limL });
            resizerEx.css('right', containerEx.width() - optionsEx.limL);
            rightEx.css({ 'width': containerEx.width() - optionsEx.limL });
            localStorage.setItem("resizerExOffsetRight", containerEx.width() - optionsEx.limL);
        } else {
            console.log(3);
            leftEx.css({ 'right': offsetRight });
            resizerEx.css('right', offsetRight);
            rightEx.css({ 'width': offsetRight });
            localStorage.setItem("resizerExOffsetRight", offsetRight);
        }
    }).on('mouseup', function () {
        if (isResizingEx) {
            // textareaResize();
        }
        isResizingEx = false;
        $(".shield-ex").removeClass("shield-ex-on");
    });
}



