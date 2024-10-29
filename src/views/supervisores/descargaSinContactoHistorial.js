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
        id:5,
        valor: "Abandonados"
    },
    {
        id:6,
        valor: "Implant"
    },
    {
        id:7,
        valor: "TAZ"
    },
    {
        id:8,
        valor: "TOR"
    },
    {
        id:9,
        valor: "Saldos Altos"
    },
    {
        id:10,
        valor: "Italika"
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
                        if(data.hasOwnProperty('data')){
                            descargaArchivo(data.data)
                        }
                        // let respuesta=null;
                        // respuesta=descargarExcel.descargarExcel(data.data,"Cuentas_Sin_Contacto_Historial"+nombretTipoCartera);
                        // if(respuesta!==null){
                        //     handleCloseCargando();
                        //     handleOpenInfo(respuesta);
                        // }
                        
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

    const descargaArchivo=(datos)=>{
        let arreglo=[];
        datos.forEach(function(element){
            let json={
                "CLIENTE_UNICO":element.cliente_UNICO,
                "NOMBRE_CTE":element.nombre_CTE,
                "RFC_CTE":element.rfc_CTE,                
                "GENERO_CLIENTE":element.genero_CLIENTE,                
                "EDAD_CLIENTE":element.edad_CLIENTE,
                "DIRECCION_CTE":element.direccion_CTE,
                "NUM_EXT_CTE":element.num_EXT_CTE,
                "NUM_INT_CTE":element.num_INT_CTE,                
                "CP_CTE":element.cp_CTE,
                "COLONIA_CTE":element.colonia_CTE,                
                "POBLACION_CTE":element.poblacion_CTE,                
                "ESTADO_CTE":element.estado_CTE,
                "TERRITORIO":element.territorio,                
                "DIQUE":element.dique,                
                "ATRASO_MAXIMO":element.atraso_MAXIMO,
                "DIAS_ATRASO":element.dias_ATRASO,
                "SALDO":element.saldo,                
                "MORATORIOS":element.moratorios,
                "SALDO_TOTAL":element.saldo_TOTAL,                
                "SALDO_ATRASADO":element.saldo_ATRASADO,
                "SALDO_REQUERIDO":element.saldo_REQUERIDO,                
                "PAGO_PUNTUAL":element.pago_PUNTUAL,                
                "PAGO_NORMAL":element.pago_NORMAL,
                "PRODUCTO":element.producto,                
                "FECHA_ULTIMO_PAGO":element.fecha_ULTIMO_PAGO,
                "IMP_ULTIMO_PAGO":element.imp_ULTIMO_PAGO,
                "FIDIAPAGO":element.fidiapago,
                "TELEFONO1":element.telefono1,
                "TELEFONO2":element.telefono2,
                "TELEFONO3":element.telefono3,
                "TELEFONO4":element.telefono4,
                "TIPOTEL1":element.tipotel1,
                "TIPOTEL2":element.tipotel2,
                "TIPOTEL3":element.tipotel3,
                "TIPOTEL4":element.tipotel4,
                "CAMPANIA_RELAMPAGO":element.campania_RELAMPAGO,
                "CAMPANIA":element.campania,                
                "TIPO_CARTERA":element.tipo_CARTERA,                
                "ID_GRUPO":element.id_GRUPO,
                "GRUPO_MAZ":element.grupo_MAZ,
                "CLAVE_SPEI":element.clave_SPEI,                
                "PAGOS_CLIENTE":element.pagos_CLIENTE,
                "MONTO_PROMESA_PAGO":element.monto_PROMESA_PAGO,
                "SEGMENTO":element.segmento,                
                "TIPO_CARTERA_TKM":element.tipocarteratkm,
                "FECHA_INSER_LOCAL":element.fecha_INSER_LOCAL,
                // "MONTO_PROMESA":element.estatus_PROMESA_PAGO,
            }
            arreglo.push(json);

        })

        let respuesta=null;
        respuesta=descargarExcel.descargarExcel(arreglo,"Cuentas_Sin_Contacto_Historial"+nombretTipoCartera);

        if(respuesta!==null){
            handleCloseCargando();
            handleOpenInfo(respuesta);
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