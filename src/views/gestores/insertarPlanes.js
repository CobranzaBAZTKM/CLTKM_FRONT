import React from "react";
import { useState } from "react";
import {TextField, Button, Grid,Autocomplete,Input,InputLabel,FormControl} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {ModalEspera,ModalInfo,ModalSiNo} from '../../services/modals';
import Servicios from '../../services/servicios';
import { useNavigate  } from "react-router-dom"
import { IMaskInput } from 'react-imask';


const servicio=new Servicios();

const siNo=[
    {
        id:1,
        valor:"Si"
    },
    {
        id:0,
        valor:"No"
    }

]

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
        let gestores=[];
        servicio.consumirServiciosGET("service/gestores/consultarGestoresTKM").then(
                data=>{
                    if(data.code===1){
                        this.setState({
                            gestores:data.data
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

    const [fechaIngPP, setFechaIngPP]=useState(null);
    const [fechaPago, setFechaPago]=useState(null);
    const [fechaVencePlan, setFechaVencePlan]=useState(null);
    const [folio, setFolio]=useState(null);
    const [montoPago, setMontoPago]=useState(null);
    const [nombreCliente, setNombreCliente]=useState(null);
    const [clienteUnico, setClienteUnico]=useState(null);
    const [telefono, setTelefono]=useState(null);
    const [idGestorTKM, setIdGestorTKM]=useState(null);
    const [idGestorSCL, setIdGestorSCL]=useState(null);
    const [nombreGestor, setNombreGestor]=useState(null);
    const [observaciones, setObservaciones]=useState(null);
    const [conWhatsApp, setConWhatsApp]=useState(1);
    const [adicional, setAdicional]=useState("");
    const [tipoLlamada,setTipoLlamada]=useState(null);

    const [openModal, setOpenModal] = React.useState(false);
    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const [mensajeModalInfo, setMensajeModalInfo]=useState(null);

    const [openModalSiNo, setOpenModalSiNo]= React.useState(false);
    const [mensajeModalSiNo,setMensajeModalSiNo]=useState(null);
    
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


    
    const handleOnChangeFechaIngresoPago=(event)=>{
        let fechaRecuperado=String(event)
        let preparandoFecha =fechaRecuperado.split(" ");
        setFechaIngPP(preparandoFecha[1]+"/"+preparandoFecha[2]+"/"+preparandoFecha[3])
    }

    const handleOnChangeFechaPago=(event)=>{
        let fechaRecuperado=String(event)
        let preparandoFecha =fechaRecuperado.split(" ");
        setFechaPago(preparandoFecha[1]+"/"+preparandoFecha[2]+"/"+preparandoFecha[3])
    }
    
    const handleOnChangeFechaVencePlan=(event)=>{
        let fechaRecuperado=String(event)
        let preparandoFecha =fechaRecuperado.split(" ");
        setFechaVencePlan(preparandoFecha[1]+"/"+preparandoFecha[2]+"/"+preparandoFecha[3])
    }

    const handleOnChangeFolio=(event)=>{
        setFolio(event.target.value);
    }

    const handleOnChangeMontoPago=(event)=>{
        setMontoPago(event.target.value);
    }

    const handleOnChangeNombreCliente=(event)=>{
        setNombreCliente(event.target.value);
    }

    const handleOnChangeClienteUnico=(event)=>{
        setClienteUnico(event.target.value);
    }

    const handleOnChangeTelefono=(event)=>{
        setTelefono(event.target.value);
    }

    const handleOnChangeGestor=(event,newValue)=>{
        if(newValue===null){
            setIdGestorTKM(null);
            setIdGestorSCL(null);
            setNombreGestor(null);
        }
        else{
            setIdGestorTKM(newValue.idTkm)
            setIdGestorSCL(newValue.idGestor);
            setNombreGestor(newValue.nombreGestor);
        }
    }

    const handleOnChangeObservaciones=(event)=>{
        setObservaciones(event.target.value);
    }

    const handleOnChangeConWhatsApp=(event)=>{
        setConWhatsApp(event.target.value);        
    }

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
    


    const handleClickGuardar=()=>{
        handleOpen();
        
        let cus=clienteUnico!==null?clienteUnico.split("-"):null;

        if(String(telefono).length!==10){
            handleClose();
            handleOpenInfo("Favor de revisar que el campo telefono cuente con 10 digitos");
        }else if(fechaIngPP===null||fechaPago===null||fechaVencePlan===null||folio===null||montoPago===null||nombreCliente===null||clienteUnico===null||telefono===null||conWhatsApp===null||tipoLlamada===null){
            handleClose();
            handleOpenInfo("Favor de revisar que todos los campos esten llenos correctamente");
        }
        // else if(cus===null||cus[0]){

        // }
        else{
            handleClose();
            handleOpenSiNo("¿Esta seguro de insertar la Promesa?");
        }

        
    }

    const handleOnClickInsertarPromesa=()=>{
        let cuDivi=clienteUnico.split("-");
        let sucursalCU=cuDivi[1];
        let folioCU=cuDivi.length===3?cuDivi[2]:cuDivi[2]+cuDivi[3]
        let paisCanalCUDiv=cuDivi[0].split("");
        let paisCU=paisCanalCUDiv[1];
        let canalCU=paisCanalCUDiv[2]==="0"?paisCanalCUDiv[3]:paisCanalCUDiv[2]+paisCanalCUDiv[3];

        let clienteUnicoCom=paisCU+"-"+canalCU+"-"+sucursalCU+"-"+folioCU;



        let endPoint="service/promesas/insertarPromesas";
        let json={
            "fechaIngesoPP":fechaIngPP,
            "fechaPago":fechaPago,
            "fechaVencimientoPP":fechaVencePlan,
            "folio":folio,
            "montoPago":montoPago,
            "nombreCliente":nombreCliente,
            "clienteUnico":clienteUnicoCom,
            "telefono":telefono,
            "idGestorSCL":idGestorSCL,
            "nombreGestor":nombreGestor,
            "observaciones":observaciones,
            "whatsApp":conWhatsApp,
            "nota":adicional,
            "asignado":0,
            "idGestorTKM":parseInt(idGestorTKM),
            "inserto":parseInt(idGestorTKM),
            "tipoLlamada":tipoLlamada,
            "pagoFinal":0
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
                    document.getElementById("telefono").value="";
                    document.getElementById("observaciones").value="";
                    document.getElementById("whatsApp").value="";
                    document.getElementById("adicional").value="";
                    document.getElementById("tipoLlamadaAutocomplete").value="";
                    setObservaciones(null);
                    setAdicional(null);

                }else{
                    handleCloseSiNo();
                    handleOpenInfo("No se pudo inser el registo, favor de notificar a tu supervisor(a)");
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
                <Grid item xl={1} lg={1} md={1} sm={1}></Grid>

                <Grid item xl={8} lg={8} md={8} sm={8}>
                    <Grid container spacing={1}>
                        <Grid item xl={2} lg={2} md={2} sm={2}>
                            <p><strong>FECHA QUE SE INGRESO PP</strong></p>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4}>                           
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker                       
                                    label="Selecciona Fecha" 
                                    // onChange={(dateIngPP)=>setFechaIngPP(dateIngPP)}
                                    onChange={handleOnChangeFechaIngresoPago}
                                />
                            </LocalizationProvider>
                        </Grid>  
                        <Grid item xl={6} lg={6} md={6} sm={6}></Grid>
                    </Grid>                  
                    <br/>
                    <Grid container spacing={1}>
                        <Grid item xl={2} lg={2} md={2} sm={2}>
                            <p><strong>FECHA DE PAGO</strong></p>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                    label="Selecciona Fecha" 
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
                            <p><strong>FECHA QUE VENCE EL PLAN</strong></p>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                    label="Selecciona Fecha" 
                                    onChange={handleOnChangeFechaVencePlan}
                                    //onChange={(dateVencePP)=>setFechaVencePlan(dateVencePP)}
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
                            <p><strong>MONTO DE PAGO</strong></p>
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
                            <p><strong>NOMBRE DEL CLIENTE</strong></p>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4}>
                            <TextField 
                                id="nombreCliente" 
                                label="Nombre del Cliente"  
                                onChange={handleOnChangeNombreCliente}
                            />
                        </Grid>  
                        <Grid item xl={6} lg={6} md={6} sm={6}></Grid>
                    </Grid>        
                    <br/>
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
                    <Grid container spacing={1}>
                        <Grid item xl={2} lg={2} md={2} sm={2}>
                            <p><strong>TELEFONO A 10 DIGITOS</strong></p>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4}>
                            <TextField 
                                id="telefono" 
                                label="Telefono" 
                                type="number"
                                onChange={handleOnChangeTelefono}
                            />
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
                    <br/>
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


                  
                </Grid>

                <Grid item xl={2} lg={2} md={2} sm={2}></Grid>
            </Grid>

            <Grid container spacing={1}>
                <Grid item xl={12} lg={12} md={12} sm={12} textAlign={'center'}>
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
            </Grid>
            <br/><br/>

            <div>
                <ModalEspera open={openModal} handleClose={handleClose} />
                <ModalInfo open={openModalInfo} handleClose={handleCloseInfo} mensaje={mensajeModalInfo} />
                <ModalSiNo open={openModalSiNo} handleClose={handleCloseSiNo} mensaje={mensajeModalSiNo} handleCloseSi={handleOnClickInsertarPromesa} />
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
        mask="0000-00000-0000-0000"
        definitions={{
          "#": /[1-9]/,
        }}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  };