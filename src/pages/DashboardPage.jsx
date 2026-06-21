import Dashboard2 from "./Dashboard2";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";
import { useState, useEffect } from "react";
import "../styles/dashboard.css"


function DashboardPage() {
    const [metrics, setMetrics] = useState([]);
    const [serviceSummary, setServiceSummary] = useState({});
    const [referrals, setReferrals]= useState([]);
    const [referral, setReferral] = useState({});

    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("desc");

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

   

    const copyReferralLink = () => {
    navigator.clipboard.writeText(referral.link);
};

const copyReferralCode = () => {
    navigator.clipboard.writeText(referral.code);
};


    const token=Cookie.get('jwt_token');
    

    console.log(token);
    const url="https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals";
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

     

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(url, options);
            
            const data = await response.json();
    
            setReferrals(data.data.referrals);
            setMetrics(data.data.metrics);
            setServiceSummary(data.data.serviceSummary);
            setReferral(data.data.referral);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchReferrals = async () => {
        try{
            const reponse=await fetch(`https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?search=${searchTerm}&sort=${sortOrder}`, options);
            
            if(reponse.ok){
                const data=await reponse.json();
                setReferrals(data.data.referrals);
            }else{
                console.error('Error fetching referrals:', reponse.statusText);
                setError('Failed to fetch referrals');
            }
        }catch(error){
           setError(error.message);
    }
    }
    useEffect(() => {
        fetchData();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    
    }, []);

    useEffect(()=>{
        fetchReferrals();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    
    },[searchTerm,sortOrder])

    if (!token) {
        return <Navigate to="/login" />
    }

    if(isLoading){
        return <p>Loading...</p>
    }
    if(error){
        return <p>Error: {error}</p>
    }

    return (
        <div className="dashboard-container">
            <Navbar />
            <h1>Referral Dashboard</h1>
            <p>Track your referrals, earnings, and partner activity in one place.</p>
                <section className="dashboard-section"> <h2>Overview</h2>
                <div className="metrics-grid">
                 {metrics.map(each => (
                     <div key={each.id} className="metric-card">
                         <h1>{each.value}</h1>
                         <p>{each.label}</p>
                     </div>
                 ))}
                 </div>
                 </section> 
                <section className="dashboard-section"> <h2 className="section-title">Service summary</h2>
                <div className="summary-inline-row">
                <div className="summary-item">
                <label className="summary-label">SERVICE</label>
                <p className="summary-value">{serviceSummary.service}</p>
                </div>

                <div className="summary-item">
                <label className="summary-label">YOUR REFERRALS</label>
                <p className="summary-value">{serviceSummary.yourReferrals}</p>
                </div>

                <div className="summary-item">
                <label className="summary-label">ACTIVE REFERRALS</label>
                <p className="summary-value">{serviceSummary.activeReferrals}</p>
                </div>

                <div className="summary-item">
                <label className="summary-label">TOTAL REF.EARNINGS</label>
                <p className="summary-value">{serviceSummary.totalRefEarnings}</p>
                </div>

                </div>
                </section> 

                <section className="dashboard-section">
                <h2 className="section-title">Refer friends and earn more</h2>
                <div className="referral-flex-container">

                    <div className="input-field-group">
                        <label htmlFor="YourReferralLink" className="field-title">Your Referral Link</label>
                        <div className="input-action-wrapper">
                        <input type="text" id="YourReferralLink" value={referral.link} readOnly className="dashboard-input" />
                        <button type="button" onClick={copyReferralLink} className="action-button">Copy</button>
                        </div>
                    </div>


                    <div className="input-field-group">
                        <label htmlFor="YourReferralCode" className="field-title">Your Referral Code</label>
                        <div className="input-action-wrapper">
                            <input type="text" id="YourReferralCode" value={referral.code} readOnly className="dashboard-input" />
                            <button type="button" onClick={copyReferralCode} className="action-button">
                                Copy
                            </button>
                        </div>
                    </div>

                </div>
            </section>
            <Dashboard2 referrals={referrals} searchTerm={searchTerm} setSearchTerm={setSearchTerm} sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </div>
    )

}

export default DashboardPage;