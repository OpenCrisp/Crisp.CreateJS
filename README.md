# Crisp.CreateJS
represent a Class design pattern for JavaScript included multible namespaces, options and functions

[![Build Status](https://travis-ci.org/OpenCrisp/Crisp.CreateJS.svg)](https://travis-ci.org/OpenCrisp/Crisp.CreateJS)
[![NPM Downloads](https://img.shields.io/npm/dm/crisp-create.svg)](https://www.npmjs.com/package/crisp-create)
[![NPM Version](https://img.shields.io/npm/v/crisp-create.svg)](https://www.npmjs.com/package/crisp-create)

What is CRISP? Configuration Result In Simplified Programming

  * Options
  * Properties
  * Prototypes
  * Inherit namespaces
  * Clone Object
  * Once create temporary Base function with inherits

## Index Table

  * [Getting Started](#getting-started)
    * [NodeJS](#nodejs)
    * [Browsers](#browsers)
  * [Usage](#usage)
    * [Options Example](#options-example)
    * [Properties Example](#properties-example)
    * [Prototypes Example](#prototypes-example)
    * [objNs Example](#objns-example)
  * [Links](#links)

## Getting Started

### NodeJS
Use the Node Package Manager (npm) for install crisp-create

    npm install crisp-create

or use all of OpenCrisp Utils

    npm install crisp-util

### Browsers
```html
<script type="text/javascript" src="dist/crisp-create.min.js"></script>
```

## Usage
```javascript
Crisp.utilCreate().objIni();
```

### Options Example
```javascript
var myObject = Crisp.utilCreate({
    options: {
        a: { proWri: true }
    }
}).objIni({ a: 'A' });

myObject._('a'); // 'A'
myObject.xTo();  // '{}'
```

### Properties Example
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

### Prototypes Example
```javascript
var myObject = Crisp.utilCreate({
    prototypes: {
        c: function() { return 'C'; }
    }
}).objIni();

myObject.c();    // 'C'
myObject.xTo();  // '{}'
```

### objNs Example
```javascript
var myObject = Crisp.utilCreate().objIni();
myObject.objNs('util.create');    // true
```
'util.create' is an default namespace


## Links
 * [Online Crisp.CreateJS module Documentation](http://opencrisp.wca.at/docs/module-CreateJS.html)
 * [More Examples on opencrisp.wca.at](http://opencrisp.wca.at/tutorials/CreateJS_test.html)
 * [Repository on GitHub.com](https://github.com/OpenCrisp/Crisp.CreateJS)
 * [npm package on npm.com](https://www.npmjs.com/package/crisp-create)
 * [Build History on Travis-ci.org](https://travis-ci.org/OpenCrisp/Crisp.CreateJS)