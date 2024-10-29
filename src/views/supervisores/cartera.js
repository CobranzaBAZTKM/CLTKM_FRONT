import React,{ useState } from "react";
import {Grid,Button} from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate  } from "react-router-dom";
import SubirCartera from "./opcionCartera/subirCartera";
import BajarCartera from "./opcionCartera/bajarCartera";


export default class Cartera extends React.Component{

    render(){
        return(
            <div>
                <OpcionesCartera/>
            </div>
        )
    }
}

const OpcionesCartera=()=>{

    const navigate = useNavigate();

    const [banderaSubirBajar, setBanderaSubirBajar]=useState(0)

    const handleClickRegresasr=()=>{     
        navigate("/CLTKM_FRONT/menu");
    }

    const handleClickSubBaj=(opcion)=>{
        setBanderaSubirBajar(opcion);
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
                        Cartera
                    </h1>
                </Grid>
            </Grid>
         
            <Grid container spacing={1}>
                <Grid item xl={4} lg={4} md={4} sm={4}/>
                <Grid item xl={2} lg={2} md={2} sm={2} style={{textAlign:'center'}}>
                    <Button
                        variant="outlined"
                        size="large"
                        color="success"
                        style={{height:"75px",width:"175px"}}
                        startIcon={<GetAppIcon style={{height:"40px",width:"50px"}} />}
                        onClick={()=>{
                            handleClickSubBaj(1);
                        }}
                    >
                        Bajar Cartera 
                    </Button>
                </Grid> 
            
                <Grid item xl={2} lg={2} md={2} sm={2} style={{textAlign:'center'}}>
                    <Button
                        variant="outlined"
                        size="large"
                        color="success"
                        style={{height:"75px",width:"175px"}}
                        startIcon={<FileUploadIcon style={{height:"40px",width:"50px"}} />}
                        onClick={()=>{
                            handleClickSubBaj(2);
                        }}
                    >
                        Subir Cartera 
                    </Button>
                </Grid> 
                <Grid item xl={4} lg={4} md={4} sm={4}/>
            </Grid>
            <br/><br/>
            {
                banderaSubirBajar===1?
                (
                    <div>
                        <BajarCartera/>
                    </div>
                )
                :
                banderaSubirBajar===2?
                (
                    <div>
                        <SubirCartera/>
                    </div>
                )
                :
                (
                    <></>
                )
            }

            <Grid container spacing={1}>
                <Grid item xl={1} lg={1} md={1} sm={1}/> 
                <Grid item xl={2} lg={2} md={2} sm={2} >
                    <ArrowBackIcon
                        style={{height:"80px",width:"200px"}}
                        onClick={()=>{handleClickRegresasr()}}
                    />
                </Grid>
                <Grid item xl={9} lg={9} md={9} sm={9}/>
            </Grid>
        </div>
    )
}