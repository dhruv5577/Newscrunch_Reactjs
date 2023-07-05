import React, { Component } from 'react'
import abc from './abc.gif'

export class spinner extends Component {
    render() {
        return (
            <div className='text-center'>
                <img className="my-3" src={abc} alt="abc" />
            </div>
        )
    }
}

export default spinner
