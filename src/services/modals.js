import * as React from 'react';
import "../assests/estilos.css"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from "@mui/material/Typography";
import {TextField,Button,FormControl,InputLabel,OutlinedInput,IconButton,Autocomplete} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export default class Modals extends React.Component{
render(){
    return(<></>)
}
}


export function ModalEspera(props){
    return (
        <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Cargando
          </Typography>
        </Box>
      </Modal>
    
    )


}

export function ModalInfo(props){
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.mensaje}
          </Typography>

          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={()=>{props.handleClose()}}
          >
            Ok
          </Button>
        </Box>
      </Modal>
    
    )
}


export function ModalInsertarGestores(props){
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return(
    <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
    >
    <Box sx={style}>
      <TextField 
        id='Valor1' 
        label="Id" 
        variant="outlined"  
        disabled
        defaultValue={props.idInsertar}
      />
      
      <br/><br/>
      {props.insertAct===1?(
          <TextField 
            id='Insertar' 
            label="Nombre" 
            variant="outlined" 
            disabled 
            defaultValue={props.nombreInsertar}
          />
        ):(
          <TextField 
            id='Actualizar' 
            label="Nombre" 
            variant="outlined"             
            defaultValue={props.nombreInsertar}
            onChange={props.handleOnChangeNombre}
          />
        )
      }
 
      <br/><br/>
      <FormControl sx={{ m: 1, width: '25' }} variant="outlined">
        <InputLabel 
            htmlFor="outlined-adornment-password"
        >
            Password
        </InputLabel>
        <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
                <IconButton
                onClick={handleClickShowPassword}                              
                >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
        
            }
            label="Password"
            onChange={props.handleOnChangePass}
            defaultValue={props.password}
         />
        </FormControl>
        <br/><br/>
          <Autocomplete 
            id="seleccionPuesto"          
            options={props.puesto}
            getOptionLabel={(option) => option.valor}
            renderInput={(params) => <TextField {...params} label="Tipo de Puesto" variant="outlined" />}
            onChange={props.handleOnChangePuesto}
          />
        <br/><br/>
          <Autocomplete 
            id="seleccionTurno"          
            options={props.turno}
            getOptionLabel={(option) => option.valor}
            renderInput={(params) => <TextField {...params} label="Turno" variant="outlined" />}
            onChange={props.handleOnChangeTurno}
          />
          <br/><br/>
        <Button
            variant="contained"
            color="success"
            size="large"
            onClick={()=>{props.handleCloseInsertar()}}
          >
            {props.insertAct===1?("Insertar"):("Actualizar")}
        </Button>

        &nbsp;&nbsp;&nbsp;

        <Button
            variant="contained"
            color="error"
            size="large"
            onClick={()=>{props.handleClose()}}
          >
            Cancelar
        </Button>

    </Box>

    </Modal>
  )

}


export function ModalSiNo(props){
  return (
      <Modal
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.mensaje}
        </Typography>
      <br/>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={()=>{props.handleCloseSi()}}
        >
          Si
        </Button>

        &nbsp;&nbsp;&nbsp;
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={()=>{props.handleClose()}}
        >
          No
        </Button>
      </Box>
    </Modal>
  
  )
}

export function Modal6Infos4Botones(props){
  return(
    <Modal
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
    >
      <Box sx={style2}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.mensaje1}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.mensaje2}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.mensaje3}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.mensaje4}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.mensaje5}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.mensaje6}
        </Typography>
        <br/>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={()=>{props.handleOpcion1()}}
        >
          {props.opcion1}
        </Button>

        &nbsp;&nbsp;&nbsp;
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={()=>{props.handleOpcion2()}}
        >
          {props.opcion2}
        </Button>

        &nbsp;&nbsp;&nbsp;
      

        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={()=>{props.handleOpcion3()}}
        >
          {props.opcion3}
        </Button>

        &nbsp;&nbsp;&nbsp;
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={()=>{props.handleOpcion4()}}
        >
          {props.opcion4}
        </Button>
      </Box>
    </Modal>
  )
}


export function Modal11Actualizacines(props){
  return(
    <Modal
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
    >
      <Box sx={style2}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.mensaje1}
        </Typography>
        <br/>
        <TextField
          id="valor1"
          label={props.nombreValor1}
          defaultValue={props.valor1}
          onChange={props.handleChangeV1}
        />
        &nbsp;&nbsp;&nbsp;
        <TextField
          id="valor2"
          label={props.nombreValor2}
          defaultValue={props.valor2}
          onChange={props.handleChangeV2}
        />
        <br/><br/>
        <TextField
          id="valor3"
          label={props.nombreValor3}
          defaultValue={props.valor3}
          onChange={props.handleChangeV3}
        />
        &nbsp;&nbsp;&nbsp;
        <TextField
          id="valor4"
          label={props.nombreValor4}
          defaultValue={props.valor4}
          onChange={props.handleChangeV4}
        />
        <br/><br/>
        <TextField
          id="valor5"
          label={props.nombreValor5}
          defaultValue={props.valor5}
          onChange={props.handleChangeV5}
        />
        &nbsp;&nbsp;&nbsp;
        <TextField
          id="valor6"
          label={props.nombreValor6}
          defaultValue={props.valor6}
          onChange={props.handleChangeV6}
        />
        <br/> <br/>
        <TextField
          id="valor7"
          label={props.nombreValor7}
          defaultValue={props.valor7}
          onChange={props.handleChangeV7}
        />
        &nbsp;&nbsp;&nbsp;
        <TextField
          id="valor8"
          label={props.nombreValor8}
          defaultValue={props.valor8}
          onChange={props.handleChangeV8}
        />
        <br/><br/>
        <TextField
          id="valor9"
          label={props.nombreValor9}
          defaultValue={props.valor9}
          onChange={props.handleChangeV9}
        />
        &nbsp;&nbsp;&nbsp;
        <TextField
          id="valor10"
          label={props.nombreValor10}
          defaultValue={props.valor10}
          onChange={props.handleChangeV10}
        />
        <br/><br/>
        <TextField
          id="valor11"
          label={props.nombreValor11}
          defaultValue={props.valor11}
          onChange={props.handleChangeV11}
        />
        <br/><br/>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={()=>{props.handleOpcion1()}}
        >
          {props.opcion1}
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={()=>{props.handleOpcion2()}}
        >
          {props.opcion2}
        </Button>

      </Box>
    </Modal>
  )

}

export function ModalSiNoCuadroText(props){
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>

        <TextField 
          id="valor1" 
          label={props.encabezadoCuadroText}
          onChange={props.handleOnChangeValorCuadro}
        />
        <br/><br/>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.mensaje}
        </Typography>

      <br/>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={()=>{props.handleCloseSi()}}
        >
          Si
        </Button>

        &nbsp;&nbsp;&nbsp;
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={()=>{props.handleClose()}}
        >
          No
        </Button>
      </Box>
    </Modal>
  
  )
}


export function Modal10i2e(props){
  return(
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.mensaje1}
        </Typography>
        {/* &nbsp;&nbsp;&nbsp; */}
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.mensaje2}
        </Typography>
        {/* <br/> */}
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.mensaje3}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.mensaje4}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.mensaje5}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.mensaje6}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.mensaje7}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.mensaje8}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.mensaje9}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.mensaje10}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.mensaje11}
        
          <TextField
            id="valor1" 
            label={props.mensaje11}
            defaultValue={props.valor1}
            onChange={props.handleOnChangeValorCuadro1}
          />

        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.mensaje12}
        
          <TextField
            // type="number"
            id="valor2" 
            label={props.mensaje12}
            defaultValue={props.valor2}
            onChange={props.handleOnChangeValorCuadro2}
          />
        </Typography>
        <br/>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={()=>{props.handleCloseBtn1()}}
        >
          {props.opcion}
        </Button>

        &nbsp;&nbsp;&nbsp;
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={()=>{props.handleClose()}}
        >
          Cancelar
        </Button>
      </Box>
    </Modal>
  )
}


export function ModalSiNo2CuadroTextPass(props){
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.mensaje}
        </Typography>
        <br/>
        <TextField 
          id="valor1" 
          label={props.encabezadoCuadroText}
          onChange={props.handleOnChangeValorCuadro}
        />
        <br/><br/>
        <TextField 
          id="valor2" 
          type="password"
          label={props.encabezadoCuadroPass}
          onChange={props.handleOnChangeValorPass}
        />
        


        <br/><br/>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={()=>{props.handleCloseSi()}}
        >
          Si
        </Button>

        &nbsp;&nbsp;&nbsp;
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={()=>{props.handleClose()}}
        >
          No
        </Button>
      </Box>
    </Modal>
  
  )
}