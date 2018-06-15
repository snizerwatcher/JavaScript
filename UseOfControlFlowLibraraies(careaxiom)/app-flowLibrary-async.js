const http = require("http"),
      url = require("url"),
      port = process.ports || 9090,
      error = { "response":404, "content": {'Content-Type': 'text/html'}, "message":"<b>Error:404</b>\nRequest URL is In-Valid"};

var empty = '{}';
var HttpDispatcher = require("httpdispatcher");
var router = new HttpDispatcher();
var async = require("async");
var request = require('request');
var cheerio = require('cheerio');


function log_message(msg) {

    console.log(msg);

}

function incommingRequest(req, resp) {

    log_message(`Incomming Request URL: ${req.url} ...`);

}

function sendResponse(req, resp, data) {

    if (data!=null) {

        var response = data.response != 404 ? 200:404;
        resp.writeHead(response, data.content);
        resp.write(data.message);
        resp.end();
        log_message("Sending Response to Page ...");

    }

}

function fetchTitle(url, callback) {
    request(url, function (error, response, body) {
        var ret ="";

        if (!error && response.statusCode === 200) {

            var $ = cheerio.load(body);   
            var title = $("head > title").text().trim();
            ret = `<li> ${url} - "${title}" </li>`;           

        } else {
          
            ret = `<li> ${url} - "NO RESPONSE" </li>`;           
        }

        log_message(`URL = ${url}`);            
        log_message(`Title = ${title}`);
        log_message(`${ret}\n`);

        callback("",ret);       

    });

    
}


function process(req, resp, urlList) {

    var list = urlList;
    //Flow Library
    async.map(list, fetchTitle ,function(err, results) {

        var data = { "response":200, "content": {'Content-Type': 'text/html'},
        "message":`<html><head></head><body><h1> Following are the titles of given websites: </h1><ul>${results.join("\n")}</ul></body></html>`
        };
        sendResponse(req, resp, data);
        log_message("URL Request Finish\n************************************");   
           
    });
   
   
}

var reqResp =  function(req, resp) {
 
    var query = url.parse(req.url, true).query;
    
    if(JSON.stringify(query)  != empty) {
        //Control Flow
        async.series([

            function(callback){
                incommingRequest(req, resp);
                callback(null, 'one');
            },
            function(callback){
                router.dispatch(req, resp);
                callback(null, 'two');
            },
            function(callback){
                log_message(query);
                callback(null, 'three');
            }

        ]);  
    
    }
    else {
    
        sendResponse(req, resp, error);
        log_message("In-Valid URL\n");
    
    }     
    
};

const server = http.createServer(reqResp);

router.onGet("/I/want/title/", function(req, resp) {
      
    var query = url.parse(req.url, true).query;
    
    if(JSON.stringify(query) != empty) {
    
        process(req, resp, query.address);
        log_message("************************************\nValid URL Request");
    
    }
    else {

        sendResponse(req, resp, error);
        log_message("In-Valid URL\n");
    }

});

router.onError(function(req, resp) {
   
    sendResponse(req, resp, data);
    log_message("In-Valid URL");

});


server.listen(port,log_message(`Server Started on port "${port}" ...\n************************************`));
