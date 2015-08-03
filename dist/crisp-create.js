/*! OpenCrisp CreateJS - v0.1.0 - 2015-08-03
* http://opencrisp.wca.at
* Copyright (c) 2015 Fabian Schmid; Licensed MIT */
(function($$) {

    /**
     * @typedef {external:Object} util.create.newBase
     */


    /**
     * left/right seperator for option properties
     * 
     * @private
     * @memberOf util.create
     * @type {external:String}
     * 
     * @example
     * defaultSeperator; // '__'
     */
    var defaultSeperator = "__";

    /**
     * global cache for utilCreate(once)
     * @private
     * @type {external:Object}
     * @memberOf util.create
     */
    var once = {};


    /**
     * check for existing prototype or propertie
     * 
     * @private
     * @memberOf util.create
     * 
     * @param  {external:String}        name  [description]
     * 
     * @this   {util.create.newBase}
     * @throws {Error} If [this.prototype[ name ] && name !== "toString"]
     * @throws {Error} If [this.hasOwnProperty( name )]
     */
    function inheritTest( name ) {
        if ( this.prototype[ name ] && name !== "toString" ) {
            // console.crisp("error", "Redefined prototype " + name );
            throw new Error("Redefined prototype " + name );
        }
        else if ( this.hasOwnProperty( name ) ) {
            // console.crisp("error", "Can't overwride prototype." + name + " with property!");
            throw new Error("Can't overwride prototype." + name + " with property!");
        }
    }




    function utilPrototypeUnit( option, name ) {
        inheritTest.call( this, name );
        this.prototype[ name ] = option;
    }
    
    function utilPrototypeMultiple( options ) {
        options.xEach({
            self: this,
            success: utilPrototypeUnit
        });
    }

    function utilPrototype( prototypes ) {
        prototypes.xEach({
            self: this,
            success: utilPrototypeMultiple
        });
    }





    /**
     * defineProperty with Crisp style to called object
     * 
     * @private
     * @memberOf util.create
     * 
     * @param  {external:String}            name
     * @param  {util.create.crispProperty}  prop
     *
     * @this   {newBase}
     */
    function utilProperty( name, prop ) {
        var newProp = {};

        if (prop.proEnu !== undefined) {
            newProp.enumerable = prop.proEnu;
        }

        if (prop.proCon !== undefined) {
            newProp.configurable = prop.proCon;
        }

        if (prop.proWri !== undefined) {
            newProp.writable = prop.proWri;
        }

        if (prop.proVal !== undefined) {
            newProp.value = prop.proVal;
        }
        else if (prop.proGet !== undefined || prop.proSet !== undefined) {
            newProp.get = prop.proGet;
            newProp.set = prop.proSet;
        }

        Object.defineProperty( this, name, newProp );
    }

    /**
     * @function module:BaseJS.utilProperty
     * @see  util.create.utilProperty
     */
    $$.utilProperty = utilProperty;




    function utilPropertiesUnit( option, name ) {
        utilProperty.call( this, name, option );
    }
    
    function utilPropertiesMultiple( options ) {
        options.xEach({
            self: this,
            success: utilPropertiesUnit
        });
    }

    function utilProperties( properties ) {
        properties.xEach({
            self: this,
            success: utilPropertiesMultiple
        });
    }





    function utilOptionsUnit( option, name ) {
        utilProperty.call( this, optionName( name ), option );
    }
    
    function utilOptionsMultiple( options ) {
        options.xEach({
            self: this,
            success: utilOptionsUnit
        });
    }

    function utilOptions( options ) {
        options.xEach({
            self: this,
            success: utilOptionsMultiple
        });
    }









    function optionName( name ) {
        return defaultSeperator.concat( name, defaultSeperator );
    }

    
    function optionValue( name, value ) {
        if (!this.hasOwnProperty(name)) {
            // console.crisp("error", "option "+name+" Property not set in Object!");
            throw new Error("set Option: Property '" + name + "' not defined!");
        }
        
        // console.crisp("debug", "insert/update option "+name+" in Object ");
        this[ name ] = value;

        return this;
    }


    function optionListUnit( item, name ) {
        optionValue.call( this, optionName( name ), item );
    }

    function optionListMultiple( options ) {
        options.xEach({
            self: this,
            success: optionListUnit
        });
    }

    function optionList( options ) {
        [].xAdd( options ).xEach({
            self: this,
            success: optionListMultiple
        });

        return this;
    }

    function optionIni( name, option ) {
        var value = this[ name ];

        if ( value === undefined ) {
            // console.crisp("debug", "option "+ name +" not defined");

            if ( typeof option.preset === "function" ) {
                // console.crisp("debug", "set option.value "+name+" off default-function: " + option.default.toString() );
                value = option.preset.call( this );
            }
            else {
                // console.crisp("debug", "set option.value "+name+" off default: " + option.default.toString() );
                value = option.preset;
            }

            if ( option.insert ) {
                optionValue.call( this, name, value );
            }
        }

        return value;
    }



    function objDataEach( item, name ) {
        var data = this.data[name];

        if ( data !== undefined ) {
            this.obj[name] = data;
        }
    }


    /**
     * {@link http://opencrisp.wca.at/tutorials/CreateJS_test.html|use CreateJS}
     * 
     * @module CreateJS
     */
    $$.ns('util.create').prototypes = {

        /**
         * initialice newBase
         * 
         * @param  {external:Object} option
         * @return {newBase}
         *
         * @memberOf module:CreateJS.prototype
         */
        objIni: function( option ) {
            var create = this._('create');

            utilOptions.call( this, create.options );
            utilProperties.call( this, create.properties );

            return optionList.call( this, option );
        },

        /**
         * managed newBase options
         * 
         * @param  {external:String|external:Object}    option
         * @param  {external:String}                    [option.name]
         * @param  {AnyItem|Funtion}                    [option.preset]   if option.name not defined on newBase return preset (execute Function)
         * @param  {external:Boolean}                   [option.insert]   insert option.preset on newBase if option.name not defined
         * @param  {external:Number}                    [option.before]
         * @param  {external:Number}                    [option.after]
         * 
         * @this {newBase}
         * @return {*}
         *
         * @memberOf module:CreateJS.prototype
         */
        _: function( option ) {
            var value, name;

            if ( $$.isType( option, 'String' ) ) {
                return this[ optionName( option ) ];
            }

            name = optionName( option.name );
            value = optionIni.call( this, name, option );

            if ( option.after ) {
                // console.crisp("addAfter option "+name+" += "+ option.after );
                optionValue.call( this, name, value + option.after );
            }

            if ( option.before ) {
                // console.crisp("addBefore option "+name+" += "+ option.before );
                optionValue.call( this, name, value = value + option.before );
            }

            return value;
        },

        /**
         * set single option
         * 
         * @param  {external:String}    name
         * @param  {*}                  value
         * 
         * @this {newBase}
         * @return {newBase}
         *
         * @memberOf module:CreateJS.prototype
         */
        objSet: function( name, value ) {
            return optionValue.call( this, optionName( name ), value );
        },

        /**
         * initialice newBase with data Object
         * 
         * @param  {*}                  data
         * 
         * @this {newBase}
         * @return {newBase}
         *
         * @memberOf module:CreateJS.prototype
         */
        objData: function( data ) {
            return this.xEach({
                self: {
                    obj: this,
                    data: data
                },
                success: objDataEach
            });
        },

        /**
         * clone newBase without data
         * 
         * @this {newBase}
         * @return {newBase} Clone of newBase
         *
         * @memberOf module:CreateJS.prototype
         * 
         * @tutorial {@link http://opencrisp.wca.at/tutorials/CreateJS_test.html#objClone}
         * 
         */
        objClone: function() {
            function Clone() {}
            Clone.prototype = this;
            return new Clone();
        }

    };





    function createNsEach( item ) {
        var namespace = $$.ns( item );
        this.op.xAdd( namespace.options );
        this.pp.xAdd( namespace.properties );
        this.pt.xAdd( namespace.prototypes );
    }


    /**
     * Design Pattern of JavaScript Classes
     *
     * @function module:BaseJS.utilCreate
     * 
     * @param  {external:Object}      [option]
     * @param  {external:Function}    [option.base={@link external:Function}]
     * @param  {external:String}      [option.once]                            unique name of temporary created object
     * @param  {...external:String}   [option.ns]
     * @param  {...external:Object}   [option.properties]
     * @param  {...external:Object}   [option.prototypes]
     * 
     * @return {object}
     *
     * @tutorial {@link http://opencrisp.wca.at/tutorials/CreateJS_test.html#utilCreate}
     * 
     * @example
     * var myObject = Crisp.utilCreate().objIni();
     *
     * @example
     * var myObject = Crisp.utilCreate({
     *     options: {
     *         a: { proWri: true }
     *     },
     *     properties: {
     *         b: {
     *             proEnu: true,
     *             proGet: function() { return 'B'; }
     *         }
     *     },
     *     prototypes: {
     *         c: function() { return 'C'; }
     *     },
     * }).objIni({ a: 'A' });
     * 
     * myObject._('a'); // 'A'
     * myObject.b;      // 'B'
     * myObject.c();    // 'C'
     * 
     * myObject.xTo();  // '{"b":"B"}'
     */
    $$.utilCreate = function( option ) {
        var Base, inherit, object;

        option = option || {};

        if ( once[ option.once ] ) {
            return once[ option.once ].objClone();
        }
        
        Base = option.base || function() {};

        inherit = {
            op: [],     // multiple inherit options 
            pp: [],     // multiple inherit properties
            pt: []      // multiple inherit prototypes
        };

        ['util.create'].xAdd( option.ns ).xEach({
            self: inherit,
            success: createNsEach
        });

        utilPrototype.call( Base, inherit.pt.xAdd( option.prototypes ) );

        object = new Base();

        utilProperty.call( object, optionName('create'), { proVal: {
            options:    inherit.op.xAdd( option.options ),
            properties: inherit.pp.xAdd( option.properties )
        }});

        if ( option.once ) {
            once[ option.once ] = object;
            return object.objClone();
        }

        return object;
    };

}(Crisp));