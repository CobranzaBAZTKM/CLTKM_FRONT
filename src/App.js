import logo from './logo.svg';
import './App.css';
import { Routes,Route, BrowserRouter } from 'react-router-dom';
import Menu from './views/menu';
import Header from './assests/header';
import Operacion from './views/operacion';
import BajarListasBlaster from './views/supervisores/bajarListasBlaster'
import DescargaCartera from './views/supervisores/descargaCartera';
import InsertarPlanes from './views/gestores/insertarPlanes';
import RevisarPP from './views/supervisores/revisarPP';
import PersonalBazTkm from './views/supervisores/personalBazTkm';
import MenuGestores from './views/gestores/menuGestores';
import RevisarPPGest from './views/gestores/revisarPPGest'


function App() {
  return (
    
      <div>
        <Header/>

        <BrowserRouter>
          <Routes>
            <Route exact path='/CLTKM_FRONT/menu' Component={Menu}/>
            
            <Route exact path='/CLTKM_FRONT/supervisores/bajarListasBlasters' Component={BajarListasBlaster}/>
            <Route exact path='/CLTKM_FRONT/supervisores/bajarCartera' Component={DescargaCartera}/>
            <Route exact path='/CLTKM_FRONT/supervisores/revisarPP' Component={RevisarPP}/>
            <Route exact path='/CLTKM_FRONT/supervisores/personal' Component={PersonalBazTkm}/>

            <Route exact path='/CLTKM_FRONT/gestores/menu' Component={MenuGestores}/>
            <Route exact path='/CLTKM_FRONT/gestores/insertarPlanPago' Component={InsertarPlanes}/>
            <Route exact path='/CLTKM_FRONT/gestores' Component={Operacion}/>
            <Route exact path='/CLTKM_FRONT/gestores/revisarPPGestor' Component={RevisarPPGest}/>
            
            
          </Routes>
        </BrowserRouter>

      </div>

  );
}

export default App;
