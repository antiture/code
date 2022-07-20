
var isResizingIn = false;
var optionsIn = {
    limiteRight: 100,
    limiteLeft: 100,
    startLeft: 100
}
$(function(){
    if (localStorage.getItem('resizerInOffsetRight') == null) {
        setStartIn()
    }
    ResizerInMain()
})
$(window).resize(function () {
    setStartIn()
});
function setStartIn(){
    var containerIn = $('#ctnResizableIn');
    $("#resizableResizerIn").css('right',containerIn.width() - optionsIn.startLeft); 
    $(".left-in").css('right',containerIn.width() - optionsIn.startLeft);
    $(".right-in").css('width',containerIn.width() - optionsIn.startLeft);
    localStorage.setItem("resizerInOffsetRight", containerIn.width() - optionsIn.startLeft);
}
function ResizerInMain() {
    var resizerIn = $('#resizableResizerIn');
    var containerIn = $('#ctnResizableIn');
    var leftIn = $('.left-in');
    var rightIn = $('.right-in');
    var offsetRight = 0;
    if (localStorage.getItem('resizerInOffsetRight') != null) {
        if (localStorage.getItem('resizerInOffsetRight') > containerIn.width() - optionsIn.limiteLeft) {
            offsetRight = containerIn.width() - optionsIn.limiteLeft ;
        } else {
            offsetRight = localStorage.getItem('resizerInOffsetRight');
        }
    } else {
        offsetRight = optionsIn.startLeft;
    }
    offsetRight = offsetRight + "px";
    leftIn.css('right', offsetRight);
    resizerIn.css('right', offsetRight);
    rightIn.css('width', offsetRight);
    
    resizerIn.on('mousedown', function () {
        isResizingIn = true;
        $(".shield-in").addClass("shield-in-on");
    });

    $(window).on('mousemove', function (x) {
        if (!isResizingIn) return true;
        x.stopPropagation();
        var offsetRight = containerIn.width() - (x.clientX - containerIn.offset().left);
        if (offsetRight <= optionsIn.limiteRight) {
            leftIn.css({ 'right': optionsIn.limiteRight });
            resizerIn.css('right', optionsIn.limiteRight);
            rightIn.css({ 'width': optionsIn.limiteRight });
            localStorage.setItem("resizerInOffsetRight", optionsIn.limiteRight);
        } else if (offsetRight >= containerIn.width() - optionsIn.limiteLeft) {
            leftIn.css({ 'right': containerIn.width() - optionsIn.limiteLeft });
            resizerIn.css('right', containerIn.width() - optionsIn.limiteLeft);
            rightIn.css({ 'width': containerIn.width() - optionsIn.limiteLeft });
            localStorage.setItem("resizerInOffsetRight", containerIn.width() - optionsIn.limiteLeft);
        } else {
            leftIn.css({ 'right': offsetRight });
            resizerIn.css('right', offsetRight);
            rightIn.css({ 'width': offsetRight });
            localStorage.setItem("resizerInOffsetRight", offsetRight);
        }
    }).on('mouseup', function () {
        if (isResizingIn) {
            // textareaResize();
        }
        isResizingIn = false;
        $(".shield-in").removeClass("shield-in-on");
    });
}



