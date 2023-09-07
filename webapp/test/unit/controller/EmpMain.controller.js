/*global QUnit*/

sap.ui.define([
	"zc6moduleemp/zemp01/controller/EmpMain.controller"
], function (Controller) {
	"use strict";

	QUnit.module("EmpMain Controller");

	QUnit.test("I should test the EmpMain controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
