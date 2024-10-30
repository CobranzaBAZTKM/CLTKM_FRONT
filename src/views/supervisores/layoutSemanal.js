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

export default class  LayoutSemanal extends React.Component{
    render(){
        return(
            <div>
                <LeerLayout/>
            </div>
        )
    }
}

const LeerLayout=()=>{

    const navigate = useNavigate();

    
    const [archs,setArchs]=useState([])
    const [openModalEsperar, setOpenModalEsperar] = React.useState(false);
    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const [mensajeModalInfo, setMensajeModalInfo]=useState(null);
    const [valorModelInfo,setValorModelInfo]=useState(0);
    const [pagosDiaAtrasA,setPagosDiasAtrasA]=useState([]);

    let recuNormalidad=0;
    let recuVIP=0;
    let recuTerritorios=0;
    let recuAbandonados=0;
    let recuImplant=0;
    let recuTAZ=0;
    let recuTOR=0;
    let recuSaldAlt=0;
    let recuItalika=0;
    let recuEspejo=0;

    let cantPagNorm=0;
    let cantPagVIP=0;
    let cantPagTerr=0;
    let cantPagAband=0;
    let cantPagImplant=0;
    let cantPagTAZ=0;
    let cantPagTOR=0;
    let cantPagSaldAlt=0;
    let cantPagItalika=0;
    let cantPagEspejo=0;

    let pagosDiaAtras=[];

    // const [recuNormalidad,setRecuNormalidad]=useState(null);
    // const [recuVIP,setRecuVIP]=useState(0);
    // const [recuTerritorios,setRecuTerritorios]=useState(0);
    // const [recuDiez,setRecuDiez]=useState(0);
    // const [recuAbandonados,setRecuAbandonados]=useState(0);
    // const [recuImplant,setRecuImplant]=useState(0);
    // const [recuTAZ,setRecuTAZ]=useState(0);
    // const [recuTOR,setRecuTOR]=useState(0);
    // const [recuSaldAlt,setRecuSaldAlt]=useState(0);
    // const [recuItalika,setRecuItalika]=useState(0);

    // const [cantPagNorm,setCantPagNorm]=useState(0);
    // const [cantPagVIP,setCantPagVIP]=useState(0);
    // const [cantPagTerr,setCantPagTerr]=useState(0);
    // const [cantPagDiez,setCantPagDiez]=useState(0);
    // const [cantPagAband,setCantPagAband]=useState(0);
    // const [cantPagImplant,setCantPagImplant]=useState(0);
    // const [cantPagTAZ,setCantPagTAZ]=useState(0);
    // const [cantPagTOR,setCantPagTOR]=useState(0);
    // const [cantPagSaldAlt,setCantPagSaldAlt]=useState(0);
    // const [cantPagItalika,setCantPagItalika]=useState(0);

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
        if(valorModelInfo===1){
            ObtenerPP();
        }       
        
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
                        
                        // datosPrepararGuardar(jsonData,archivo,i,finArr);
                        datosPrepararGuardar(jsonData,archivo,sumArr,finArr);
                        sumArr=sumArr+1;                        
                    };
                    const d=fileReader.readAsBinaryString(archivo);
                }catch (error) {
                    console.error("Error leyendo el archivo");
                }
            }
        }else{
            handleOpenInfo("No hay archivos para cargar y obtener información")
        }
    }

    const datosPrepararGuardar=(pagos,archi,valorActual,valorFinal)=>{
        // let fecha=fechaHora.ObtenerDia()+"/"+fechaHora.ObtenerMes()+"/"+fechaHora.ObtenerYear();
        const unDiaAtras=dayjs().add(-1, 'day').format('DD/MM/YYYY');
        let recuperacion=0;
        let cantidadPagos=0;
        pagos.forEach(function(element){
            let recuperacionXGest=element["Recuperación por Gestión"];
            recuperacion=recuperacion+recuperacionXGest
            cantidadPagos=recuperacionXGest>0?cantidadPagos+1:cantidadPagos;
            let fechaRecep=element["Fecha Recepción"].split(" ")[0];
            if(unDiaAtras===fechaRecep){
                if(element["Recuperación por Gestión"]>0){
                    pagosDiaAtras.push(element["CU Completo"]+"|"+element["Recuperación por Gestión"]);
                }
            }
        })

        console.log(recuperacion);

        let nombreArchivo=archi.name.split("_");
        let despacho=nombreArchivo[0].split("ReportePagos")[1];

        switch(despacho){
            case "60054":
                recuNormalidad=recuperacion;
                cantPagNorm=cantidadPagos;
                break;
            case "60165":
                recuVIP=recuperacion;
                cantPagVIP=cantidadPagos;
                break;
            case "60174":
                recuTerritorios=recuperacion;
                cantPagTerr=cantidadPagos;
                break;
            case "60160":
                recuAbandonados=recuperacion;
                cantPagAband=cantidadPagos;
                break;
            case "60163":
                recuImplant=recuperacion;
                cantPagImplant=cantidadPagos;
                break;
            case "60167":
                recuTAZ=recuperacion;
                cantPagTAZ=cantidadPagos;
                break;
            case "60170":
                recuTOR=recuperacion;
                cantPagTOR=cantidadPagos;
                break;
            case "60176":
                recuSaldAlt=recuperacion;
                cantPagSaldAlt=cantidadPagos;
                break;
            case "60178":
                recuItalika=recuperacion;
                cantPagItalika=cantidadPagos;
                break;
            case "60187":
                recuEspejo=recuperacion;
                cantPagEspejo=cantidadPagos;
                break;
            default:
                console.log("Vacio");
        }    
        console.log(despacho)

        if(valorActual===valorFinal){
            obtenerCartera();
        }
    }

    const obtenerCartera=()=>{
        
        let json={
            "":"",
        }

        servicio.consumirServicios(json,"service/carteraLocal/consultarBaseLocalPorCartera/0").then(
            data=>{
                if(data.code===1){
                    armarLayout(data.data);
                }
            }
        )
    }

    const armarLayout=(cartera)=>{
        let cantidadCartera=cartera.length;
        let cantidadCarteraNormalidad=0;
        let cobranzaTotal=recuNormalidad+recuVIP+recuTerritorios+recuAbandonados+recuImplant+recuTAZ+recuTOR+recuSaldAlt+recuItalika+recuEspejo;
        cartera.forEach(function(element){
            if(element.tipocarteratkm==="Normalidad"){
                cantidadCarteraNormalidad=cantidadCarteraNormalidad+1;
            }
        })
        let EPRGeneral=cobranzaTotal/cantidadCartera;
        let EPRNormalidad=recuNormalidad/cantidadCarteraNormalidad;

        let json={
            "cuentasGeneral":new Intl.NumberFormat('es-MX').format(cantidadCartera)+"",
            "eprGeneral":EPRGeneral+"",
            "cuentasNormalidad":new Intl.NumberFormat('es-MX').format(cantidadCarteraNormalidad)+"",
            "eprNormalidad":EPRNormalidad+"",
            "pagosNormalidad":cantPagNorm+"",
            "recuperacionNormalidad":"$"+new Intl.NumberFormat('es-MX').format(recuNormalidad)+"",
            "pagosVIP":cantPagVIP+"",
            "recuperacionVIP":"$"+new Intl.NumberFormat('es-MX').format(recuVIP)+"",
            "pagosTerritorios":cantPagTerr+"",
            "recuperacionTerritorios":"$"+new Intl.NumberFormat('es-MX').format(recuTerritorios)+"",
            "pagosAbandonados":cantPagAband+"",
            "recuperacionAbandonados":"$"+new Intl.NumberFormat('es-MX').format(recuAbandonados)+"",
            "pagosImplant":cantPagImplant+"",
            "recuperacionImplant":"$"+new Intl.NumberFormat('es-MX').format(recuImplant)+"",
            "pagosTAZ":cantPagTAZ+"",
            "recuperacionTAZ":"$"+new Intl.NumberFormat('es-MX').format(recuTAZ)+"",
            "pagosTOR":cantPagTOR+"",
            "recuperacionTOR":"$"+new Intl.NumberFormat('es-MX').format(recuTOR)+"",
            "pagosSaldAlt":cantPagSaldAlt+"",
            "recuperacionSaldAlt":"$"+new Intl.NumberFormat('es-MX').format(recuSaldAlt)+"",
            "pagosItalika":cantPagItalika+"",
            "recuperacionItalika":"$"+new Intl.NumberFormat('es-MX').format(recuItalika)+"",
            "pagosEspejo":cantPagEspejo+"",
            "recuperacionEspejo":"$"+new Intl.NumberFormat('es-MX').format(recuEspejo)+"",
            "total":"$"+new Intl.NumberFormat('es-MX').format(cobranzaTotal)+"",
        }
        console.log(json);
        
        servicio.consumirServicios(json,"service/pagos/layoutSemanal").then(
            data=>{
                if(data.code===1){
                    setPagosDiasAtrasA(pagosDiaAtras)
                    handleCloseEsperar();
                    setValorModelInfo(1)
                    handleOpenInfo("Correo(s) con la recuperacion semanal enviado(s) correctamente, presiona OK para continuar");
                }
            }
        )

    }

    const ObtenerPP=()=>{
        handleOpenEsperar();
        const unDiaAtras=dayjs().add(-1, 'day').format('DD/MMM/YYYY');
        servicio.consumirServiciosGET("service/promesas/consultarPromesasPP").then(
            data=>{
                if(data.code===1){
                    let ppDiaAtras=[];
                    data.data.forEach(function(element){
                        if(element.fechaVencimientoPP===unDiaAtras){
                            ppDiaAtras.push(element.id+"|"+element.clienteUnico);
                        }
                    })
                    evaluarCU(ppDiaAtras);
                }
            }
        )
    }


    const evaluarCU=(ppDiaAtras)=>{
        let colocarPago=[];
        pagosDiaAtrasA.forEach(function(element){
            let sepCuMon=element.split("|");
            let sepCU=sepCuMon[0].split("-");
            let sucursal=sepCU[2].length===3?"0"+sepCU[2]:sepCU[2];
            let cu=sepCU[0]+"-"+sepCU[1]+"-0"+sucursal+"-"+sepCU[3];

            ppDiaAtras.forEach(function(element2){
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
                if(data.code===1){
                    handleCloseEsperar();
                    setValorModelInfo(0)
                    handleOpenInfo("Se actualizaron los pagos correctamente");
                }
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
                        Layout Semanal
                    </h1>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xl={4} lg={4} md={4} sm={4}/>
                    <Grid item xl={4} lg={4} md={4} sm={4} style={{textAlign:'center'}}>
                        <form  onSubmit={handleFileUpload}>
                            <input type="file" onChange={handleFileChange} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" multiple/>
                            <br/><br/><br/>
                            <button class="button_1">Obtener Recuperacion Semanal</button>
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