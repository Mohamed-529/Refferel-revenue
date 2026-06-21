import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ReferralDetailsPage from './pages/ReferralDetailsPage'
import NotFound from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/referral/:id" element={<ReferralDetailsPage />} />
        <Route path="/not-found" element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App