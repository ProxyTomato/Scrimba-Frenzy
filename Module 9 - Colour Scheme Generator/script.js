/* This is to resolve unresolved variable issues*/
/**
 * @typedef {Object} Hex
 * @property {string} value Full hex value including `#`
 * @property {string} clean Hex value without `#`
 */

/**
 * @typedef {Object} Color
 * @property {Hex} hex
 */

/**
 * @typedef {Object} _links
 * @property {string} self current request endpoint e.g. /scheme?hex=F55A5A&mode=monochrome&count=5
 * @property {Object} schemes all request endpoints for available schemes
 */

/**
 * @typedef {Object} ColorApiResponse
 * @property {Object} _links
 * @property {Color[]} colors
 */

const colourDisplay = document.getElementById("colour-display");
const schemeInput = document.getElementById("scheme-input");
const colourPicker = document.getElementById("colour-picker");
const snackerBar = document.getElementById("snackbar")
let snackBarTimeout;

/**
 * Fetches available colour schemes from The Colour API
 * and populates the scheme selection input with
 * dynamically generated `<option>` elements.
 *
 * @returns {void}
 */
const renderColorInput = () => {
    fetch(
        `https://www.thecolorapi.com/scheme?hex=FF0`,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
        .then(response => response.json())
        .then(
            /** @param {ColorApiResponse} data */
            (data) => {
            Object.entries(data._links.schemes).forEach(([scheme]) => {
                let option = document.createElement("option");
                option.value = scheme;
                option.text = scheme;
                schemeInput.appendChild(option);
            })
        })
}

/**
 * Determine if white or black text provides a better contrast to given background colour.
 *
 * @param hex
 *  A 6-character hexadecimal colour string without the leading `#` e.g. `000000` or `FF0`
 * @returns {string} `
 *  #000000` for light background or, `#FFFFFF` for dark background
 */
const getContrastColor = (hex) => {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#ffffff";
}

/**
 * Fetches a colour palette from The Color API using the currently selected base colour and scheme mode,
 * then renders the resulting colours into the `#colour-display` element.
 *
 * @returns {void}
 */
const renderColourDisplay = () => {
    const hexCode = colourPicker.value.slice(1)
    const scheme = schemeInput.value
    const tempColourDisplay = document.createElement("div")
    fetch(
        `https://www.thecolorapi.com/scheme?hex=${hexCode}&mode=${scheme}`, {
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then(res => res.json())
        .then(/** @param {ColorApiResponse} data */  data => {
            data.colors.forEach(color => {
                const div = document.createElement("div");
                div.style.backgroundColor = color.hex.value;
                div.classList.add("colour-block")
                div.dataset.colour = color.hex.value;

                let h1 = document.createElement("h1");
                h1.innerText = color.hex.value;
                h1.style.color = getContrastColor(color.hex.clean);
                h1.dataset.colour = color.hex.value;
                div.appendChild(h1);

                tempColourDisplay.appendChild(div)
            })
            return tempColourDisplay.innerHTML;
        }).then(html => colourDisplay.innerHTML = html)
}

/**
 * Shows snackbar to confirm the colour hex code is copied.
 *
 * @Returns {void}
 */
const activateSnackbar = () => {
    snackerBar.classList.add("active");
    clearTimeout(snackBarTimeout);
    snackBarTimeout = setTimeout(
        () => snackerBar.classList.remove("active"),
        1500
    )
}

/**
 * Copies the provided text to the user's clipboard using the deprecated
 * `document.execCommand('copy')` fallback method.
 *
 * @param {string} text - The text value to copy to the clipboard.
 * @returns {void}
 */
const deprecatedCopyToClipboard = (text) => {
    let textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.textContent = text;
    textarea.select()
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

/**
 * Copies the provided text to the user's clipboard.
 *
 * @param {string} text - The text value to copy to the clipboard.
 * @returns {void}
 */
const copyToClipboard = (text) => {
    if(navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(() => {}, () => deprecatedCopyToClipboard(text));
    } else {
        deprecatedCopyToClipboard(text);
    }
}

document.addEventListener("submit", (event) => {
    event.preventDefault()
    renderColourDisplay()
})

document.addEventListener("click", (event) => {
    if (event.target.dataset.colour) {
        copyToClipboard(event.target.dataset.colour)
        activateSnackbar()
    }
})

renderColorInput()
renderColourDisplay()