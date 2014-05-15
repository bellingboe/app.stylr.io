
window.popupMsg = false;
window.popupDelay = 0;

function stripPx(v) {
    return v.replace("px", "");
}

function showMessage(title, msg, dur) {
    window.popupDelay = dur;

    $(".msg-title").html(title)
    $(".msg-content").html(msg)
        
    $("#fx-btn").trigger("click");
}

function hideMessage(dur) {

}