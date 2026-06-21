import Dashboard2 from "./Dashboard2";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";
import { useState, useEffect } from "react";


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
    }, []);

    useEffect(()=>{
        fetchReferrals();
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
        <div>
            <Navbar />
            <h1>Referral Dashboard</h1>
            <p>Track your referrals, earnings, and partner activity in one place.</p>
                <section> <h2>Overview</h2>
                 {metrics.map(each => (
                     <div key={each.id}>
                         <h1>{each.value}</h1>
                         <p>{each.label}</p>
                     </div>
                 ))}
                 </section> 
                <section> <h2>Service summary</h2>
                <label htmlFor="Service">SERVICE</label>
                <p>{serviceSummary.service}</p>
                <label htmlFor="YourReferrals">YOUR REFERRALS</label>
                <p>{serviceSummary.yourReferrals}</p>
                <label htmlFor="ActiveReferrals">ACTIVE REFERRALS</label>
                <p>{serviceSummary.activeReferrals}</p>
                <label htmlFor="Total referral earnings">TOTAL REF.EARNINGS</label>
                <p>{serviceSummary.totalRefEarnings}</p>
                </section> 
                <section>
                <h2>Refer friends and earn more</h2>
                <div>
                    <div><label htmlFor="YourReferralLink">Your Referral Link</label>
                    <input type="text" id="YourReferralLink" value={referral.link} readOnly />
                    <button type="button" onClick={copyReferralLink}>
                        Copy
                    </button>
                    </div>
                    <div><label htmlFor="YourReferralCode">Your Referral Code</label>
                    <input type="text" id="YourReferralCode" value={referral.code} readOnly />
                    <button type="button" onClick={copyReferralCode}>
                        Copy
                    </button>
                    </div>
                </div>
            </section>
            <Dashboard2 referrals={referrals} searchTerm={searchTerm} setSearchTerm={setSearchTerm} sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </div>
    )

}

export default DashboardPage;