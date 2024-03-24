var zoomDiv = document.createElement("div");
zoomDiv.style.position = "absolute";
zoomDiv.style.bottom = "60px";
zoomDiv.style.left = "50%";
zoomDiv.style.transform = "translateX(-50%)";
zoomDiv.style.zIndex = 50;
document.body.appendChild(zoomDiv);

var plus = document.createElement("button");
plus.style.borderWidth = "1px 0 1px 1px";
plus.style.borderRadius = "20px 0 0 20px";
plus.innerHTML = "➕";
plus.id = "plus";
plus.style.cursor = "pointer";
plus.style.fontSize = "18px";
zoomDiv.appendChild(plus);

var minus = document.createElement("button");
minus.style.borderWidth = "1px";
minus.style.borderRadius = "0 20px 20px 0";
minus.innerHTML = "➖";
minus.id = "minus";
minus.style.cursor = "pointer";
minus.style.fontSize = "18px";
zoomDiv.appendChild(minus);

var ayats = document.querySelectorAll("section p");

plus.addEventListener("click", function () {
  for (var i = 0; i < ayats.length; i++) {
    var fsize = parseInt(window.getComputedStyle(ayats[i]).fontSize);
    console.log(fsize);
    ayats[i].style.fontSize = fsize + 4 + "px";
  }
});
minus.addEventListener("click", function () {
  for (var i = 0; i < ayats.length; i++) {
    var fsize = parseInt(window.getComputedStyle(ayats[i]).fontSize);
    console.log(fsize);
    ayats[i].style.fontSize = fsize - 4 + "px";
  }
});

// Menu list toggle function
function toggleOptions(element) {
  element.classList.toggle("active");
  const parentListItem = element.parentNode;
  const nestedOptions = parentListItem.querySelector(".nested-options");
  nestedOptions.classList.toggle("active");
}
