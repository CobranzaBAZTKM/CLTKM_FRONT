import React, { useState } from "react";
import * as XLSX from 'xlsx';

export default class DescargaExcel extends React.Component{

    descargarExcel(base,nombreArchivo){
        let validacion="Archivo descargado";

        const workSheet=XLSX.utils.json_to_sheet(base);
        const workBook=XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook,workSheet,"Sheet0")
        // let buf=XLSX.write(workBook,{bookType:"xlsx", type:"buffer"})
        XLSX.write(workBook,{bookType:"xlsx", type:"buffer"})
        // XLSX.write(workBook,{bookType:"xlsx", type:"binary"})
        XLSX.writeFile(workBook, nombreArchivo+".xlsx");

        return validacion;
    }

}

