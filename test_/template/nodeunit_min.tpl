<%= grunt.banner %>
"use strict;"

require("crisp-base");
require("crisp-event");

require("../dist/<%= grunt.pkg.name %>.min");

module.exports = require("<%= testfile %>");
