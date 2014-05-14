jQuery.fn.center = function () {
    this.css("position","absolute");
    
    /*
     *this.css("top", Math.max(0, (($("#content").height() - $(this).outerHeight()) / 2) + 
                                                $("#content").scrollTop()) + "px");
    */
    
    this.css("left", Math.max(0, (($("#content").width() - $(this).outerWidth()) / 2) + 
                                                $("#content").scrollLeft()) + "px");
    return this;
}