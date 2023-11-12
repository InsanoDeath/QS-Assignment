import React from 'react';
import { status, priority } from './data';
import './App.css';

function Card({ item, data }) {

    return (
        <div className='card'>
            <div className='d-flex justify-content-between align-items-center pt-10'>
                <h5 className='text-muted'>{item.id}</h5>
                <div className="avatar avatar-indicators avatar-offline" status={String(data.users.find(f => f.id == item.userId).available)}>
                    <img alt="avatar" src="https://avatars.akamai.steamstatic.com/7709527371f65e33d818398827ca089fa4bf53ad_full.jpg" className="rounded-circle" />
                </div>
            </div>
            <div className='d-flex justify-content-center'>
                <h5 dangerouslySetInnerHTML={{ __html: status.find(f => f[0] == item.status)[1] }} />
                <h5>{item.title}</h5>
            </div>
            <div className='d-flex'>
                <div className='border border-round mr-5 text-muted'>
                    <div className='d-flex align-items-center' dangerouslySetInnerHTML={{ __html: priority.find(f => f[0] == item.priority)[2] }} />
                </div>
                <div className='border border-round text-muted d-flex align-items-center'>
                    <svg className='mr-5' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" /></svg>
                    {item.tag[0]}
                </div>
            </div>
        </div>
    );
}

export default Card;