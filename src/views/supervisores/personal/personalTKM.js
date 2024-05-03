import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Servicios from '../../../services/servicios';
import DescargaExcel from "../../descargarExcel";
// import {Table , TableHead, TableCell, TableBody, TableRow} from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit'; 
// import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from '@mui/material';
import {ModalInfo,ModalInsertarGestores,ModalSiNo} from '../../../services/modals';
import { DataGrid } from "@mui/x-data-grid";
import DownloadIcon from '@mui/icons-material/Download';


const servicio=new Servicios();
const descargarExcel=new DescargaExcel();

const columnas=[
    { 
        field: 'id', 
        headerName: 'ID', 
        width: 100 
    },
    {
        field:"idSCL",
        headerName: "ID SCL",
        width:100,
        editable:false, 
    },
    {
        field:"nombreGestor",
        headerName: "Nombre de Gestor",
        width:500,
        editable:false, 
    },
    {
        field:"puesto",
        headerName: "Nombre de Gestor",
        width:150,
        editable:false, 
    },
    {
        field:"turno",
        headerName: "Turno",
        width:150,
        editable:false, 
    },
    {
        field:"estado",
        headerName: "Estado",
        width:150,
        editable:false, 
    },
]

export default class PersonalTKM extends React.Component{
    constructor(props){
        super(props);
    
        this.state={
            personal:props.personal,
            personal2:props.personal2,
            idSuper:props.idSuper,
            personalTabla:[],
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

            ],
            estadoOpciones:[
                {
                    id:0,
                    valor:"Inhabilitado",
                },
                {
                    id:1,
                    valor:"Habilitado",
                },
            ]
        }
    }

    componentWillMount(){
        let arreglos=[];
        
        this.props.personal2.forEach(function(element){
            console.log(element);
            let arreglo={
                "id":element.idTkm,
                "idSCL":element.idGestor,
                "nombreGestor":element.nombreGestor,
                "puesto":element.puesto===1?"Administrativo":element.puesto===2?"Supervisor":"Gestor",
                "turno":element.turno===null?"Sin turno":element.turno==="C"?"Completo":element.turno==="M"?"Matutino":element.turno==="V"?"Vespertino":"",
                "estado":element.estado===1?"Habilitado":"Inhabilitado"
            }

            arreglos.push(arreglo);
        })


        this.setState({
            personalTabla:arreglos
        })

    }


    render(){
        return(
            <div>
                <VisualizarPersonalTKM
                    personalTKM={this.state.personal}
                    personalTKM2={this.state.personal2}
                    idSuper={this.state.idSuper}
                    puesto={this.state.opciones}
                    turno={this.state.turno}
                    actualizarPersonal={this.props.actualizarPersonal}
                    personalTabla={this.state.personalTabla}
                    estadoOpciones={this.state.estadoOpciones}
                />

            </div>        
        )
    }
}


const VisualizarPersonalTKM=(props)=>{
    
    const [idTKMActualizar, setIdTKMActualizar]=useState(null);
    const [idSCLActualizar, setIdSCLActualizar]=useState(null);
    const [nombreActualizar, setNombreActualizar]=useState(null);
    const [passwordActualizar, setPasswordActualizar]=useState(null);
    const [puestoActualizar, setPuestoActualizar]=useState(null);
    const [idRegistro, setIdRegistro]=useState(null);
    const [idActualizo, setIdActualizo]=useState(null);
    const [turnoActualizar,setTurnoActualizar]=useState(null);
    const [estadoActualiazar,setEstadoActualizar]=useState(null);

    const [openModalActualizar, setOpenModalActualizar]= React.useState(false);
    const [openModalBorrar, setOpenModalBorrar]= React.useState(false);
    const [mensajeModalSiNo,setMensajeModalSiNo]=useState(null);

    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const [mensajeModalInfo, setMensajeModalInfo]=useState(null);


    const handleOpenActualizar=()=>{
        setOpenModalActualizar(true);
    }

    const handleCloseActu=()=>{
        setOpenModalActualizar(false);
    }


    const handleOpenInfo = (mensaje) => {
        setMensajeModalInfo(mensaje);
        setOpenModalInfo(true);
    };

    const handleCloseInfo = () => {
        setOpenModalInfo(false);
    };



    const handleOpenBorrar=(mensaje)=>{
        setMensajeModalSiNo(mensaje);
        setOpenModalBorrar(true);
    }

    const handleCloseBorrar = () => {
        setOpenModalBorrar(false);
    };
    
    
    const handleOnChangeNombre=(event)=>{
        setNombreActualizar(event.target.value);
    }

    const handleOnChangePass=(event)=>{
        setPasswordActualizar(event.target.value);
    }

    const handleOnChangePuesto=(event,newValue)=>{
        if(newValue===null){
            setPuestoActualizar(null);
        }
        else{
            setPuestoActualizar(newValue.id)
        }
        
    }

    
    const handleOnChangeTurno=(event,newValue)=>{
        if(newValue===null){
            setTurnoActualizar(null);
        }
        else{
            setTurnoActualizar(newValue.id);
        }
        
    }
    
    const handleOnChangeEstado=(event,newValue)=>{
        if(newValue===null){
            setEstadoActualizar(null);
        }
        else{
            setEstadoActualizar(newValue.id);
        }
    }



    // const handleOnClickActualizarGestores=(datos)=>{

    //     setIdTKMActualizar(datos.idTkm);
    //     setIdSCLActualizar(datos.idGestor);
    //     setNombreActualizar(datos.nombreGestor);
    //     setPasswordActualizar(datos.password);
    //     setPuestoActualizar(datos.puesto);
    //     setIdRegistro(datos.idRegistro);
    //     setIdActualizo(props.idSuper)
    //     setTurnoActualizar(datos.turno)
    //     handleOpenActualizar();

    // }

    const handleCloseActualizar=()=>{
        if(nombreActualizar!==null&&passwordActualizar!==null&&puestoActualizar!==null&&turnoActualizar!==null&&estadoActualiazar!==null){
            let endPoint="service/gestores/actualizarGestorTKM";
            let json={
                "idGestor": String(idSCLActualizar),
                "nombreGestor":nombreActualizar,
                "password": passwordActualizar,
                "idTkm": parseInt(idTKMActualizar),
                "puesto": parseInt(puestoActualizar),
                "idActualizo": parseInt(idActualizo),
                "turno":turnoActualizar,
                "estado":parseInt(estadoActualiazar),
            }

            servicio.consumirServicios(json,endPoint).then(
                data=>{
                    if(data.code===1){
                        setOpenModalActualizar(false);
                        handleOpenInfo("Registro actualizado Correctamente");
                        // props.actualizarPersonal(0)
                        props.actualizarPersonal(3)
                    }
                    else{
                        handleOpenInfo("No se actualizo el registro");
                    }
                }
            )
        }
        else{
            handleOpenInfo("Favor de colocar una contraseña, elegir puesto o turno");
        }
    }


    const handleOnClickBorrarGestores=(datos)=>{
            setIdTKMActualizar(datos.idTkm);
            handleOpenBorrar("¿Desea borrar a "+datos.nombreGestor+"?")
    }

    const handleOnClickBorrar=()=>{
        let endPoint="service/gestores/borrarGestorTKM/"+idTKMActualizar;
        servicio.consumirServiciosGET(endPoint).then(
            data=>{
                if(data.code===1){
                    setOpenModalBorrar(false)
                    handleOpenInfo("Registro borrado Correctamente");
                }
                else{
                    handleOpenInfo("No se pudo borrar el registro");
                }
            }
        )
    }

    const handleRowClick = (params) => {
    
        console.log(params)
        console.log(props)
        props.personalTKM2.forEach(function(element){
        
            if(params.id===element.idTkm){
                setIdTKMActualizar(element.idTkm);
                setIdSCLActualizar(element.idGestor);
                setNombreActualizar(element.nombreGestor);
                setPasswordActualizar(element.password);
                setPuestoActualizar(element.puesto);
                setIdActualizo(props.idSuper)
                setTurnoActualizar(element.turno)
                setEstadoActualizar(element.estado)
            }

        })

        handleOpenActualizar();
    
    }
    
    const handleClickDescargar=()=>{
        let archivo=descargarExcel.descargarExcel(props.personalTabla,"Gestores");
        if(archivo!==null){
            handleOpenInfo("El archivo se descargo correctamente");
        }
        console.log(archivo);
    }



    return(
        <div>
            <br/>
            {/* <Grid container spacing={1}>
                <Grid item xl={.5} lg={.5} md={.5} sm={.5}></Grid> 
                <Grid item xl={11} lg={11} md={11} sm={11} style={{textAlign:'center'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id_SCL</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Puesto</TableCell>
                                <TableCell>Turno</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>                            
                            {
                                props.personalTKM.map(event=>(
                                    <TableRow key={event.idTkm}>
                                        <TableCell>{event.idGestor}</TableCell>
                                        <TableCell>{event.nombreGestor}</TableCell>
                                        <TableCell>{event.puesto===1?"Administrativo": event.puesto===2?"Supervisor":"Gestor"}</TableCell>                               
                                        <TableCell>{event.turno===null?"Sin turno":event.turno==="C"?"Completo":event.turno==="M"?"Matutino":event.turno==="V"?"Vespertino":""}</TableCell>
                                        <TableCell>
                                            <Button
                                                startIcon={<EditIcon /> }                                     
                                                onClick={()=>handleOnClickActualizarGestores(event)}
                                            />
                                            &nbsp; 
                                            <Button
                                                startIcon={<DeleteIcon /> }                                     
                                                onClick={()=>handleOnClickBorrarGestores(event)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xl={.5} lg={.5} md={.5} sm={.5}></Grid>
            </Grid> */}
                
            <Grid container spacing={1} >
                
                <Grid item xl={.5} lg={.5} md={.5} sm={.5}/>

                <Grid item xl={11} lg={11} md={11} sm={11}>
                    <DataGrid
                        id="tablaDatosPP"
                        rows={props.personalTabla}
                        columns={columnas}
                        pageZise={5}
                        onRowClick={handleRowClick}
                        initialState={{
                            pagination: {
                              paginationModel: { page: 0, pageSize: 10 },
                            },
                          }}
                          pageSizeOptions={[10, 15]}
              
                    />

                </Grid>

                <Grid item xl={.5} lg={.5} md={.5} sm={.5}/>

            </Grid>
            <br/>
            <Grid container spacing={1}>            
                <Grid item xl={5} lg={5} md={5} sm={5}/>
                <Grid item xl={2} lg={2} md={2} sm={2} style={{textAlign:'center'}}>
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
                <Grid item xl={5} lg={5} md={5} sm={5}/>
            </Grid>    
            <div>
                <ModalInfo open={openModalInfo} handleClose={handleCloseInfo} mensaje={mensajeModalInfo} /> 
                <ModalSiNo open={openModalBorrar} handleClose={handleCloseBorrar} mensaje={mensajeModalSiNo} handleCloseSi={handleOnClickBorrar} />
                <ModalInsertarGestores 
                    open={openModalActualizar} 
                    handleClose={handleCloseActu} 
                    idInsertar={idSCLActualizar} 
                    nombreInsertar={nombreActualizar} 
                    puesto={props.puesto} 
                    turno={props.turno}
                    estadoOpciones={props.estadoOpciones}
                    estado={estadoActualiazar}
                    handleOnChangePass={handleOnChangePass} 
                    handleCloseInsertar={handleCloseActualizar} 
                    handleOnChangePuesto={handleOnChangePuesto}
                    handleOnChangeTurno={handleOnChangeTurno} 
                    handleOnChangeEstado={handleOnChangeEstado}
                    // handleOnChangeBorrar={}
                    insertAct={2} 
                    password={passwordActualizar}
                    handleOnChangeNombre={handleOnChangeNombre}
                    
                    />
            </div>
        </div>

        
    )

}
