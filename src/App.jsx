import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from './components/table';
import Form from './components/form';
import Edit from './components/edit';
import { BrowserRouter as Router , Route, Routes} from "react-router-dom"
import CategoryTable from './components/category-crud/category-table';
import CategoryForm from './components/category-crud/category-form';
import CategoryEdit from './components/category-crud/category-edit';
// import Editdata from './Components/Editdata';

function App() {
  
  return (
    <>
    <Router >
      <Routes>
      <Route exact path='/' element={<Table /> } />
      <Route exact path='/form' element={<Form />} />
      <Route exact path='/edit/:id' element={<Edit />} />   
      <Route exact path='/CategoryTable' element={<CategoryTable />} />   
      <Route exact path='/CategoryTable/Form' element={<CategoryForm />} />   
      <Route exact path='/CategoryTable/Edit-Category/:id' element={<CategoryEdit />} />   
      </Routes>
    </Router>
    </>
  )
}

export default App
