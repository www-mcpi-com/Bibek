sap.ui.define([
    'sap/ui/core/UIComponent',
  ], function(UIComponent) {
    'use strict';
    return UIComponent.extend("mcpi.it.finance.Component",{
         metadata : {
              manifest: "json"
         } ,
         init : function(){
          UIComponent.prototype.init.apply(this);
          var oRouter = this.getRouter();
          oRouter.initialize();

         },
        //  createContent: function () {
        //         var oView = new sap.ui.view({
        //              viewName : "mcpi.it.finance.view.App",
        //              type: "XML"
        //         });

        //         var oView1 = new sap.ui.view({
        //             viewName : "mcpi.it.finance.view.View1",
        //             type : "XML",
        //             id    : "idView1"

        //         });

        //         var oView2 = new sap.ui.view({
        //             viewName : "mcpi.it.finance.view.View2",
        //             type : "XML",
        //             id   : "idView2"


        //         });

        //            var oAppCon = oView.byId("idAppCon");
        //            oAppCon.addMasterPage(oView1).addDetailPage(oView2);
                   

        //         return oView;

        //  },
         destroy : function (){
             
         }


    })
});