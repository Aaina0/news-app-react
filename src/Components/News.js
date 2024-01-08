import React, { Component } from 'react';
import NewsItem from './NewsItem';
// import { render } from '@testing-library/react';

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url =
      'https://newsapi.org/v2/top-headlines?country=us&apiKey=eeb1b3b0528b452a87cc90de76aec360';
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ articles: parseData.articles, totalArticles: parseData.totalResults });
  }

  handlePreviousClick = async () => {
    console.log('Previous');
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=eeb1b3b0528b452a87cc90de76aec360&page=${this.state.page - 1
      }&pageSize=5`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
    });
  };

  handleNextClick = async () => {
    console.log('Next');
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=eeb1b3b0528b452a87cc90de76aec360&page=${this.state.page + 1
        }&pageSize=5`;
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
      })
    }
  };

  render() {
    console.log('render');
    return (
      <div className='container my-3'>
        <h2>My News Headlines</h2>
        <div className='row'>
          {this.state.articles.map((element) => {
            return (
              <div className='col-md-3' key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ''}
                  description={element.description ? element.description : ''}
                  ImageUrl={element.ImageUrl ? element.urlToImage : ''}
                  url={element.url ? element.url : ''}
                />
              </div>
            );
          })}
        </div>
        <div className='container d-flex justify-content-between'>
          <button
            disabled={this.state.page <= 1}
            type='button'
            class='btn btn-dark'
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 5)}
            type='button'
            class='btn btn-dark'
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
