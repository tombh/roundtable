#The Round Table
A node.js socket server to coordinate timing (and perhaps automation) of /r/thebutton pushes

##Usage
Simply paste the following code into your address bar. You can even save it as a bookmarklet

```
javascript:(function (){document.getElementsByTagName('head')[0].appendChild(document.createElement('script')).src='http://theroundtable.herokuapp.com/bookmarklet.js?'+Math.random();}());
```

In development you will need this bookmarklet instead:
```
javascript:(function (){document.getElementsByTagName('head')[0].appendChild(document.createElement('script')).src='http://localhost:5000/bookmarklet.js?'+Math.random();}());
```
