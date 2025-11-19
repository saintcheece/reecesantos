function smartBack() {
    if (document.referrer !== "") {
        history.back();
    } else {
        window.location.href = "../../index.html";
    }
}