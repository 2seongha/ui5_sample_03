let oDelete = [],
    oView;
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
                oView = this.getView();
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
                    // MessageToast.show("저장 완료")
                }
                oDelete = [];
                this.getView().byId("myTable").removeAllItems();
                console.log(this.getView().byId("myTable").getBindingInfo("items"))
                this.getView().byId("myTable").unbindItems();
                this.getView().byId("myTable").bindItems({
                    path: "/Emp14_01Set",
                    sorter: new sap.ui.model.Sorter('Emp_No'),
                    template: new sap.m.ColumnListItem({
                        type: "Active",
                        cells: [
                            new sap.m.Input({ value: "{Company}", liveChange: this.onChnage ,editable:false}),
                            new sap.m.Input({ value: "{Emp_No}", liveChange:  this.onChnage ,editable:false}),
                            new sap.m.Input({ value: "{Emp_Name}", liveChange:  this.onChnage }),
                            new sap.m.Input({ value: "{Address}", liveChange:  this.onChnage })
                        ]
                    })
                });
                console.log(this.getView().byId("myTable").getBindingInfo("items"))
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

                const lisItemForTable = new sap.m.ColumnListItem({
                    type: "Active",
                    cells: [
                        new sap.m.Input({ value: "{Company}", liveChange: this.onChnage ,editable:true}),
                        new sap.m.Input({ value: "{Emp_No}", liveChange:  this.onChnage ,editable:true}),
                        new sap.m.Input({ value: "{Emp_Name}", liveChange:  this.onChnage }),
                        new sap.m.Input({ value: "{Address}", liveChange:  this.onChnage })
                    ]
                })

                lisItemForTable.setBindingContext(oNew);

                const table = this.getView().byId("myTable");
                table.addItem(lisItemForTable);
            },
            onDelete: function () {
                const table = this.getView().byId("myTable");
                if (!table.getSelectedItem()) return;

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
                console.log(oEvent)
                oView.getModel().setProperty(uri + `/${changeColumn}`, changeValue)
            }
        });
    });
