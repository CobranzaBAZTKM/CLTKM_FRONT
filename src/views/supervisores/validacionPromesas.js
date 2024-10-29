import React, { useState } from "react";
import {TextField, Button, Grid,Autocomplete} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import Servicios from '../../services/servicios';
import {ModalEspera,ModalInfo} from '../../services/modals';
import { useNavigate  } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DescargaExcel from "../descargarExcel";
import * as XLSX from 'xlsx';

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

    let semanaAnte;
    let semanaPas;

    const [cookieBusq,setCookieBusq]=useState(null);
    const [tipoCartera,setTipoCartera]=useState(null);
    const [nombretTipoCartera,setNombreTipoCartera]=useState(null);

    const [archs,setArchs]=useState([])
    // const [semanaAnte, setSemanaAnte] = useState([]);
    // const [semanaPas, setSemanaPas] = useState([]);

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
        // if(cookieBusq!==null&&tipoCartera!==null){
        if(tipoCartera!==null){
            let endPoint="service/pagos/validacionPromesasLocal/"+tipoCartera;
            handleOpenCargando();
            // let json={
            //     "cokkie":cookieBusq
            // }

            let json={
                "semanaPasada":semanaPas,
                "semanaAntePasada":semanaAnte
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


    const handleFileChange = (e) => {
        setArchs(e.target.files)

    };

    const handleFileUpload = (e) => {
        console.log("Leyendo Excel con el boton "+e)

        e.preventDefault();

        for(let i=0;i<2;i++){
            let fi=archs[i];
            try{
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                    const data = e.target.result;
                    const excel = XLSX.read(data, { type: 'binary' });
                    const sheetName = excel.SheetNames[0];
                    const sheet = excel.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 0 });
                    
                    transformarDatos(jsonData,i);
                    // setExcelData.push(jsonData);
                    
                };
                
                const d=fileReader.readAsBinaryString(fi);
                console.log(d)
            } catch (error) {
                console.error("Error leyendo el archivo");
            }
        }
        
        


        // e.preventDefault();
        // if (file) {
        //     try {
        //         const fileReader = new FileReader();
        //         fileReader.onload = (e) => {
        //             const data = e.target.result;
        //             const excel = XLSX.read(data, { type: 'binary' });
        //             const sheetName = excel.SheetNames[0];
        //             const sheet = excel.Sheets[sheetName];
        //             const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 0 });
                    
        //             // datosPrepararGuardar(jsonData);
        //             setExcelData(jsonData);
        //             console.log(jsonData)
        //         };
                
        //         const d=fileReader.readAsBinaryString(file);
        //         console.log(d)
        //     } catch (error) {
        //         console.error("Error leyendo el archivo");
        //     }
        // } else {
        //     alert('No has seleccionado un archivo');
        // }
    };

    const transformarDatos=(archivos,tipo)=>{
        let pagos=[];
        archivos.forEach(function(element){
            let json={
                "recupporgestion":element["Recuperación por Gestión"],
                "clienteUnico":element["CU Completo"],
                "fdfecharecepcion":element["Fecha Recepción"],
                "gestor":element["Gestor"]
            }
            pagos.push(json)
        })

        if(tipo===0){
            // setSemanaAnte(pagos);
            semanaAnte=pagos;
        }else{
            // setSemanaPas(pagos);
            semanaPas=pagos;
            handleClickBuscarDescargaValidacion()
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
                        Descargar Validacion Promesas
                    </h1>
                </Grid>
            </Grid> 
            <br/>
            <Grid container spacing={1}>

                <Grid item xl={4} lg={4} md={4} sm={4}/>
                <Grid item xl={4} lg={4} md={4} sm={4} style={{textAlign:'center'}}>
                    {/* <TextField 
                        id="Cookie"
                        label="Cookie"
                        style={{width:"250px"}}                        
                        onChange={handleOnChangeBusqCookie}
                    />                   
                    <br/><br/><br/> */}
                    <form  onSubmit={handleFileUpload}>
                        <input type="file" onChange={handleFileChange} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" multiple/>
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
                        <button class="button_1">Subir archivo</button>
                    </form>
                    <br/><br/><br/>
                    {/* <Autocomplete 
                        id="seleccionCartera"          
                        options={opcionesTipoCartera}
                        style={{width:"250px", textAlign:'center',marginLeft:'auto',marginRight:'auto'}}
                        getOptionLabel={(option) => option.valor}
                        renderInput={(params) => <TextField {...params} label="Tipo de Cartera" variant="outlined" />}
                        onChange={handleOnChangeCartera}
                    />
                    <br/><br/><br/> */}
                    {/* <Button
                        variant="contained"
                        color="success"
                        size="large"
                        style={{height:"50px",width:"245px"}}
                        startIcon={<DownloadIcon style={{height:"40px",width:"50px"}} />}
                        onClick={()=>{handleClickBuscarDescargaValidacion()}}
        
                    >
                        Descargar Validacion        
                    </Button> */}

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