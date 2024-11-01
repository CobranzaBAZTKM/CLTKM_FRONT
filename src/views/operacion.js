import React, { useState } from "react";
import {Grid,TextField,Autocomplete} from '@mui/material';
import "../assests/estilos.css";
import { Button } from "@mui/material";
import Servicios from '../services/servicios';
import {ModalInfo} from '../services/modals';
import { useNavigate  } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { useParams } from "react-router-dom";


const servicio=new Servicios();

export default class Operacion extends React.Component{

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
        return(
            <div>
                <Speeche
                    personal={this.state.personal}
                    tipificaciones={this.state.tipificaciones}
                    cartera={this.state.cartera}
                />
            </div>
        )
    }

}

const Speeche=(props)=>{
    const navigate = useNavigate();
    
    const [idGestorTKM,setIdGestorTKM]=useState(null);
    const [clienteUnico, setClienteUnico]=useState(null);
    const [telefono, setTelefono]=useState(null);
    const [tels, setTels]=useState([]);
    const [idTipificacion, setIdTipificacion]=useState(null);
    const [comentario, setComentario]=useState(null);
    const [cuValidado,setCuValidado]=useState(0);
    const [tipoCartera, setTipoCartera]=useState(null);
    const [nombreTitular, setNombreTitular]=useState(null);

    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const [mensajeModalInfo, setMensajeModalInfo]=useState(null);

    const handleOpenInfo = (mensaje) => {
        setMensajeModalInfo(mensaje);
        setOpenModalInfo(true);
    };
    const handleCloseInfo = () => {
        setOpenModalInfo(false);
    };

    
    const handleOnChangeCU=(event)=>{
        setClienteUnico(event.target.value);
    }

    const handleOnChangeTelefono=(event,newValue)=>{
        if(newValue===null){
            setTelefono(null);
        }else{
            setTelefono(newValue.telefono);
        }
    }

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

    const handleOnClickBuscarCU=()=>{
        servicio.consultarServicioGETLlamadas("service/carteraLocal/consultarClienteUnico/"+clienteUnico).then(
            data=>{
                if(data.code===1){
                    if(data.data.cliente_UNICO!==null){
                        let telefonos=[];
                        let tel1={
                            "valor":1,
                            "telefono":data.data.telefono1
                        }
                        let tel2={
                            "valor":2,
                            "telefono":data.data.telefono2
                        }
                        let tel3={
                            "valor":3,
                            "telefono":data.data.telefono3
                        }
                        let tel4={
                            "valor":4,
                            "telefono":data.data.telefono4
                        }
                        telefonos.push(tel1);
                        telefonos.push(tel2);
                        telefonos.push(tel3);
                        telefonos.push(tel4);
                        setCuValidado(1);
                        setTels(telefonos);
                        setTipoCartera(data.data.tipocarteratkm);
                        setNombreTitular(data.data.nombre_CTE)
                    }else{
                        handleOpenInfo("Favor de validar el Cliente Unico, no se obtuvieron datos");
                    }

                }else{
                    handleOpenInfo("No se obtuvieron datos");
                }
            }
        )
    }


    const handleOnClickInsertarGestion=()=>{
        if((idGestorTKM!==""&&idGestorTKM!==null)&&(clienteUnico!==""&&clienteUnico!==null)&&(telefono!==""&&telefono!==null)&&(idTipificacion!==""&&idTipificacion!==null)&&(comentario!==""&&comentario!==null)){
            if(String(telefono).length===10){
                let endPoint="service/operacion/gestionllamadas/insertarGestionLlamadas";
                let json={                
                    clienteUnico:clienteUnico,
                    telefono:telefono,
                    idTipificacion:idTipificacion,
                    idGestorTkm:idGestorTKM,
                    comentario:comentario,
                    tipoCarteraTKM:tipoCartera
                };

                servicio.consumirServicios(json,endPoint).then(
                    data=>{
                        if(data.code===1){
                            handleOpenInfo("Gestión insertada correctamente");
                            
                            document.getElementById("clienteUnico").value="";
                            document.getElementById("tipificaciones").value="";
                            document.getElementById("comentario").value="";
                            setCuValidado(0);
                            setTelefono([]);

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

            <Grid container spacing={1}>
                <Grid item xl={4} lg={4} md={4} sm={4}/>
                <Grid item xl={4} lg={4} md={4} sm={4}  style={{textAlign:'center'}}>
                    <TextField 
                        id="clienteUnico" 
                        label="Cliente Unico"  
                        onChange={handleOnChangeCU}
                    />
                    <br/><br/>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        style={{height:"50px",width:"200px"}}
                        disabled={clienteUnico===null||clienteUnico===""}
                        onClick={handleOnClickBuscarCU}
                    >    
                        Buscar Titular                     
                    </Button>
                    <br/><br/>
                    {cuValidado===1?
                        (   
                            <>
                            <TextField 
                                id="nombre" 
                                label="Nombre Titular"  
                                disabled
                                defaultValue={nombreTitular}
                            />
                            <br/><br/>
                            <Autocomplete 
                                id="telefono"          
                                options={tels}
                                getOptionLabel={(option) => option.telefono}
                                style={{width:"300px",textAlign:'center',marginLeft:'auto',marginRight:'auto'}}
                                renderInput={(params) => <TextField {...params} label="Telefono" variant="outlined" />}
                                onChange={handleOnChangeTelefono}
                            />
                            <br/><br/>
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
                            <Button
                                variant="contained"
                                color="success"
                                size="large"
                                style={{height:"50px",width:"200px"}}
                                onClick={handleOnClickInsertarGestion}
                            >    
                                Insertar Gestion                       
                            </Button>
                            </>
                        ):(<></>)
                    }   
                    
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4}/>

      

            </Grid>
            <Grid container spacing={1}>
                <Grid item xl={2} lg={2} md={2} sm={2}>
                    <ArrowBackIcon
                        style={{height:"80px",width:"200px"}}
                        onClick={()=>{handleClickRegresasr()}}
                    />
                </Grid>
                <Grid item xl={10} lg={10} md={10} sm={10}/>
            </Grid>

            <div>
                <ModalInfo open={openModalInfo} handleClose={handleCloseInfo} mensaje={mensajeModalInfo} />
            </div>


        </div>
    )
}