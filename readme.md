# jquery-keypress-log

> Simple plugin to store input history.
> The plugin keeps track of keystrokes through events 'keypress'. 
> The log is written only character values (except for control keys).


## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.githubusercontent.com/xtratio/jquery-keypress-log/master/dist/jquery.keypress-log.min.js
[max]: https://raw.githubusercontent.com/xtratio/jquery-keypress-log/master/dist/jquery.keypress-log.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/jquery.keypress-log.min.js"></script>
<script>
  jQuery(function ($) {
    $('inputSelector').keyPressLog(); // replace 'inputSelector' to what you need
  });
</script>
```

Get log data:

```javascript
    var inputLog = $('inputSelector').data('xt.keyPressLog').get();
```
Subscribe to log event:

```javascript
     $("inputSelector").on('logChanged.xt.keyPressLog', function (e, data) {
        console.log(data.log); // write current log data to console
     });
```

## License

MIT © xtratio
