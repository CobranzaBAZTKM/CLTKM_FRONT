import React,{useState} from "react";
import Grid from '@mui/material/Grid';
import {TextField, Button} from '@mui/material';
import Servicios from '../../../services/servicios';
import {ModalEspera,ModalInfo,ModalInsertarGestores} from '../../../services/modals';
import {Table , TableHead, TableCell, TableBody, TableRow} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; 
import DescargaExcel from "../../descargarExcel";
import DownloadIcon from '@mui/icons-material/Download';


const servicio=new Servicios();
const descargarExcel=new DescargaExcel();


export default class PersonalSCL extends React.Component{
    constructor(props){
        super(props);
    
        this.state={
            personal:props.personal,
            idSuper:props.idSuper,
            opciones:[
                {
                    id:1,
                    valor:"Administrativo"
                },
                {
                    id:2,
                    valor:"Supervisor"
                },
                {
                    id:3,
                    valor:"Gestor"
                }
            ],
            turno:[
                {
                    id:"C",
                    valor:"Completo"
                },
                {
                    id:"M",
                    valor:"Matutino"
                },
                {
                    id:"V",
                    valor:"Vespertino"
                }

            ]
        }
    }

    render(){
        return(
            <div>
                <VisualizarPersonalSCL
                    personalTKM={this.state.personal}
                    idSuper={this.state.idSuper}
                    puesto={this.state.opciones}
                    turno={this.state.turno}
                />

            </div>        
        )
    }
}

const VisualizarPersonalSCL=(props)=>{

    const [cokkie, setCokkie]=useState(null);
    const [mostrarTabla, setMostrarTabla]=useState(true)
    const [gestorSCL, setGestorSCL]=useState([])
    const [nombreInsertar, setNombreInsertar]=useState(null);
    const [idGestorSCLInsertar,setIdGestorSCLInsertar]=useState(null);
    const [passwordInsert, setPasswordInsert]=useState(null);
    const [puestoInsert, setPuestoInsert]=useState(null);
    const [turnoInsert,setTurnoInsert]=useState(null);
    const [idMitrol,setIdMitrol]=useState(null);
    const [idSCLVIP,setIdSCLVIP]=useState("");

    const [openModal, setOpenModal] = React.useState(false);
    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const [openModalInsert, setOpenModalInsert] = React.useState(false);
    const [mensajeModalInfo, setMensajeModalInfo]=useState(null);
    
    
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

    const handleOpenInsert=()=>{
        setOpenModalInsert(true);
    }

    const handleCloseInsert=()=>{
        setOpenModalInsert(false);
    }

    const handleOnChanceCookie=(event)=>{
        setCokkie(event.target.value);
    }

    const handleOnChangePass=(event)=>{
        setPasswordInsert(event.target.value);
    }
    

    const consultarGestoresSCL=()=>{
        handleOpen();
        if(cokkie!==null||cokkie===""){
            let endPoint="service/gestores/buscarGestoresSCL"
            let json={
                "cokkie":cokkie
            }

            servicio.consumirServicios(json,endPoint).then(
                data=>{
                    if(data.code===1){
                        setGestorSCL(data.data);
                        setMostrarTabla(false)
                        handleClose();
                    }else{
                        handleClose();
                        handleOpenInfo("No se obtuvieron los gestores de SCL favor de volver a intentar");
                    }
                }
            )
        }else{
            handleClose();
            handleOpenInfo("No se ha colocado la cokkie");
        }

    }

    const handleOnClickInsertarGestores=(datos)=>{
        let bandera=0;

        props.personalTKM.forEach(function(element){
            if(element.idGestor===String(datos.idGestor)){
                bandera=1;
            }
        });

        if(bandera===1){
            handleOpenInfo("El usuario ya se encuentra registrado");
        }else{
            setNombreInsertar(datos.nombreGestor);
            setIdGestorSCLInsertar(datos.idGestor);
            handleOpenInsert();
        }
    }

    const handleOnChangePuesto=(event,newValue)=>{
        if(newValue===null){
            setPuestoInsert(null);
        }
        else{
            setPuestoInsert(newValue.id)
        }
        
    }

    const handleOnChangeTurno=(event,newValue)=>{
        if(newValue===null){
            setTurnoInsert(null);
        }
        else{
            setTurnoInsert(newValue.id)
        }
        
    }

    const handleOnChangeIdMitrol=(event)=>{
        setIdMitrol(event.target.value);
    }

    const handleOnChangeIdSCLVIP=(event)=>{
        setIdSCLVIP(event.target.value);
    }

   

    const handleCloseInsertar=()=>{
        if(passwordInsert!==null&&puestoInsert!==null&&turnoInsert!==null&&idMitrol!==null){
            let endPoint="service/gestores/insertarGestorTKM"
            let json={
                "idGestor": idGestorSCLInsertar+"",
                "nombreGestor": nombreInsertar,
                "password": passwordInsert,
                "puesto": parseInt(puestoInsert),
                "idRegistro":parseInt(props.idSuper),
                "turno":turnoInsert,
                "idMitrol":idMitrol,
                "idGestorSCLVIP":idSCLVIP
            }

            

            servicio.consumirServicios(json,endPoint).then(
                data=>{
                    if(data.code===1){
                        setOpenModalInsert(false);
                        handleOpenInfo("Registro Insertado Correctamente");
                    }else{
                        handleOpenInfo("No se realizo el registro");
                    }
                }
            )

        }
        else{
            handleOpenInfo("Favor de colocar una contraseña, id de Mitrol, elegir puesto o turno");
        }
    }

    const handleClickDescargar=()=>{
        let archivo=descargarExcel.descargarExcel(gestorSCL,"Gestores_SCL");
        if(archivo!==null){
            handleOpenInfo("El archivo se descargo correctamente");
        }
        console.log(archivo);
    }

    return(
        <div>
            <br/> <br/>
            <Grid container spacing={1}>
                <Grid item xl={12} lg={12} md={12} sm={12} style={{textAlign:'center'}}> 
                {/* hidden={opciones}> */}
                    <TextField id="cokkie" label="Cokkie" variant="outlined" onChange={handleOnChanceCookie}/>
                    <br/> <br/>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        style={{height:"50px",width:"200px"}}                        
                        onClick={()=>{consultarGestoresSCL()}}

                    >
                        Buscar Gestores
                    </Button>  
                </Grid>                
            </Grid>
            <Grid container spacing={1}>
                <Grid item xl={.5} lg={.5} md={.5} sm={.5} hidden={mostrarTabla}></Grid>
                <Grid item xl={11} lg={11} md={11} sm={11} style={{textAlign:'center'}} hidden={mostrarTabla}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id_SCL</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Acciones TKM</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                gestorSCL.map(event=>(
                                    <TableRow key={event.idGestor}>
                                        <TableCell>{event.idGestor}</TableCell>
                                        <TableCell>{event.nombreGestor}</TableCell>
                                        <TableCell>
                                            <Button
                                                startIcon={<EditIcon /> }                                     
                                                onClick={()=>handleOnClickInsertarGestores(event)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                )
                                )
                            }
                        </TableBody>
                    </Table>
                </Grid>  
                <Grid item xl={.5} lg={.5} md={.5} sm={.5} hidden={mostrarTabla}></Grid>
            </Grid>
            <br/>
            <Grid container spacing={1}>            
                <Grid item xl={5} lg={5} md={5} sm={5} hidden={mostrarTabla} />
                <Grid item xl={2} lg={2} md={2} sm={2} style={{textAlign:'center'}} hidden={mostrarTabla}>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        style={{height:"50px",width:"245px"}}
                        startIcon={<DownloadIcon style={{height:"40px",width:"50px"}} />}
                        onClick={()=>{handleClickDescargar()}}
        
                    >
                        Descargar Archivo        
                    </Button>
                          

                </Grid>          
                <Grid item xl={5} lg={5} md={5} sm={5} hidden={mostrarTabla}/>
            </Grid>    
            <div>
                <ModalEspera open={openModal} handleClose={handleClose} />
                <ModalInfo open={openModalInfo} handleClose={handleCloseInfo} mensaje={mensajeModalInfo} />
                <ModalInsertarGestores 
                    open={openModalInsert} 
                    handleClose={handleCloseInsert} 
                    idInsertar={idGestorSCLInsertar} 
                    nombreInsertar={nombreInsertar} 
                    puesto={props.puesto} 
                    turno={props.turno}
                    handleOnChangePass={handleOnChangePass} 
                    handleCloseInsertar={handleCloseInsertar} 
                    handleOnChangePuesto={handleOnChangePuesto} 
                    handleOnChangeTurno={handleOnChangeTurno}
                    handleOnChangeIdMitrol={handleOnChangeIdMitrol}
                    handleOnChangeIdSCLVIP={handleOnChangeIdSCLVIP}
                    insertAct={1} 
                    password={""}
                    idMitrol={""}
                    idSCLVIP={""}
                />
            </div>
        </div>
    )

}