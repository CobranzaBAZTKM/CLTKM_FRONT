import logo from './logo.svg';
import './App.css';
import { Routes,Route, BrowserRouter } from 'react-router-dom';
import Menu from './views/menu';
import Header from './assests/header';
import Operacion from './views/operacion';
import Tipificaciones from './views/supervisores/tipificaciones'
import InsertarPlanes from './views/gestores/insertarPlanes';
import RevisarPP from './views/supervisores/revisarPP';
import PersonalBazTkm from './views/supervisores/personalBazTkm';
import MenuGestores from './views/gestores/menuGestores';
import RevisarPPGest from './views/gestores/revisarPPGest';
import ReportePagos from './views/supervisores/reportePagos';
import DescargaGestiones from './views/supervisores/descargaGestiones';
import OperacionGestion from './views/gestores/operacionGestion';
import ValidacionPromesas from './views/supervisores/validacionPromesas';
import DescargaPromesasHistorial from './views/supervisores/descargaPromesasHistorial';
import DescargaSinContactoHistorial from './views/supervisores/descargaSinContactoHistorial';
import ArchivosMasivoGestiones from './views/supervisores/archivosMasivoGestiones';
import BuscarTitularesNumero from './views/gestores/buscarTitularesNumero';
import LayoutSemanal from './views/supervisores/layoutSemanal';
import AvanceMomento from './views/supervisores/avanceMomento';
import Cartera from './views/supervisores/cartera';






function App() {
  return (
    
      <div>
        <Header/>

        <BrowserRouter>
          <Routes>
            <Route exact path='/CLTKM_FRONT/menu' Component={Menu}/>
            
            <Route exact path='/CLTKM_FRONT/supervisores/tipificaciones' Component={Tipificaciones}/>
            <Route exact path='/CLTKM_FRONT/supervisores/cartera' Component={Cartera}/>
            <Route exact path='/CLTKM_FRONT/supervisores/revisarPP' Component={RevisarPP}/>
            <Route exact path='/CLTKM_FRONT/supervisores/personal' Component={PersonalBazTkm}/>
            <Route exact path='/CLTKM_FRONT/supervisores/reportePagos' Component={ReportePagos}/>
            <Route exact path='/CLTKM_FRONT/supervisores/gestiones' Component={DescargaGestiones}/>
            <Route exact path='/CLTKM_FRONT/supervisores/validacionPromesas' Component={ValidacionPromesas}/>
            <Route exact path='/CLTKM_FRONT/supervisores/historialPromesas' Component={DescargaPromesasHistorial}/>
            <Route exact path='/CLTKM_FRONT/supervisores/historialSinContacto' Component={DescargaSinContactoHistorial}/>
            <Route exact path='/CLTKM_FRONT/supervisores/archivosParaGestiones' Component={ArchivosMasivoGestiones}/>
            <Route exact path='/CLTKM_FRONT/supervisores/layoutSemanal' Component={LayoutSemanal}/>
            <Route exact path='/CLTKM_FRONT/supervisores/avanceMomento' Component={AvanceMomento}/>

            <Route exact path='/CLTKM_FRONT/gestores/menu' Component={MenuGestores}/>
            <Route exact path='/CLTKM_FRONT/gestores/insertarPlanPago' Component={InsertarPlanes}/>
            <Route exact path='/CLTKM_FRONT/gestores/operacion' Component={Operacion}/>
            <Route exact path='/CLTKM_FRONT/gestores/revisarPPGestor' Component={RevisarPPGest}/>
            <Route exact path='/CLTKM_FRONT/gestores/operacionGestion/:datos' Component={OperacionGestion}/>
            <Route exact path='/CLTKM_FRONT/gestores/buscarTitularPorNumero' Component={BuscarTitularesNumero}/>

          </Routes>
        </BrowserRouter>

      </div>

  );
}

export default App;
