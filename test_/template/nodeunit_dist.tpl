<%= grunt.banner %>
"use strict;"

require("crisp-base");
require("crisp-event");

require("../dist/<%= grunt.pkg.name %>");

module.exports = require("<%= testfile %>");
