import React, { useState } from "react";
import * as XLSX from 'xlsx';

export default class DescargaExcel extends React.Component{

    descargarExcel(base,nombreArchivo){
        let validacion="Archivo descargado";

        console.log("Comienza descarga de archivo");
        const workSheet=XLSX.utils.json_to_sheet(base);
        console.log("TERMINA PASO 1, OBTENER LA BASE");
        const workBook=XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook,workSheet,"Sheet0")
        console.log("TERMINA PASO 2, CREAR LA HOJA Y COLOCAR EL ARCHIVO");
        // let buf=XLSX.write(workBook,{bookType:"xlsx", type:"buffer"})
        XLSX.write(workBook,{bookType:"xlsx", type:"buffer"})
        // XLSX.write(workBook,{bookType:"xlsx", type:"binary"})
        XLSX.writeFile(workBook, nombreArchivo+".xlsx");
        console.log("TERMINA PASO 3, TERMINA PROCES Y SE DESCARGA EL ARCHIVO");

        return validacion;
    }

    descargarExcelCSV(base,nombreArchivo){
        let validacion="Archivo descargado";

        console.log("Comienza descarga de archivo");
        const workSheet=XLSX.utils.json_to_sheet(base);
        console.log("TERMINA PASO 1, OBTENER LA BASE");
        const workBook=XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook,workSheet,"Sheet0")
        console.log("TERMINA PASO 2, CREAR LA HOJA Y COLOCAR EL ARCHIVO");
        // let buf=XLSX.write(workBook,{bookType:"xlsx", type:"buffer"})
        XLSX.write(workBook,{bookType:"xlsx", type:"buffer"})
        // XLSX.write(workBook,{bookType:"xlsx", type:"binary"})
        XLSX.writeFile(workBook, nombreArchivo+".csv");
        console.log("TERMINA PASO 3, TERMINA PROCES Y SE DESCARGA EL ARCHIVO");

        return validacion;
    }

}

