import React, { useState } from "react";
import DownloadIcon from '@mui/icons-material/Download';
import {TextField, Button, Grid} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {ModalEspera,ModalInfo} from '../../services/modals';
import Servicios from '../../services/servicios';
import dayjs from "dayjs";
import * as XLSX from 'xlsx';

const servicio=new Servicios();

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
    const [fechaCorta,setFechaCorta]=useState(null);

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
        
        let fechaCorta=dayjs(event).format("DD/MM/YYYY");
        let fechaRecuperado=String(event)
        let preparandoFecha =fechaRecuperado.split(" ");
        setFechaPagos(preparandoFecha[1]+"/"+preparandoFecha[2]+"/"+preparandoFecha[3])
        setFechaCorta(fechaCorta);
    }

    const handleClickBuscarDescargaPagos=()=>{
        if(cookieBusq!==null&&fechaPagos!==null){
            handleOpenCargando();
            let endPoint="service/pagos/pagosDia";
            let json={     
                "cookieGestores":cookieBusq,
                "diaPago":fechaPagos,
                "idPlanActivo":fechaCorta
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
        let layoutDescarga=[];
        arregloPromesas.forEach(function(element){
            let layoutArray={
                "CLIENTE_UNICO":element.clienteUnico,
                "NOMBRE_CLIENTE":element.nombreCliente,
                "GESTOR":element.nombreGestor,
                "MONTO_PROMETIDO":element.montoPago,
                "MONTO_FINAL":element.pagoFinal,
            }
            layoutDescarga.push(layoutArray);
        });

        const workSheet=XLSX.utils.json_to_sheet(layoutDescarga);
        const workBook=XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook,workSheet,"Sheet0")
        // let buf=XLSX.write(workBook,{bookType:"xlsx", type:"buffer"})
        XLSX.write(workBook,{bookType:"xlsx", type:"buffer"})
        // XLSX.write(workBook,{bookType:"xlsx", type:"binary"})
        XLSX.writeFile(workBook, fechaCorta+"_ReportePagos.xlsx");
        handleCloseCargando();
        handleOpenInfo("Descarga Realizada");
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

            <ModalEspera open={openModalCargando} handleClose={handleCloseCargando} />
            <ModalInfo open={openModalInfo} handleClose={handleCloseInfo} mensaje={mensajeModalInfo} />
        </div>
    )
}