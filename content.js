/**
 * Initializes the functionality of the extension.
 * Retrieves the status from local storage and sets up the necessary event listeners.
 */
function init(){
    chrome.storage.local.get(["status"], (status) => {
        status = status?.status ?? true;
        if(status){
            setTimeout(() => {
                setImages();
            }, 1000);
            
            setImages();
            window.onresize = setImages;
        }
    });
}

/**
 * Sets images on videos by adding a markiplier face image overlay.
 */
function setImages(){
    const markImageUrl = chrome.runtime.getURL("images/mark.png");
    const oldMarkImages = document.querySelectorAll(".markImage");
    const videos = document.querySelectorAll("video");

    // Removing old images
    oldMarkImages.forEach(img => {
        img.remove();
    });

    // Adding the markiplier face
    for(const video of videos){
        const rect = video.getBoundingClientRect();
        const { top, left, right } = rect;
        let mark = document.createElement("img");
        mark.src = markImageUrl;
        mark.style.width = video.clientWidth/4 <= right - left ? (right - left)/4 : video.clientWidth/4;
        mark.classList = "markImage";
        mark.style.position = "absolute";
        mark.style.zIndex = "1";
        mark.style.top = `${top}px`;
        mark.style.left = `${left}px`;
        document.body.appendChild(mark);
    }
}

// Initialize the extension
init();

// Listen for message from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message == "urlChanged") init();
});
