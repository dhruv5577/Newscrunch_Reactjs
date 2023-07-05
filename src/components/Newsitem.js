import React, { Component } from 'react'

export class Newsitem extends Component {

    render() {
        let { title, description, imgurl, newsurl, author, date, source } = this.props;
        return (
            <div className="my-3">

                <div className="card" >
                    <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                        <span className=" badge rounded-pill bg-success" >
                            {source}
                            <span class="visually-hidden">unread messages</span>
                        </span>

                    </div>

                    <img src={imgurl} className="card-img-top" alt="" />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text small text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</p>
                        <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>

                </div>

            </div>
        )
    }
}

export default Newsitem
