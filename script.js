const DragArea = document.querySelector(".container"),
  DragText = DragArea.querySelector("h3"),
  button = DragArea.querySelector("button"),
  input = DragArea.querySelector("input");

let MyFiles;

button.onclick = () => {
  input.click();
};
input.addEventListener("change", function () {
  MyFiles = this.files[0];
  DragArea.classList.add("active");
  ShowMe();
});

DragArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  DragText.textContent = "Release to Upload File";
  DragArea.classList.add("active");
});

DragArea.addEventListener("dragleave", (event) => {
  event.preventDefault();
  DragText.textContent = "Drag & Drop";
  DragArea.classList.remove("active");
});

DragArea.addEventListener("drop", (event) => {
  event.preventDefault();
  MyFiles = event.dataTransfer.files[0];
  ShowMe();
});

function ShowMe() {
  let fileType = MyFiles.type;
  let validExt = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
  if (validExt.includes(fileType)) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let imgUrl = fileReader.result;
      let img = `<img src="${imgUrl}" alt="">`;
      DragArea.innerHTML = img;
    };
    fileReader.readAsDataURL(MyFiles);
  } else {
    alert("This file is not valid, Please enter the valid image");
    DragText.textContent = "Drag & Drop";
    DragArea.classList.remove("active");
  }
}
