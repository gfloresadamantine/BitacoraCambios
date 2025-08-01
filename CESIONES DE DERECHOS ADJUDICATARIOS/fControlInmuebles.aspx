<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="fControlInmuebles.aspx.cs" Inherits="Adamantine.CarteraJudicial.fControlInmuebles" %>
<%@ Register Src="~/menu.ascx" TagPrefix="uc1" TagName="menu" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta http-equiv="X-UA-Compatible" content="IE=9" />
     
    <title></title>
    
    <style type="text/css">
        #loading-div-background {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            background: white;
            width: 100%;
            height: 100%;
        }
        #loading-div {
            width: 300px;
            height: 200px;
            background-color: white;
            text-align: center;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -150px;
            margin-top: -100px;
        }
        #navlist li {
            display: inline;
            list-style-type: none;
            padding-right: 5px;
            text-align: left;
            font-family: Calibri;
            font-size: small;
        }

        td, th {
            white-space: nowrap;
        }

        .navlist li {
            display: inline;
            padding-right: 10px;
        }

        .page {
            background-image: -moz-linear-gradient(center top, #F8F8F8, #ECECEC);
            border: 1px solid #C6C6C6;
            margin: 15px auto 0;
            width: 90%;
        }

        div.centerTable {
            text-align: center;
            -moz-border-radius: 20px;
            -webkit-border-radius: 20px;
            -khtml-border-radius: 20px;
            border-radius: 20px;
        }

            div.centerTable table {
                margin: 0 auto;
                text-align: left;
            }

        /** {
            font-family: Segoe UI,Tahoma,Arial,Verdana,sans-serif;
            font-size: 11px;
           
        }*/


        .t-grid table {
            table-layout: fixed;
        }

        .k-grid {
            border-bottom: dotted;
        }

        .k-header {
            background-color: #7a7b7c;
            color: black;
            font-family: Segoe UI,Tahoma,Arial,Verdana,sans-serif;
            font-size: 11px;
        }

            .k-header.k-link {
                color: black;
            }

        .k-state-selected {
            background-color: #A7CDF0;
            background-image: none;
            color: black;
        }

        .k-alt.k-state-selected {
            background-color: #A7CDF0;
            background-image: none;
            color: black;
        }

        tr {
            font-family: Segoe UI,Tahoma,Arial,Verdana,sans-serif;
            font-size: 11px;
            color: black;
            border-bottom: solid 1px #DBDEE1;
            height: 21px;
        }

        .k-alt {
            background-color: black;
        }

        .k-grid td {
            padding: 0px 10px;
            margin: 0px;
            border-bottom: solid 1px #DBDEE1;
        }

        .k-grid-header {
            padding: 0px 0px;
            margin: 0px;
        }

            .k-grid-header .k-header {
                padding: 0px 10px;
                margin: 0px;
            }

        .k-grid-header-wrap th {
            font-size: 12px !important;
        }


        .wijmo-wijmenu-text {
            font-size: 16px !important;
        }

        #grid .k-grid-toolbar {
            background: red;
        }

        .k-pager-info.k-label {
            font-family: "Calibri";
            font-size: 12px;
        }

        .k-alt {
            background-color: #f7f7f7;
        }

        .k-grid .k-pager {
            float: right;
            vertical-align: central;
            border: solid 1px blue;
            margin-top: 2px;
        }

        li.active, a.active {
            background-color: #f90;
        }

        #bloque {
            width: 100%;
        }

            #bloque .A, #bloque .B {
                display: inline-block;
            }
        #txtcomentarios {
            margin-left: 0px;
        }
    </style>

    <script src="Scripts/jquery-1.8.3.js"></script>
    <link href="Kendo/styles/kendo.common.min.css" rel="stylesheet" />
    <link href="Kendo/styles/kendo.default.min.css" rel="stylesheet" />
    <script src="Kendo/js/jquery.min.js"></script>
    <script src="Kendo/js/kendo.web.min.js"></script>
    <script src="Scripts/knockout-2.2.1.js"></script>
    <script src="Scripts/knockout.mapping-latest.js"></script>
    <script src="Scripts/json2.js"></script>
    <script src="Scripts/knockout-kendo.min.js"></script>
    <link rel="stylesheet" href="table.css" type="text/css"/>	
    <script src="Scripts/moment.js"></script>
    <script src="Scripts/numeral.min.js"></script>
    <script src="ViewModel/ControlDeInmuebles.js"></script>

</head>
<body >
    <form runat="server">
        <uc1:menu runat="server" ID="menu" />
  
        
         <div id="loading-div-background">
            <div id="loading-div" class="ui-corner-all">
                <img style="height: 80px; margin: 55px;" src="images/hourglass.gif" alt="Loading.." />
                <h3 style="color: gray; font-weight: normal; font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif">Procesando...</h3>
            </div>
        </div>

<div class="page" >
    <div id="busqueda" class="centerTable"  style=' margin: 10px; padding: 5px; text-align:center; border:inherit; background-color:#E5E4E2;'>
        <h3 style="font-family:Calibri">Búsqueda de Inmuebles</h3>
        <table width:"40%">
            <tr>
                <td><span><strong>Administrador</strong></span>
                </td>
                <td>
                    <select id="ddladministrador" style="width: 240px; font-family: Segoe UI,Tahoma,Arial,Verdana,sans-serif; font-size: 11px;" data-bind=" options: $root.administradores, optionsText: 'Nombre', optionsValue: 'Clave', optionsCaption: 'Seleccione...', value: selectedValueAdministrador"></select>
                </td>
            </tr>
            <tr>
                <td><span><strong>Crédito</strong></span>
                </td>
                <td>
                    <input id="txtcredito" type="text" style="width: 237px; font-family: Segoe UI,Tahoma,Arial,Verdana,sans-serif; font-size: 11px;" />
                </td>
            </tr>
            <tr>
                <td><span><strong>Acreditado</strong></span>
                </td>
                <td>
                    <input id="txtacreditado" type="text" style="width: 237px; font-family: Segoe UI,Tahoma,Arial,Verdana,sans-serif; font-size: 11px;" />
                </td>
            </tr>
            <tr>
                <td><span><strong>Fideicomiso</strong></span></td>
                <td>
                    <input id="txtfideicomiso" type="text" style="width: 237px; font-family: Segoe UI,Tahoma,Arial,Verdana,sans-serif; font-size: 11px;" />
                </td>
            </tr>
            <tr>
                <td><strong>Tipo Operación</strong></td>
                <td>
                    <select id="ddlTipoOperacion" style='width: 240px; font-family: Segoe UI,Tahoma,Arial,Verdana,sans-serif; font-size: 11px;' data-bind="options: $root.tipo_operacion, optionsText: 'DESCRIPCION', optionsValue: 'PK_TIPO_OPERACION', optionsCaption: 'Seleccione...'"></select>
                </td>
            </tr>

            <tr data-bind="visible: false">
                <td><span><strong>Concepto</strong></span></td>
                <td>
                    <select id="ddlconceptogasto" style='width: 240px; font-family: Segoe UI,Tahoma,Arial,Verdana,sans-serif; font-size: 11px;' data-bind=" options: $root.conceptos, optionsText: 'DESCRIPCION', optionsValue: 'PK_CONCEPTO_INMUEBLE', optionsCaption: 'Seleccione...'"></select>
                </td>
            </tr>
            <tr>
                <td><span><strong>Bursa</strong></span></td>
                <td>
                    <select id="ddlbursa" style='width: 240px; font-family: Segoe UI,Tahoma,Arial,Verdana,sans-serif; font-size: 11px;' data-bind="options: $root.bursa, optionsText: 'Bur_nombre', optionsValue: 'id_bursatilizacion', optionsCaption: 'Seleccione...'"></select>
                </td>
            </tr>
            <tr>
                <td><strong>Estatus</strong></td>
                <td>
                    <select id="ddlstatus" style='width: 240px; font-family: Segoe UI,Tahoma,Arial,Verdana,sans-serif; font-size: 11px;' data-bind="options: $root.estatus, optionsText: 'DESCRIPCION', optionsValue: 'PK_ESTATUS_OPER_INMUEBLE', optionsCaption: 'Seleccione...'"></select></td>
            </tr>
            <tr>
                <td><span><strong>Fecha Solicitud</strong> </span></td>
                <td>
                    <input type="text" id="datepickerini" style="width: 113px; height: 15px;" />
                    <span><strong>a</strong> </span>
                    <input type="text" id="datepickerfin" style="width: 113px; height: 15px;" />
                </td>
            </tr>
            <tr>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <button id="btnBuscar" style="font-family: Segoe UI,Tahoma,Arial,Verdana,sans-serif; font-size: 11px;" data-bind="click: function () { $root.getData(); } ">Buscar</button></td>
            </tr>
        </table>
    </div>
    <div data-bind="visible: datoscredito().length > 0" id="divUltimaEtapa" style="width: auto; margin: 10px; padding: 5px;">
        <h3 data-bind="visible: datoscredito().length > 0" style="font-family: 'Calibri'">Datos generales del crédito</h3>
        <div style="width: auto;" data-bind="kendoGrid: {
    data: datoscredito,
    columns: [{ title: 'Solicitud' }
             , { title: 'Crédito' }
             , { title: 'Administrador' }
             , { title: 'Originador' }
             , { title: 'Acreditado' }
             , { title: 'Bursa' }

    ]
                                            , rowTemplate: 'rowTmplcredito'
                                            , useKOTemplates: true
}">
             </div>
   </div>
        <div data-bind="visible: items().length > 0" style="width:auto; height:auto; margin: 10px; padding: 5px;" >
        <h3 data-bind ="visible: items().length > 0" style="font-family:'Calibri'"> Resumen de solicitudes</h3>
         <span style="font-family: Segoe UI,Tahoma,Arial,Verdana,sans-serif; font-size: 11px;" class="comboletra" ><strong>Registros:<span data-bind="text: items().length"/></strong></span>  <img data-bind="    attr: { src: $root.imagePath }, visible: $root.items().length > 0" /><a href="#" data-bind="    click: function () { $root.Exportar(); }, visible: $root.items().length > 0" style="font-family: Segoe UI,Tahoma,Arial,Verdana,sans-serif; font-size: 11px;"> Exportar a Excel</a>  
         
        <br />
             
             <div class="tabla" style=" width:auto;  white-space:normal;  overflow-x: scroll; overflow-y: hidden; height: auto;"> 
                 
                <table id="grdppal">
                    <thead>
                        <tr>
                            
                            <th>Crédito</th>
                            <th>Consecutivo</th>
                            <th>Acreditado</th>
                            <th>Administrador</th>
                            <th>Originador</th>
                            <th>Bursa</th>
                            <th>Fideicomiso</th>
                            <%--<th>Mes en que se reporta</th>--%>
                            <th>Fecha en que se reporta</th>
                            <th>Fecha avalúo</th>
                            <th>Monto avalúo</th>
                            <th>Tipo operación</th>
                            <th>Fecha solicitud</th>
                            <th>Estatus solicitud</th>
                            <th>Tipo de liquidación</th>
                            <th data-bind="visible: false">Concepto</th>
                            <th>Fecha dación</th>
                            <th>Fecha de adjudicación</th>
                            <th>Fecha de carta de apartado</th>
                            <th>Monto de la propuesta</th>
                            <th>Fecha de propuesta</th>
                            <th>Precio de venta</th>
                            <th>Saldo en pesos</th>
                            <th>Gastos descontados</th>
                            <th>Total pagar al fideicomiso</th>
                            <th>Fecha de pago al fideicomiso</th>
                            <th>Mes de cédula de pago</th>
                            <th>2% de Precio Vta.</th>
                            <th>3.75% de UPB a la Vta.</th>
                            <th>% de Vta. respecto valor avalúo</th>
                            <th>% Cobro de Fee</th>
                            <th>Valor en Pesos Cobro Fee</th>
                            <th>Total a Cobrar</th>
                            <th>Total a Cobrar Maestro</th>
                            <th>Total a Cobrar Primario</th>
                            <th>Comercializador</th>
                            <th>Monto operación</th>
                            <th>Fecha captura</th>
                            <th>Documentos</th>

                            <%--<th>Fecha según escritura</th>--%>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody data-bind="template: { name: 'rowTmplresumen', foreach: pagedList }" />
                </table>
                <div>
                    <ul id="navlist" data-bind="foreach: allPages">
                        <li data-bind="css: { active: $data.pageNumber === ($root.pageIndex() + 1) }"><a href="#" data-bind="    text: $data.pageNumber, click: function () { $root.moveToPage($data.pageNumber - 1); }"></a></li>
                    </ul>
                </div>
            </div>
    </div>

    </div>  


      
    <script id="rowTmplcredito" type="text/html">
        <tr>
            <td><a href="#" data-bind="click: function () { $root.nuevo($data); }"><span>Crea solicitud</span></a></td>
            <td data-bind="text: NOCRED"></td>
            <td data-bind="text: ADMINISTRADOR"></td>
            <td style="width:auto" data-bind="text: ORIGINADOR"></td>
            <td data-bind="text: ACREDITADO"></td>
            <td data-bind="text: BURSA"></td>
        </tr>
    </script>

    <script id="rowTmplresumen" type="text/html">
        <tr data-bind="style: { 'background-color': $root.ValidateAlertaCreditos($data.NOCRED())==true?'#87CEFA':'white' }">
            
            <td data-bind="text: NOCRED"></td>
            <td style="text-align: center" data-bind="text: CONSECUTIVO_CESION"></td>
            <td data-bind="text: ACREDITADO"></td>
            <td data-bind="text: ADMINISTRADOR"></td>
            <td data-bind="text: ORIGINADOR"></td>
            <td data-bind="text: BURSA"></td>
            <td data-bind="text: FIDEICOMISO"></td>
            <%--<td style="text-align: center" data-bind="text: REPORTADO_EN_MES"></td>--%>
            <td style="text-align: center" data-bind="text: $root.formateafecha(FECHA_REPORTE)"></td>
            <td style="text-align: left" data-bind="text: $root.formateafecha(FECHA_AVALUO)"></td>
            <td style="text-align: left" data-bind="text: $root.formatNumeral(MONTO_AVALUO)"></td>
            <td data-bind="text: TIPO_OPERACION"></td>
            <td style="text-align: center" data-bind="text: $root.formateafecha(FECHA_SOLICITUD)"></td>
            <td style="text-align: center" data-bind="text: ESTATUS"></td>
            <td data-bind="text: TIPO_LIQ"></td>
            <td data-bind="visible: false, text: CONCEPTO"></td>
            <td style="text-align: center" data-bind="text: $root.formateafecha(FECHA_DACION)"></td>
            <td style="text-align: center" data-bind="text: $root.formateafecha(FECHA_ADJUDICACION)"></td>
            <td style="text-align: center" data-bind="text: $root.formateafecha(FECHA_CARTA_APARTADO)"></td>
            <td style="text-align: center" data-bind="text: $root.formateafecha(MONTO_PROPUESTA)"></td>
            <td style="text-align: center" data-bind="text: $root.formateafecha(FECHA_PROPUESTA)"></td>
            <td style="text-align: left" data-bind="text: $root.formatNumeral(PRECIO_VENTA)"></td>
            <td style="text-align: left" data-bind="text: $root.formatNumeral(SALDO_EN_PESOS)"></td>
            <td style="text-align: left" data-bind="text: $root.formatNumeral(GASTOS_DESCONTADOS)"></td>
            <td style="text-align: left" data-bind="text: $root.formatNumeral(TOTAL_PAGAR_FISO)"></td>
            <td style="text-align: center" data-bind="text: $root.formateafecha(FECHA_PAGO_FISO)"></td>
            <td style="text-align: center" data-bind="text: MES_CEDULA_PAGO"></td>

            <td style="text-align: center" data-bind="text: $root.formatNumeral(COMISION_PRECIO_VTA)"></td>
            <td style="text-align: center" data-bind="text: $root.formatNumeral(UPB_VENTA)"></td>
            <td style="text-align: center" data-bind="text: $root.formatoPorcentaje(VTA_VALOR_AVALUO)"></td>
            <td style="text-align: center" data-bind="text: $root.formatoPorcentaje(PCT_COBRO_FREE)"></td>
            <td style="text-align: center" data-bind="text: $root.formatNumeral(COBRO_FREE_PESOS)"></td>
            <td style="text-align: center" data-bind="text: $root.formatNumeral(TOTAL_COBRAR)"></td>
            <td style="text-align: center" data-bind="text: $root.formatNumeral(TOTAL_COBRAR_MAESTRO)"></td>
            <td style="text-align: center" data-bind="text: $root.formatNumeral(TOTAL_COBRAR_PRIMARIO)"></td>
            <td style="text-align: center" data-bind="text: COMERCIALIZADO"></td>
            <td style="text-align: center" data-bind="text: $root.formatNumeral(MONTO_OPERACION)"></td>
            <td style="text-align: center" data-bind="text: $root.formateafecha(FECHA_CAPTURA)"></td>

            <td style="text-align: left;" data-bind=" template: { name: 'tmp_listadoctos' }"></td>
            <%--<td style="text-align: center" data-bind="text: $root.formateafecha(FECHA_SEGUN_ESCRITURA)"></td>--%>
            <td style="width: 250px;">
                <button style="height: 25px; width: 70px; font-family: 'Calibri'; font-size: small" data-bind="click: function () { $root.edit($data); }">Detalle</button></td>
        </tr>
    </script>

    <script type="text/html" id="tmp_listadoctos">
        <ul data-bind=" foreach: $data.ListaDoctos">
            <li><a href="#" data-bind="click: function () { $root.verarchivo($data); }"><span data-bind="    text: NOMBRE_ORIGINAL"></span></a></li>
        </ul>
    </script>

    <div id="dialog">
            <div>
                <table class="centerTable" style="font-family: Segoe UI,Tahoma,Arial,Verdana,sans-serif; font-size: 0.70em; text-align:right; width: 509px; ">

                    <tr class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Crédito</span></td>
                        <td style="text-align: left" colspan="3 ">
                            <span data-bind="text: selectedCredito() != undefined ? selectedCredito().NOCRED() : null"></span>
                        </td>
                    </tr>
                    <tr class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row" >
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background:#778899"><span>Originador</span></td>
                        <td style="text-align:left" colspan="3">
                            <span data-bind="text: selectedCredito() != undefined ? selectedCredito().ORIGINADOR() : null"></span>
                        </td>
                    </tr>
                    <tr class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row" >
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background:#778899"><span>Fideicomiso</span></td>
                        <td style="text-align:left" colspan="3">
                            <span data-bind="text: selectedCredito() != undefined ? selectedCredito().BURSA() : null"></span>
                        </td>
                    </tr>


                    <tr class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Tipo operación</span></td>
                        <td style="text-align: left">

                            <span>
                                <select id="ddltipo_Operacion" style='width: 360px; font-family: Segoe UI,Tahoma,Arial,Verdana,sans-serif; font-size: 11px;' data-bind=" options: $root.tipo_operacion, optionsText: 'DESCRIPCION', optionsValue: 'PK_TIPO_OPERACION', optionsCaption: 'Seleccione...', value: selectedValue_TipoOperacion"></select></span>

                        </td>
                        <td colspan="2"></td>
                    </tr>
                    <tr data-bind="visible: bool_apartados_ventas" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Fecha Avalúo</span></td>
                        <td style="text-align: right">
                            <span>
                                <input type="text" id="dtpfechaavaluo" /></span>
                        </td>
                        <td colspan="2"></td>
                    </tr>
                    <tr data-bind="visible: bool_apartados_ventas" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Monto avalúo</span></td>
                        <td style="text-align: right" class="auto-style9">
                            <span>
                                <input style="text-align: right" type="text" id="txtMontoAvaluo" /></span>
                        </td>
                        <td colspan="2"></td>
                    </tr>
                    <tr data-bind="visible: $root.bool_ocultafechareporte" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <%--<td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Mes en el que se reporta</span></td>--%>
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Fecha reporte de cobranza</span></td>

                       <%-- <td style="text-align: right" class="auto-style10">
                            <span>
                                <select id="ddlreportames" style='width: 360px; font-family: Segoe UI,Tahoma,Arial,Verdana,sans-serif; font-size: 11px;' data-bind=" options: $root.meses, optionsText: 'descripcion', optionsValue: 'mes', optionsCaption: 'Seleccione ...', value: selectedValueReportaMes"></select></span>
                        </td>--%>
                        <td style="text-align:right">
                            <span>
                                <input type="text" id="dtpfechareporte" /></span>
                        </td>
                        <td colspan="2"></td>
                    </tr>
                    <tr data-bind="visible: booltipo_dacion_adj" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Tipo Liquidación</span></td>
                        <td style="text-align: left" colspan="3">
                            <span>
                                <select id="ddlLiquidacion" style='width: 360px; font-family: Segoe UI,Tahoma,Arial,Verdana,sans-serif; font-size: 11px;' data-bind=" enabled: false, options: $root.liquidacion, optionsText: 'DESCRIPCION', optionsValue: 'PK_TIPO_LIQ', optionsCaption: 'Seleccione ...', value: selectedValueLiquidacion"></select></span>

                        </td>
                    </tr>
                    <tr data-bind="visible: false" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Documentación soporte</span></td>
                        <td style="text-align: left" colspan="3">

                            <span>
                                <select id="ddlconcepto" style='width: 360px; font-family: Segoe UI,Tahoma,Arial,Verdana,sans-serif; font-size: 11px;' data-bind=" options: $root.concepto_liquidacion, optionsText: 'DESCRIPCION', optionsValue: 'PK_CONCEPTO_INMUEBLE', optionsCaption: 'Seleccione ...', value: selectedValueSoporte"></select></span>
                        </td>
                    </tr>
                    <tr data-bind="visible: booltipo_dacion" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Fecha según escritura </span></td>
                        <td style="text-align: right">
                            <span>
                                <input type="text" id="dtpfechadacion" /></span>
                        </td>
                        <td colspan="2"></td>
                    </tr>

                    <tr data-bind="visible: booltipo_adjudicacion" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Fecha según escritura </span></td>
                        <td style="text-align: right">
                            <span>
                                <input type="text" id="dtpfechaadjudicacion" /></span>
                        </td>
                        <td colspan="2"></td>
                    </tr>
                    <tr   data-bind="visible: bool_apartados" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background:#778899"><span>Fecha de carta de apartado </span></td>
                        <td  style="text-align:right">
                            <span >
                                <input type="text" id="dtpfechacarta" /></span>
                        </td>
                          <td colspan="2"></td>
                    </tr>
                    <tr data-bind="visible: bool_apartados" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background:#778899"><span>Monto de la propuesta</span></td>
                        <td class="auto-style10" style="text-align:right">
                            
                               <span> <input style="text-align:right" type="text" id="txtMontoPropuesta" /></span>
                         </td>   
                        <td colspan="2"></td>
                    </tr>
                    <tr  data-bind="visible: bool_apartados" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background:#778899"><span>Fecha de la propuesta </span></td>
                        <td  style="text-align:right">
                            <span><input type="text" id="dtpfechapropuesta" /></span>
                        </td>
                         <td colspan="2"></td>
                    </tr>
                    <tr data-bind="visible: bool_ventas" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background:#778899"><span>Precio venta</span></td>
                        <td class="auto-style10">
                            <span> <input style="text-align:right" type="text" id="txtPrecioVenta" /></span>
                            </td>
                        <td colspan="2"></td>
                    </tr>
                    <tr data-bind="visible: bool_ventas" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background:#778899"><span>Saldo en pesos</span></td>
                        <td class="auto-style10">
                           <span> <input style="text-align:right" type="text" id="txtSaldoPesos" /></span>
                            </td>
                        <td colspan="2"></td>
                    </tr>
                    <tr data-bind="visible: bool_ventas" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background:#778899"><span>Gastos descontados</span></td>
                        <td class="auto-style10">
                            <span> <input style="text-align:right" type="text" id="txtGastosDescontados" /></span></td>
                        <td colspan="2"></td>
                    </tr>
                     <tr data-bind="visible: bool_ventas">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background:#778899"><span>Total pagar al fideicomiso</span></td>
                       <td class="auto-style10">
                            <span> <input style="text-align:right" type="text" id="txtTotalPagarFiso" /></span></td>
                        <td colspan="2"></td>
                    </tr>
                    <tr data-bind="visible: bool_ventas"  class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background:#778899"><span>Fecha de pago al fideicomiso </span></td>
                        <td style="text-align:right">
                            <span>
                                <input type="text" id="dtpfechapagofiso" /></span>
                        </td>
                        <td colspan="2"></td>
                    </tr>

                    <tr data-bind="visible: bool_ventas" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background:#778899"><span>Mes de cédula de pago</span></td>
                        <td class="auto-style10">
                             <span><select id="ddlmesCedulaPago" style='width: 360px; font-family: Segoe UI,Tahoma,Arial,Verdana,sans-serif; font-size: 11px; ' data-bind=" options: $root.meses, optionsText: 'descripcion', optionsValue: 'mes', optionsCaption: 'Seleccione ...', value: selectedValueMesCedulaPago"></select></span></td>
                        <td colspan="2"></td>
                    </tr>
                    <tr data-bind="visible: filesuploaded().length > 0" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background:#778899"><span>Documentos</span></td>
                        <td style="text-align:center" colspan="3">
                            <ul data-bind="foreach: $root.filesuploaded">
                                <li>
                                    <a href="#" data-bind="text: NOMBRE_ORIGINAL, click: function () { $root.verarchivo($data); }"></a>
                                    <a href="#" data-bind="visible: $root.boollinkeliminar, click: $root.deletefile">Eliminar</a>
                                </li>
                            </ul>
                        </td>
                    </tr>
                     <tr  data-bind="visible: bool_adjudicacionPAE" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background:#778899"><span>Fecha según escritura </span></td>
                        <td  style="text-align:right">
                            <span><input type="text" id="dtpfechaSegunEscritura" /></span>
                        </td>
                         <td colspan="2"></td>
                    </tr>
                    <%--retirar documento soporte--%>
                    <tr data-bind="visible: ($root.selectedValue_TipoOperacion() == $root.Cat_Tipo_Operacion.Apartados || $root.selectedValue_TipoOperacion() == $root.Cat_Tipo_Operacion.ExpedienteRegularizacion) ? true : false" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="background:#778899" ><span data-bind="visible: booldocto">Documento soporte</span></td>
                        <td data-bind="visible: boolupload" colspan="3" style="text-align:left">
                            <input name="files" id="files" type="file" />
                        </td>
                    </tr>

                   <tr data-bind="visible: bool_ventas" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="background:#778899" ><span data-bind="visible: booldocto">Ficha de Depósito</span></td>
                        <td data-bind="visible: boolupload" colspan="3" style="text-align:left">
                            <input name="files" id="filesficha" type="file" />
                        </td>
                    </tr>

                    <tr data-bind="visible: bool_ventas" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="background:#778899" ><span data-bind="visible: booldocto">Escritura compra venta</span></td>
                        <td data-bind="visible: boolupload" colspan="3" style="text-align:left">
                            <input name="files" id="filesescritura" type="file" />
                        </td>
                    </tr>
                    <tr data-bind="visible: bool_ventas" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="background:#778899" ><span data-bind="visible: booldocto">Avalúo venta</span></td>
                        <td data-bind="visible: boolupload" colspan="3" style="text-align:left">
                            <input name="files" id="filesavaluo" type="file" />
                        </td>
                    </tr>
                    <tr data-bind="visible: bool_ventas" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                      <td class="wijgridtd wijdata-type-string ui-state-highlight" style="background:#778899" ><span data-bind="visible: booldocto">OTRO</span></td>
                      <td data-bind="visible: boolupload" colspan="3" style="text-align:left">
                          <input name="files" id="filesClg" type="file" />
                      </td>
                  </tr>

                    
                   

                    <tr data-bind="visible: $root.bool_dacion_expadj_adjpae" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="background:#778899" ><span data-bind="visible: booldocto">Escritura</span></td>
                        <td data-bind="visible: boolupload" colspan="3" style="text-align:left">
                            <input name="files" id="files_escritura" type="file" />
                        </td>
                    </tr>
                    <tr data-bind="visible: $root.bool_dacion_expadj_adjpae" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="background:#778899" ><span data-bind="visible: booldocto">Avalúo</span></td>
                        <td data-bind="visible: boolupload" colspan="3" style="text-align:left">
                            <input name="files" id="files_avaluo" type="file" />
                        </td>
                    </tr>
                     <tr data-bind="visible: $root.bool_dacion_expadj_adjpae" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="background:#778899" ><span data-bind="visible: booldocto">Otros</span></td>
                        <td data-bind="visible: boolupload" colspan="3" style="text-align:left">
                            <input name="files" id="files_otro" type="file" />
                        </td>
                    </tr>
                      <%--Seccion para Cesión de derechos--%>
                    
                   <tr data-bind="visible: bool_cesionderechos" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Fecha captura </span></td>
                        <td style="text-align: right">
                            <span>
                                <input type="text" id="dtpfechacaptura" /></span>
                        </td>
                        <td colspan="2"></td>
                    </tr>

                    <tr data-bind="visible: bool_cesionderechos" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Monto operación</span></td>
                        <td style="text-align: right" class="auto-style9">
                            <span>
                                <input style="text-align: right" type="text" id="txtMontoOperacion" /></span>
                        </td>
                        <td colspan="2"></td>
                    </tr>

                    <tr data-bind="visible: $root.bool_cesionderechos" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="background:#778899" ><span data-bind="visible: booldocto">Escritura Cesión</span></td>
                        <td data-bind="visible: boolupload" colspan="3" style="text-align:left">
                            <input name="files" id="files_escritura_cesion" type="file" />
                        </td>
                    </tr>
                    <tr data-bind="visible: $root.bool_cesionderechos" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="background:#778899" ><span data-bind="visible: booldocto">Transferencia de Recursos</span></td>
                        <td data-bind="visible: boolupload" colspan="3" style="text-align:left">
                            <input name="files" id="files_trans_cesion" type="file" />
                        </td>
                    </tr>
                     <tr data-bind="visible: $root.bool_cesionderechos" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="background:#778899" ><span data-bind="visible: booldocto">Carta autorización</span></td>
                        <td data-bind="visible: boolupload" colspan="3" style="text-align:left">
                            <input name="files" id="files_carta_cesion" type="file" />
                        </td>
                    </tr>

                   
                     <tr class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                       <td colspan="4"> <ul class="navlist">
                       <li><button id="btnEnviar" style="width:80px;" class="button" data-bind="click: $root.enviar, visible: rol_usuario() == 6">Enviar</button></li>
                       <li><button id="btnCerrar" style="width:80px;" class="button" data-bind="click: $root.cancelar">Cerrar</button></li></ul> 
                       </td>
                    </tr>


                    <%--Seccion para nuevos tres controles para Dacion, Expediente Adjudicacion, Adjudicacion PAE--%>

                </table>
            </div>
     </div>

    <div id="dialogEdit">
            <div>
                <table style="font-family: Segoe UI,Tahoma,Arial,Verdana,sans-serif; font-size: 0.70em; text-align: right; width: 509px;">
                    <tr class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Envió</span></td>
                        <td style="text-align: left" class="auto-style8"><span data-bind="text: selectedItem() != undefined ? selectedItem().U_ENVIA() : null"></span></td>
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 86px; background: #778899"><span>Fecha envío</span></td>
                        <td style="text-align: left" class="wijmo-wijgrid-innercell"><span data-bind="text: selectedItem() != undefined ? $root.formatfecha(selectedItem().FECHA_ENVIO()) : null"></span></td>
                    </tr>

                    <tr class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Rechazó</span></td>
                        <td style="text-align: left" class="auto-style8"><span data-bind="text: selectedItem() != undefined ? selectedItem().U_RECHAZA() : null"></span></td>
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 86px; background: #778899"><span>Fecha rechazo</span></td>
                        <td style="text-align: left" class="wijmo-wijgrid-innercell"><span data-bind="text: selectedItem() != undefined ? selectedItem().FECHA_RECHAZO() : null"></span></td>
                    </tr>
                    <tr class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Autorizó</span></td>
                        <td style="text-align: left" class="auto-style8"><span data-bind="text: selectedItem() != undefined ? selectedItem().U_AUTORIZA() : null"></span></td>
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 86px; background: #778899"><span>Fecha autorización</span></td>
                        <td style="text-align: left" class="wijmo-wijgrid-innercell"><span data-bind="text: selectedItem() != undefined ? $root.formatfecha(selectedItem().FECHA_AUTORIZACION()) : null"></span></td>
                    </tr>

                    <tr class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Estatus</span></td>
                        <td style="text-align: left" colspan="3"><span data-bind="text: selectedItem() != undefined ? selectedItem().ESTATUS() : null"></span></td>
                    </tr>

                    <tr class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Crédito</span></td>
                        <td style="text-align: left" colspan="3 ">
                            <span data-bind="text: selectedItem() != undefined ? selectedItem().NOCRED() : null"></span>
                        </td>
                        <td colspan="2"></td>
                    </tr>
                    <tr class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Originador</span></td>
                        <td style="text-align: left" colspan="3">
                            <span data-bind="text: selectedItem() != undefined ? selectedItem().ORIGINADOR() : null"></span>
                        </td>
                    </tr>
                     <tr class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row" >
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background:#778899"><span>Fideicomiso</span></td>
                        <td style="text-align:left" colspan="3">
                            <span data-bind="text: selectedItem() != undefined ? selectedItem().BURSA() : null"></span>
                        </td>
                     </tr>


                    <tr class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Tipo operación</span></td>
                        <td style="text-align: left">

                            <span data-bind="text: selectedItem() != undefined ? selectedItem().TIPO_OPERACION() : null"></span>

                        </td>
                        <td colspan="2"></td>
                    </tr>


                     <%-- ocultar fecha avaluo y monto avalo para la opcion de cesion de derechos litigiosos--%>
                   <tr data-bind="visible: !$root.bool_cesionderechos()" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Fecha Avalúo</span></td>
                        <td style="text-align: right">
                            <span data-bind="text: selectedItem() != undefined ? $root.formatfecha(selectedItem().FECHA_AVALUO()) : null"></span>
                        </td>
                        <td colspan="2"></td>
                    </tr>
                     <tr data-bind="visible: !$root.bool_cesionderechos()" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Monto avalúo</span></td>
                        <td style="text-align: right" class="auto-style9">
                            <span data-bind="text: selectedItem() != undefined ? $root.formatoNumeral(selectedItem().MONTO_AVALUO()) : null"></span>
                        </td>
                        <td colspan="2"></td>
                    </tr>
                    <tr  data-bind="visible: $root.bool_ocultafechareporte" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <%--<td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Mes en el que se reporta</span></td>--%>
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Fecha reporte de cobranza</span></td>

                        <%--<td style="text-align: right" class="auto-style10">
                            <span data-bind="text: selectedItem() != undefined ? selectedItem().REPORTADO_EN_MES() : null"></span>
                        </td>--%>
                         <td style="text-align: right">
                            <span data-bind="text: selectedItem() != undefined ? $root.formatfecha(selectedItem().FECHA_REPORTE()) : null"></span>
                        </td>

                        <td colspan="2"></td>
                    </tr>

                     <%--agregar fecha segun escritura para adjudicacion pae--%>


                    <tr  data-bind="visible: bool_dacion_expadj_adjpae" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Fecha segun escritura</span></td>
                        
                         <td style="text-align: right">
                            <span data-bind="text: selectedItem() != undefined ? $root.formatfecha(selectedItem().FECHA_SEGUN_ESCRITURA()) : null"></span>
                        </td>

                        <td colspan="2"></td>
                    </tr>


                    <tr data-bind="visible: booltipo_dacion_adj" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Tipo Liquidación</span></td>
                        <td style="text-align: left" colspan="3">
                            <span data-bind="text: selectedItem() != undefined ? selectedItem().TIPO_LIQ() : null"></span>

                        </td>
                    </tr>
                    <tr data-bind="visible: false" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Concepto</span></td>
                        <td style="text-align: left" colspan="3">

                            <span data-bind="text: selectedItem() != undefined ? selectedItem().CONCEPTO() : null"></span>

                        </td>
                    </tr>
                    <tr data-bind="visible: booltipo_dacion" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Fecha según escritura (dación) </span></td>
                        <td style="text-align: right">
                            <span data-bind="text: selectedItem() != undefined ? $root.formatfecha(selectedItem().FECHA_DACION()) : null"></span>
                        </td>
                        <td colspan="2"></td>
                    </tr>

                    <tr data-bind="visible: booltipo_adjudicacion" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Fecha según escritura (adjudicación) </span></td>
                        <td style="text-align: right">
                            <span data-bind="text: selectedItem() != undefined ? $root.formatfecha(selectedItem().FECHA_ADJUDICACION()) : null"></span>
                        </td>
                        <td colspan="2"></td>
                    </tr>
                    <tr data-bind="visible: bool_apartados" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Fecha de carta de apartado </span></td>
                        <td style="text-align: right">
                            <span data-bind="text: selectedItem() != undefined ? $root.formatfecha(selectedItem().FECHA_CARTA_APARTADO()) : null"></span>
                        </td>
                        <td colspan="2"></td>
                    </tr>

                    <tr data-bind="visible: bool_apartados" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Monto de la propuesta</span></td>
                        <td class="auto-style10" style="text-align: right">

                            <span data-bind="text: selectedItem() != undefined ? $root.formatoNumeral(selectedItem().MONTO_PROPUESTA()) : null"></span>
                        </td>
                        <td colspan="2"></td>
                    </tr>
                    <tr data-bind="visible: bool_apartados" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Fecha de la propuesta </span></td>
                        <td style="text-align: right">
                            <span data-bind="text: selectedItem() != undefined ? $root.formatfecha(selectedItem().FECHA_PROPUESTA()) : null"></span>
                        </td>
                        <td colspan="2"></td>
                    </tr>
                    <tr data-bind="visible: bool_ventas" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Precio venta</span></td>
                        <td class="auto-style10">
                            <span data-bind="text: selectedItem() != undefined ? $root.formatoNumeral(selectedItem().PRECIO_VENTA()) : null"></span>
                        </td>
                        <td colspan="2"></td>
                    </tr>
                    <tr data-bind="visible: bool_ventas" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Saldo en pesos</span></td>
                        <td class="auto-style10">
                            <span data-bind="text: selectedItem() != undefined ? $root.formatoNumeral(selectedItem().SALDO_EN_PESOS()) : null"></span>
                        </td>
                        <td colspan="2"></td>
                    </tr>
                    <tr data-bind="visible: bool_ventas" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Gastos descontados</span></td>
                        <td class="auto-style10">
                            <span data-bind="text: selectedItem() != undefined ? $root.formatoNumeral(selectedItem().GASTOS_DESCONTADOS()) : null"></span></td>
                        <td colspan="2"></td>
                    </tr>
                    <tr data-bind="visible: bool_ventas">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Total pagar al fideicomiso</span></td>
                        <td class="auto-style10">
                            <span data-bind="text: selectedItem() != undefined ? $root.formatoNumeral(selectedItem().TOTAL_PAGAR_FISO()) : null"></span></td>
                        <td colspan="2"></td>
                    </tr>
                    <tr data-bind="visible: bool_ventas" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Fecha de pago al fideicomiso </span></td>
                        <td style="text-align: right">
                            <span data-bind="text: selectedItem() != undefined ? $root.formatfecha(selectedItem().FECHA_PAGO_FISO()) : null"></span>
                        </td>
                        <td colspan="2"></td>
                    </tr>

                    <tr data-bind="visible: bool_ventas" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Mes de cédula de pago</span></td>
                        <td class="auto-style10">
                            <span data-bind="text: selectedItem() != undefined ? selectedItem().MES_CEDULA_PAGO() : null"></span></td>
                        <td colspan="2"></td>
                    </tr>

                   <%--  Seccion Edicion en Cesion de Derechos Litigiosos--%>
                     <tr   data-bind="visible:$root.bool_cesionderechos"  class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                     <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Fecha Captura </span></td>
                     <td style="text-align: left">
                         <span data-bind="text: selectedItem() != undefined ? $root.formatfecha(selectedItem().FECHA_CAPTURA()) : null"></span>
                     </td>
                         <td colspan="2"></td>
                     </tr>

                   <tr   data-bind="visible:$root.bool_cesionderechos" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                       <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Monto Operación</span></td>
                       <td style="text-align: left" class="auto-style9">
                           <span data-bind="text: selectedItem() != undefined ? $root.formatoNumeral(selectedItem().MONTO_OPERACION()) : null"></span>
                       </td>
                       <td colspan="2"></td>
                   </tr>

                      <tr   data-bind="visible:$root.bool_cesionderechos" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                          <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Consecutivo</span></td>
                          <td style="text-align: left" class="auto-style9">
                              <span data-bind="text: selectedItem() != undefined ? selectedItem().CONSECUTIVO_CESION() : null"></span>
                          </td>
                          <td colspan="2"></td>
                      </tr>

                     <%-- Seccion Edicion en Cesion de Derechos Litigiosos--%>

                    <tr data-bind="visible: bool_obs" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Observaciones</span></td>
                        <td style="text-align: left" colspan="3">
                            <textarea id="txtObs" maxlength="500" style="width: 360px; font-family: Segoe UI,Tahoma,Arial,Verdana,sans-serif; font-size: 11px;" rows="4" data-bind="text: selectedItem() != undefined ? selectedItem().OBSERVACIONES() : null"> </textarea></td>
                    </tr>

                    <tr data-bind="visible: selectedItem() != undefined && selectedItem().ListaDoctos() != undefined ? true : false" class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td class="wijgridtd wijdata-type-string ui-state-highlight" style="width: 230px; background: #778899"><span>Documentos</span></td>
                        <td style="text-align: left" colspan="3">
                            <ul data-bind="foreach: selectedItem() != undefined && selectedItem().ListaDoctos() != undefined ? selectedItem().ListaDoctos() : null">
                                <li>
                                    <a href="#" data-bind="text: NOMBRE_ORIGINAL, click: function () { $root.verarchivo($data); }"></a>

                                </li>
                            </ul>
                        </td>
                    </tr>

                    <tr class="wijmo-wijgrid-row ui-widget-content wijmo-wijgrid-datarow" role="row">
                        <td colspan="4">
                            <ul class="navlist">
                                <li>
                                    <button id="btnAutorizar" style="width: 80px;" class="button" data-bind="click: $root.autorizar, visible: rol_usuario() == 5">Autorizar</button></li>
                                <li>
                                    <button id="btnRechazar" style="width: 80px;" class="button" data-bind="click: $root.rechazar, visible: rol_usuario() == 5">Rechazar</button></li>
                                <li>
                                    <button id="btnClose" style="width: 80px;" class="button" data-bind="click: $root.close">Cerrar</button></li>
                            </ul>
                        </td>
                    </tr>

                </table>
            </div>
     </div>

   </form>

</body>
    
</html>
