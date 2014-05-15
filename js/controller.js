window.onfocus = function() { 
    focusTitlebars(true);
}

window.onblur = function() { 
    focusTitlebars(false);
}

window.onresize = function() {
    updateContentStyle();
}

window.onscroll = function() {
    if (window.BOXITEM && layerSel) {
	setTransformHandles(true);
    } 
}

window.onmousewheel = function() {
    if (window.BOXITEM && layerSel) {
	setTransformHandles(true);
    } 
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
    
    .on("keydown", function(ev){
        if (ev.ctrlKey) {
	    $("body")
		.addClass("mode-grabbing")
		.removeClass("mode-pos-u")
		.removeClass("mode-pos-d")
		.removeClass("mode-pos-l")
		.removeClass("mode-pos-r");
	}
    })
    
    .on("keyup", function(ev){
	
	if (ev.keyCode == 27 && window.popupMsg) {
	    hideMessage(window.popupDelay);
	}
	
        if (ev.keyCode == 17) {
	    $("body")
		.removeClass("mode-pos-u")
		.removeClass("mode-pos-d")
		.removeClass("mode-pos-l")
		.removeClass("mode-pos-r")
		.removeClass("mode-grabbing");
	}
    })
    
    .on("mouseup", function(ev) {
	isMovingLayer = false;
	
	$("#content")
	    .removeClass("is-dragging");
	    
	$("body")
	    .removeClass("mode-grabbing")
	    .removeClass("mode-pos-u")
	    .removeClass("mode-pos-d")
	    .removeClass("mode-pos-l")
	    .removeClass("mode-pos-r")
	    
	$(".resize-dir")
	    .removeClass("resize-dir");
	
	if (window.BOXITEM) {
	    window.BOXITEM
		.removeClass("is-dragging");
	}
    })
    
    .on("mousedown", "#content", function(ev){
	//isMovingLayer = false;
	//setTransformHandles(false);
    })
   
    .on("mousemove", "#content", function(ev) {
	ev.stopPropagation();
	
	if (isMovingLayer) {
	    $("#content").addClass("is-dragging");
	    window.BOXITEM.addClass("is-dragging");
	    
	    switch (resizeDir) {
		case 1: // UP
		     if (ev.ctrlKey) {
			$("body")
			    .addClass("mode-grabbing")
			    .removeClass("mode-pos-u");
			    
			var top = window.BOXITEM.offset().top;
			var diff =  ev.pageY - top;
			window.BOXITEM.css("top", (parseInt(window.BOXITEM.css("top"))+diff)+"px");
		     } else {
			$("body")
			    .removeClass("mode-grabbing")
			    .addClass("mode-pos-u");
			    
			var top= window.BOXITEM.offset().top;
			var diff =  ev.pageY - top;
			window.BOXITEM.css("height", (window.BOXITEM.height()-diff)+"px");
			window.BOXITEM.css("top", (parseInt(window.BOXITEM.css("top"))+diff)+"px");
		     }
		break; 
		case 2: // DOWN
		     if (ev.ctrlKey) {
			$("body")
			    .addClass("mode-grabbing")
			    .removeClass("mode-pos-d");
			    
			var top = window.BOXITEM.offset().top + window.BOXITEM.height();
			var diff =  ev.pageY - top;
			window.BOXITEM.css("top", (parseInt(window.BOXITEM.css("top"))+diff)+"px");
		    } else {
			$("body")
			    .removeClass("mode-grabbing")
			    .addClass("mode-pos-d");
			    
			var bottom = window.BOXITEM.offset().top + window.BOXITEM.height();
			var diff =  ev.pageY - bottom;
			window.BOXITEM.css("height", (window.BOXITEM.height()+diff)+"px");
		    }
		break;
		case 3: // LEFT
		    if (ev.ctrlKey) {
			$("body")
			    .addClass("mode-grabbing")
			    .removeClass("mode-pos-l");
			    
			var left = window.BOXITEM.offset().left;
			var diff =  ev.pageX - left;
			window.BOXITEM.css("left", (parseInt(window.BOXITEM.css("left"))+diff)+"px");
		    } else {
			$("body")
			    .removeClass("mode-grabbing")
			    .addClass("mode-pos-l");
			    
			var left = window.BOXITEM.offset().left;
			var diff =  ev.pageX - left;
			window.BOXITEM.css("width", (window.BOXITEM.width()-diff)+"px");
			window.BOXITEM.css("left", (parseInt(window.BOXITEM.css("left"))+diff)+"px");
		    }
		break;
		case 4: // RIGHT
		    if (ev.ctrlKey) {
			$("body")
			    .addClass("mode-grabbing")
			    .removeClass("mode-pos-r");
			    
			var left = window.BOXITEM.offset().left + window.BOXITEM.width();
			var diff =  ev.pageX - left;
			window.BOXITEM.css("left", (parseInt(window.BOXITEM.css("left"))+diff)+"px");
		    } else {
			$("body")
			    .removeClass("mode-grabbing")
			    .addClass("mode-pos-r");
			    
			var right = window.BOXITEM.offset().left + window.BOXITEM.width();
			var diff =  ev.pageX - right;
			window.BOXITEM.css("width", (window.BOXITEM.width()+diff)+"px");
		    }
		break;
	    }
	    
	    boxResizeEvt();
	    
	    setSizeDisplay(window.BOXITEM.outerHeight(),window.BOXITEM.outerWidth());
	    setPosDisplay(window.BOXITEM.offset().top-35,window.BOXITEM.offset().left-260);
	    
	}
    });
    
    // HANDLERS ==================================================================
    
    $(".handle")
    .on("mousedown", function(){
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
	    //disableLayer();
	    ev.stopPropagation();
	}
    })

    .on("layerResize", ".edit-box", function(ev){
	setTransformHandles(true);
    })
    
    .on("mousedown", ".edit-box", function(ev){
	var a = $(this);
	var current = isCurrentLayer(a);
	
	if (!window.BOXITEM || !current) {
	    switchLayers(a);
	    ev.stopPropagation();
	    
	    return;
	}

	ev.stopPropagation();
    });
    
    // TOOLS ==================================================================
	
    $(".tools")
    .on("mousedown", ".pos-add-x", function(ev){
	mouseStillDown = true;
	mouseDownFunc = function() {
	    if (!mouseStillDown) { return; }
	    
	    var new_x = (window.BOXITEM.offset().left - 260) + 1;
	    window.BOXITEM.css({"left": new_x+"px"});
	    setPosDisplay(window.BOXITEM.offset().top-35, new_x);
	    boxResizeEvt();
	    
	    if (mouseStillDown) { clearInterval(mouseInterval); mouseInterval = setInterval(function(){ return mouseDownFunc(); }, 500); }
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
	    
	    var new_x = (window.BOXITEM.offset().left - 260) - 1;
	    window.BOXITEM.css({"left": new_x+"px"});
	    setPosDisplay(window.BOXITEM.offset().top-35, new_x);
	    boxResizeEvt();
	
	    if (mouseStillDown) { clearInterval(mouseInterval); mouseInterval = setInterval(function(){ return mouseDownFunc(); }, 500); }
	};
	
	mouseDownFunc();
    })
	
    .on("mousedown", ".pos-add-y", function(ev){
	mouseStillDown = true;
	mouseDownFunc = function() {
	    if (!mouseStillDown) { return; }
	    
	    var new_x = (window.BOXITEM.offset().top - 35) + 1;
	    window.BOXITEM.css({"top": new_x+"px"});
	    setPosDisplay(new_x, window.BOXITEM.offset().left-260);
	    boxResizeEvt();
	    
	    if (mouseStillDown) { clearInterval(mouseInterval); mouseInterval = setInterval(function(){ return mouseDownFunc(); }, 500); }
	};
	
	mouseDownFunc();
    })
	
    .on("mousedown", ".pos-sub-y", function(ev){
	mouseStillDown = true;
	mouseDownFunc = function() {
	    if (!mouseStillDown) { return; }
	    
	    var new_x = (window.BOXITEM.offset().top - 35) - 1;
	    window.BOXITEM.css({"top": new_x+"px"});
	    setPosDisplay(new_x, window.BOXITEM.offset().left-260);
	    boxResizeEvt();
	    
	    if (mouseStillDown) { clearInterval(mouseInterval); mouseInterval = setInterval(function(){ return mouseDownFunc(); }, 500); }
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
	    
	    if (mouseStillDown) { clearInterval(mouseInterval); mouseInterval = setInterval(function(){ return mouseDownFunc(); }, 500); }
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
	    
	    if (mouseStillDown) { clearInterval(mouseInterval); mouseInterval = setInterval(function(){ return mouseDownFunc(); }, 500); }
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
	    
	    if (mouseStillDown) { clearInterval(mouseInterval); mouseInterval = setInterval(function(){ return mouseDownFunc(); }, 500); }
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
	    
	    if (mouseStillDown) { clearInterval(mouseInterval); mouseInterval = setInterval(function(){ return mouseDownFunc(); }, 500); }
	};
	
	mouseDownFunc();
    }).mouseup(function(event) {
	mouseStillDown = false;
	clearInterval(mouseInterval);
    });
    
    /* ============================================
    TOOL: blur
    ============================================ */
    
    $(".tools").on("mousedown", ".blur-add", function(ev){
	mouseStillDown = true;
	mouseDownFunc = function() {
	    if (!mouseStillDown) { return; }
	    
	    var blur_size = ($(".edit-box").css("-webkit-filter") || $(".edit-box").css("-moz-filter") || $(".edit-box").css("-ms-filter") || $(".edit-box").css("-o-filter"));
	    var size_extract = (/blur\(([0-9]+)px\)/gi).exec(blur_size);

	    if (!size_extract) {
		var real_size = "0px";
	    } else {
		var real_size = size_extract[1];
	    }

	    var size_int = parseInt(stripPx(real_size), 10);
	    var size_parse = parseInt(size_int + 1, 10);
	    
	    $(".edit-box").css({"-webkit-filter":"blur("+size_parse+"px)",
			       "-moz-filter":"blur("+size_parse+"px)",
			       "-ms-filter":"blur("+size_parse+"px)",
			       "-o-filter":"blur("+size_parse+"px)"});
	    
	    setBlurDisplay((size_int + 1));
	    
	    if (mouseStillDown) { clearInterval(mouseInterval); mouseInterval = setInterval(function(){ return mouseDownFunc(); }, 500); }
	};
	
	mouseDownFunc();
    }).mouseup(function(event) {
	mouseStillDown = false;
	clearInterval(mouseInterval);
    });
    
    $(".tools").on("mousedown", ".blur-sub", function(ev){
	mouseStillDown = true;
	mouseDownFunc = function() {
	    if (!mouseStillDown) { return; }

	    var blur_size = ($(".edit-box").css("-webkit-filter") || $(".edit-box").css("-moz-filter") || $(".edit-box").css("-ms-filter") || $(".edit-box").css("-o-filter"));
	    var size_extract = (/blur\(([0-9]+)px\)/gi).exec(blur_size);

	    if (!size_extract) {
		var real_size = "0px";
	    } else {
		var real_size = size_extract[1];
	    }

	    var size_int = stripPx(real_size);
	    var size_parse = parseInt(size_int - 1, 10);
	    
	    $(".edit-box").css({"-webkit-filter":"blur("+size_parse+"px)",
			       "-moz-filter":"blur("+size_parse+"px)",
			       "-ms-filter":"blur("+size_parse+"px)",
			       "-o-filter":"blur("+size_parse+"px)"});
	    
	    setBlurDisplay((size_int - 1));
	    
	    if (mouseStillDown) { clearInterval(mouseInterval); mouseInterval = setInterval(function(){ return mouseDownFunc(); }, 500); }
	};
	
	mouseDownFunc();
    }).mouseup(function(event) {
	mouseStillDown = false;
	clearInterval(mouseInterval);
    });
    
    /* ============================================
    TOOL: border
    ============================================ */
    
    $(".tools").on("mousedown", ".bord-add", function(ev){
	    var border = parseInt(stripPx(window.BOXITEM.css("borderWidth")), 10) + 1;
	    setBorderDisplay(border, window.BOXITEM.css("borderColor"));
    });
    
    $(".tools").on("mousedown", ".bord-sub", function(ev){
	    var border = parseInt(stripPx(window.BOXITEM.css("borderWidth")), 10) - 1;
	    setBorderDisplay(border, window.BOXITEM.css("borderColor"));
    });
    
    /* ============================================
    TOOL: border radius
    ============================================ */
    
    $(".tools").on("mousedown", ".corner-add", function(ev){
	    var border = parseInt(stripPx(window.BOXITEM.css("borderRadius")), 10) + 1;
	    window.BOXITEM.css("borderRadius", border + "px");
	    setCornerRadiusDisplay(border);
    });
    
    $(".tools").on("mousedown", ".corner-sub", function(ev){
	    var border = parseInt(stripPx(window.BOXITEM.css("borderRadius")), 10) - 1;
	    window.BOXITEM.css("borderRadius", border + "px");
	    setCornerRadiusDisplay(border);
    });
    
    /* ============================================
    TOOL: opacity
    ============================================ */
    
    $(".tools").on("mousedown", ".add-opacity", function(ev){
	    var op = parseFloat(stripPx(window.BOXITEM.css("opacity"))) + 0.1;
	    op = op.toFixed(1);

	    if (op <= 1.0) {
		window.BOXITEM.css("opacity", op);
		setOpacityDisplay(op);
	    }
    });
    
    $(".tools").on("mousedown", ".sub-opacity", function(ev){
	    var op = parseFloat(stripPx(window.BOXITEM.css("opacity"))) - 0.1;
	    op = op.toFixed(1);
	    
	    if (op >= 0.1) {
		window.BOXITEM.css("opacity", op);
		setOpacityDisplay(op);
	    }

    });
    
    /* ============================================
    Interface elements
    ============================================ */
    
    $(".get-css").on("click", function(){
	alert(window.BOXITEM[0].style.cssText);
    });
    
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
	window.appOpen = true;
	
        $(this).fadeOut();
        $("#btn_gh").fadeOut();
	$("#btn_twt").fadeOut();
        
	$(".twitter-share-button").appendTo($(".top-titlebar")).show();
        $(".top-titlebar").css({"top": "-35px"});
        $(".top-titlebar-text").addClass("app-title").show();
        $(".top-titlebar-close-button").addClass("app-title");
        $(".top-titlebar").addClass("app-title");
        $(".top-titlebar-icon").addClass("app-title");
        
        $(".scene-text").fadeOut();
        $(".scene-disc").fadeOut();
        $(".app-by").fadeOut();
        $(".scene-text").fadeOut();
        $(".scene-disc").fadeOut();
        $(".app-by").fadeOut();
        $(".tools").fadeIn();
        $("#scene").fadeOut();
        
        $(".top-titlebar")
	    .animate({"top": "0px"}, {queue: false});
        
        $("#content")
	    .animate({"left": "260px",
		     "opacity": "1.0"}, {queue: false});
	
	$(".btn-get-css")
	    .animate({"top": "0px"}, {queue: false});


        $(".tools").animate({"left": "0px"}, {queue: false, complete: function(){
            $(".footer").fadeIn();
            $("#content").css({"position": "absolute"});
            var box = $("<div>").hide().appendTo($("#content")).fadeIn();
	    $(".btn-get-css").appendTo($(".top-titlebar")).fadeIn();
	    //$(".head").fadeIn();
	    
	    layerCount++;
            setActiveBox(box);
	    window.BOXITEM.center();
	    boxResizeEvt();
        }});
	
	ga('send', 'event', 'in-app', 'new-workspace', window.user.uid);
        ga('send', 'event', 'in-app', 'uid-checkin', window.user.uid);
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
    
    //$(".top-titlebar-close-button > img").attr("src", "button_close_hover.png");
    
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
	    setBorderDisplay(stripPx(window.BOXITEM.css('borderWidth')), hex, "#");
	}
    });

    updateContentStyle();
    
    ga('send', 'event', 'pre-app', 'landing', {'page': '/app/'});

    try {
	nativeWindow.show();
    } catch (e) {}
}