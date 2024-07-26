import React, { useState } from "react";
import {TextField, Button, Grid,Autocomplete} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import Servicios from '../../services/servicios';
import {ModalEspera,ModalInfo} from '../../services/modals';
import { useNavigate  } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DescargaExcel from "../descargarExcel";

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

export default class ValidacionPromesas extends React.Component{

    render(){
        return(
            <div>
                <Validacion/>
            </div>
        )
    }

}

const Validacion=()=>{

    const navigate = useNavigate();

    const [cookieBusq,setCookieBusq]=useState(null);
    const [tipoCartera,setTipoCartera]=useState(null);
    const [nombretTipoCartera,setNombreTipoCartera]=useState(null);

    const [openModalCargando, setOpenModalCargando] = React.useState(false);
    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const [mensajeModalInfo, setMensajeModalInfo]=useState(null);

    const handleOnChangeBusqCookie=(event,newValue)=>{
        setCookieBusq(event.target.value);
    }

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


    const handleClickBuscarDescargaValidacion=()=>{
        if(cookieBusq!==null&&tipoCartera!==null){
            let endPoint="service/pagos/validacionPromesasLocal/"+tipoCartera;
            handleOpenCargando();
            let json={
                "cokkie":cookieBusq
            }

            servicio.consumirServicios(json,endPoint).then(
                data=>{
                    if(data.code===1){
                        prepararExcel(data.data);
                    }else{
                        handleCloseCargando();
                        handleOpenInfo("Fallo algo en la consulta");
                    }
                }
            )

        }else{
            handleOpenInfo("Favor de validar que los campos de cookie y fecha contengan datos");
        }
    }


    const prepararExcel=(arregloPromesas)=>{
        let arreglo=[];

        arregloPromesas.forEach(function(element){
            let json={
                "CLIENTE_UNICO":element.cliente_UNICO,
                "NOMBRE":element.nombre_CTE,
                "MONTO":element.monto_PROMESA_PAGO,
                "PRODUCTO":element.producto,
                "CAMPAÑA":element.campania,
                "SEGMENTO":element.segmento,
                "FECHA_INSERCCION":element.fecha_INSER_LOCAL
            }

            arreglo.push(json);
        })


        let archivo=descargarExcel.descargarExcel(arreglo,"Reporte_Valiacion_Promesas_"+nombretTipoCartera);
        if(archivo!==null){
            handleCloseCargando();
            handleOpenInfo("Descarga Realizada");
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
                        Descargar Validacion Promesas
                    </h1>
                </Grid>
            </Grid> 
            <br/>
            <Grid container spacing={1}>

                <Grid item xl={4} lg={4} md={4} sm={4}/>
                <Grid item xl={4} lg={4} md={4} sm={4} style={{textAlign:'center'}}>
                    <TextField 
                        id="Cookie"
                        label="Cookie"
                        style={{width:"250px"}}                        
                        onChange={handleOnChangeBusqCookie}
                    />                   
                    <br/><br/><br/>
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
                        onClick={()=>{handleClickBuscarDescargaValidacion()}}
        
                    >
                        Descargar Validacion        
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