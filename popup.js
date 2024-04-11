/**
 * Executes when the popup is loaded.
 * Adds event listener to the statusToggle element and sets the initial image based on the stored status.
 */
document.addEventListener('DOMContentLoaded', () => {
    const statusToggle = document.getElementById('statusToggle');
    statusToggle.addEventListener('change', (e) => {
        let status = e.currentTarget.checked;
        chrome.storage.local.set({ "status": status });
        reloadTab();
        setImage(status);
    });
    chrome.storage.local.get(["status"], (status) => {
        status = status?.status ?? true;
        statusToggle.checked = status;
        setImage(status);
    });
});

/**
 * Sets the image source based on the given status.
 * @param {boolean} status - The status indicating whether to set the image to "backgroundON.jpg" or "backgroundOFF.jpg".
 */
function setImage(status){
    const statusImage = document.getElementById("statusImage");
    console.log(statusImage)
    if(status){
        statusImage.src = "/images/backgroundON.jpg";
    }else {
        statusImage.src = "/images/backgroundOFF.jpg";
    }
}

/**
 * Reloads the specified tab or the current tab if no id is provided.
 * @param {number} id - The id of the tab to reload.
 */
const reloadTab = (id) => {
    if(id){
        chrome.tabs.reload(tab);
    } else {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, ([tab]) => {
            chrome.tabs.reload(tab.id);
        });
    }
}