
function closeWindow() {
  window.close();
}

/* ========================== */

function updateImageUrl(image_id, new_image_url) {
  var image = document.getElementById(image_id);
  if (image)
    image.src = new_image_url;
}

function createImage(image_id, image_url) {
  var image = document.createElement("img");
  image.setAttribute("id", image_id);
  image.src = image_url;
  return image;
}

function createButton(button_id, button_name, normal_image_url,
                       hover_image_url, click_func) {
  
  var button = document.createElement("div");
  var button_img = createImage(button_id, normal_image_url);
  button.setAttribute("class", button_name);
  button.appendChild(button_img);
  
  button.onmouseover = function() {
    updateImageUrl(button_id, hover_image_url);
  }
  button.onmouseout = function() {
    updateImageUrl(button_id, normal_image_url);
  }
  button.onclick = click_func;
  return button;
}

function focusTitlebars(focus) {
  return;
  var bg_color = focus ? "#3a3d3d" : "#7a7c7c";
    
  var titlebar = document.getElementById("top-titlebar");
  title
  if (titlebar) {
    titlebar.style.backgroundColor = bg_color;
  }
}

function addTitlebar(titlebar_name, titlebar_icon_url, titlebar_text) {
  var titlebar = document.createElement("div");
  titlebar.setAttribute("id", titlebar_name);
  titlebar.setAttribute("class", titlebar_name);

  var icon = document.createElement("div");
  icon.setAttribute("class", titlebar_name + "-icon");
  icon.appendChild(createImage(titlebar_name + "icon", titlebar_icon_url));
  titlebar.appendChild(icon);
  
  var btn = document.createElement("div");
  btn.setAttribute("class", "toolbar-action action-help");
  btn.innerHTML = "?";
  btn.setAttribute("id", "action-help");
  btn.onclick = function(){
    showMessage("How to Use Stylr", "1. Use the tools on the left, once you have a layer selected.<br><br>2. You can resize each layer by selecting it, then draging any of the sides.<br><br>If you want to move the layer without changing with size, hold down CTRL when dragging the side.", 3);
  };
  
  titlebar.appendChild(btn);

  var btn2 = document.createElement("div");
  btn2.setAttribute("class", "toolbar-action action-gh");
  btn2.innerHTML = "View on GitHub";
  btn2.setAttribute("id", "action-gh");
  btn2.onclick = function(){
    showMessage("Help Make Stylr Better", "We'd LOVE it if you'd help (me) build this project! It's simple. The repo is public, andyone can see and contrbute to it.<br><br> <a href='https://github.com/bellingboe/app.stylr.io' target='_blank'>View Source on GitHub</a>", 3);
  };
  
  titlebar.appendChild(btn2);
  
/*
var twt = $("<a>")
.attr("href", "https://twitter.com/share")
.addClass("twitter-share-button")
.attr("data-text", "http://app.stylr.io/app/?utm_campaign=twt")
.attr("data-via", "NerdWhoCodes")
.attr("data-hashtags", "Stylr");
*/
            
  var title = document.createElement("div");
  title.setAttribute("class", titlebar_name + "-text");
  title.innerText = titlebar_text;
  titlebar.appendChild(title);

  if (isNative) {
    var closeButton = createButton(titlebar_name + "-close-button",
                      titlebar_name + "-close-button",
                      "button_close.png",
                      "button_close_hover.png",
                      closeWindow);
                      titlebar.appendChild(closeButton);
  }

  $(".wrapper").append($(titlebar));
  
  /*var scene = createImage("scene", "");
  scene.setAttribute("class", "scene-screen");
  $("#content").append(scene);*/
  
}

function removeTitlebar(titlebar_name) {
  var titlebar = document.getElementById(titlebar_name);
  if (titlebar) {
    document.body.removeChild(titlebar);
  }
}

function updateContentStyle() {
  var content = document.getElementById("content");
  if (!content) {
    return;
  }

  var left = 0;
  var top = 0;
  var width = window.outerWidth;
  var height = window.outerHeight;

  var titlebar = document.getElementById("top-titlebar");
  if (titlebar) {
    height -= titlebar.offsetHeight;
    top += titlebar.offsetHeight;
  } else {
    addTitlebar("top-titlebar", "top-titlebar.png", "Stylr");
  }

}