import React, { useEffect, useState } from 'react';
import Card from './Card';
import { status, priority } from './data';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [ordering, setOrdering] = useState(localStorage.getItem('ordering') || 'priority');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (event, type) => {
    const { value } = event.target;
    if (type === 'grouping') {
      setGrouping(value);
      localStorage.setItem('grouping', value);
    } else {
      setOrdering(value);
      localStorage.setItem('ordering', value);
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    })();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available.</div>;
  }

  // Sorting
  if (ordering == "title") {
    data.tickets.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    })
  } else {
    data.tickets.sort((a, b) => {
      return b.priority - a.priority;
    })
  }

  return (
    <div>
      {/* Header */}
      <div className="header-container">
        <div className="btn-group mb-2 me-4">
          <button className="btn" onClick={toggleDropdown}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
            <span>Display</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
          </button>
          {isOpen && (
            <div className="dropdown-content">
              <div className='d-flex justify-content-between'>
                <span>Grouping</span>
                <select className='btn' value={grouping} onChange={(e) => handleOptionChange(e, 'grouping')}>
                  <option value={"status"}>Status</option>
                  <option value={"user"}>User</option>
                  <option value={"priority"}>Priority</option>
                </select>
              </div>
              <div className='d-flex justify-content-between'>
                <span>Ordering</span>
                <select className='btn' value={ordering} onChange={(e) => handleOptionChange(e, 'ordering')}>
                  <option value={"priority"}>Priority</option>
                  <option value={"title"}>Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main container */}
      {/* Group: Status */}
      {grouping == "status" && (
        <div className='container'>
          {status.map((item, index) => (
            <div className='col'>
              <div className='head'>
                <div className='d-flex'>
                  <span className='d-flex align-items-center' dangerouslySetInnerHTML={{ __html: item[1] + " " + item[0] }} />
                  <span className='text-muted'>
                    {data.tickets.filter(f => f.status == item[0]).length}
                  </span>
                </div>
                <div className='right'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" /></svg>
                </div>
              </div>
              <div className='card-div'>
                {data.tickets.filter(f => f.status == item[0]).map((item, index) => (
                  <Card item={item} data={data} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Group: User */}
      {grouping == "user" && (
        <div className='container'>
          {data.users.map((item, index) => (
            <div className='col'>
              <div className='head'>
                <div className='left'>
                  <span>
                    <div className="avatar avatar-indicators avatar-offline mr-5" status={item.available}>
                      <img alt="avatar" src="https://avatars.akamai.steamstatic.com/7709527371f65e33d818398827ca089fa4bf53ad_full.jpg" className="rounded-circle" />
                    </div>
                    {item.name}
                  </span>
                  <span className='text-muted'>
                    {data.tickets.filter(f => f.userId == item.id).length}
                  </span>
                </div>
                <div className='right'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" /></svg>
                </div>
              </div>
              <div className='card-div'>
                {data.tickets.filter(f => f.userId == item.id).map((item, index) => (
                  <Card item={item} data={data} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Group: Priority */}
      {grouping == "priority" && (
        <div className='container'>
          {priority.map((item, index) => (
            <div className='col'>
              <div className='head'>
                <div className='left'>
                  <span dangerouslySetInnerHTML={{ __html: item[2] + " " + item[1] }} />
                  <span className='text-muted'>
                    {data.tickets.filter(f => f.priority == index).length}
                  </span>
                </div>
                <div className='right'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" /></svg>
                </div>
              </div>
              <div className='card-div'>
                {data.tickets.filter(f => f.priority == index).map((item, index) => (
                  <Card item={item} data={data} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;