import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ReferralDetailsPage from './pages/ReferralDetailsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/referral/:id" element={<ReferralDetailsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App