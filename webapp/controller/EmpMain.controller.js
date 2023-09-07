sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast) {
        "use strict";

        return Controller.extend("zc6.module.emp.zemp01.controller.EmpMain", {
            onInit: function () {
                var oData = {};
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel, "oChangeData");
            },
            onSave: function () {
                const check_confirm = confirm("저장 하시겠습니까?");
                if (check_confirm){
                    let oChangeData = this.getView().getModel("oChangeData").oData;

                    if (Object.keys(oChangeData).length <= 0) return MessageToast.show("저장할 데이터가 없습니다.");

                    var oModel = this.getView().getModel();
    
                    for (let i = 0; i < Object.keys(oChangeData).length; i++) {

                        var sPath = Object.keys(oChangeData)[i];
                        const defaultValue = oModel.oData[sPath.substring(1)];
                        const changeValue = oChangeData[sPath];

                        var oData = {
                            Company:  changeValue.Company ? changeValue.Company : defaultValue.Company,
                            Emp_No:  changeValue.Emp_No ? changeValue.Emp_No : defaultValue.Emp_No,
                            Emp_Name: changeValue.Emp_Name ? changeValue.Emp_Name : defaultValue.Emp_Name,
                            Address: changeValue.Address ? changeValue.Address : defaultValue.Address,
                        };

                        oModel.update(sPath, oData, null);
                    }
                    MessageToast.show("저장 완료");
                    this.getView().getModel("oChangeData").setData({});
                }
            },
            onChnage: function (oEvent) {
                const uri = oEvent.getSource().getParent().getBindingContext().sPath;
                const changeColumn = oEvent.getSource().mBindingInfos.value.binding.sPath;
                const changeValue = oEvent.getParameters().value;
                const oChangeData = this.getView().getModel("oChangeData").oData;

                if (oChangeData[uri]) {
                    oChangeData[uri][changeColumn] = changeValue;
                    
                }else{
                    oChangeData[uri] = { [changeColumn]: changeValue };
                }
                this.getView().getModel().setProperty(uri + `/${changeColumn}`, changeValue)
            }
        });
    });
