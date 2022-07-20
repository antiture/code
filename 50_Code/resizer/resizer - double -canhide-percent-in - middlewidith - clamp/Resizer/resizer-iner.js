
var isResizingIn = false;
var optionsIn = {
    limiteRight: 300,
    limiteLeft: 300,
    startRight: "30%"
}
var ctnWidith;
$(function () {
    if (localStorage.getItem('resizerInOffsetRight') == null) {
        setStartIn()
    }
    if (localStorage.getItem('switch-resizable') == "true") {
        $(".resizable-in").addClass("switched-resizable-in");
    }
    setTimeout(() => {
        resizerInMain()
    }, 0)
})

$(window).resize(function () {
    setStartIn()
});

function setStartIn() {
    $("#resizableResizerIn").css('right', "max(" + optionsIn.startRight + "," + optionsIn.limiteRight + "px)");
    $(".left-in").css('right', "max(" + optionsIn.startRight + "," + optionsIn.limiteRight + "px)");
    $(".right-in").css({ 'width': optionsIn.startRight, "min-width": optionsIn.limiteRight + "px" });
    var offsetRightTemp = $(".right-in").width()
    debugger
    localStorage.setItem("resizerInOffsetRight", offsetRightTemp);
}

function resizerInMain() {
    var resizerIn = $('#resizableResizerIn');
    var containerIn = $('#ctnResizableIn');
    var leftIn = $('.left-in');
    var rightIn = $('.right-in');
    var offsetRightIn = 0;
    if (localStorage.getItem('resizerInOffsetRight') != null) {
        if (localStorage.getItem('resizerInOffsetRight') > containerIn.width() - optionsIn.limiteLeft) {
            offsetRightIn = containerIn.width() - optionsIn.limiteLeft;
        } else {
            offsetRightIn = localStorage.getItem('resizerInOffsetRight');
        }
    } else {
        offsetRightIn = optionsIn.startRight;
    }
    ctnWidith = containerIn.width()
    offsetRightPercent = offsetRightIn / ctnWidith * 100 + "%";
    leftIn.css({'right': "max(" + offsetRightPercent + "," + optionsIn.limiteRight + "px)", "min-width" : optionsIn.limiteLeft + "px"});
    rightIn.css({ 'width': offsetRightPercent, "min-width": optionsIn.limiteRight + "px", "max-width" : "calc(100% - " + optionsIn.limiteLeft +"px)" });
     


    resizerIn.on('mousedown', function () {
        isResizingIn = true;
        $(".shield-in").addClass("shield-in-on");
    });

    $(window).on('mousemove', function (x) {
        ctnWidith = containerIn.width()
        if (!isResizingIn) return true;
        x.stopPropagation();
        var offsetRightInMove = ctnWidith - (x.clientX - containerIn.offset().left);
        if (offsetRightInMove <= optionsIn.limiteRight) {
            leftIn.css({ 'right':  optionsIn.limiteRight  + "px" });
            rightIn.css({ 'width': optionsIn.limiteRight + "px" });
            localStorage.setItem("resizerInOffsetRight", optionsIn.limiteRight); 
        } else if (offsetRightInMove >= ctnWidith - optionsIn.limiteLeft) { 
            leftIn.css({ 'right': "max(" + optionsIn.limiteLeft + "px," + (ctnWidith - optionsIn.limiteLeft) / ctnWidith * 100 + "%)" });
            rightIn.css({ 'width': (ctnWidith - optionsIn.limiteLeft) / ctnWidith * 100 + "%" });
            localStorage.setItem("resizerInOffsetRight", ctnWidith - optionsIn.limiteLeft); 
        } else {
            leftIn.css({ 'right': "max(" + optionsIn.limiteLeft + "px," + offsetRightInMove / ctnWidith * 100 + "%)" });
            rightIn.css({ 'width': offsetRightInMove / ctnWidith * 100 + "%" });
            localStorage.setItem("resizerInOffsetRight", offsetRightInMove); 
        }
    }).on('mouseup', function () {
        if (isResizingIn) {
            // textareaResize();
        }
        isResizingIn = false;
        $(".shield-in").removeClass("shield-in-on");
    });
}

function switchRightIn() {
    if ($(".resizable-in").hasClass("switched-resizable-in")) {
        $(".resizable-in").removeClass("switched-resizable-in");
        localStorage.setItem("switch-resizable", "false");
    } else {
        $(".resizable-in").addClass("switched-resizable-in");
        localStorage.setItem("switch-resizable", "true");
    }
}

