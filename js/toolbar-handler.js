
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



function switchLayers(a, b) {
    if (a.attr("id") !== b.attr("id")) {
      setActiveBox(a);
      setTransformHandles(false);
      layerSel = false;
      return true;
    } else {
      return false;
    }
}

function boxResizeEvt() {
    window.BOXITEM.trigger("layerResize");
}

function setActiveBox(b) {
    window.BOXITEM = b;
    window.BOXITEM .addClass("edit-box");
    window.BOXITEM .attr("id", "layer_"+layerCount);
    window.BOXITEM .attr("data-active", "1");
    
    setPosDisplay(b.offset().top-35,b.offset().left-160);
    setSizeDisplay(b.outerHeight(),b.outerWidth());
    setBGDisplay(b.css('backgroundColor'));
    setLayerColor(b.css('backgroundColor'));
    setBorderDisplay(stripPx(b.css('borderWidth')), b.css('borderColor'));
    setCornerRadiusDisplay(stripPx(b.css('borderRadius')));
    setTransformHandles();
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

function setTransformHandles(show) {
    var ht = $(".h-top");
    var hb = $(".h-bottom");
    var hr = $(".h-right");
    var hl = $(".h-left");
  
    if ("undefined" !== typeof window.BOXITEM) {
        ht.css({"width": window.BOXITEM.outerWidth(),
                "top": window.BOXITEM.offset().top - 12,
                "left": window.BOXITEM.offset().left});
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
                "top": (window.BOXITEM.offset().top + window.BOXITEM.height()) + (parseInt(borderOffset, 10) * 2),
                "left": window.BOXITEM.offset().left});
        if (show) {
            hb.show();
        } else {
            hb.hide();
        }
        
        hr.css({"top": window.BOXITEM.offset().top,
                "left": window.BOXITEM.offset().left + window.BOXITEM.outerWidth(),
                "height": window.BOXITEM.height()});
        if (show) {
            hr.show();
        } else {
            hr.hide();
        }
        
        hl.css({"top": window.BOXITEM.offset().top,
                "left": window.BOXITEM.offset().left - 12,
                "height": window.BOXITEM.height()});
        if (show) {
            hl.show();
        } else {
            hl.hide();
        }
    }

}