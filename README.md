# Performance Matters 18-19

A subject in the minor Web Development provided by CMD Amsterdam.

## My case

Initially, my assignment was to optimalize the performance of my [WAFS](https://github.com/leoniesmits/wafs/tree/master/app/static) project from last year, which can be found live [here](https://leoniesmits.github.io/wafs/app/static/index.html). This app loads in the New York Times API and prints all headline articles from a particular month. 

## Problems

I'm currently 2 weeks behind. Maybe even 3. Why? I don't know. Making the app word server side was very hard. Right now, the app won't even start and I can't figure out why. 

__That's why I will write in my readme what I would have done, had everything worked as I wanted to.__

## Files

#### Use gzip

Gzip is a command used to compress files. My page loads in a lot of images, so this would reduce the size by a great amount.

All images have the same name as they're printed in the `/posts` page, so I guess using gzip on them would be easy. You can even use gzip on an entire folder with this command: `gzip -r foldername`.

#### Critical CSS 

A rendering path is a series of events that make your website appear on a browser. A critical rendering path is what is absolutely needed to show anything on the browser. In this step, the critical render path is optimized. This makes the load time seconds faster and is the quickest path to faster websites.

For the CSS, a [critical CSS generator](https://jonassebastianohlsson.com/criticalpathcssgenerator/) can be used. When putting my CSS in the above one, the size is dramatically reduced. Besides that, the user now gets to see something when loading the page, instead of a white page.



before | after | 
-----|-------|--------------
4652 characters | 2954 characters |
5kb | 3kb | 

#### Minify JS

For JS there's a [generator](https://jscompress.com/) aswell. Unfortunately I'm very much behind, so I don't know how the client side JS should look like on my page. Instead, I picked the JS file form my [browser technologies project](https://github.com/leoniesmits/browser-technologies-1819). 

## Service worker








