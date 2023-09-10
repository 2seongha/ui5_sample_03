let oDelete = [];
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("zc6.module.emp.zemp01.controller.EmpMain", {
            onInit: function () {
            },
            onSave: function () {
                const oModel = this.getView().byId("myTable").getModel();
                const check_confirm = confirm("저장 하시겠습니까?");
                if (check_confirm) {
                    if (oDelete) {
                        for (let i = 0; i < oDelete.length; i++) {
                            oModel.remove(oDelete[i]);
                        }
                    }
                    oModel.submitChanges();
                    MessageToast.show("저장 완료");
                } else {
                    oModel.resetChanges(null, true, true);
                }
            },
            onAdd: function () {
                const oProperties = {
                    Company: '',
                    Emp_No: '',
                    Emp_Name: '',
                    Address: ''
                };

                const oNew = this.getView().getModel().createEntry('/Emp14_01Set', {
                    properties: oProperties
                })

                const lisItemForTable = this.getView().byId('lisItemForTable').clone();

                lisItemForTable.setBindingContext(oNew);

                const table = this.getView().byId("myTable");
                table.addItem(lisItemForTable);
                oDelete.push("/Emp14_01Set(Company='',Emp_No='')");

            },
            onDelete: function () {
                const table = this.getView().byId("myTable");

                const aSelectedItem = table.getSelectedItem().getParent()._aSelectedPaths;
                for (let i = 0; i < aSelectedItem.length; i++) {
                    oDelete.push(aSelectedItem[i]);
                }
                const aSelectedItems = table.getSelectedItems();
                for (let i = 0; i < aSelectedItems.length; i++) {
                    table.removeItem(aSelectedItems[i]);
                }
            },
            onChnage: function (oEvent) {
                const uri = oEvent.getSource().getParent().getBindingContext().sPath;
                const changeColumn = oEvent.getSource().mBindingInfos.value.binding.sPath;
                const changeValue = oEvent.getParameters().value;

                this.getView().getModel().setProperty(uri + `/${changeColumn}`, changeValue)
            }
        });
    });
