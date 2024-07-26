import React,{useState} from "react";
import Grid from '@mui/material/Grid';
import {TextField, Button,FormControl,InputLabel,OutlinedInput,IconButton} from '@mui/material';
import Servicios from '../../services/servicios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {ModalEspera,ModalInfo} from '../../services/modals';
import PersonalSCL from './personal/personalSCL';
import PersonalTKM from './personal/personalTKM';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate  } from "react-router-dom";

const servicio=new Servicios();

export default class PersonalBazTkm extends React.Component{
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
                    this.setState({
                        personal:data.data
                    })
                }
            }
        )
    }

    render(){
        if(this.state.personal.length>0){
            return(
                <div>
                    <RevisarPersonal
                        personal={this.state.personal}
                    />
                </div>
            )
        }
        else{
            return(
                <></>
            )
        }
    }

}

const RevisarPersonal=(props)=>{

    const navigate = useNavigate();

    const [banderaSclTkm, setBanderaSclTkm]=useState(1);
    const [opciones, setOpciones]=useState(true);
    const [login, setLogin]=useState(false);
    const [idLogin, setIdLogin]=useState(null);
    const [passLogin, setPassLogin]=useState(null);

    const [showPassword, setShowPassword] = React.useState(false);

    const [openModal, setOpenModal] = React.useState(false);
    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const [mensajeModalInfo, setMensajeModalInfo]=useState(null);

    const [gestoresTKM, setGestoresTKM]= React.useState([]);
    
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
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickOpcionPersonal=(opcion)=>{
        setBanderaSclTkm(0);
        servicio.consumirServiciosGET("service/gestores/consultarGestoresTKM").then(
            data=>{
                if(data.code===1){
                    setGestoresTKM(data.data);
                }
                
                setBanderaSclTkm(opcion);
            }
        )
        // setBanderaSclTkm(opcion);
    }

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
                            if(element.estado===1){
                                nombre=element.nombreGestor;
                            }
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
                handleClose();
                handleOpenInfo("Bienvenid@ "+nombre);
                setLogin(true);
                setOpciones(false);
            }

        }else{
            handleClose();
            handleOpenInfo("Favor de validar los campos de usuario y contraseña");
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
                        Consultar Personal
                    </h1>
                </Grid>
            </Grid>
            <br/>
            <Grid container spacing={1} >
                <Grid item xl={2} lg={2} md={2} sm={2} ></Grid>
                <Grid item xl={8} lg={8} md={8} sm={8} style={{textAlign:'center'}} hidden={login}>
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
                <Grid item xl={1} lg={1} md={1} sm={1} style={{textAlign:'center'}} hidden={opciones}/>
                <Grid item xl={2} lg={2} md={2} sm={2} style={{textAlign:'center'}} hidden={opciones}>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        style={{height:"60px",width:"200px"}}                        
                        onClick={()=>{handleClickOpcionPersonal(2)}}
                    >
                        Personal de SCL
                    </Button> 
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} style={{textAlign:'center'}} hidden={opciones}>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        style={{height:"60px",width:"200px"}}                        
                        onClick={()=>{handleClickOpcionPersonal(4)}}

                    >
                        Personal de TKM Activos
                    </Button> 
                </Grid>    
                <Grid item xl={2} lg={2} md={2} sm={2} style={{textAlign:'center'}} hidden={opciones}>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        style={{height:"60px",width:"200px"}}                        
                        onClick={()=>{handleClickOpcionPersonal(3)}}

                    >
                        Personal de TKM Historial
                    </Button> 
                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={1} style={{textAlign:'center'}} hidden={opciones}/>    
                <Grid item xl={2} lg={2} md={2} sm={2} ></Grid> 
            </Grid>
            {banderaSclTkm===2?
                (
                <div>
                    <PersonalSCL
                       personal={props.personal} 
                       idSuper={idLogin}
                    />
                </div>):
                banderaSclTkm===3?
                (
                <div>
                    <PersonalTKM
                        personal={props.personal} 
                        personal2={gestoresTKM}
                        idSuper={idLogin}
                        actualizarPersonal={handleClickOpcionPersonal}
                        activos={0}
                    />
                </div>
                ):
                banderaSclTkm===4?
                (
                <div>
                    <PersonalTKM
                        personal={props.personal} 
                        personal2={gestoresTKM}
                        idSuper={idLogin}
                        actualizarPersonal={handleClickOpcionPersonal}
                        activos={1}
                    />
                </div>
                ):
                (<></>)
            }

            <Grid container spacing={1} >
                <Grid item xl={.5} lg={.5} md={.5} sm={.5} />
                <Grid item xl={2} lg={2} md={2} sm={2} >
                    <ArrowBackIcon
                        style={{height:"80px",width:"200px"}}
                        onClick={()=>{handleClickRegresasr()}}
                    />
                </Grid>
                <Grid item xl={9.5} lg={9.5} md={9.5} sm={9.5} />
            </Grid>


            <div>
                <ModalEspera open={openModal} handleClose={handleClose} />
                <ModalInfo open={openModalInfo} handleClose={handleCloseInfo} mensaje={mensajeModalInfo} />
            </div>

        </div>
    )
}



