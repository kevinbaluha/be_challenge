var express = require('express');
var Client = require('node-rest-client').Client;
var app = express();

// registering remote methods 
//client.registerMethod("jsonMethod", "http://remote.site/rest/json/method", "GET");
// 
//client.methods.jsonMethod(function (data, response) {
//// parsed response body as js object 
//console.log(data);
//// raw response 
//console.log(response);
//});

app.get('/terms/:tid/longest-preview-media-url', function (req, res) {
    let client = new Client();
    var args = {
        path: { tid: req.params.tid },
        headers: { "Content-Type": "application/json" }
        };
    let url = 'http://d6api.gaia.com/vocabulary/1/${tid}';
    console.log(url);
    client.get(url, args, function (data, response) {
        console.log(data);
        let item = data.response.terms.term[0];
        
        let c2 = new Client();
        let a2 = {
            path: { tid: item.$.tid },
            headers: { "Content-Type": "application/json" }
            };

        let u2 = 'http://d6api.gaia.com/videos/term/${tid}';

        console.log(item.$.tid);
        let answer = { "bcHLS": "", "titleNid": -1,"previewNid": -1, "previewDuration": -1 };
        c2.get(u2, a2, function (d2, r2) {
            //console.log(d2.response);
            d2.response.titles.title.forEach(function (title,t_idx,a) {
                if (title.preview == undefined || title.preview.$ == undefined)  {
                    return;
                    }
                let f = title.preview.$;
                answer.titleNid = title.$.nid;
                answer.featureNid = title.feature.nid;
                if (f.duration != undefined && parseInt(answer.previewDuration) < parseInt(f.duration) ) {
                    answer.index = t_idx; 
                    answer.previewNid = f.nid;
                    answer.previewDuration = f.duration;
                    } 
                });

            console.log(JSON.stringify(d2.response.titles.title[answer.index]));
            let c3 = new Client();
            let a3 = {
                path: answer,
                headers: { "Content-Type": "application/json" }
                };

            let u3 = 'http://d6api.gaia.com/media/${previewNid}';
            c3.get(u3, a3, function (d3, r3) {
                answer.bcHLS = d3.response.mediaUrls.$.bcHLS;
                res.send(answer);
                });
            });
        });

    // 'http://d6api.gaia.com/videos/term/' + req.params.tid 
    //

    //res.send('Hello World');
    })

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
    })
