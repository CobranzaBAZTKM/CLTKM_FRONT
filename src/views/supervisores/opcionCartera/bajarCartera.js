import React,{ useState } from "react";
import "../../../assests/estilos.css"
import DescargaExcel from "../../descargarExcel";
import Servicios from '../../../services/servicios';
import FechaHora from '../../../services/fechaHora';
import DownloadIcon from '@mui/icons-material/Download';
import {Grid,FormControlLabel,FormControl,FormLabel,Checkbox,Button} from '@mui/material';
import {ModalEspera,ModalInfo} from '../../../services/modals';

const servicio=new Servicios();
const fechaHora=new FechaHora();
const descargarExcel=new DescargaExcel();


export default class BajarCartera extends React.Component{
    
    render(){
        return(
            <div>
                <BajarBase/>
            </div>
        )
    }
}

const BajarBase=()=>{

    let datosCartera=[];
    const [opcionCartera,setOpcionCartera]=useState(null);
    const [endPoint, setEndPoint]=useState(null);
    const [nombreArchivo,setNombreArchivo]=useState(null);
    const [endPointDescarte]=useState("service/carteraLocal/carteraCompletaSCLGuardar/")
    const [endPointDescarteDia]=useState("service/carteraLocal/carteraConDescarte/");
    const [endPointCarteraComp]=useState("service/carteraLocal/consultarBaseLocalPorCartera/");

    const [openModalCargando, setOpenModalCargando] = React.useState(false);
    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const [mensajeModalInfo, setMensajeModalInfo]=useState(null);

    const handleOpenCargando = () => {
        setOpenModalCargando(true);
    };
    const handleCloseCargando = () => {
        setOpenModalCargando(false);
    };

    const handleOpenInfo = (mensaje) => {
        setMensajeModalInfo(mensaje);
        setOpenModalInfo(true);
    };
    const handleCloseInfo = () => {
        setOpenModalInfo(false);
    };

    const eleccionNorm1=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("1.1");
            setEndPoint(endPointDescarte+"1");
            setNombreArchivo("Cartera_Completa_Descarte_Normalidad");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionNorm2=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("1.2");
            setEndPoint(endPointDescarteDia+"1");
            setNombreArchivo("Cartera_Completa_DescarteDia_Normalidad");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionNorm3=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("1.3");
            setEndPoint(endPointCarteraComp+"1");
            setNombreArchivo("Cartera_Completa_SF_Normalidad");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionNorm4=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("1.4");
            setEndPoint(endPointCarteraComp+"1");
            setNombreArchivo("Cartera_Completa_CF_Normalidad");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionVIP1=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("2.1");
            setEndPoint(endPointDescarte+"2");
            setNombreArchivo("Cartera_Completa_Descarte_VIP");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionVIP2=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("2.2");
            setEndPoint(endPointDescarteDia+"2");
            setNombreArchivo("Cartera_Completa_DescarteDia_VIP");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionVIP3=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("2.3");
            setEndPoint(endPointCarteraComp+"2");
            setNombreArchivo("Cartera_Completa_SF_VIP");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionVIP4=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("2.4");
            setEndPoint(endPointCarteraComp+"2");
            setNombreArchivo("Cartera_Completa_CF_VIP");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionTerr1=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("3.1");
            setEndPoint(endPointDescarte+"3");
            setNombreArchivo("Cartera_Completa_Descarte_Territorios");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionTerr2=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("3.2");
            setEndPoint(endPointDescarteDia+"3");
            setNombreArchivo("Cartera_Completa_DescarteDia_Territorios");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionTerr3=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("3.3");
            setEndPoint(endPointCarteraComp+"3");
            setNombreArchivo("Cartera_Completa_SF_Territorios");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionTerr4=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("3.4");
            setEndPoint(endPointCarteraComp+"3");
            setNombreArchivo("Cartera_Completa_CF_Territorios");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionAband1=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("5.1");
            setEndPoint(endPointDescarte+"5");
            setNombreArchivo("Cartera_Completa_Descarte_Abandonados");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionAband2=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("5.2");
            setEndPoint(endPointDescarteDia+"5");
            setNombreArchivo("Cartera_Completa_DescarteDia_Abandonados");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionAband3=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("5.3");
            setEndPoint(endPointCarteraComp+"5");
            setNombreArchivo("Cartera_Completa_SF_Abandonados");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionAband4=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("5.4");
            setEndPoint(endPointCarteraComp+"5");
            setNombreArchivo("Cartera_Completa_CF_Abandonados");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionImplant1=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("6.1");
            setEndPoint(endPointDescarte+"6");
            setNombreArchivo("Cartera_Completa_Descarte_Implant");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionImplant2=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("6.2");
            setEndPoint(endPointDescarteDia+"6");
            setNombreArchivo("Cartera_Completa_DescarteDia_Implant");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionImplant3=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("6.3");
            setEndPoint(endPointCarteraComp+"6");
            setNombreArchivo("Cartera_Completa_SF_Implant");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionImplant4=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("6.4");
            setEndPoint(endPointCarteraComp+"6");
            setNombreArchivo("Cartera_Completa_CF_Implant");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionTAZ1=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("7.1");
            setEndPoint(endPointDescarte+"7");
            setNombreArchivo("Cartera_Completa_Descarte_TAZ");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionTAZ2=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("7.2");
            setEndPoint(endPointDescarteDia+"7");
            setNombreArchivo("Cartera_Completa_DescarteDia_TAZ");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionTAZ3=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("7.3");
            setEndPoint(endPointCarteraComp+"7");
            setNombreArchivo("Cartera_Completa_SF_TAZ");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionTAZ4=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("7.4");
            setEndPoint(endPointCarteraComp+"7");
            setNombreArchivo("Cartera_Completa_CF_TAZ");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionTOR1=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("8.1");
            setEndPoint(endPointDescarte+"8");
            setNombreArchivo("Cartera_Completa_Descarte_TOR");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionTOR2=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("8.2");
            setEndPoint(endPointDescarteDia+"8");
            setNombreArchivo("Cartera_Completa_DescarteDia_TOR");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionTOR3=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("8.3");
            setEndPoint(endPointCarteraComp+"8");
            setNombreArchivo("Cartera_Completa_SF_TOR");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionTOR4=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("8.4");
            setEndPoint(endPointCarteraComp+"8");
            setNombreArchivo("Cartera_Completa_CF_TOR");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionSaldAlt1=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("9.1");
            setEndPoint(endPointDescarte+"9");
            setNombreArchivo("Cartera_Completa_Descarte_Saldos_Altos");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionSaldAlt2=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("9.2");
            setEndPoint(endPointDescarteDia+"9");
            setNombreArchivo("Cartera_Completa_DescarteDia_Saldos_Altos");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionSaldAlt3=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("9.3");
            setEndPoint(endPointCarteraComp+"9");
            setNombreArchivo("Cartera_Completa_SF_Saldos_Altos");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionSaldAlt4=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("9.4");
            setEndPoint(endPointCarteraComp+"9");
            setNombreArchivo("Cartera_Completa_CF_Saldos_Altos");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionItalika1=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("10.1");
            setEndPoint(endPointDescarte+"10");
            setNombreArchivo("Cartera_Completa_Descarte_Italika");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionItalika2=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("10.2");
            setEndPoint(endPointDescarteDia+"10");
            setNombreArchivo("Cartera_Completa_DescarteDia_Italika");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionItalika3=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("10.3");
            setEndPoint(endPointCarteraComp+"10");
            setNombreArchivo("Cartera_Completa_SF_Italika");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionItalika4=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("10.4");
            setEndPoint(endPointCarteraComp+"10");
            setNombreArchivo("Cartera_Completa_CF_Italika");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionCartera1=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("CCSF");
            setEndPoint(endPointCarteraComp+"0");
            setNombreArchivo("Cartera_Completa_SF");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionCartera2=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("CCCF");
            setEndPoint(endPointCarteraComp+"0");
            setNombreArchivo("Cartera_Completa_CF");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionCartera3=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("CJDP");
            setEndPoint("service/carteraLocal/carteraConDescarteCompletaProceso");
            setNombreArchivo("Cartera_Completa_Descarte_Proceso");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const eleccionCartera4=(event)=>{
        if(event.target.checked===true){
            setOpcionCartera("CJDD");
            setEndPoint("service/carteraLocal/carteraConDescarteCompleta");
            setNombreArchivo("Cartera_Completa_Descarte_Dia");
        }
        else{
            setOpcionCartera(null);
            setEndPoint(null);
            setNombreArchivo(null);
        }      
    }

    const handleClickDescarga=()=>{
        handleOpenCargando();
        let json={
            "":""
        }

        servicio.consumirServicios(json,endPoint).then(
            data=>{
                
                if(data.code===1){
                    let dia=fechaHora.ObtenerDia();
                    let mes=fechaHora.ObtenerMes();
                    let year=fechaHora.ObtenerYear();

                    if(opcionCartera==="CCSF"||opcionCartera==="1.3"||opcionCartera==="2.3"||opcionCartera==="3.3"||opcionCartera==="4.3"||opcionCartera==="5.3"||opcionCartera==="6.3"||opcionCartera==="7.3"||opcionCartera==="8.3"||opcionCartera==="9.3"||opcionCartera==="10.3"){
                        carteraSinFiltros(data.data);
                    }else{
                        descartarNumerosSinDatos(data.data);
                    }

                    let descarga=[];
                    let bandera=0;
                    datosCartera.forEach(function(element){
                        if(descarga.length===70000){
                            descargarExcel.descargarExcel(descarga,dia+mes+year+"_"+nombreArchivo);
                            descarga=[];
                        }

                        descarga.push(element)
                        bandera=bandera+1;

                        if(bandera===datosCartera.length){
                            descargarExcel.descargarExcel(descarga,dia+mes+year+"_"+nombreArchivo);
                            descarga=[];
                        }                        
                    })

                    handleCloseCargando();
                    handleOpenInfo("La base se descargo correctamente con "+datosCartera.length+" cuentas");
                }else{
                    handleCloseCargando();
                    handleOpenInfo("No se obtuvo la base favor de volver a intentar"); 
                }
            }
        )
        

    }
    
    const descartarNumerosSinDatos=(clientes)=>{
   
        clientes.forEach(function(element){
            if(element.telefono1.length===10){
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
            "TURNO": typeof element.turno !== "undefined" ? element.turno:element.TURNO,
            "TIPO_CARTERA_TKM":typeof element.tipocarteratkm!== "undefined"?element.tipocarteratkm:element.tipocarteratkm,
        }

        datosCartera.push(elementoArray)
    }



    return(
        <div>
            <Grid container spacing={1}>
                <Grid item xl={3} lg={3} md={3} sm={3}/>
                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label_4">Cartera Completa Pura</FormLabel>
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="CCSF"&&opcionCartera!==null} onClick={eleccionCartera1}/>} label="Cartera Completa Junta Pura Sin Filtros" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="CCCF"&&opcionCartera!==null} onClick={eleccionCartera2}/>} label="Cartera Completa Junta Pura Con Filtros" />
                    </FormControl>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label_4">Cartera Con Descarte (Proceso)</FormLabel>
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="CJDP"&&opcionCartera!==null} onClick={eleccionCartera3}/>} label="Carteras Completas Juntas Con Descarte (Proceso Limpieza)" />
                    </FormControl>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label_4">Cartera Con Descarte Dia</FormLabel>
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="CJDD"&&opcionCartera!==null} onClick={eleccionCartera4}/>} label="Cartera Completa Juntas Con Descarte del Dia" />
                    </FormControl>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={3}/>
            </Grid>
            <br/>
            <Grid container spacing={1}>
                <Grid item xl={1} lg={1} md={1} sm={1}/>
                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label_4">Normalidad</FormLabel>
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="1.1"&&opcionCartera!==null} onClick={eleccionNorm1}/>} label="Cartera Completa Con Descarte" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=='1.2'&&opcionCartera!==null} onClick={eleccionNorm2}/>} label="Cartera Completa Con Descarte Dia" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=='1.3'&&opcionCartera!==null} onClick={eleccionNorm3}/>} label="Cartera Completa Sin Filtros" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=='1.4'&&opcionCartera!==null} onClick={eleccionNorm4}/>} label="Cartera Completa Con Filtros" />
                    </FormControl>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label_4">VIP</FormLabel>
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="2.1"&&opcionCartera!==null} onClick={eleccionVIP1}/>} label="Cartera Completa Con Descarte" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="2.2"&&opcionCartera!==null} onClick={eleccionVIP2}/>} label="Cartera Completa Con Descarte Dia" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="2.3"&&opcionCartera!==null} onClick={eleccionVIP3}/>} label="Cartera Completa Sin Filtros" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="2.4"&&opcionCartera!==null} onClick={eleccionVIP4}/>} label="Cartera Completa Con Filtros" />
                    </FormControl>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label_4">Territorios</FormLabel>
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="3.1"&&opcionCartera!==null} onClick={eleccionTerr1}/>} label="Cartera Completa Con Descarte" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="3.2"&&opcionCartera!==null} onClick={eleccionTerr2}/>} label="Cartera Completa Con Descarte Dia" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="3.3"&&opcionCartera!==null} onClick={eleccionTerr3}/>} label="Cartera Completa Sin Filtros" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="3.4"&&opcionCartera!==null} onClick={eleccionTerr4}/>} label="Cartera Completa Con Filtros" />
                    </FormControl>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label_4">Abandonados</FormLabel>
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="5.1"&&opcionCartera!==null} onClick={eleccionAband1}/>} label="Cartera Completa Con Descarte" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="5.2"&&opcionCartera!==null} onClick={eleccionAband2}/>} label="Cartera Completa Con Descarte Dia" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="5.3"&&opcionCartera!==null} onClick={eleccionAband3}/>} label="Cartera Completa Sin Filtros" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="5.4"&&opcionCartera!==null} onClick={eleccionAband4}/>} label="Cartera Completa Con Filtros" />
                    </FormControl>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label_4">Implant</FormLabel>
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="6.1"&&opcionCartera!==null} onClick={eleccionImplant1}/>} label="Cartera Completa Con Descarte" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="6.2"&&opcionCartera!==null} onClick={eleccionImplant2}/>} label="Cartera Completa Con Descarte Dia" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="6.3"&&opcionCartera!==null} onClick={eleccionImplant3}/>} label="Cartera Completa Sin Filtros" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="6.4"&&opcionCartera!==null} onClick={eleccionImplant4}/>} label="Cartera Completa Con Filtros" />
                    </FormControl>
                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={1}/>
            </Grid>
            <br/>
            <Grid container spacing={1}>
                <Grid item xl={1} lg={1} md={1} sm={1}/>
                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label_4">TAZ</FormLabel>
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="7.1"&&opcionCartera!==null} onClick={eleccionTAZ1}/>} label="Cartera Completa Con Descarte" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="7.2"&&opcionCartera!==null} onClick={eleccionTAZ2}/>} label="Cartera Completa Con Descarte Dia" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="7.3"&&opcionCartera!==null} onClick={eleccionTAZ3}/>} label="Cartera Completa Sin Filtros" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="7.4"&&opcionCartera!==null} onClick={eleccionTAZ4}/>} label="Cartera Completa Con Filtros" />
                    </FormControl>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label_4">TOR</FormLabel>
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="8.1"&&opcionCartera!==null} onClick={eleccionTOR1}/>} label="Cartera Completa Con Descarte" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="8.2"&&opcionCartera!==null} onClick={eleccionTOR2}/>} label="Cartera Completa Con Descarte Dia" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="8.3"&&opcionCartera!==null} onClick={eleccionTOR3}/>} label="Cartera Completa Sin Filtros" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="8.4"&&opcionCartera!==null} onClick={eleccionTOR4}/>} label="Cartera Completa Con Filtros" />
                    </FormControl>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label_4">Saldos Altos</FormLabel>
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="9.1"&&opcionCartera!==null} onClick={eleccionSaldAlt1}/>} label="Cartera Completa Con Descarte" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="9.2"&&opcionCartera!==null} onClick={eleccionSaldAlt2}/>} label="Cartera Completa Con Descarte Dia" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="9.3"&&opcionCartera!==null} onClick={eleccionSaldAlt3}/>} label="Cartera Completa Sin Filtros" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="9.4"&&opcionCartera!==null} onClick={eleccionSaldAlt4}/>} label="Cartera Completa Con Filtros" />
                    </FormControl>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label_4">Italika</FormLabel>
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="10.1"&&opcionCartera!==null} onClick={eleccionItalika1}/>} label="Cartera Completa Con Descarte" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="10.2"&&opcionCartera!==null} onClick={eleccionItalika2}/>} label="Cartera Completa Con Descarte Dia" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="10.3"&&opcionCartera!==null} onClick={eleccionItalika3}/>} label="Cartera Completa Sin Filtros" />
                        <br/>
                        <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={opcionCartera!=="10.4"&&opcionCartera!==null} onClick={eleccionItalika4}/>} label="Cartera Completa Con Filtros" />
                    </FormControl>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={3}/>
            </Grid>
            <br/>
            <Grid container spacing={1}>
                <Grid item xl={5} lg={5} md={5} sm={5}/>
                <Grid item xl={2} lg={2} md={2} sm={2} style={{textAlign:'center'}}>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        style={{height:"50px",width:"200px"}}
                        startIcon={<DownloadIcon style={{height:"40px",width:"50px"}} />}
                        disabled={opcionCartera===null}
                        onClick={()=>{handleClickDescarga()}}

                    >
                        Descargar Cartera
                    </Button>
                </Grid>                    
                <Grid item xl={5} lg={5} md={5} sm={5}/>                 
            </Grid>
            <div>
                <ModalEspera open={openModalCargando} handleClose={handleCloseCargando} />
                <ModalInfo open={openModalInfo} handleClose={handleCloseInfo} mensaje={mensajeModalInfo} />
            </div>
        </div>
    )
}