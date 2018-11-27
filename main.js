function factCheck(image) {
    var image_url = image.srcUrl;
    var url_one = 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/46243088_10218053222152064_2538042736670408704_n.jpg?_nc_cat=104&_nc_ht=scontent-lga3-1.xx&oh=7d7def54bc52abb12bc3783a8d2a077e&oe=5CB05F60'
    var snopes_one = 'https://www.snopes.com/fact-check/obama-in-cemetery-on-veterans-day/'

    var url_two = 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/46522554_1154606368050576_2750666991034433536_n.jpg?_nc_cat=1&_nc_ht=scontent-lga3-1.xx&oh=39b7b2f08f1e7917a7953a2220a465da&oe=5C7743E7'

    if (image_url == url_one) {
        if (confirm("This photo is Miscaptionsed \n \n Click Ok to learn why.")) {
            chrome.tabs.create({url: snopes_one});
        } 
    }
    
    if (image_url == url_two) {
        if (confirm("This photo is not in our databse. \n \n Click Ok if you would like to report it.")) {
            var response = window.prompt("Why are you reporting this photo?","I don't think he ever smoked weed in space.");
            if (response) {
                alert("Thank you for reporting!")
            }
        } 
        

    }
}

chrome.contextMenus.create({
    title: "Fact Check",
    contexts: ["image"], // ContextType
    onclick: factCheck // A callback function
});
