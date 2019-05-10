import React from 'react';

class AddBook extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.getEmptyState();
    }

    getEmptyState() {
        return {
            book: {
                title : {
                    value: '',
                    required: true
                },
                author_id : {
                    value: '',
                    required: true
                },
                image_url : {
                    value: '',
                    required: false
                },
                description: {
                    value: '',
                    required: true
                },
                publication_month : {
                    value: '',
                    required: true
                },
                publication_year: {
                    value: '',
                    required: true
                },
                publisher_id: {
                    value: '',
                    required: true
                },
                rating: {
                    value: '',
                    required: false
                },
                page_count: {
                    value: '',
                    required: false
                }
            },
            author_name: '',
            authors_list: [],
            publisher_name: '',
            publishers_list: []
        };
    }

    changeHandler(e) {
        const name = e.target.name;
        const value = e.target.value;

        let book_array = this.state.book;
        book_array[name] = {value : value};

        this.setState({
            book: book_array
        });
    }

    changeGetAuthor(e) {
        const val = e.target.value;
        this.setState({
            author_name: val
        });

        setTimeout(()=> {
            if(val === '') {
                this.setState({authors_list: []})
            } else if(val.length > 2) {
                fetch('/search-author-name', {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(this.state.author_name)
                })
                    .then(response => response.json())
                    .then(data => this.setState({authors_list: data}));
            }
        }, 500);

    }

    changeGetPublisher(e) {
        const val = e.target.value;
        this.setState({
            publisher_name: val
        });

        setTimeout(()=> {
            if(val === '') {
                this.setState({publishers_list: []})
            } else if(val.length > 2) {
                fetch('/search-publisher-name', {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(this.state.publisher_name)
                })
                    .then(response => response.json())
                    .then(data => this.setState({publishers_list: data}));
            }
        }, 500);
    }

    selectAuthor(author_id, author_name) {
        let book_arr = this.state.book;
        book_arr['author_id']['value'] = author_id;
        this.setState({
            book: book_arr,
            author_name: author_name
        });
        this.setState({authors_list: []})
    }

    selectPublisher(publisher_id, publisher_name) {
        let book_arr = this.state.book;
        book_arr['publisher_id']['value'] = publisher_id;
        this.setState({
            book: book_arr,
            publisher_name: publisher_name
        });
        this.setState({publishers_list: []})
    }

    submitHandler() {
        fetch('/add-author', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state.author)
        })
            .then((result) => result.json())
            .then((data) => { console.log('data is ' + data); })
            .catch(err => console.log('Oops! ' + err.message));
        this.setState(this.getEmptyState());
    }

    render() {
        const { book, author_name, authors_list, publisher_name, publishers_list} = this.state;
        return (
            <div id="add-book-container" className="container">
                <h1>Add Book</h1>
                <div className="form-group row">
                    <div className="form-group col">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control form-control-lg" name="title" placeholder="Title" value={book.title.value} onChange={this.changeHandler.bind(this)} required={book.title.required} />
                    </div>
                </div>
                <div className="form-group row" id="author-input">
                    <div className="form-group col">
                        <label htmlFor="author_name">Author</label>
                        <input type="text" className="form-control form-control-lg" name="image_url" placeholder="Author" value={author_name} onChange={this.changeGetAuthor.bind(this)} required={book.author_id.required}/>
                        <ul className="author-list-container">
                        {authors_list.map(author =>
                            <li key={author.id} className="author-item" data-author-id={author.id} onClick={this.selectAuthor.bind(this, author.id, `${author.first_name} ${author.last_name}`)}>{author.first_name} {author.last_name}</li>
                        )}
                        </ul>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="image_url">Book Image URL</label>
                        <input type="text" className="form-control form-control-lg" name="image_url" placeholder="Image URL" value={book.image_url.value} onChange={this.changeGetAuthor.bind(this)} required={book.image_url.required}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="form-group col">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control form-control-lg" name="description" onChange={this.changeHandler.bind(this)} value={book.description.value} required={book.description.required} placeholder="Book description" />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="form-group col">
                        <label htmlFor="publication_month">Publication Month</label>
                        <select name="publication_month"  className="form-control form-control-lg" value={book.publication_month.value} onChange={this.changeHandler.bind(this)} required={book.publication_month.required} >
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="publication_year">Publication Year</label>
                        <input className="form-control form-control-lg" type="text" name="publication_year" onChange={this.changeHandler.bind(this)} value={book.publication_year.value} required={book.publication_year.required}/>
                    </div>
                </div>
            <div className="form-group row">
                <div className="form-group col">
                    <label htmlFor="publisher_name">Publisher</label>
                    <input type="text" className="form-control form-control-lg" name="publisher_name" placeholder="Publisher" value={publisher_name} onChange={this.changeGetPublisher.bind(this)} required={book.publisher_id.required} />
                    <div className="author-list-container">
                        {publishers_list.map(publisher =>
                            <div key={publisher.id} className="publisher-item" data-publisher-id={publisher.id} onClick={this.selectPublisher.bind(this, publisher.id, publisher.name)}>{publisher.name}</div>
                        )}
                    </div>
                </div>
            </div>
                <div className="form-group row">
                    <div className="form-group col">
                        <label htmlFor="rating">Rating</label>
                        <input className="form-control form-control-lg" type="text" name="rating" onChange={this.changeHandler.bind(this)} value={book.rating.value} required={book.rating.required}/>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="page_count">Page Count</label>
                        <input className="form-control form-control-lg" type="text" name="page_count" onChange={this.changeHandler.bind(this)} value={book.page_count.value} required={book.page_count.required}/>
                    </div>
                </div>
                <div className="form-group">
                    <button type="button" className="submit-book" onClick={this.submitHandler.bind(this)}>Submit</button>
                    {/*<button type="button" className="submit--add-author" onClick={this.submitAddHandler.bind(this)}>Submit and Add Another AUthor</button>*/}
                </div>
            </div>
        )
    }
}

export default AddBook;