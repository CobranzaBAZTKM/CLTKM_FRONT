
import React, { Component } from "react";

const fecha =new Date();

export default class FechaHora extends Component{

    ObtenerDia(){
        let primerDia=String(fecha.getDate());
        let dia=primerDia;


        if(primerDia.length!==2){
            dia="0"+primerDia;
        }
        else{
            dia=primerDia;
        }

        return dia;

    }


    ObtenerMes(){
        let primerMes=String(fecha.getMonth()+1);
        let mes="";

        if(primerMes.length!==2){
            mes="0"+primerMes;
        }else{
            mes=primerMes;
        }

        return mes;
    }

    ObtenerYear(){
        return fecha.getFullYear();
    }

    ObtenerHoraCompleta(){
        return fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
    }
}