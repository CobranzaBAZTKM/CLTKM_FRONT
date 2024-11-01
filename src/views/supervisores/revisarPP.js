import React from "react";
import { useState } from "react";
import "../../assests/estilos.css"
import {TextField, Button, Grid, Autocomplete, FormControl,InputLabel,OutlinedInput,IconButton} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DataGrid } from "@mui/x-data-grid";
import DownloadIcon from '@mui/icons-material/Download';
import Servicios from '../../services/servicios';
import {ModalEspera,ModalInfo,Modal6Infos4Botones, ModalSiNo,Modal13Actualizacines,ModalSiNoCuadroText} from '../../services/modals';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate  } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DescargaExcel from "../descargarExcel";

const servicio=new Servicios();
const descargarExcel=new DescargaExcel();


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
        valor: "Fecha de Ultimo Pago"
    }
]

const opcionesTurno=[
    {
        id:"M",
        valor:"Matutino"
    },
    {
        id:"V",
        valor:"Vespertino"
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
        headerName: "Fecha de Ultimo Pago",
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
        field:"nombreGestor",
        headerName: "Gestor",
        width:200,
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
        field:"tipoLlamada",
        headerName: "Tipo Llamada",
        width:150,
        editable:false,
    },
    {
        field:"asignado",
        headerName: "Asignado",
        width:150,
        editable:false,
    },
    {
        field:"gestion1",
        headerName: "Gestion 1",
        width:200,
        editable:false,
    },
    {
        field:"gestion2",
        headerName: "Gestion 2",
        width:200,
        editable:false,
    },
    {
        field:"gestion3",
        headerName: "Gestion 3",
        width:200,
        editable:false,
    },
    {
        field:"tipoCartera",
        headerName: "Tipo Cartera",
        width:200,
        editable:false,
    },
    {
        field:"recurrencia",
        headerName: "Recurrencia",
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
        field:"montoSemanal",
        headerName: "Pago Semanal",
        width:150,
        editable:false,
    },


]

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
        valor:"Abandonados",
    },
    {
        id:6,
        valor:"Implant",
    },
    {
        id:7,
        valor:"TAZ",
    },
    {
        id:8,
        valor:"TOR",
    },
    {
        id:9,
        valor:"SaldosAltos",
    },
    {
        id:10,
        valor:"Italika",
    },
    {
        id:11,
        valor: "Ciceron"
    }
]

const opcionesRecurrencia=[
    {
        id:1,
        valor: "Nuevo"
    },
    {
        id:2,
        valor: "Seguimiento"
    }
]

export default class RevisarPP extends React.Component{

    constructor(props){
        super(props);
        this.state={
            personal:[],
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
                        personal:arreglo
                    })
                }
            }
        )
    }

    render(){
        return(
            <div>
                <SupervisarPP
                    personal={this.state.personal}
                />
                
            </div>
        )
    }

}


const SupervisarPP=(props)=>{

    // let asignarPpLista=[];
    const navigate = useNavigate();
    let promesasPuras=[]
    const [asignarPpLista,setAsignarPpLista]=useState([]);
    // const [promesasPuras, setPromesasPuras]=useState([]);
    const [promesas, setPromesas]=useState([]);

    const [login, setLogin]=useState(false);
    const [idLogin, setIdLogin]=useState(null);
    const [passLogin, setPassLogin]=useState(null);
    const [turnoLogin, setTurnoLogin]=useState(null);
    const [nivelLogin,setNiveLogin]=useState(null);
    const [showPassword, setShowPassword] = React.useState(false);
    const [nombreSuper, setNombreSuper]=useState(null);
    

    const [mostarTabla, setMostrarTabla]=useState(true);
    

    const [fechaDiaBusq,setFechaDiaBusq]=useState(null);
    const [fechaMesBusq,setFechaMesBusq]=useState(null);
    const [fechaYearBusq,setFechaYearBusq]=useState(null);
    const [tipoFechaBusq, setTipoFechaBusq]=useState(null);
    const [gestorBusq,setGestorBusq]=useState(null);
    const [cookieBusq,setCookieBusq]=useState(null);
    const [tipoCarteraBusq,setTipoCarteraBusq]=useState(null);
    const [recurrenciaBusq,setRecurrenciaBusq]=useState(null);



    const [openModal, setOpenModal] = React.useState(false);
    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const [mensajeModalInfo, setMensajeModalInfo]=useState(null);

    const [idActBor,setIdActBor]=useState(null);
    const [clienteUnicoAct,setClienteUnicoAct]=useState(null);//1
    const [fechaIngesoPPAct,setFechaIngesoPPAct]=useState(null);//2
    const [fechaPagoAct,setFechaPagoAct]=useState(null);//3
    const [fechaVencPPAct,setFechaVencPPAct]=useState(null);//4
    const [folioAct, setFolioAct]=useState(null);//5
    const [idGestorSCLAct,setIdGestorSCLAct]=useState(null);
    const [idGestorTKMAct,setIdGestorTKMAct]=useState(null);
    const [inserto,setInserto]=useState(null);
    const [montoPagoAct,setMontoPagoAct]=useState(null);//6
    const [nombreClienteAct,setNombreClienteAct]=useState(null);//7
    const [nombreGestorAct,setNombreGestorAct]=useState(null);
    const [notaAct,setNotaAct]=useState(null);//8
    const [observacionesAct,setObservacionesAct]=useState(null);//9
    const [telefonoAct,setTelefonoAct]=useState(null);//10
    const [whatsAppAct,setWhatsAppAct]=useState(null);//11
    const [asignadoAct,setAsignadoAct]=useState(null);
    const [tipoLlamadaAct, setTipoLlamadaAct]=useState(null);
    const [idGestorSCLVIPAct,setIdGestorSCLVIPAct]=useState(null);
    const [montoSemanal, setMontoSemanal]=useState(null);
    const [recurrenciaAct,setRecurrenciaAct]=useState(null);




    const [openModal2i4b, setOpenModal2i4b]= React.useState(false);
    const [mensaje12i4b, setMensaje12i4b]=useState(null);
    const [mensaje22i4b, setMensaje22i4b]=useState(null);
    const [mensaje32i4b, setMensaje32i4b]=useState(null);
    const [mensaje42i4b, setmensaje42i4b]=useState(null);
    const [mensaje52i4b, setmensaje52i4b]=useState(null);
    const [mensaje62i4b, setmensaje62i4b]=useState(null);
    const [opcion1But2i4b]=useState("Actualizar");
    const [opcion2But2i4b]=useState("Borrar");
    const [opcion3But2i4b]=useState("Asignar");
    const [opcion4But2i4b]=useState("Cancelar");

    const [openSiNo, setOpenSiNo]= React.useState(false);
    const [mensajeSiNo, setMensajeSiNo]=useState(null);
    const [valorSiNo, setValorSiNO]=useState(null);

    const [modalAct, setModalAct]= React.useState(false);
    const [encabezAct]=useState("Actualizar Promesa");

    const [modalSiNoCuTxt,setModalSiNoCuTxt]= React.useState(false);
    const [mensajeModalSiNoCuTxt, setMensajeModalSiNoCuTxt]=useState(null);
    const [cookieAsignar,setCookieAsignar]=useState(null);



    
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

    const handleOpen6Info4Bot=(mensaje1,mensaje2,mensaje3,mensaje4,mensaje5,mensaje6)=>{
        setMensaje12i4b(mensaje1);
        setMensaje22i4b(mensaje2);
        setMensaje32i4b(mensaje3);
        setmensaje42i4b(mensaje4);
        setmensaje52i4b(mensaje5);
        setmensaje62i4b(mensaje6);
        setOpenModal2i4b(true);

    }

    const handleClose2i4b=()=>{
        setOpenModal2i4b(false)
    }
    

    const handleOpenSiNo=(mensaje,valor)=>{
        setValorSiNO(valor);
        setMensajeSiNo(mensaje);
        setOpenSiNo(true);
    }

    const handleCloseSiNo=()=>{
        setOpenSiNo(false)
    }

    const handleOpenAct=()=>{
        setModalAct(true);
    }

    const handleCloseAct=()=>{
        setModalAct(false);
    }

    //Para asignar 
    const handleOpenModalSiNoCuTxt=(mensaje)=>{
        setMensajeModalSiNoCuTxt(mensaje);
        setModalSiNoCuTxt(true);
    }

    const handleCloseModalSiNoCuTxt=()=>{
        setModalSiNoCuTxt(false);
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);



    const handleOnChangeIdTKM=(event)=>{
        setIdLogin(event.target.value);
    }

    const handleOnChangePassTKM=(event)=>{
        setPassLogin(event.target.value);
    }

    const validarLogin=()=>{
  
        handleOpen();
        let nombre=null;

        if(idLogin!==null&&idLogin!==""&&passLogin!==null&&passLogin!==""){
            props.personal.forEach(function(element){
                if(element.puesto===1||element.puesto===2){
                    if(element.idTkm===parseInt(idLogin)){
                        if(element.password===passLogin){
                            nombre=element.nombreGestor;
                            setTurnoLogin(element.turno);
                            setNiveLogin(element.puesto);
                            setNombreSuper(element.nombreGestor);
                        }
                        // }else{
                        //     handleClose();
                        //     handleOpenInfo("Contraseña incorrecta");
                        // }
                    }
                }
            })

            if(nombre===null){
                handleClose();
                handleOpenInfo("Usuario y/o contraseña incorrectos o no con cuentas con las permisos");

            }else{
                servicio.consumirServiciosGET("service/promesas/consultarPromesasPP").then(
                    data=>{
                        if(data.code===1){
                            setPromesas(data.data);
                        }
                    }
                )

                handleClose();
                handleOpenInfo("Bienvenid@ "+nombre);
                setLogin(true);

            }

        }else{
            handleClose();
            handleOpenInfo("Favor de validar los campos de usuario y contraseña");
        }
    }

    

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

    const handleOnChangeBusqGestor=(event,newValue)=>{
        if(newValue===null){
            setGestorBusq(null)
        }
        else{
            setGestorBusq(newValue.idTkm);
        }
    }

    const handleOnChangeBusqCookie=(event,newValue)=>{
        setCookieBusq(event.target.value);
    }

    const handleOnChangeTurno=(event,newValue)=>{
        if(newValue===null){
            setTurnoLogin("C")
        }else{
            setTurnoLogin(newValue.id);
        }
    }

    const handleOnChangeTipoCartera=(event,newValue)=>{
        if(newValue===null){
            setTipoCarteraBusq(null)
        }else{
            setTipoCarteraBusq(newValue.valor);
        }
    }

    const handleOnChangeRecurrencia=(event,newValue)=>{
        if(newValue===null){
            setRecurrenciaBusq(null)
        }else{
            setRecurrenciaBusq(newValue.valor);
        }
    }


    const handleClickBuscar=()=>{
        setMostrarTabla(true);
        obtenerPromesas();
    }

    const obtenerPromesas=()=>{

        servicio.consumirServiciosGET("service/promesas/consultarPromesasPP").then(
            data=>{
                if(data.code===1){
                    if(turnoLogin!=="C"){
                        let prom=[];
                        data.data.forEach(function(element){
                            if(element.turnoGestor===turnoLogin){
                                prom.push(element);
                            }
                        })

                        obtenerTipoCartera(prom);
                    }else{
                        obtenerTipoCartera(data.data);
                    }
                }
            }
        )
    }

    const obtenerTipoCartera=(promesas)=>{
        if(tipoCarteraBusq!==null){
            let prom=[];
            promesas.forEach(function(element){
                if(element.tipoCartera===tipoCarteraBusq){
                    prom.push(element);
                }
                
            })
            obtenerTipoRecurrencia(prom);
        }else{
            obtenerTipoRecurrencia(promesas);
        }
    }

    const obtenerTipoRecurrencia=(promesas)=>{
        if(recurrenciaBusq!==null){
            let prom=[];
            promesas.forEach(function(element){
                if(element.recurrencia===recurrenciaBusq){
                    prom.push(element);
                }
            })
            revisarPromesas(prom);
        }else{
            revisarPromesas(promesas);
        }
    }


    const revisarPromesas=(promesas)=>{
        
            if(fechaDiaBusq===null&&fechaMesBusq===null&&fechaYearBusq===null&&tipoFechaBusq===null&&gestorBusq===null){
                promesasPuras=promesas;
                buscarGestiones();        
            }else if(fechaDiaBusq===null&&fechaMesBusq===null&&fechaYearBusq===null&&(tipoFechaBusq===null||tipoFechaBusq!==null)&&gestorBusq!==null){
                promesas.forEach(function(element){
                    if(parseInt(element.idGestorTKM)===parseInt(gestorBusq)){
                        promesasPuras.push(element);
                    }
                })
                
                buscarGestiones();   
            }else{
                if(tipoFechaBusq!==null){
                    promesas.forEach(function(element){  
                        if(tipoFechaBusq===1){
                            tipoFecha1Busq(element)
                        }else if(tipoFechaBusq===2){
                            tipoFecha2Busq(element)
                        }else{
                            tipoFecha3Busq(element)
                        }
                        
                    }) 
                    buscarGestiones();                   
                }
                else{
                    handleOpenInfo("Favor de elegir Tipo de Fecha");
                }
            }

        // setMostrarTabla(false);
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
                if(gestorBusq!==null&&parseInt(gestorBusq)===parseInt(promesa.idGestorTKM)){
                    promesasPuras.push(promesa);
                }else if(gestorBusq===null){
                    promesasPuras.push(promesa);
                }
            }else if(fechaYearBusq!==null&&diaMesYear[2]===fechaYearBusq&&fechaMesBusq===null){
                if(gestorBusq!==null&&parseInt(gestorBusq)===parseInt(promesa.idGestorTKM)){
                    promesasPuras.push(promesa);
                }else if(gestorBusq===null){
                    promesasPuras.push(promesa);
                }
            }else if((fechaMesBusq!==null&&diaMesYear[1]===fechaMesBusq)&&(fechaYearBusq!==null&&diaMesYear[2]===fechaYearBusq)){
                if(gestorBusq!==null&&parseInt(gestorBusq)===parseInt(promesa.idGestorTKM)){
                    promesasPuras.push(promesa);
                }else if(gestorBusq===null){
                    promesasPuras.push(promesa);
                }    
            }else if(fechaMesBusq===null&&fechaYearBusq===null){
                if(gestorBusq!==null&&parseInt(gestorBusq)===parseInt(promesa.idGestorTKM)){
                    promesasPuras.push(promesa);
                }else if(gestorBusq===null){
                    promesasPuras.push(promesa);
                }
            }
        }
    }

    const mesBusq=(promesa,fecha)=>{
        let diaMesYear=fecha.split("/")
        if(fechaMesBusq!==null&&diaMesYear[1]===fechaMesBusq&&fechaDiaBusq===null){
            if(fechaYearBusq!==null&&diaMesYear[2]===fechaYearBusq){
                if(gestorBusq!==null&&parseInt(gestorBusq)===parseInt(promesa.idGestorTKM)){
                    promesasPuras.push(promesa);
                }else if(gestorBusq===null){
                    promesasPuras.push(promesa);
                }
            }else if(fechaYearBusq===null&&fechaDiaBusq===null){
                if(gestorBusq!==null&&parseInt(gestorBusq)===parseInt(promesa.idGestorTKM)){
                    promesasPuras.push(promesa);
                }else if(gestorBusq===null){
                    promesasPuras.push(promesa);
                }
            }
        }
    }

    const yearBusq=(promesa,fecha)=>{
        let diaMesYear=fecha.split("/")
        if(fechaYearBusq!==null&&diaMesYear[2]===fechaYearBusq&&fechaMesBusq===null&&fechaDiaBusq===null){
            if(gestorBusq!==null&&parseInt(gestorBusq)===parseInt(promesa.idGestorTKM)){
                promesasPuras.push(promesa);
            }else if(gestorBusq===null){
                promesasPuras.push(promesa);
            }
        }
    }

    const buscarGestiones=()=>{
        if(promesasPuras.length!==0){
            if(cookieBusq!==null&&cookieBusq!==""){
                if(tipoCarteraBusq!==null&&tipoCarteraBusq!=="Ciceron"&&tipoCarteraBusq!=="Territorios"&&tipoCarteraBusq!=="Abandonados"&&tipoCarteraBusq!=="Implant"&&tipoCarteraBusq!=="TAZ"&&tipoCarteraBusq!=="TOR"&&tipoCarteraBusq!=="SaldosAltos"&&tipoCarteraBusq!=="Italika"){


                    handleOpen();
                    let endPoint="service/promesas/consultarPromesasPPconGestiones";
                    let json={
                        "promesas":promesasPuras,
                        "cookie":cookieBusq
                    }
                    servicio.consumirServicios(json,endPoint).then(
                        data=>{                       
                            setPromesas(data.data);
                            setMostrarTabla(false);
                            handleClose();
                        }
                    )

                }else{
                    handleOpenInfo("Para obtener las gestiones se debe escoger el tipo de cartera de Normalidad o VIP");
                }
            }else{
                setPromesas(promesasPuras)
                setMostrarTabla(false);
            }
            
        }else{
            handleOpenInfo("No se encontraron cuentas con las caracteristicas mencionadas");
        }

    }

    const handleRowClick = (params) => {
        console.log(params)
        let mensaje1="PROMESA: "+params.row.id;
        let mensaje2="CLIENTE UNICO: "+params.row.clienteUnico;
        let mensaje3="GESTOR: "+params.row.nombreGestor;
        let mensaje4="GESTION 1: "+params.row.gestion1;
        let mensaje5="GESTION 2: "+params.row.gestion2;
        let mensaje6="GESTION 3: "+params.row.gestion3;

        setIdActBor(params.row.id);
        setClienteUnicoAct(params.row.clienteUnico);
        setFechaIngesoPPAct(params.row.fechaIngesoPP);
        setFechaPagoAct(params.row.fechaPago);
        setFechaVencPPAct(params.row.fechaVencimientoPP);
        setFolioAct(params.row.folio);
        setIdGestorSCLAct(params.row.idGestorSCL);
        setIdGestorTKMAct(params.row.idGestorTKM);
        setInserto(params.row.inserto);
        setMontoPagoAct(params.row.montoPago);
        setNombreClienteAct(params.row.nombreCliente);
        setNombreGestorAct(params.row.nombreGestor);
        setNotaAct(params.row.nota);
        setObservacionesAct(params.row.observaciones);
        setTelefonoAct(params.row.telefono);
        setWhatsAppAct(params.row.whatsApp);
        setAsignadoAct(params.row.asignado);
        setTipoLlamadaAct(params.row.tipoLlamada);
        setIdGestorSCLVIPAct(params.row.idGestorSCLVIP);
        setMontoSemanal(params.row.montoSemanal);
        setRecurrenciaAct(params.row.recurrencia);
        handleOpen6Info4Bot(mensaje1,mensaje2,mensaje3,mensaje4,mensaje5,mensaje6);
    };

    //Editar
    const handelClickEditar=()=>{
        handleClose2i4b();
        handleOpenAct();
    }

    const handleOnChangeActCU=(event)=>{
        setClienteUnicoAct(event.target.value);
    }

    const handleOnChangeFechaIngresoAct=(event)=>{
        setFechaIngesoPPAct(event.target.value);
    }

    const handleOnChangeFechaPagoAct=(event)=>{
        setFechaPagoAct(event.target.value);
    }

    const handleOnChangeFechaVenAct=(event)=>{
        setFechaVencPPAct(event.target.value);
    }

    const handleOnChangeFolioAct=(event)=>{
        setFolioAct(event.target.value);
    }

    const handleOnChangeMontoAct=(event)=>{
        setMontoPagoAct(event.target.value);
    }

    const handleOnChangeNomClieAct=(event)=>{
        setNombreClienteAct(event.target.value);
    }

    const handleOnChangeNotaAct=(event)=>{
        setNotaAct(event.target.value);
    }

    const handleOnChangeObservAct=(event)=>{
        setObservacionesAct(event.target.value);
    }

    const handleOnChangeTelefonoAct=(event)=>{
        setTelefonoAct(event.target.value);
    }

    const handleOnChangeWhastApp=(event)=>{
        setWhatsAppAct(event.target.value);
    }
    
    const handleOnChangeMontoSemanal=(event)=>{
        setMontoSemanal(event.target.value);
    }
    
    const handleOnChangeRecurrenciaAct=(event,newValue)=>{
        if(newValue===null){
           
        }else{
            setRecurrenciaAct(newValue.valor);
        }
    }

    const actualizar=()=>{
        let endPoint="service/promesas/actualizarPromesas";
        let json={
            "id":parseInt(idActBor),
            "fechaIngesoPP":fechaIngesoPPAct,
            "fechaPago":fechaPagoAct,
            "fechaVencimientoPP":fechaVencPPAct,
            "folio":folioAct,
            "montoPago":montoPagoAct,
            "nombreCliente":nombreClienteAct,
            "clienteUnico":clienteUnicoAct,
            "telefono":telefonoAct,
            "idGestorSCL":idGestorSCLAct,
            "nombreGestor":nombreGestorAct,
            "observaciones":observacionesAct,
            "asignado":asignadoAct,
            "whatsApp":parseInt(whatsAppAct),
            "nota":notaAct,
            "edito":idLogin,
            "idGestorTKM":parseInt(idGestorTKMAct),
            "inserto":parseInt(inserto),
            "tipoLlamada":tipoLlamadaAct,
            "montoSemanal":montoSemanal,
            "recurrencia":recurrenciaAct
        }

        servicio.consumirServicios(json,endPoint).then(
            data=>{
                if(data.code===1){
                    obtenerPromesas();
                    handleCloseAct();
                    handleOpenInfo("Registro actualizado correctamente");
                }else{
                    handleOpenInfo("Favor de notificar que ocurrio un error y volver a intentar");
                }
            }
        )
    }


    //Borrar
    const handleClickBorrar=()=>{
        handleClose2i4b();
        handleOpenSiNo("¿Deseas borrar la Promesa?",1)
    }

    const borraroAsigPromesa=()=>{
        if(valorSiNo===1){
            servicio.consumirServiciosGET("service/promesas/borrarPromesasPP/"+idActBor+"/"+idLogin).then(
                data=>{
                    if(data.code===1){
                        obtenerPromesas();
                        handleCloseSiNo();
                        handleOpenInfo("Registro Borrado correctamente");
                        
                    }else{
                        handleOpenInfo("Favor de notificar que ocurrio un error y volver a intentar");
                    }
                }
            )
        }else{
            let cuAsignar={
                "idPromesaTKM":idActBor,
                "clienteUnico":clienteUnicoAct,
                // "idGestorSCL":idGestorSCLAct,
                "idGestorSCL":tipoCarteraBusq==="Normalidad"?idGestorSCLAct:idGestorSCLVIPAct,
                "nombreGestor":nombreGestorAct,
                "idGestorTKM":idGestorTKMAct
            }

            asignarPpLista.push(cuAsignar);
            
            console.log(asignarPpLista);
            handleCloseSiNo();
        }

        
    }

    const handleClickAsignar=()=>{
        handleClose2i4b();
        handleOpenSiNo("¿Deseas guardar la Promesa para asignar?",2)
    }


    const handleClickAsginarCuentas=()=>{
        if(asignarPpLista.length!==0){
            let mensaje="¿Desea asignar "+asignarPpLista.length+"?";
            handleOpenModalSiNoCuTxt(mensaje);
        }else{
            handleOpenInfo("No hay cuentas para asignar");
        }

    }

    const handleOnChangeValorCuadro=(event)=>{
        setCookieAsignar(event.target.value);
    }

    const asignarServices=()=>{
        handleCloseModalSiNoCuTxt()
        handleOpen();
        if(cookieAsignar!==null){
            let tipoCartera
            if(tipoCarteraBusq==="Normalidad"){
                tipoCartera=1;
            }else if(tipoCarteraBusq==="VIP"){
                tipoCartera=2;
            }
            let endPoint="service/gestores/asignarClientesAGestores/"+tipoCartera;

            let json={
                "cookie":cookieAsignar,
                "idAdminTKM":idLogin,
                "cuentasGestores":asignarPpLista,
            }
            servicio.consumirServicios(json,endPoint).then(
                data=>{
                    if(data.code===1){
                        obtenerPromesas();
                        handleClose();
                        handleOpenInfo(data.data);
                        setAsignarPpLista([]);

                    }else{
                        handleClose();
                        handleOpenInfo("Sucedio algo inesperado, favor de notificar");
                    }
                    console.log(data);
                
                }            
            )


            
        }else{
            handleOpenInfo("Falta poner la cookie");
        }
    }

    const handleClickDescargaPromesas=()=>{

        let archivo=descargarExcel.descargarExcel(promesas,"Promesas");
        if(archivo!==null){
            handleOpenInfo("Las promesas se descargaron correctamente");
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
                        Revisar Planes de Pago o Intencion
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
                    <p><strong>NOMBRE: </strong>{nombreSuper} &nbsp;&nbsp;&nbsp; <strong>ID: </strong>{idLogin}</p>       
                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={1} hidden={!login}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label={'Dia'} views={['day']} onChange={handleOnChangeBusqDia}/>
                    </LocalizationProvider>
                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={1} hidden={!login}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label={'Mes'} views={['month']} onChange={handleOnChangeBusqMes}/>
                    </LocalizationProvider>
                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={1} hidden={!login}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label={'Año'} views={['year']} onChange={handleOnChangeBusqYear}/>
                    </LocalizationProvider>
                </Grid>  
                <Grid item xl={1.5} lg={1.5} md={1.5} sm={1.5} hidden={!login}>
                    <Autocomplete 
                        id="seleccionFecha"                                        
                        options={opcionesFecha}
                        getOptionLabel={(option) => option.valor}
                        renderInput={(params) => <TextField {...params} label="Tipo de Fecha" variant="outlined" />}
                        onChange={handleOnChangeBusqTipoFecha}
                    />
      
                </Grid>
                <Grid item xl={1.5} lg={1.5} md={1.5} sm={1.5} hidden={!login}>
                    <Autocomplete 
                        id="Gestor"          
                        options={props.personal}
                        getOptionLabel={(option) => option.nombreGestor}
                        renderInput={(params) => <TextField {...params} label="Gestor" variant="outlined" />}
                        onChange={handleOnChangeBusqGestor}
                    />


                </Grid>
                <Grid item xl={1.5} lg={1.5} md={1.5} sm={1.5} hidden={!login}>
                    <TextField 
                        id="Cookie"
                        label="Cookie"                        
                        onChange={handleOnChangeBusqCookie}
                    />
                </Grid>

                {/* {
                    nivelLogin===1?( */}
                        <Grid item xl={1} lg={1} md={1} sm={1} hidden={!login}>

                            <Autocomplete 
                                id="Turno"          
                                options={opcionesTurno}
                                getOptionLabel={(option) => option.valor}
                                renderInput={(params) => <TextField {...params} label="Turno" variant="outlined" />}
                                onChange={handleOnChangeTurno}
                            />

                        </Grid>
                    {/* ):(<></>)
                } */}
                <Grid item xl={1} lg={1} md={1} sm={1} hidden={!login}>
                    <Autocomplete 
                        id="TipoCartera"          
                        options={opcionesTipoCartera}
                        getOptionLabel={(option) => option.valor}
                        renderInput={(params) => <TextField {...params} label="TipoCartera" variant="outlined" />}
                        onChange={handleOnChangeTipoCartera}
                    />

                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={1} hidden={!login}>
                    <Autocomplete 
                        id="Recurrencia"          
                        options={opcionesRecurrencia}
                        getOptionLabel={(option) => option.valor}
                        renderInput={(params) => <TextField {...params} label="Recurrencia" variant="outlined" />}
                        onChange={handleOnChangeRecurrencia}
                    />

                </Grid>
                <Grid item xl={.5} lg={.5} md={.5} sm={.5} hidden={!login}>
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
               
            </Grid>
            <br/><br/>
            <Grid container spacing={1} >
                
                <Grid item xl={.5} lg={.5} md={.5} sm={.5} hidden={mostarTabla}></Grid>
                <Grid item xl={11} lg={11} md={11} sm={11} hidden={mostarTabla}>
                    <DataGrid
                        id="tablaDatosPP"
                        // rows={ejemploRows}
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
            <br/> 
            <Grid container spacing={1} >
                
                <Grid item xl={4} lg={4} md={4} sm={4} hidden={mostarTabla}></Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} style={{textAlign:'center'}} hidden={mostarTabla}>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        style={{height:"50px",width:"150px"}}
                        onClick={()=>handleClickAsginarCuentas()}
                    >
                        Asignar cuentas                 
                    </Button>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} style={{textAlign:'center'}} hidden={mostarTabla}>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        style={{height:"50px",width:"150px"}}
                        startIcon={<DownloadIcon style={{height:"40px",width:"50px"}} />}
                        onClick={()=>{handleClickDescargaPromesas()}}
        
                    >
                        Exportar a Excel                
                    </Button>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4} hidden={mostarTabla}></Grid>
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
                <ModalEspera open={openModal} handleClose={handleClose} />
                <ModalInfo open={openModalInfo} handleClose={handleCloseInfo} mensaje={mensajeModalInfo} />
                <ModalSiNo open={openSiNo} handleClose={handleCloseSiNo} mensaje={mensajeSiNo} handleCloseSi={borraroAsigPromesa} />
                <Modal6Infos4Botones 
                    open={openModal2i4b}
                    handleClose={handleClose2i4b}
                    mensaje1={mensaje12i4b}
                    mensaje2={mensaje22i4b}
                    mensaje3={mensaje32i4b}
                    mensaje4={mensaje42i4b}
                    mensaje5={mensaje52i4b}
                    mensaje6={mensaje62i4b}
                    opcion1={opcion1But2i4b}
                    opcion2={opcion2But2i4b}
                    opcion3={opcion3But2i4b}
                    opcion4={opcion4But2i4b}
                    handleOpcion1={handelClickEditar}
                    handleOpcion2={handleClickBorrar}
                    handleOpcion3={handleClickAsignar}
                    handleOpcion4={handleClose2i4b}
                />

                <Modal13Actualizacines
                    open={modalAct}
                    handleClose={handleCloseAct}     
                    mensaje1={encabezAct}

                    nombreValor1={"Cliente Unico"}
                    valor1={clienteUnicoAct}
                    handleChangeV1={handleOnChangeActCU}

                    nombreValor2={"Fecha Ingreso"}
                    valor2={fechaIngesoPPAct}
                    handleChangeV2={handleOnChangeFechaIngresoAct}

                    nombreValor3={"Fecha Pago"}
                    valor3={fechaPagoAct}
                    handleChangeV3={handleOnChangeFechaPagoAct}

                    nombreValor4={"Fecha Ultimo Pago"}
                    valor4={fechaVencPPAct}
                    handleChangeV4={handleOnChangeFechaVenAct}

                    nombreValor5={"Folio"}
                    valor5={folioAct}
                    handleChangeV5={handleOnChangeFolioAct}

                    nombreValor6={"Monto"}
                    valor6={montoPagoAct}
                    handleChangeV6={handleOnChangeMontoAct}

                    nombreValor7={"Nombre Cliente"}
                    valor7={nombreClienteAct}
                    handleChangeV7={handleOnChangeNomClieAct}

                    nombreValor8={"Nota"}
                    valor8={notaAct}
                    handleChangeV8={handleOnChangeNotaAct}

                    nombreValor9={"Observaciones"}
                    valor9={observacionesAct}
                    handleChangeV9={handleOnChangeObservAct}

                    nombreValor10={"Telefono"}
                    valor10={telefonoAct}
                    handleChangeV10={handleOnChangeTelefonoAct}

                    nombreValor11={"WhatsApp"}
                    valor11={whatsAppAct}
                    handleChangeV11={handleOnChangeWhastApp}

                    nombreValor12={"Monto Semanala"}
                    valor12={montoSemanal}
                    handleChangeV12={handleOnChangeMontoSemanal}

                    nombreValor13={"Recurrencia"}
                    opcionesValor13={opcionesRecurrencia}
                    handleChangeV13={handleOnChangeRecurrenciaAct}
                    
                    opcion1={"Actualizar"}
                    opcion2={"Cancelar"}
                    handleOpcion1={actualizar}
                    handleOpcion2={handleCloseAct}
                />

                <ModalSiNoCuadroText
                    open={modalSiNoCuTxt}
                    handleClose={handleCloseModalSiNoCuTxt}
                    encabezadoCuadroText={"Cookie"}
                    handleOnChangeValorCuadro={handleOnChangeValorCuadro}
                    mensaje={mensajeModalSiNoCuTxt}
                    handleCloseSi={asignarServices}                  

                />
            </div>


                            


            <br/><br/>
        </div>
    )


}