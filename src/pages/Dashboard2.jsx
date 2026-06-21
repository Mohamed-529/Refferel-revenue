import ReferralDetailsPage from "./ReferralDetailsPage";
import { useNavigate } from "react-router-dom";
import {useState} from "react";

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
        <section>
          <h1>All referrals</h1>
          <div>
            <div> <label htmlFor="Search">Search</label>
            <input type="text" id="Search" placeholder="Name or service..." value={searchTerm} onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
            }} />
            </div>
            <div>
                <label htmlFor="Sortbydate">Sort by date</label>
                <select id="sort" value={sortOrder} onChange={(e) => {
                    setSortOrder(e.target.value);
                    setCurrentPage(1);
                }}>
                    <option value="desc">Newest first</option>
                    <option value="asc">Oldest first</option>
                </select>
            </div>
          </div>
          <table>
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
            <td colSpan="4">No referrals found.</td>
        </tr>
    ) : (
        currentReferrals.map(each=>(
            <tr key={each.id} onClick={() => navigate(`/referral/${each.id}`)}>
                <td>{each.name}</td>
                <td>{each.serviceName}</td>
                <td>{each.date}</td>
            <td>{each.profit}</td>
        </tr>
    )))}
  </tbody>
</table>
<div>
    <div>
        <p>Showing {firstIndex + 1}-{lastIndex} of {referrals.length} entries</p>
    </div>
    <div>
        {currentPage > 1 ? <button type="button" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>: <button type="button" disabled>Previous</button>}
        <button type="button" onClick={() => setCurrentPage(1)}>1</button>
        <button type="button" onClick={() => setCurrentPage(2)}>2</button>
        <button type="button" onClick={() => setCurrentPage(3)}>3</button>
        <button type="button" onClick={() => setCurrentPage(4)}>4</button>
        <button type="button" onClick={() => setCurrentPage(5)}>5</button>
        {currentPage < 5 ? <button type="button" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>: <button type="button" disabled>Next</button>}
    </div>
</div>
        </section>

       <section>
        <div>
            <h1>Go Business</h1>
            <p>About</p>
            <p>Contact</p>
            <p>Privacy</p>
            <p>Terms</p>
            <p>© 2024 Go Business, Inc.</p>
        </div>
       </section>
       </>
    )
}
export default Dashboard2;