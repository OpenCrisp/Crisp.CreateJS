# Crisp.CreateJS
represent a Class design pattern for JavaScript included multible namespaces, options and functions

[![Build Status](https://travis-ci.org/OpenCrisp/Crisp.CreateJS.svg)](https://travis-ci.org/OpenCrisp/Crisp.CreateJS)
[![NPM Downloads](https://img.shields.io/npm/dm/crisp-create.svg)](https://www.npmjs.com/package/crisp-create)
[![NPM Version](https://img.shields.io/npm/v/crisp-create.svg)](https://www.npmjs.com/package/crisp-create)

```javascript
// create object
var myObject = Crisp.utilCreate();

// initialice object
myObject.objIni();

// get object option
myObject._('myoption');

// clone object without data
var cloneObject = myObject.objClone();
```

## Index Table
  * [Getting Started](#getting-started)
    * [Server-Nodes](#server-nodes)
    * [Web-Clients](#web-clients)
    * [Development](#development)
  * [Usage utilCreate()](#usage-utilcreate)
    * [ns](#ns)
    * [options](#options)
    * [prototypes](#prototypes)
    * [properties](#properties)
  * [utilCreate object function](#utilcreate-function)
    * [.objIni()](#)
    * [._()](#)
    * [.objSet()](#)
    * [.objData()](#)
    * [.objClone()](#)
    * [.objNs()](#)
  * [Links](#links)

## Getting Started

### Server-Nodes
Use [Node Package Manager (npm)](https://www.npmjs.org) to install `crisp-create` for [Node.js](https://nodejs.org/) and [io.js](https://iojs.org/)

    $ npm install crisp-create

```javascript
// use package
require("crisp-create");
```

or use the [OpenCrisp UtilJS](https://github.com/OpenCrisp/Crisp.UtilJS) wraper

    $ npm install crisp-util

```javascript
// use package
require("crisp-util");
```

### Web-Clients
Use [Bower](http://bower.io/) to install `crisp-create` for Browsers APP's and other front-end workflows.

    $ bower install crisp-create

```html
<!-- use package -->
<script type="text/javascript" src="dist/crisp-create.min.js"></script>
```

or use the [OpenCrisp UtilJS](https://github.com/OpenCrisp/Crisp.UtilJS) wraper

    $ bower install crisp-util

```html
<!-- use package -->
<script type="text/javascript" src="dist/crisp-util.min.js"></script>
```

### Development
Use [Git](https://git-scm.com/) to clone [Crisp.CreateJS from GitHub](https://github.com/OpenCrisp/Crisp.CreateJS) to develop the repository with [Grunt](http://gruntjs.com/)

    # Clone:
    $ git clone https://github.com/OpenCrisp/Crisp.CreateJS.git
    
    # Build: test, concat, test, minify, test
    $ grunt
    
    # Test: original sourcecode for developer (included in build)
    $ grunt t
    
    # Run all test-scripts on Unix
    $ sh grunt-tests.sh

## Usage utilCreate()
How to use `utilCreate( option )` function in JavaScript.

```javascript
var myObject = Crisp.utilCreate({
    ns: []
    options: {},
    prototypes: {},
    properties: {}
});
```

### ns
```javascript
var myObject = Crisp.utilCreate({
    ns: ['util.event']
}).objIni();

myObject.objNs('util.event');   // true
myObject.xTo();                 // '{}'
```

### options
```javascript
var myObject = Crisp.utilCreate({
    options: {
        a: { proWri: true }
    }
}).objIni({ a: 'A' });

myObject._('a'); // 'A'
myObject.xTo();  // '{}'
```

### properties
```javascript
var myObject = Crisp.utilCreate({
    properties: {
        b: {
            proEnu: true,
            proGet: function() { return 'B'; }
        }
    }
}).objIni();

myObject.b;      // 'B'
myObject.xTo();  // '{"b":"B"}'
```

### prototypes
```javascript
var myObject = Crisp.utilCreate({
    prototypes: {
        c: function() { return 'C'; }
    }
}).objIni();

myObject.c();    // 'C'
myObject.xTo();  // '{}'
```

## utilCreate object function

### .objIni()
How to use `.objIni( option )` function on utilCreate object.

```javascript
var myObject = Crisp.utilCreate({
  options: {
    test: {}
  }
}).objIni({
    test: 0
});

myObject._('test');     // 0
```

### ._()
How to use `._( name OR option )` function on utilCreate object.

```javascript
// get the value of `test`
myObject._('test');
// or with option
myObject._({ name: 'test' });

// returns preset if option is undefined
myObject._({ name: 'test', preset: 0 });
// or preset of function
myObject._({ name: 'test', preset: function() { return 0; } });

// returns preset if option is undefined and save the value on option
myObject._({ name: 'test', insert: true, preset: 0 });
// or preset of function
myObject._({ name: 'test', insert: true, preset: function() { return 0; } });
```

### .objSet()
How to use `.objSet( name, value )` function on utilCreate object.

```javascript
myObject.objSet('test', 1 );
```

### .objData()
How to use `.objData( option )` function on utilCreate object.

```javascript
myObject.objData({
    a: 'A'
});

myObject.a;  // 'A'
```

### .objClone()
How to use `.objClone()` function on utilCreate object.

```javascript
var cloneObject = myObject.objClone();
```

### .objNs()
How to use `.objNs( name )` function on utilCreate object.

```javascript
myObject.objNs('util.create');  // true
```

> 'util.create' is an default namespace


## Links
 * [Repository](https://github.com/OpenCrisp/Crisp.CreateJS)
 * [More examples](http://opencrisp.wca.at/tutorials/CreateJS_test.html)
 * [Module documentation](http://opencrisp.wca.at/docs/module-CreateJS.html)
 * [Node package manager](https://www.npmjs.com/package/crisp-create)
 * [Version monitoring](https://www.versioneye.com/nodejs/crisp-create)
 * [Build history](https://travis-ci.org/OpenCrisp/Crisp.CreateJS)
