sap.ui.define([
    'mcpi/it/finance/controller/BaseController'
], function (BaseController){
        'use strict';
        return BaseController.extend("mcpi.it.finance.controller.Add", {
            oninit: function (){
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData({
                    "productData" : {
                        "PRODUCT_ID"   : "",
                        "TYPE_CODE"    : "PR",
                        "CATEGORY"     : "",
                        "NAME"         : "",
                        "DESCRIPTION"  : "",
                        "SUPPLIER_ID"  : "0100000046",
                        "SUPPLIER_NAME": "SAP   ",
                        "PRICE"        : "",
                        "CURRENCY_CODE": "EUR",

                    }
                });
                this.getView().setModel(oModel, "local");                 
            }

        });
});