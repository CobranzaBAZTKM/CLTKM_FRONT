import React from "react";
import Grid from '@mui/material/Grid';
import "../../assests/estilos.css"
import {TextField, Button,InputLabel,OutlinedInput,IconButton} from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import FormControl from '@mui/material/FormControl';
import { useState } from "react";
import Servicios from '../../services/servicios';
import {ModalInfo} from '../../services/modals';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate  } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const servicio=new Servicios();


const columnas=[
    { 
        field: 'id', 
        headerName: 'ID', 
        width: 100 
    },
    {
        field:"tipificacion",
        headerName: "Tipificacion",
        width:300,
        editable:false,
    },
    {
        field:"valor",
        headerName: "Accion",
        width:200,
        editable:false,
    }

 ]

export default class Tipificaciones extends React.Component{

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
                <RevisarTipificaciones
                    personal={this.state.personal}
                />                                  
            </div>
        )
    }
}

const RevisarTipificaciones=(props)=>{

    const navigate = useNavigate();

    const [tipificaciones, setTipificaciones]=useState([]);
    const [login, setLogin]=useState(false);
    const [idLogin, setIdLogin]=useState(null);
    const [passLogin, setPassLogin]=useState(null);
    const [showPassword, setShowPassword] = React.useState(false);

    const [idTipificacion, setIdTipificacion]=useState(null);
    const [tipificacionText, setTipificacionText]=useState(null);
    const [valorTipi, setValorTipi]=useState(null);



    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const [mensajeModalInfo, setMensajeModalInfo]=useState(null);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleOpenInfo = (mensaje) => {
        setMensajeModalInfo(mensaje);
        setOpenModalInfo(true);
    };
    const handleCloseInfo = () => {
        setOpenModalInfo(false);
    };


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
                if(element.puesto===1||element.puesto===2){
                    if(element.idTkm===parseInt(idLogin)){
                        if(element.password===passLogin){
                            nombre=element.nombreGestor;
                        }
                    }
                }
            
            })

            if(nombre===null){
                handleOpenInfo("Usuario y/o contraseña incorrectos o no con cuentas con las permisos");

            }else{
                consultarTipificaciones(nombre,1);
            }

        }else{
            handleOpenInfo("Favor de validar los campos de usuario y contraseña");
        }
    }

    const consultarTipificaciones=(nombre,tipo)=>{
        servicio.consumirServiciosGET("service/operacion/tipificaciones/consultarTipificaciones").then(
            data=>{
                if(data.code===1){
                    setTipificaciones(data.data)
                }
            }
        )

        if(tipo===1){
            handleOpenInfo("Bienvenid@ "+nombre);
            setLogin(true);
        }
    }

    const handleOnChangeIdTipificacion=(event)=>{
        setTipificacionText(event.target.value);
    }

    const handleOnChangeValor=(event)=>{
        setValorTipi(event.target.value);
    }

    const insertarTipificacion=()=>{
        if(tipificacionText!==null&&valorTipi!==null){
            let endPoint="service/operacion/tipificaciones/insertarTipificaciones"
            let json={
                "tipificacion":tipificacionText,
                "valor":valorTipi,
                "inserto":idLogin
            }

            servicio.consumirServicios(json,endPoint).then(
                data=>{
                    if(data.code===1){
                        handleOpenInfo("Se inserto correctamente la tipificacion");
                        consultarTipificaciones("",0)
                    }else{
                        handleOpenInfo("No se inserto correctamente la tipificacion");
                    }
                }
            )
        }else{
            handleOpenInfo("Favor de revisar que los campos esten llenos");
        }
    }

    const actualizarTipificacion=()=>{
        if(idTipificacion!==null&&tipificacionText!==null&&valorTipi!==null){
            let endPoint="service/operacion/tipificaciones/actualizarTipificaciones"
            let json={
                "id":idTipificacion,
                "tipificacion":tipificacionText,
                "valor":valorTipi,
                "actualizo":idLogin
            }

            servicio.consumirServicios(json,endPoint).then(
                data=>{
                    if(data.code===1){
                        handleOpenInfo("Se actualizó correctamente la tipificacion");
                        consultarTipificaciones("",0)
                    }else{
                        handleOpenInfo("No se actualizó correctamente la tipificacion");
                    }
                }
            )

        }else{
            handleOpenInfo("Favor de revisar que los campos esten llenos seleccionando una tipificacion");
        }
    }

    const borrarTipificacion=()=>{
        if(idTipificacion!==null){
            servicio.consumirServiciosGET("service/operacion/tipificaciones/borrarTipificaciones/"+idTipificacion+"/"+idLogin).then(
                data=>{
                    if(data.code===1){
                        handleOpenInfo("Tipificacion borrada correctamente"); 
                        consultarTipificaciones("",0)
                    }
                    else{
                        handleOpenInfo("No se borro la tipificacion"); 
                    }
                }
            )
        }else{
            handleOpenInfo("Favor de revisar que los campos esten llenos seleccionando una tipificacion");
        }
    }

    const handleRowClick = (params) => {
        setIdTipificacion(params.row.id);
        setTipificacionText(params.row.tipificacion);
        setValorTipi(params.row.valor);

        document.getElementById("tipificacionTextField").value=params.row.tipificacion;
        document.getElementById("accionTextField").value=params.row.valor;
        

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
                        Revisar Tipificaciones
                    </h1>
                </Grid>
            </Grid>
            <br/>
            <Grid container spacing={1}>
                <Grid item xl={4} lg={4} md={4} sm={4} hidden={login} />
                <Grid item xl={4} lg={4} md={4} sm={4} style={{textAlign:'center'}} hidden={login}>
                    <TextField 
                        id="idTKM" 
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
            </Grid>

            <br/>
            <Grid container spacing={1}>
                <Grid item xl={1} lg={1} md={1} sm={1} hidden={!login} />
                <Grid item xl={2} lg={2} md={2} sm={2} hidden={!login}>
                    <TextField 
                        id="tipificacionTextField" 
                        label="tipificacion" 
                        onChange={handleOnChangeIdTipificacion}
                    />
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} hidden={!login}>
                    <TextField 
                        id="accionTextField" 
                        label="accion" 
                        type="number"
                        onChange={handleOnChangeValor}
                    />            
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} hidden={!login}>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        style={{height:"50px",width:"200px"}}                        
                        onClick={()=>{insertarTipificacion()}}

                    >
                        Insertar
                    </Button> 
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} hidden={!login}>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        style={{height:"50px",width:"200px"}}                        
                        onClick={()=>{actualizarTipificacion()}}

                    >
                        Actualizar
                    </Button>           
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} hidden={!login}>
                    <Button
                        variant="contained"
                        color="error"
                        size="large"
                        style={{height:"50px",width:"200px"}}                        
                        onClick={()=>{borrarTipificacion()}}

                    >
                        Borrar
                    </Button>  
                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={1} hidden={!login} />
            </Grid>

            <br/>
            <Grid container spacing={1}>
                <Grid item xl={1} lg={1} md={1} sm={1} hidden={!login} />
                <Grid item xl={10} lg={10} md={10} sm={10} hidden={!login}>
                    <DataGrid
                        id="tablaTipificaciones"
                        rows={tipificaciones}
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
                <Grid item xl={1} lg={1} md={1} sm={1} hidden={!login} />
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
            </div>
        


        </div>
    )

}