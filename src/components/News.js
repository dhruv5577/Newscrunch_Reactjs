import React, { Component } from 'react'
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
// import PropTypes from 'prop-types'




export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 5,
        category: "Science",
    }
    // static PropTypes = {
    //     country: PropTypes.string,
    //     pageSize: PropTypes.number,

    // }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)}--Newscrunch`
    }

    async updatenews() {
        this.props.setProgress(10);
        const url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.props.setProgress(30);
        this.setState({ loading: true });
        let parsedata = await data.json();
        this.props.setProgress(70);
        console.log(parsedata);
        this.setState({ articles: parsedata.articles, totalResults: parsedata.totalResults, loading: false })
        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.updatenews();
    }
    handleprev = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updatenews();


    }
    handlenext = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updatenews();
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedata = await data.json();
        console.log(parsedata);
        this.setState({ articles: this.state.articles.concat(parsedata.articles), totalResults: parsedata.totalResults })
    };
    render() {
        return (
            <>
                <h1 className="text-center" style={{ margin: '30px 0px' }}>Newscrunch --- Top  {this.capitalizeFirstLetter(this.props.category)} headlines  </h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<h4><Spinner /></h4>}
                >
                    <div className="container">

                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <Newsitem title={element.title ? element.title.slice(0, 20) : ""} description={element.description ? element.description.slice(0, 60) : ""} imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

            </>
        )
    }
}

export default News
