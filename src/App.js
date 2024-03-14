import logo from './logo.svg';
import './App.css';
import { Routes,Route, BrowserRouter } from 'react-router-dom';
import Menu from './views/menu';
import Header from './assests/header';
import Operacion from './views/operacion';
import Tipificaciones from './views/supervisores/tipificaciones'
import DescargaCartera from './views/supervisores/descargaCartera';
import InsertarPlanes from './views/gestores/insertarPlanes';
import RevisarPP from './views/supervisores/revisarPP';
import PersonalBazTkm from './views/supervisores/personalBazTkm';
import MenuGestores from './views/gestores/menuGestores';
import RevisarPPGest from './views/gestores/revisarPPGest';
import ReportePagos from './views/supervisores/reportePagos';
import DescargaGestiones from './views/supervisores/descargaGestiones';


function App() {
  return (
    
      <div>
        <Header/>

        <BrowserRouter>
          <Routes>
            <Route exact path='/CLTKM_FRONT/menu' Component={Menu}/>
            
            <Route exact path='/CLTKM_FRONT/supervisores/tipificaciones' Component={Tipificaciones}/>
            <Route exact path='/CLTKM_FRONT/supervisores/bajarCartera' Component={DescargaCartera}/>
            <Route exact path='/CLTKM_FRONT/supervisores/revisarPP' Component={RevisarPP}/>
            <Route exact path='/CLTKM_FRONT/supervisores/personal' Component={PersonalBazTkm}/>
            <Route exact path='/CLTKM_FRONT/supervisores/reportePagos' Component={ReportePagos}/>
            <Route exact path='/CLTKM_FRONT/supervisores/gestiones' Component={DescargaGestiones}/>

            <Route exact path='/CLTKM_FRONT/gestores/menu' Component={MenuGestores}/>
            <Route exact path='/CLTKM_FRONT/gestores/insertarPlanPago' Component={InsertarPlanes}/>
            <Route exact path='/CLTKM_FRONT/gestores/operacion' Component={Operacion}/>
            {/* <Route exact path='/CLTKM_FRONT/gestores/operacion/:clienteUnico' Component={Operacion}/> */}
            <Route exact path='/CLTKM_FRONT/gestores/revisarPPGestor' Component={RevisarPPGest}/>
            
            
          </Routes>
        </BrowserRouter>

      </div>

  );
}

export default App;
