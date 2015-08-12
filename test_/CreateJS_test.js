
// [doc of CreateJS](http://opencrisp.wca.at/docs/module-CreateJS.html)<br />
// [doc of utilCreate](http://opencrisp.wca.at/docs/module-BaseJS.html#utilCreate)

// # utilCreate
exports['utilCreate'] = function(assert) {
    var done = assert.done || assert.async();
    assert.expect(2);
    
    var myObject = Crisp.utilCreate().objIni();
    assert.ok( myObject instanceof Object );
    assert.deepEqual( myObject.xTo(), '{}' );

    done();
};


// ## option.base
exports['utilCreate option.base'] = function(assert) {
    var done = assert.done || assert.async();
    assert.expect(2);

    function Base() {}
    
    var myObject = Crisp.utilCreate({
        base: Base
    }).objIni();

    assert.ok( myObject instanceof Base );
    assert.deepEqual( myObject.xTo(), '{}' );

    done();
};

// ## option.once
exports['utilCreate option.once'] = function(assert) {
    var done = assert.done || assert.async();
    assert.expect(4);

    function Base() {}
    
    var option = {
        base: Base,
        once: 'testUtilCreate01'
    };

    var myObjectA = Crisp.utilCreate( option ).objIni();

    assert.ok( myObjectA instanceof Base );
    assert.deepEqual( myObjectA.xTo(), '{}' );

    var myObjectB = Crisp.utilCreate( option ).objIni();

    assert.ok( myObjectB instanceof Base );
    assert.deepEqual( myObjectB.xTo(), '{}' );

    done();
};


// ## objClone
exports['utilCreate objClone'] = function(assert) {
    var done = assert.done || assert.async();
    assert.expect(2);
    
    var myObject = Crisp.utilCreate().objIni();
    assert.notStrictEqual( myObject, myObject.objClone().objIni() );
    assert.deepEqual( myObject.xTo(), '{}' );

    done();
};


// ## Options
exports['utilCreate options'] = function(assert) {
    var done = assert.done || assert.async();
    assert.expect(3);
    
    var myObject = Crisp.utilCreate({
        options: {
            'a': { proWri: true }
        }
    }).objIni({
        a: 'A'
    });

    assert.ok( myObject.hasOwnProperty('__a__') );
    assert.strictEqual( myObject._('a'), 'A' );
    assert.deepEqual( myObject.xTo(), '{}' );

    done();
};

// ## Properties
exports['utilCreate properties'] = function(assert) {
    var done = assert.done || assert.async();
    assert.expect(3);
    
    var myObject = Crisp.utilCreate({
        properties: {
            'a': {
                proGet: function() {
                    return 'A';
                }
            }
        }
    }).objIni();

    assert.ok( myObject.hasOwnProperty('a') );
    assert.strictEqual( myObject.a, 'A' );
    assert.deepEqual( myObject.xTo(), '{}' );

    done();
};

// ### Properties enumerable
exports['utilCreate properties enumerable'] = function(assert) {
    var done = assert.done || assert.async();
    assert.expect(3);
    
    var myObject = Crisp.utilCreate({
        properties: {
            'a': {
                proEnu: true,
                proGet: function() {
                    return 'A';
                }
            }
        }
    }).objIni();

    assert.ok( myObject.hasOwnProperty('a') );
    assert.strictEqual( myObject.a, 'A' );
    assert.deepEqual( myObject.xTo(), '{"a":"A"}' );

    done();
};

// ## Prototypes
exports['utilCreate prototypes'] = function(assert) {
    var done = assert.done || assert.async();
    assert.expect(3);
    
    var myObject = Crisp.utilCreate({
        prototypes: {
            'a': function() {
                return 'A';
            }
        }
    }).objIni();

    assert.ok( myObject.a instanceof Function );
    assert.strictEqual( myObject.a(), 'A' );
    assert.deepEqual( myObject.xTo(), '{}' );

    done();
};

// ## Inherit
exports['utilCreate inherit'] = function(assert) {
    var done = assert.done || assert.async();
    assert.expect(5);

    Crisp.ns('test.util-create01', {
        options: {
            a: { proWri: true }
        },
        properties: {
            b: {
                proEnu: true,
                proGet: function() { return 'B'; }
            }
        },
        prototypes: {
            c: function() { return 'C'; }
        },
    });
    
    var myObject = Crisp.utilCreate({
        ns: 'test.util-create01'
    }).objIni({ a: 'A' });

    assert.strictEqual( myObject._('a'), 'A' );
    assert.strictEqual( myObject.b, 'B' );
    assert.strictEqual( myObject.c(), 'C' );

    assert.deepEqual( myObject.xTo(), '{"b":"B"}' );

    assert.ok( myObject.objNs('test.util-create01') );

    done();
};

// ## objNs
exports['utilCreate objNs'] = function(assert) {
    var done = assert.done || assert.async();
    assert.expect(1);

    var myObject = Crisp.utilCreate().objIni();

    assert.ok( myObject.objNs('util.create') );

    done();
};
