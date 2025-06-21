import logo from './logo.svg';
import './App.css';
import Dashboard from './Component/Dashboard.tsx';
import EditProperty from './Component/EditProperty.tsx';
import Login from './Component/Login.tsx';
import PropertyList from './Component/PropertyList.tsx';
import AddProperty from './Component/AddProperty.tsx';
import Layout from './Component/Layout.tsx';
import Header from './Component/Header.tsx';
import { HashRouter as Router, Routes, Route , Navigate} from 'react-router-dom';
import ProtectedRoute from './Component/Protected.tsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/properties" element={<PropertyList />} />
            <Route path="/editProperty" element={<EditProperty />} />
            <Route path="/properties/add" element={<AddProperty />} />
            <Route path="/properties/edit/:id" element={<EditProperty />} />
            <Route path="/header" element={<Header />} />
          </Route>
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}