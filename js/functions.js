
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
        
    /*
    $({blurRadius: 0}).animate({blurRadius: dur}, {
        duration: 1000,
        queue: false,
        step: function() {
            $(".wrapper").css({
                "-webkit-filter": "blur("+this.blurRadius+"px)",
                "filter": "blur("+this.blurRadius+"px)"
            });
        },
        complete: function() {
            window.popupMsg = true;
        }
    });
    */
    
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
    
    /*
    $({blurRadius: dur}).animate({blurRadius: 0}, {
        duration: 1000,
        queue: false,
        step: function() {
            $(".wrapper").css({
                "-webkit-filter": "blur("+this.blurRadius+"px)",
                "filter": "blur("+this.blurRadius+"px)"
            });
        },
        complete: function() {
            $(".wrapper")
                .css({
                    "-webkit-filter": "blur(0px)",
                    "filter": "blur(0px)"
                }); 
            window.popupMsg = false;
        }
    });
    */
    
     $(".msg-bg")
        .fadeOut({duration: 400, queue: false});
    
    $(".msg-overlay")
        .animate({"top":"-700px", "opacity":"0"}, {duration: 400, queue: false});
        
        window.popupMsg = false;
}