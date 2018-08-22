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
      // callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
      callback(canvas.toDataURL('image/png'));
    };

    image.src = url;
  }

  function removeSelectionFromElement(el) {
    el.style.outline = "none";
    el.innerHTML = "";
  }

  document.addEventListener("click", function(e) {
    if (currentlySelected) {
      removeSelectionFromElement(currentlySelected);
    }
    var targetElement = e.target;
    currentlySelected = targetElement;
    if (targetElement.className == "_9AhH0") {
      // Find image tag
      var picElement = targetElement.previousSibling;
      targetElement.style.outline = "3px dashed green";
      var imageUrl = picElement.querySelector('img').getAttribute("src");
      var downloadWidth = targetElement.offsetWidth;
      var downloadHeight = targetElement.offsetHeight;

      getDataUri(imageUrl, downloadWidth, downloadHeight, function(dataUri) {
        // Create download button
        var downloadButton = document.createElement('a');
        downloadButton.innerHTML = "Download this image";
        downloadButton.style.position = "absolute";
        downloadButton.style.top = "0px";
        downloadButton.style.right = "0px";
        downloadButton.style.backgroundColor = "#000000";
        downloadButton.style.color = "#ffffff";
        downloadButton.style.padding = "20px";
        downloadButton.style.cursor = "pointer";
        downloadButton.setAttribute("href", dataUri);
        var nameElements = imageUrl.split("/");
        var fileName = nameElements[nameElements.length - 1];
        downloadButton.setAttribute("download", fileName);
        targetElement.appendChild(downloadButton);
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
