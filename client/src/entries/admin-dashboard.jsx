import mount from './mount'
import AdminDashboard from '../pages/AdminDashboard'
if (!localStorage.getItem('bbt_admin_token')) window.location.replace('/admin/login/')
else mount(<AdminDashboard />)
