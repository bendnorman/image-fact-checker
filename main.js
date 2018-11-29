function factCheck(image) {
    var image_url = image.srcUrl;

    const Http = new XMLHttpRequest();
    const url = 'http://localhost:8080/?image_url=' + image_url;
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = function() {
        if (Http.readyState == XMLHttpRequest.DONE) {
            if (Http.responseText == "None") {
                    if (confirm("This photo is not in our databse. \n \n Click Ok if you would like to report it.")) {
                        var response = window.prompt("Why are you reporting this photo?","My niece goes to that high school and said this happened.");
                        if (response) {
                            alert("Thank you for reporting!")
                        }
                    } 
            }
            else {
                var obj = JSON.parse(Http.responseText);
                var alert_text = "This photo may be " + obj.rating + " \n\nClick Ok to learn why."
                if (confirm(alert_text)) {
                        chrome.tabs.create({url: obj.article_url});
                    } 
            }
        }
    }

}

chrome.contextMenus.create({
    title: "Fact Check",
    contexts: ["image"], // ContextType
    onclick: factCheck // A callback function
});
