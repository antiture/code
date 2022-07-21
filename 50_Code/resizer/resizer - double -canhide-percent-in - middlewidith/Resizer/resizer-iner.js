
var isResizingIn = false;
var optionsIn = {
    limR: 300,
    limL: 300,
    startR: "30%"
}
var ctnWidith;
$(function(){
    if (localStorage.getItem('resizerInOffsetRight') == null) {
        setStartIn()
    }  
    if (localStorage.getItem('switch-resizable') == "true"){
        $(".resizable-in").addClass("switched-resizable-in"); 
    }
    setTimeout(() => { 
        ResizerInMain()
     }, 0)
    
})
$(window).resize(function () {
    setStartIn()
});
function setStartIn(){
    $("#resizableResizerIn").css('right',"max("+ optionsIn.startR+"," + optionsIn.limR + "px)"); 
    $(".left-in").css('right',"max("+ optionsIn.startR+"," + optionsIn.limR + "px)");
    $(".right-in").css({'width':optionsIn.startR, "min-width": optionsIn.limR + "px"});
    var offsetRightTemp = $(".right-in").width()
    localStorage.setItem("resizerInOffsetRight",  offsetRightTemp); 
}

function ResizerInMain() {
    var resizerIn = $('#resizableResizerIn');
    var containerIn = $('#ctnResizableIn');
    var leftIn = $('.left-in');
    var rightIn = $('.right-in');
    var offsetRightIn = 0;
    if (localStorage.getItem('resizerInOffsetRight') != null) {
        if (localStorage.getItem('resizerInOffsetRight') > containerIn.width() - optionsIn.limL) {
            offsetRightIn = containerIn.width() - optionsIn.limL ;
        } else {
            offsetRightIn = localStorage.getItem('resizerInOffsetRight');
        }
    } else {
        offsetRightIn = optionsIn.startR;
    }
    ctnWidith = containerIn.width() 
    offsetRightPercent = offsetRightIn/ctnWidith*100 + "%"; 
    leftIn.css('right',"max("+ offsetRightPercent+"," + optionsIn.limR + "px)");
    resizerIn.css('right', "max("+ offsetRightPercent+"," + optionsIn.limR + "px)" );
    rightIn.css({'width': offsetRightPercent , "min-width": optionsIn.limR + "px" });
     
    
    resizerIn.on('mousedown', function () {
        isResizingIn = true;
        $(".shield-in").addClass("shield-in-on");
    });

    $(window).on('mousemove', function (x) {
        ctnWidith = containerIn.width() 
        if (!isResizingIn) return true;
        x.stopPropagation(); 
        var offsetRightInMove = ctnWidith - (x.clientX - containerIn.offset().left) ;
        if (offsetRightInMove <= optionsIn.limR) {
            leftIn.css({ 'right':"max(" + optionsIn.limR + "px,"+ optionsIn.limR/ctnWidith*100 + "%)"  });
            resizerIn.css({ 'right':"max(" + optionsIn.limR + "px,"+ optionsIn.limR/ctnWidith*100 + "%)"  });
            rightIn.css({ 'width': optionsIn.limR /ctnWidith*100 + "%"});
            localStorage.setItem("resizerInOffsetRight", optionsIn.limR);
             
        } else if (offsetRightInMove >= ctnWidith - optionsIn.limL) {
            leftIn.css({ 'right':"max(" + optionsIn.limL + "px,"+ (ctnWidith -optionsIn.limL) /ctnWidith*100 + "%)"  });
            resizerIn.css({'right':"max(" + optionsIn.limL + "px,"+ (ctnWidith -optionsIn.limL)/ctnWidith*100 + "%)"  });
            rightIn.css({ 'width': (ctnWidith - optionsIn.limL)/ctnWidith*100 + "%" });
            localStorage.setItem("resizerInOffsetRight", ctnWidith - optionsIn.limL);
        } else {
            leftIn.css({ 'right': "max(" + optionsIn.limL + "px,"+ offsetRightInMove/ctnWidith*100 + "%)" });
            resizerIn.css('right', "max(" + optionsIn.limL + "px,"+ offsetRightInMove/ctnWidith*100 + "%)");
            rightIn.css({ 'width': offsetRightInMove/ctnWidith*100 + "%" });
            localStorage.setItem("resizerInOffsetRight", offsetRightInMove ); 
             
        }
    }).on('mouseup', function () {
        if (isResizingIn) {
            // textareaResize();
        }
        isResizingIn = false;
        $(".shield-in").removeClass("shield-in-on");
    });
}

function switchRightIn(){
    if($(".resizable-in").hasClass("switched-resizable-in")){
        $(".resizable-in").removeClass("switched-resizable-in");  
        localStorage.setItem("switch-resizable", "false");
    }else{ 
        $(".resizable-in").addClass("switched-resizable-in"); 
        localStorage.setItem("switch-resizable", "true");
    }
}

