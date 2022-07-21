
var isResizingIn = false;
var optIn = {
    limR: 300,
    limL: 300,
    startR: "30%"
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
    $("#resizableResizerIn").css('right', "max(" + optIn.startR + "," + optIn.limR + "px)");
    $(".left-in").css('right', "max(" + optIn.startR + "," + optIn.limR + "px)");
    $(".right-in").css({ 'width': optIn.startR, "min-width": optIn.limR + "px" });
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
        if (localStorage.getItem('resizerInOffsetRight') > containerIn.width() - optIn.limL) {
            offsetRightIn = containerIn.width() - optIn.limL;
        } else {
            offsetRightIn = localStorage.getItem('resizerInOffsetRight');
        }
    } else {
        offsetRightIn = optIn.startR;
    }
    ctnWidith = containerIn.width()
    offsetRightPercent = offsetRightIn / ctnWidith * 100 + "%";
    leftIn.css({'right': "max(" + offsetRightPercent + "," + optIn.limR + "px)", "min-width" : optIn.limL + "px"});
    rightIn.css({ 'width': offsetRightPercent, "min-width": optIn.limR + "px", "max-width" : "calc(100% - " + optIn.limL +"px)" }); 
    resizerIn.on('mousedown', function () {
        isResizingIn = true;
        $(".shield-in").addClass("shield-in-on");
    }); 
    $(window).on('mousemove', function (x) {
        ctnWidith = containerIn.width()
        if (!isResizingIn) return true;
        x.stopPropagation();
        var offsetRightInMove = ctnWidith - (x.clientX - containerIn.offset().left);
        if (offsetRightInMove <= optIn.limR) {
            leftIn.css({ 'right':  optIn.limR  + "px" });
            rightIn.css({ 'width': optIn.limR + "px" });
            localStorage.setItem("resizerInOffsetRight", optIn.limR); 
        } else if (offsetRightInMove >= ctnWidith - optIn.limL) { 
            leftIn.css({ 'right': "max(" + optIn.limL + "px," + (ctnWidith - optIn.limL) / ctnWidith * 100 + "%)" });
            rightIn.css({ 'width': (ctnWidith - optIn.limL) / ctnWidith * 100 + "%" });
            localStorage.setItem("resizerInOffsetRight", ctnWidith - optIn.limL); 
        } else {
            leftIn.css({ 'right': "max(" + optIn.limL + "px," + offsetRightInMove / ctnWidith * 100 + "%)" });
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

