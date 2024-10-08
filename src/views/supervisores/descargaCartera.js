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
import * as XLSX from 'xlsx';

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
    const [carteraCompletaVIP, setCarteraCompletaVIP]=useState(null);
    const [carteraCompletaTerritorios, setCarteraCompletaTerritorios]=useState(null);
    const [carteraCompletaDiezYears, setCarteraDiezYears]=useState(null);
    const [carteraCompletaAbandonados,setCarteraCompletaAbandonados]=useState(null);
    const [carteraCompletaImplant, setCarteraCompletaImplant]=useState(null);
    const [carteraCompletaTAZ, setCarteraCompletaTAZ]=useState(null);
    const [carteraCompletaTOR, setCarteraCompletaTOR]=useState(null);
    const [carteraCompletaSaldosAltos,setCarterasCompletasSaldosAltos]=useState(null);
    const [carteraCompletaItalika, setCarteraCompletaItalika]=useState(null);

    const [seg5, setSeg5]=useState(null);
    const [seg28, setSeg28]=useState(null);
    const [seg6, setSeg6]=useState(null);
    const [seg5VIP, setSeg5VIP]=useState(null);
    const [seg28VIP, setSeg28VIP]=useState(null);
    const [seg6VIP, setSeg6VIP]=useState(null);
    const [seg16, setSeg16]=useState(null);
    const [seg21, setSeg21]=useState(null);
    const [descarte, setDescarte]=useState(null);
    const [descarteVIP, setDescarteVIP]=useState(null);
    const [descarteTerritorios, setDescarteTerritorios]=useState(null);
    const [descarteDiezYears, setDescarteDiezYears]=useState(null);
    const [descarteCompleto,setDescarteCompleto]=useState(null);
    const [basePuraCF, setBasePuraCF]=useState(null);
    const [basePuraSF,setBasePuraSF]=useState(null);
    const [descarteAband, setDescarteAband]=useState(null);
    const [descarteImplant, setDescarteImplant]=useState(null);
    const [descarteTAZ, setDescarteTAZ]=useState(null);
    const [descarteTOR, setDescarteTOR]=useState(null);
    const [descarteSalAlt, setDescarteSalAlt]=useState(null);
    const [descarteItalika, setDescarteItalika]=useState(null);
    // const [cartManana, setCartManana]=useState(null);
    // const [cartTarde, setCartTarde]=useState(null);

    
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

    const checkedSeg5VIP=(event)=>{
        if(event.target.checked===true){
            setSeg5VIP("5V");
        }
        else{
            setSeg5VIP(null);
        }    
    }

    const checkedSeg28=(event)=>{
        if(event.target.checked===true){
            setSeg28("28");
        }else{
            setSeg28(null);
        }
    }

    const checkedSeg28VIP=(event)=>{
        if(event.target.checked===true){
            setSeg28VIP("28V");
        }else{
            setSeg28VIP(null);
        }
    }


    const checkedSeg06=(event)=>{
        if(event.target.checked===true){
            setSeg6("6");
        }else{
            setSeg6(null);
        }
    }

    const checkedSeg06VIP=(event)=>{
        if(event.target.checked===true){
            setSeg6VIP("6V");
        }else{
            setSeg6VIP(null);
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

    const checkedSegDescarteVIP=(event)=>{
        if(event.target.checked===true){
            setDescarteVIP("DESCARTEVIP")
        }else{
            setDescarteVIP(null)
        }

        
    }

    const checkedSegDescarteTerritorios=(event)=>{
        if(event.target.checked===true){
            setDescarteTerritorios("DESCARTETERR")
        }else{
            setDescarteTerritorios(null)
        }

        
    }

    const checkedSegDescarteDiez=(event)=>{
        if(event.target.checked===true){
            setDescarteDiezYears("DESCARTEDIEZ")
        }else{
            setDescarteDiezYears(null)
        }        
    }

    const checkedSegDescarteAband=(event)=>{
        if(event.target.checked===true){
            setDescarteAband("DESCARTEABAND")
        }else{
            setDescarteAband(null)
        }        
    }

    const checkedSegDescarteImplant=(event)=>{
        if(event.target.checked===true){
            setDescarteImplant("DESCARTEIMPL")
        }else{
            setDescarteImplant(null)
        }        
    }

    const checkedSegDescarteTAZ=(event)=>{
        if(event.target.checked===true){
            setDescarteTAZ("DESCARTETAZ")
        }else{
            setDescarteTAZ(null)
        }        
    }

    const checkedSegDescarteTOR=(event)=>{
        if(event.target.checked===true){
            setDescarteTOR("DESCARTETOR")
        }else{
            setDescarteTOR(null)
        }        
    }

    const checkedSegDescarteSA=(event)=>{
        if(event.target.checked===true){
            setDescarteSalAlt("DESCARTESA")
        }else{
            setDescarteSalAlt(null)
        }        
    }

    const checkedSegDescarteItalika=(event)=>{
        if(event.target.checked===true){
            setDescarteItalika("DESCARTEITK")
        }else{
            setDescarteItalika(null)
        }        
    }

    const checkedSegDescarteJunt=(event)=>{
        if(event.target.checked===true){
            setDescarteCompleto("DESCARTECOMPL")
        }else{
            setDescarteCompleto(null)
        }        
    }


    const checkedSegCartsJunSF=(event)=>{
        if(event.target.checked===true){
            setBasePuraSF("JUNTASSF")
        }else{
            setBasePuraSF(null)
        }        
    }

    const checkedSegCartsJunCF=(event)=>{
        if(event.target.checked===true){
            setBasePuraCF("JUNTASCF")
        }else{
            setBasePuraCF(null)
        }        
    }





    // const checkedManana=(event)=>{
    //     if(event.target.checked===true){
    //         setCartManana("M")
    //     }else{
    //         setCartManana(null)
    //     }
    // }

    // const checkedTarde=(event)=>{
    //     if(event.target.checked===true){
    //         setCartTarde("T")
    //     }else{
    //         setCartTarde(null)
    //     }
    // }


    const handleOnChanceCookie=(event)=>{
        setCokkie(event.target.value);
    }

    const handleClickDescarga=()=>{
        handleOpen();
        let nombreArchivo="";
        let endPoint="service/carteraLocal/carteraCompletaDia";

        if(carteraCompleta!==null){
            if(carteraCompleta==="CCD"){
                endPoint="service/carteraLocal/carteraCompletaSCLGuardar/1"; //Pendiente aqui se pone el numero(tipo cartera)
                nombreArchivo="Cartera_Completa_Descarte_Normalidad";
            }else if(carteraCompleta==="CCSFSCL"){
                endPoint="service/cartera/carteraCompleta";
                nombreArchivo="Cartera_Completa_SF_SCL_Normalidad";
            }else if(carteraCompleta==="CCCFL"){
                nombreArchivo="Cartera_Completa_CF_Local_Normalidad";
            }else if(carteraCompleta==="CCSFL"){
                nombreArchivo="Cartera_Completa_SF_Local_Normalidad";
            }

        }
        if(carteraCompletaVIP!==null){
            
            if(carteraCompletaVIP==="CCDVIP"){
                endPoint="service/carteraLocal/carteraCompletaSCLGuardar/2"; //Pendiente aqui se pone el numero(tipo cartera)
                nombreArchivo="Cartera_Completa_Descarte_VIP";
            }else if(carteraCompletaVIP==="CCSFSCLVIP"){
                endPoint="service/carteraVIP/VIPcarteraCompleta";
                nombreArchivo="Cartera_Completa_SF_SCL_VIP"
            }else if(carteraCompletaVIP==="CCCFSCLVIP"){
                endPoint="service/carteraVIP/VIPcarteraCompleta";
                nombreArchivo="Cartera_Completa_CF_SCL_VIP"
            }else if(carteraCompletaVIP==="CCCFLVIP"){
                nombreArchivo="Cartera_Completa_CF_Local_VIP";
            }else if(carteraCompletaVIP==="CCSFLVIP"){
                nombreArchivo="Cartera_Completa_SF_Local_VIP";
            }
            
        }
        if(carteraCompletaTerritorios!==null){
            if(carteraCompletaTerritorios==="CCDTERR"){
                endPoint="service/carteraLocal/carteraCompletaSCLGuardar/3"; //Pendiente aqui se pone el numero(tipo cartera)
                nombreArchivo="Cartera_Completa_Descarte_Territorios";
            }else if(carteraCompletaTerritorios==="CCSFSCLTERR"){
                endPoint="service/carteraTerritorios/SCL/carteraCompleta";
                nombreArchivo="Cartera_Completa_SF_SCL_Territorios";
            }else if(carteraCompletaTerritorios==="CCCFSCLTERR"){
                endPoint="service/carteraTerritorios/SCL/carteraCompleta";
                nombreArchivo="Cartera_Completa_CF_SCL_Territorios";
            }else if(carteraCompletaTerritorios==="CCCFLTERR"){
                nombreArchivo="Cartera_Completa_CF_Local_Territorios";
            }else if(carteraCompletaTerritorios==="CCSFLTERR"){
                nombreArchivo="Cartera_Completa_SF_Local_Territorios";
            }
        }
        if(carteraCompletaDiezYears!==null){
            if(carteraCompletaDiezYears==="CCDDIEZ"){
                endPoint="service/carteraLocal/carteraCompletaSCLGuardar/4"; //Pendiente aqui se pone el numero(tipo cartera)
                nombreArchivo="Cartera_Completa_Descarte_Diez_Years";
            }else if(carteraCompletaDiezYears==="CCSFSCLDIEZ"){
                endPoint="service/carteraDiezYear/SCL/carteraCompleta";
                nombreArchivo="Cartera_Completa_SF_SCL_Diez_Years";
            }else if(carteraCompletaDiezYears==="CCCFSCLDIEZ"){
                endPoint="service/carteraDiezYear/SCL/carteraCompleta";
                nombreArchivo="Cartera_Completa_CF_SCL_Diez_Years";
            }else if(carteraCompletaDiezYears==="CCCFLDIEZ"){
                nombreArchivo="Cartera_Completa_CF_Local_Diez_Years";
            }else if(carteraCompletaDiezYears==="CCSFLDIEZ"){
                nombreArchivo="Cartera_Completa_SF_Local_Diez_Years";
            }
        }
        if(carteraCompletaAbandonados!==null){
            if(carteraCompletaAbandonados==="CCDABAND"){
                endPoint="service/carteraLocal/carteraCompletaSCLGuardar/5"; //Pendiente aqui se pone el numero(tipo cartera)
                nombreArchivo="Cartera_Completa_Descarte_Abandonados";
            }else if(carteraCompletaAbandonados==="CCCFLABAND"){
                nombreArchivo="Cartera_Completa_CF_Local_Abandonados";
            }else if(carteraCompletaAbandonados==="CCSFLDABAND"){
                nombreArchivo="Cartera_Completa_SF_Local_Abandonados";
            }
        }
        if(carteraCompletaImplant!==null){
            if(carteraCompletaImplant==="CCDIMPL"){
                endPoint="service/carteraLocal/carteraCompletaSCLGuardar/6"; //Pendiente aqui se pone el numero(tipo cartera)
                nombreArchivo="Cartera_Completa_Descarte_Implant";
            }else if(carteraCompletaImplant==="CCCFLIMPL"){
                nombreArchivo="Cartera_Completa_CF_Local_Implant";
            }else if(carteraCompletaImplant==="CCSFLIMPL"){
                nombreArchivo="Cartera_Completa_SF_Local_Implant";
            }
        }
        if(carteraCompletaTAZ!==null){
            if(carteraCompletaTAZ==="CCDTAZ"){
                endPoint="service/carteraLocal/carteraCompletaSCLGuardar/7"; //Pendiente aqui se pone el numero(tipo cartera)
                nombreArchivo="Cartera_Completa_Descarte_TAZ";
            }else if(carteraCompletaTAZ==="CCCFLTAZ"){
                nombreArchivo="Cartera_Completa_CF_Local_TAZ";
            }else if(carteraCompletaTAZ==="CCSFLTAZ"){
                nombreArchivo="Cartera_Completa_SF_Local_TAZ";
            }
        }
        if(carteraCompletaTOR!==null){
            if(carteraCompletaTOR==="CCDTOR"){
                endPoint="service/carteraLocal/carteraCompletaSCLGuardar/8"; //Pendiente aqui se pone el numero(tipo cartera)
                nombreArchivo="Cartera_Completa_Descarte_TOR";
            }else if(carteraCompletaTOR==="CCCFLTOR"){
                nombreArchivo="Cartera_Completa_CF_Local_TOR";
            }else if(carteraCompletaTOR==="CCSFLTOR"){
                nombreArchivo="Cartera_Completa_SF_Local_TOR";
            }
        }
        if(carteraCompletaSaldosAltos!==null){
            if(carteraCompletaSaldosAltos==="CCDSA"){
                endPoint="service/carteraLocal/carteraCompletaSCLGuardar/9"; //Pendiente aqui se pone el numero(tipo cartera)
                nombreArchivo="Cartera_Completa_Descarte_Saldos_Altos";
            }else if(carteraCompletaSaldosAltos==="CCCFLSA"){
                nombreArchivo="Cartera_Completa_CF_Local_Saldos_Altos";
            }else if(carteraCompletaSaldosAltos==="CCSLSA"){
                nombreArchivo="Cartera_Completa_SF_Local_Saldos_Altos";
            }
        }
        if(carteraCompletaItalika!==null){
            if(carteraCompletaItalika==="CCDITK"){
                endPoint="service/carteraLocal/carteraCompletaSCLGuardar/10"; //Pendiente aqui se pone el numero(tipo cartera)
                nombreArchivo="Cartera_Completa_Descarte_Italika";
            }else if(carteraCompletaItalika==="CCCFLITK"){
                nombreArchivo="Cartera_Completa_CF_Local_Italika";
            }else if(carteraCompletaItalika==="CCSFLITK"){
                nombreArchivo="Cartera_Completa_SF_Local_Italika";
            }
        }




        // if(seg5!==null){
        //     nombreArchivo=nombreArchivo+"Seg05_Normalidad";
        // }
        // if(seg28!==null){
        //     nombreArchivo=nombreArchivo+"Seg28_Normalidad";
        // }
        // if(seg6!==null){
        //     nombreArchivo=nombreArchivo+"Seg06_Normalidad";
        // }
        // if(seg16!==null){
        //     nombreArchivo=nombreArchivo+"Seg16_Normalidad";        
        // }
        // if(seg5VIP!==null){
        //     nombreArchivo=nombreArchivo+"Seg05_VIP";
        // }
        // if(seg28VIP!==null){
        //     nombreArchivo=nombreArchivo+"Seg28_VIP";
        // }
        // if(seg6VIP!==null){
        //     nombreArchivo=nombreArchivo+"Seg06_VIP";
        // }
        if(descarte!==null){
            endPoint="service/carteraLocal/carteraConDescarte/1";
            nombreArchivo=nombreArchivo+"Cartera_Completa_DescarteDia_Normalidad";
        }
        if(descarteVIP!==null){
            endPoint="service/carteraLocal/carteraConDescarte/2";
            nombreArchivo=nombreArchivo+"Cartera_Completa_DescarteDia_VIP";
        }
        if(descarteTerritorios!==null){
            endPoint="service/carteraLocal/carteraConDescarte/3";
            nombreArchivo=nombreArchivo+"Cartera_Completa_DescarteDia_Territotios";
        }
        if(descarteDiezYears!==null){
            endPoint="service/carteraLocal/carteraConDescarte/4";
            nombreArchivo=nombreArchivo+"Cartera_Completa_DescarteDia_DiezYears";
        }
        if(descarteCompleto!==null){
            endPoint="service/carteraLocal/carteraConDescarteCompleta";
            nombreArchivo=nombreArchivo+"Cartera_Completa_DescarteDia_Completa";
        }
        if(basePuraCF!==null){
            nombreArchivo=nombreArchivo+"Carteras_Completas_TKM_CF";
        }
        if(basePuraSF!==null){
            nombreArchivo=nombreArchivo+"Carteras_Completas_TKM_SF";
        }
        if(descarteAband!==null){
            endPoint="service/carteraLocal/carteraConDescarte/5";
            nombreArchivo=nombreArchivo+"Cartera_Completa_DescarteDia_Abandonados";
        }
        if(descarteImplant!==null){
            endPoint="service/carteraLocal/carteraConDescarte/6";
            nombreArchivo=nombreArchivo+"Cartera_Completa_DescarteDia_Implant";
        }
        if(descarteTAZ!==null){
            endPoint="service/carteraLocal/carteraConDescarte/7";
            nombreArchivo=nombreArchivo+"Cartera_Completa_DescarteDia_TAZ";
        }
        if(descarteTOR!==null){
            endPoint="service/carteraLocal/carteraConDescarte/8";
            nombreArchivo=nombreArchivo+"Cartera_Completa_DescarteDia_TOR";
        }
        if(descarteSalAlt!==null){
            endPoint="service/carteraLocal/carteraConDescarte/9";
            nombreArchivo=nombreArchivo+"Cartera_Completa_DescarteDia_Saldos_Altos";
        }
        if(descarteItalika!==null){
            endPoint="service/carteraLocal/carteraConDescarte/10";
            nombreArchivo=nombreArchivo+"Cartera_Completa_DescarteDia_Italika";
        }

        
        // if(seg21!==null){
        //     nombreArchivo=nombreArchivo+"Seg21";
        // }
        // if(cartManana!==null){
        //     endPoint="service/carteraLocal/carteraConDescarte/1";
        //     nombreArchivo=nombreArchivo+"CarteraCompleta_Matutino";
        // }
        // if(cartTarde!==null){
        //     endPoint="service/carteraLocal/carteraConDescarte/1";
        //     nombreArchivo=nombreArchivo+"CarteraCompleta_Vespertino";
        // }


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
                            if(carteraCompleta==="CCSFL"){
                                carteraSinFiltros(eleccionCartera(data.data,1));
                            }
                            else{
                                carteraSinFiltros(data.data);
                            }
                            
                        }else{
                            descartarNumerosSinDatos(data.data);
                        }
                    }else if(carteraCompletaVIP!==null){
                        if(carteraCompletaVIP==="CCSFSCLVIP"||carteraCompletaVIP==="CCSFLVIP"){
                            if(carteraCompletaVIP==="CCSFLVIP"){
                                carteraSinFiltros(eleccionCartera(data.data,2));
                            }else{
                                carteraSinFiltros(data.data);
                            }
                        }else{
                            descartarNumerosSinDatos(data.data);
                        }
                    }else if(carteraCompletaTerritorios!==null){
                        if(carteraCompletaTerritorios==="CCSFSCLTERR"||carteraCompletaTerritorios==="CCSFLTERR"){
                            if(carteraCompletaTerritorios==="CCSFLTERR"){
                                carteraSinFiltros(eleccionCartera(data.data,3));
                            }else{
                                carteraSinFiltros(data.data);
                            }
                        }else{
                            descartarNumerosSinDatos(data.data);
                        }
                    }else if(carteraCompletaDiezYears!==null){
                        if(carteraCompletaDiezYears==="CCSFSCLDIEZ"||carteraCompletaDiezYears==="CCSFLDIEZ"){
                            if(carteraCompletaDiezYears==="CCSFLDIEZ"){
                                carteraSinFiltros(eleccionCartera(data.data,4));
                            }else{
                                carteraSinFiltros(data.data);
                            }

                        }else{
                            descartarNumerosSinDatos(data.data);
                        }
                    }else if(carteraCompletaAbandonados!==null){
                        if(carteraCompletaAbandonados==="CCSFLDABAND"){
                            carteraSinFiltros(eleccionCartera(data.data,5));
                        }else{
                            descartarNumerosSinDatos(data.data);
                        }

                    }else if(carteraCompletaImplant!==null){
                        if(carteraCompletaImplant==="CCSFLIMPL"){
                            carteraSinFiltros(eleccionCartera(data.data,6));
                        }else{
                            descartarNumerosSinDatos(data.data);
                        }

                    }else if(carteraCompletaTAZ!==null){
                        if(carteraCompletaTAZ==="CCSFLTAZ"){
                            carteraSinFiltros(eleccionCartera(data.data,7));
                        }else{
                            descartarNumerosSinDatos(data.data);
                        }
                    }else if(carteraCompletaTOR!==null){
                        if(carteraCompletaTOR==="CCSFLTOR"){
                            carteraSinFiltros(eleccionCartera(data.data,8));
                        }else{
                            descartarNumerosSinDatos(data.data);
                        }
                    }else if(carteraCompletaSaldosAltos!==null){
                        if(carteraCompletaSaldosAltos==="CCSLSA"){
                            carteraSinFiltros(eleccionCartera(data.data,9));
                        }else{
                            descartarNumerosSinDatos(data.data);
                        }
                    }else if(carteraCompletaItalika!==null){
                        if(carteraCompletaItalika==="CCSFLITK"){
                            carteraSinFiltros(eleccionCartera(data.data,10));
                        }else{
                            descartarNumerosSinDatos(data.data);
                        }
                    }else if(basePuraCF!==null){
                        descartarNumerosSinDatos(data.data);
                    }else if(basePuraSF!==null){
                        carteraSinFiltros(data.data);
                    }else if(descarte!==null){
                        descartarNumerosSinDatos(data.data);
                    }else if(descarteVIP!==null){
                        descartarNumerosSinDatos(data.data);
                    }else if(descarteTerritorios!==null){
                        descartarNumerosSinDatos(data.data);
                    }else if(descarteDiezYears!==null){
                        descartarNumerosSinDatos(data.data);
                    }else if(descarteAband!==null){
                        descartarNumerosSinDatos(data.data);
                    }else if(descarteImplant!==null){
                        descartarNumerosSinDatos(data.data);
                    }else if(descarteTAZ!==null){
                        descartarNumerosSinDatos(data.data);
                    }else if(descarteTOR!==null){
                        descartarNumerosSinDatos(data.data);
                    }else if(descarteSalAlt!==null){
                        descartarNumerosSinDatos(data.data);
                    }else if(descarteItalika!==null){
                        descartarNumerosSinDatos(data.data);
                    }else if(descarteCompleto!==null){
                        descartarNumerosSinDatos(data.data);
                    }
                    // }else if(seg5!==null){
                    //     obtenerSeg05(eleccionCartera(data.data,1));
                    // }else if(seg28!==null){
                    //     obtenerSeg28(eleccionCartera(data.data,1));
                    // }else if(seg6!==null){
                    //     obtenerSeg06(eleccionCartera(data.data,1));
                    // }else if(seg16!==null){
                    //     obtenerSeg16(eleccionCartera(data.data,1));
                    // }else if(seg5VIP!==null){
                    //     obtenerSeg05(eleccionCartera(data.data,2));
                    // }else if(seg28VIP!==null){
                    //     obtenerSeg28(eleccionCartera(data.data,2));
                    // }else if(seg6VIP!==null){
                    //     obtenerSeg06(eleccionCartera(data.data,2));
                    // }else if(cartManana!==null){
                    //     obtenerCarteraManana(data.data);
                    // }else if(cartTarde!==null){
                    //     obtenerCarteraTarde(data.data);}

                    
                    if(datosCartera.length<=70000){
                        let nombreArchivo1=dia+mes+year+"_"+nombreArchivo;
                        let archivo=descargarExcel.descargarExcel(datosCartera,nombreArchivo1);
                        console.log(archivo);

                    }else if(datosCartera.length>70000&&datosCartera.length<=140000){
                        let valor=1;
                        let parte1=[];
                        let parte2=[];
                        datosCartera.forEach(function(element){
                            if(valor<=70000){
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

                    }else if(datosCartera.length>140000){
                        let valor=1;
                        let parte1=[];
                        let parte2=[];
                        let parte3=[];

                        datosCartera.forEach(function(element){
                            if(valor<=70000){
                                parte1.push(element);
                            }else if(valor>70000&&valor<=140000){
                                parte2.push(element);
                            }else if(valor>140000){
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
            "TURNO": typeof element.turno !== "undefined" ? element.turno:element.TURNO,
            "TIPO_CARTERA_TKM":typeof element.tipocarteratkm!== "undefined"?element.tipocarteratkm:element.tipocarteratkm,
        }

        datosCartera.push(elementoArray)
    }

    const obtenerSeg05=(cartera)=>{
        datosCartera=[];
        cartera.forEach(function(element){
            // if(segm.includes("5")||segm.includes(5)){
            if(element.segmento==="5"||element.segmento===5){
                llenarArreglo(element);
            }

        })
    }

    const obtenerSeg28=(cartera)=>{
        datosCartera=[];
        cartera.forEach(function(element){
            // if(element.segmento.includes("28")){
            if(element.segmento=="28"||element.segmento==28){
                llenarArreglo(element);
            }

        })
    }

    const obtenerSeg06=(cartera)=>{
        datosCartera=[];
        cartera.forEach(function(element){
            // if(element.segmento.includes("6")){
            if(element.segmento==="6"||element.segmento===6){
                llenarArreglo(element);
            }

        })
    }

    const obtenerSeg16=(cartera)=>{
        datosCartera=[];
        cartera.forEach(function(element){
            if(element.segmento==="16"||element.segmento===16){
                llenarArreglo(element);
            }

        })
    }

    const eleccionCartera=(cartera,tipoCartera)=>{
        let arreglo=[];
        cartera.forEach(function(element){
            if(tipoCartera===1){
                if(element.tipocarteratkm==="Normalidad"){
                    arreglo.push(element);
                }
            }else if(tipoCartera===2){
                if(element.tipocarteratkm==="VIP"){
                    arreglo.push(element);
                }
            }else if(tipoCartera===3){
                if(element.tipocarteratkm==="Territorios"){
                    arreglo.push(element);
                }
            }else if(tipoCartera===4){
                if(element.tipocarteratkm==="DiezYears"){
                    arreglo.push(element);
                }
            }else if(tipoCartera===5){
                if(element.tipocarteratkm==="Abandonados"){
                    arreglo.push(element);
                }
            }else if(tipoCartera===6){
                if(element.tipocarteratkm==="Implant"){
                    arreglo.push(element);
                }
            }else if(tipoCartera===7){
                if(element.tipocarteratkm==="TAZ"){
                    arreglo.push(element);
                }
            }else if(tipoCartera===8){
                if(element.tipocarteratkm==="TOR"){
                    arreglo.push(element);
                }
            }else if(tipoCartera===9){
                if(element.tipocarteratkm==="SaldosAltos"){
                    arreglo.push(element);
                }
            }else if(tipoCartera===10){
                if(element.tipocarteratkm==="Italika"){
                    arreglo.push(element);
                }
            }
        })
        return arreglo;
    }



    // const obtenerCarteraManana=(cartera)=>{
    //     datosCartera=[];
    //     let carteraManana=[]
    //     cartera.forEach(function(element){
    //         if(element.turno==="M"){
    //             carteraManana.push(element);
    //         }
    //     })

    //     descartarNumerosSinDatos(carteraManana);
    // }

    // const obtenerCarteraTarde=(cartera)=>{
    //     datosCartera=[];
    //     let carteraTarde=[]
    //     cartera.forEach(function(element){
    //         if(element.turno==="V"){
    //             carteraTarde.push(element);
    //         }

    //     })

    //     descartarNumerosSinDatos(carteraTarde)
    // }


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

    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState([]);
    const [excelData, setExcelData] = useState([]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        const selectedFile2 = e.target.files;
        setFile2(selectedFile2)
        console.log("Subiendo Excel"+e.target.result);
    };

    // const handleFileUpload = (e) => {
    //     console.log("Leyendo Excel con el boton "+e)

    //     let x=file2.length;

    //     for(let i=0;i<x;i++){
    //         console.log(x);
    //     }
            


    //     e.preventDefault();
    //     if (file) {
    //         try {
    //             const fileReader = new FileReader();
    //             fileReader.onload = (e) => {
    //                 const data = e.target.result;
    //                 const excel = XLSX.read(data, { type: 'binary' });
    //                 const sheetName = excel.SheetNames[0];
    //                 const sheet = excel.Sheets[sheetName];
    //                 const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 0 });
                    
    //                 datosPrepararGuardar(jsonData);
    //                 // setExcelData(jsonData);
    //             };
                
    //             const d=fileReader.readAsBinaryString(file);
    //             console.log(d)
    //         } catch (error) {
    //             console.error("Error leyendo el archivo");
    //         }
    //     } else {
    //         alert('No has seleccionado un archivo');
    //     }
    // };

    const handleFileUpload = (e) => {
        console.log("Leyendo Excel con el boton "+e)
        handleOpen();
        
        if(file2){
            let x=file2.length;
            let finArr=x-1;
            for(let i=0;i<x;i++){
                console.log(x);
                let archivo=file2[i];
                e.preventDefault();
                try {
                    const fileReader = new FileReader();
                    fileReader.onload = (e) => {
                        const data = e.target.result;
                        const excel = XLSX.read(data, { type: 'binary' });
                        const sheetName = excel.SheetNames[0];
                        const sheet = excel.Sheets[sheetName];
                        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 0 });
                        
                        datosPrepararGuardar(jsonData,archivo,i,finArr);
                        // setExcelData(jsonData);
                    };
                    
                    const d=fileReader.readAsBinaryString(archivo);
                    console.log(d)
                } catch (error) {
                    console.error("Error leyendo el archivo");
                }

                // if(finArr===i){
                //     handleClose();
                //     handleOpenInfo("Se inserto la base correctamente");
                // }
            }
        }else{
            handleOpenInfo('No has seleccionado un archivo');
        }
            
    };

    const datosPrepararGuardar=(cuentas,archi,valorActual,valorFinal)=>{
        
        let clientes=[];
        cuentas.forEach(function(element){
            let cuenta=JSON.stringify(element);
            let dividirCuen=cuenta.split('":')
            let limpiarDatos=dividirCuen[1].split("\"}")
            let obtenerDatos=limpiarDatos[0].split("|");
            let segmentoTipo=archi.name.split("_");            
            let segmento=segmentoTipo[2].split(".")[0];
            let cartera=segmentoTipo[1]==="60054"?"Normalidad":segmentoTipo[1]==="60165"?"VIP":segmentoTipo[1]==="60174"?"Territorios":segmentoTipo[1]==="60187"?"DiezYears":segmentoTipo[1]==="60160"?"Abandonados":segmentoTipo[1]==="60163"?"Implant":segmentoTipo[1]==="60167"?"TAZ":segmentoTipo[1]==="60170"?"TOR":segmentoTipo[1]==="60176"?"SaldosAltos":segmentoTipo[1]==="60178"?"Italika":"";

            console.log(cuenta);
            let json={
                "CLIENTE_UNICO":obtenerDatos[0].split("\"")[1],
                "NOMBRE_CTE":obtenerDatos[1],
                "GENERO_CLIENTE":obtenerDatos[2],
                "EDAD_CLIENTE":obtenerDatos[3],
                "OCUPACION":obtenerDatos[4],
                "DIRECCION_CTE":obtenerDatos[5],
                "NUM_EXT_CTE":obtenerDatos[6],
                "NUM_INT_CTE":obtenerDatos[7],
                "CP_CTE":obtenerDatos[8],
                "COLONIA_CTE":obtenerDatos[9],
                "POBLACION_CTE":obtenerDatos[10],
                "ESTADO_CTE":obtenerDatos[11],
                "TERRITORIO":obtenerDatos[12],
                "TERRITORIAL":obtenerDatos[13],
                "ZONA":obtenerDatos[14],
                "ZONAL":obtenerDatos[15],
                "NOMBRE_DESPACHO":obtenerDatos[16],
                "GERENCIA":obtenerDatos[17],
                "FECHA_ASIGNACION":obtenerDatos[18],
                "DIAS_ASIGNACION":obtenerDatos[19],
                "REFERENCIAS_DOMICILIO":obtenerDatos[20],
                "CLASIFICACION_CTE":obtenerDatos[21],
                "DIQUE":obtenerDatos[22],
                "ATRASO_MAXIMO":obtenerDatos[23],
                "DIAS_ATRASO":obtenerDatos[24],
                "SALDO":obtenerDatos[25],
                "MORATORIOS":obtenerDatos[26],
                "SALDO_TOTAL":obtenerDatos[27],
                "SALDO_ATRASADO":obtenerDatos[28],
                "SALDO_REQUERIDO":obtenerDatos[29],
                "PAGO_NORMAL":obtenerDatos[30],
                "PRODUCTO":obtenerDatos[31],
                "FECHA_ULTIMO_PAGO":obtenerDatos[33],
                "IMP_ULTIMO_PAGO":obtenerDatos[34],
                "CALLE_EMPLEO":obtenerDatos[35],
                "NUM_EXT_EMPLEO":obtenerDatos[36],
                "NUM_INT_EMPLEO":obtenerDatos[37],
                "COLONIA_EMPLEO":obtenerDatos[38],
                "POBLACION_EMPLEO":obtenerDatos[39],
                "ESTADO_EMPLEO":obtenerDatos[40],
                "NOMBRE_AVAL":obtenerDatos[41],
                "TEL_AVAL":obtenerDatos[42],
                "CALLE_AVAL":obtenerDatos[43],
                "NUM_EXT_AVAL":obtenerDatos[44],
                "COLONIA_AVAL":obtenerDatos[45],
                "CP_AVAL":obtenerDatos[46],
                "POBLACION_AVAL":obtenerDatos[47],
                "ESTADO_AVAL":obtenerDatos[48],
                "FIDIAPAGO":obtenerDatos[49],
                "TELEFONO1":obtenerDatos[50],
                "TELEFONO2":obtenerDatos[51],
                "TELEFONO3":obtenerDatos[52],
                "TELEFONO4":obtenerDatos[53],
                "TIPOTEL1":obtenerDatos[54],
                "TIPOTEL2":obtenerDatos[55],
                "TIPOTEL3":obtenerDatos[56],
                "TIPOTEL4":obtenerDatos[57],
                "LATITUD":obtenerDatos[58],
                "LONGITUD":obtenerDatos[59],
                "DESPACHO_GESTIONO":obtenerDatos[60],
                "ULTIMA_GESTION":obtenerDatos[61],
                "GESTION_DESC":obtenerDatos[62],
                "CAMPANIA_RELAMPAGO":obtenerDatos[63],
                "CAMPANIA":obtenerDatos[64],
                "ID_GRUPO":obtenerDatos[66],
                "GRUPO_MAZ":obtenerDatos[67],
                "CLAVE_SPEI":obtenerDatos[68],
                "PAGOS_CLIENTE":obtenerDatos[69],
                "MONTO_PAGOS":obtenerDatos[70],
                "GESTORES":obtenerDatos[71],
                "FOLIO_PLAN":obtenerDatos[72],
                "SEGMENTO_GENERACION":obtenerDatos[73],
                "ESTATUS_PLAN":obtenerDatos[74],
                "SEMANAS_ATRASO":obtenerDatos[75],
                "ATRASO":obtenerDatos[76],
                "GENERACION_PLAN":obtenerDatos[77],
                "CANCELACION_CUMPLIMIENTO_PLAN":obtenerDatos[78],
                "ULTIMO_ESTATUS":obtenerDatos[79],
                "EMPLEADO":obtenerDatos[80],
                "CANAL":obtenerDatos[81],
                "ABONO_SEMANAL":obtenerDatos[82],
                "PLAZO":obtenerDatos[83],
                "MONTO_ABONADO":obtenerDatos[84],
                "MONTO_PLAN":obtenerDatos[85],
                "ENGANCHE":obtenerDatos[86],
                "PAGOS_RECIBIDOS":obtenerDatos[87],
                "SALDO_ANTES_DEL_PLAN":obtenerDatos[88],
                "SALDO_ATRASADO_ANTES_PLAN":obtenerDatos[89],
                "MORATORIOS_ANTES_PLAN":obtenerDatos[90],
                "ESTATUS_PROMESA_PAGO":obtenerDatos[91],
                "MONTO_PROMESA_PAGO":obtenerDatos[92],
                "SEGMENTO":segmento,
                "TIPOCARTERATKM":cartera,
            }

            clientes.push(json);
        })

        let json2={
            "cartera":clientes
        }

        servicio.consumirServicios(json2,"service/carteraLocal/insertarCarteraLocal").then(
            data=>{
                // if(data.code===1){
                    // handleClose();
                    console.log(data)
                    // handleOpenInfo("Se inserto la base correctamente");
                // }else{
                    // handleClose();
                    // handleOpenInfo("Ocurrio algo inesperado al intentar insertar la base");
                // }
                if(valorActual===valorFinal){
                    handleClose();
                    handleOpenInfo("Se inserto la base correctamente");
                }
            }
        )
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
                    {/* <TextField id="cokkie" label="Cokkie" variant="outlined" onChange={handleOnChanceCookie}/> */}
                    <br/>
                    <form  onSubmit={handleFileUpload}>
                        <input type="file" onChange={handleFileChange} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" multiple/>
                        <br/><br/><br/>
                        <button >Subir archivo</button>
                    </form>
                </Grid>
            </Grid>
            <br/><br/>
            <Grid container spacing={1}>
                {/* <Grid item xl={1.2} lg={1.2} md={1.2} sm={1.2}/> */}
                <Grid item xl={1.2} lg={1.2} md={1.2} sm={1.2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_1">Normalidad</FormLabel>
                        <RadioGroup>
                            <br/>
                            <FormControlLabel value="carteraCompletaDescarte" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraCompleta("CCD")}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setCarteraDiezYears(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Con Descarte" />
                            <br/>
                            <FormControlLabel value="carteraCompletaCFLocal" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraCompleta("CCCFL")}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setCarteraDiezYears(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Con Filtros Local" />
                            <br/>
                            {/* <FormControlLabel value="carteraCompletaSFSCL" control={<Radio onClick={()=>{{setCarteraCompleta("CCSFSCL")}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setCarteraDiezYears(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null}/>} label="Cartera Completa Sin Filtros SCL" /> */}
                            {/* <br/> */}
                            <FormControlLabel value="carteraCompletaSFLocal" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraCompleta("CCSFL")}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setCarteraDiezYears(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Sin Filtros Local" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                {/* <Grid item xl={1} lg={1} md={1} sm={1}/> */}
                <Grid item xl={1.2} lg={1.2} md={1.2} sm={1.2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_1">VIP</FormLabel>
                        <RadioGroup>
                        <br/>
                            <FormControlLabel value="carteraCompletaDescarteVIP" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraCompletaVIP("CCDVIP")}{setCarteraCompleta(null)}{setCarteraCompletaTerritorios(null)}{setCarteraDiezYears(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Con Descarte" />
                            <br/>
                            <FormControlLabel value="carteraCompletaCFLocalVIP" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraCompletaVIP("CCCFLVIP")}{setCarteraCompleta(null)}{setCarteraCompletaTerritorios(null)}{setCarteraDiezYears(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Con Filtros Local " />
                            <br/>
                            {/* <FormControlLabel value="carteraCompletaSFSCLVIP" control={<Radio onClick={()=>{{setCarteraCompletaVIP("CCSFSCLVIP")}{setCarteraCompleta(null)}{setCarteraCompletaTerritorios(null)}{setCarteraDiezYears(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null}/>} label="Cartera Completa Sin Filtros SCL" /> */}
                            {/* <br/> */}
                            {/* <FormControlLabel value="carteraCompletaCFSCLVIP" control={<Radio onClick={()=>{{setCarteraCompletaVIP("CCCFSCLVIP")}{setCarteraCompleta(null)}{setCarteraCompletaTerritorios(null)}{setCarteraDiezYears(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null}/>} label="Cartera Completa Con Filtros SCL" /> */}
                            {/* <br/> */}
                            <FormControlLabel value="carteraCompletaSFLocalVIP" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraCompletaVIP("CCSFLVIP")}{setCarteraCompleta(null)}{setCarteraCompletaTerritorios(null)}{setCarteraDiezYears(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Sin Filtros Local" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xl={1.2} lg={1.2} md={1.2} sm={1.2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_1">Territorios</FormLabel>
                        <RadioGroup>
                        <br/>
                        <FormControlLabel value="carteraCompletaDescarteTerr" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraCompletaTerritorios("CCDTERR")}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraDiezYears(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Con Descarte" />
                            <br/>
                            <FormControlLabel value="carteraCompletaCFLocalTerr" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraCompletaTerritorios("CCCFLTERR")}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraDiezYears(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Con Filtros Local" />
                            <br/>
                            {/* <FormControlLabel value="carteraCompletaSFSCLTerr" control={<Radio onClick={()=>{{setCarteraCompletaTerritorios("CCSFSCLTERR")}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraDiezYears(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaDiezYears!==null}/>} label="Cartera Completa Sin Filtros SCL" /> */}
                            {/* <br/> */}
                            {/* <FormControlLabel value="carteraCompletaCFSCLTerr" control={<Radio onClick={()=>{{setCarteraCompletaTerritorios("CCCFSCLTERR")}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraDiezYears(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaDiezYears!==null}/>} label="Cartera Completa Con Filtros SCL" /> */}
                            {/* <br/> */}
                            <FormControlLabel value="carteraCompletaSFLocalTerr" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraCompletaTerritorios("CCSFLTERR")}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraDiezYears(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Sin Filtros Local" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xl={1.2} lg={1.2} md={1.2} sm={1.2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_1">Diez Años</FormLabel>
                        <RadioGroup>
                        <br/>
                        <FormControlLabel value="carteraCompletaDescarteDiezYear" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraDiezYears("CCDDIEZ")}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Con Descarte" />
                            <br/>
                            <FormControlLabel value="carteraCompletaCFLocalDiezYear" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraDiezYears("CCCFLDIEZ")}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Con Filtros Local" />
                            <br/>
                            {/* <FormControlLabel value="carteraCompletaSFSCLDiezYear" control={<Radio onClick={()=>{{setCarteraDiezYears("CCSFSCLDIEZ")}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null}/>} label="Cartera Completa Sin Filtros SCL" /> */}
                            {/* <br/> */}
                            {/* <FormControlLabel value="carteraCompletaCFSCLDiezYear" control={<Radio onClick={()=>{{setCarteraDiezYears("CCCFSCLDIEZ")}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null}/>} label="Cartera Completa Con Filtros SCL" /> */}
                            {/* <br/> */}
                            <FormControlLabel value="carteraCompletaSFLocalDiezYear" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraDiezYears("CCSFLDIEZ")}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Sin Filtros Local" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xl={1.2} lg={1.2} md={1.2} sm={1.2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_1">Abandonados</FormLabel>
                        <RadioGroup>
                            <br/>
                            <FormControlLabel value="carteraCompletaDescarteDiezYear" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados("CCDABAND")}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraDiezYears(null)}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Con Descarte" />
                            <br/>
                            <FormControlLabel value="carteraCompletaCFLocalDiezYear" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados("CCCFLABAND")}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraDiezYears(null)}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Con Filtros Local" />
                            <br/>
                            {/* <FormControlLabel value="carteraCompletaSFSCLDiezYear" control={<Radio onClick={()=>{{setCarteraDiezYears("CCSFSCLDIEZ")}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null}/>} label="Cartera Completa Sin Filtros SCL" /> */}
                            {/* <br/> */}
                            {/* <FormControlLabel value="carteraCompletaCFSCLDiezYear" control={<Radio onClick={()=>{{setCarteraDiezYears("CCCFSCLDIEZ")}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null}/>} label="Cartera Completa Con Filtros SCL" /> */}
                            {/* <br/> */}
                            <FormControlLabel value="carteraCompletaSFLocalDiezYear" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados("CCSFLDABAND")}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraDiezYears(null)}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Sin Filtros Local" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xl={1.2} lg={1.2} md={1.2} sm={1.2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_1">Implant</FormLabel>
                        <RadioGroup>
                        <br/>
                        <FormControlLabel value="carteraCompletaDescarteDiezYear" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant("CCDIMPL")}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraDiezYears(null)}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Con Descarte" />
                            <br/>
                            <FormControlLabel value="carteraCompletaCFLocalDiezYear" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant("CCCFLIMPL")}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraDiezYears(null)}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Con Filtros Local" />
                            <br/>
                            {/* <FormControlLabel value="carteraCompletaSFSCLDiezYear" control={<Radio onClick={()=>{{setCarteraDiezYears("CCSFSCLDIEZ")}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null}/>} label="Cartera Completa Sin Filtros SCL" /> */}
                            {/* <br/> */}
                            {/* <FormControlLabel value="carteraCompletaCFSCLDiezYear" control={<Radio onClick={()=>{{setCarteraDiezYears("CCCFSCLDIEZ")}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null}/>} label="Cartera Completa Con Filtros SCL" /> */}
                            {/* <br/> */}
                            <FormControlLabel value="carteraCompletaSFLocalDiezYear" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant("CCSFLIMPL")}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraDiezYears(null)}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Sin Filtros Local" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xl={1.2} lg={1.2} md={1.2} sm={1.2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_1">TAZ</FormLabel>
                        <RadioGroup>
                        <br/>
                        <FormControlLabel value="carteraCompletaDescarteDiezYear" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ("CCDTAZ")}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraDiezYears(null)}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Con Descarte" />
                            <br/>
                            <FormControlLabel value="carteraCompletaCFLocalDiezYear" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ("CCCFLTAZ")}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraDiezYears(null)}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Con Filtros Local" />
                            <br/>
                            {/* <FormControlLabel value="carteraCompletaSFSCLDiezYear" control={<Radio onClick={()=>{{setCarteraDiezYears("CCSFSCLDIEZ")}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null}/>} label="Cartera Completa Sin Filtros SCL" /> */}
                            {/* <br/> */}
                            {/* <FormControlLabel value="carteraCompletaCFSCLDiezYear" control={<Radio onClick={()=>{{setCarteraDiezYears("CCCFSCLDIEZ")}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null}/>} label="Cartera Completa Con Filtros SCL" /> */}
                            {/* <br/> */}
                            <FormControlLabel value="carteraCompletaSFLocalDiezYear" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ("CCSFLTAZ")}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraDiezYears(null)}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Sin Filtros Local" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xl={1.2} lg={1.2} md={1.2} sm={1.2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_1">TOR</FormLabel>
                        <RadioGroup>
                        <br/>
                        <FormControlLabel value="carteraCompletaDescarteDiezYear" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR("CCDTOR")}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraDiezYears(null)}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Con Descarte" />
                            <br/>
                            <FormControlLabel value="carteraCompletaCFLocalDiezYear" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR("CCCFLTOR")}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraDiezYears(null)}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Con Filtros Local" />
                            <br/>
                            {/* <FormControlLabel value="carteraCompletaSFSCLDiezYear" control={<Radio onClick={()=>{{setCarteraDiezYears("CCSFSCLDIEZ")}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null}/>} label="Cartera Completa Sin Filtros SCL" /> */}
                            {/* <br/> */}
                            {/* <FormControlLabel value="carteraCompletaCFSCLDiezYear" control={<Radio onClick={()=>{{setCarteraDiezYears("CCCFSCLDIEZ")}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null}/>} label="Cartera Completa Con Filtros SCL" /> */}
                            {/* <br/> */}
                            <FormControlLabel value="carteraCompletaSFLocalDiezYear" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR("CCSFLTOR")}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika(null)}{setCarteraDiezYears(null)}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null}/>} label="Cartera Completa Sin Filtros Local" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xl={1.2} lg={1.2} md={1.2} sm={1.2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_1">Saldos Altos</FormLabel>
                        <RadioGroup>
                        <br/>
                        <FormControlLabel value="carteraCompletaDescarteDiezYear" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos("CCDSA")}{setCarteraCompletaItalika(null)}{setCarteraDiezYears(null)}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaItalika!==null}/>} label="Cartera Completa Con Descarte" />
                            <br/>
                            <FormControlLabel value="carteraCompletaCFLocalDiezYear" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos("CCCFLSA")}{setCarteraCompletaItalika(null)}{setCarteraDiezYears(null)}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaItalika!==null}/>} label="Cartera Completa Con Filtros Local" />
                            <br/>
                            {/* <FormControlLabel value="carteraCompletaSFSCLDiezYear" control={<Radio onClick={()=>{{setCarteraDiezYears("CCSFSCLDIEZ")}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null}/>} label="Cartera Completa Sin Filtros SCL" /> */}
                            {/* <br/> */}
                            {/* <FormControlLabel value="carteraCompletaCFSCLDiezYear" control={<Radio onClick={()=>{{setCarteraDiezYears("CCCFSCLDIEZ")}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null}/>} label="Cartera Completa Con Filtros SCL" /> */}
                            {/* <br/> */}
                            <FormControlLabel value="carteraCompletaSFLocalDiezYear" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos("CCSLSA")}{setCarteraCompletaItalika(null)}{setCarteraDiezYears(null)}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaItalika!==null}/>} label="Cartera Completa Sin Filtros Local" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xl={1.2} lg={1.2} md={1.2} sm={1.2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_1">Italika</FormLabel>
                        <RadioGroup>
                        <br/>
                        <FormControlLabel value="carteraCompletaDescarteDiezYear" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika("CCDITK")}{setCarteraDiezYears(null)}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null}/>} label="Cartera Completa Con Descarte" />
                            <br/>
                            <FormControlLabel value="carteraCompletaCFLocalDiezYear" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika("CCCFLITK")}{setCarteraDiezYears(null)}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null}/>} label="Cartera Completa Con Filtros Local" />
                            <br/>
                            {/* <FormControlLabel value="carteraCompletaSFSCLDiezYear" control={<Radio onClick={()=>{{setCarteraDiezYears("CCSFSCLDIEZ")}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null}/>} label="Cartera Completa Sin Filtros SCL" /> */}
                            {/* <br/> */}
                            {/* <FormControlLabel value="carteraCompletaCFSCLDiezYear" control={<Radio onClick={()=>{{setCarteraDiezYears("CCCFSCLDIEZ")}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null}/>} label="Cartera Completa Con Filtros SCL" /> */}
                            {/* <br/> */}
                            <FormControlLabel value="carteraCompletaSFLocalDiezYear" control={<Radio onClick={()=>{{setCarteraCompletaAbandonados(null)}{setCarteraCompletaImplant(null)}{setCarteraCompletaTAZ(null)}{setCarteraCompletaTOR(null)}{setCarterasCompletasSaldosAltos(null)}{setCarteraCompletaItalika("CCSFLITK")}{setCarteraDiezYears(null)}{setCarteraCompleta(null)}{setCarteraCompletaVIP(null)}{setCarteraCompletaTerritorios(null)}{setSeg5(null)}{setSeg28(null)}{setSeg6(null)}{setSeg16(null)}{setSeg21(null)}{setDescarte(null)}}} disabled={carteraCompleta!==null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null}/>} label="Cartera Completa Sin Filtros Local" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                {/* <Grid item xl={1.2} lg={1.2} md={1.2} sm={1.2}/> */}
            </Grid>
            <br/>
            <Grid container spacing={1}>
                {/* <Grid item xl={1} lg={1} md={1} sm={1}></Grid> */}

                {/* <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_1">Segmento 05 (00 a 25 semanas)</FormLabel>
                        <br/>
                        <FormControlLabel value="Seg05P" control={<Checkbox  disabled={carteraCompleta!=null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||seg28!==null||seg6!==null||seg16!==null|| descarte!==null || descarteVIP!==null || seg5VIP!==null || seg28VIP!==null  || seg6VIP!==null} onClick={checkedSeg5}/>} label="Segmento 05 Puro Normalidad" />
                        <br/>
                        <FormControlLabel value="Seg05PVIP" control={<Checkbox  disabled={carteraCompleta!=null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||seg28!==null||seg6!==null||seg16!==null|| descarte!==null || descarteVIP!==null || seg28VIP!==null  || seg6VIP!==null || seg5!==null} onClick={checkedSeg5VIP}/>} label="Segmento 05 Puro VIP" />
                        <br/>
                    </FormControl>
                </Grid>

                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_2">Segmento 28 (26 a 39 semanas)</FormLabel>
                        <br/>
                        <FormControlLabel value="Seg28P" control={<Checkbox  disabled={carteraCompleta!=null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||seg5!==null||seg6!==null||seg16!==null|| descarte!==null || descarteVIP!==null || seg5VIP!==null || seg28VIP!==null  || seg6VIP!==null} onClick={checkedSeg28}/>} label="Segmento 28 Puro Normalidad" />
                        <br/>
                        <FormControlLabel value="Seg28PVIP" control={<Checkbox  disabled={carteraCompleta!=null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||seg5!==null||seg6!==null||seg16!==null|| descarte!==null || descarteVIP!==null || seg5VIP!==null  || seg6VIP!==null ||seg28!==null} onClick={checkedSeg28VIP}/>} label="Segmento 28 Puro VIP" />
                        <br/>
                    </FormControl>
                </Grid>

                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_3">Segmento 06 (40 a 55 semanas)</FormLabel>
                        <br/>
                        <FormControlLabel value="Seg06P" control={<Checkbox disabled={carteraCompleta!=null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||seg28!==null||seg5!==null||seg16!==null|| descarte!==null || descarteVIP!==null || seg5VIP!==null || seg28VIP!==null || seg6VIP!==null} onClick={checkedSeg06}/>} label="Segmento 06 Puro Normalidad" />
                        <br/>
                        <FormControlLabel value="Seg06PVIP" control={<Checkbox disabled={carteraCompleta!=null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||seg28!==null||seg5!==null||seg16!==null|| descarte!==null || descarteVIP!==null || seg5VIP!==null || seg28VIP!==null || seg6!==null} onClick={checkedSeg06VIP}/>} label="Segmento 06 Puro VIP" />
                        <br/>
                    </FormControl>
                </Grid>

                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_4">Segmento 16 (mas de 55 semanas)</FormLabel>
                        <br/>
                        <FormControlLabel value="Seg16P" control={<Checkbox disabled={carteraCompleta!=null||carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||seg28!==null||seg6!==null||seg5!==null|| descarte!==null || descarteVIP!==null|| seg5VIP!==null || seg28VIP!==null || seg6VIP!==null} onClick={checkedSeg16}/>} label="Segmento 16 Puro" />
                        <br/>
                    </FormControl>
                </Grid> */}

                <Grid item xl={3} lg={3} md={3} sm={3}></Grid>

                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_4">Segmentos Elegibles</FormLabel>
                    
                       {/* <FormControlLabel value="21" control={<Checkbox disabled={carteraCompleta!=null || preventa==="Preventa" || italika==="ITALIKA" || tor==="TOR" || cdt==="CDT" || maz==="MAZ" || normalidad==="Normalidad"} onClick={checkedSeg21}/>} label="JUDICIAL" /> */}
                       <br/>
                       <FormControlLabel value="carteraDescarte" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarteVIP!==null|| seg5VIP!==null || seg28VIP!==null || seg6VIP!==null || descarteTerritorios!==null || descarteDiezYears!==null || basePuraCF!==null || basePuraSF!==null || descarteCompleto!==null || descarteAband!==null || descarteImplant!==null || descarteTAZ!==null || descarteTOR!==null || descarteSalAlt!==null || descarteItalika!==null} onClick={checkedSegDescarte}/>} label="Cartera Descarte del Dia Normalidad" />
                       <br/>
                       <FormControlLabel value="carteraDescarteVIP" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null|| seg5VIP!==null || seg28VIP!==null || seg6VIP!==null || descarteTerritorios!==null || descarteDiezYears!==null || basePuraCF!==null || basePuraSF!==null|| descarteCompleto!==null || descarteAband!==null || descarteImplant!==null || descarteTAZ!==null || descarteTOR!==null || descarteSalAlt!==null || descarteItalika!==null} onClick={checkedSegDescarteVIP}/>} label="Cartera Descarte del Dia VIP" />
                       <br/>
                       <FormControlLabel value="carteraDescarteTerritorios" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null|| seg5VIP!==null || seg28VIP!==null || seg6VIP!==null|| descarteVIP!==null || descarteDiezYears!==null || basePuraCF!==null || basePuraSF!==null|| descarteCompleto!==null || descarteAband!==null || descarteImplant!==null || descarteTAZ!==null || descarteTOR!==null || descarteSalAlt!==null || descarteItalika!==null} onClick={checkedSegDescarteTerritorios}/>} label="Cartera Descarte del Dia Territorios" />
                       <br/>
                       <FormControlLabel value="carteraDescarteDiezYears" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null|| seg5VIP!==null || seg28VIP!==null || seg6VIP!==null|| descarteVIP!==null || descarteTerritorios!==null || basePuraCF!==null || basePuraSF!==null|| descarteCompleto!==null || descarteAband!==null || descarteImplant!==null || descarteTAZ!==null || descarteTOR!==null || descarteSalAlt!==null || descarteItalika!==null} onClick={checkedSegDescarteDiez}/>} label="Cartera Descarte del Dia Diez Años" />
                       <br/>
                       <FormControlLabel value="carteraDescarteAbanderados" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null|| seg5VIP!==null || seg28VIP!==null || seg6VIP!==null|| descarteVIP!==null || descarteTerritorios!==null || descarteDiezYears!==null || basePuraCF!==null || basePuraSF!==null|| descarteCompleto!==null || descarteImplant!==null || descarteTAZ!==null || descarteTOR!==null || descarteSalAlt!==null || descarteItalika!==null} onClick={checkedSegDescarteAband}/>} label="Cartera Descarte del Dia Abandonados" />
                       {/* <br/>
                       <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null|| seg5VIP!==null || seg28VIP!==null || seg6VIP!==null|| descarteVIP!==null || descarteTerritorios!==null || descarteDiezYears!==null || basePuraCF!==null || basePuraSF!==null|| descarteCompleto!==null || descarteAband!==null || descarteTAZ!==null || descarteTOR!==null || descarteSalAlt!==null || descarteItalika!==null} onClick={checkedSegDescarteImplant}/>} label="Cartera Descarte del Dia Implant" />
                       <br/>
                       <FormControlLabel value="carteraDescarteTAZ" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null|| seg5VIP!==null || seg28VIP!==null || seg6VIP!==null|| descarteVIP!==null || descarteTerritorios!==null || descarteDiezYears!==null || basePuraCF!==null || basePuraSF!==null|| descarteCompleto!==null || descarteAband!==null || descarteImplant!==null || descarteTOR!==null || descarteSalAlt!==null || descarteItalika!==null} onClick={checkedSegDescarteTAZ}/>} label="Cartera Descarte del Dia TAZ" />
                       <br/>
                       <FormControlLabel value="carteraDescarteTOR" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null|| seg5VIP!==null || seg28VIP!==null || seg6VIP!==null|| descarteVIP!==null || descarteTerritorios!==null || descarteDiezYears!==null || basePuraCF!==null || basePuraSF!==null|| descarteCompleto!==null  || descarteAband!==null || descarteImplant!==null || descarteTAZ!==null || descarteSalAlt!==null || descarteItalika!==null} onClick={checkedSegDescarteTOR}/>} label="Cartera Descarte del Dia TOR" />
                       <br/>
                       <FormControlLabel value="carteraDescarteSaldosAltos" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null|| seg5VIP!==null || seg28VIP!==null || seg6VIP!==null|| descarteVIP!==null || descarteTerritorios!==null || descarteDiezYears!==null || basePuraCF!==null || basePuraSF!==null|| descarteCompleto!==null  || descarteAband!==null || descarteImplant!==null || descarteTAZ!==null || descarteTOR!==null || descarteItalika!==null} onClick={checkedSegDescarteSA}/>} label="Cartera Descarte del Saldos Altos" />
                       <br/>
                       <FormControlLabel value="carteraDescarteItalika" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null|| seg5VIP!==null || seg28VIP!==null || seg6VIP!==null|| descarteVIP!==null || descarteTerritorios!==null || descarteDiezYears!==null || basePuraCF!==null || basePuraSF!==null|| descarteCompleto!==null || descarteAband!==null || descarteImplant!==null || descarteTAZ!==null || descarteTOR!==null || descarteSalAlt!==null} onClick={checkedSegDescarteItalika}/>} label="Cartera Descarte del Dia Italika" />
                       <br/>
                       <FormControlLabel value="carteraDescarteCompleto" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null|| seg5VIP!==null || seg28VIP!==null || seg6VIP!==null|| descarteVIP!==null || descarteTerritorios!==null || descarteDiezYears!==null  || basePuraCF!==null || basePuraSF!==null  || descarteAband!==null || descarteImplant!==null || descarteTAZ!==null || descarteTOR!==null || descarteSalAlt!==null || descarteItalika!==null} onClick={checkedSegDescarteJunt}/>} label="Cartera Descarte del Dia Juntas" />
                       <br/>
                       <br/>
                       <br/>
                       <FormControlLabel value="carteraJuntasSF" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null|| seg5VIP!==null || seg28VIP!==null || seg6VIP!==null|| descarteVIP!==null || descarteTerritorios!==null || descarteDiezYears!==null || basePuraCF!==null|| descarteCompleto!==null  || descarteAband!==null || descarteImplant!==null || descarteTAZ!==null || descarteTOR!==null || descarteSalAlt!==null || descarteItalika!==null} onClick={checkedSegCartsJunSF}/>} label="Carteras Puras Juntas Sin Filtros" />
                       <br/> 
                       <FormControlLabel value="carteraJuntasCF" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null|| seg5VIP!==null || seg28VIP!==null || seg6VIP!==null|| descarteVIP!==null || descarteTerritorios!==null || descarteDiezYears!==null || basePuraSF!==null|| descarteCompleto!==null  || descarteAband!==null || descarteImplant!==null || descarteTAZ!==null || descarteTOR!==null || descarteSalAlt!==null || descarteItalika!==null} onClick={checkedSegCartsJunCF}/>} label="Carteras Puras Juntas Con Filtros" /> */}
                       {/* <FormControlLabel value="carteraManana" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null || credimax!==null || italika!==null || tor!==null || tazcdt!==null || cartTarde!==null} onClick={checkedManana}/>} label="Cartera Mañana" />
                       <FormControlLabel value="carteraVespertino" control={<Checkbox disabled={carteraCompleta!==null ||carteraCompletaVIP!==null|| seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null || credimax!==null || italika!==null || tor!==null || tazcdt!==null || cartManana!==null} onClick={checkedTarde}/>} label="Cartera Tarde" /> */}
                    </FormControl>
                </Grid>

                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_4">Segmentos Elegibles</FormLabel>
                       {/* <FormControlLabel value="21" control={<Checkbox disabled={carteraCompleta!=null || preventa==="Preventa" || italika==="ITALIKA" || tor==="TOR" || cdt==="CDT" || maz==="MAZ" || normalidad==="Normalidad"} onClick={checkedSeg21}/>} label="JUDICIAL" /> */}
                       <br/>
                       <FormControlLabel value="carteraDescarteImplant" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null|| seg5VIP!==null || seg28VIP!==null || seg6VIP!==null|| descarteVIP!==null || descarteTerritorios!==null || descarteDiezYears!==null || basePuraCF!==null || basePuraSF!==null|| descarteCompleto!==null || descarteAband!==null || descarteTAZ!==null || descarteTOR!==null || descarteSalAlt!==null || descarteItalika!==null} onClick={checkedSegDescarteImplant}/>} label="Cartera Descarte del Dia Implant" />
                       <br/>
                       <FormControlLabel value="carteraDescarteTAZ" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null|| seg5VIP!==null || seg28VIP!==null || seg6VIP!==null|| descarteVIP!==null || descarteTerritorios!==null || descarteDiezYears!==null || basePuraCF!==null || basePuraSF!==null|| descarteCompleto!==null || descarteAband!==null || descarteImplant!==null || descarteTOR!==null || descarteSalAlt!==null || descarteItalika!==null} onClick={checkedSegDescarteTAZ}/>} label="Cartera Descarte del Dia TAZ" />
                       <br/>
                       <FormControlLabel value="carteraDescarteTOR" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null|| seg5VIP!==null || seg28VIP!==null || seg6VIP!==null|| descarteVIP!==null || descarteTerritorios!==null || descarteDiezYears!==null || basePuraCF!==null || basePuraSF!==null|| descarteCompleto!==null  || descarteAband!==null || descarteImplant!==null || descarteTAZ!==null || descarteSalAlt!==null || descarteItalika!==null} onClick={checkedSegDescarteTOR}/>} label="Cartera Descarte del Dia TOR" />
                       <br/>
                       <FormControlLabel value="carteraDescarteSaldosAltos" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null|| seg5VIP!==null || seg28VIP!==null || seg6VIP!==null|| descarteVIP!==null || descarteTerritorios!==null || descarteDiezYears!==null || basePuraCF!==null || basePuraSF!==null|| descarteCompleto!==null  || descarteAband!==null || descarteImplant!==null || descarteTAZ!==null || descarteTOR!==null || descarteItalika!==null} onClick={checkedSegDescarteSA}/>} label="Cartera Descarte del Saldos Altos" />
                       <br/>
                       <FormControlLabel value="carteraDescarteItalika" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null|| seg5VIP!==null || seg28VIP!==null || seg6VIP!==null|| descarteVIP!==null || descarteTerritorios!==null || descarteDiezYears!==null || basePuraCF!==null || basePuraSF!==null|| descarteCompleto!==null || descarteAband!==null || descarteImplant!==null || descarteTAZ!==null || descarteTOR!==null || descarteSalAlt!==null} onClick={checkedSegDescarteItalika}/>} label="Cartera Descarte del Dia Italika" />
                       {/* <FormControlLabel value="carteraManana" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null || credimax!==null || italika!==null || tor!==null || tazcdt!==null || cartTarde!==null} onClick={checkedManana}/>} label="Cartera Mañana" />
                       <FormControlLabel value="carteraVespertino" control={<Checkbox disabled={carteraCompleta!==null ||carteraCompletaVIP!==null|| seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null || credimax!==null || italika!==null || tor!==null || tazcdt!==null || cartManana!==null} onClick={checkedTarde}/>} label="Cartera Tarde" /> */}
                    </FormControl>
                </Grid>

                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label_4">Segmentos Elegibles</FormLabel>
                    
                       {/* <FormControlLabel value="21" control={<Checkbox disabled={carteraCompleta!=null || preventa==="Preventa" || italika==="ITALIKA" || tor==="TOR" || cdt==="CDT" || maz==="MAZ" || normalidad==="Normalidad"} onClick={checkedSeg21}/>} label="JUDICIAL" /> */}
                       <br/>
                       <FormControlLabel value="carteraDescarteCompleto" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null|| seg5VIP!==null || seg28VIP!==null || seg6VIP!==null|| descarteVIP!==null || descarteTerritorios!==null || descarteDiezYears!==null  || basePuraCF!==null || basePuraSF!==null  || descarteAband!==null || descarteImplant!==null || descarteTAZ!==null || descarteTOR!==null || descarteSalAlt!==null || descarteItalika!==null} onClick={checkedSegDescarteJunt}/>} label="Cartera Descarte del Dia Juntas" />
                       <br/>
                       <br/>
                       <FormControlLabel value="carteraJuntasSF" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null|| seg5VIP!==null || seg28VIP!==null || seg6VIP!==null|| descarteVIP!==null || descarteTerritorios!==null || descarteDiezYears!==null || basePuraCF!==null|| descarteCompleto!==null  || descarteAband!==null || descarteImplant!==null || descarteTAZ!==null || descarteTOR!==null || descarteSalAlt!==null || descarteItalika!==null} onClick={checkedSegCartsJunSF}/>} label="Carteras Puras Juntas Sin Filtros" />
                       <br/> 
                       <FormControlLabel value="carteraJuntasCF" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||carteraCompletaTerritorios!==null||carteraCompletaDiezYears!==null||carteraCompletaAbandonados!==null||carteraCompletaImplant!==null||carteraCompletaTAZ!==null||carteraCompletaTOR!==null||carteraCompletaSaldosAltos!=null||carteraCompletaItalika!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null|| seg5VIP!==null || seg28VIP!==null || seg6VIP!==null|| descarteVIP!==null || descarteTerritorios!==null || descarteDiezYears!==null || basePuraSF!==null|| descarteCompleto!==null  || descarteAband!==null || descarteImplant!==null || descarteTAZ!==null || descarteTOR!==null || descarteSalAlt!==null || descarteItalika!==null} onClick={checkedSegCartsJunCF}/>} label="Carteras Puras Juntas Con Filtros" />
                       {/* <FormControlLabel value="carteraManana" control={<Checkbox disabled={carteraCompleta!==null || carteraCompletaVIP!==null||seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null || credimax!==null || italika!==null || tor!==null || tazcdt!==null || cartTarde!==null} onClick={checkedManana}/>} label="Cartera Mañana" />
                       <FormControlLabel value="carteraVespertino" control={<Checkbox disabled={carteraCompleta!==null ||carteraCompletaVIP!==null|| seg5!==null || seg28!==null || seg6!==null || seg16!==null || descarte!==null || credimax!==null || italika!==null || tor!==null || tazcdt!==null || cartManana!==null} onClick={checkedTarde}/>} label="Cartera Tarde" /> */}
                    </FormControl>
                </Grid>

                <Grid item xl={3} lg={3} md={3} sm={3}></Grid>

                {/* <Grid item xl={1} lg={1} md={1} sm={1}></Grid> */}
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


