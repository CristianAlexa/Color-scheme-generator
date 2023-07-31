class App {
  constructor() {
    this.colorInputEl = document.getElementById("color-input");
    this.colorModeEl = document.getElementById("color-mode");
    this.getColorsBtn = document.getElementById("get-btn");
    this.colorsResultEl = document.getElementById("colors-result");
    this.API = "https://www.thecolorapi.com";

    this.addEventListeners();
  }

  addEventListeners() {
    this.getColorsBtn.addEventListener("click", () => {
      const color = this.colorInputEl.value.slice(1);
      const scheme = this.colorModeEl.value;
      const APIUrl =
        this.API + "/scheme?hex=" + color + "&mode=" + scheme + "&count=6";
      this.getColorsData(APIUrl);
    });
  }

  getColorsData(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => this.getColorDataHtml(data))
      .catch((err) => this.handleError(err));
  }

  getColorDataHtml(data) {
    const colorsArray = data.colors;
    let colorsResultHtml = "";
    colorsArray.forEach((color) => {
      const colorResponse = color.hex.value;
      colorsResultHtml += `
            <li class="colors" id="${colorResponse}">
            <div class="color" style="background-color: ${colorResponse}"></div>
            <h3 class="color-code">${colorResponse}</h3>
            </li>
      `;
    });
    this.colorsResultEl.innerHTML = colorsResultHtml;
  }

  handleError() {
    let colorsResultHtml = `
            <li class="colors" id="error">
            <h2 class="color-code">Error: Cannot read property of 'scheme type'.</h2>
            </li>
    `;
    this.colorsResultEl.innerHTML = colorsResultHtml;
  }
}

new App();
