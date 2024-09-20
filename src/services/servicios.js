
import React, { Component } from "react";


export default class Servicios extends Component{
    
    consumirServicios(parametros,endPoint){
        const response=fetch("http://172.16.201.28:8080/api/v1/msvc-template/"+endPoint,{
            method:"POST",
            cache: "no-cache",
            headers:{
                // 'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            referrerPolicy:'no-referrer',
            
            body:JSON.stringify(parametros)
        })
            .then((response)=>response.json())
            .then((data)=>{
                return data;
            })
            .catch(error=>{
                console.log(error);
                return null;
            });

        return response;
    }

    consumirServiciosGET(endPoint){
        const response=fetch("http://172.16.201.28:8080/api/v1/msvc-template/"+endPoint,{
            method:"GET",
            cache: "no-cache",
            // headers:{
            //     // 'Access-Control-Allow-Origin': '*',
            //     'Content-Type': 'application/json'
            // },
            referrerPolicy:'no-referrer',
            
            // body:JSON.stringify(parametros)
        })
            .then((response)=>response.json())
            .then((data)=>{
                return data;
            })
            .catch(error=>{
                console.log(error);
                return null;
            });

        return response;

    }

    consultarServicioGETLlamadas(endPoint){
        const response=fetch("http://172.16.201.6:8080/api/v1/msvc-template/"+endPoint,{
            method:"GET",
            cache: "no-cache",
            // headers:{
            //     // 'Access-Control-Allow-Origin': '*',
            //     'Content-Type': 'application/json'
            // },
            referrerPolicy:'no-referrer',
            
            // body:JSON.stringify(parametros)
        })
            .then((response)=>response.json())
            .then((data)=>{
                return data;
            })
            .catch(error=>{
                console.log(error);
                return null;
            });

        return response;
    }
}
