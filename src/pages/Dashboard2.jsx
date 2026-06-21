import ReferralDetailsPage from "./ReferralDetailsPage";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import "../styles/dashboard2.css"

function Dashboard2(props){
    const { referrals, searchTerm, setSearchTerm, sortOrder, setSortOrder } = props;
    const navigate = useNavigate();

    const [currentPage, setCurrentPage]= useState(1);
    const itemsEveryPage=10;
    const lastIndex=currentPage*itemsEveryPage;
    const firstIndex=lastIndex-itemsEveryPage;
    const currentReferrals=referrals.slice(firstIndex, lastIndex);


    return(
        <>
        <section className="dashboard-section table-card-section">
          <h1 className="section-title main-table-title">All referrals</h1>
          <div className="table-filter-bar">
            <div className="filter-input-group"> <label htmlFor="Search">Search</label>
            <input type="text" id="Search" className="search-input-field" placeholder="Name or service..." value={searchTerm} onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
            }} />
            </div>

            <div className="filter-input-group">
                <label htmlFor="Sortbydate" className="filter-label">Sort by date</label>
                <select id="sort" value={sortOrder} className="sort-dropdown-field" onChange={(e) => {
                    setSortOrder(e.target.value);
                    setCurrentPage(1);
                }}>
                    <option value="desc">Newest first</option>
                    <option value="asc">Oldest first</option>
                </select>
            </div>
          </div>
          <table className="referrals-data-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Service</th>
      <th>Date</th>
      <th>Profit</th>
    </tr>
  </thead>

  <tbody>
    {currentReferrals.length === 0 ? (
        <tr>
            <td colSpan="4" className="no-data-cell">No referrals found.</td>
        </tr>
    ) : (
        currentReferrals.map(each=>(
            <tr key={each.id} className="table-clickable-row" onClick={() => navigate(`/referral/${each.id}`)}>
            <td className="text-dark-cell">{each.name}</td>
            <td className="text-muted-cell">{each.serviceName}</td>
            <td className="text-muted-cell">{each.date}</td>
            <td className="text-profit-cell">${each.profit}</td>
        </tr>
    )))}
  </tbody>
</table>
<div className="table-pagination-row">
    <div className="pagination-info-text">
        <p>Showing {firstIndex + 1}-{lastIndex} of {referrals.length} entries</p>
    </div>
    <div className="pagination-buttons-wrapper">
        {currentPage > 1 ? <button type="button" className="nav-page-btn" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>: <button type="button" className="nav-page-btn" disabled>Previous</button>}
        
        {[1, 2, 3, 4, 5].map(num => (
            <button key={num} type="button" className={`number-page-btn ${currentPage === num ? 'active-page-btn' : ''}`} onClick={() => setCurrentPage(num)}>
                {num}
            </button>
        ))}
       


        {currentPage < 5 ? <button type="button" className="nav-page-btn" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>: <button type="button" className="nav-page-btn" disabled>Next</button>}
    </div>
</div>
        </section>

       <footer className="dashboard-single-line-footer">
        <div className="footer-brand-title">
            Go Business
            <div className="footer-links-row">
            <p>About</p>
            <p>Contact</p>
            <p>Privacy</p>
            <p>Terms</p>
            <p className="footer-copyright-text" >© 2024 Go Business, Inc.</p>
        </div>
        </div>
       </footer>
       </>
    )
}

export default Dashboard2;