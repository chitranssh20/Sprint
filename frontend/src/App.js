import { Header } from './MyComponents/Header';
import {Filter} from './MyComponents/Filter';
import {Admin} from './MyComponents/Admin'
import { AddProduct } from './MyComponents/AddProduct';
import { Staff } from './MyComponents/Staff';
import { AddStaff } from './MyComponents/AddStaff';
import { SignUp } from './MyComponents/SignUp';
import { LogIn } from './MyComponents/LogIn';
import { UpgradeProduct } from './MyComponents/UpgradeProduct';
import { Product } from './MyComponents/Product';
import { ProductDetail } from './MyComponents/ProductDetail';
import { Cart } from './MyComponents/Cart';
import {
  BrowserRouter, 
  Routes, 
  Route
} from 'react-router-dom'


function App() {




  

  return (
    <>
    <BrowserRouter>
    
    <Header />
    <Filter />
    <Cart />
    <Routes>
    <Route path='/' element = { <Product /> }  />
    
    <Route  path =  '/admin' element= {<Admin />}  />
    <Route path= '/addProduct' element= {<AddProduct />} />
    <Route path = '/upgradeProduct/:id' element= { <UpgradeProduct /> } />
    <Route path = '/product/:prodId' element= { <ProductDetail /> } />
    <Route exact path = '/staff' element= { <Staff /> } />
    <Route path = '/addStaff' element= { <AddStaff /> } />
    <Route path = '/signup' element= { <SignUp /> } />
    <Route path = '/login' element= { <LogIn /> } />
      



    </Routes>

    </BrowserRouter>
    </>
  );
}

export default App;
