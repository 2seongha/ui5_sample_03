let oDelete = [],
    oView,
    oTable,
    aFilter = [];
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, MessageBox) {
        "use strict";

        return Controller.extend("zc6.module.emp.zemp01.controller.EmpMain", {
            onInit: function () {
                oView = this.getView();
                oTable = this.byId("myTable");
                
            },
            handleLoadItems: function (oControlEvent) {
                oControlEvent.getSource().getBinding("items").resume();
            },
            onSave: function () {
                const oModel = this.getView().byId("myTable").getModel();
                const oTable = this.byId("myTable");
                const onChnage = this.onChnage;
                MessageBox.confirm("저장 하시겠습니까?", {
                    title: "알림",                                    // default
                    onClose: function (oAction) {
                        if (oAction === "네") {
                            if (oDelete) {
                                for (let i = 0; i < oDelete.length; i++) {
                                    oModel.remove(oDelete[i]);
                                }
                            }
                            oModel.submitChanges();
                            MessageToast.show("저장 완료")
                        } else {
                            oModel.resetChanges(null, true, true);
                        }
                        oDelete = [];
                        // var oTable = this.byId("myTable");
                        oTable.bindItems({
                            path: "/Emp14_01Set",
                            sorter: new sap.ui.model.Sorter('Emp_No'),
                            template: new sap.m.ColumnListItem({
                                cells: [
                                    new sap.m.Input({ value: "{Company}", liveChange: onChnage, editable: false }).addStyleClass('myCustomKeyField'),
                                    new sap.m.Input({ value: "{Emp_No}", liveChange: onChnage, editable: false }).addStyleClass('myCustomKeyField'),
                                    new sap.m.Input({ value: "{Emp_Name}", liveChange: onChnage }).addStyleClass('myCustomInput'),
                                    new sap.m.Input({ value: "{Address}", liveChange: onChnage }).addStyleClass('myCustomInput')
                                ]
                            })
                        });
                        var oBinding = oTable.getBinding("items");
                        oBinding.filter(aFilter);
                    },                                    // default
                    styleClass: "",                                      // default
                    actions: ["네","아니오"],         // default
                    emphasizedAction: "네",        // default
                    initialFocus: null,                                  // default
                    textDirection: sap.ui.core.TextDirection.Inherit     // default
                });
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
                    cells: [
                        new sap.m.Input({ value: "{Company}", liveChange: this.onChnage, editable: true }).addStyleClass('myCustomInput'),
                        new sap.m.Input({ value: "{Emp_No}", liveChange: this.onChnage, editable: true }).addStyleClass('myCustomInput'),
                        new sap.m.Input({ value: "{Emp_Name}", liveChange: this.onChnage }).addStyleClass('myCustomInput'),
                        new sap.m.Input({ value: "{Address}", liveChange: this.onChnage }).addStyleClass('myCustomInput')
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

                    if (aSelectedItem[i].includes('id-')) {
                        table.getModel().resetChanges([aSelectedItem[i]], false, true);
                    } else {
                        oDelete.push(aSelectedItem[i]);
                    }
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

                oView.getModel().setProperty(uri + `/${changeColumn}`, changeValue)
            },

            onFilterInvoices: function (oEvent) {

                // build filter array
                aFilter = [];
                var sQuery = oEvent.getParameter("query");
                if (sQuery) {
                    aFilter.push(new sap.ui.model.Filter("Emp_Name", sap.ui.model.FilterOperator.Contains, sQuery));
                }

                // filter binding
                var oTable = this.byId("myTable");
                var oBinding = oTable.getBinding("items");
                oBinding.filter(aFilter);
            }
        });
    });
