
var isResizingIn = false;
var optionsIn = {
    limR: 100,
    limL: 400,
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
    setlimR()
}
function ResizerInMain() {
    var resizerIn = $('#resizableResizerIn');
    var containerIn = $('#ctnResizableIn');
    var leftIn = $('.left-in');
    var rightIn = $('.right-in');
    var offsetRight = 0;
    if (localStorage.getItem('resizerInOffsetRight') != null) {
        if (localStorage.getItem('resizerInOffsetRight') > containerIn.width() - optionsIn.limL) {
            offsetRight = containerIn.width() - optionsIn.limL ;
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
        if (offsetRight <= optionsIn.limR) {
            leftIn.css({ 'right': optionsIn.limR });
            resizerIn.css('right', optionsIn.limR);
            rightIn.css({ 'width': optionsIn.limR });
            localStorage.setItem("resizerInOffsetRight", optionsIn.limR);
            setlimR()
        } else if (offsetRight >= containerIn.width() - optionsIn.limL) {
            leftIn.css({ 'right': containerIn.width() - optionsIn.limL });
            resizerIn.css('right', containerIn.width() - optionsIn.limL);
            rightIn.css({ 'width': containerIn.width() - optionsIn.limL });
            localStorage.setItem("resizerInOffsetRight", containerIn.width() - optionsIn.limL);
            setlimR()
        } else {
            leftIn.css({ 'right': offsetRight });
            resizerIn.css('right', offsetRight);
            rightIn.css({ 'width': offsetRight });
            localStorage.setItem("resizerInOffsetRight", offsetRight);
            setlimR()
        }
    }).on('mouseup', function () {
        if (isResizingIn) {
            // textareaResize();
        }
        isResizingIn = false;
        $(".shield-in").removeClass("shield-in-on");
    });
}



