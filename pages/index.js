import DOMPurify from 'dompurify';
import React from 'react'

const Index = (data) => {
    return (
        <div className="content mt-5">
            <article className="doc">
                {data.data && <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.data) }}></div>}
            </article>
        </div>
    )
}
export default Index