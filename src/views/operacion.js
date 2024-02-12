import React, { useState } from "react";
import IframeComm from "react-iframe-comm";
import Iframe from 'react-iframe'
import Grid from '@mui/material/Grid';
import Tarjeta from "./tarjeta";
// import Embed from 'react-embed';
import "../assests/estilos.css"
import DoneOutlineSharpIcon from '@mui/icons-material/DoneOutlineSharp';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from "@mui/material";

export default class Operacion extends React.Component{

    render(){
        return(
            <div>
                <Speeche/>
            </div>
        )
    }

}

const Speeche=(props)=>{

    const [pregunta1, setPregunta1]=useState(false);
    const [pregunta2, setPregunta2]=useState(true);
    const [pregunta3, setPregunta3]=useState(true);
    const atributos={
        // src:"https://www.sclpcj.com.mx:7071/SCLWeb/index.do",
        // src:"http://localhost:3000/CLTKM_FRONT/gestores",
        src:"https://www.sclpcj.com.mx:7071/SCLWeb/noJalaLogin.jsp",
        width: "1500px",
        height: "600px"
    }
    return(
        <div>


            <Grid container spacing={1}>
                <Grid item xl={3} lg={3} md={3} sm={3}> 
                    <Tarjeta/>
                </Grid>
                
                <Grid item xl={9} lg={9} md={9} sm={9} className="letrasOperacion">
                    <Grid item xl={12} lg={12} md={12} sm={12} className="letrasOperacion" hidden >
                        <p>Buen dia mi nombre es: <strong>NOMBRE_GESTOR</strong> </p>
                        <p>Me comunico de TKM en representacion de de Banco Azteca</p>
                        <p>¿Es usted <strong>NOMBRE_CLIENTE</strong>?</p>
                        <br/>
                        &nbsp;&nbsp;  &nbsp;  &nbsp;  &nbsp;      
                        <Button
                                variant="contained"
                                color="success"
                                size="large"
                                style={{height:"50px",width:"200px"}}
                                startIcon={<DoneOutlineSharpIcon style={{height:"40px",width:"50px"}} />}
                        >                          
                        </Button>

                        &nbsp;&nbsp;  &nbsp;  &nbsp;  &nbsp;  
                        <Button
                                variant="contained"
                                color="error"
                                size="large"
                                style={{height:"50px",width:"200px"}}
                                startIcon={<CloseIcon style={{height:"50px",width:"80px"}}/>}
                        >                          
                        </Button>



                    </Grid>

                </Grid> 

            </Grid>

            


        </div>
    )
}