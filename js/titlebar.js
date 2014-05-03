
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

  document.body.appendChild(titlebar);
  
  var scene = createImage("scene", "");
  scene.setAttribute("class", "scene-screen");
  
  $("#content").append(scene);
  
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
    addTitlebar("top-titlebar", "top-titlebar.png", "Stlyr");
  }

}