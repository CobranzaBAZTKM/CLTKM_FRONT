import React, { useEffect, useState } from "react";
import Servicios from '../../services/servicios';
import { useParams } from "react-router-dom";
import {Grid,TextField,Autocomplete,Button} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate  } from "react-router-dom"
import {ModalInfo} from '../../services/modals';

const servicio=new Servicios();

export default class OperacionGestion extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
            personal:[],
            tipificaciones:[],
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
        if(this.state.personal.length!==0&&this.state.tipificaciones.length!==0){
            return(
                <div>
                    <Gestion
                        personal={this.state.personal}
                        tipificaciones={this.state.tipificaciones}
                    />
                </div>
            )
        }else{
            return(<div></div>)
        }
    }

}

const Gestion=(props)=>{
    
    let params=useParams();
    const navigate = useNavigate();
    const [cuenta, setCuenta]=useState(null);
    const [idGestorTKM,setIdGestorTKM]=useState(null);
    const [clienteUnico,setClienteUnico]=useState(null);
    const [telefono,setTelefono]=useState(null);
    const [idTipificacion, setIdTipificacion]=useState(null);
    const [comentario, setComentario]=useState(null);
    const [gestion1, setGestion1]=useState(null);
    const [gestion2, setGestion2]=useState(null);
    const [gestion3, setGestion3]=useState(null);
    const [gestion4, setGestion4]=useState(null);
    const [gestion5, setGestion5]=useState(null);
    const [banderaGestion, setBanderaGestion]=useState(true);


    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const [mensajeModalInfo, setMensajeModalInfo]=useState(null);

    useEffect(()=>{
        if(clienteUnico===null){
            let datosObtenidos=params.datos.split("&");
            let clienteUnicoOb=datosObtenidos[0].split("=");
            let telefonoOb=datosObtenidos[1].split("=");
            setClienteUnico(clienteUnicoOb[1]);
            setTelefono(telefonoOb[1])
            servicio.consultarServicioGETLlamadas("service/carteraLocal/consultarClienteUnico/"+clienteUnicoOb[1]).then(
                data=>{
                    if(data.code===1){
                        setCuenta(data.data);
                        console.log(data.data);
                        buscarGestion(telefonoOb[1]);
                    }
                }
            )
        }
    })

    const buscarGestion=(telefono)=>{

        servicio.consultarServicioGETLlamadas("service/operacion/gestionllamadas/consultarGestionLlamadasNumero/"+telefono).then(
            data=>{
                if(data.code===1){
                    let valData=data.hasOwnProperty('data')
                    if(valData===true){
                        if(data.data.length>0){
                            let gestiones=[];
                            data.data.forEach(function(element){
                                let nombreTip="";
                                props.tipificaciones.forEach(function(element2){
                                    if(element.idTipificacion===element2.id){
                                        nombreTip=element2.tipificacion;
                                    }
                                })
                                gestiones.push(element.fechaInserto+" | "+nombreTip+" | "+element.comentario);
                            })

                            if(gestiones.length===1){
                                setGestion1(gestiones[0]);
                                setBanderaGestion(false);
                            }else if(gestiones.length===2){
                                setGestion1(gestiones[1]);
                                setGestion2(gestiones[0]);
                                setBanderaGestion(false);
                            }else if(gestiones.length===3){
                                setGestion1(gestiones[2]);
                                setGestion2(gestiones[1]);
                                setGestion3(gestiones[0]);
                                setBanderaGestion(false);
                            }else if(gestiones.length===4){
                                setGestion1(gestiones[3]);
                                setGestion2(gestiones[2]);
                                setGestion3(gestiones[1]);
                                setGestion4(gestiones[0]);
                                setBanderaGestion(false);
                            }else if(gestiones.length===5){
                                setGestion1(gestiones[4]);
                                setGestion2(gestiones[3]);
                                setGestion3(gestiones[2]);
                                setGestion4(gestiones[1]);
                                setGestion5(gestiones[0]);
                                setBanderaGestion(false);
                            }else{
                                setGestion1(gestiones[gestiones.length-1]);
                                setGestion2(gestiones[gestiones.length-2]);
                                setGestion3(gestiones[gestiones.length-3]);
                                setGestion4(gestiones[gestiones.length-4]);
                                setGestion5(gestiones[gestiones.length-5]);
                                setBanderaGestion(false);
                            }
                        }
                    }
                        
                }
            }
        )



    }

    const handleOpenInfo = (mensaje) => {
        setMensajeModalInfo(mensaje);
        setOpenModalInfo(true);
    };
    const handleCloseInfo = () => {
        setOpenModalInfo(false);
    };


    const handleOnChangeGestor=(event,newValue)=>{
        if(newValue===null){
            setIdGestorTKM(null);
        }else{
            setIdGestorTKM(newValue.idTkm);
        }
    }

    const handleOnChangeTipificacion=(event,newValue)=>{
        if(newValue===null){
            setIdTipificacion(null);
        }else{
            setIdTipificacion(newValue.id);
        }
    }

    const handleOnChangeComentario=(event)=>{
        setComentario(event.target.value);
    }

    const handleOnClickInsertarGestion=()=>{
        if((idGestorTKM!==""&&idGestorTKM!==null)&&(idTipificacion!==""&&idTipificacion!==null)&&(comentario!==""&&comentario!==null)){
            if(String(telefono).length===10){
                let endPoint="service/operacion/gestionllamadas/insertarGestionLlamadas";
                let json={                
                    clienteUnico:clienteUnico,
                    telefono:telefono,
                    idTipificacion:idTipificacion,
                    idGestorTkm:idGestorTKM,
                    comentario:comentario,
                    tipoCarteraTKM:cuenta.tipocarteratkm,
                };

                servicio.consumirServicios(json,endPoint).then(
                    data=>{
                        if(data.code===1){
                            handleOpenInfo("Gestión insertada correctamente");
                            document.getElementById("tipificaciones").value="";
                            document.getElementById("comentario").value="";
                        }else{
                            handleOpenInfo("Algo ocurrio, favor de notificar a tu supervisor");
                        }
                    }
                )
            }else{
                handleOpenInfo("Favor de validar que el telefono contenga 10 digitos");
            }

        }else{
            handleOpenInfo("Favor de validar que los campos esten llenados correctamente");
        }
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
                        Gestion
                    </h1>
                </Grid>
            </Grid>
            <br/>
            {cuenta!==null?(
                <Grid container spacing={1} className="bordeTarjeta">
                    <Grid item xl={1} lg={1} md={1} sm={1}/>
                    <Grid item xl={2} lg={2} md={2} sm={2}>
                        <p><strong style={{color:'#06AA0D'}}>CLIENTE UNICO: </strong>{cuenta.cliente_UNICO}</p>
                        <br/>
                        <p><strong style={{color:'#06AA0D'}}>NOMBRE: </strong>{cuenta.nombre_CTE}</p>
                    </Grid>
                    <Grid item xl={2} lg={2} md={2} sm={2}>
                        <p ><strong style={{color:'#06AA0D'}}>SALDO TOTAL: </strong>{cuenta.saldo_TOTAL}</p>
                        <br/>
                        <p><strong style={{color:'#06AA0D'}}>DIAS ATRASO: </strong>{cuenta.dias_ATRASO}</p>                        
                    </Grid>
                    <Grid item xl={2} lg={2} md={2} sm={2}>
                        <p><strong style={{color:'#06AA0D'}}>TELEFONO 1: </strong>{cuenta.telefono1}</p>
                        <br/>
                        <p><strong style={{color:'#06AA0D'}}>TELEFONO 2: </strong>{cuenta.telefono2}</p>
                        <br/>
                        <p><strong style={{color:'#06AA0D'}}>CARTERA: </strong>{cuenta.tipocarteratkm}</p>
                    </Grid>
                    <Grid item xl={2} lg={2} md={2} sm={2}>
                        <p><strong style={{color:'#06AA0D'}}>TELEFONO 3: </strong>{cuenta.telefono3}</p>
                        <br/>
                        <p><strong style={{color:'#06AA0D'}}>TELEFONO 4: </strong>{cuenta.telefono4}</p>
                    </Grid>
                    <Grid item xl={2} lg={2} md={2} sm={2}>
                        <p><strong  style={{color:'#06AA0D'}}>FE_ULT_PAG: </strong>{cuenta.fecha_ULTIMO_PAGO}</p>
                        <br/>
                        <p><strong style={{color:'#06AA0D'}}>PRODUCTO: </strong>{cuenta.producto}</p>
                    </Grid>
                    <Grid item xl={1} lg={1} md={1} sm={1}/>

                </Grid>
            ):(<></>)}

            <Grid container spacing={1}>
                <Grid item xl={.5} lg={.5} md={.5} sm={.5}/>
                <Grid item xl={3} lg={3} md={3} sm={3} hidden={!banderaGestion}/>
                <Grid item xl={3} lg={3} md={3} sm={3} hidden={banderaGestion} className="bordeTarjeta">
                    <p><strong style={{color:'#06AA0D'}}>GESTIONES ANTERIORES </strong></p>
                    <p><strong style={{color:'#06AA0D'}}>GESTION 1: </strong>{gestion1}</p>
                    <p><strong style={{color:'#06AA0D'}}>GESTION 2: </strong>{gestion2}</p>
                    <p><strong style={{color:'#06AA0D'}}>GESTION 3: </strong>{gestion3}</p>
                    <p><strong style={{color:'#06AA0D'}}>GESTION 4: </strong>{gestion4}</p>
                    <p><strong style={{color:'#06AA0D'}}>GESTION 5: </strong>{gestion5}</p>
                </Grid>
                <Grid item xl={.5} lg={.5} md={.5} sm={.5}/>
                <Grid item xl={4} lg={4} md={4} sm={4}  style={{textAlign:'center'}}>
                    <br/>
                    <Autocomplete 
                        id="Gestor"          
                        options={props.personal}
                        getOptionLabel={(option) => option.nombreGestor}
                        // style={{height:"50px",width:"300px",textAlign:'center'}}
                        style={{width:"300px",textAlign:'center',marginLeft:'auto',marginRight:'auto'}}
                        renderInput={(params) => <TextField {...params} label="Gestor" variant="outlined" />}
                        onChange={handleOnChangeGestor}
                    />
                    <br/><br/>
                    <Autocomplete 
                        id="tipificaciones"          
                        options={props.tipificaciones}
                        getOptionLabel={(option) => option.tipificacion}
                        
                        style={{width:"300px",textAlign:'center',marginLeft:'auto',marginRight:'auto'}}
                        renderInput={(params) => <TextField {...params} label="Tipificacion" variant="outlined" />}
                        onChange={handleOnChangeTipificacion}
                    />
                    <br/>
                    <br/>
                    <TextField 
                        id="comentario" 
                        label="Comentario" 
                        style={{width:"400px"}} 
                        onChange={handleOnChangeComentario}
                    />
                    <br/>
                    <br/>
                
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4}/>

      

            </Grid>
            <Grid container spacing={1}>
                <Grid item xl={1} lg={1} md={1} sm={1}>
                    <ArrowBackIcon
                        style={{height:"80px",width:"200px"}}
                        onClick={()=>{handleClickRegresasr()}}
                    />
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={3}/>
                <Grid item xl={4} lg={4} md={4} sm={4}  style={{textAlign:'center'}}>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        style={{height:"50px",width:"200px"}}
                        onClick={handleOnClickInsertarGestion}
                    >    
                        Insertar Gestion                       
                    </Button>
                    <br/>
                    <br/>
                </Grid>

                <Grid item xl={4} lg={4} md={4} sm={4}/>

            </Grid>
            <div>
                <ModalInfo open={openModalInfo} handleClose={handleCloseInfo} mensaje={mensajeModalInfo} />
            </div>

        </div>
    )

}