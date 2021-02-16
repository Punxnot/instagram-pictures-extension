(function() {
  var currentlySelected;
  function getDataUri(url, width, height, callback) {
    var image = new Image();
    image.crossOrigin = "Anonymous";

    image.onload = function () {
      var canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height, 0, 0, width, height);
      callback(canvas.toDataURL('image/jpg'));
    };

    image.src = url;
  }

  function removeSelectionFromElement(el) {
    el.style.border = "none";
    el.innerHTML = "";
  }

  function generateButton(text, posX) {
    var button = document.createElement('a');
    button.innerHTML = text;
    button.style.position = "absolute";
    button.style.top = "0";
    button.style[posX] = "0";
    button.style.backgroundColor = "#282B2A";
    button.style.color = "#fafafa";
    button.style.padding = "10px";
    return button;
  }

  document.addEventListener("click", function(e) {
    // Unselect any selected pictures
    if (currentlySelected) {
      removeSelectionFromElement(currentlySelected);
      currentlySelected = null;
    }
    // If clicked on picture select it
    var targetElement = e.target;
    if (targetElement.className == "_9AhH0") {
      currentlySelected = targetElement;
      // Find image tag
      var picElement = targetElement.previousSibling;
      targetElement.style.border = "2px dashed #fff";
      var imageUrl = picElement.querySelector('img').getAttribute("src");
      var downloadWidth = targetElement.offsetWidth;
      var downloadHeight = targetElement.offsetHeight;

      getDataUri(imageUrl, downloadWidth, downloadHeight, function(dataUri) {
        // Create download button
        var downloadButton = generateButton("Download", "right");
        downloadButton.setAttribute("href", dataUri);
        downloadButton.setAttribute("title", "Download image");
        var nameElements = imageUrl.split("/");
        var fileName = nameElements[nameElements.length - 1].split("?")[0];
        fileName = fileName.replace("jpg", "png")
        downloadButton.setAttribute("download", fileName);
        targetElement.appendChild(downloadButton);

        // Create open button
        var openButton = generateButton("Open", "left");
        openButton.setAttribute("href", imageUrl);
        openButton.setAttribute("target", "_blank");
        openButton.setAttribute("title", "Open image in a new tab");
        targetElement.appendChild(openButton);
      });
    }
  });

  document.addEventListener("keydown", function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
      isEscape = (evt.key == "Escape" || evt.key == "Esc");
    } else {
      isEscape = (evt.keyCode == 27);
    }
    if (isEscape && currentlySelected) {
      removeSelectionFromElement(currentlySelected);
    }
  });
})();
