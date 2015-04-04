#The Round Table
A node.js socket server to coordinate timing (and perhaps automation) of /r/thebutton pushes

This is a working prototype. The next step is to have a means of telling a single knight when to press.
Or even give the option for the server to press the button their behalf.

If the centralised server knows all the available knights then it can pick just one to press the
button, thus minimising the risk of duplicate clicks.

The socket server is currently deployed to Heroku: http://theroundtable.herokuapp.com

##Usage
Add this code as a bookmark:
```
javascript:(function (){document.getElementsByTagName('head')[0].appendChild(document.createElement('script')).src='http://theroundtable.herokuapp.com/bookmarklet.js?'+Math.random();}());
```
Then goto http://reddit.com/r/thebutton and click the bookmark. Alternatively you can just go to
The Button page and paste the code directly into the address bar. You should see something like the following:

![](http://i.imgur.com/hWmT6YV.png)

##Contributions
Code, CSS, suggestions all welcome.

In development you will need this bookmarklet instead:
```
javascript:(function (){document.getElementsByTagName('head')[0].appendChild(document.createElement('script')).src='http://localhost:5000/bookmarklet.js?'+Math.random();}());
```

##Disclaimer
This code will never do anything mean to you. But please do check the code for yourself.
