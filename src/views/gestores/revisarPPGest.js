import * as React from 'react';
import { useState } from "react";
import {TextField, Button, Grid, Autocomplete, FormControl,InputLabel,OutlinedInput,IconButton} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Servicios from '../../services/servicios';
import {ModalInfo,Modal10i2e} from '../../services/modals';
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate  } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const servicio=new Servicios();

const opcionesFecha=[
    {
        id:1,
        valor: "Fecha de ingreso de PP"
    },
    {
        id:2,
        valor: "Fecha de pago"
    },
    {
        id:3,
        valor: "Fecha que vence el plan"
    }
]

const columnas=[
    { 
        field: 'id', 
        headerName: 'ID', 
        width: 50 
    },
    {
        field:"fechaIngesoPP",
        headerName: "Fecha de Ingreso PP",
        width:150,
        editable:false,
    },
    {
        field:"fechaPago",
        headerName: "Fecha de Pago",
        width:150,
        editable:false,
    },
    {
        field:"fechaVencimientoPP",
        headerName: "Fecha de Vencimiento PP",
        width:150,
        editable:false,
    },
    {
        field:"folio",
        headerName: "Folio",
        width:150,
        editable:false,
    },
    {
        field:"montoPago",
        headerName: "Monto de Pago",
        width:150,
        editable:false,
    },
    {
        field:"nombreCliente",
        headerName: "Nombre del Cliente",
        width:300,
        editable:false,
    },
    {
        field:"clienteUnico",
        headerName: "Cliente Unico",
        width:175,
        editable:false,
    },
    {
        field:"telefono",
        headerName: "Telefono",
        width:150,
        editable:false,
    },

    {
        field:"observaciones",
        headerName: "Observaciones",
        width:200,
        editable:false,
    },
    {
        field:"whatsApp",
        headerName: "WhatsApp",
        width:150,
        editable:false,
    },
    {
        field:"nota",
        headerName: "Adicional",
        width:150,
        editable:false,
    },
    {
        field:"montoSemanal",
        headerName: "Pago Semanal",
        width:150,
        editable:false,
    },
    {
        field:"pagoFinal",
        headerName: "Pago",
        width:150,
        editable:false,
    },    
    {
        field:"recurrencia",
        headerName: "Recurrencia",
        width:150,
        editable:false,
    }

 ]

export default class RevisarPPGest extends React.Component{
    constructor(props){
        super(props);
        this.state={
            gestores:[],
        }
    }

    componentWillMount(){

        servicio.consumirServiciosGET("service/gestores/consultarGestoresTKM").then(
                data=>{
                    if(data.code===1){
                        let arreglo=[];
                        data.data.forEach(function(element){
                            if(element.estado===1){
                                arreglo.push(element);
                            }
                        })

                        this.setState({
                            gestores:arreglo
                        })
                    }
                }
            )
        }

    render(){
        return(            
            <div>
                <RevisarPromesasGes
                    personal={this.state.gestores}
                />
            </div>
        )
    }
}

const RevisarPromesasGes=(props)=>{
    const navigate = useNavigate();
    let promesasPuras=[]

    const [login, setLogin]=useState(false);
    const [idLogin, setIdLogin]=useState(null);
    const [passLogin, setPassLogin]=useState(null);
    const [showPassword, setShowPassword] = React.useState(false);
    const [nombreGestor, setNombreGestor]= useState(null);

    const [promesas, setPromesas]=useState([]);
    const [mostarTabla, setMostrarTabla]=useState(true);

    const [fechaDiaBusq,setFechaDiaBusq]=useState(null);
    const [fechaMesBusq,setFechaMesBusq]=useState(null);
    const [fechaYearBusq,setFechaYearBusq]=useState(null);
    const [tipoFechaBusq, setTipoFechaBusq]=useState(null);

    const [idAct, setIdAct]=useState(null);
    const [estatusAct, setEstatusAct]=useState(null);
    const [pagoAct, setPagoAct]=useState(null);
    const [fechaPagoAct, setIdFechaPagoAct]=useState(null);
    const [fechaVencimientoPPAct,setFechaVencimientoPPAct]=useState(null);
    const [recurrenciaAct,setRecurrenciaAct]=useState(null);
    const [montoSemanalAct,setMontoSemanalAct]=useState(null);
    const [montoPagoAct, setMontoPagoAct]=useState(null);


    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const [mensajeModalInfo, setMensajeModalInfo]=useState(null);

    const [openModal10i2e, setOpenModal10i2e]= React.useState(false);
    const [mensaje110i2e, setMensaje110i2e]=useState(null);
    const [mensaje210i2e, setMensaje210i2e]=useState(null);
    const [mensaje310i2e, setMensaje310i2e]=useState(null);
    const [mensaje410i2e, setMensaje410i2e]=useState(null);
    const [mensaje510i2e, setMensaje510i2e]=useState(null);
    const [mensaje610i2e, setMensaje610i2e]=useState(null);
    const [mensaje710i2e, setMensaje710i2e]=useState(null);
    const [mensaje810i2e, setMensaje810i2e]=useState(null);
    const [mensaje910i2e, setMensaje910i2e]=useState(null);
    const [mensaje1010i2e, setMensaje1010i2e]=useState(null);
    const [mensaje1110i2e, setMensaje1110i2e]=useState(null);
    const [mensaje1210i2e, setMensaje1210i2e]=useState(null);
    const [mensaje1310i2e, setMensaje1310i2e]=useState(null);
    const [elegible110i2e, setElegible110i2e]=useState("");
    const [elegible210i2e, setElegible210i2e]=useState("");
    const [elegible310i2e, setElegible310i2e]=useState("");
    const [opcion112i2e, setOpcion112i2e]=useState(null);



    const handleOpenInfo = (mensaje) => {
        setMensajeModalInfo(mensaje);
        setOpenModalInfo(true);
    };
    const handleCloseInfo = () => {
        setOpenModalInfo(false);
    };

    const handleOpen10i2e=(sms1,sms2,sms3,sms4,sms5,sms6,sms7,sms8,sms9,sms10,sms11,sms12,ele1,ele2,ele3,sms13)=>{
        setMensaje110i2e(sms1);
        setMensaje210i2e(sms2);
        setMensaje310i2e(sms3);
        setMensaje410i2e(sms4);
        setMensaje510i2e(sms5);
        setMensaje610i2e(sms6);
        setMensaje710i2e(sms7);
        setMensaje810i2e(sms8);
        setMensaje910i2e(sms9);
        setMensaje1010i2e(sms10);
        setMensaje1110i2e(sms11);
        setMensaje1210i2e(sms12);
        setMensaje1310i2e(sms13);
        setElegible110i2e(ele1);
        setElegible210i2e(ele2);
        setElegible310i2e(ele3)
        setOpcion112i2e("Actualizar")
        setOpenModal10i2e(true)
    }

    const handleClose10i2e=()=>{
        setOpenModal10i2e(false);
    }



    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleOnChangeIdTKM=(event)=>{
        setIdLogin(event.target.value);
    }

    const handleOnChangePassTKM=(event)=>{
        setPassLogin(event.target.value);
    }

    const validarLogin=()=>{
        let nombre=null;
        if(idLogin!==null&&idLogin!==""&&passLogin!==null&&passLogin!==""){
            props.personal.forEach(function(element){
                if(element.idTkm===parseInt(idLogin)){
                    if(element.password===passLogin){
                        nombre=element.nombreGestor;
                        setNombreGestor(element.nombreGestor);
                    }
                }
            })

            if(nombre===null){                
                handleOpenInfo("Usuario y/o contraseña incorrectos");
            }else{
                consultarPromesas(1,nombre);
            }

        }else{
            handleOpenInfo("Favor de validar los campos de usuario y contraseña");
        }
    }



    const consultarPromesas=(indice,nombre)=>{
        servicio.consumirServiciosGET("service/promesas/consultarPromesasPP").then(
            data=>{
                if(data.code===1){
                    validarPromesasGestorPuras(data.data,indice,nombre);
                }
            }
        )
    }

    const validarPromesasGestorPuras=(promesas,indice,nombre)=>{
        let promesasGestor=[]

        promesas.forEach(function(element){
            if(element.idGestorTKM===parseInt(idLogin)){
                promesasGestor.push(element)
            }
        })
        if(indice===1){
            if(promesasGestor.length>0){
                handleOpenInfo("Bienvenid@ "+nombre);
                setLogin(true);
                setPromesas(promesasGestor);
                setMostrarTabla(false);
            }
            else{
                handleOpenInfo("Bienvenid@ "+nombre+" , no tienes promesas");
            }
        }else if(indice===2){
            setPromesas(promesasGestor);
            setMostrarTabla(false);
        }else{
            consultarXFechas(promesasGestor)
        }

    }

    //Busqueda de dia,mes y año para busqueda

    const handleOnChangeBusqDia=(event)=>{
        if(event==null){
            setFechaDiaBusq(null);
        }else{
            let fechaRecuperada=String(event);
            let fechaCompleta=fechaRecuperada.split(" ");
            setFechaDiaBusq(fechaCompleta[1]);
        }

    }

    const handleOnChangeBusqMes=(event)=>{
        if(event==null){
            setFechaMesBusq(null)
        }else{
            let fechaRecuperada=String(event);
            let fechaCompleta=fechaRecuperada.split(" ");
            setFechaMesBusq(fechaCompleta[2]);
        }


    }

    const handleOnChangeBusqYear=(event)=>{
        if(event==null){
            setFechaYearBusq(null)
        }
        else{
            let fechaRecuperada=String(event);
            let fechaCompleta=fechaRecuperada.split(" ");
            setFechaYearBusq(fechaCompleta[3]);
        }
  

    }

    const handleOnChangeBusqTipoFecha=(event,newValue)=>{
        if(newValue===null){
            setTipoFechaBusq(null)
        }
        else{
            setTipoFechaBusq(newValue.id);
        }
        
    }

    const handleClickBuscar=()=>{
        // setMostrarTabla(true);
        if(fechaDiaBusq===null&&fechaMesBusq===null&&fechaYearBusq===null&&tipoFechaBusq===null){
            consultarPromesas(2,"");
        }
        else if((fechaDiaBusq!==null||fechaMesBusq!==null||fechaYearBusq!==null)&&tipoFechaBusq===null){
            handleOpenInfo("Favor de elegir el tipo de fecha");
        }else if((fechaDiaBusq!==null||fechaMesBusq!==null||fechaYearBusq!==null)&&tipoFechaBusq!==null){
            consultarPromesas(3,"");
        }
        // obtenerPromesas();
    }

    const consultarXFechas=(promesas)=>{
        promesas.forEach(function(element){  
            if(tipoFechaBusq===1){
                tipoFecha1Busq(element)
            }else if(tipoFechaBusq===2){
                tipoFecha2Busq(element)
            }else{
                tipoFecha3Busq(element)
            }
        }) 
        mostrarPromesasTabla();
    }
    

    const tipoFecha1Busq=(promesa)=>{
        let fechaIn=promesa.fechaIngesoPP;
        diaBusq(promesa,fechaIn);
        mesBusq(promesa,fechaIn);
        yearBusq(promesa,fechaIn);
    }

    const tipoFecha2Busq=(promesa)=>{
        let fechaPago=promesa.fechaPago;
        diaBusq(promesa,fechaPago);
        mesBusq(promesa,fechaPago);
        yearBusq(promesa,fechaPago);
    }

    const tipoFecha3Busq=(promesa)=>{
        let fechaVen=promesa.fechaVencimientoPP;
        diaBusq(promesa,fechaVen);
        mesBusq(promesa,fechaVen);
        yearBusq(promesa,fechaVen);
    }

    const diaBusq=(promesa,fecha)=>{
        let diaMesYear=fecha.split("/")
        if(fechaDiaBusq!==null&&diaMesYear[0]===fechaDiaBusq){
            if(fechaMesBusq!==null&&diaMesYear[1]===fechaMesBusq&&fechaYearBusq===null){ 
                promesasPuras.push(promesa);
            }else if(fechaYearBusq!==null&&diaMesYear[2]===fechaYearBusq&&fechaMesBusq===null){
                promesasPuras.push(promesa);
            }else if((fechaMesBusq!==null&&diaMesYear[1]===fechaMesBusq)&&(fechaYearBusq!==null&&diaMesYear[2]===fechaYearBusq)){
                promesasPuras.push(promesa);
            }else if(fechaMesBusq===null&&fechaYearBusq===null){
                promesasPuras.push(promesa);
            }
        }
    }

    const mesBusq=(promesa,fecha)=>{
        let diaMesYear=fecha.split("/")
        if(fechaMesBusq!==null&&diaMesYear[1]===fechaMesBusq&&fechaDiaBusq===null){
            if(fechaYearBusq!==null&&diaMesYear[2]===fechaYearBusq){
                promesasPuras.push(promesa);
            }else if(fechaYearBusq===null&&fechaDiaBusq===null){
                promesasPuras.push(promesa);
            }
        }
    }

    const yearBusq=(promesa,fecha)=>{
        let diaMesYear=fecha.split("/")
        if(fechaYearBusq!==null&&diaMesYear[2]===fechaYearBusq&&fechaMesBusq===null&&fechaDiaBusq===null){
            promesasPuras.push(promesa);
        }
    }

    const mostrarPromesasTabla=()=>{
        if(promesasPuras.length>0){
            setPromesas(promesasPuras)
            setMostrarTabla(false);
        }else{
            setMostrarTabla(true);
            handleOpenInfo("No se encontraron cuentas con las caracteristicas mencionadas");
        }
    }

    const handleRowClick = (params) => {
        setIdAct(params.row.id);
        setFechaVencimientoPPAct(params.row.fechaVencimientoPP);
        setRecurrenciaAct(params.row.recurrencia);
        setMontoSemanalAct(params.row.montoSemanal);
        setMontoPagoAct(params.row.montoPago);
        let mensaje1="FECHA INGRESO PP: "+params.row.fechaIngesoPP;
        // let mensaje2="FECHA PAGO: "+params.row.fechaPago;
        let mensaje2="FECHA PAGO: ";
        let mensaje3="FECHA VENCIMIENTO: "+params.row.fechaVencimientoPP;
        let mensaje4="FOLIO: "+params.row.folio;
        let mensaje5="MONTO PAGO: "+params.row.montoPago;
        let mensaje6="NOMBRE DE CLIENTE: "+params.row.nombreCliente;
        let mensaje7="CLIENTE UNICO:"+params.row.clienteUnico;
        let mensaje8="TELEFONO: "+params.row.telefono;
        let mensaje9="OBSERVACIONES: "+params.row.observaciones;
        let mensaje10="WHATSAPP: "+params.row.whatsApp;
        let mensaje13="PAGO SEMANAL: "+params.row.montoSemanal
        let mensaje11="ESTATUS: ";
        let mensaje12="PAGO: ";

        let elegible1=params.row.nota;
        let elegible2=params.row.pagoFinal;
        let elegible3=params.row.fechaPago;
        
        

        handleOpen10i2e(mensaje1,mensaje2,mensaje3,mensaje4,mensaje5,mensaje6,mensaje7,mensaje8,mensaje9,mensaje10,mensaje11,mensaje12, elegible1,elegible2,elegible3,mensaje13);    
    }

    const handleOnChangeEstatus=(event)=>{
        setEstatusAct(event.target.value);
    }

    const handleOnChangePago=(event)=>{
        setPagoAct(event.target.value);
    }

    const handleOnChangeFechaPago=(event)=>{
        let fechaRecuperado=String(event)
        let preparandoFecha =fechaRecuperado.split(" ");
        setIdFechaPagoAct(preparandoFecha[1]+"/"+preparandoFecha[2]+"/"+preparandoFecha[3]);
    }

    const actualizarEstPag=()=>{
        let json=null;
        

        if(estatusAct===null&&pagoAct===null&&fechaPagoAct===null){
            handleOpenInfo("No se ha modificado ningun dato");
        }else if(estatusAct!==null&&pagoAct===null&&fechaPagoAct===null){
            json={
                "id":idAct,
                "nota":estatusAct,
                "pagoFinal":elegible210i2e,
                "fechaPago":elegible310i2e,
                "fechaVencimientoPP":fechaVencimientoPPAct,
                "recurrencia":recurrenciaAct,
                "montoPago":montoPagoAct

            }
            actualizar(json);
        }else if(estatusAct===null&&pagoAct!==null&&fechaPagoAct===null){
            json={
                "id":idAct,
                "nota":elegible110i2e,
                "pagoFinal":pagoAct,
                "fechaPago":elegible310i2e,
                "fechaVencimientoPP":fechaVencimientoPPAct,
                "recurrencia":recurrenciaAct,
                "montoPago":montoPagoAct
            }
            actualizar(json);
        }else if(estatusAct!==null&&pagoAct!==null&&fechaPagoAct===null){
            json={
                "id":idAct,
                "nota":estatusAct,
                "pagoFinal":pagoAct,
                "fechaPago":fechaPagoAct,
                "fechaVencimientoPP":fechaPagoAct,
                "recurrencia":"Seguimiento",
                "montoPago":montoPagoAct

            }
            actualizar(json);
        }else if(estatusAct!==null&&pagoAct===null&&fechaPagoAct!==null){
            json={
                "id":idAct,
                "nota":estatusAct,
                "pagoFinal":elegible210i2e,
                "fechaPago":fechaPagoAct,
                "fechaVencimientoPP":fechaPagoAct,
                "recurrencia":"Seguimiento",
                "montoPago":montoSemanalAct

            }
            actualizar(json);
        }else if(estatusAct===null&&pagoAct!==null&&fechaPagoAct!==null){
            json={
                "id":idAct,
                "nota":elegible110i2e,
                "pagoFinal":pagoAct,
                "fechaPago":fechaPagoAct,
                "fechaVencimientoPP":fechaPagoAct,
                "recurrencia":"Seguimiento",
                "montoPago":montoSemanalAct

            }
            actualizar(json);
        }else if(estatusAct!==null&&pagoAct!==null&&fechaPagoAct!==null){
            json={
                "id":idAct,
                "nota":estatusAct,
                "pagoFinal":pagoAct,
                "fechaPago":fechaPagoAct,
                "fechaVencimientoPP":fechaPagoAct,
                "recurrencia":"Seguimiento",
                "montoPago":montoSemanalAct

            }
            actualizar(json);
        }else if(estatusAct===null&&pagoAct===null&&fechaPagoAct!==null){
            json={
                "id":idAct,
                "nota":elegible110i2e,
                "pagoFinal":elegible210i2e,
                "fechaPago":fechaPagoAct,
                "fechaVencimientoPP":fechaPagoAct,
                "recurrencia":"Seguimiento",
                "montoPago":montoSemanalAct
            }

            actualizar(json);
        }

        
    }

    const actualizar=(json)=>{
        let endPoint="service/promesas/actualizarPromesasEstPag";
        servicio.consumirServicios(json,endPoint).then(
            data=>{
                if(data.code===1){
                    handleClose10i2e();
                    handleOpenInfo("Cambios actualizados correctamente");
                    handleClickBuscar();
                }else{
                    handleOpenInfo("Los cambios no se  actualizaron, favor de notificar a tu supervisor");
                }
            }
        )
    }



    const handleClickRegresasr=()=>{
        navigate("/CLTKM_FRONT/gestores/menu");
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
                        Revisar Planes de Pago o Intencion Gestores
                    </h1>
                </Grid>
            </Grid> 
            <br/>
            <Grid container spacing={1}>
                <Grid item xl={4} lg={4} md={4} sm={4} hidden={login} />
                <Grid item xl={4} lg={4} md={4} sm={4} style={{textAlign:'center'}} hidden={login}>
                    <TextField 
                        id="id" 
                        label="Id TKM" 
                        type="number"
                        onChange={handleOnChangeIdTKM}
                    />
                    <br/><br/><br/>
                    <FormControl sx={{ m: 1, width: '25' }} variant="outlined">
                        <InputLabel 
                            htmlFor="outlined-adornment-password"
                        >
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <IconButton
                                onClick={handleClickShowPassword}                              
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                        
                            }
                            label="Password"
                            onChange={handleOnChangePassTKM}
                        />
                    </FormControl>
                    <br/><br/><br/>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        style={{height:"50px",width:"200px"}}                        
                        onClick={()=>{validarLogin()}}

                    >
                        Ingresar
                    </Button>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4} hidden={login} /> 


                <Grid item xl={12} lg={12} md={12} sm={12} hidden={!login} style={{textAlign:'center'}}>
                    <p><strong>NOMBRE: </strong>{nombreGestor} &nbsp;&nbsp;&nbsp; <strong>ID: </strong>{idLogin}</p>       
                </Grid>
                <br/> 
                <Grid item xl={1} lg={1} md={1} sm={1} hidden={!login}/>
                <Grid item xl={2} lg={2} md={2} sm={2} hidden={!login}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label={'Dia'} views={['day']} onChange={handleOnChangeBusqDia}/>
                    </LocalizationProvider>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} hidden={!login}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label={'Mes'} views={['month']} onChange={handleOnChangeBusqMes}/>
                    </LocalizationProvider>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} hidden={!login}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label={'Año'} views={['year']} onChange={handleOnChangeBusqYear}/>
                    </LocalizationProvider>
                </Grid>  
                <Grid item xl={2} lg={2} md={2} sm={2} hidden={!login}>
                    <Autocomplete 
                        id="seleccionFecha"                                        
                        options={opcionesFecha}
                        getOptionLabel={(option) => option.valor}
                        renderInput={(params) => <TextField {...params} label="Tipo de Fecha" variant="outlined" />}
                        onChange={handleOnChangeBusqTipoFecha}
                    />
      
                </Grid>
                

                <Grid item xl={2} lg={2} md={2} sm={2} hidden={!login}>
                     <Button
                        variant="contained"
                        color="success"
                        size="large"
                        style={{height:"50px",width:"200px"}}
                        // startIcon={<DownloadIcon style={{height:"40px",width:"50px"}} />}
                        onClick={()=>{handleClickBuscar()}}

                    >
                        Buscar Informacion                 
                    </Button>
                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={1} hidden={!login}/>


            </Grid>
            <br/>
            <Grid container spacing={1}>
            <Grid item xl={.5} lg={.5} md={.5} sm={.5} hidden={mostarTabla}></Grid>
                <Grid item xl={11} lg={11} md={11} sm={11} hidden={mostarTabla}>
                    <DataGrid
                        id="tablaDatosPP"
                        rows={promesas}
                        columns={columnas}
                        pageZise={5}
                        onRowClick={handleRowClick} 
                        initialState={{
                            pagination: {
                              paginationModel: { page: 0, pageSize: 5 },
                            },
                          }}
                          pageSizeOptions={[5, 10]}
              
                    />
                </Grid>
                <Grid item xl={.5} lg={.5} md={.5} sm={.5} hidden={mostarTabla}></Grid>
            
            </Grid>

            <Grid container spacing={1}>                
                <Grid item xl={1} lg={1} md={1} sm={1} style={{textAlign:'center'}}>
                    <ArrowBackIcon
                        style={{height:"80px",width:"200px"}}
                        onClick={()=>{handleClickRegresasr()}}
                    />
                </Grid>
                <Grid item xl={11} lg={11} md={11} sm={11}/>

               
            </Grid>


            <div>
                <ModalInfo open={openModalInfo} handleClose={handleCloseInfo} mensaje={mensajeModalInfo} />
                <Modal10i2e 
                    open={openModal10i2e}
                    handleClose={handleClose10i2e}
                    mensaje1={mensaje110i2e}
                    mensaje2={mensaje210i2e}
                    mensaje3={mensaje310i2e}
                    mensaje4={mensaje410i2e}
                    mensaje5={mensaje510i2e}
                    mensaje6={mensaje610i2e}
                    mensaje7={mensaje710i2e}
                    mensaje8={mensaje810i2e}
                    mensaje9={mensaje910i2e}
                    mensaje10={mensaje1010i2e}
                    mensaje11={mensaje1110i2e}
                    mensaje12={mensaje1210i2e}
                    mensaje13={mensaje1310i2e}
                    valor1={elegible110i2e}
                    valor2={elegible210i2e}
                    valor3={elegible310i2e}
                    opcion={opcion112i2e}
                    handleOnChangeValorCuadro1={handleOnChangeEstatus}
                    handleOnChangeValorCuadro2={handleOnChangePago}
                    handleOnChangeValorFecha={handleOnChangeFechaPago}
                    handleCloseBtn1={actualizarEstPag}
                />
            </div>
        </div>
    )

}