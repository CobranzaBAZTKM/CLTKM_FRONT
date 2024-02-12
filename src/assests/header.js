import React from "react";
import Grid from '@mui/material/Grid';
import imageBaz from "./imagenes/picture-baz.png"
import imageTkm from "./imagenes/picture-tkm.png"

export default class Header extends React.Component{
    render(){
        return(
            <div>
                <Grid container spacing={1}>
                
                    <Grid item xl={1} lg={1} md={1} sm={1}></Grid>
                    <Grid item xl={2} lg={2} md={2} sm={2}>
                        <img src={imageBaz} style={{height:'100px'}}></img>
                    </Grid>
                    <Grid item xl={1} lg={1} md={1} sm={1}></Grid>
                    <Grid item xl={4} lg={4} md={4} sm={4} textAlign={'center'}>
                        <h1>"LOS LIMITES LOS PONES TÚ"</h1>
                    </Grid>
                    <Grid item xl={1} lg={1} md={1} sm={1}></Grid>
                    <Grid item xl={2} lg={2} md={2} sm={2}>
                        <img src={imageTkm} style={{height:'100px'}}></img>
                    </Grid>
                    <Grid item xl={1} lg={1} md={1} sm={1}></Grid>


                </Grid>
            </div>
        )
    }

}
