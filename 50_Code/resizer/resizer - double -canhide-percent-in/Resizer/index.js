var optionsEx = {
    limiteRight: 600,
    limiteLeft: 100,
    startLeft: 300
}

var isResizingEx = false
var inerOffsetRight = parseInt(localStorage.getItem('resizerInOffsetRight'))
 
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
        if (localStorage.getItem('resizerExOffsetRight') > containerEx.width() - optionsEx.limiteLeft) {
            offsetRight = containerEx.width() - optionsEx.limiteLeft;
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
        if (offsetRight <= optionsEx.limiteRight) {
             
            leftEx.css({ 'right': optionsEx.limiteRight });
            resizerEx.css('right', optionsEx.limiteRight);
            rightEx.css({ 'width': optionsEx.limiteRight });
            localStorage.setItem("resizerExOffsetRight", optionsEx.limiteRight);
        } else if (offsetRight >= containerEx.width() - optionsEx.limiteLeft) { 
            leftEx.css({ 'right': containerEx.width() - optionsEx.limiteLeft });
            resizerEx.css('right', containerEx.width() - optionsEx.limiteLeft);
            rightEx.css({ 'width': containerEx.width() - optionsEx.limiteLeft });
            localStorage.setItem("resizerExOffsetRight", containerEx.width() - optionsEx.limiteLeft);
        } else { 
            leftEx.css({ 'right': offsetRight });
            resizerEx.css('right', offsetRight);
            rightEx.css({ 'width': offsetRight });
            localStorage.setItem("resizerExOffsetRight", offsetRight);
            localStorage.setItem("resizerInOffsetRight", $(".right-in").width() ); 
        }
    }).on('mouseup', function () {
        if (isResizingEx) {
            // textareaResize();
        }
        isResizingEx = false;
        $(".shield-ex").removeClass("shield-ex-on");
    });
}



