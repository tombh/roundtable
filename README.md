#The Round Table
A node.js socket server to coordinate timing (and perhaps automation) of /r/thebutton pushes

This is a working prototype. The next step is to have a means of telling a single knight when to press.
Or even give the option for the server to press the button their behalf.

If the centralised server knows all the available knights then it can pick just one to press the
button, thus minimising the risk of duplicate clicks.


![](http://i.imgur.com/hWmT6YV.png)

The socket server is currently deployed to Heroku: http://theroundtable.herokuapp.com

##Usage
Goto http://reddit.com/r/thebutton and paste the following code into your address bar. You can even save it as a bookmarklet.

```
javascript:(function (){document.getElementsByTagName('head')[0].appendChild(document.createElement('script')).src='http://theroundtable.herokuapp.com/bookmarklet.js?'+Math.random();}());
```

##Contributions
Code, CSS, suggestions all welcome.

In development you will need this bookmarklet instead:
```
javascript:(function (){document.getElementsByTagName('head')[0].appendChild(document.createElement('script')).src='http://localhost:5000/bookmarklet.js?'+Math.random();}());
```

##Disclaimer
This code will never do anything mean to you. Please check the code for yourself.
