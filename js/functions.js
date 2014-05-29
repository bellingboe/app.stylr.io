
window.popupMsg = false;
window.popupDelay = 0;

function stripPx(v) {
    return v.replace("px", "");
}

function showMessage(title, msg, dur) {
    window.popupDelay = dur;
    
    if ($(".msg-overlay").length == 0) {
        $("<div>").addClass("msg-bg").appendTo($("body"));
        $("<div>").addClass("msg-overlay").appendTo($("body"));
    }

    $(".msg-bg")
        .fadeIn({duration: 400, queue: false});
    
    $(".msg-overlay")
        .show()
        .find(".msg-title")
            .html(title)
        .end()
        .find(".msg-content")
            .html(msg)
        .end()
        .animate({"top":"45px", "opacity":"1.0"}, {duration: 400, queue: false});
    
        window.popupMsg = true;
}

function hideMessage(dur) {
     $(".msg-bg")
        .fadeOut({duration: 400, queue: false});
    
    $(".msg-overlay")
        .animate({"top":"-70px", "opacity":"0"}, {duration: 400, queue: false});
        
        window.popupMsg = false;
}