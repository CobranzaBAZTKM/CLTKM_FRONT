import React from "react";

import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; //pagos
import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined'; //Base
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone'; //Blaster
import Diversity3Icon from '@mui/icons-material/Diversity3'; //Asignar Gestores Masivo
import AddchartIcon from '@mui/icons-material/Addchart';
import Grid from '@mui/material/Grid';
import { Button } from "@mui/material";
import { useNavigate  } from "react-router-dom"
import AssignmentIcon from '@mui/icons-material/Assignment';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';


export default class Menu extends React.Component{
    render(){
        return(
            // <div style={{width:15, height:15}}>
            <div>
                <br/><br/><br/><br/>
                <Opciones/>
            </div>


        )
    }
}

const Opciones=(props)=>{
    const navigate = useNavigate()
    const handleClick=(opcion)=>{
        if(opcion===1){
            navigate("/CLTKM_FRONT/supervisores/bajarCartera");
        }
        else if(opcion===2){

        }
        else if(opcion===3){
            navigate("/CLTKM_FRONT/supervisores/reportePagos");
        }
        else if(opcion===4){
            navigate("/CLTKM_FRONT/supervisores/tipificaciones");
        }
        else if(opcion===5){
            navigate("/CLTKM_FRONT/supervisores/personal");
        }
        else if(opcion===6){
            navigate("/CLTKM_FRONT/supervisores/revisarPP");
        }
        else if(opcion===7){
            navigate("/CLTKM_FRONT/supervisores/gestiones")
        }
    }

    return(
        <div>

            <Grid container spacing={1}>
                <Grid item xl={2} lg={2} md={2} sm={2}></Grid>
                <Grid item xl={2} lg={2} md={2} sm={2}>                    
                    <Button
                        variant="outlined"
                        size="large"
                        color="success"
                        style={{height:"120px",width:"200px"}}
                        startIcon={<AutoAwesomeMotionOutlinedIcon style={{height:"40px",width:"50px"}} />}
                        onClick={()=>{
                            handleClick(1);
                        }}
                    >
                        Descargar base
                    </Button>
                </Grid> 
                <Grid item xl={1} lg={1} md={1} sm={1}></Grid>
                <Grid item xl={2} lg={2} md={2} sm={2}>
                    <Button
                        variant="outlined"
                        size="large"
                        color="success"
                        style={{height:"120px",width:"200px"}}
                        startIcon={<CallTwoToneIcon style={{height:"40px",width:"50px"}} />}
                    >
                        Blaster
                    </Button>
                </Grid> 
                <Grid item xl={1} lg={1} md={1} sm={1}></Grid>
                <Grid item xl={2} lg={2} md={2} sm={2}>
                    <Button
                        variant="outlined"
                        size="large"
                        color="success"
                        style={{height:"120px",width:"200px"}}
                        startIcon={<AttachMoneyIcon style={{height:"40px",width:"50px"}} />}
                        onClick={()=>{
                            handleClick(3);
                        }}
                    >
                        Descargar Reporte de Pagos
                    </Button>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2}></Grid>                    
            </Grid>
            <br/><br/><br/><br/>
            <Grid container spacing={1}>
                <Grid item xl={2} lg={2} md={2} sm={2}></Grid>
                <Grid item xl={2} lg={2} md={2} sm={2}>
                    <Button
                        variant="outlined"
                        size="large"
                        color="success"
                        style={{height:"120px",width:"200px"}}
                        startIcon={<AssignmentIcon style={{height:"40px",width:"50px"}} />}
                        onClick={()=>{
                            handleClick(4);
                        }}
                    >
                        Tipificaciones
                    </Button>
                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={1}></Grid>
                <Grid item xl={2} lg={2} md={2} sm={2}>
                    <Button
                        variant="outlined"
                        size="large"
                        color="success"
                        style={{height:"120px",width:"200px"}}
                        startIcon={<AddchartIcon style={{height:"40px",width:"50px"}} />}
                        onClick={()=>{
                            handleClick(6);
                        }}
                    >
                        Revisar Planes Pago Gestores
                    </Button>
                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={1}></Grid>
                <Grid item xl={2} lg={2} md={2} sm={2}>
                    <Button
                        variant="outlined"
                        size="large"
                        color="success"
                        style={{height:"120px",width:"200px"}}
                        startIcon={<Diversity3Icon style={{height:"40px",width:"50px"}} />}
                        onClick={()=>{
                            handleClick(5);
                        }}
                    >
                        Personal Banco Azteca Cobranza Legal TKM
                    </Button>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2}></Grid>
            </Grid>
            <br/><br/><br/><br/>
            <Grid container spacing={1}>
                <Grid item xl={2} lg={2} md={2} sm={2}/>
                <Grid item xl={2} lg={2} md={2} sm={2}></Grid>
                <Grid item xl={1} lg={1} md={1} sm={1}/>
                <Grid item xl={2} lg={2} md={2} sm={2}>
                    <Button
                        variant="outlined"
                        size="large"
                        color="success"
                        style={{height:"120px",width:"200px"}}
                        startIcon={<AppRegistrationIcon style={{height:"40px",width:"50px"}} />}
                        onClick={()=>{
                            handleClick(7);
                        }}
                    >
                        Consultar Gestiones Llamadas
                    </Button>
                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={1}/>
                <Grid item xl={2} lg={2} md={2} sm={2}></Grid>
                <Grid item xl={2} lg={2} md={2} sm={2}/>
            </Grid>
            <br/><br/><br/><br/>
        </div>
    )
}




