import React from "react";
import Grid from '@mui/material/Grid';
import "../../assests/estilos.css"
import {TextField, Button} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from "react";
import Servicios from '../../services/servicios';
import Modal from '@mui/material/Modal';



const servicio=new Servicios();
// import ExportExcel from 'react-export-excel'

export default class BajarListasBlaster extends React.Component{
    render(){
        return(
            <div>
                <BajarReporte/>
            </div>
        )
    }
}

const BajarReporte=(props)=>{

    const [seg5, setSeg5]=useState(null);
    const [seg28, setSeg28]=useState(null);
    const [seg6, setSeg6]=useState(null);
    const [seg16, setSeg16]=useState(null);
    const [normalidad, setNormalidad]=useState(null);
    const [preventa, setPreventa]=useState(null);
    const [italika, setItalika]=useState(null);
    const [tor, setTor]=useState(null);
    const [cdt, setCdt]=useState(null);
    const [maz, setMaz]=useState(null);
    const [cokkie, setCokkie]=useState(null);
    const [turno, setTurno]=useState(null);



    const handleOnChanceCookie=(event)=>{
        setCokkie(event.target.value);
    }
    
    const handleClickDescarga=()=>{
        let segmentos="";
        if(seg5!==null){
            segmentos=segmentos+"|"+seg5;
        }
        if(seg28!==null){
            segmentos=segmentos+"|"+seg28;
        }
        if(seg6!==null){
            segmentos=segmentos+"|"+seg6;
        }
        if(seg16!==null){
            segmentos=segmentos+"|"+seg16;
        }
        if(normalidad!==null){
            segmentos=segmentos+"|"+normalidad;
        }
        if(preventa!==null){
            segmentos=segmentos+"|"+preventa;
        }
        if(italika!==null){
            segmentos=segmentos+"|"+italika;
        }
        if(tor!==null){
            segmentos=segmentos+"|"+tor;
        }
        if(cdt!==null){
            segmentos=segmentos+"|"+cdt;
        }
        if(maz!==null){
            segmentos=segmentos+"|"+maz;
        }

        let json={
            "cookie":cokkie,
            "tipoArchivo":segmentos,
            "tipoFuncion":turno
        }
        
        let endPoint="service/cartera/numerosListasSegmento";

        servicio.consumirServicios(json,endPoint).then(
        data=>{
        console.log(data)  
        })


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
                        Descargar Listas para Blaster
                    </h1>
                </Grid>
            </Grid>
            <br/><br/>
            <Grid container spacing={1}>
                <Grid item xl={12} lg={12} md={12} sm={12} style={{textAlign:'center'}}>
                    <TextField id="cokkie" label="Cokkie" variant="outlined" onChange={handleOnChanceCookie}/>
                </Grid>
            </Grid>
            <br/><br/>
            <Grid container spacing={1}>
                <Grid item xl={1} lg={1} md={1} sm={1}></Grid>

                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">

                    <FormControl > 
                        <FormLabel id="demo-radio-buttons-group-label_1">Segmento 05 (0 a 25 semanas)</FormLabel>
                        <RadioGroup>
                            <br/>
                            <FormControlLabel value="Seg05P" control={<Radio onClick={()=>{setSeg5("5")}}/>} label="Segmento 05 Puro" />
                            <br/>
                            <FormControlLabel value="Seg05SNITCPM" control={<Radio onClick={()=>{setSeg5("5SNNITC")}}/>} label="Segemento 05 sin Normalidad, Italika, TOR, CDT, MAZ y Preventa" />
                            <br/>
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl > 
                        <FormLabel id="demo-radio-buttons-group-label_2">Segmento 28 (26 a 39 semanas)</FormLabel>
                        <RadioGroup>
                            <br/>
                            <FormControlLabel value="Seg28P" control={<Radio onClick={()=>{setSeg28("28")}}/>} label="Segmento 28 Puro" />
                            <br/>
                            <FormControlLabel value="Seg28SNITCPM" control={<Radio onClick={()=>{setSeg28("28SNNITC")}}/>} label="Segemento 28 sin Normalidad, Italika, TOR, CDT, MAZ y Preventa" />
                            <br/>
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl > 
                        <FormLabel id="demo-radio-buttons-group-label_3">Segmento 06 (40 a 55 semanas)</FormLabel>
                        <RadioGroup>
                            <br/>   
                            <FormControlLabel value="Seg06P" control={<Radio onClick={()=>{setSeg6("6")}}/>} label="Segmento 06 Puro" />
                            <br/>
                            <FormControlLabel value="Seg06SNITCPM" control={<Radio onClick={()=>{setSeg6("6SNNITC")}} />} label="Segemento 06 sin Normalidad, Italika, TOR, CDT, MAZ y Preventa" />
                            <br/>
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl > 
                        <FormLabel id="demo-radio-buttons-group-label_4">Segmento 16 (mas de 55 semanas)</FormLabel>
                        <RadioGroup>
                            <FormControlLabel value="Seg16P" control={<Radio onClick={()=>{setSeg16("16")}}/>} label="Segmento 16 Puro" />
                            <br/>
                            <FormControlLabel value="Seg16SNITCPM" control={<Radio onClick={()=>{setSeg16("16SNNITC")}}/>} label="Segemento 16 sin Normalidad, Italika, TOR, CDT, MAZ y Preventa" />
                            <br/>
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl > 
                        <FormLabel id="demo-radio-buttons-group-label_4">Segmentos Elegibles</FormLabel>
                        
                        <FormControlLabel value="normalidad" control={<Radio onClick={()=>{setNormalidad("Normalidad")}}/>} label="NORMALIDAD" />                    
                        <FormControlLabel value="preventa" control={<Radio onClick={()=>{setPreventa("Preventa")}}/>} label="PREVENTA" />                    
                        <FormControlLabel value="italika" control={<Radio onClick={()=>{setItalika("ITALIKA")}}/>} label="ITALIKA" />                  
                        <FormControlLabel value="tor" control={<Radio onClick={()=>{setTor("TOR")}}/>} label="TOR" />                     
                        <FormControlLabel value="cdt" control={<Radio onClick={()=>{setCdt("CDT")}}/>} label="CDT" />                   
                        <FormControlLabel value="maz" control={<Radio onClick={()=>{setMaz("MAZ")}}/>} label="MAZ" />                    
                       
                    </FormControl>
                </Grid>

                <Grid item xl={1} lg={1} md={1} sm={1}></Grid>
            </Grid>
            <br/><br/>
            <Grid container spacing={1}>
                <Grid item xl={1} lg={1} md={1} sm={1}></Grid>
                <Grid item xl={4} lg={4} md={4} sm={4}></Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} className="bordeTarjeta">
                    <FormControl > 
                        <FormLabel id="demo-radio-buttons-group-label_1">Turno</FormLabel>
                        <RadioGroup>
                            <FormControlLabel value="Mañana" control={<Radio onClick={()=>{setTurno("M")}}/>} label="Mañana" />
                            <FormControlLabel value="Tarde" control={<Radio onClick={()=>{setTurno("T")}}/>} label="Tarde" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6}></Grid>
            </Grid>
            <br/><br/><br/>
            <Grid container spacing={1}>
                <Grid item xl={12} lg={12} md={12} sm={12} style={{textAlign:'center'}}>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        style={{height:"50px",width:"200px"}}
                        startIcon={<DownloadIcon style={{height:"40px",width:"50px"}} />}
                        onClick={()=>{handleClickDescarga()}}

                    >
                        Descargar Listas                  
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

