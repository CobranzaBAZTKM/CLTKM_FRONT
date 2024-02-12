import * as React from 'react';
import {Button, Grid} from '@mui/material';
import AddchartIcon from '@mui/icons-material/Addchart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate  } from "react-router-dom"

export default class MenuGestores extends React.Component{
    render(){
        return(            
            <div>
                <br/><br/><br/><br/>
                <OpcionesGestores/>
            </div>


        )
    }
}

const OpcionesGestores=()=>{
    const navigate = useNavigate()
    const handleClick=(opcion)=>{
        if(opcion===1){
            navigate("/CLTKM_FRONT/gestores/revisarPPGestor");
        }else if(opcion===2){
            navigate("/CLTKM_FRONT/gestores/insertarPlanPago");
        }
    }
    return(
        <div>
            <Grid container spacing={1}>
                <Grid item xl={3.5} lg={3.5} md={3.5} sm={3.5}/>
                <Grid item xl={2} lg={2} md={2} sm={2}>
                    <Button
                        variant="outlined"
                        size="large"
                        color="success"
                        style={{height:"120px",width:"200px"}}
                        startIcon={<AddchartIcon style={{height:"40px",width:"50px"}} />}
                        onClick={()=>{
                            handleClick(1);
                        }}
                    >
                        Revisar Planes Pago
                    </Button>
                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={1}/>
                <Grid item xl={2} lg={2} md={2} sm={2}>
                    <Button
                        variant="outlined"
                        size="large"
                        color="success"
                        style={{height:"120px",width:"200px"}}
                        startIcon={<AttachMoneyIcon style={{height:"40px",width:"50px"}} />}
                        onClick={()=>{
                            handleClick(2);
                        }}
                    >
                        Insertar Plan de Pagos
                    </Button>
                </Grid>
                <Grid item xl={3.5} lg={3.5} md={3.5} sm={3.5}/>
            </Grid>
        </div>
    )

}