react-nl2br
==============

# USAGE

```javascript
const nl2br = require('react-nl2br');
const result = nl2br('aaa\nbbb\nccc\nddd');
console.log(result); // aaa, ReactElement('br'), bbb, ReactElement('br'), ccc, ReactElement('br'), ddd
```

## in jsx

```javascript
const React = require('react');
const nl2br = require('react-nl2br');
var Hello = React.createClass({
  render: function() {
    return (
      <div>Hello {nl2br(this.props.name)}</div>
    );
  }
});
```

# INSTALL

```
$ npm install react-nl2br -S
```
