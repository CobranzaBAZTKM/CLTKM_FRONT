import React,{useState} from "react";
import {TextField, Button, Grid,Autocomplete} from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {ModalEspera,ModalInfo} from '../../services/modals';
import { useNavigate  } from "react-router-dom";
import Servicios from '../../services/servicios';
import { DataGrid } from "@mui/x-data-grid";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const servicio=new Servicios();

const columnas=[
    { 
        field: 'id', 
        headerName: 'ID', 
        width: 15
    },
    { 
        field: 'cliente_UNICO', 
        headerName: 'Cliente Unico', 
        width: 200,
        editable:false,
    },
    {
        field:"nombre_CTE",
        headerName: "Nombre Titular",
        width:300,
        editable:false,
    },
    {
        field:"saldo_TOTAL",
        headerName: "Saldo Total",
        width:200,
        editable:false,
    },
    {
        field:"telefono1",
        headerName: "Telefono 1",
        width:200,
        editable:false,
    },
    {
        field:"telefono2",
        headerName: "Telefono 2",
        width:200,
        editable:false,
    },
    {
        field:"telefono3",
        headerName: "Telefono 3",
        width:200,
        editable:false,
    },
    {
        field:"telefono4",
        headerName: "Telefono 4",
        width:200,
        editable:false,
    },
    {
        field:"tipocarteratkm",
        headerName: "Tipo Cartera",
        width:300,
        editable:false,
    }

 ]

export default class BuscarTitularesNumero extends React.Component{

    render(){
        return(
            <div>
                <Consulta/>
            </div>
        )
    }
}


const Consulta=()=>{

    const navigate = useNavigate();

    const [telefonoBus, setTelefonoBus]=useState(null);
    const [resultadosTabla,setResultadosTabla]=useState([]);
    const [mostrarTabla,setMostrarTabla]=useState(true);

    const [openModalCargando, setOpenModalCargando] = React.useState(false);
    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const [mensajeModalInfo, setMensajeModalInfo]=useState(null);

    const handleOpenCargando = () => {
        setOpenModalCargando(true);
    };
    const handleCloseCargando = () => {
        setOpenModalCargando(false);
    };

    const handleOpenInfo = (mensaje) => {
        setMensajeModalInfo(mensaje);
        setOpenModalInfo(true);
    };
    const handleCloseInfo = () => {
        setOpenModalInfo(false);
    };

    const handleOnChangeTelefono=(event)=>{
        setTelefonoBus(event.target.value);
    }

    const onClickBuscarTitular=()=>{
        if(telefonoBus!==null||telefonoBus!==""){
            if(telefonoBus.length===10){
                handleOpenCargando();
                servicio.consumirServiciosGET("service/carteraLocal/consultarTitularPorNumero/"+telefonoBus).then(
                    data=>{
                        if(data.code===1){
                            let vienData=data.hasOwnProperty('data')
                            if(vienData===true){
                                if(data.data.length>0){
                                    
                                    let res=[]
                                    let bandera=1;
                                    data.data.forEach(function(element){
                                        let json={
                                            "id":bandera,
                                            "cliente_UNICO":element.cliente_UNICO,
                                            "nombre_CTE":element.nombre_CTE,
                                            "saldo_TOTAL":element.saldo_TOTAL,
                                            "telefono1":element.telefono1,
                                            "telefono2":element.telefono2,
                                            "telefono3":element.telefono3,
                                            "telefono4":element.telefono4,
                                            "tipocarteratkm":element.tipocarteratkm
                                        }
                                        res.push(json);
                                        bandera=bandera+1;
                                    })

                                    setResultadosTabla(res);
                                    setMostrarTabla(false);
                                    handleCloseCargando();
                                }
                                else{
                                    handleCloseCargando();
                                    handleOpenInfo("No se obtuvieron datos del numero, favor de validar y volver a intentar");
                                }
                            }
                            else{
                                handleCloseCargando();
                                handleOpenInfo("No se obtuvieron datos del numero, favor de validar y volver a intentar");
                            }
                        }else{
                            handleCloseCargando();
                            handleOpenInfo("Ocurrio algo inesperado Favor de volver a intentar");
                        }
                    }
                )
            }else{
                handleOpenInfo("Favor de validar que el numero sea mayor a 10");
            }
        }else{
            handleOpenInfo("Favor de validar que se haya colocado el numero correctamente");
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
                        Busqueda de Titulares Por Numero
                    </h1>
                </Grid>
            </Grid>
            <br/><br/>
            <Grid container spacing={1}>
                <Grid item xl={4} lg={4} md={4} sm={4}/>
                <Grid item xl={4} lg={4} md={4} sm={4} style={{textAlign:'center'}}>
                    <TextField 
                        id="telefono" 
                        label="Telefono" 
                        type="number"
                        onChange={handleOnChangeTelefono}
                    />
                
                    <br/><br/>

                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        style={{height:"50px",width:"200px"}}    
                        startIcon={<ManageSearchIcon style={{height:"40px",width:"50px"}} />}                    
                        onClick={()=>{onClickBuscarTitular()}}

                    >
                        Buscar Titular               
                    </Button>
                    <br/>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4}/>
            </Grid>
            <br/>
            <Grid container spacing={1}>
                <Grid item xl={1} lg={1} md={1} sm={1} hidden={mostrarTabla} />
                <Grid item xl={10} lg={10} md={10} sm={10} hidden={mostrarTabla}>
                    <DataGrid
                        id="tablaResultados"
                        rows={resultadosTabla}
                        columns={columnas}
                        pageZise={5}
                        // onRowClick={handleRowClick} 
                        initialState={{
                            pagination: {
                              paginationModel: { page: 0, pageSize: 5 },
                            },
                          }}
                          pageSizeOptions={[5, 10]}
              
                    />
                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={1} hidden={mostrarTabla} />
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



            <ModalEspera open={openModalCargando} handleClose={handleCloseCargando} />
            <ModalInfo open={openModalInfo} handleClose={handleCloseInfo} mensaje={mensajeModalInfo} />

        </div>
    )
}