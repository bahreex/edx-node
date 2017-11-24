const https = require('https');
const url = "https://gist.githubusercontent.com/azat-co/a3b93807d89fd5f98ba7829f0557e266/raw/43adc16c256ec52264c2d0bc0251369faf02a3e2/gistfile1.txt";

https.get(url, (response)=>{
    
    let rawData = "";
    var c = 0;
    var csize = [];

    response.on("data", (chunk)=>{ 
        
        csize[c] = chunk.length;
        c++;

        rawData += chunk;
})
    response.on("end", ()=>{
        
        console.log("Chunks Counts received = " + c);
        
        for (var i=0; i<csize.length; i++)
        {
            console.log("Chunks data received = " + csize[i]);
        }

        try
        {
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
            console.log("Super Value:::" + parsedData[99].first_name);
            
        }
        catch (e)
        {
            console.error(e.message);
        }
})

}).on("error", (error)=>console.log(error.message))