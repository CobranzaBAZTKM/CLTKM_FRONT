import React, { useState } from "react";
import {TextField, Button, Grid,Autocomplete} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import Servicios from '../../services/servicios';
import {ModalEspera,ModalInfo} from '../../services/modals';
import { useNavigate  } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DescargaExcel from "../descargarExcel";
import FechaHora from '../../services/fechaHora';

const servicio=new Servicios();
const descargarExcel=new DescargaExcel();
const fechaHora=new FechaHora();

const opcionesTipoCartera=[
    {
        id:1,
        valor: "Normalidad",
        despacho:"60054"
    },
    {
        id:2,
        valor: "VIP",
        despacho:"60165"
    },
    {
        id:3,
        valor: "Territorios",
        despacho:"60174"
    },
    {
        id:5,
        valor: "Abandonados",
        despacho:"60160"
    },
    {
        id:6,
        valor: "Implant",
        despacho:"60163"
    },
    {
        id:7,
        valor: "TAZ",
        despacho:"60167"
    },
    {
        id:8,
        valor: "TOR",
        despacho:"60170"
    },
    {
        id:9,
        valor: "Saldos Altos",
        despacho:"60176"
    },
    {
        id:10,
        valor: "Italika",
        despacho:"60178"
    },

]


export default class ArchivosMasivoGestiones extends React.Component{

    render(){
        return(
            <div>
                <ObtenerArchivos/>
            </div>
        )
    }

}

const ObtenerArchivos=()=>{
    const navigate = useNavigate();

    const [tipoCartera,setTipoCartera]=useState(null);
    const [nombretTipoCartera,setNombreTipoCartera]=useState(null);
    const [despachoEleg, setDespachoEleg]=useState(null);

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

    const handleOnChangeCartera=(event,newValue)=>{
        if(newValue===null){
            setTipoCartera(null);
            setNombreTipoCartera(null);
            setDespachoEleg(null);
        }else{
            setTipoCartera(newValue.id);
            setNombreTipoCartera(newValue.valor);
            setDespachoEleg(newValue.despacho);
        }
    }

    const handleClickDescargaArchivos=()=>{
        if(tipoCartera!==null){
            handleOpenCargando();
            let json={"":""}
            servicio.consumirServicios(json,"service/carteraLocal/consultarBaseLocalPorCartera/"+tipoCartera).then(
                data=>{
                    if(data.code===1){
                        descargarArchivos(data.data);
                    }else{
                        handleCloseCargando();
                        handleOpenInfo("Ocurrio algo inesperado Favor de volver a intentar");
                    }
                }
            )
        }else{
            handleOpenInfo("Favor de validar que se haya elegido una cartera");
        }
        
    }

    const descargarArchivos=(base)=>{
        let dia=fechaHora.ObtenerDia();
        let mes=fechaHora.ObtenerMes();
        let year=fechaHora.ObtenerYear();
        let bandera=0;
        let arreglo=[];
        base.forEach(function(element){
          
          let json={
            "TEXTO":element.cliente_UNICO+"|"+dia+"/"+mes+"/"+year+"|812|6|SE REALIZA ENVIO GESTION TELEFONICA BLASTER Y SMS SOLICTANDO PAGO HOY|"+despachoEleg+"|60165"
          }

          arreglo.push(json);
          bandera=bandera+1

        //   if(arreglo.length===9999){
          if(arreglo.length===5000){
            let nombreArchivo=dia+mes+year+"_Gestiones_"+nombretTipoCartera;
            let archivo=descargarExcel.descargarExcelCSV(arreglo,nombreArchivo);
            console.log(archivo);
            arreglo=[];
            console.log(arreglo.length);
          }else if(bandera===base.length){
            let nombreArchivo=dia+mes+year+"_Gestiones_"+nombretTipoCartera;
            let archivo=descargarExcel.descargarExcelCSV(arreglo,nombreArchivo);
            console.log(archivo);
            arreglo=[];
            console.log(arreglo.length);
          }
          

        
        })

        if(bandera===base.length){
            handleCloseCargando();
            handleOpenInfo("Archivos Descargados con exito");
        }
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
                        Descargar Archivos para Gestiones
                    </h1>
                </Grid>
            </Grid> 
            <br/>
            <Grid container spacing={1}>
                <Grid item xl={4} lg={4} md={4} sm={4}/>
                <Grid item xl={4} lg={4} md={4} sm={4} style={{textAlign:'center'}}>
                    <Autocomplete 
                        id="seleccionCartera"          
                        options={opcionesTipoCartera}
                        style={{width:"250px", textAlign:'center',marginLeft:'auto',marginRight:'auto'}}
                        getOptionLabel={(option) => option.valor}
                        renderInput={(params) => <TextField {...params} label="Tipo de Cartera" variant="outlined" />}
                        onChange={handleOnChangeCartera}
                    />
                    <br/><br/><br/>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        style={{height:"50px",width:"245px"}}
                        startIcon={<DownloadIcon style={{height:"40px",width:"50px"}} />}
                        onClick={()=>{handleClickDescargaArchivos()}}
        
                    >
                        Descargar Archivos        
                    </Button>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4}/>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xl={1} lg={1} md={1} sm={1} />
                <Grid item xl={2} lg={2} md={2} sm={2} >
                    <ArrowBackIcon
                        style={{height:"80px",width:"200px"}}
                        onClick={()=>{handleClickRegresasr()}}
                    />
                </Grid>
                <Grid item xl={9} lg={9} md={9} sm={9} />
            </Grid>

            <ModalEspera open={openModalCargando} handleClose={handleCloseCargando} />
            <ModalInfo open={openModalInfo} handleClose={handleCloseInfo} mensaje={mensajeModalInfo} />
        </div>
    )
}