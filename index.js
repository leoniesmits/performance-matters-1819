// Third party modules
const express = require('express')
const request = require('request')

// Create new express app in const app
const app = express()

// Add a config object and define port
const config = {
    port: 3000
}

// const router = require('./router/router.js')

// Link templating engine to my express app
app.set('view engine', 'ejs');

// Tell express to use a 'static' folder
// If the url matches a file it will send that file
// Sending something (responding) ends the response cycle
app.use(express.static('public'))

// Create a route for home
app.get('/', function (req, res) {
    res.send('Hello')
})

// Create a route for overview page
app.get('/posts', function(req, res) {
	request('https://api.nytimes.com/svc/archive/v1/2019/3.json?api-key=r8QZbMEAyISGNhszSuglD4akcNUbYeAK', {json: true}, function (err, requestRes, body){
		if (err) {
			// We got an error
			res.send(err);
		} else {
            // Render the page using the 'posts' view and our body data
            console.log(body)
            collection.filterData(body);

            // mappen
			res.render('posts', {
				title: 'Posts', // We use this for the page title, see views/partials/head.ejs
				postData: body.response.docs
			});
		}
	});
});

// Create a route for our detail page
app.get('/post/:id', function(req, res) {
	request(`https://api.nytimes.com/svc/archive/v1/2019/3.json?api-key=r8QZbMEAyISGNhszSuglD4akcNUbYeAK`, {json: true}, function (err, requestRes, body){
		if (err) {
			// We got an error
			res.send(err);
		} else {
            // Render the page using the 'post' view and our body data
            console.log(body)
            collection.filterData(body);

            // mappen


			res.render('post', {
				title: `Post ${req.params.id}`, 
				postData: body
			});
		}
	});
});

var collection = {
    data: [],
    filterData: function(data) {
        console.log(data)

        var frontPage = data.response.docs.filter(this.filterByPage);
        var emptyPage = frontPage.filter(this.deleteEmpty);
        this.data = emptyPage;
        collection.mapData(emptyPage);
    },
    filterByPage: function(item) {
        if(item.print_page == "1"){
            return item;
        };
    },
    deleteEmpty: function(item) {
        if(item.headline.main.includes("No Title")) {
            return;
        } else {
            return item;
        }
    },
    mapData: function(data, storyid){
        var self = this;
        collection.data = data.map(function(i) {
            
            var subjectArray = i.keywords.filter(collection.filterSubject);
            return {
                snippet: i.snippet,
                source: i.source,
                main: i.headline.main,
                lead: i.lead_paragraph,
                abstract: i.abstract,
                url: i.web_url,
                subject: subjectArray,
                date: i.pub_date,
                image: i.multimedia[0].url,
                author: i.byline.original,
                id: i._id
            }
           
        });

        // collection.data = templateData;
        template.render(data, storyid)
    },
    filterSubject: function(item) {             
        if (item.name === "subject") {
            return item
        } else {
            return;
        }  
    }
}


app.get('/detail', function (req, res) {
    res.render('detail')
})

app.get('/detail/:storyID', function (req, res) {
    res.render('detail', {
        story: req.params.storyID
    })
})


app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`))


