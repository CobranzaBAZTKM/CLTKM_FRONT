import React from "react";
import { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import Grid from '@mui/material/Grid';
import "../../assests/estilos.css"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {TextField, Button} from '@mui/material';
import Servicios from '../../services/servicios';
import FechaHora from '../../services/fechaHora';
import {ModalEspera,ModalInfo} from '../../services/modals';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate  } from "react-router-dom";
import DescargaExcel from "../descargarExcel";

// import { CSVLink } from "react-csv";


const servicio=new Servicios();
const fechaHora=new FechaHora();
const descargarExcel=new DescargaExcel();

export default class DescargaCartera extends React.Component{

    render(){
        return(
            <div>
                <BajarCartera/>
            </div>
        )
    }

}


const BajarCartera=(props)=>{

    const navigate = useNavigate();
    let datosCartera=[];
    

    const [cokkie, setCokkie]=useState(null);
    const [carteraCompleta, setCarteraCompleta]=useState(null);
    const [seg5, setSeg5]=useState(null);
    const [seg28, setSeg28]=useState(null);
    const [seg6, setSeg6]=useState(null);
    const [seg16, setSeg16]=useState(null);
    const [seg21, setSeg21]=useState(null);
    const [descarte, setDescarte]=useState(null);
    const [credimax, setCredimax]=useState(null);
    const [italika, setItalika]=useState(null);
    const [tor, setTor]=useState(null);
    const [tazcdt, setTazCdt]=useState(null);
    const [general, setGeneral]=useState(null);
    const [cartManana, setCartManana]=useState(null);
    const [cartTarde, setCartTarde]=useState(null);
    
    const [openModal, setOpenModal] = React.useState(false);
    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const [mensajeModalInfo, setMensajeModalInfo]=useState(null);
    
    const handleOpen = () => {
        setOpenModal(true);
    };
    const handleClose = () => {
        setOpenModal(false);
    };

    const handleOpenInfo = (mensaje) => {
        setMensajeModalInfo(mensaje);
        setOpenModalInfo(true);
    };
    const handleCloseInfo = () => {
        setOpenModalInfo(false);
    };

    const checkedSeg5=(event)=>{

        if(event.target.checked===true){
            setSeg5("5");
        }
        else{
            setSeg5(null);
        }        
    }

    const checkedSeg28=(event)=>{
        if(event.target.checked===true){
            setSeg28("28");
        }else{
            setSeg28(null);
        }
    }

    const checkedSeg06=(event)=>{
        if(event.target.checked===true){
            setSeg6("6");
        }else{
            setSeg6(null);
        }
    }

    const checkedSeg16=(event)=>{
        if(event.target.checked===true){
            setSeg16("16")
        }else{
            setSeg16(null)
        }
    }

    const checkedSegDescarte=(event)=>{
        if(event.target.checked===true){
            setDescarte("DESCARTE")
        }else{
            setDescarte(null)
        }
    }

    const checkedSegCredimax=(event)=>{
        if(event.target.checked===true){
            setCredimax("CREDIMAX")
        }else{
            setCredimax(null)
        }
    }

    const checkedSegItalika=(event)=>{
        if(event.target.checked===true){
            setItalika("ITALIKA")
        }else{
            setItalika(null)
        }
    }

    const checkedSegTOR=(event)=>{
        if(event.target.checked===true){
            setTor("TOR")
        }else{
            setTor(null)
        }
    }

    const checkedSegTAZCDT=(event)=>{
        if(event.target.checked===true){
            setTazCdt("TAZCDT")
        }else{
            setTazCdt(null)
        }
    }

    const checkedSegGeneral=(event)=>{
        if(event.target.checked===true){
            setGeneral("GENERAL")
        }else{
            setGeneral(null)
        }
    }

    const checkedSeg21=(event)=>{
        if(event.target.checked===true){
            setSeg21("21")
        }else{
            setSeg21(null)
        }
    }

    const checkedManana=(event)=>{
        if(event.target.checked===true){
            setCartManana("M")
        }else{
            setCartManana(null)
        }
    }

    const checkedTarde=(event)=>{
        if(event.target.checked===true){
            setCartTarde("T")
        }else{
            setCartTarde(null)
        }
    }


    const handleOnChanceCookie=(event)=>{
        setCokkie(event.target.value);
    }

    const handleClickDescarga=()=>{
        handleOpen();
        let nombreArchivo="";
        let endPoint="service/carteraLocal/carteraCompletaDia";

        if(carteraCompleta!==null){
            if(carteraCompleta==="CCD"){
                endPoint="service/carteraLocal/carteraCompletaSCLGuardar";
                nombreArchivo="Cartera_Completa_Descarte";
            }else if(carteraCompleta==="CCSFSCL"){
                endPoint="service/cartera/carteraCompleta";
                nombreArchivo="Cartera_Completa_SF_SCL";
            }else if(carteraCompleta==="CCCFL"){
                nombreArchivo="Cartera_Completa_CF_Local";
            }else if(carteraCompleta==="CCSFL"){
                nombreArchivo="Cartera_Completa_SF_Local";
            }

        }
        if(seg5!==null){
            nombreArchivo=nombreArchivo+"Seg05";
        }
        if(seg28!==null){
            nombreArchivo=nombreArchivo+"Seg28";
        }
        if(seg6!==null){
            nombreArchivo=nombreArchivo+"Seg06";
        }
        if(seg16!==null){
            nombreArchivo=nombreArchivo+"Seg16";        
        }
        if(descarte!==null){
            endPoint="service/carteraLocal/carteraConDescarte";
            nombreArchivo=nombreArchivo+"Cartera_Completa_DescarteDia";
        }
        if(credimax!==null){
            endPoint="service/carteraLocal/carteraConDescarte";
            nombreArchivo=nombreArchivo+"CREDIMAX";
        }
        if(italika!==null){
            endPoint="service/carteraLocal/carteraConDescarte";
            nombreArchivo=nombreArchivo+"Italika";
        }
        if(tor!==null){
            endPoint="service/carteraLocal/carteraConDescarte";
            nombreArchivo=nombreArchivo+"TOR";
        }
        if(tazcdt!==null){
            endPoint="service/carteraLocal/carteraConDescarte";
            nombreArchivo=nombreArchivo+"TAZCDT";
        }
        if(general!==null){
            endPoint="service/carteraLocal/carteraConDescarte";
            nombreArchivo=nombreArchivo+"General";
        }
        if(seg21!==null){
            nombreArchivo=nombreArchivo+"Seg21";
        }
        if(cartManana!==null){
            endPoint="service/carteraLocal/carteraConDescarte";
            nombreArchivo=nombreArchivo+"CarteraCompleta_Matutino";
        }
        if(cartTarde!==null){
            endPoint="service/carteraLocal/carteraConDescarte";
            nombreArchivo=nombreArchivo+"CarteraCompleta_Vespertino";
        }


        let json={
            "cookie":cokkie,
            "tipoArchivo":""
        }




        servicio.consumirServicios(json,endPoint).then(
            data=>{
                
                if(data.code===1){
                    let dia=fechaHora.ObtenerDia();
                    let mes=fechaHora.ObtenerMes();
                    let year=fechaHora.ObtenerYear();
                    if(carteraCompleta!=null){
                        if(carteraCompleta==="CCSFL"||carteraCompleta==="CCSFSCL"){
                            carteraSinFiltros(data.data);
                        }else{
                            descartarNumerosSinDatos(data.data);
                        }
                    }else if(seg5!==null){
                        obtenerSeg05(data.data);
                    }else if(seg28!==null){
                        obtenerSeg28(data.data);
                    }else if(seg6!==null){
                        obtenerSeg06(data.data);
                    }else if(seg16!==null){
                        obtenerSeg16(data.data);
                    }else if(descarte!==null){
                        descartarNumerosSinDatos(data.data);
                    }else if(credimax!==null){
                        obtenerCredimax(data.data);
                    }else if(italika!==null){
                        obtenerItalika(data.data);
                    }else if(tor!==null){
                        obtenerTOR(data.data);
                    }else if(tazcdt!==null){
                        obtenerTAZCDT(data.data);
                    }else if(general!==null){
                        obtenerGeneral(data.data);
                    }else if(cartManana!==null){
                        obtenerCarteraManana(data.data);
                    }else if(cartTarde!==null){
                        obtenerCarteraTarde(data.data);
                    }
                    
                    if(datosCartera.length<=75000){
                        let nombreArchivo1=dia+mes+year+"_"+nombreArchivo;
                        let archivo=descargarExcel.descargarExcel(datosCartera,nombreArchivo1);
                        console.log(archivo);

                    }else if(datosCartera.length>75000&&datosCartera.length<=150000){
                        let valor=1;
                        let parte1=[];
                        let parte2=[];
                        datosCartera.forEach(function(element){
                            if(valor<=75000){
                                parte1.push(element);
                            }else{
                                parte2.push(element);
                            }
                            console.log(valor);
                            valor=valor+1;
                            
                        })

                        let nombreArchivo1=dia+mes+year+"_"+nombreArchivo+"_1";
                        let archivo1=descargarExcel.descargarExcel(parte1,nombreArchivo1);
                        console.log(archivo1);

                        let nombreArchivo2=dia+mes+year+"_"+nombreArchivo+"_2";
                        let archivo2=descargarExcel.descargarExcel(parte2,nombreArchivo2);
                        console.log(archivo2);

                    }else if(datosCartera.length>150000){
                        let valor=1;
                        let parte1=[];
                        let parte2=[];
                        let parte3=[];

                        datosCartera.forEach(function(element){
                            if(valor<=75000){
                                parte1.push(element);
                            }else if(valor>75000&&valor<=150000){
                                parte2.push(element);
                            }else if(valor>150000){
                                parte3.push(element);
                            }
                            console.log(valor);
                            valor=valor+1;
                            
                        })

                        let nombreArchivo1=dia+mes+year+"_"+nombreArchivo+"_1";
                        let archivo1=descargarExcel.descargarExcel(parte1,nombreArchivo1);
                        console.log(archivo1);

                        let nombreArchivo2=dia+mes+year+"_"+nombreArchivo+"_2";
                        let archivo2=descargarExcel.descargarExcel(parte2,nombreArchivo2);
                        console.log(archivo2);

                        let nombreArchivo3=dia+mes+year+"_"+nombreArchivo+"_3";
                        let archivo3=descargarExcel.descargarExcel(parte3,nombreArchivo3);
                        console.log(archivo3);

                    }

                    
                    handleClose();
                    handleOpenInfo("La base se descargo correctamente con "+datosCartera.length+" cuentas");
                    enviarCorreoCarteras(datosCartera,nombreArchivo);

                }
                else{
                    handleClose();
                    handleOpenInfo("No se obtuvo la base favor de volver a intentar");
                }
            })

    }


    const descartarNumerosSinDatos=(clientes)=>{
   
        clientes.forEach(function(element){
            if(element.telefono1!=="N/A"&&element.telefono1!=="0"){
                if(!element.estatus_PLAN.includes("VIGENTE")){
                    if(element.estatus_PLAN!=="CUMPLIDO"){
                        llenarArreglo(element);
                    }
                    
                }
            }
            
            
        })
    }

    const carteraSinFiltros=(clientes)=>{
        clientes.forEach(function(element){
            llenarArreglo(element);
        })
    }

    const llenarArreglo=(element)=>{
        let elementoArray={
            "CLIENTE_UNICO":typeof element.cliente_UNICO !== "undefined" ? element.cliente_UNICO : element.CLIENTE_UNICO,
            "NOMBRE_CTE":typeof element.nombre_CTE  !== "undefined" ? element.nombre_CTE : element.NOMBRE_CTE,
            "RFC_CTE":typeof element.rfc_CTE !== "undefined" ? element.rfc_CTE : element.RFC_CTE,
            "GENERO_CLIENTE":typeof element.genero_CLIENTE !== "undefined" ? element.genero_CLIENTE : element.GENERO_CLIENTE,
            "EDAD_CLIENTE":typeof element.edad_CLIENTE !== "undefined" ? element.edad_CLIENTE : element.EDAD_CLIENTE,
            "OCUPACION":typeof element.ocupacion !== "undefined" ? element.ocupacion: element.OCUPACION,
            "CORREO_ELECTRONICO":typeof element.correo_ELECTRONICO !== "undefined" ? element.correo_ELECTRONICO : element.CORREO_ELECTRONICO,
            "DIRECCION_CTE":typeof element.direccion_CTE !== "undefined" ? element.direccion_CTE : element.DIRECCION_CTE,
            "NUM_EXT_CTE":typeof element.num_EXT_CTE !== "undefined" ? element.num_EXT_CTE : element.NUM_EXT_CTE,
            "NUM_INT_CTE":typeof element.num_INT_CTE !== "undefined" ? element.num_INT_CTE : element.NUM_INT_CTE,
            "CP_CTE":typeof element.cp_CTE !== "undefined" ? element.cp_CTE : element.CP_CTE,
            "COLONIA_CTE":typeof element.colonia_CTE !== "undefined" ? element.colonia_CTE : element.COLONIA_CTE,
            "POBLACION_CTE":typeof element.poblacion_CTE !== "undefined" ? element.poblacion_CTE : element.POBLACION_CTE,
            "ESTADO_CTE":typeof element.estado_CTE !== "undefined" ? element.estado_CTE : element.ESTADO_CTE,
            "TERRITORIO":typeof element.territorio !== "undefined" ? element.territorio : element.TERRITORIO,
            "TERRITORIAL":typeof element.territorial !== "undefined" ? element.territorial : element.TERRITORIAL,
            "ZONA":typeof element.zona !== "undefined" ? element.zona : element.ZONA,
            "ZONAL":typeof element.zonal !== "undefined" ? element.zonal : element.ZONAL,
            "NOMBRE_DESPACHO":typeof element.nombre_DESPACHO !== "undefined" ? element.nombre_DESPACHO : element.NOMBRE_DESPACHO,
            "GERENCIA":typeof element.gerencia !== "undefined" ? element.gerencia : element.GERENCIA,
            "FECHA_ASIGNACION":typeof element.fecha_ASIGNACION !== "undefined" ? element.fecha_ASIGNACION : element.FECHA_ASIGNACION,
            "DIAS_ASIGNACION":typeof element.dias_ASIGNACION !== "undefined" ? element.dias_ASIGNACION : element.DIAS_ASIGNACION,
            "REFERENCIAS_DOMICILIO":typeof element.referencias_DOMICILIO !== "undefined" ? element.referencias_DOMICILIO : element.REFERENCIAS_DOMICILIO,
            "CLASIFICACION_CTE":typeof element.clasificacion_CTE !== "undefined" ? element.clasificacion_CTE : element.CLASIFICACION_CTE,
            "DIQUE":typeof element.dique !== "undefined" ? element.dique : element.DIQUE,
            "ATRASO_MAXIMO":typeof element.atraso_MAXIMO !== "undefined" ? element.atraso_MAXIMO : element.ATRASO_MAXIMO,
            "DIAS_ATRASO":typeof element.dias_ATRASO !== "undefined" ? element.dias_ATRASO : element.DIAS_ATRASO,
            "SALDO":typeof element.saldo !== "undefined" ? element.saldo : element.SALDO,
            "MORATORIOS":typeof element.moratorios !== "undefined" ? element.moratorios : element.MORATORIOS,
            "SALDO_TOTAL":typeof element.saldo_TOTAL !== "undefined" ? element.saldo_TOTAL : element.SALDO_TOTAL,
            "SALDO_ATRASADO":typeof element.saldo_ATRASADO !== "undefined" ? element.saldo_ATRASADO : element.SALDO_ATRASADO,
            "SALDO_REQUERIDO":typeof element.saldo_REQUERIDO !== "undefined" ? element.saldo_REQUERIDO : element.SALDO_REQUERIDO,
            "PAGO_PUNTUAL":typeof element.pago_PUNTUAL !== "undefined" ? element.pago_PUNTUAL : element.PAGO_PUNTUAL,
            "PAGO_NORMAL":typeof element.pago_NORMAL !== "undefined" ? element.pago_NORMAL : element.PAGO_NORMAL,
            "PRODUCTO":typeof element.producto !== "undefined" ? element.producto : element.PRODUCTO,
            "FECHA_ULTIMO_PAGO":typeof element.fecha_ULTIMO_PAGO !== "undefined" ? element.fecha_ULTIMO_PAGO : element.FECHA_ULTIMO_PAGO,
            "IMP_ULTIMO_PAGO":typeof element.imp_ULTIMO_PAGO !== "undefined" ? element.imp_ULTIMO_PAGO : element.IMP_ULTIMO_PAGO,
            "CALLE_EMPLEO":typeof element.calle_EMPLEO !== "undefined" ? element.calle_EMPLEO : element.CALLE_EMPLEO,
            "NUM_EXT_EMPLEO":typeof element.num_EXT_EMPLEO !== "undefined" ? element.num_EXT_EMPLEO : element.NUM_EXT_EMPLEO,
            "NUM_INT_EMPLEO":typeof element.num_INT_EMPLEO !== "undefined" ? element.num_INT_EMPLEO : element.NUM_INT_EMPLEO,
            "COLONIA_EMPLEO":typeof element.colonia_EMPLEO !== "undefined" ? element.colonia_EMPLEO : element.COLONIA_EMPLEO,
            "POBLACION_EMPLEO":typeof element.poblacion_EMPLEO !== "undefined" ? element.poblacion_EMPLEO : element.POBLACION_EMPLEO,
            "ESTADO_EMPLEO":typeof element.estado_EMPLEO !== "undefined" ? element.estado_EMPLEO : element.ESTADO_EMPLEO,
            "NOMBRE_AVAL":typeof element.nombre_AVAL !== "undefined" ? element.nombre_AVAL : element.NOMBRE_AVAL,
            "TEL_AVAL":typeof element.tel_AVAL !== "undefined" ? element.tel_AVAL : element.TEL_AVAL,
            "CALLE_AVAL":typeof element.calle_AVAL !== "undefined" ? element.calle_AVAL : element.CALLE_AVAL,
            "NUM_EXT_AVAL":typeof element.num_EXT_AVAL !== "undefined" ? element.num_EXT_AVAL : element.NUM_EXT_AVAL,
            "COLONIA_AVAL":typeof element.colonia_AVAL !== "undefined" ? element.colonia_AVAL : element.COLONIA_AVAL,
            "CP_AVAL":typeof element.cp_AVAL !== "undefined" ? element.cp_AVAL : element.CP_AVAL,
            "POBLACION_AVAL":typeof element.poblacion_AVAL !== "undefined" ?element.poblacion_AVAL : element.POBLACION_AVAL, 
            "ESTADO_AVAL":typeof element.estado_AVAL !== "undefined" ? element.estado_AVAL : element.ESTADO_AVAL,
            "CLIENTE_GRUPAL":typeof element.cliente_GRUPAL !== "undefined" ? element.cliente_GRUPAL : element.CLIENTE_GRUPAL,
            "FIPAISGEO":typeof element.fipaisgeo !== "undefined" ? element.fipaisgeo : element.FIPAISGEO,
            "FICUADRANTEGEO":typeof element.ficuadrantegeo !== "undefined" ? element.ficuadrantegeo : element.FICUADRANTEGEO,
            "FIZONAGEO":typeof element.fizonageo !== "undefined" ? element.fizonageo : element.FIZONAGEO,
            "FIDIAPAGO":typeof element.fidiapago !== "undefined" ? element.fidiapago : element.FIDIAPAGO,
            "TELEFONO1":typeof element.telefono1 !== "undefined" ? element.telefono1 : element.TELEFONO1,
            "TELEFONO2":typeof element.telefono2 !== "undefined" ? element.telefono2 : element.TELEFONO2,
            "TELEFONO3":typeof element.telefono3 !== "undefined" ? element.telefono3 : element.TELEFONO3,
            "TELEFONO4":typeof element.telefono4 !== "undefined" ? element.telefono4 : element.TELEFONO4,
            "TIPOTEL1":typeof element.tipotel1 !== "undefined" ? element.tipotel1 : element.TIPOTEL1,
            "TIPOTEL2":typeof element.tipotel2 !== "undefined" ? element.tipotel2 : element.TIPOTEL2,
            "TIPOTEL3":typeof element.tipotel3 !== "undefined" ? element.tipotel3 : element.TIPOTEL3,
            "TIPOTEL4":typeof element.tipotel4 !== "undefined" ? element.tipotel4 : element.TIPOTEL4,
            "LATITUD":typeof element.latitud !== "undefined" ? element.latitud : element.LATITUD,
            "LONGITUD":typeof element.longitud !== "undefined" ? element.longitud : element.LONGITUD,
            "DESPACHO_GESTIONO":typeof element.despacho_GESTIONO !== "undefined" ? element.despacho_GESTIONO : element.DESPACHO_GESTIONO,
            "ULTIMA_GESTION":typeof element.ultima_GESTION !== "undefined" ? element.ultima_GESTION : element.ULTIMA_GESTION,
            "GESTION_DESC":typeof element.gestion_DESC !== "undefined" ? element.gestion_DESC : element.GESTION_DESC,
            "CAMPANIA_RELAMPAGO":typeof element.campania_RELAMPAGO !== "undefined" ? element.campania_RELAMPAGO : element.CAMPANIA_RELAMPAGO,
            "CAMPANIA":typeof element.campania !== "undefined" ? element.campania : element.CAMPANIA,
            "TIPO_CARTERA":typeof element.tipo_CARTERA !== "undefined" ? element.tipo_CARTERA : element.TIPO_CARTERA,
            "ID_GRUPO":typeof element.id_GRUPO !== "undefined" ? element.id_GRUPO : element.ID_GRUPO,
            "GRUPO_MAZ":typeof element.grupo_MAZ !== "undefined" ? element.grupo_MAZ : element.GRUPO_MAZ,
            "CLAVE_SPEI":typeof element.clave_SPEI !== "undefined" ? element.clave_SPEI : element.CLAVE_SPEI,
            "PAGOS_CLIENTE":typeof element.pagos_CLIENTE !== "undefined" ? element.pagos_CLIENTE : element.PAGOS_CLIENTE,
            "MONTO_PAGOS":typeof element.monto_PAGOS !== "undefined" ? element.monto_PAGOS : element.MONTO_PAGOS,
            "GESTORES":typeof element.gestores !== "undefined" ? element.gestores : element.GESTORES,
            "FOLIO_PLAN":typeof element.folio_PLAN !== "undefined" ? element.folio_PLAN : element.FOLIO_PLAN,
            "SEGMENTO_GENERACION":typeof element.segmento_GENERACION !== "undefined" ? element.segmento_GENERACION : element.SEGMENTO_GENERACION,
            "ESTATUS_PLAN":typeof element.estatus_PLAN !== "undefined" ? element.estatus_PLAN : element.ESTATUS_PLAN,
            "SEMANAS_ATRASO":typeof element.semanas_ATRASO !== "undefined" ? element.semanas_ATRASO : element.SEMANAS_ATRASO,
            "ATRASO":typeof element.atraso !== "undefined" ? element.atraso : element.ATRASO,
            "GENERACION_PLAN":typeof element.generacion_PLAN !== "undefined" ? element.generacion_PLAN : element.GENERACION_PLAN,
            "CANCELACION_CUMPLIMIENTO_PLAN":typeof element.cancelacion_CUMPLIMIENTO_PLAN !== "undefined" ? element.cancelacion_CUMPLIMIENTO_PLAN : element.CANCELACION_CUMPLIMIENTO_PLAN,
            "ULTIMO_ESTATUS":typeof element.ultimo_ESTATUS !== "undefined" ? element.ultimo_ESTATUS : element.ULTIMO_ESTATUS,
            "EMPLEADO":typeof element.empleado !== "undefined" ? element.empleado : element.EMPLEADO,
            "CANAL":typeof element.canal !== "undefined" ? element.canal : element.CANAL,
            "ABONO_SEMANAL":typeof element.abono_SEMANAL !== "undefined" ? element.abono_SEMANAL : element.ABONO_SEMANAL,
            "PLAZO":typeof element.plazo !== "undefined" ? element.plazo : element.PLAZO,
            "MONTO_ABONADO":typeof element.monto_ABONADO !== "undefined" ? element.monto_ABONADO : element.MONTO_ABONADO,
            "MONTO_PLAN":typeof element.monto_PLAN !== "undefined" ? element.monto_PLAN : element.MONTO_PLAN,
            "ENGANCHE":typeof element.enganche !== "undefined" ? element.enganche : element.ENGANCHE,
            "PAGOS_RECIBIDOS":typeof element.pagos_RECIBIDOS !== "undefined" ? element.pagos_RECIBIDOS : element.PAGOS_RECIBIDOS,
            "SALDO_ANTES_DEL_PLAN":typeof element.saldo_ANTES_DEL_PLAN !== "undefined" ? element.saldo_ANTES_DEL_PLAN : element.SALDO_ANTES_DEL_PLAN,
            "SALDO_ATRASADO_ANTES_PLAN":typeof element.saldo_ATRASADO_ANTES_PLAN !== "undefined" ? element.saldo_ATRASADO_ANTES_PLAN : element.SALDO_ATRASADO_ANTES_PLAN,
            "MORATORIOS_ANTES_PLAN":typeof element.moratorios_ANTES_PLAN !== "undefined" ? element.moratorios_ANTES_PLAN : element.MORATORIOS_ANTES_PLAN,
            "ESTATUS_PROMESA_PAGO":typeof element.estatus_PROMESA_PAGO !== "undefined" ? element.estatus_PROMESA_PAGO : element.ESTATUS_PROMESA_PAGO,
            "MONTO_PROMESA_PAGO":typeof element.monto_PROMESA_PAGO !== "undefined" ? element.monto_PROMESA_PAGO : element.MONTO_PROMESA_PAGO,
            "SEGMENTO":typeof element.segmento !== "undefined" ? element.segmento : element.SEGMENTO,
            "SALDO ATRASADO":"N/A",
            "SALDO REQUERIDO":"N/A",
            "STATUSCYBER":"N/A",
            "ID GRUPO":"N/A",
            "PROXIMO_VENCER":"N/A",
            "TUVO_REESTRUCTURA":"N/A",   
            "FECHA_REESTRUCTURA":"N/A",  
            "TELEFONO ADICIONAL 1":"N/A",   
            "TELEFONO ADICIONAL 2":"N/A",
            "GESTOR":"N/A",
            "TURNO": typeof element.turno !== "undefined" ? element.turno:element.TURNO
        }

        datosCartera.push(elementoArray)
    }

    const obtenerSeg05=(cartera)=>{
        datosCartera=[];
        cartera.forEach(function(element){
            if(element.SEGMENTO.includes("5")){
                llenarArreglo(element);
            }

        })
    }

    const obtenerSeg28=(cartera)=>{
        datosCartera=[];
        cartera.forEach(function(element){
            if(element.SEGMENTO.includes("28")){
                llenarArreglo(element);
            }

        })
    }

    const obtenerSeg06=(cartera)=>{
        datosCartera=[];
        cartera.forEach(function(element){
            if(element.SEGMENTO.includes("6")){
                llenarArreglo(element);
            }

        })
    }

    const obtenerSeg16=(cartera)=>{
        datosCartera=[];
        cartera.forEach(function(element){
            if(element.SEGMENTO.includes("16")){
                llenarArreglo(element);
            }

        })
    }

    const obtenerCredimax=(cartera)=>{
        datosCartera=[];
        let carteraCredimax=[]
        cartera.forEach(function(element){
            if(element.producto==="Credimax"){
                carteraCredimax.push(element)
            }
        })
        descartarNumerosSinDatos(carteraCredimax);
    }

    const obtenerItalika=(cartera)=>{
        datosCartera=[];
        let carteraItalika=[]
        cartera.forEach(function(element){
            if(element.producto==="ITALIKA"){
                carteraItalika.push(element)
            }
        })
        descartarNumerosSinDatos(carteraItalika);
    }

    const obtenerTOR=(cartera)=>{
        datosCartera=[];
        let carteraTOR=[]
        cartera.forEach(function(element){
            if(element.producto==="TOR"){
                carteraTOR.push(element)
            }
        })
        descartarNumerosSinDatos(carteraTOR);
    }

    const obtenerTAZCDT=(cartera)=>{
        datosCartera=[];
        let carteraTAZCDT=[]
        cartera.forEach(function(element){
            if(element.producto==="TAZ"||element.producto==="CDT"){
                carteraTAZCDT.push(element)
            }
        })
        descartarNumerosSinDatos(carteraTAZCDT);
    }

    const obtenerGeneral=(cartera)=>{
        datosCartera=[];
        let carteraGeneral=[]
        cartera.forEach(function(element){
            if(element.producto!=="TAZ"&&element.producto!=="CDT"&&element.producto!=="TOR"&&element.producto!=="ITALIKA"&&element.producto!=="Credimax"){
                carteraGeneral.push(element)
            }
        })
        descartarNumerosSinDatos(carteraGeneral);
    }

    const obtenerCarteraManana=(cartera)=>{
        datosCartera=[];
        let carteraManana=[]
        cartera.forEach(function(element){
            if(element.turno==="M"){
                carteraManana.push(element);
            }
        })

        descartarNumerosSinDatos(carteraManana);
    }

    const obtenerCarteraTarde=(cartera)=>{
        datosCartera=[];
        let carteraTarde=[]
        cartera.forEach(function(element){
            if(element.turno==="V"){
                carteraTarde.push(element);
            }

        })

        descartarNumerosSinDatos(carteraTarde)
    }


    const enviarCorreoCarteras=(cartera,nombreArchivo)=>{
        let cantidadCartera=cartera.length;

        let json={
            "asunto":"Cartera "+nombreArchivo,
            "mensaje":"Se encontraron "+cantidadCartera+" cuentas de la cartera "+nombreArchivo,
           
        }

        servicio.consumirServicios(json,"service/notificaciones/enviarCorreoGenerico").then(
            data=>{
                console.log(data)
            }
        )



    }

    const handleClickRegresasr=()=>{
        
        navigate("/CLTKM_FRONT/menu");
    }
    
    return(
        <div>
            <Grid container spacing={1}>
                <Grid item xl={12} lg={12} md={12} sm={12} style={{textAlign:'center'}}>
                    <h1 style={{
                        fontFamily: 'sans-serif',
                        fontSize: '35px',
                        fontWeight: '400',
                        color: '#02761b',

                    }}>
                        Descargar Cartera
                    </h1>
                </Grid>
            </Grid>
            <br/><br/>
            <Grid container spacing={1}>
                <Grid item xl={12} lg={12} md={12} sm={12} style={{textAlign:'center'}}>
                    <TextField id="cokkie" label="Cokkie" variant="outlined" onChange={handleOnChanceCookie}/>
                </Grid>
            </Grid>
            <br/><br/>
            <Grid container spacing={1}>
                <Grid item xl={1} lg={1} md={1} sm={1}></Grid>
                <Grid item xl={4} lg={4} md={4} sm={4}></Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_1">Turno</FormLabel>
                        <RadioGroup>
                            <br/>
                            <FormControlLabel value="carteraCompletaDescarte" control={<Radio onClick={()=>{{setCarteraCompleta("CCD")}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setCartManana(null)}{setCartTarde(null)}{setDescarte(null)}{setCredimax(null)}{setItalika(null)}{setTor(null)}{setTazCdt(null)}{setGeneral(null)}}}/>} label="Cartera Completa Con Descarte" />
                            <br/>
                            <FormControlLabel value="carteraCompletaCFLocal" control={<Radio onClick={()=>{{setCarteraCompleta("CCCFL")}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setCartManana(null)}{setCartTarde(null)}{setDescarte(null)}{setCredimax(null)}{setItalika(null)}{setTor(null)}{setTazCdt(null)}{setGeneral(null)}}}/>} label="Cartera Completa Con Filtros Local sin Descarte" />
                            <br/>
                            <FormControlLabel value="carteraCompletaSFSCL" control={<Radio onClick={()=>{{setCarteraCompleta("CCSFSCL")}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setCartManana(null)}{setCartTarde(null)}{setDescarte(null)}{setCredimax(null)}{setItalika(null)}{setTor(null)}{setTazCdt(null)}{setGeneral(null)}}}/>} label="Cartera Completa Sin Filtros SCL" />
                            <br/>
                            <FormControlLabel value="carteraCompletaSFLocal" control={<Radio onClick={()=>{{setCarteraCompleta("CCSFL")}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setCartManana(null)}{setCartTarde(null)}{setDescarte(null)}{setCredimax(null)}{setItalika(null)}{setTor(null)}{setTazCdt(null)}{setGeneral(null)}}}/>} label="Cartera Completa Sin Filtros Local" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6}></Grid>
            </Grid>
            <br/>
            <Grid container spacing={1}>
                <Grid item xl={1} lg={1} md={1} sm={1}></Grid>

                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_1">Segmento 05 (00 a 25 semanas)</FormLabel>
                        <br/>
                        <FormControlLabel value="Seg05P" control={<Checkbox  disabled={carteraCompleta!=null||seg28!==null||seg6!==null||seg16!==null|| descarte!==null || credimax!==null || italika!==null || tor!==null || tazcdt!==null || general!==null || cartManana!==null || cartTarde!==null} onClick={checkedSeg5}/>} label="Segmento 05 Puro" />
                        <br/>
                    </FormControl>
                </Grid>

                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_2">Segmento 28 (26 a 39 semanas)</FormLabel>
                        <br/>
                        <FormControlLabel value="Seg28P" control={<Checkbox  disabled={carteraCompleta!=null||seg5!==null||seg6!==null||seg16!==null|| descarte!==null || credimax!==null || italika!==null || tor!==null || tazcdt!==null || general!==null || cartManana!==null || cartTarde!==null} onClick={checkedSeg28}/>} label="Segmento 28 Puro" />
                        <br/>
                    </FormControl>
                </Grid>

                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_3">Segmento 06 (40 a 55 semanas)</FormLabel>
                        <br/>
                        <FormControlLabel value="Seg06P" control={<Checkbox disabled={carteraCompleta!=null||seg28!==null||seg5!==null||seg16!==null|| descarte!==null || credimax!==null || italika!==null || tor!==null || tazcdt!==null || general!==null || cartManana!==null || cartTarde!==null} onClick={checkedSeg06}/>} label="Segmento 06 Puro" />
                        <br/>
                    </FormControl>
                </Grid>

                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_4">Segmento 16 (mas de 55 semanas)</FormLabel>
                        <br/>
                        <FormControlLabel value="Seg16P" control={<Checkbox disabled={carteraCompleta!=null||seg28!==null||seg6!==null||seg5!==null|| descarte!==null || credimax!==null || italika!==null || tor!==null || tazcdt!==null || general!==null || cartManana!==null || cartTarde!==null} onClick={checkedSeg16}/>} label="Segmento 16 Puro" />
                        <br/>
                    </FormControl>
                </Grid>

                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_4">Segmentos Elegibles</FormLabel>
                    
                       {/* <FormControlLabel value="21" control={<Checkbox disabled={carteraCompleta!=null || preventa==="Preventa" || italika==="ITALIKA" || tor==="TOR" || cdt==="CDT" || maz==="MAZ" || normalidad==="Normalidad"} onClick={checkedSeg21}/>} label="JUDICIAL" /> */}

                       <FormControlLabel value="carteraDescarte" control={<Checkbox disabled={carteraCompleta!==null || seg5!==null || seg28!==null || seg6!==null || seg16!==null || credimax!==null || italika!==null || tor!==null || tazcdt!==null || general!==null || cartManana!==null || cartTarde!==null} onClick={checkedSegDescarte}/>} label="Cartera Descarte" />
                       <FormControlLabel value="credimax" control={<Checkbox disabled={carteraCompleta!==null || seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null || italika!==null || tor!==null || tazcdt!==null || general!==null || cartManana!==null || cartTarde!==null} onClick={checkedSegCredimax}/>} label="CREDIMAX" />
                       <FormControlLabel value="tazcdt" control={<Checkbox disabled={carteraCompleta!==null || seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null || credimax!==null || italika!==null || tor!==null || general!==null || cartManana!==null || cartTarde!==null} onClick={checkedSegTAZCDT}/>} label="TAZCDT" />
                       <FormControlLabel value="italika" control={<Checkbox disabled={carteraCompleta!==null || seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null || credimax!==null || tor!==null || tazcdt!==null || general!==null || cartManana!==null || cartTarde!==null} onClick={checkedSegItalika}/>} label="Italika" />
                       <FormControlLabel value="tor" control={<Checkbox disabled={carteraCompleta!==null || seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null || credimax!==null || italika!==null || tazcdt!==null || general!==null || cartManana!==null || cartTarde!==null} onClick={checkedSegTOR}/>} label="TOR" />
                       <FormControlLabel value="general" control={<Checkbox disabled={carteraCompleta!==null || seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null || credimax!==null || italika!==null || tor!==null || tazcdt!==null || cartManana!==null || cartTarde!==null} onClick={checkedSegGeneral}/>} label="General" />
                       <FormControlLabel value="carteraManana" control={<Checkbox disabled={carteraCompleta!==null || seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null || credimax!==null || italika!==null || tor!==null || tazcdt!==null || cartTarde!==null} onClick={checkedManana}/>} label="Cartera Mañana" />
                       <FormControlLabel value="carteraVespertino" control={<Checkbox disabled={carteraCompleta!==null || seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null || credimax!==null || italika!==null || tor!==null || tazcdt!==null || cartManana!==null} onClick={checkedTarde}/>} label="Cartera Tarde" />
                    </FormControl>
                </Grid>

                <Grid item xl={1} lg={1} md={1} sm={1}></Grid>
            </Grid>

            <br/><br/><br/>
            <Grid container spacing={1}>
                <Grid item xl={1} lg={1} md={1} sm={1} ></Grid> 
                <Grid item xl={2} lg={2} md={2} sm={2} >
                    <ArrowBackIcon
                        style={{height:"80px",width:"200px"}}
                        onClick={()=>{handleClickRegresasr()}}
                    />
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} ></Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} style={{textAlign:'center'}}>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        style={{height:"50px",width:"200px"}}
                        startIcon={<DownloadIcon style={{height:"40px",width:"50px"}} />}
                        onClick={()=>{handleClickDescarga()}}

                    >
                        Descargar Cartera
                    </Button>                    
                    <Grid item xl={2} lg={2} md={2} sm={2} ></Grid>
                    <Grid item xl={2} lg={2} md={2} sm={2} ></Grid>
                    <Grid item xl={1} lg={1} md={1} sm={1} ></Grid> 
                </Grid>
            </Grid>
            

            <div>
                <ModalEspera open={openModal} handleClose={handleClose} />
                <ModalInfo open={openModalInfo} handleClose={handleCloseInfo} mensaje={mensajeModalInfo} />
            </div>

        </div>


    )
}


