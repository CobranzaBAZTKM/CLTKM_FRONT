import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import DescargaExcel from '../descargarExcel';
import Servicios from '../../services/servicios';
import {TextField,Button,Grid,Autocomplete} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {ModalEspera,ModalInfo} from '../../services/modals';
import DownloadIcon from '@mui/icons-material/Download';


const servicio=new Servicios();
const descargarExcel=new DescargaExcel();

const opcionesTipoCartera=[
    {
        id:1,
        valor: "Normalidad"
    },
    {
        id:2,
        valor: "VIP"
    },
    {
        id:3,
        valor: "Territorios"
    },
    {
        id:4,
        valor: "Diez Años"
    },
]

export default class DescargaSinContactoHistorial extends React.Component{

    render(){
        return(
            <div>
                <DescargaHistorialSinContacto/>
            </div>
        )
    }
}

const DescargaHistorialSinContacto=()=>{
    
    const navigate = useNavigate();

    const [tipoCartera,setTipoCartera]=useState(null);
    const [nombretTipoCartera,setNombreTipoCartera]=useState(null);

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
        }else{
            setTipoCartera(newValue.id);
            setNombreTipoCartera(newValue.valor);
        }
    }

    const handleClickDescargaPromesas=()=>{
        handleOpenCargando();
        if(tipoCartera!==null){
            servicio.consumirServiciosGET("service/carteraLocal/consultarCuentasSinContactoHistorico/"+tipoCartera).then(
                data=>{
                    if(data.code===1){
                        let respuesta=null;
                        respuesta=descargarExcel.descargarExcel(data.data,"Cuentas_Sin_Contacto_Historial"+nombretTipoCartera);
                        if(respuesta!==null){
                            handleCloseCargando();
                            handleOpenInfo(respuesta);
                        }
                        
                    }else{
                        handleCloseCargando();
                        handleOpenInfo("Ocurrio algo inesperado");
                    }
                }   
            )
        }else{
            handleOpenInfo("Favor de elegir un tipo de cartera");
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
                        Descargar Historial de Cuentas Sin Contacto
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
                        style={{height:"70px",width:"245px"}}
                        startIcon={<DownloadIcon style={{height:"40px",width:"50px"}} />}
                        onClick={()=>{handleClickDescargaPromesas()}}
        
                    >
                        Descargar Historico Sin Contacto
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