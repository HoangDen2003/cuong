const ipnFileElement = document.querySelector("input[type=file]");
const resultElement = document.querySelector(".preview");
const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

ipnFileElement.addEventListener("change", function (e) {
  const files = e.target.files;
  const file = files[0];
  const fileType = file["type"];

  if (!validImageTypes.includes(fileType)) {
    resultElement.innerHTML = '<span class="preview-img">Chọn ảnh đi :3</span>';
    return;
  }

  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);

  fileReader.onload = function () {
    const url = fileReader.result;
    resultElement.innerHTML = `<img src="${url}" alt="${file.name}" class="preview-img" />`;
  };
});
