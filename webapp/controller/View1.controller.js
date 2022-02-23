sap.ui.define([
    'mcpi/it/finance/controller/BaseController'
], function (BaseController){
        'use strict';
        return BaseController.extend("mcpi.it.finance.controller.View1", {
            onInit: function (){
                this.oRouter = this.getOwnerComponent().getRouter();
             },

            onNext : function(sIndex){
                // var oAppCon = this.getView().getParent();
                // oAppCon.to("idView2");
                this.oRouter.navTo("detail",{
                    fruitId : sIndex
                });
            },
            onDelete: function(oEvent) {
                var oListItemToBeDelete = oEvent.getParameter("listItem");
                // var oList = this.getView().byId("idList");
                var oList = oEvent.getSource();
                oList.removeItem(oListItemToBeDelete);

            },

            onSearch: function(oEvent){
                var query = oEvent.getParameter("query");
                var oList = this.getView().byId("idList");
                var oFilter1 = new sap.ui.model.Filter(
                    "name",
                    sap.ui.model.FilterOperator.Contains,
                    query
                );
                var oFilter2 = new sap.ui.model.Filter(
                    "type",
                    sap.ui.model.FilterOperator.Contains,
                    query
                );
                var oFilter = new sap.ui.model.Filter(
                    {
                        filters: [oFilter1, oFilter2],
                        and: false                           
                    }
                );
                oList.getBinding("items").filter(oFilter);
            },

            onItemSelect: function(oEvent){
   
                var sPath = oEvent.getParameter("listItem").getBindingContextPath();
                // var oSplitApp = this.getView().getParent().getParent();
                // var oView2 = oSplitApp.getDetailPages()[0];

                // var oView2 = this.getView().getParent().getPages()[1];
                // var oView2 = this.getView().getParent();
                // oView2.bindElement(sPath);
                var sIndex = sPath.split("/")[sPath.split("/").length - 1];
                this.onNext(sIndex);

            }

                
        });
});