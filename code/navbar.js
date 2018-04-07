function navClicked(identifier) {
    /**
     * Disactivating the current activated navbar and section, and activating the destinated navbar and section.
     * @type {string}
     */
    const clickedName = identifier.getAttribute("data-option");

    removeActivated();

    addActivated(clickedName);

}

function removeActivated() {
    /**
     * Removes the activated class from activated navbar and section.
     * @type {HTMLCollectionOf<Element>}
     */
    const activatedSection = document.getElementsByClassName("activeSection");
    activatedSection[0].classList.remove("activeSection");
}

function addActivated(clickedName) {
    /**
     * Adding to the destinated section and nvabar activated class.
     * @type {Element | null}
     */
    const newActivatedSection = document.getElementById("main").querySelector(`#${clickedName}Section`);
    newActivatedSection.classList.add("activeSection");
    // var newActivatedNav = document.getElementsByClassName(`${clickedName}Nav`)[0];
    // newActivatedNav.classList.add("activeNav");

    stopGame();

}

function moveTo(destination) {

    removeActivated();

    addActivated(destination);

}
