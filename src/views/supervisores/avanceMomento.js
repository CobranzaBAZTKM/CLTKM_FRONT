import React, { useState } from "react";
import * as XLSX from 'xlsx';
import {Grid} from '@mui/material';
import Servicios from '../../services/servicios';
import {ModalEspera,ModalInfo} from '../../services/modals';
import { useNavigate  } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FechaHora from '../../services/fechaHora';
import dayjs from 'dayjs';

const servicio=new Servicios();
const fechaHora=new FechaHora();

export default class AvanceMomento extends React.Component{
    render(){
        return(
            <div>
                <CrearAvance/>
            </div>
        )
    }
}

const CrearAvance=()=>{

    const navigate = useNavigate();

    let recuperacion=0;
    let pag=[]

    const [archs,setArchs]=useState([])
    const [openModalEsperar, setOpenModalEsperar] = React.useState(false);
    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const [mensajeModalInfo, setMensajeModalInfo]=useState(null);

    const handleOpenEsperar = () => {
        setOpenModalEsperar(true);
    };
    const handleCloseEsperar = () => {
        setOpenModalEsperar(false);
    };

    const handleOpenInfo = (mensaje) => {
        setMensajeModalInfo(mensaje);
        setOpenModalInfo(true);
    };
    const handleCloseInfo = () => {
        setOpenModalInfo(false);
    };

     
    const handleFileChange = (e) => {
        setArchs(e.target.files)
    };

    const handleFileUpload = (e) => {
        e.preventDefault();
        let x=archs.length;
        if(x>0){
            handleOpenEsperar();        
            let finArr=x-1;
            let sumArr=0;
            for(let i=0;i<x;i++){
                let archivo=archs[i];
                
                try{
                    const fileReader = new FileReader();
                    fileReader.onload = (e) => {
                        const data = e.target.result;
                        const excel = XLSX.read(data, { type: 'binary' });
                        const sheetName = excel.SheetNames[0];
                        const sheet = excel.Sheets[sheetName];
                        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 0 });

                        // datosMomento(jsonData,i,finArr);
                        datosMomento(jsonData,sumArr,finArr);
                        sumArr=sumArr+1;
                    }
                    const d=fileReader.readAsBinaryString(archivo);
                }catch (error) {
                    console.error("Error leyendo el archivo");
                }
            }
        }else{
            handleOpenInfo("No hay archivos para cargar y obtener información")
        }
    }

    const datosMomento=(pagos,valorActual,valorFinal)=>{
        
        let fecha=fechaHora.ObtenerDia()+"/"+fechaHora.ObtenerMes()+"/"+fechaHora.ObtenerYear();
        pagos.forEach(function(element){
            let fechaRecep=element["Fecha Recepción"].split(" ")[0];
            if(fecha===fechaRecep){
                if(element["Recuperación por Gestión"]>0){
                    recuperacion=recuperacion+element["Recuperación por Gestión"];
                    pag.push(element["CU Completo"]+"|"+element["Recuperación por Gestión"])
                }
            }
            
        })

        if(valorActual===valorFinal){    
            let mensaje="La recuperacion al momento es de: $"+new Intl.NumberFormat('es-MX').format(recuperacion)+" | "+fecha+" "+fechaHora.ObtenerHoraCompleta();
            let json={
                "asunto":"Recuperacion al momento",
                "mensaje":mensaje,
                "destinatario":[
                    "rfrutos@tkm.com.mx",
                    "asalas@tkm.com.mx",
                    "eflorentino@tkm.com.mx",
                    "bhernandezc@tkm.com.mx",
                    "amartinezt@tkm.com.mx",
                ]
               
            }
    
            servicio.consumirServicios(json,"service/notificaciones/enviarCorreo").then(
                data=>{
                    if(data.hasOwnProperty('code')){
                        handleCloseEsperar();
                        handleOpenInfo(mensaje)
                        ObtenerPP();
                    }
                    
                }
            )
        }
    }

    const ObtenerPP=()=>{
        let fecha=dayjs().format('DD/MMM/YYYY')
        servicio.consumirServiciosGET("service/promesas/consultarPromesasPP").then(
            data=>{
                if(data.code===1){
                    let ppHoy=[];
                    data.data.forEach(function(element){
                        if(element.fechaPago===fecha){
                            ppHoy.push(element.id+"|"+element.clienteUnico);
                        }
                    })
                    evaluarCU(ppHoy);
                }
            }
        )
    }

    const evaluarCU=(ppHoy)=>{
        let colocarPago=[];
        pag.forEach(function(element){
            let sepCuMon=element.split("|");
            let sepCU=sepCuMon[0].split("-");
            let cu=sepCU[0]+"-"+sepCU[1]+"-0"+sepCU[2]+"-"+sepCU[3];

            ppHoy.forEach(function(element2){
                let sepidCu=element2.split("|");
                if(sepidCu[1]===cu){
                    let json={
                        "id":sepidCu[0],
                        "pagoFinal":sepCuMon[1],
                    }
                    colocarPago.push(json);
                }
            })
        })

        
        servicio.consumirServicios(colocarPago,"service/promesas/actualizarMontoPromesa").then(
            data=>{
                console.log(data);
            }
        );
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
                        Avance al Momento
                    </h1>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xl={4} lg={4} md={4} sm={4}/>
                    <Grid item xl={4} lg={4} md={4} sm={4} style={{textAlign:'center'}}>
                        <form  onSubmit={handleFileUpload}>
                            <input type="file" onChange={handleFileChange} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" multiple/>
                            <br/><br/><br/>
                            <button class="button_1">Obtener Recuperacion</button>
                        </form>
                    </Grid>
                    <Grid item xl={4} lg={4} md={4} sm={4}/>
                </Grid>
            </Grid> 
            <br/><br/><br/>
            <Grid container spacing={1}>
                <Grid item xl={1} lg={1} md={1} sm={1}/> 
                <Grid item xl={2} lg={2} md={2} sm={2} >
                    <ArrowBackIcon
                        style={{height:"80px",width:"200px"}}
                        onClick={()=>{handleClickRegresasr()}}
                    />
                </Grid>
                <Grid item xl={9} lg={9} md={9} sm={9}/> 
            </Grid>
            <ModalEspera open={openModalEsperar} handleClose={handleCloseEsperar} />
            <ModalInfo open={openModalInfo} handleClose={handleCloseInfo} mensaje={mensajeModalInfo} />
        </div>
    )
}