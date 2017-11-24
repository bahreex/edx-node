const http = require("http");

const postData = JSON.stringify({foo:"bar"});

const options = {
    hostname: 'mockbin.com',
    port: 80,
    path: '/request?foo=bar&foo=baz',
    method: "POST",
    headers: {
        'Content-Type':'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
}

const req = http.request(options, (res)=>{
    res.on("data", (chunk)=>{
        console.log('Body::',chunk.toString())
    })

    res.on("end", ()=>{
        console.log("No more data in response");
    })

})

req.on("error", (error)=>{console.log("Got Error: ${error.message}")})

req.write(postData);
req.end();