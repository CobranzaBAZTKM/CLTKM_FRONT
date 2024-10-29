import React,{ useState } from "react";
import {ModalEspera,ModalInfo} from '../../../services/modals';
import Grid from '@mui/material/Grid';
import Servicios from '../../../services/servicios';
import * as XLSX from 'xlsx';

const servicio=new Servicios();

export default class SubirCartera extends React.Component{

    render(){
        return(
            <div>
                <SubirBase/>
            </div>
        )
    }
}

const SubirBase=()=>{
    const [file2, setFile2] = useState([]);
    const [openModalEspera, setOpenModalEspera] = React.useState(false);
    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const [mensajeModalInfo, setMensajeModalInfo]=useState(null);

    const handleOpenEspera = () => {
        setOpenModalEspera(true);
    };
    const handleCloseEspera = () => {
        setOpenModalEspera(false);
    };

    const handleOpenInfo = (mensaje) => {
        setMensajeModalInfo(mensaje);
        setOpenModalInfo(true);
    };
    const handleCloseInfo = () => {
        setOpenModalInfo(false);
    };

    const handleFileChange = (e) => {
        const selectedFile2 = e.target.files;
        setFile2(selectedFile2)
        console.log("Subiendo Excel"+e.target.result);
    };

    const handleFileUpload = (e) => {
        handleOpenEspera();
        e.preventDefault();
        if(file2){
            let x=file2.length;
            let finArr=x-1;
            for(let i=0;i<x;i++){
                console.log(x);
                let archivo=file2[i];                
                try {
                    const fileReader = new FileReader();
                    fileReader.onload = (e) => {
                        const data = e.target.result;
                        const excel = XLSX.read(data, { type: 'binary' });
                        const sheetName = excel.SheetNames[0];
                        const sheet = excel.Sheets[sheetName];
                        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 0 });                        
                        datosPrepararGuardar(jsonData,archivo,i,finArr);
                    };
                    
                    const d=fileReader.readAsBinaryString(archivo);
                    console.log(d)
                } catch (error) {
                    console.error("Error leyendo el archivo");
                }
            }

            
        }else{
            handleCloseEspera();
            handleOpenInfo('No has seleccionado un archivo');
        }
    }

    const datosPrepararGuardar=(cuentas,archi,valorActual,valorFinal)=>{
        
        let clientes=[];
        cuentas.forEach(function(element){
            let cuenta=JSON.stringify(element);
            let dividirCuen=cuenta.split('":')
            let limpiarDatos=dividirCuen[1].split("\"}")
            let obtenerDatos=limpiarDatos[0].split("|");
            let segmentoTipo=archi.name.split("_");            
            let segmento=segmentoTipo[2].split(".")[0];
            let cartera=segmentoTipo[1]==="60054"?"Normalidad":segmentoTipo[1]==="60165"?"VIP":segmentoTipo[1]==="60174"?"Territorios":segmentoTipo[1]==="60160"?"Abandonados":segmentoTipo[1]==="60163"?"Implant":segmentoTipo[1]==="60167"?"TAZ":segmentoTipo[1]==="60170"?"TOR":segmentoTipo[1]==="60176"?"SaldosAltos":segmentoTipo[1]==="60178"?"Italika":"";

            console.log(cuenta);
            let json={
                "CLIENTE_UNICO":obtenerDatos[0].split("\"")[1],
                "NOMBRE_CTE":obtenerDatos[1],
                "GENERO_CLIENTE":obtenerDatos[2],
                "EDAD_CLIENTE":obtenerDatos[3],
                "OCUPACION":obtenerDatos[4],
                "DIRECCION_CTE":obtenerDatos[5],
                "NUM_EXT_CTE":obtenerDatos[6],
                "NUM_INT_CTE":obtenerDatos[7],
                "CP_CTE":obtenerDatos[8],
                "COLONIA_CTE":obtenerDatos[9],
                "POBLACION_CTE":obtenerDatos[10],
                "ESTADO_CTE":obtenerDatos[11],
                "TERRITORIO":obtenerDatos[12],
                "TERRITORIAL":obtenerDatos[13],
                "ZONA":obtenerDatos[14],
                "ZONAL":obtenerDatos[15],
                "NOMBRE_DESPACHO":obtenerDatos[16],
                "GERENCIA":obtenerDatos[17],
                "FECHA_ASIGNACION":obtenerDatos[18],
                "DIAS_ASIGNACION":obtenerDatos[19],
                "REFERENCIAS_DOMICILIO":obtenerDatos[20],
                "CLASIFICACION_CTE":obtenerDatos[21],
                "DIQUE":obtenerDatos[22],
                "ATRASO_MAXIMO":obtenerDatos[23],
                "DIAS_ATRASO":obtenerDatos[24],
                "SALDO":obtenerDatos[25],
                "MORATORIOS":obtenerDatos[26],
                "SALDO_TOTAL":obtenerDatos[27],
                "SALDO_ATRASADO":obtenerDatos[28],
                "SALDO_REQUERIDO":obtenerDatos[29],
                "PAGO_NORMAL":obtenerDatos[30],
                "PRODUCTO":obtenerDatos[31],
                "FECHA_ULTIMO_PAGO":obtenerDatos[33],
                "IMP_ULTIMO_PAGO":obtenerDatos[34],
                "CALLE_EMPLEO":obtenerDatos[35],
                "NUM_EXT_EMPLEO":obtenerDatos[36],
                "NUM_INT_EMPLEO":obtenerDatos[37],
                "COLONIA_EMPLEO":obtenerDatos[38],
                "POBLACION_EMPLEO":obtenerDatos[39],
                "ESTADO_EMPLEO":obtenerDatos[40],
                "NOMBRE_AVAL":obtenerDatos[41],
                "TEL_AVAL":obtenerDatos[42],
                "CALLE_AVAL":obtenerDatos[43],
                "NUM_EXT_AVAL":obtenerDatos[44],
                "COLONIA_AVAL":obtenerDatos[45],
                "CP_AVAL":obtenerDatos[46],
                "POBLACION_AVAL":obtenerDatos[47],
                "ESTADO_AVAL":obtenerDatos[48],
                "FIDIAPAGO":obtenerDatos[49],
                "TELEFONO1":obtenerDatos[50],
                "TELEFONO2":obtenerDatos[51],
                "TELEFONO3":obtenerDatos[52],
                "TELEFONO4":obtenerDatos[53],
                "TIPOTEL1":obtenerDatos[54],
                "TIPOTEL2":obtenerDatos[55],
                "TIPOTEL3":obtenerDatos[56],
                "TIPOTEL4":obtenerDatos[57],
                "LATITUD":obtenerDatos[58],
                "LONGITUD":obtenerDatos[59],
                "DESPACHO_GESTIONO":obtenerDatos[60],
                "ULTIMA_GESTION":obtenerDatos[61],
                "GESTION_DESC":obtenerDatos[62],
                "CAMPANIA_RELAMPAGO":obtenerDatos[63],
                "CAMPANIA":obtenerDatos[64],
                "ID_GRUPO":obtenerDatos[66],
                "GRUPO_MAZ":obtenerDatos[67],
                "CLAVE_SPEI":obtenerDatos[68],
                "PAGOS_CLIENTE":obtenerDatos[69],
                "MONTO_PAGOS":obtenerDatos[70],
                "GESTORES":obtenerDatos[71],
                "FOLIO_PLAN":obtenerDatos[72],
                "SEGMENTO_GENERACION":obtenerDatos[73],
                "ESTATUS_PLAN":obtenerDatos[74],
                "SEMANAS_ATRASO":obtenerDatos[75],
                "ATRASO":obtenerDatos[76],
                "GENERACION_PLAN":obtenerDatos[77],
                "CANCELACION_CUMPLIMIENTO_PLAN":obtenerDatos[78],
                "ULTIMO_ESTATUS":obtenerDatos[79],
                "EMPLEADO":obtenerDatos[80],
                "CANAL":obtenerDatos[81],
                "ABONO_SEMANAL":obtenerDatos[82],
                "PLAZO":obtenerDatos[83],
                "MONTO_ABONADO":obtenerDatos[84],
                "MONTO_PLAN":obtenerDatos[85],
                "ENGANCHE":obtenerDatos[86],
                "PAGOS_RECIBIDOS":obtenerDatos[87],
                "SALDO_ANTES_DEL_PLAN":obtenerDatos[88],
                "SALDO_ATRASADO_ANTES_PLAN":obtenerDatos[89],
                "MORATORIOS_ANTES_PLAN":obtenerDatos[90],
                "ESTATUS_PROMESA_PAGO":obtenerDatos[91],
                "MONTO_PROMESA_PAGO":obtenerDatos[92],
                "SEGMENTO":segmento,
                "TIPOCARTERATKM":cartera,
            }

            clientes.push(json);
        })

        let json2={
            "cartera":clientes
        }

        servicio.consumirServicios(json2,"service/carteraLocal/insertarCarteraLocal").then(
            data=>{
                if(data.code===1){
                    if(valorActual===valorFinal){
                        handleCloseEspera();
                        handleOpenInfo("Se inserto la base correctamente");
                    }
                }
            }
        )
    }

    return(
        <div>
            <Grid container spacing={1}>
                <Grid item xl={12} lg={12} md={12} sm={12} style={{textAlign:'center'}}>
                    {/* <TextField id="cokkie" label="Cokkie" variant="outlined" onChange={handleOnChanceCookie}/> */}
                    <br/>
                    <form  onSubmit={handleFileUpload}>
                        <input type="file" onChange={handleFileChange} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" multiple/>
                        <br/><br/><br/>
                        <button class="button_1">Subir cartera</button>
                    </form>
                </Grid>
            </Grid>

            <ModalEspera open={openModalEspera} handleClose={handleCloseEspera} />
            <ModalInfo open={openModalInfo} handleClose={handleCloseInfo} mensaje={mensajeModalInfo} />
        </div>
    )

}