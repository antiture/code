
var optionsEx = {
    limiteLeft: 100,
    startLeft: 300
}
var limiteRight = optionsIn.limiteLeft + optionsIn.limiteRight
var isResizingEx = false
var inerOffsetRight = parseInt(localStorage.getItem('resizerInOffsetRight'))

$(function () {
    if (localStorage.getItem('resizerExOffsetRight') == null) {
        setStartEx()
    }
    resizerExMain()
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
function resizerExMain() {
    var resizerEx = $('#resizableResizerEx');
    var containerEx = $('#ctnDisplay.resizable');
    var leftEx = $('.left-ex');
    var rightEx = $('.right-ex');
    var offsetRightEx = 0;
    if (localStorage.getItem('resizerExOffsetRight') != null) {
        if (localStorage.getItem('resizerExOffsetRight') > containerEx.width() - optionsEx.limiteLeft) {
            offsetRightEx = containerEx.width() - optionsEx.limiteLeft;
        } else {
            offsetRightEx = localStorage.getItem('resizerExOffsetRight');
        }
    } else {
        offsetRightEx = optionsEx.startLeft;
    }
    offsetRightEx = offsetRightEx + "px";
    leftEx.css('right', offsetRightEx);
    resizerEx.css('right', offsetRightEx);
    rightEx.css('width', offsetRightEx);

    resizerEx.on('mousedown', function () {
        isResizingEx = true;
        $(".shield-ex").addClass("shield-ex-on"); 
    });

    $(window).on('mousemove', function (x) {
        if (!isResizingEx) return true;
        x.stopPropagation();
        var offsetRightExMove = containerEx.width() - (x.clientX - containerEx.offset().left);
        if (offsetRightExMove <= limiteRight) {

            leftEx.css({ 'right': limiteRight });
            resizerEx.css('right', limiteRight);
            rightEx.css({ 'width': limiteRight });
            localStorage.setItem("resizerExOffsetRight", limiteRight);
        } else if (offsetRightExMove >= containerEx.width() - optionsEx.limiteLeft) {
            leftEx.css({ 'right': containerEx.width() - optionsEx.limiteLeft });
            resizerEx.css('right', containerEx.width() - optionsEx.limiteLeft);
            rightEx.css({ 'width': containerEx.width() - optionsEx.limiteLeft });
            localStorage.setItem("resizerExOffsetRight", containerEx.width() - optionsEx.limiteLeft);
        } else {
            leftEx.css({ 'right': offsetRightExMove });
            resizerEx.css('right', offsetRightExMove);
            rightEx.css({ 'width': offsetRightExMove });
            localStorage.setItem("resizerExOffsetRight", offsetRightExMove);
            localStorage.setItem("resizerInOffsetRight", $(".right-in").width());
            ////////////////change iner 
            
        }
    }).on('mouseup', function () {
        if (isResizingEx) {
            // textareaResize();
        }
        isResizingEx = false;
        $(".shield-ex").removeClass("shield-ex-on");
    });
}



