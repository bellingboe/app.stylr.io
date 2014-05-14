
var isNative = true;
var layerSel = false;
var layerCount = 0;
var isMovingLayer = false;
window.appOpen = false;

window.user = {};
window.user.uid = 0;

try {
    var nativeWindow = require("nw.gui").Window.get();
    var gui = require('nw.gui');
} catch (e) {
    isNative = false;
}

var guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

var get_uid = window.localStorage.getItem("uid");
if (!get_uid) {
    window.user.uid = guid();
    window.localStorage.setItem("uid", window.user.uid);
} else {
    window.user.uid = get_uid;
}

function switchLayers(a) {
      setActiveBox(a);
}

function boxResizeEvt() {
    window.BOXITEM.trigger("layerResize");
}

function setActiveBox(b) {
    disableLayer();
    window.BOXITEM = b;
    selectLayer(b);
    
    setPosDisplay(b.offset().top-35,b.offset().left-260);
    setSizeDisplay(b.outerHeight(),b.outerWidth());
    setBGDisplay(b.css('backgroundColor'));
    setLayerColor(b.css('backgroundColor'));
    setBorderDisplay(stripPx(b.css('borderWidth')), b.css('borderColor'));
    setCornerRadiusDisplay(stripPx(b.css('borderRadius')));
    setTransformHandles(true);
}

function setPosDisplay(t,l) {
    $(".pos-x").html(l);
    $(".pos-y").html(t);
}

function setSizeDisplay(h,w) {
    $(".size-w").html(w);
    $(".size-h").html(h);
}

function setBGDisplay(bg) {
    $(".bg-prev").css("background", bg);
}

function setLayerColor(hex, hash) {
    if ("undefined" !== typeof hash) {
      var color = hash + hex;
    } else {
      var color = hex;
    }
    
    $('#color_prev').css('backgroundColor', color);
    window.BOXITEM.css('backgroundColor', color);
    $('.bg-text').html(color);
}

function setBorderDisplay(size, hex, hash) {
    if ("undefined" !== typeof hash) {
      var color = hash + hex;
    } else {
      var color = hex;
    }
    
    $('#border_color_prev').css('backgroundColor', color);
    window.BOXITEM.css('border-width', size + "px");
    window.BOXITEM.css('border-color', color);
    window.BOXITEM.css('border-style', "solid");
    $('.bord-text').html(color);
    $('.bord-width').html(size);
}

function setCornerRadiusDisplay(cr) {
    $(".corner-width").html(cr);
}

function setBlurDisplay(b) {
    $(".blur-width").html(b);
}

function setTransformHandles(show) {
    var ht = $(".h-top");
    var hb = $(".h-bottom");
    var hr = $(".h-right");
    var hl = $(".h-left");
    
    if (!window.BOXITEM) {
        return;
    }
  
    ht.css({"width": window.BOXITEM.outerWidth(),
            "top": (window.BOXITEM.offset().top - 11) - 35,
            "left": window.BOXITEM.offset().left - 260});
    if (show) {
        ht.show();
    } else {
        ht.hide();
    }
    
    if (stripPx($(".edit-box").css("borderWidth")) == 0) {
        var borderOffset = 0;
    } else {
        var borderOffset = stripPx($(".edit-box").css("borderWidth"));
    }
    
    hb.css({"width": window.BOXITEM.outerWidth(),
            "top": (window.BOXITEM.offset().top + window.BOXITEM.height()) + (parseInt(borderOffset, 10) * 2) - 35,
            "left": window.BOXITEM.offset().left - 260});
    if (show) {
        hb.show();
    } else {
        hb.hide();
    }
    
    hr.css({"top": window.BOXITEM.offset().top - 35,
            "left": (window.BOXITEM.offset().left + window.BOXITEM.outerWidth()) - 260,
            "height": window.BOXITEM.height()});
    if (show) {
        hr.show();
    } else {
        hr.hide();
    }
    
    hl.css({"top": window.BOXITEM.offset().top - 35,
            "left": (window.BOXITEM.offset().left - 11) - 260,
            "height": window.BOXITEM.height()});
    if (show) {
        hl.show();
    } else {
        hl.hide();
    }
}

function setToolsSidebar(active) {
    if (active) {
        $(".tool-box").show();
        $(".tools .head").show();
    } else {
        $(".tool-box").hide();
        $(".tools .head").hide();
    }
}

function disableLayer() {
    if (window.BOXITEM) {
        window.BOXITEM.attr("data-active", "0");
        window.BOXITEM.removeClass("is-selected");
        setTransformHandles(false);
        setToolsSidebar(false);
        layerSel = false;
        window.BOXITEM = null;
    }
}

function selectLayer(layer) {
    layer.addClass("is-selected");
    layer.attr("data-active", "1");
    layer.addClass("edit-box");
    layer.attr("id", "layer_"+layerCount);
    layer.attr("data-active", "1");

    //setTransformHandles(true);
    setToolsSidebar(true);
    layerSel = true;
}

function isCurrentLayer(layer) {
    if (window.BOXITEM) {
        return (layer.attr("id") == window.BOXITEM.attr("id"));
    }
    
    return false;

}