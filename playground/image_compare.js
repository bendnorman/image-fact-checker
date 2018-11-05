const resemble = require('resemblejs');

var request = require('request').defaults({
    encoding: null
});

const compare = require("resemblejs").compare;

request.get('https://us-east-1.tchyn.io/snopes-production/uploads/2018/11/billboard.jpg?resize=865%2C452', function(err, res, body) {
    
    request.get('https://pbs.twimg.com/media/DrIliShUwAAoXIr.jpg', function(err, res, body1) {
        
        getDiff(body, body1);

    });


});


function getDiff(image1, image2) {
    const options = {scaleToSameSize: true, ignore: "antialiasing"};
    
    compare(image1, image2, options, function(err, data) {
        if (err) {
            console.log("An error!");
        } else {
            console.log(data);
        }
    });
}
