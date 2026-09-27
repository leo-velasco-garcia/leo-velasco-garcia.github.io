import { Outlet } from 'react-router-dom'
import NavMovil from './NavMovil.jsx'

const RootLayout = () => (
    <div className="rootLayout">
        <NavMovil />
        <Outlet />
    </div>
)

export default RootLayout
