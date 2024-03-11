import React, { useState } from "react";
import DownloadIcon from '@mui/icons-material/Download';
import {TextField, Button, Grid} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default class ReportePagos extends React.Component{

    render(){
        return(
            <div>
                <Pagos/>
            </div>

        )
    }
}

const Pagos=()=>{

    const [cookieBusq,setCookieBusq]=useState(null);
    const [fechaPagos,setFechaPagos]=useState(null);

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

    const handleOnChangeBusqCookie=(event,newValue)=>{
        setCookieBusq(event.target.value);
    }

    const handleOnChangeFechaPago=(event)=>{
        let fechaRecuperado=String(event)
        let preparandoFecha =fechaRecuperado.split(" ");
        setFechaPagos(preparandoFecha[1]+"/"+preparandoFecha[2]+"/"+preparandoFecha[3])
    }

    const handleClickBuscarDescargaPagos=()=>{
        let json={
            "cookie":cookieBusq,
            "fechaBusqueda":fechaPagos
        }
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
                        Descargar Reporte de Pagos
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker                       
                            label="Selecciona Fecha Pago" 
                            onChange={handleOnChangeFechaPago}
                        />
                    </LocalizationProvider>
                    <br/><br/><br/>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        style={{height:"50px",width:"245px"}}
                        startIcon={<DownloadIcon style={{height:"40px",width:"50px"}} />}
                        onClick={()=>{handleClickBuscarDescargaPagos()}}
        
                    >
                        Buscar y Exportar Pagos             
                    </Button>

                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4}/>
            </Grid>
        </div>
    )
}