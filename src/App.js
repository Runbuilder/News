import React, { useEffect, useState } from 'react';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

function App() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        base('경제뉴스')
            .select({ view: 'Grid view' })
            .eachPage((records, fetchNextPage) => {
                setNews(records.map(record => ({
                    id: record.id,
                    title: record.get('제목'),
                    content: record.get('내용'),
                    category: record.get('카테고리'),
                    date: record.get('날짜'),
                })));
                fetchNextPage();
            }, (err) => {
                if (err) {
                    console.error('Airtable 에러:', err);
                    console.log('에러 세부 정보:', JSON.stringify(err, null, 2));
                }
            });
    }, []);
    
    return (
        <div>
            <h1>카드 뉴스</h1>
            {news.map(item => (
                <div key={item.id} className="card">
                    <h2>{item.title}</h2>
                    <p>{item.content}</p>
                    <p>카테고리: {item.category}</p>
                    <p>날짜: {item.date}</p>
                </div>
            ))}
        </div>
    );
}

export default App;
