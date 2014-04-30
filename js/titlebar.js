

function closeWindow() {
  window.close();
}

function setActiveBox(b) {
  window.BOXITEM = b;
  b.addClass("edit-box");

  setPosDisplay(b.offset().top-35,b.offset().left-160);
  setSizeDisplay(b.outerHeight(),b.outerWidth());
  setBGDisplay(b.css('backgroundColor'));
  setLayerColor(b.css('backgroundColor'));
  setBorderDisplay(b.css('borderWidth').replace("px", ""), b.css('borderColor'));
  setCornerRadiusDisplay(b.css('borderRadius').replace("px", ""));
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
  button.setAttribute("class", button_name);
  var button_img = createImage(button_id, normal_image_url);
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

  var title = document.createElement("div");
  title.setAttribute("class", titlebar_name + "-text");
  title.innerText = titlebar_text;
  titlebar.appendChild(title);

  var closeButton = createButton(titlebar_name + "-close-button",
                                 titlebar_name + "-close-button",
                                 "button_close.png",
                                 "button_close_hover.png",
                                 closeWindow);
  titlebar.appendChild(closeButton);

  /*
  var divider = document.createElement("div");
  divider.setAttribute("class", titlebar_name + "-divider");
  titlebar.appendChild(divider);
  */
  
  document.body.appendChild(titlebar);
  
  var scene = createImage("scene", "");
  scene.setAttribute("class", "scene-screen");
  
  $("#content").append(scene);
  
}

function removeTitlebar(titlebar_name) {
  var titlebar = document.getElementById(titlebar_name);
  if (titlebar)
    document.body.removeChild(titlebar);
}

function updateContentStyle() {
  var content = document.getElementById("content");
  if (!content)
    return;

  var left = 0;
  var top = 0;
  var width = window.outerWidth;
  var height = window.outerHeight;

  var titlebar = document.getElementById("top-titlebar");
  if (titlebar) {
    height -= titlebar.offsetHeight;
    top += titlebar.offsetHeight;
  } else {
    addTitlebar("top-titlebar", "top-titlebar.png", "");
  }
/*
  var contentStyle = "position: absolute; ";
  if ($(".top-titlebar").hasClass("app-title")) {
    contentStyle += "left: 160px; ";
    contentStyle += "right: 0px; ";
  } else {
    contentStyle += "left: 0px; ";
  }
  
  content.setAttribute("style", contentStyle);
  */
  
  
}