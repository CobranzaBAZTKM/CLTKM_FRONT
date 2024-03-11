import React, { useState } from "react";
import IframeComm from "react-iframe-comm";
import Iframe from 'react-iframe'
import {Grid,TextField,Autocomplete} from '@mui/material';
import Tarjeta from "./tarjeta";
// import Embed from 'react-embed';
import "../assests/estilos.css"
import DoneOutlineSharpIcon from '@mui/icons-material/DoneOutlineSharp';
import CloseIcon from '@mui/icons-material/Close';
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
            tipificaciones:[]
            //Aqui tambien iran las tipificaciones
        }
    }

    componentWillMount(){
        servicio.consumirServiciosGET("service/gestores/consultarGestoresTKM").then(
            data=>{
                if(data.code===1){
                    this.setState({
                        personal:data.data
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
                />
            </div>
        )
    }

}

const Speeche=(props)=>{
    const navigate = useNavigate();
    // let params=useParams();

    // const [clienteUnico,setClienteUnico]=useState(params.clienteUnico);
    const [idGestorTKM,setIdGestorTKM]=useState(null);
    const [clienteUnico, setClienteUnico]=useState(null);
    const [telefono, setTelefono]=useState(null);
    const [idTipificacion, setIdTipificacion]=useState(null);
    const [comentario, setComentario]=useState(null);

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

    const handleOnChangeTelefono=(event)=>{
        setTelefono(event.target.value);
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


    const handleOnClickInsertarGestion=()=>{
        //if((idGestorTKM!==""||idGestorTKM!==null)&&(clienteUnico!==""||clienteUnico!==null)&&(telefono!==""||telefono!==null)&&(idTipificacion!==""||idTipificacion!==null)&&(comentario!==""||comentario!==null)){
        if((idGestorTKM!==""&&idGestorTKM!==null)&&(clienteUnico!==""&&clienteUnico!==null)&&(telefono!==""&&telefono!==null)&&(idTipificacion!==""&&idTipificacion!==null)&&(comentario!==""&&comentario!==null)){
            if(String(telefono).length===10){
                let endPoint="service/operacion/gestionllamadas/insertarGestionLlamadas";
                let json={                
                    clienteUnico:clienteUnico,
                    telefono:telefono,
                    idTipificacion:idTipificacion,
                    idGestorTkm:idGestorTKM,
                    comentario:comentario
                };

                servicio.consumirServicios(json,endPoint).then(
                    data=>{
                        if(data.code===1){
                            handleOpenInfo("Gestión insertada correctamente");
                            document.getElementById("clienteUnico").value="";
                            document.getElementById("telefono").value="";
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

            <Grid container spacing={1}>
                <Grid item xl={4} lg={4} md={4} sm={4}/>
                <Grid item xl={4} lg={4} md={4} sm={4}  style={{textAlign:'center'}}>
                    <TextField 
                        id="clienteUnico" 
                        label="Cliente Unico"  
                        onChange={handleOnChangeCU}
                    />
                    {/* <FormControl variant="outlined">
                        <InputLabel htmlFor="formatted-text-mask-input">Cliente Unico</InputLabel>
                        <Input                                                                   
                            onChange={handleOnChangeCU}                                   
                            id="clienteUnico"
                            inputComponent={TextMaskCustom}
                        />
                    </FormControl> */}
                    <br/><br/>
                    <TextField 
                        id="telefono" 
                        label="Telefono"  
                        type="number"
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
                    
                    
                    
                    {/* <p>Buen dia mi nombre es: <strong>NOMBRE_GESTOR</strong> </p>
                    <p>Me comunico de TKM en representacion de de Banco Azteca</p>
                    <p>¿Es usted <strong>NOMBRE_CLIENTE</strong>?</p>
                    <br/>
                    &nbsp;&nbsp;  &nbsp;  &nbsp;  &nbsp;      


                    &nbsp;&nbsp;  &nbsp;  &nbsp;  &nbsp;   */}
                    

                    {/* <Button
                            variant="contained"
                            color="error"
                            size="large"
                            style={{height:"50px",width:"200px"}}
                            startIcon={<CloseIcon style={{height:"50px",width:"80px"}}/>}
                    >                          
                    </Button> */}



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

// const TextMaskCustom = (props) => {
//     const { onChange, ...other } = props;
//     return (
//       <IMaskInput
//         {...other}
//         mask="0000-00000-0000-0000"
//         definitions={{
//           "#": /[1-9]/,
//         }}
//         onAccept={(value) => onChange({ target: { name: props.name, value } })}
//         overwrite
//       />
//     );
//   };