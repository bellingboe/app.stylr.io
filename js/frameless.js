window.onfocus = function() { 
    focusTitlebars(true);
}

window.onblur = function() { 
    focusTitlebars(false);
}

window.onresize = function() {
    updateContentStyle();
}

window.onload = function() {

    var mouseStillDown = false;
    var mouseDownFunc = false;
    var mouseInterval = null;
    var resizeDir;
    
    // BODY ==================================================================
    
    $("body")
    .on("click", ".footer", function(ev){
	
        $(this).children(".descr").slideToggle();
	
    })
    
    .on("mouseup", function(ev) {
	
	isMovingLayer = false;
	$("#content").removeClass("is-dragging");
	$(".handle").removeClass("is-dragging");
	
	if ("undefined" !== typeof window.BOXITEM) {
	    window.BOXITEM.removeClass("is-dragging");
	}
	
	$(".resize-dir").removeClass("resize-dir");

    })
    
    .on("mousedown", "#content", function(ev){
	
	isMovingLayer = false;
	setTransformHandles(false);
	
    })
   
    .on("mousemove", function(ev) {
	
	ev.stopPropagation();
	if (isMovingLayer) {
	    $("#content").addClass("is-dragging");
	    $(".handle").addClass("is-dragging");
	    window.BOXITEM.addClass("is-dragging");
	    
	    switch (resizeDir) {
		case 1: // UP
		break; 
		case 2: // DOWN
		    var bottom = window.BOXITEM.offset().top+window.BOXITEM.height();
		    var diff =  ev.pageY - bottom;
		    window.BOXITEM.css("height", (window.BOXITEM.height()+diff)+"px");
		break;
		case 3: // LEFT
		break;
		case 4: // RIGHT
		break;
	    }
	    
	    boxResizeEvt();
	    
	    setSizeDisplay(window.BOXITEM.outerHeight(),window.BOXITEM.outerWidth());
	    setPosDisplay(window.BOXITEM.offset().top-35,window.BOXITEM.offset().left-160);
	    
	}
    });
    
    // HANDLERS ==================================================================
    
    $(".handle").on("mousedown", function(){
	$(this).addClass("resize-dir");
    });
    
    $("#handles")
    .on("mousedown", ".h-top", function(ev){
	
	ev.stopPropagation();
	isMovingLayer = true;
	resizeDir = 1; // UP
	
    }).on("mousedown", ".h-bottom", function(ev){
	
	ev.stopPropagation();
	isMovingLayer = true;
	resizeDir = 2; // DOWN
	
    }).on("mousedown", ".h-left", function(ev){
	
	ev.stopPropagation();
	isMovingLayer = true;
	resizeDir = 3; // LEFT
	
    }).on("mousedown", ".h-right", function(ev){
	
	ev.stopPropagation();
	isMovingLayer = true;
	resizeDir = 4; // DOWN
	
    });
    
    $("#content")
    
    .on("mousedown", function(ev){
	if (window.BOXITEM) {
	    var b = window.BOXITEM;
	    b.attr("data-active", "0");
	    b.removeClass("is-selected");
	    setTransformHandles(false);
	    layerSel = false;
	}
    })

    .on("layerResize", ".edit-box", function(ev){
	//ev.stopPropagation();
	setTransformHandles(true);
	
    }).on("mousedown", ".edit-box", function(ev){
	var a = $(this);
	var b = window.BOXITEM;
	
	var didSwitch = switchLayers(a, b);
	if (!didSwitch) {
	    if ($(this).hasClass("is-selected")) {
	      $(this).removeClass("is-selected");
	      $(this).attr("data-active", "0");
	      setTransformHandles(false);
	      layerSel = false;
	    } else {
	      $(this).addClass("is-selected");
	      $(this).attr("data-active", "1");
	      setTransformHandles(true);
	      layerSel = true;
	    }
	    ev.stopPropagation();
	}
    });
    
    // TOOLS ==================================================================
	
    $(".tools")
    .on("mousedown", ".pos-add-x", function(ev){
	mouseStillDown = true;
	mouseDownFunc = function() {
	    if (!mouseStillDown) { return; }
	    
	    var new_x = (window.BOXITEM.offset().left - 160) + 1;
	    window.BOXITEM.css({"left": new_x+"px"});
	    setPosDisplay(window.BOXITEM.offset().top-35, new_x);
	    boxResizeEvt();
	    
	     if (mouseStillDown) { clearInterval(mouseInterval); mouseInterval = setInterval(function(){ return mouseDownFunc(); }, 50); }
	};
	
	mouseDownFunc();
    })
    
    .on("mouseup", function(event) {
	mouseStillDown = false;
	clearInterval(mouseInterval);
    })
	
    .on("mousedown", ".pos-sub-x", function(ev){
	mouseStillDown = true;
	mouseDownFunc = function() {
	    if (!mouseStillDown) { return; }
	    
	    var new_x = (window.BOXITEM.offset().left - 160) - 1;
	    window.BOXITEM.css({"left": new_x+"px"});
	    setPosDisplay(window.BOXITEM.offset().top-35, new_x);
	    boxResizeEvt();
	
	     if (mouseStillDown) { clearInterval(mouseInterval); mouseInterval = setInterval(function(){ return mouseDownFunc(); }, 50); }
	};
	
	mouseDownFunc();
    })
	
    .on("mousedown", ".pos-add-y", function(ev){
	mouseStillDown = true;
	mouseDownFunc = function() {
	    if (!mouseStillDown) { return; }
	    
	    var new_x = (window.BOXITEM.offset().top - 35) + 1;
	    window.BOXITEM.css({"top": new_x+"px"});
	    setPosDisplay(new_x, window.BOXITEM.offset().left-160);
	    boxResizeEvt();
	    
	     if (mouseStillDown) { clearInterval(mouseInterval); mouseInterval = setInterval(function(){ return mouseDownFunc(); }, 50); }
	};
	
	mouseDownFunc();
    })
	
    .on("mousedown", ".pos-sub-y", function(ev){
	mouseStillDown = true;
	mouseDownFunc = function() {
	    if (!mouseStillDown) { return; }
	    
	    var new_x = (window.BOXITEM.offset().top - 35) - 1;
	    window.BOXITEM.css({"top": new_x+"px"});
	    setPosDisplay(new_x, window.BOXITEM.offset().left-160);
	    boxResizeEvt();
	    
	     if (mouseStillDown) { clearInterval(mouseInterval); mouseInterval = setInterval(function(){ return mouseDownFunc(); }, 50); }
	};
	
	mouseDownFunc();
    })
	
    .on("mousedown", ".size-add-w", function(ev){
	mouseStillDown = true;
	mouseDownFunc = function() {
	    if (!mouseStillDown) { return; }
	    
	    var new_x = window.BOXITEM.outerWidth() + 1;
	    window.BOXITEM.css({"width": new_x+"px"});
	    setSizeDisplay(window.BOXITEM.outerHeight(), new_x);
	    boxResizeEvt();
	    
	     if (mouseStillDown) { clearInterval(mouseInterval); mouseInterval = setInterval(function(){ return mouseDownFunc(); }, 50); }
	};
	
	mouseDownFunc();
    })
    
    .on("mousedown", ".size-add-h", function(ev){
	mouseStillDown = true;
	mouseDownFunc = function() {
	    if (!mouseStillDown) { return; }
	    
	    var new_x = window.BOXITEM.outerHeight() + 1;
	    window.BOXITEM.css({"height": new_x+"px"});
	    setSizeDisplay(new_x, window.BOXITEM.outerWidth());
	    boxResizeEvt();
	    
	     if (mouseStillDown) { clearInterval(mouseInterval); mouseInterval = setInterval(function(){ return mouseDownFunc(); }, 50); }
	};
	
	mouseDownFunc();
    }).mouseup(function(event) {
	mouseStillDown = false;
	clearInterval(mouseInterval);
    });
    
    /* ============================================
    TOOL: size button WIDTH
    ============================================ */
    
    $(".tools").on("mousedown", ".size-sub-w", function(ev){
	mouseStillDown = true;
	mouseDownFunc = function() {
	    if (!mouseStillDown) { return; }
	    
	    var new_x = window.BOXITEM.outerWidth() - 1;
	    window.BOXITEM.css({"width": new_x+"px"});
	    setSizeDisplay(window.BOXITEM.outerHeight(), new_x);
	    boxResizeEvt();
	    
	     if (mouseStillDown) { clearInterval(mouseInterval); mouseInterval = setInterval(function(){ return mouseDownFunc(); }, 50); }
	};
	
	mouseDownFunc();
    }).mouseup(function(event) {
	mouseStillDown = false;
	clearInterval(mouseInterval);
    });
    
    /* ============================================
    TOOL: size button HEIGHT
    ============================================ */
    
    $(".tools").on("mousedown", ".size-sub-h", function(ev){
	mouseStillDown = true;
	mouseDownFunc = function() {
	    if (!mouseStillDown) { return; }
	    
	    var new_x = window.BOXITEM.outerHeight() - 1;
	    window.BOXITEM.css({"height": new_x+"px"});
	    setSizeDisplay(new_x, window.BOXITEM.outerWidth());
	    boxResizeEvt();
	    
	     if (mouseStillDown) { clearInterval(mouseInterval); mouseInterval = setInterval(function(){ return mouseDownFunc(); }, 50); }
	};
	
	mouseDownFunc();
    }).mouseup(function(event) {
	mouseStillDown = false;
	clearInterval(mouseInterval);
    });
    
    $(".tools").on("mousedown", ".bord-add", function(ev){
	    var border = parseInt(window.BOXITEM.css("borderWidth").replace("px", ""), 10) + 1;
	    setBorderDisplay(border, window.BOXITEM.css("borderColor"));
    });
    
    $(".tools").on("mousedown", ".bord-sub", function(ev){
	    var border = parseInt(window.BOXITEM.css("borderWidth").replace("px", ""), 10) - 1;
	    setBorderDisplay(border, window.BOXITEM.css("borderColor"));
    });
    
    $(".tools").on("mousedown", ".corner-add", function(ev){
	    var border = parseInt(window.BOXITEM.css("borderRadius").replace("px", ""), 10) + 1;
	    window.BOXITEM.css("borderRadius", border + "px");
	    setCornerRadiusDisplay(border);
    });
    
    $(".tools").on("mousedown", ".corner-sub", function(ev){
	    var border = parseInt(window.BOXITEM.css("borderRadius").replace("px", ""), 10) - 1;
	    window.BOXITEM.css("borderRadius", border + "px");
	    setCornerRadiusDisplay(border);
    });
    
    /* ============================================
    Interface elements
    ============================================ */
    
    $("#btn_gh").on("click", function(ev){
	if (isNative) {
	    gui.Shell.openExternal('https://github.com/bellingboe/app.stylr.io');
	} else {
	    window.location = 'https://github.com/bellingboe/app.stylr.io';
	}
    });
    
    $("#btn_twt").on("click", function(ev){
	if (isNative) {
	    gui.Shell.openExternal('https://twitter.com/NerdWhoCodes');
	} else {
	    window.location = 'https://twitter.com/NerdWhoCodes';
	}
    });
    
    $("#btn_new").on("click", function(ev){
        $(this).fadeOut();
        $("#btn_gh").fadeOut();
	$("#btn_twt").fadeOut();
        
        $(".top-titlebar").css({"top": "-35px"});
        $(".top-titlebar-text").addClass("app-title");
        $(".top-titlebar-close-button").addClass("app-title");
        $(".top-titlebar").addClass("app-title");
        $(".top-titlebar-icon").addClass("app-title");
        
        $(".scene-text").animate({"left": "160px"}, {queue: false});
        $(".scene-disc").animate({"left": "160px"}, {queue: false});
        $(".app-by").animate({"left": "160px"}, {queue: false});
        $("#scene").animate({"left": "160px"}, {queue: false});
        
        $(".scene-text").fadeOut();
        $(".scene-disc").fadeOut();
        $(".app-by").fadeOut();
        $(".tools").fadeIn();
        $("#scene").fadeOut();
        
        $(".top-titlebar").animate({"top": "0px"}, {queue: false});
        
        $("#content").animate({"left": "160px"}, {queue: false});
        $(".tools").animate({"left": "0px"}, {queue: false, complete: function(){
            $(".footer").fadeIn();
            //$(".footer-top").fadeIn();
            $("#content").css({"position": "absolute"});
            var box = $("<div>").hide().appendTo($("#content")).fadeIn();
	    layerCount++;
            setActiveBox(box);
        }});
        
    });
    
    $(".tool-box").on("click", ".title", function(ev){
        var opened = $(this).parent(".tool-box").hasClass("box-open");
        
        if (opened) {
            $(this).parent(".tool-box").removeClass("box-open");
        } else {
            $(this).parent(".tool-box").addClass("box-open");
        }
        
        $(this).siblings(".tool-content").toggle();
    });
    
    $(".top-titlebar-close-button > img").attr("src", "button_close_hover.png");
    
    $('#color_prev').ColorPicker({
	color: '#fff',
	onShow: function (colpkr) {
		$(colpkr).fadeIn(500);
		return false;
	},
	onHide: function (colpkr) {
		$(colpkr).fadeOut(500);
		return false;
	},
	onChange: function (hsb, hex, rgb) {
            setLayerColor(hex, "#");
	}
    });
    
    $('#border_color_prev').ColorPicker({
	color: '#000',
	onShow: function (colpkr) {
		$(colpkr).fadeIn(500);
		return false;
	},
	onHide: function (colpkr) {
		$(colpkr).fadeOut(500);
		return false;
	},
	onChange: function (hsb, hex, rgb) {
	    setBorderDisplay(window.BOXITEM.css('borderWidth').replace("px", ""), hex, "#");
	}
    });

    updateContentStyle();
    
    try {
	nativeWindow.show();
    } catch (e) {}
}