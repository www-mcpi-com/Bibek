sap.ui.define([
    'mcpi/it/finance/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/m/Token',
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function ( BaseController, MessageBox, MessageToast, Token, Fragment, Filter, FilterOperator) {
        'use strict';
        return BaseController.extend("mcpi.it.finance.controller.View2", {

            onInit: function(params) {            
			var oView = this.getView();
			var oMultiInput1 = oView.byId("multiInput1");
			oMultiInput1.setTokens([
				new Token({text: "Token 1", key: "0001"}),
				new Token({text: "Token 2", key: "0002"}),
				new Token({text: "Token 3", key: "0003"})
			]);

            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("detail").attachMatched(this.herculis, this);
                     
            },
            
            oSupplierPopup: null,
            oCitiesPopup  : null,
            oField : null,
            onFilter: function (oEvent) {
                var that = this;
                if(!this.oSupplierPopup){
                    Fragment.load({
                        id : "supplier",
                        name: 'mcpi.it.finance.fragments.popup',
                        controller : this
                    })
                    .then(function (oFragment) {
                        that.oSupplierPopup = oFragment;
                        that.getView().addDependent(that.oSupplierPopup);
                        that.oSupplierPopup.setTitle("Suppliers");
                        that.oSupplierPopup.bindAggregation("items",{
                            path: '/suppliers',
                            template : new sap.m.DisplayListItem({
                                label : "{name}",
                                value : "{city}"

                            })
                       });
                       that.oSupplierPopup.open();
                    });
                }else{
                    that.oSupplierPopup.open();
                }
            },
            onConfirm: function (oEvent) {
                if(oEvent.getSource().getId() === 'cities--dialog'){
                    var oSelectedItem = oEvent.getParameter("selectedItem");
                    var sText = oSelectedItem.getLabel();
                    this.oField.setValue(sText);
                }
            },
            onPopupSearch: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oDialog = oEvent.getSource();
                var oFilter = new Filter("name", FilterOperator.Contains, sValue);
                oDialog.getBinding("items").filter(oFilter);
                
            },
            onF4Help: function (oEvent) {
                this.oField = oEvent.getSource();
                var that = this;
                if(!this.oCitiesPopup){
                    Fragment.load({
                        id : "cities",
                        name: 'mcpi.it.finance.fragments.popup',
                        controller : this
                    })
                    .then(function (oFragment) {
                        that.oCitiesPopup = oFragment;
                        that.getView().addDependent(that.oCitiesPopup);
                        that.oCitiesPopup.setTitle("Cities");
                        that.oCitiesPopup.bindAggregation("items",{
                            path: '/cities',
                            template : new sap.m.DisplayListItem({
                                label : "{name}",
                                value : "{famousFor}"

                            })
                       });
                       that.oCitiesPopup.open();
                    });
                }else{
                    that.oCitiesPopup.open();
                }
            },

            herculis : function (oEvent){
                var fruitId = oEvent.getParameter("arguments").fruitId;
                var sPath = '/fruits/' + fruitId;
                this.getView().bindElement(sPath);
            },

            onBack : function(){
                var oAppCon = this.getView().getParent();
                oAppCon.to("idView1");
            },

            onSave : function () {
                     MessageBox.confirm("Do you want to Save", {
                     onClose: function(status){
                         if (status === "OK"){
                             MessageToast.show("Your order has been placed sucessfully !")
                         }

                     }    

                     });
            }, 
            onCancel: function (){
                     MessageBox.error("Do you want to Cancel");
            }
        });
});