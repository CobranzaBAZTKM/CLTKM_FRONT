import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Servicios from '../../../services/servicios';
import {Table , TableHead, TableCell, TableBody, TableRow} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; 
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from '@mui/material';
import {ModalInfo,ModalInsertarGestores,ModalSiNo} from '../../../services/modals';


const servicio=new Servicios();

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
                <VisualizarPersonalTKM
                    personalTKM={this.state.personal}
                    idSuper={this.state.idSuper}
                    puesto={this.state.opciones}
                    turno={this.state.turno}
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
            setTurnoActualizar(newValue.id)
        }
        
    }
    



    const handleOnClickActualizarGestores=(datos)=>{

        setIdTKMActualizar(datos.idTkm);
        setIdSCLActualizar(datos.idGestor);
        setNombreActualizar(datos.nombreGestor);
        setPasswordActualizar(datos.password);
        setPuestoActualizar(datos.puesto);
        setIdRegistro(datos.idRegistro);
        setIdActualizo(props.idSuper)
        setTurnoActualizar(datos.turno)
        handleOpenActualizar();

    }

    const handleCloseActualizar=()=>{
        if(nombreActualizar!==null&&passwordActualizar!==null&&puestoActualizar!==null&&turnoActualizar!==null){
            let endPoint="service/gestores/actualizarGestorTKM";
            let json={
                "idGestor": String(idSCLActualizar),
                "nombreGestor":nombreActualizar,
                "password": passwordActualizar,
                "idTkm": parseInt(idTKMActualizar),
                "puesto": parseInt(puestoActualizar),
                "idRegistro": parseInt(idRegistro),
                "idActualizo": parseInt(idActualizo),
                "turno":turnoActualizar
            }

            servicio.consumirServicios(json,endPoint).then(
                data=>{
                    if(data.code===1){
                        setOpenModalActualizar(false);
                        handleOpenInfo("Registro actualizado Correctamente");
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



    return(
        <div>
            <br/>
            <Grid container spacing={1}>
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
                    handleOnChangePass={handleOnChangePass} 
                    handleCloseInsertar={handleCloseActualizar} 
                    handleOnChangePuesto={handleOnChangePuesto}
                    handleOnChangeTurno={handleOnChangeTurno} 
                    insertAct={2} 
                    password={passwordActualizar}
                    handleOnChangeNombre={handleOnChangeNombre}
                    
                    />
            </div>
        </div>

        
    )

}
