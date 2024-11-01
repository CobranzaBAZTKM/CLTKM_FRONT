import React from "react";
import { useState } from "react";
import {TextField, Button, Grid,Autocomplete,Input,InputLabel,FormControl,Link} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {ModalEspera,ModalInfo,ModalSiNo,ModalSiNo2CuadroTextPass} from '../../services/modals';
import Servicios from '../../services/servicios';
import { useNavigate  } from "react-router-dom"
import { IMaskInput } from 'react-imask';
import dayjs from 'dayjs';
// import dayjs, { Dayjs } from 'dayjs';

const servicio=new Servicios();

// const siNo=[
//     {
//         id:1,
//         valor:"Si"
//     },
//     {
//         id:0,
//         valor:"No"
//     }

// ]

const tipoLlamadaOpcion=[
    {
        id:"En",
        valor:"Entrada"
    },
    {
        id:"Sa",
        valor:"Salida"
    },
    {
        id:"Bla",
        valor:"Blaster"
    },
    {
        id:"Sms",
        valor:"Mensaje"
    },
]

export default class InsertarPlanes extends React.Component{
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
        return (
            <div>
                <ColocarPromesas
                    gestores={this.state.gestores}
                />
            </div>
        )
    }

}


const ColocarPromesas=(props)=>{

    const navigate = useNavigate();

    const hoyDate = dayjs().add(0, 'day');
    const dosDiasDate=dayjs().add(2, 'day');
    // const tresDiasDate=dayjs().add(3, 'day');
    const [fechaPago, setFechaPago]=useState(null);
    // const [fechaVencePlan, setFechaVencePlan]=useState(null);
    const [folio, setFolio]=useState(null);
    const [montoPago, setMontoPago]=useState(null);
    const [nombreCliente, setNombreCliente]=useState(null);
    const [clienteUnico, setClienteUnico]=useState(null);
    const [telefono, setTelefono]=useState(null);
    const [idGestorTKM, setIdGestorTKM]=useState(null);
    const [idGestorSCL, setIdGestorSCL]=useState(null);
    const [nombreGestor, setNombreGestor]=useState(null);
    const [turnoGestor, setTurnoGestor]=useState(null);
    const [idGestorSCLVIP, setIdGestorSCLVIP]=useState(null);
    const [observaciones, setObservaciones]=useState(null);
    // const [conWhatsApp, setConWhatsApp]=useState(1);
    const [conWhatsApp]=useState(1);
    const [adicional, setAdicional]=useState("");
    const [tipoLlamada,setTipoLlamada]=useState(null);
    const [tipoCartera,setTipoCartera]=useState(null);
    const [montoSemanal,setMontoSemanal]=useState(null);

    const [clienteUnicoInser,setClienteUnicoInser]=useState(null);

    const [banderaCu,setBanderaCu]=useState(0);
    const [tels, setTels]=useState([]);
    const [banderaTel, setBanderaTel]=useState(false);
    const [telAutoEle,setTelAutoEle]=useState(null);

    const [idSuperAut, setIdSuperAut]=useState("0");
    const [passSuperAut,setPassSuperAut]=useState(null);

    const [openModal, setOpenModal] = React.useState(false);
    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const [mensajeModalInfo, setMensajeModalInfo]=useState(null);

    const [openModalSiNo, setOpenModalSiNo]= React.useState(false);
    const [mensajeModalSiNo,setMensajeModalSiNo]=useState(null);

    const [openModelSiNoCuPas, setOpenModelSiNoCuPas]= React.useState(false);
    const [mensajeModalSiNoCuaPas, setMensajeModalSiNoCuaPas]= React.useState(false);

    
    const handleOpen = () => {
        setOpenModal(true);
    };
    const handleClose = () => {
        setOpenModal(false);
    };

    const handleOpenInfo = (mensaje) => {
        setMensajeModalInfo(mensaje);
        setOpenModalInfo(true);
    };
    const handleCloseInfo = () => {
        setOpenModalInfo(false);
    };

    const handleOpenSiNo=(mensaje)=>{
        setMensajeModalSiNo(mensaje);
        setOpenModalSiNo(true);
    }

    const handleCloseSiNo=()=>{
        setOpenModalSiNo(false);
    }

    const handleOpenSiNoCuaPass=(mensaje)=>{
        setMensajeModalSiNoCuaPas(mensaje);
        setOpenModelSiNoCuPas(true);
    }

    const handleCloseSiNoCuaPass=()=>{
        setOpenModelSiNoCuPas(false);
    }


    
    // const handleOnChangeFechaIngresoPago=(event)=>{
    //     let fechaRecuperado=String(event)
    //     let preparandoFecha =fechaRecuperado.split(" ");
    //     setFechaIngPP(preparandoFecha[1]+"/"+preparandoFecha[2]+"/"+preparandoFecha[3])
    // }

    const handleOnChangeFechaPago=(event)=>{
        let fechaRecuperado=String(event)
        let preparandoFecha =fechaRecuperado.split(" ");
        setFechaPago(preparandoFecha[1]+"/"+preparandoFecha[2]+"/"+preparandoFecha[3])
    }
    
    // const handleOnChangeFechaVencePlan=(event)=>{
    //     let fechaRecuperado=String(event)
    //     let preparandoFecha =fechaRecuperado.split(" ");
    //     setFechaVencePlan(preparandoFecha[1]+"/"+preparandoFecha[2]+"/"+preparandoFecha[3])
    // }

    const handleOnChangeFolio=(event)=>{
        setFolio(event.target.value);
    }

    const handleOnChangeMontoPago=(event)=>{
        setMontoPago(event.target.value);
    }

    const handleOnChangeMontoSemanal=(event)=>{
        setMontoSemanal(event.target.value);
    }

    const handleOnChangeNombreCliente=(event)=>{
        setNombreCliente(event.target.value);
    }

    const handleOnChangeClienteUnico=(event)=>{
        setClienteUnico(event.target.value);
    }

    const handleOnChangeTelefono=(event,newValue)=>{     
        if(newValue===null){
            setTelefono(null);
            setTelAutoEle(null);
        }else{
            setTelefono(newValue.telefonos);
            setTelAutoEle(newValue.telefonos);
        }
    }

    const handleOnChangeTelefono2=(event)=>{
        setTelefono(event.target.value);
    }
    

    const handleOnChangeGestor=(event,newValue)=>{
        if(newValue===null){
            setIdGestorTKM(null);
            setIdGestorSCL(null);
            setNombreGestor(null);
            setTurnoGestor(null);
            setIdGestorSCLVIP(null);
        }
        else{
            setIdGestorTKM(newValue.idTkm)
            setIdGestorSCL(newValue.idGestor);
            setNombreGestor(newValue.nombreGestor);
            setTurnoGestor(newValue.turno);
            setIdGestorSCLVIP(newValue.idGestorSCLVIP);
        }
    }

    const handleOnChangeObservaciones=(event)=>{
        setObservaciones(event.target.value);
    }

    // const handleOnChangeConWhatsApp=(event)=>{
    //     setConWhatsApp(event.target.value);        
    // }

    // const handleOnChangeAdicional=(event)=>{
    //     setAdicional(event.target.value);
    // }

    const handleOnChangeTipoLlamada=(event,newValue)=>{
        if(newValue===null){
            setTipoLlamada(null);
        }else{
            setTipoLlamada(newValue.id)
        }
    }

    const handleOnChangeTipoCartera=(event,newValue)=>{
        if(newValue===null){
            setTipoCartera(null);
        }else{
            setTipoCartera(newValue.valor);
        }
    }
    


    const handleClickGuardar=()=>{
        handleOpen();
        if(String(telefono).length!==10){
            handleClose();
            handleOpenInfo("Favor de revisar que el campo telefono cuente con 10 digitos");
        // }else if(fechaIngPP===null||fechaPago===null||fechaVencePlan===null||folio===null||montoPago===null||nombreCliente===null||clienteUnico===null||telefono===null||conWhatsApp===null||tipoLlamada===null){
        // }else if(fechaPago===null||fechaVencePlan===null||folio===null||montoPago===null||nombreCliente===null||clienteUnico===null||telefono===null||conWhatsApp===null||tipoLlamada===null){ 
        }else if(fechaPago===null||folio===null||montoPago===null||nombreCliente===null||clienteUnico===null||telefono===null||conWhatsApp===null||tipoLlamada===null||tipoCartera===null||montoSemanal===null){       
            handleClose();
            handleOpenInfo("Favor de revisar que todos los campos esten llenos correctamente");
        }

        else{
            let valHoy = dayjs().add(0, 'day').format("DD/MMM/YYYY");
            let valD1=dayjs().add(1, 'day').format("DD/MMM/YYYY");
            let valD2=dayjs().add(2, 'day').format("DD/MMM/YYYY");
            // let valD3=dayjs().add(3, 'day').format("DD/MMM/YYYY");

            if(fechaPago===valHoy||fechaPago===valD1||fechaPago===valD2){
            // if(fechaPago===valHoy||fechaPago===valD1||fechaPago===valD2||fechaPago===valD3){
                // if(parseFloat(montoPago)>=800||idGestorTKM===3||idGestorTKM===7||idGestorTKM===12||idGestorTKM===14||idGestorTKM===15||idGestorTKM===16||idGestorTKM===19||idGestorTKM===20||idGestorTKM===40||idGestorTKM===46){
                if(parseFloat(montoPago)>=800){
                    // let cuDiv=clienteUnico.split("-");
                    // let sucursalCU=cuDiv[1].split("");

                    // if(sucursalCU[0]!=="0"&&sucursalCU[0]!==0){
                    //     handleClose();
                    //     handleOpenInfo("Favor de revisar que el Cliente Unico tenga el formato correcto");
                    // }else{
                        handleClose();
                        handleOpenSiNo("¿Esta seguro de insertar la Promesa?");
                    // }
                }else{
                    handleClose();
                    handleOpenInfo("La promesa no puede ser menor a 800 pesos");
                }
            }else{
                handleClose();
                // handleOpenInfo("Favor de revisar la fecha de pago, no puede ser mayor al "+valD3);
                handleOpenInfo("Favor de revisar la fecha de pago, no puede ser mayor al "+valD2);
            }


        }

        
    }

    const handleOnClickInsertarPromesa=()=>{ 
        let cuDivi=clienteUnico.split("-");
        let sucursalCU="0"+cuDivi[1];
        let folioCU=cuDivi.length===3?cuDivi[2]:cuDivi[2]+cuDivi[3]
        let paisCanalCUDiv=cuDivi[0].split("");
        let paisCU=paisCanalCUDiv[1];
        let canalCU=paisCanalCUDiv[2]==="0"?paisCanalCUDiv[3]:paisCanalCUDiv[2]+paisCanalCUDiv[3];

        let clienteUnicoCom=paisCU+"-"+canalCU+"-"+sucursalCU+"-"+folioCU;
        setClienteUnicoInser(clienteUnicoCom);


        servicio.consumirServiciosGET("service/promesas/consultarPromesasPP").then(
            data=>{
                if(data.code===1){
                    let coincidencia=0;
                    data.data.forEach(function(element){
                        console.log(element)
                        if(element.clienteUnico===clienteUnicoCom){
                            coincidencia=1;
                        }
                    })

                    if(coincidencia===0){
                        insertarPromesa(clienteUnicoCom)
                    }else{
                        handleCloseSiNo();
                        handleOpenSiNoCuaPass("Se encontra una similitud en Cliente Unico, solicita autorización de tu Supervisor para insertar promesa")
                    }

                }else{
                    handleCloseSiNo();
                    handleOpenInfo("Ocurrio algo inesperado, favor de notificar a tu supervisor(a)");
                }
            }
        )
    }

    const validarSupervisor=()=>{


        servicio.consumirServiciosGET("service/gestores/consultarGestoresTKM").then(
            data=>{
                if(data.code===1){
                    let supervisor=0;
                    data.data.forEach(function(element){
                        if(element.puesto===1||element.puesto===2){
                            if(element.idTkm===parseInt(idSuperAut)){
                                if(element.password===passSuperAut){
                                    if(element.estado===1){
                                        supervisor=1;
                                    }
                                }
                            } 
                        }

                    })

                    if(supervisor===1){
                        insertarPromesa(clienteUnicoInser);
                        handleCloseSiNoCuaPass();
                    }else{
                        handleOpenInfo("Favor de validar tu usario y contraseña");
                    }
                }
            }
        )
    }


    const insertarPromesa=(clienteUnico)=>{
        let fechaIngreso=dayjs().format("DD/MMM/YYYY");
        let endPoint="service/promesas/insertarPromesas";
        let json={
            "fechaIngesoPP":fechaIngreso,
            "fechaPago":fechaPago,
            "fechaVencimientoPP":fechaPago,
            "folio":folio,
            "montoPago":montoPago,
            "nombreCliente":nombreCliente,
            "clienteUnico":clienteUnico,
            "telefono":telefono,
            "idGestorSCL":idGestorSCL,
            "nombreGestor":nombreGestor,
            "observaciones":observaciones,
            // "whatsApp":conWhatsApp,
            "whatsApp":0,
            "nota":adicional,
            "asignado":0,
            "idGestorTKM":parseInt(idGestorTKM),
            "inserto":parseInt(idGestorTKM),
            "tipoLlamada":tipoLlamada,
            "pagoFinal":0,
            "turnoGestor":turnoGestor,
            "idAutorizo":parseInt(idSuperAut),
            "tipoCartera":tipoCartera,
            "idGestorSCLVIP":idGestorSCLVIP,
            "montoInicial":montoPago,
            "montoSemanal":montoSemanal,
            "recurrencia":"Nuevo"
        }

        servicio.consumirServicios(json,endPoint).then(
            data=>{
                if(data.code===1){
                    handleCloseSiNo();
                    handleOpenInfo("Registro insertado Correctamente");
                    document.getElementById("folio").value="";
                    document.getElementById("montoPago").value="";
                    document.getElementById("nombreCliente").value="";
                    document.getElementById("clienteUnico").value="";
                    document.getElementById("telefono2").value="";
                    document.getElementById("observaciones").value="";
                    // document.getElementById("whatsApp").value="";
                    // document.getElementById("adicional").value="";
                    document.getElementById("tipoLlamadaAutocomplete").value="";
                    setBanderaCu(0);
                    setObservaciones(null);
                    setAdicional(null);
                    setTelefono(null);
                    setMontoPago(null);
                    setBanderaTel(false);

                }else{
                    handleCloseSiNo();
                    handleOpenInfo("No se pudo insertar el registo, favor de notificar a tu supervisor(a)");
                }
            }
        )
    }

    const handleOnChangeIdAutoriza=(event)=>{
        setIdSuperAut(event.target.value);

    }

    const handleOnChangePasswAutoriza=(event)=>{
        setPassSuperAut(event.target.value);
    }

    const handleClickBuscarTitular=()=>{
        handleOpen();
        if(clienteUnico!==null&&clienteUnico!==""){
            let separarCU=clienteUnico.split("-")
            if(separarCU.length=3){
                let paisCanal=separarCU[0].split("");
                let sucCompl=separarCU[1].split("");
                let folio=separarCU[2];

                let pais=paisCanal[1];
                let canal=paisCanal[2]==="0"?paisCanal[3]:paisCanal[2]+paisCanal[3];
                let sucursal=sucCompl[0]==="0"?sucCompl[1]+sucCompl[2]+sucCompl[3]:sucCompl[0]+sucCompl[1]+sucCompl[2]+sucCompl[3];
                let cu=pais+"-"+canal+"-"+sucursal+"-"+folio;


                servicio.consultarServicioGETLlamadas("service/carteraLocal/consultarClienteUnico/"+cu).then(
                    data=>{
                        if(data.code===1){
                            if(data.data.cliente_UNICO!==null){                                
                                setNombreCliente(data.data.nombre_CTE);
                                setTipoCartera(data.data.tipocarteratkm);
                                let telefonos=[];
                                let tel1={
                                    "valor":1,
                                    "telefonos":data.data.telefono1
                                }
                                let tel2={
                                    "valor":2,
                                    "telefonos":data.data.telefono2
                                }
                                let tel3={
                                    "valor":3,
                                    "telefonos":data.data.telefono3
                                }
                                let tel4={
                                    "valor":4,
                                    "telefonos":data.data.telefono4
                                }
                                telefonos.push(tel1);
                                telefonos.push(tel2);
                                telefonos.push(tel3);
                                telefonos.push(tel4);
                                setTels(telefonos);
                                handleClose();
                                setBanderaCu(1);
                            }else{
                                handleClose();
                                handleOpenInfo("Favor de validar el Cliente Unico, no se obtuvieron datos");
                            }
                        }else{
                            handleClose();
                            handleOpenInfo("Ocurrio algo inesperado, favor de avisar al supervisor");
                        }
                    }
                )
            }else{
                handleClose();
                handleOpenInfo("Favor de validar el Cliente Unico, no se encontraron resultados");  
            }
        }else{
            handleClose();
            handleOpenInfo("Favor de validar el Cliente Unico, no se encontraron resultados");        
        }
    }

    const handleClickLimpieza=()=>{
        setBanderaCu(0);
        document.getElementById("folio").value="";
        document.getElementById("montoPago").value="";
        document.getElementById("nombreCliente").value="";
        document.getElementById("clienteUnico").value="";
        document.getElementById("telefono2").value="";
        document.getElementById("observaciones").value="";
        // document.getElementById("whatsApp").value="";
        // document.getElementById("adicional").value="";
        document.getElementById("tipoLlamadaAutocomplete").value="";
        setObservaciones(null);
        setAdicional(null);
        setTelefono(null);
        setMontoPago(null);
        setBanderaTel(false);
    }

    const bandTel=()=>{
        if(banderaTel){
            document.getElementById("telefono1A").value=null;
            setTelefono(telAutoEle);
            setBanderaTel(false);
        }else{
            document.getElementById("telefono2").value=null;
            setTelefono(null);
            setBanderaTel(true);
        }
    }

    const handleClickRegresasr=()=>{
        
        navigate("/CLTKM_FRONT/gestores/menu");
    }

    return(
        <div>
            
            <Grid container spacing={1}>
                <Grid item xl={1} lg={1} md={1} sm={1}>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        style={{height:"50px",width:"200px"}}                        
                        onClick={()=>{handleClickRegresasr()}}

                    >
                        Menu               
                    </Button>
                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={1}/>
                <Grid item xl={8} lg={8} md={8} sm={8} style={{textAlign:'center'}}>
                    <h1 style={{
                        fontFamily: 'sans-serif',
                        fontSize: '35px',
                        fontWeight: '400', 
                        color: '#02761b',
                        
                    }}>
                        Insertar Planes de Pago o Intencion
                    </h1>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2}/>
            </Grid>
            <br/>

            <Grid container spacing={1}>
                <Grid item xl={1} lg={1} md={1} sm={1}/>

                <Grid item xl={8} lg={8} md={8} sm={8}>
                    {/* <Grid container spacing={1}>
                        <Grid item xl={2} lg={2} md={2} sm={2}>
                            <p><strong>FECHA QUE SE INGRESO PP</strong></p>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4}>                           
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker                       
                                    label="Selecciona Fecha" 
                                    // defaultValue={today}
                                    // shouldDisableMonth={isInCurrentMonth}
                                    // onChange={(dateIngPP)=>setFechaIngPP(dateIngPP)}
                                    onChange={handleOnChangeFechaIngresoPago}
                                />
                            </LocalizationProvider>date
                        </Grid>  
                        <Grid item xl={6} lg={6} md={6} sm={6}></Grid>
                    </Grid>                  
                    <br/> */}
                    <Grid container spacing={1}>
                        <Grid item xl={2} lg={2} md={2} sm={2}>
                            <p><strong>CLIENTE UNICO</strong></p>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4}>
                            {/* <TextField 
                                id="clienteUnico" 
                                label="Cliente Unico" 
                                onChange={handleOnChangeClienteUnico}    
                            /> */}
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="formatted-text-mask-input">Cliente Unico</InputLabel>
                                <Input                                                                   
                                    onChange={handleOnChangeClienteUnico}                                   
                                    id="clienteUnico"
                                    inputComponent={TextMaskCustom}
                                />
                            </FormControl>
                        </Grid>  
                        <Grid item xl={6} lg={6} md={6} sm={6}></Grid>
                    </Grid> 
                    <br/>
                    {banderaCu===0?(
                        <>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12} md={12} sm={12} textAlign={'left'}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    size="large"
                                    style={{height:"50px",width:"200px"}}
                                    // startIcon={<DownloadIcon style={{height:"40px",width:"50px"}} />}
                                    onClick={()=>{handleClickBuscarTitular()}}
                                >
                                    Buscar datos      
                                </Button>
                            </Grid>               
                        </Grid>
                        <br/>
                        </>
                        ):(
                        <>
                        <Grid container spacing={1}>
                            <Grid item xl={2} lg={2} md={2} sm={2}>
                                <p><strong>FECHA DE PAGO</strong></p>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker 
                                        label="Selecciona Fecha" 
                                        minDate={hoyDate}
                                        // maxDate={tresDiasDate}
                                        maxDate={dosDiasDate}
                                        onChange={handleOnChangeFechaPago}
                                        // onChange={(datePago)=>setFechaPago(datePago)}
                                    />
                                </LocalizationProvider>
                            </Grid>  
                            <Grid item xl={6} lg={6} md={6} sm={6}></Grid>
                        </Grid>                  
                        <br/>
                        <Grid container spacing={1}>
                            <Grid item xl={2} lg={2} md={2} sm={2}>
                                <p><strong>FOLIO</strong></p>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4}>
                                <TextField
                                    id="folio"
                                    label="Folio" 
                                    onChange={handleOnChangeFolio}
                                />
                            </Grid>  
                            <Grid item xl={6} lg={6} md={6} sm={6}></Grid>
                        </Grid>  
                        <br/>
                        <Grid container spacing={1}>
                            <Grid item xl={2} lg={2} md={2} sm={2}>
                                <p><strong>MONTO INICIAL</strong></p>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4}>
                                <TextField 
                                    id="montoPago" 
                                    label="Monto Pago"
                                    type="number"
                                    onChange={handleOnChangeMontoPago}
                                />
                            </Grid>  
                            <Grid item xl={6} lg={6} md={6} sm={6}></Grid>
                        </Grid> 
                        <br/>
                        <Grid container spacing={1}>
                            <Grid item xl={2} lg={2} md={2} sm={2}>
                                <p><strong>MONTO SEMANAL</strong></p>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4}>
                                <TextField 
                                    id="montoSemanal" 
                                    label="Monto Semanal"
                                    type="number"
                                    onChange={handleOnChangeMontoSemanal}
                                />
                            </Grid>  
                            <Grid item xl={6} lg={6} md={6} sm={6}></Grid>
                        </Grid> 
                        <br/>
                        <Grid container spacing={1}>
                            <Grid item xl={2} lg={2} md={2} sm={2}>
                                <p><strong>NOMBRE DEL CLIENTE</strong></p>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4}>
                                <TextField 
                                    id="nombreCliente" 
                                    label="Nombre del Cliente"  
                                    defaultValue={nombreCliente}
                                    style={{width:"300px"}}
                                    disabled
                                    // onChange={handleOnChangeNombreCliente}
                                />
                            </Grid>  
                            <Grid item xl={6} lg={6} md={6} sm={6}></Grid>
                        </Grid>        
                        <br/>                    
                        <Grid container spacing={1}>
                            <Grid item xl={2} lg={2} md={2} sm={2}>
                                <p><strong>TELEFONO A 10 DIGITOS</strong></p>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} hidden={banderaTel}>
                                <Autocomplete 
                                    id="telefono1A"
                                    options={tels}
                                    getOptionLabel={(option) => option.telefonos}                                    
                                    renderInput={(params) => <TextField {...params} label="Telefono" variant="outlined" />}
                                    onChange={handleOnChangeTelefono}
                                />
                                <Link href="#" onClick={bandTel}>Colocar telefono de forma manual</Link>                                                                            
                            </Grid>  
                            <Grid item xl={4} lg={4} md={4} sm={4} hidden={!banderaTel}>
                                <TextField 
                                    id="telefono2" 
                                    label="Telefono" 
                                    type="number"
                                    onChange={handleOnChangeTelefono2}
                                />
                                <br/>
                                <Link href="#" onClick={bandTel}>Elegir Telefono</Link>
                            </Grid> 
                            <Grid item xl={6} lg={6} md={6} sm={6}></Grid>
                        </Grid> 
                        <br/>
                        <Grid container spacing={1}>
                            <Grid item xl={2} lg={2} md={2} sm={2}>
                                <p><strong>GESTOR</strong></p>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4}>
                                <Autocomplete 
                                    id="Gestor"          
                                    options={props.gestores}
                                    getOptionLabel={(option) => option.nombreGestor}
                                    renderInput={(params) => <TextField {...params} label="Gestor" variant="outlined" />}
                                    onChange={handleOnChangeGestor}
                                />
                            </Grid>  
                            <Grid item xl={6} lg={6} md={6} sm={6}></Grid>
                        </Grid>  
                        <br/>
                        <Grid container spacing={1}>
                            <Grid item xl={2} lg={2} md={2} sm={2}>
                                <p><strong>OBSERVACIONES</strong></p>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4}>
                                <TextField 
                                    id="observaciones" 
                                    label="Observaciones" 
                                    onChange={handleOnChangeObservaciones}
                                />
                            </Grid>  
                            <Grid item xl={6} lg={6} md={6} sm={6}></Grid>
                        </Grid>
                        <br/>
                        
                        <Grid container spacing={1}>
                            <Grid item xl={2} lg={2} md={2} sm={2}>
                                <p><strong>TIPO LLAMADA</strong></p>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4}>
                                <Autocomplete 
                                    id="tipoLlamadaAutocomplete"          
                                    options={tipoLlamadaOpcion}
                                    getOptionLabel={(option) => option.valor}
                                    renderInput={(params) => <TextField {...params} label="Tipo Llamada" variant="outlined" />}
                                    onChange={handleOnChangeTipoLlamada}
                                />
                            </Grid>  
                            <Grid item xl={6} lg={6} md={6} sm={6}></Grid>
                        </Grid>  
                        <br/>
                        <Grid container spacing={1}>
                            <Grid item xl={2} lg={2} md={2} sm={2}>
                                <p><strong>TIPO CARTERA</strong></p>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4}>
                                {/* <Autocomplete 
                                    id="tipoCarteraAutocomplete"          
                                    options={tipoCarteraOpcion}
                                    getOptionLabel={(option) => option.texto}
                                    renderInput={(params) => <TextField {...params} label="Tipo Cartera" variant="outlined" />}
                                    onChange={handleOnChangeTipoCartera}
                                /> */}
                                <TextField 
                                    id="tipoCartera" 
                                    label="Tipo Cartera"  
                                    defaultValue={tipoCartera}
                                    disabled
                                    // onChange={handleOnChangeNombreCliente}
                                />
                            </Grid>  
                            <Grid item xl={6} lg={6} md={6} sm={6}></Grid>
                        </Grid>  
                        <br/>
                        </>
                        )
                    }

                    {/* <br/>
                    <Grid container spacing={1}>
                        <Grid item xl={2} lg={2} md={2} sm={2}>
                            <p><strong>FECHA QUE VENCE EL PLAN</strong></p>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                    disablePast
                                    label="Selecciona Fecha" 
                                    onChange={handleOnChangeFechaVencePlan}
                                    //onChange={(dateVencePP)=>setFechaVencePlan(dateVencePP)}
                                />
                            </LocalizationProvider>
                        </Grid>  
                        <Grid item xl={6} lg={6} md={6} sm={6}></Grid>
                    </Grid>  */}
                    {/* <Grid container spacing={1}>
                        <Grid item xl={2} lg={2} md={2} sm={2}>
                            <p><strong>CON WHATSAPP</strong></p>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4}>
                            <TextField 
                                id="whatsApp" 
                                label="WhatsApp"
                                style={{width:"222px"}}
                                select
                                SelectProps={{
                                    native: true,
                                }}
                                onChange={handleOnChangeConWhatsApp}
                            >
                                {siNo.map((option)=>(
                                    <option key={option.id} value={option.id}>
                                        {option.valor}
                                    </option>
                                ))}

                            </TextField>
                        </Grid>  
                        <Grid item xl={6} lg={6} md={6} sm={6}></Grid>
                    </Grid>
                    <br/> */}
                    {/* <Grid container spacing={1}>
                        <Grid item xl={2} lg={2} md={2} sm={2}>
                            <p><strong>ADICIONAL</strong></p>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4}>
                            <TextField 
                                id="adicional" 
                                label="Adicional" 
                                onChange={handleOnChangeAdicional}
                            />
                        </Grid>  
                        <Grid item xl={6} lg={6} md={6} sm={6}></Grid>
                    </Grid>
                    <br/> */}                  
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2}/>
            </Grid>


            {banderaCu!==0?(<>
                <Grid container spacing={1}>
                    <Grid item xl={1} lg={1} md={1} sm={1}/>
                    <Grid item xl={.5} lg={.5} md={.5} sm={.5} textAlign={'center'}>
                        <Button
                            variant="contained"
                            color="warning"
                            size="large"
                            style={{height:"50px",width:"200px"}}
                            // startIcon={<DownloadIcon style={{height:"40px",width:"50px"}} />}
                            onClick={()=>{handleClickLimpieza()}}
                        >
                            Limpiar Datos                 
                        </Button>
                    </Grid>
                    <Grid item xl={3.5} lg={3.5} md={3.5} sm={3.5}/>
                    <Grid item xl={2} lg={2} md={2} sm={2} textAlign={'center'}>
                        <Button
                            variant="contained"
                            color="success"
                            size="large"
                            style={{height:"50px",width:"200px"}}
                            // startIcon={<DownloadIcon style={{height:"40px",width:"50px"}} />}
                            onClick={()=>{handleClickGuardar()}}

                        >
                            Guardar Informacion                 
                        </Button>
                    
                    </Grid> 
                    <Grid item xl={5} lg={5} md={5} sm={5}/>              
                </Grid>
                </>
                ):(<></>)
            }
            <br/><br/>

            <div>
                <ModalEspera open={openModal} handleClose={handleClose} />
                <ModalInfo open={openModalInfo} handleClose={handleCloseInfo} mensaje={mensajeModalInfo} />
                <ModalSiNo open={openModalSiNo} handleClose={handleCloseSiNo} mensaje={mensajeModalSiNo} handleCloseSi={handleOnClickInsertarPromesa} />
                <ModalSiNo2CuadroTextPass
                    open={openModelSiNoCuPas}
                    handleClose={handleCloseSiNoCuaPass}
                    mensaje={mensajeModalSiNoCuaPas}
                    encabezadoCuadroText={"Id Supervisor"}
                    handleOnChangeValorCuadro={handleOnChangeIdAutoriza}
                    encabezadoCuadroPass={"Contraseña"}
                    handleOnChangeValorPass={handleOnChangePasswAutoriza}
                    handleCloseSi={validarSupervisor}
                />
            </div>

            {/* className="bordeTarjeta" style={{textAlign:'center'}} */}

        </div>
    )
}


const TextMaskCustom = (props) => {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="0000-0000-0000000"
        definitions={{
          "#": /[1-9]/,
        }}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  };