import React, { useState, useEffect } from 'react';

function MonthRewards() {
  const [data, setData] = useState([[[]]]);
  const [isLoading, setIsLoading] = useState(true);
  const [months, setMonths] = useState([]);
  const [users, setUsers] = useState([]);  

  const transaction = amount => ( amount > 100 ? amount - 100 : 0 ) * 2 + ( amount > 50 ? ( amount > 100 ? 50 : amount - 50 ) : 0 ) ;
  const sum = (previous, current) => previous + current ;

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
	  .then((data) => {
        setData(data.data);
        setMonths(data.months);
	setUsers(data.users);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>Monthly Rewards</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Month</th>
		{ users.map((user, userIndex) => (
		    <th key={`user-${userIndex}`}>{user}</th>
		) ) }	
	      <th>Total</th>
            </tr>
          </thead>
          <tbody>
	      {data.map((month,monthIndex)=> (
		  <tr key={`month-${monthIndex}`}>
		      <th>{months[monthIndex]}</th>
		      { month.map((user, userIndex) => (
			  <td key={`user-${userIndex}-${monthIndex}`}>{user.map(transaction).reduce(sum)}</td>
		      ))}
		      <td key={monthIndex}>{month.reduce((previous,current)=>previous.concat(current)).map(transaction).reduce(sum)}</td>
		  </tr>
	      ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MonthRewards;
