
$(document).ready(function () {

    $("#dtpfechareporte").attr("disabled", "disabled");
    $("#dtpfechacaptura").attr("disabled", "disabled");

    function ShowProgressAnimation() {
        $("#loading-div-background").css({ opacity: 0.8 });
        $("#loading-div-background").show();
    };
    function HideProgressAnimation() {
        $("#loading-div-background").hide();
    };

    getFechaReporte = function () {
        var d = new Date();
        var mes = d.getMonth()+1
        var anio = d.getFullYear();
        var dia = 1;
        return moment((dia + '-' + mes + '-' + anio)).format("DD/MM/YYYY");
     
    }

   var ViewModel = function () {
        var self = this;

          self.Cat_Tipo_Operacion = {
            Dacion: 1,
            Adjudicacion: 2,
            Ventas: 3,
            Apartados: 4,
            ExpedienteRegularizacion: 5,
            AdjudicacionPAE: 6,
            CesionDerechosLitigiosos: 8,
            CesionDerechosAdjudicatarios: 9,


        };

        self.Rol = {
            Adm_Primaro: 6,
            Adm_Maestro: 5,

        };

        self.urladministradores = 'fControlInmuebles.aspx/GetAdministradores';
        self.urltipoOperacion = 'fControlInmuebles.aspx/GetCatTipoDeOperacion';
        self.urlconcepto = 'fControlInmuebles.aspx/GetCatConcepto';
        self.urlbursas = 'fControlInmuebles.aspx/GetAllBursas';
        self.urlestatus_operacion = 'fControlInmuebles.aspx/GetCatEsatusDeOperacion';
        self.urldatos_credito = 'fControlInmuebles.aspx/GetDatosCredito';
        self.urlLiquidacion = 'fControlInmuebles.aspx/GetTipoLiquidacion';
        
        self.GetUrlGetUserSystemAccessgroup = "fControlInmuebles.aspx/GetUserSystemAccessgroup";
        self.GetUrlGetResumen = "fControlInmuebles.aspx/GetResumenControlInmuebles";
        self.GetUrlUpdateEstatus = "fControlInmuebles.aspx/UpdateEstatus";
        self.UrlInsert = "fControlInmuebles.aspx/Insert";
        self.UrlExportar = "fControlInmuebles.aspx/Exportar";

        self.UrlGetConceptoByLiquidacion = "fControlInmuebles.aspx/GetConcepto_ByTipoLiquidacion";
        self.UrlGetConcepto_Ventas_Apartados = "fControlInmuebles.aspx/GetConcepto_ByTipoOperacion_Ventas_Apartados";

        self.imagePath = ko.observable("Images/img_excel.png");

        self.UrlGetAlertaCreditos = 'fControlInmuebles.aspx/GetAlertaCreditos';
        self.AlertaCreditosArray = ko.observableArray([]);

        self.administradores = ko.mapping.fromJS([]);
        self.tipo_operacion = ko.mapping.fromJS([]);
        self.estatus = ko.mapping.fromJS([]);
        self.conceptos = ko.mapping.fromJS([]);
        self.concepto_liquidacion = ko.mapping.fromJS([]);
        self.bursa = ko.mapping.fromJS([]);
        self.datoscredito = ko.mapping.fromJS([]);
        self.liquidacion = ko.mapping.fromJS([]);
        self.doctos_soporte = ko.mapping.fromJS([]);
        self.users_accessgroup = ko.mapping.fromJS([]);
        self.filesuploaded = ko.observableArray([]);
        self.items = ko.mapping.fromJS([]);

        self.selectedValueAdministrador = ko.observable();
        self.selectedValueLiquidacion = ko.observable();
        self.selectedValueSoporte = ko.observable();
        self.selectedValue_TipoOperacion = ko.observable();
        self.selectedValueReportaMes = ko.observable();
        self.selectedValueMesCedulaPago = ko.observable();
        self.boollinkeliminar = ko.observable(true);
        self.booldocto = ko.observable(true);
        self.boolupload = ko.observable(true);
        self.guid = ko.observable();
        self.rutaarchivo = ko.observable();
        self.selectedItem = ko.observable();

        self.errores = ko.observableArray([]);
        self.booltipo_dacion_adj = ko.observable();
        self.bool_apartados = ko.observable();
        self.bool_ventas = ko.observable();
        self.rol_usuario = ko.observable();
        self.filepath = ko.observable(VtasInmueblesDoctosPath); /* es la ruta path de archivos y cambio para que apunte a VtasInmueblesDoctosPath con la ruta de los documentos de ventas de inmuebles */
        self.booltipo_dacion = ko.observable();
        self.booltipo_adjudicacion = ko.observable();
        self.bool_obs = ko.observable(false);
        self.bool_apartados_ventas = ko.observable();
        self.bool_adjudicacionPAE = ko.observable();
        self.bool_dacion_expadj_adjpae = ko.observable();
        // nuevo cambio de cesión de derechos
        self.bool_cesionderechos = ko.observable();
       self.bool_ocultafechareporte = ko.observable();

        
        self.selectedValue_TipoOperacion.subscribe(function (newValue) {
            self.liquidacion.removeAll();
           // self.concepto_liquidacion.removeAll();
            if (newValue != undefined && newValue != "") {
                var data = {};
                self.filesuploaded.removeAll();
                self.selectedValueReportaMes(null);
                if (self.selectedValue_TipoOperacion() == self.Cat_Tipo_Operacion.Apartados || self.selectedValue_TipoOperacion() == self.Cat_Tipo_Operacion.Ventas || self.selectedValue_TipoOperacion() == self.Cat_Tipo_Operacion.CesionDerechosAdjudicatarios) { //CAMBIO SESION DE DERECHOS ADJUDICATARIOS 22-08-2024
                    
                    //var data = '{"Pk_tipo_operacion" :' + self.setnullvalue(self.selectedValue_TipoOperacion()) + '}';
                    //self.getDatosMapping(self.UrlGetConcepto_Ventas_Apartados, self.concepto_liquidacion, data);
                }
                else {
                    var data = '{"pk_tipo_operacion" :' + self.setnullvalue(self.selectedValue_TipoOperacion()) + '}';
                    self.getDatosMapping(self.urlLiquidacion, self.liquidacion, data);
                }

                
                self.bool_dacion_expadj_adjpae(newValue == self.Cat_Tipo_Operacion.AdjudicacionPAE || newValue == self.Cat_Tipo_Operacion.Adjudicacion || newValue == self.Cat_Tipo_Operacion.Dacion)
                self.bool_adjudicacionPAE(newValue == self.Cat_Tipo_Operacion.AdjudicacionPAE);
                self.bool_apartados_ventas(newValue == self.Cat_Tipo_Operacion.Apartados || newValue == self.Cat_Tipo_Operacion.Ventas || newValue == self.Cat_Tipo_Operacion.Adjudicacion || newValue == self.Cat_Tipo_Operacion.Dacion || newValue == self.Cat_Tipo_Operacion.AdjudicacionPAE || newValue == self.Cat_Tipo_Operacion.CesionDerechosAdjudicatarios); // CAMBIO SESION DE DERECHOS ADJUDICATARIOS 22-08-2024
                self.bool_apartados(newValue == self.Cat_Tipo_Operacion.Apartados);
                self.bool_ventas(newValue == self.Cat_Tipo_Operacion.Ventas || newValue == self.Cat_Tipo_Operacion.CesionDerechosAdjudicatarios); //CAMBIO SESION DE DERECHOS ADJUDICATARIOS 22-08-2024
                self.booltipo_dacion_adj(newValue == self.Cat_Tipo_Operacion.Adjudicacion || newValue == self.Cat_Tipo_Operacion.Dacion);
                self.booltipo_dacion(newValue == self.Cat_Tipo_Operacion.Dacion);
                self.booltipo_adjudicacion(newValue == self.Cat_Tipo_Operacion.Adjudicacion);
                self.bool_cesionderechos(newValue == self.Cat_Tipo_Operacion.CesionDerechosLitigiosos);

            } else {
                self.bool_dacion_expadj_adjpae(false);
                self.bool_apartados_ventas(false);
                self.bool_apartados(false);
                self.bool_ventas(false);
                self.booltipo_dacion_adj(false);
                self.booltipo_dacion(false);
                self.booltipo_adjudicacion(false);
                self.bool_adjudicacionPAE(false);
                self.bool_cesionderechos(false);
                self.filesuploaded.removeAll();
            }

           
        })

        self.meses = ko.observableArray([
              { mes: 1, descripcion: 'Enero' }
            , { mes: 2, descripcion: 'Febrero' }
            , { mes: 3, descripcion: 'Marzo' }
            , { mes: 4, descripcion: 'Abril' }
            , { mes: 5, descripcion: 'Mayo' }
            , { mes: 6, descripcion: 'Junio' }
            , { mes: 7, descripcion: 'Julio' }
            , { mes: 8, descripcion: 'Agosto' }
            , { mes: 9, descripcion: 'Septiembre' }
            , { mes: 10, descripcion: 'Octubre' }
            , { mes: 11, descripcion: 'Noviembre' }
            , { mes: 12, descripcion: 'Diciembre' }
        ]);


        
        self.getDatosMapping = function (url, lista, data) {
           
            $.ajax({
                type: "POST",
                async: true,
                url: url,
                data: data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    for (i = 0; i < data.d.length; i++) {
                        delete data.d[i]['__type'];
                        delete data.d[i]['ExtensionData'];
                    };
                    ko.mapping.fromJS(data.d, lista);
                    
                },
                complete: function (data) {
                   
                },

                error: function (err) {
                   
                    alert('Se ha producido un error en la carga de los datos ' + err.responseText);
                }
            });
            
        };

        self.fillcombos = function () {
            self.getDatosMapping(self.urladministradores, self.administradores, {});

            var data = JSON.stringify(self.ParamPatrimonioApartados(null));
            self.getDatosMapping(self.urltipoOperacion, self.tipo_operacion, data);
            //self.getDatosMapping(self.urlconcepto, self.conceptos, {});
            self.getDatosMapping(self.urlbursas, self.bursa, {});
            self.getDatosMapping(self.urlestatus_operacion, self.estatus, {});
        }

        self.formateafecha = function (f) {
            if (f() != undefined && f() != null && f() != "")
                return moment(f()).format("DD/MM/YYYY");
            return null;
        }

        self.formatfecha = function (f) {
            if (f != undefined && f != null && f != "")
                return moment(f).format("DD/MM/YYYY");
            return null;
        }

        self.formatNumeral = function (d) {
            if (d() != undefined && d() != null && d != "")
                return numeral(d()).format('0,0.00');
            return null;

        }

        self.formatoNumeral = function (d) {
            if (d != undefined && d != null && d != "")
                return numeral(d).format('0,0.00');
            return null;

        }

        self.formatoPorcentaje = function (d) {
            if (d() != undefined && d() != null && d != "")
                return numeral(d()).format('(0.0000%)');
            return null;

        }

        self.setnullvalue = function (value) {
            var valor = null;
            if (value != undefined && value != "") {
                valor = '"' + value + '"';
            }
            return valor;
        };

        self.getData = function () {
           
            self.get_rol_usuario();
            self.get_datos_credito();
            var data = JSON.stringify(self.CrearParametrosBusqueda());

            ShowProgressAnimation();
            $.ajax({
                type: "POST",
                async: true,
                url: self.GetUrlGetResumen,
                data: data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    for (i = 0; i < data.d.length; i++) {
                        delete data.d[i]['__type'];
                        delete data.d[i]['ExtensionData'];
                    };
                    ko.mapping.fromJS(data.d, self.items);
                    if (data.d.length == 0 && data.d != undefined)
                        alert('No se encontraron registros');

                },
                complete: function (data) {
                    HideProgressAnimation();
                },

                error: function (err) {
                    HideProgressAnimation();
                    alert('Se ha producido un error en la carga de los datos ' + err.responseText);
                }
            });

            self.pageIndex(0);

            //if (self.items().length == 0)
            //    alert('No se encontraron registros');
            

        }

       

        self.edit = function (d) {

            
            $("#txtObs").val("");
            var booldisabled = true;
            self.bool_obs(false);
            self.oculta_botones();
            self.selectedItem(d);

            
            //alert(self.selectedItem().FECHA_AUTORIZACION());


            self.bool_dacion_expadj_adjpae(self.selectedItem().PK_TIPO_OPERACION() == self.Cat_Tipo_Operacion.AdjudicacionPAE || self.selectedItem().PK_TIPO_OPERACION() == self.Cat_Tipo_Operacion.Adjudicacion || self.selectedItem().PK_TIPO_OPERACION() == self.Cat_Tipo_Operacion.Dacion)
            self.bool_apartados(self.selectedItem().PK_TIPO_OPERACION() == self.Cat_Tipo_Operacion.Apartados);
            self.bool_ventas(self.selectedItem().PK_TIPO_OPERACION() == self.Cat_Tipo_Operacion.Ventas || self.selectedItem().PK_TIPO_OPERACION() == self.Cat_Tipo_Operacion.CesionDerechosAdjudicatarios); // CAMBIO SESION DE DERECHOS ADJUDICATARIOS 22-08-2024
            self.booltipo_dacion_adj(self.selectedItem().PK_TIPO_OPERACION() == self.Cat_Tipo_Operacion.Adjudicacion || self.selectedItem().PK_TIPO_OPERACION() == self.Cat_Tipo_Operacion.Dacion);
            self.booltipo_dacion(self.selectedItem().PK_TIPO_OPERACION() == self.Cat_Tipo_Operacion.Dacion);
            self.booltipo_adjudicacion(self.selectedItem().PK_TIPO_OPERACION() == self.Cat_Tipo_Operacion.Adjudicacion);
            self.bool_cesionderechos(self.selectedItem().PK_TIPO_OPERACION() == self.Cat_Tipo_Operacion.CesionDerechosLitigiosos);

            //alert('bool_cesionderechos: '+self.bool_cesionderechos())

            booldisabled = self.selectedItem().ESTATUS() != 'ENVIADO';

            if (self.rol_usuario() == self.Rol.Adm_Maestro) {
                self.bool_obs(true);
                if (self.selectedItem().ESTATUS() == 'ENVIADO') {
                    $('#btnAutorizar').show();
                    $('#btnRechazar').show();
                }

               
           }
            else {
                if (self.selectedItem().ESTATUS() != 'ENVIADO') {
                    self.bool_obs(self.selectedItem().OBSERVACIONES() != '' && self.selectedItem().OBSERVACIONES() != null)
                }
               
                $('#btnAutorizar').hide();
                $('#btnRechazar').hide();
            }

            $("#txtObs").val(self.selectedItem().OBSERVACIONES());
            $("#txtObs").prop('readonly', booldisabled);

            $("#dialogEdit").data("kendoWindow").center().open();
            //MENSAJE ASOCIADO A CREDITO DESDE PANTALLA DE CONFIGURACION 05-FEB-2020 GEFC
            if (self.ValidateAlertaCreditos(self.selectedItem().NOCRED())) {
                $("#btnAutorizar").prop("disabled", true);
                $("#btnRechazar").prop("disabled", true);
                alert(self.GetMensajeAlertaCreditos(self.selectedItem().NOCRED()));


            }
            else {
                $("#btnAutorizar").prop("disabled", false);
                $("#btnRechazar").prop("disabled", false);
            }
               

        }
        self.get_datos_credito = function () {

            var data = '{"fk_admor" :' + self.setnullvalue(self.selectedValueAdministrador()) + ' ,"nocred" :' + self.setnullvalue($('#txtcredito').val()) + ' ,"acreditado" :' + self.setnullvalue($('#txtacreditado').val()) + '}';
            self.getDatosMapping(self.urldatos_credito, self.datoscredito, data);
          
        }
        self.selectedCredito = ko.observable();
       self.nuevo = function (d) {

           
           self.selectedCredito(d);

          
            $("#txtMontoAvaluo").data("kendoNumericTextBox").value(0);
            $("#txtTotalPagarFiso").data("kendoNumericTextBox").value(0);
            $("#txtGastosDescontados").data("kendoNumericTextBox").value(0);
            $("#txtSaldoPesos").data("kendoNumericTextBox").value(0);
            $("#txtPrecioVenta").data("kendoNumericTextBox").value(0);
           $("#txtMontoPropuesta").data("kendoNumericTextBox").value(0);
           $("#txtMontoOperacion").data("kendoNumericTextBox").value(0);

            
            var data = JSON.stringify(self.ParamPatrimonioApartados(self.selectedCredito().NOCRED()));
            self.getDatosMapping(self.urltipoOperacion, self.tipo_operacion, data);

            self.bool_dacion_expadj_adjpae(false);
            self.oculta_botones();
            $('#btnEnviar').show();

            self.limpiar_combos();
            self.filesuploaded.removeAll();
            $("#dialog").data("kendoWindow").center().open();
        }
        self.oculta_botones = function () {
            $('#btnAutorizar').hide();
            $('#btnRechazar').hide();
            $('#btnEnviar').hide();
            $('#btnCerrar').show();
            $('#btnClose').show();
        }

        self.GetMensajeAlertaCreditos = function (nocred) {
            var estatus = ko.utils.arrayFirst(model.AlertaCreditosArray(), function (item) {
                return item.NOCRED == nocred;
            });
            return estatus.DESCRIPCION;
        }

        self.ValidateAlertaCreditos = function (nocred) {
            var boolexiste = false;
            var estatus = ko.utils.arrayFirst(model.AlertaCreditosArray(), function (item) {
                return item.NOCRED == nocred;
            }) || false;
            if (estatus) {
                boolexiste = true;
            }
            return boolexiste;
        }

        self.get_rol_usuario = function () {
            ko.utils.arrayForEach(self.users_accessgroup(), function (item) {
                self.rol_usuario(item.PK_ACCESS_GROUP());
            });
        }

        self.deletefile = function (file) {
            if (confirm('¿Desea eliminar el documento de soporte: ' + file.NOMBRE_ORIGINAL + '?')) {
                self.filesuploaded.remove(file);
            } else return false;
        };


        self.executeNonQuery = function (url, data, msg) {

            $.ajax({
                type: "POST",
                async: true,
                url: url,
                data: data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    if (data.d != null) {
                        {
                            if (data.d.success == true)
                            {
                                alert("El registo ha sido " + msg + " exitosamente");
                            }
                            else {
                                alert(data.d.errormessage);
                            }
                               
                        }
                    }

                },
                error: function (err) {
                    alert('Se ha producido un error en la carga de los datos ' + err.responseText);
                }
            });
        }


        self.CrearParametrosBusqueda = function () {
            var data = {};
            var fecini = $("#datepickerini").data("kendoDatePicker");
            var fecfin = $("#datepickerfin").data("kendoDatePicker");
            data.NOCRED = $("#txtcredito").val() == "" ? null : $("#txtcredito").val();
            data.ACREDITADO = $("#txtacreditado").val() == "" ? null : $("#txtacreditado").val();
            data.FK_ADMOR = $("#ddladministrador").val() == "" ? null : $("#ddladministrador").val();
            data.ID_BURSATILIZACION = $("#ddlbursa").val() == "" ? null : $("#ddlbursa").val();
            data.FIDEICOMISO = $("#txtfideicomiso").val() == "" ? null : $("#txtfideicomiso").val();
            data.FK_ESTATUS_OPER = $("#ddlstatus").val() == "" ? null : $("#ddlstatus").val();
            data.FK_CONCEPTO = $("#ddlconceptogasto").val() == "" ? null : $("#ddlconceptogasto").val();
            data.FK_TIPO_OPERACION = $("#ddlTipoOperacion").val() == "" ? null : $("#ddlTipoOperacion").val();
            data.FECINI = fecini == null ? null : kendo.toString(fecini.value(), 'yyyy/MM/dd');
            data.FECFIN = fecfin == null ? null : kendo.toString(fecfin.value(), 'yyyy/MM/dd');
            return data;
        }

        self.ParamPatrimonioApartados = function (nocred) {
            var data = {};
            data.nocred = nocred;
            return data;
        }


        self.verarchivo = function (d) {
            try {
                self.rutaarchivo(self.filepath() + d.NOMBRE_GUID());
                window.open(self.rutaarchivo());
            } catch (e) {
                alert("El archivo seleccionado no existe, por favor verifique")
            }
        };


        self.get_pk_user = function () {
            var pk_user;
            ko.utils.arrayForEach(self.users_accessgroup(), function (item) {
                pk_user = item.PK_USER();
            });

           return pk_user;

        }
        self.autorizar = function () {
           
            var now = new Date();
            var data = JSON.stringify(
                self.parametrosUpdate(
                                      self.selectedItem().PK_CONTROL_INMUEBLES()
                                     , 2
                                     , $("#txtObs").val() == '' ? null : $("#txtObs").val()
                                     , self.get_pk_user()
                                     , null
                                     , moment(now).format('YYYY-MM-DD')
                                     , null)
                                     );
            self.executeNonQuery(self.GetUrlUpdateEstatus, data, "autorizado");
            self.getData();
            $("#dialogEdit").data("kendoWindow").close();
            $("#txtObs").val("");
        }

        self.rechazar = function () {
         
            var now = new Date();
            var data = JSON.stringify(
                self.parametrosUpdate(
                                      self.selectedItem().PK_CONTROL_INMUEBLES()
                                     , 3
                                     , $("#txtObs").val() == '' ? null : $("#txtObs").val()
                                     , null
                                     , self.get_pk_user()
                                     , null
                                     , moment(now).format('YYYY-MM-DD'))
            );

            self.executeNonQuery(self.GetUrlUpdateEstatus, data, "rechazado");
            self.getData();
            
            $("#dialogEdit").data("kendoWindow").close();
            $("#txtObs").val("");
            
        }

        self.parametrosUpdate = function (PK_CONTROL_INMUEBLES, FK_ESTATUS_OPER, OBSERVACIONES, FK_USER_AUTORIZA, FK_USER_RECHAZA, FECHA_AUTORIZACION, FECHA_RECHAZO) {

            var data = {}
            data.PK_CONTROL_INMUEBLES = PK_CONTROL_INMUEBLES;
            data.FK_ESTATUS_OPER = FK_ESTATUS_OPER;
            data.OBSERVACIONES = OBSERVACIONES;
            data.FK_USER_AUTORIZA = FK_USER_AUTORIZA;
            data.FK_USER_RECHAZA = FK_USER_RECHAZA;
            data.FECHA_AUTORIZACION = FECHA_AUTORIZACION;
            data.FECHA_RECHAZO = FECHA_RECHAZO;
            return data;
        }


        self.parametrosInsertar = function (
                                              NOCRED
                                            , ID_CREDITO
                                            , FK_ADMOR
                                            , ORIGINADOR
                                            , FECHA_REPORTE
                                            , FECHA_AVALUO
                                            , MONTO_AVALUO
                                            , FK_TIPO_OPERACION
                                            , FK_TIPO_LIQ
                                            , FK_CONCEPTO
                                            , FECHA_DACION
                                            , FECHA_ADJUDICACION
                                            , FECHA_CARTA_APARTADO
                                            , MONTO_PROPUESTA
                                            , FECHA_PROPUESTA
                                            , PRECIO_VENTA
                                            , SALDO_EN_PESOS
                                            , GASTOS_DESCONTADOS
                                            , TOTAL_PAGAR_FISO
                                            , FECHA_PAGO_FISO
                                            , MES_CEDULA_PAGO
                                            , FECHA_AUTORIZACION
                                            , FECHA_RECHAZO
                                            , FK_USER_ENVIA
                                            , FK_USER_AUTORIZA
                                            , FK_USER_RECHAZA
                                            , OBSERVACIONES
                                            , FECHA_SEGUN_ESCRITURA
                                            , MONTO_OPERACION


            ) {

            var data = {};

            data.NOCRED = NOCRED;
            data.ID_CREDITO = ID_CREDITO;
            data.FK_ADMOR = FK_ADMOR;
            data.ORIGINADOR = ORIGINADOR;
            data.FECHA_REPORTE = FECHA_REPORTE;
            data.FECHA_AVALUO = FECHA_AVALUO;
            data.MONTO_AVALUO = MONTO_AVALUO;
            data.PK_TIPO_OPERACION = FK_TIPO_OPERACION;
            data.FK_TIPO_LIQ = FK_TIPO_LIQ;
            data.FK_CONCEPTO = FK_CONCEPTO;
            data.FECHA_DACION = FECHA_DACION;
            data.FECHA_ADJUDICACION = FECHA_ADJUDICACION;
            data.FECHA_CARTA_APARTADO = FECHA_CARTA_APARTADO;
            data.MONTO_PROPUESTA = MONTO_PROPUESTA;
            data.FECHA_PROPUESTA = FECHA_PROPUESTA;
            data.PRECIO_VENTA = PRECIO_VENTA;
            data.SALDO_EN_PESOS = SALDO_EN_PESOS;
            data.GASTOS_DESCONTADOS = GASTOS_DESCONTADOS;
            data.TOTAL_PAGAR_FISO = TOTAL_PAGAR_FISO;
            data.FECHA_PAGO_FISO = FECHA_PAGO_FISO;
            data.MES_CEDULA_PAGO = MES_CEDULA_PAGO;
            data.FECHA_AUTORIZACION = FECHA_AUTORIZACION;
            data.FECHA_RECHAZO = FECHA_RECHAZO;
            data.FK_USER_ENVIA = FK_USER_ENVIA;
            data.FK_USER_AUTORIZA = FK_USER_AUTORIZA;
            data.FK_USER_RECHAZA = FK_USER_RECHAZA;
            data.OBSERVACIONES = OBSERVACIONES;
            data.FECHA_SEGUN_ESCRITURA = FECHA_SEGUN_ESCRITURA;
            data.MONTO_OPERACION = MONTO_OPERACION;
            data.lista = self.filesuploaded();
            return data;

        }

        self.msgErrores = ko.computed(function () {
            var msg = "";
            ko.utils.arrayForEach(self.errores(), function (item) {
                msg += item + "\n";
            })
            return msg;
        });

        self.isValid = function () {
            self.errores.removeAll();
            if ($("#dtpfechareporte").val() == "" || $("#dtpfechareporte").val() == null)
                self.errores.push("* La fecha reporte es requerida");

            if (self.filesuploaded().length == 0)
                self.errores.push("* Debe cargar los documentos al sistema");

            if ($("#ddltipo_Operacion").val() == "" || $("#ddltipo_Operacion").val() == null) {
                self.errores.push("* El tipo de operación es requerido");
            }

            //if ($("#ddlconcepto").val() == "" || $("#ddlconcepto").val() == null) {
            //    self.errores.push("* El concepto es requerido");
            //}
            else {


                if ($("#ddltipo_Operacion").val() == self.Cat_Tipo_Operacion.Adjudicacion || $("#ddltipo_Operacion").val() == self.Cat_Tipo_Operacion.Dacion || $("#ddltipo_Operacion").val() == self.Cat_Tipo_Operacion.AdjudicacionPAE) {

                    if ($("#ddltipo_Operacion").val() == self.Cat_Tipo_Operacion.Adjudicacion || $("#ddltipo_Operacion").val() == self.Cat_Tipo_Operacion.Dacion) {
                        if ($("#ddlLiquidacion").val() == "" || $("#ddlLiquidacion").val() == null) {
                            self.errores.push("* El tipo de liquidación es requerida");
                        }
                    }
                    
                    
                    if ($("#ddltipo_Operacion").val() == self.Cat_Tipo_Operacion.Dacion) {
                        if ($("#dtpfechadacion").val() == "" || $("#dtpfechadacion").val() == null) {
                            self.errores.push("* La fecha según escritura es requerida");
                        }
                    }

                    if ($("#ddltipo_Operacion").val() == self.Cat_Tipo_Operacion.Adjudicacion) {
                        if ($("#dtpfechaadjudicacion").val() == "" || $("#dtpfechaadjudicacion").val() == null) {
                            self.errores.push("* La fecha según escritura es requerida");
                        }
                    }
                    if ($("#ddltipo_Operacion").val() == self.Cat_Tipo_Operacion.AdjudicacionPAE) {
                        if ($("#dtpfechaSegunEscritura").val() == "" || $("#dtpfechaSegunEscritura").val() == null) {
                            self.errores.push("* La fecha según escritura es requerida");
                        }
                    }

                    if ($("#txtMontoAvaluo").val() == "" || $("#txtMontoAvaluo").val() == null || $("#txtMontoAvaluo").val() == "0")
                        self.errores.push("* El monto avaluo es requerido");

                    if ($("#dtpfechaavaluo").val() == "" || $("#dtpfechaavaluo").val() == null)
                        self.errores.push("* La fecha de avaluo es requerida");


                    var Existe_Escritura = ko.utils.arrayFirst(self.filesuploaded(), function (item) {
                        return item.FK_DOCTO_VTA === 6;
                    }) || false;

                    var Existe_Avaluo = ko.utils.arrayFirst(self.filesuploaded(), function (item) {
                        return item.FK_DOCTO_VTA === 5;
                    }) || false;
                    var Existe_Otro = ko.utils.arrayFirst(self.filesuploaded(), function (item) {
                        return item.FK_DOCTO_VTA === 4;
                    }) || false;

                    if (!Existe_Otro) {
                        self.errores.push("* Debe ingresar documentos en sección (Otros)");
                    }

                    if (!Existe_Escritura) {
                        self.errores.push("* Debe ingresar la Escritura de compra venta");
                    }
                    if (!Existe_Avaluo) {
                        self.errores.push("* Debe ingresar el Avalúo de venta");
                    }


                }

                if ($("#ddltipo_Operacion").val() == self.Cat_Tipo_Operacion.Apartados) {

                    if ($("#dtpfechacarta").val() == "" || $("#dtpfechacarta").val() == null) {
                        self.errores.push("* La fecha de carta de apartado es requerida");
                    }

                    if ($("#txtMontoAvaluo").val() == "" || $("#txtMontoAvaluo").val() == null || $("#txtMontoAvaluo").val() == "0")
                        self.errores.push("* El monto avaluo es requerido");

                    if ($("#dtpfechaavaluo").val() == "" || $("#dtpfechaavaluo").val() == null)
                        self.errores.push("* La fecha de avaluo es requerida");

                    if ($("#txtMontoPropuesta").val() == "" || $("#txtMontoPropuesta").val() == null || $("#txtMontoPropuesta").val() == "0") {
                        self.errores.push("* La monto de la propuesta es requerido");
                    }

                    if ($("#dtpfechapropuesta").val() == "" || $("#dtpfechapropuesta").val() == null) {
                        self.errores.push("* La fecha de propuesta es requerida");
                    }

                }

                if ($("#ddltipo_Operacion").val() == self.Cat_Tipo_Operacion.Ventas || $("#ddltipo_Operacion").val() == self.Cat_Tipo_Operacion.CesionDerechosAdjudicatarios) { // CAMBIO SESION DE DERECHOS ADJUDICATARIOS 22-08-2024

                    if ($("#txtMontoAvaluo").val() == "" || $("#txtMontoAvaluo").val() == null || $("#txtMontoAvaluo").val() == "0")
                        self.errores.push("* El monto avaluo es requerido");

                    if ($("#dtpfechaavaluo").val() == "" || $("#dtpfechaavaluo").val() == null)
                        self.errores.push("* La fecha de avaluo es requerida");

                    if ($("#txtPrecioVenta").val() == "" || $("#txtPrecioVenta").val() == null || $("#txtPrecioVenta").val() == "0") {
                        self.errores.push("* La el precio de venta requerida");
                    }
                    if ($("#txtSaldoPesos").val() == "" || $("#txtSaldoPesos").val() == null || $("#txtSaldoPesos").val() == "0") {
                        self.errores.push("* La monto del saldo en pesos es requerido");
                    }
                    //if ($("#txtGastosDescontados").val() == "" || $("#txtGastosDescontados").val() == null || $("#txtGastosDescontados").val() == "0") {
                    //    self.errores.push("* Debe ingresar los gastos descontados");
                    //}
                    if ($("#txtTotalPagarFiso").val() == "" || $("#txtTotalPagarFiso").val() == null || $("#txtTotalPagarFiso").val() == "0") {
                        self.errores.push("* Debe ingresar el total a pagar al fiso");
                    }
                    if ($("#dtpfechapagofiso").val() == "" || $("#dtpfechapagofiso").val() == null) {
                        self.errores.push("* La fecha de pago al fiso es requerida");
                    }

                    if ($("#ddlmesCedulaPago").val() == "" || $("#ddlmesCedulaPago").val() == null) {
                        self.errores.push("* Debe indicar el mes de cédula de pago");
                    }

                    var ExisteFicha = ko.utils.arrayFirst(self.filesuploaded(), function (item) {
                        return item.FK_DOCTO_VTA === 1;
                    }) || false;

                    var ExisteEscritura = ko.utils.arrayFirst(self.filesuploaded(), function (item) {
                        return item.FK_DOCTO_VTA === 2;
                    }) || false;

                    var ExisteAvaluo = ko.utils.arrayFirst(self.filesuploaded(), function (item) {
                        return item.FK_DOCTO_VTA === 3;
                    }) || false;


                    //var ExisteClg = ko.utils.arrayFirst(self.filesuploaded(), function (item) {
                    //    return item.FK_DOCTO_VTA === 10;
                    //}) || false;



                    if (!ExisteFicha) {
                        self.errores.push("* Debe ingresar la Ficha de depósito");
                    }

                    if (!ExisteEscritura) {
                        self.errores.push("* Debe ingresar la Escritura de compra venta");
                    }
                    if (!ExisteAvaluo) {
                        self.errores.push("* Debe ingresar el Avalúo de venta");
                    }

                    //if (!ExisteClg) {
                    //    self.errores.push("* Debe ingresar CLG");
                    //}



                }
                //Validacion para datos de Cesion de Derechos Litigiosos

                if ($("#ddltipo_Operacion").val() == self.Cat_Tipo_Operacion.CesionDerechosLitigiosos) {

                    if ($("#txtMontoOperacion").val() == "" || $("#txtMontoOperacion").val() == null || $("#txtMontoOperacion").val() == "0") {
                        self.errores.push("* El monto operacion es requerido");
                    }
            
                    var ExisteEscrituraCesion = ko.utils.arrayFirst(self.filesuploaded(), function (item) {
                        return item.FK_DOCTO_VTA === 7;
                    }) || false;

                    var ExisteTransferenciaCesion = ko.utils.arrayFirst(self.filesuploaded(), function (item) {
                        return item.FK_DOCTO_VTA === 8;
                    }) || false;

                    var ExisteCartaCesion = ko.utils.arrayFirst(self.filesuploaded(), function (item) {
                        return item.FK_DOCTO_VTA === 9;
                    }) || false;

                    if (!ExisteEscrituraCesion) {
                        self.errores.push("* Debe ingresar Escritura de cesión o contrato privado de la operacion.");
                    }

                    if (!ExisteTransferenciaCesion) {
                        self.errores.push("* Debe ingresar la Transferencia de recursos a favor del fideicomiso ");
                    }
                    if (!ExisteCartaCesion) {
                        self.errores.push("* Debe ingresar la Carta autorizacion");
                    }


                }
            }

            if (self.errores().length > 0)
                alert(self.msgErrores());

            return self.errores().length == 0;
        }

        self.enviar = function () {

            if (self.isValid()) {

                var data = {};
                var tipo_operacion = $("#ddltipo_Operacion").val();
              
                    data = self.parametrosInsertar(
                          self.selectedCredito().NOCRED()
                        , self.selectedCredito().ID_CREDITO()
                        , self.selectedCredito().FK_ADMOR()
                        , self.selectedCredito().ORIG()
                        , kendo.toString($("#dtpfechareporte").data("kendoDatePicker").value(), 'yyyy/MM/dd') //$("#ddlreportames").val()
                        , (tipo_operacion == self.Cat_Tipo_Operacion.Apartados || tipo_operacion == self.Cat_Tipo_Operacion.Ventas || tipo_operacion == self.Cat_Tipo_Operacion.Dacion || tipo_operacion == self.Cat_Tipo_Operacion.AdjudicacionPAE || tipo_operacion == self.Cat_Tipo_Operacion.Adjudicacion || tipo_operacion == self.Cat_Tipo_Operacion.CesionDerechosAdjudicatarios) ? kendo.toString($("#dtpfechaavaluo").data("kendoDatePicker").value(), 'yyyy/MM/dd') : null // CAMBIO SESION DE DERECHOS ADJUDICATARIOS 22-08-2024
                        , (tipo_operacion == self.Cat_Tipo_Operacion.Apartados || tipo_operacion == self.Cat_Tipo_Operacion.Ventas || tipo_operacion == self.Cat_Tipo_Operacion.Dacion || tipo_operacion == self.Cat_Tipo_Operacion.AdjudicacionPAE || tipo_operacion == self.Cat_Tipo_Operacion.Adjudicacion || tipo_operacion == self.Cat_Tipo_Operacion.CesionDerechosAdjudicatarios) ? $("#txtMontoAvaluo").val() : null                                                         // CAMBIO SESION DE DERECHOS ADJUDICATARIOS 22-08-2024  
                        , $("#ddltipo_Operacion").val()
                        , (tipo_operacion == self.Cat_Tipo_Operacion.Adjudicacion || tipo_operacion == self.Cat_Tipo_Operacion.Dacion) ? $("#ddlLiquidacion").val() : null
                        , $("#ddlconcepto").val() 
                        , (tipo_operacion == self.Cat_Tipo_Operacion.Dacion) ? kendo.toString($("#dtpfechadacion").data("kendoDatePicker").value(), 'yyyy/MM/dd') : null
                        , (tipo_operacion == self.Cat_Tipo_Operacion.Adjudicacion) ? kendo.toString($("#dtpfechaadjudicacion").data("kendoDatePicker").value(), 'yyyy/MM/dd') : null
                        , (tipo_operacion == self.Cat_Tipo_Operacion.Apartados) ? kendo.toString($("#dtpfechacarta").data("kendoDatePicker").value(), 'yyyy/MM/dd') : null
                        , (tipo_operacion == self.Cat_Tipo_Operacion.Apartados) ? $("#txtMontoPropuesta").val() : null
                        , (tipo_operacion == self.Cat_Tipo_Operacion.Apartados) ? kendo.toString($("#dtpfechapropuesta").data("kendoDatePicker").value(), 'yyyy/MM/dd') : null
                        , (tipo_operacion == self.Cat_Tipo_Operacion.Ventas || tipo_operacion == self.Cat_Tipo_Operacion.CesionDerechosAdjudicatarios) ? $("#txtPrecioVenta").val() : null    // CAMBIO SESION DE DERECHOS ADJUDICATARIOS 22-08-2024
                        , (tipo_operacion == self.Cat_Tipo_Operacion.Ventas || tipo_operacion == self.Cat_Tipo_Operacion.CesionDerechosAdjudicatarios) ? $("#txtSaldoPesos").val() : null  // CAMBIO SESION DE DERECHOS ADJUDICATARIOS 22-08-2024
                        , (tipo_operacion == self.Cat_Tipo_Operacion.Ventas || tipo_operacion == self.Cat_Tipo_Operacion.CesionDerechosAdjudicatarios) ? $("#txtGastosDescontados").val() : null  // CAMBIO SESION DE DERECHOS ADJUDICATARIOS 22-08-2024
                        , (tipo_operacion == self.Cat_Tipo_Operacion.Ventas || tipo_operacion == self.Cat_Tipo_Operacion.CesionDerechosAdjudicatarios) ? $("#txtTotalPagarFiso").val() : null  // CAMBIO SESION DE DERECHOS ADJUDICATARIOS 22-08-2024
                        , (tipo_operacion == self.Cat_Tipo_Operacion.Ventas || tipo_operacion == self.Cat_Tipo_Operacion.CesionDerechosAdjudicatarios) ? kendo.toString($("#dtpfechapagofiso").data("kendoDatePicker").value(), 'yyyy/MM/dd') : null // CAMBIO SESION DE DERECHOS ADJUDICATARIOS 22-08-2024
                        , (tipo_operacion == self.Cat_Tipo_Operacion.Ventas || tipo_operacion == self.Cat_Tipo_Operacion.CesionDerechosAdjudicatarios) ? $("#ddlmesCedulaPago").val() : null // CAMBIO SESION DE DERECHOS ADJUDICATARIOS 22-08-2024
                        , null
                        , null
                        , self.get_pk_user()
                        , null
                        , null
                        , null
                        , (tipo_operacion == self.Cat_Tipo_Operacion.AdjudicacionPAE) ? kendo.toString($("#dtpfechaSegunEscritura").data("kendoDatePicker").value(), 'yyyy/MM/dd') : null
                        , (tipo_operacion == self.Cat_Tipo_Operacion.CesionDerechosLitigiosos) ? $("#txtMontoOperacion").val() : null
                            )

            
                var datos = JSON.stringify(data);
                self.executeNonQuery(self.UrlInsert, datos, "insertado");
                self.datoscredito.removeAll();
                self.selectedCredito(null);
                self.filesuploaded.removeAll();
                self.limpiar_combos();
                self.items.removeAll();
                self.getData();
                $("#dialog").data("kendoWindow").close();
            }
        }

        self.selectedValueLiquidacion.subscribe(function (newValue) {
           // self.concepto_liquidacion.removeAll();
            //if (newValue != undefined && newValue != "") {
            //    var data = '{"pk_tipo_liq" :' + self.setnullvalue(self.selectedValueLiquidacion()) + '}';
             
            //    self.getDatosMapping(self.UrlGetConceptoByLiquidacion, self.concepto_liquidacion, data);

            //}

        });
        self.limpiar_combos = function () {
            self.selectedValueLiquidacion(null);
            self.selectedValueSoporte(null);
            self.selectedValueReportaMes(null);
            self.selectedValue_TipoOperacion(null);
            self.selectedValueMesCedulaPago(null);
        }

        self.cancelar = function () {
            self.limpiar_combos();
            $("#dialog").data("kendoWindow").close();
        }
        self.close = function () {
            $("#dialogEdit").data("kendoWindow").close();
            $("#txtObs").val("");
        }

        self.pageSize = ko.observable(25);
        self.pageIndex = ko.observable(0);
        self.maxPageIndex = ko.observable(0);
        self.pageNumber = ko.observable(0);

        self.pagedList = ko.dependentObservable(function () {
            var size = self.pageSize();
            var start = self.pageIndex() * size;
            return self.items.slice(start, start + size);
        });

        self.maxPageIndex = ko.dependentObservable(function () {
            return Math.ceil(self.items().length / self.pageSize()) - 1;
        });

        self.allPages = ko.dependentObservable(function () {
            var pages = [];
            for (i = 0; i <= self.maxPageIndex() ; i++) {
                pages.push({ pageNumber: (i + 1) });
            }
            return pages;
        });
        self.moveToPage = function (index) {
            self.pageIndex(index);
        };

        self.Exportar = function () {
            var data = JSON.stringify(self.CrearParametrosBusqueda());

            ShowProgressAnimation();

            $.ajax({
                type: "POST",
                async: true,
                url: self.UrlExportar,
                data: data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.d != null) {
                        {
                            if (data.d.success == true)

                                HideProgressAnimation();
                           // alert(path);
                                window.open('ARCHIVOS/' + data.d.filename);
                        }
                    }
                },
                error: function (err) {
                    HideProgressAnimation();
                    alert('Se ha producido un error en la carga de los datos ' + err.responseText);
                }
            });
        }

        function CreditoAlerta(data) {
            this.NOCRED = data.Nocred;
            this.DESCRIPCION = data.Descripcion;
        }
        self.getAlertaCreditos = function (url, lista) {
            $.ajax({
                type: "POST",
                url: url,
                data: {},
                async: false,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    for (i = 0; i < data.d.length; i++) {
                        delete data.d[i]['__type'];
                        delete data.d[i]['ExtensionData'];
                    };
                    $.each(data.d, function (i) {
                        lista.push(new CreditoAlerta(data.d[i]));
                    });
                },
                error: function (err) {
                    alert('Se ha producido un error en la carga de los datos ' + err.responseText);
                    HideProgressAnimation();
                    $("#menu").show();
                }
            });
        };


        

       

    }
    var model = new ViewModel();
    model.fillcombos();
    model.getDatosMapping(model.GetUrlGetUserSystemAccessgroup, model.users_accessgroup, {});
    model.getAlertaCreditos(model.UrlGetAlertaCreditos, model.AlertaCreditosArray);

   
    ko.applyBindings(model);
    


    fechadefault = function () {
        var fecha = new Date();
        var day = 1;
        var month = fecha.getMonth() - 3;
        var year = fecha.getFullYear()
        return new Date(year, month, day);
    };

    $("#datepickerini").kendoDatePicker({
        value: fechadefault(),
        format: "dd/MM/yyyy",
        start: "month",
        depth: "month"
    });

    $("#datepickerfin").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        start: "month",
        depth: "month"
    })

    var win = $("#dialog").kendoWindow({
        height: "520px",
        width: "550px",
        title: "Información General",
        visible: false,
        modal: true,
    }).data("kendoWindow");

    var win = $("#dialogEdit").kendoWindow({
        height: "600px",
        width: "550px",
        title: "Información General",
        visible: false,
        modal: true,
    }).data("kendoWindow");



    $("#dtpfechaavaluo").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        start: "month",
        depth: "month"
    })

    $("#txtMontoAvaluo").kendoNumericTextBox({
        min: 0, value: 0, spinners: false, placeholder: "Ingrese la cantidad"
    });

    $("#txtTotalPagarFiso").kendoNumericTextBox({
        min: 0, value: 0, spinners: false, placeholder: "Ingrese la cantidad"
    });

    $("#txtGastosDescontados").kendoNumericTextBox({
        min: 0, value: 0, spinners: false, placeholder: "Ingrese la cantidad"
    });

    $("#txtSaldoPesos").kendoNumericTextBox({
        min: 0, value: 0, spinners: false, placeholder: "Ingrese la cantidad"
    });

    $("#txtPrecioVenta").kendoNumericTextBox({
        min: 0, value: 0, spinners: false, placeholder: "Ingrese la cantidad"
    });

    $("#txtMontoPropuesta").kendoNumericTextBox({
        min: 0, value: 0, spinners: false, placeholder: "Ingrese la cantidad"
    });

    $("#txtMontoOperacion").kendoNumericTextBox({
        min: 0, value: 0, spinners: false, placeholder: "Ingrese la cantidad"
    });

    $("#txtMontoAvaluo").data("kendoNumericTextBox").value(0);
    $("#txtTotalPagarFiso").data("kendoNumericTextBox").value(0);
    $("#txtGastosDescontados").data("kendoNumericTextBox").value(0);
    $("#txtSaldoPesos").data("kendoNumericTextBox").value(0);
    $("#txtPrecioVenta").data("kendoNumericTextBox").value(0);
    $("#txtMontoPropuesta").data("kendoNumericTextBox").value(0);
    $("#txtMontoOperacion").data("kendoNumericTextBox").value(0);

    $("#dtpfechapagofiso").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        start: "month",
        depth: "month"
    })
    $("#dtpfechapropuesta").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        start: "month",
        depth: "month"
    })

    $("#dtpfechacarta").kendoDatePicker({
        value: new Date(getFechaReporte()),
        format: "dd/MM/yyyy",
        start: "month",
        depth: "month"
    })

    $("#dtpfechaadjudicacion").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        start: "month",
        depth: "month"
    })

    $("#dtpfechadacion").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        start: "month",
        depth: "month"
    })

    $("#dtpfechareporte").kendoDatePicker({
        value: new Date(getFechaReporte()),
        format: "dd/MM/yyyy",
        start: "month",
        depth: "month"
    })


    $("#dtpfechaSegunEscritura").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        start: "month",
        depth: "month"
    })

    $("#dtpfechacaptura").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy",
        start: "month",
        depth: "month"
    })


    function getFileInfo(e) {
        return $.map(e.files, function (file) {
            model.filesuploaded.push({ "NOMBRE_GUID": model.guid(), "NOMBRE_ORIGINAL": file.name, "FK_DOCTO_VTA": null });
        })
    };
    function OnUpload(e) {
        //getFileInfo(e);
    };
    function OnComplete(e, response) {

        $(".k-widget.k-upload").find("ul").remove();
    };
    function onSuccess(data) {

        if (data != null) {
            model.guid(data.response.guid);
            getFileInfo(data);
        }
    }
    function onSelect(data) { }

    $("#files").kendoUpload({
        multiple: true,
        async: {
            saveUrl: "KendoUpload.ashx?upload=true&vtas=true",
            removeUrl: "KendoUpload.ashx?remove=true",
            autoUpload: false
        },
        select: onSelect,
        success: onSuccess,
        complete: OnComplete,
        upload: OnUpload,
        localization: {
            "select": "Seleccionar",
            "cancel": "Cancelar",
            "retry": "Reintentar",
            "remove": "Eliminar",
            "uploadSelectedFiles": "Subir archivos",
            "dropFilesHere": "drop files here to upload",
            "statusUploading": "Cargando",
            "statusUploaded": "Cargado",
            "statusFailed": "Falló"
        }
    });


    /*   FICHA DE DEPOSITO */


    function getFileInfoFichas(e) {
        return $.map(e.files, function (file) {
            model.filesuploaded.push({ "NOMBRE_GUID": model.guid(), "NOMBRE_ORIGINAL": file.name, "FK_DOCTO_VTA": 1 });
        })
    };
    function OnCompleteFichas(e, response) {
        $(".k-widget.k-upload").find("ul").remove();
    };
    function onSuccessFichas(data) {
        if (data != null) {
            model.guid(data.response.guid);
            getFileInfoFichas(data);
        }
    }
    $("#filesficha").kendoUpload({
        multiple: true,
        async: {
            saveUrl: "KendoUpload.ashx?upload=true&vtas=true",
            removeUrl: "KendoUpload.ashx?remove=true",
            autoUpload: false
        },
        select: onSelectFichas,
        success: onSuccessFichas,
        complete: OnCompleteFichas,
        localization: {
            "select": "Seleccionar",
            "cancel": "Cancelar",
            "retry": "Reintentar",
            "remove": "Eliminar",
            "uploadSelectedFiles": "Subir archivos",
            "dropFilesHere": "drop files here to upload",
            "statusUploading": "Cargando",
            "statusUploaded": "Cargado",
            "statusFailed": "Falló"
        }
    });

    function onSelectFichas(data) {
        var selectedFile = data.files[0];
        if (selectedFile.size > 10485760) {
            alert("El tamaño del archivo seleccionado " + selectedFile.name + "  excede los 10 Mb permitidos");
            data.preventDefault();
        }
    }

    /*   ESCRITURA DE COMPRA VENTA */


    function getFileInfoEscritura(e) {
        return $.map(e.files, function (file) {
            model.filesuploaded.push({ "NOMBRE_GUID": model.guid(), "NOMBRE_ORIGINAL": file.name, "FK_DOCTO_VTA": 2 });
        })
    };

    function OnCompleteEscritura(e, response) {
        $(".k-widget.k-upload").find("ul").remove();
    };
    function onSuccessEscritura(data) {
        if (data != null) {
            model.guid(data.response.guid);
            getFileInfoEscritura(data);
        }
    }
    $("#filesescritura").kendoUpload({
        multiple: true,
        async: {
            saveUrl: "KendoUpload.ashx?upload=true&vtas=true",
            removeUrl: "KendoUpload.ashx?remove=true",
            autoUpload: false
        },
        select: onSelectEscritura,
        success: onSuccessEscritura,
        complete: OnCompleteEscritura,
        localization: {
            "select": "Seleccionar",
            "cancel": "Cancelar",
            "retry": "Reintentar",
            "remove": "Eliminar",
            "uploadSelectedFiles": "Subir archivos",
            "dropFilesHere": "drop files here to upload",
            "statusUploading": "Cargando",
            "statusUploaded": "Cargado",
            "statusFailed": "Falló"
        }
    });

    function onSelectEscritura(data) {
        var selectedFile = data.files[0];
        if (selectedFile.size > 10485760) {
            alert("El tamaño del archivo seleccionado " + selectedFile.name + "  excede los 10 Mb permitidos");
            data.preventDefault();
        }
    }

     /*   AVALUO  VENTA */
    function getFileInfoAvaluo(e) {
        return $.map(e.files, function (file) {
            model.filesuploaded.push({ "NOMBRE_GUID": model.guid(), "NOMBRE_ORIGINAL": file.name, "FK_DOCTO_VTA": 3 });
        })
    };
    function OnCompleteAvaluo(e, response) {
        $(".k-widget.k-upload").find("ul").remove();
    };
    function onSuccessAvaluo(data) {
        
        if (data != null) {
            model.guid(data.response.guid);
            getFileInfoAvaluo(data);
        }
    }
    $("#filesavaluo").kendoUpload({
        multiple: true,
        async: {
            saveUrl: "KendoUpload.ashx?upload=true&vtas=true",
            removeUrl: "KendoUpload.ashx?remove=true",
            autoUpload: false
        },
        select: onSelectAvaluo,
        success: onSuccessAvaluo,
        complete: OnCompleteAvaluo,
        localization: {
            "select": "Seleccionar",
            "cancel": "Cancelar",
            "retry": "Reintentar",
            "remove": "Eliminar",
            "uploadSelectedFiles": "Subir archivos",
            "dropFilesHere": "drop files here to upload",
            "statusUploading": "Cargando",
            "statusUploaded": "Cargado",
            "statusFailed": "Falló"
        }
    });

    function onSelectAvaluo(data) {
        var selectedFile = data.files[0];
        if (selectedFile.size > 10485760) {
            alert("El tamaño del archivo seleccionado " + selectedFile.name + "  excede los 10 Mb permitidos");
            data.preventDefault();
        }
    }

    /* escritura para dacion, expediednte adjudicacion y adjudicacion PAE */

    /* OTROS */

    function getFileInfo_Otro(e) {
        return $.map(e.files, function (file) {
            model.filesuploaded.push({ "NOMBRE_GUID": model.guid(), "NOMBRE_ORIGINAL": file.name, "FK_DOCTO_VTA": 4 });
        })
    };
    function OnComplete_Otro(e, response) {
        $(".k-widget.k-upload").find("ul").remove();
    };
    function onSuccess_Otro(data) {
        if (data != null) {
            model.guid(data.response.guid);
            getFileInfo_Otro(data);
        }
    }
    $("#files_otro").kendoUpload({
        multiple: true,
        async: {
            saveUrl: "KendoUpload.ashx?upload=true&vtas=true",
            removeUrl: "KendoUpload.ashx?remove=true",
            autoUpload: false
        },
        select: onSelect_Otro,
        success: onSuccess_Otro,
        complete: OnComplete_Otro,
        localization: {
            "select": "Seleccionar",
            "cancel": "Cancelar",
            "retry": "Reintentar",
            "remove": "Eliminar",
            "uploadSelectedFiles": "Subir archivos",
            "dropFilesHere": "drop files here to upload",
            "statusUploading": "Cargando",
            "statusUploaded": "Cargado",
            "statusFailed": "Falló"
        }
    });
    function onSelect_Otro(data) {
        var selectedFile = data.files[0];
        if (selectedFile.size > 10485760) {
            alert("El tamaño del archivo seleccionado " + selectedFile.name + "  excede los 10 Mb permitidos");
            data.preventDefault();
        }
    }

    function getFileInfo_Avaluo(e) {
        return $.map(e.files, function (file) {
            model.filesuploaded.push({ "NOMBRE_GUID": model.guid(), "NOMBRE_ORIGINAL": file.name, "FK_DOCTO_VTA": 5 });
        })
    };
    function OnComplete_Avaluo(e, response) {
        $(".k-widget.k-upload").find("ul").remove();
    };
    function onSuccess_Avaluo(data) {
        if (data != null) {
            model.guid(data.response.guid);
            getFileInfo_Avaluo(data);
        }
    }
    $("#files_avaluo").kendoUpload({
        multiple: true,
        async: {
            saveUrl: "KendoUpload.ashx?upload=true&vtas=true",
            removeUrl: "KendoUpload.ashx?remove=true",
            autoUpload: false
        },
        select: onSelect_Avaluo,
        success: onSuccess_Avaluo,
        complete: OnComplete_Avaluo,
        localization: {
            "select": "Seleccionar",
            "cancel": "Cancelar",
            "retry": "Reintentar",
            "remove": "Eliminar",
            "uploadSelectedFiles": "Subir archivos",
            "dropFilesHere": "drop files here to upload",
            "statusUploading": "Cargando",
            "statusUploaded": "Cargado",
            "statusFailed": "Falló"
        }
    });


    function onSelect_Avaluo(data) {
        var selectedFile = data.files[0];
        if (selectedFile.size > 10485760) {
            alert("El tamaño del archivo seleccionado " + selectedFile.name + "  excede los 10 Mb permitidos");
            data.preventDefault();
        }
    }

    function getFileInfo_Escritura(e) {
        return $.map(e.files, function (file) {
            model.filesuploaded.push({ "NOMBRE_GUID": model.guid(), "NOMBRE_ORIGINAL": file.name, "FK_DOCTO_VTA": 6 });
        })
    };
    function OnComplete_Escritura(e, response) {
        $(".k-widget.k-upload").find("ul").remove();
    };
    function onSuccess_Escritura(data) {
        if (data != null) {
            model.guid(data.response.guid);
            getFileInfo_Escritura(data);
        }
    }
    $("#files_escritura").kendoUpload({
        multiple: true,
        async: {
            saveUrl: "KendoUpload.ashx?upload=true&vtas=true",
            removeUrl: "KendoUpload.ashx?remove=true",
            autoUpload: false
        },
        select: onSelect_Escritura,
        success: onSuccess_Escritura,
        complete: OnComplete_Escritura,
        localization: {
            "select": "Seleccionar",
            "cancel": "Cancelar",
            "retry": "Reintentar",
            "remove": "Eliminar",
            "uploadSelectedFiles": "Subir archivos",
            "dropFilesHere": "drop files here to upload",
            "statusUploading": "Cargando",
            "statusUploaded": "Cargado",
            "statusFailed": "Falló"
        }
    });

    function onSelect_Escritura(data) {
        var selectedFile = data.files[0];
        if (selectedFile.size > 10485760) {
            alert("El tamaño del archivo seleccionado " + selectedFile.name + "  excede los 10 Mb permitidos");
            data.preventDefault();
        }
    }


    // nueva funcionalida

    //Escritura Cesion
    function getFileInfo_EscrituraCesion(e) {
        return $.map(e.files, function (file) {
            model.filesuploaded.push({ "NOMBRE_GUID": model.guid(), "NOMBRE_ORIGINAL": file.name, "FK_DOCTO_VTA": 7 });
        })
    };
    function OnComplete_EscrituraCesion(e, response) {
        $(".k-widget.k-upload").find("ul").remove();
    };
    function onSuccess_EscrituraCesion(data) {
        if (data != null) {
            model.guid(data.response.guid);
            getFileInfo_EscrituraCesion(data);
        }
    }
    $("#files_escritura_cesion").kendoUpload({
        multiple: true,
        async: {
            saveUrl: "KendoUpload.ashx?upload=true&vtas=true",
            removeUrl: "KendoUpload.ashx?remove=true",
            autoUpload: false
        },
        select: onSelect_EscrituraCesion,
        success: onSuccess_EscrituraCesion,
        complete: OnComplete_EscrituraCesion,
        localization: {
            "select": "Seleccionar",
            "cancel": "Cancelar",
            "retry": "Reintentar",
            "remove": "Eliminar",
            "uploadSelectedFiles": "Subir archivos",
            "dropFilesHere": "drop files here to upload",
            "statusUploading": "Cargando",
            "statusUploaded": "Cargado",
            "statusFailed": "Falló"
        }
    });
    function onSelect_EscrituraCesion(data) {
        var selectedFile = data.files[0];
        if (selectedFile.size > 10485760) {
            alert("El tamaño del archivo seleccionado " + selectedFile.name + "  excede los 10 Mb permitidos");
            data.preventDefault();
        }
    }


    //Transferencia Recursos
    function getFileInfo_TransferenciaCesion(e) {
        return $.map(e.files, function (file) {
            model.filesuploaded.push({ "NOMBRE_GUID": model.guid(), "NOMBRE_ORIGINAL": file.name, "FK_DOCTO_VTA": 8 });
        })
    };
    function OnComplete_TransferenciaCesion(e, response) {
        $(".k-widget.k-upload").find("ul").remove();
    };
    function onSuccess_TransferenciaCesion(data) {
        if (data != null) {
            model.guid(data.response.guid);
            getFileInfo_TransferenciaCesion(data);
        }
    }
    $("#files_trans_cesion").kendoUpload({
        multiple: true,
        async: {
            saveUrl: "KendoUpload.ashx?upload=true&vtas=true",
            removeUrl: "KendoUpload.ashx?remove=true",
            autoUpload: false
        },
        select: onSelect_TransferenciaCesion,
        success: onSuccess_TransferenciaCesion,
        complete: OnComplete_TransferenciaCesion,
        localization: {
            "select": "Seleccionar",
            "cancel": "Cancelar",
            "retry": "Reintentar",
            "remove": "Eliminar",
            "uploadSelectedFiles": "Subir archivos",
            "dropFilesHere": "drop files here to upload",
            "statusUploading": "Cargando",
            "statusUploaded": "Cargado",
            "statusFailed": "Falló"
        }
    });
    function onSelect_TransferenciaCesion(data) {
        var selectedFile = data.files[0];
        if (selectedFile.size > 10485760) {
            alert("El tamaño del archivo seleccionado " + selectedFile.name + "  excede los 10 Mb permitidos");
            data.preventDefault();
        }
    }


    //Carta autorizacion
    function getFileInfo_CartaCesion(e) {
        return $.map(e.files, function (file) {
            model.filesuploaded.push({ "NOMBRE_GUID": model.guid(), "NOMBRE_ORIGINAL": file.name, "FK_DOCTO_VTA": 9 });
        })
    };
    function OnComplete_CartaCesion(e, response) {
        $(".k-widget.k-upload").find("ul").remove();
    };
    function onSuccess_CartaCesion(data) {
        if (data != null) {
            model.guid(data.response.guid);
            getFileInfo_CartaCesion(data);
        }
    }
    $("#files_carta_cesion").kendoUpload({
        multiple: true,
        async: {
            saveUrl: "KendoUpload.ashx?upload=true&vtas=true",
            removeUrl: "KendoUpload.ashx?remove=true",
            autoUpload: false
        },
        select: onSelect_CartaCesion,
        success: onSuccess_CartaCesion,
        complete: OnComplete_CartaCesion,
        localization: {
            "select": "Seleccionar",
            "cancel": "Cancelar",
            "retry": "Reintentar",
            "remove": "Eliminar",
            "uploadSelectedFiles": "Subir archivos",
            "dropFilesHere": "drop files here to upload",
            "statusUploading": "Cargando",
            "statusUploaded": "Cargado",
            "statusFailed": "Falló"
        }
    });
    function onSelect_CartaCesion(data) {
        var selectedFile = data.files[0];
        if (selectedFile.size > 10485760) {
            alert("El tamaño del archivo seleccionado " + selectedFile.name + "  excede los 10 Mb permitidos");
            data.preventDefault();
        }
    }


    $("#filesClg").kendoUpload({
        multiple: true,
        async: {
            saveUrl: "KendoUpload.ashx?upload=true&vtas=true",
            removeUrl: "KendoUpload.ashx?remove=true",
            autoUpload: false
        },
        select: onSelectClg,
        success: onSuccessClg,
        complete: OnCompleteClg,
        localization: {
            "select": "Seleccionar",
            "cancel": "Cancelar",
            "retry": "Reintentar",
            "remove": "Eliminar",
            "uploadSelectedFiles": "Subir archivos",
            "dropFilesHere": "drop files here to upload",
            "statusUploading": "Cargando",
            "statusUploaded": "Cargado",
            "statusFailed": "Falló"
        }
    });

    function onSelectClg(data) {
        var selectedFile = data.files[0];
        if (selectedFile.size > 10485760) {
            alert("El tamaño del archivo seleccionado " + selectedFile.name + "  excede los 10 Mb permitidos");
            data.preventDefault();
        }
    }

    function onSuccessClg(data) {

        if (data != null) {
            model.guid(data.response.guid);
            getFileInfoClg(data);
        }
    }

    function getFileInfoClg(e) {
        return $.map(e.files, function (file) {
            model.filesuploaded.push({ "NOMBRE_GUID": model.guid(), "NOMBRE_ORIGINAL": file.name, "FK_DOCTO_VTA": 10 });
        })
    };

    function OnCompleteClg(e, response) {
        $(".k-widget.k-upload").find("ul").remove();
    };

});

