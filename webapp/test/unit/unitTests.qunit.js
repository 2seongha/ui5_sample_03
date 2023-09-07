/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zc6moduleemp/zemp01/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
