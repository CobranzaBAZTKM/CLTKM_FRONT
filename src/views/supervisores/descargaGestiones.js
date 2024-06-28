import * as React from 'react';
import { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Button,Grid} from '@mui/material';
import Servicios from '../../services/servicios';
import * as XLSX from 'xlsx'
import {ModalInfo,ModalEspera} from '../../services/modals';
import DescargaExcel from '../descargarExcel';

const servicio=new Servicios();
const descargarExcel=new DescargaExcel();

export default class DescargaGestiones extends React.Component{
   
    constructor(props){
        super(props);
        
        this.state={
            personal:[],
            tipificaciones:[]
        }
    }

    componentWillMount(){
        servicio.consumirServiciosGET("service/gestores/consultarGestoresTKM").then(
            data=>{
                if(data.code===1){
                    this.setState({
                        personal:data.data
                    })
                }
            }
        )

        servicio.consumirServiciosGET("service/operacion/tipificaciones/consultarTipificaciones").then(
            data=>{
                if(data.code===1){
                    this.setState({
                        tipificaciones:data.data
                    })
                }
            }
        )
    }

    render(){
        return(
            <div>
                <DescargaDia
                    personal={this.state.personal}
                    tipificaciones={this.state.tipificaciones}
                />
            </div>
        )
    }

}


const DescargaDia=(props)=>{
    const navigate = useNavigate();
    const [fechaEleg,setFechaEleg]=useState("");

    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const [mensajeModalInfo, setMensajeModalInfo]=useState(null);
    const [openModalEspera, setOpenModalEspera] = React.useState(false);

    const handleOpenInfo = (mensaje) => {
        setMensajeModalInfo(mensaje);
        setOpenModalInfo(true);
    };
    const handleCloseInfo = () => {
        setOpenModalInfo(false);
    };

    const handleOpenEspera = () => {
        setOpenModalEspera(true);
    };
    const handleCloseEspera = () => {
        setOpenModalEspera(false);
    };

    const handleOnChangeFecha=(event)=>{
        let fechaRecuperado=String(event)
        let preparandoFecha =fechaRecuperado.split(" ");
        let mes=null;

        if(preparandoFecha[2]==="Jan"){
            mes="01"
        }else if(preparandoFecha[2]==="Feb"){
            mes="02"
        }else if(preparandoFecha[2]==="Mar"){
            mes="03"
        }else if(preparandoFecha[2]==="Apr"){
            mes="04"
        }else if(preparandoFecha[2]==="May"){
            mes="05"
        }else if(preparandoFecha[2]==="Jun"){
            mes="06"
        }else if(preparandoFecha[2]==="Jul"){
            mes="07"
        }else if(preparandoFecha[2]==="Aug"){
            mes="08"
        }else if(preparandoFecha[2]==="Sep"){
            mes="09"
        }else if(preparandoFecha[2]==="Oct"){
            mes="10"
        }else if(preparandoFecha[2]==="Nov"){
            mes="11"
        }else if(preparandoFecha[2]==="Dec"){
            mes="12"
        }
        setFechaEleg(preparandoFecha[1]+"-"+mes+"-"+preparandoFecha[3])
    }

    const handleClickDescargaPromesas=(opcion)=>{
        handleOpenEspera();
        if(opcion===1){
            if(fechaEleg!==null&&fechaEleg!==""){
                consultarPromesas(opcion);
            }else{
                handleCloseEspera();
                handleOpenInfo("Favor de elegir una fecha de descarga");
            }
        }else{
            consultarPromesas(opcion);
        }
    }

    const consultarPromesas=(opcion)=>{
        servicio.consumirServiciosGET("service/operacion/gestionllamadas/consultarGestionLlamadas").then(
            data=>{
                if(data.code===1){
                    if(opcion===1){
                        limpiarDia(data.data);
                    }else{
                        prepararLayoudDescarga(data.data);
                    }
                }else{
                    handleOpenInfo("Sucedio algo inesperado, favor de notificar")
                }
            }
        )
    }    

    const limpiarDia=(gestiones)=>{
        let gestionesDia=[];
        gestiones.forEach(function(element){
            if(element.fechaInserto===fechaEleg){
                gestionesDia.push(element);
            }
        }
        )

        prepararLayoudDescarga(gestionesDia)
    }

    const prepararLayoudDescarga=(gestionesDia)=>{
        let layoutDescarga=[];

        if(gestionesDia.length>0){
            gestionesDia.forEach(function(element){
                let tipificacionEscrita=null;
                let valorTipi=null;
                let nombreGestor=null;

                props.tipificaciones.forEach(function(elementTipi){
                    if(element.idTipificacion===elementTipi.id){
                        tipificacionEscrita=elementTipi.tipificacion;
                        valorTipi=elementTipi.valor;
                    }
                }
                )

                props.personal.forEach(function(elementPerso){
                    if(element.idGestorTkm===elementPerso.idTkm){
                        nombreGestor=elementPerso.nombreGestor;
                    }
                })



                console.log(props)
                let layoutArray={
                    "CLIENTE_UNICO":element.clienteUnico,
                    "ID_TIPIFICACION":element.idTipificacion,
                    "TIPIFICACION":tipificacionEscrita,  
                    "VALOR":valorTipi,
                    "GESTOR":nombreGestor,
                    "COMENTARIO_GESTOR":element.comentario,
                    "TELEFONO":element.telefono,
                    "FECHA_INSERTO":element.fechaInserto,
                    "HORA_INSERTO":element.horaInserto,
                    "TIPO_CARTERA_TKM":element.tipoCarteraTKM
                }

                layoutDescarga.push(layoutArray);
            })

            descargaGestiones(layoutDescarga)
        }else{
            handleCloseEspera();
            handleOpenInfo("No se obtuvieron gestiones de el dia "+fechaEleg);
        }

    }


    const descargaGestiones=(gestionesFinal)=>{
        let nombreArchivo=fechaEleg+"_Gestiones";
        let archivo=descargarExcel.descargarExcel(gestionesFinal,nombreArchivo);
        if(archivo!==null){
            handleCloseEspera();
            handleOpenInfo("Descarga Realizada");
        }
        console.log(archivo);        
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
                        Descargar Gestiones 
                    </h1>
                </Grid>
            </Grid>
            <br/>

            <Grid container spacing={1}>
                <Grid item xl={4} lg={4} md={4} sm={4}/> 
                <Grid item xl={4} lg={4} md={4} sm={4} style={{textAlign:'center'}}>                           
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker                       
                            label="Selecciona Fecha" 
                            // onChange={(dateIngPP)=>setFechaIngPP(dateIngPP)}
                            onChange={handleOnChangeFecha}
                        />
                    </LocalizationProvider>
                </Grid>  
                <Grid item xl={4} lg={4} md={4} sm={4}/>  
            </Grid>

           
            <br/><br/>
            <Grid container spacing={1}>
                <Grid item xl={1} lg={1} md={1} sm={1}>  
                    <ArrowBackIcon
                        style={{height:"80px",width:"200px"}}
                        onClick={()=>{handleClickRegresasr()}}
                    />
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={3}/> 
                <Grid item xl={4} lg={4} md={4} sm={4} style={{textAlign:'center'}}>                           
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        style={{height:"90px",width:"180px"}}
                        startIcon={<DownloadIcon style={{height:"40px",width:"50px"}} />}
                        onClick={()=>{handleClickDescargaPromesas(1)}}
        
                    >
                        Descargar Gestiones del Dia
                    </Button>
                    &nbsp; &nbsp; &nbsp;
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        style={{height:"90px",width:"180px"}}
                        startIcon={<DownloadIcon style={{height:"40px",width:"50px"}} />}
                        onClick={()=>{handleClickDescargaPromesas(2)}}
        
                    >
                        Descargar Gestiones Completas
                    </Button>
                </Grid>  
                <Grid item xl={4} lg={4} md={4} sm={4}/>  
            </Grid>

            <div>
                <ModalInfo open={openModalInfo} handleClose={handleCloseInfo} mensaje={mensajeModalInfo} />
                <ModalEspera open={openModalEspera} handleClose={handleCloseEspera} />
            </div>
        </div>
    ) 
}