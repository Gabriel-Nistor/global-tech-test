const url = 'https://75750e17-4c6f-43f1-9a65-e4290c99700a.mock.pstmn.io/stations';
const radioList = document.getElementById('radioList');

async function app() {

    const response = await fetch(url)
    const radioObject = await response.json()
    radioObject.forEach(async (station) => {
        const link = await getStreamUrl(station.slug)
        const listItem = createRadioListItem(link.logo, link.name, link.tagline, link.streamUrl)
        radioList.appendChild(listItem)
    })
}

async function getStreamUrl(slug) {

    const response = await fetch(`${url}/${slug}`)
    const link = await response.json()
    return link
}

// Unit test: check if there is a parent and an array of children;
// check that the parent contains at least one child
function append(parent, children = []) {
    children.forEach((child) => {
        parent.appendChild(child)
    })
}

// Unit test: check that the element is created;
// check if the elements are receiving attributes / classes / strings
function createNewElement(nodeName, attributes = [], classString, text = '') {

    const newElement = document.createElement(nodeName ?? 'div')
    newElement.innerText = text
    newElement.className = classString ?? ''

    attributes.forEach((att) => {
        newElement.setAttribute(att[0], att[1])
    })

    return newElement
}

// Unit test: check that the elements are actually returned
// check if a a text element has text
// check if an img element has a src and an alt attribute
// check if a div has a css class name
// check if the anchor element has a link, a target and a title attribute
function createRadioListItem(logo, name, tagline, link) {

    const newListElement = createNewElement('li', [], 'radio-station');
    const newImgElement = createNewElement('img', [['src', logo], ['alt', name]]);
    const newTextSectionElement = createNewElement('div', [], 'list-text-section');
    const newH2Element = createNewElement('h2', [], '', name);
    const newH3Element = createNewElement('h3', [], '', tagline);
    const newAnchorElement = createNewElement('a', [['href', link], ['target', '_blank'], ['title', `Play ${name}`]])

    append(newTextSectionElement, [newH2Element, newH3Element])
    append(newListElement, [newImgElement, newTextSectionElement, newAnchorElement])

    return newListElement
}

app();