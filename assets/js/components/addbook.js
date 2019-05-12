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
                amzn_url: {
                    value: '',
                    required: false
                },
                gr_url: {
                  value: '',
                  required: false
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
        let name = e.target.name, value = e.target.value, book_array = this.state.book;
        book_array[name] = {value : value};

        this.setState({
            book: book_array
        });
    }

    // retrieving list of authors or publishers from database with async endpoints
    changeGetData(e) {
        const val = e.target.value, isPublisher = !!e.target.dataset['isPublisher'];
        let endpoint, payload;
        if(isPublisher) {
            this.setState({publisher_name: val});
            endpoint = '/search-publisher-name';
            payload = {
                search: 'publisher_name',
                list: 'publishers_list'
            };
        } else {
            this.setState({author_name: val});
            endpoint = '/search-author-name';
            payload = {
                search: 'author_name',
                list: 'authors_list'
            };
        }

        setTimeout(()=> {
            if(val === '') {
                this.setState({[payload.list]: []});
            } else if(val.length > 2) {
                this.fetchData(endpoint, payload);
            }
        }, 500);
    }

    fetchData(endpoint, payload) {
        fetch(endpoint, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state[payload.search])
        })
            .then(response => response.json())
            .then(data => this.setState({[payload.list]: data}))
            .catch(err => console.log(err.message));
    }

    // selecting from list of authors or publishers
    // to enter in author_id or publisher_id into book array payload
    selectData(e) {
        const name = e.target.dataset['name'],
            nameVal = e.target.dataset['nameValue'],
            idVal = e.target.dataset['idValue'],
            isPublisher = !!e.target.dataset['publisherId'];

        let book_arr = this.state.book, keyVal;
        if(isPublisher) {
            keyVal = {
                id: 'publisher_id',
                list: 'publishers_list'
            };
        } else {
            keyVal = {
                id: 'author_id',
                list: 'authors_list'
            };
        }

        book_arr[keyVal.id]['value'] = idVal;
        this.setState({
            book: book_arr,
            [name]: nameVal,
            [keyVal.list]: []
        })
    }

    // adding entry to book db via async
    // TODO: handle result sets
    submitHandler() {
        //TODO: REQUIRED FIELDS ERROR HANDLING

        fetch('/add-book', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state.book)
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
                        <input type="text" className="form-control form-control-lg" name="author_name" placeholder="Author" data-is-author={true} value={author_name} onChange={this.changeGetData.bind(this)} required={book.author_id.required}/>
                        <input type="hidden" name="author_id" value={book.author_id.value} required={book.author_id.required}/>
                        <ul className="author-list-container">
                        {authors_list.map(author =>
                            <li key={author.id} className="author-item" data-id-value={author.id} data-name="author_name" data-name-value={`${author.first_name} ${author.last_name}`} onClick={this.selectData.bind(this)}>{author.first_name} {author.last_name}</li>
                        )}
                        </ul>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="image_url">Book Image URL</label>
                        <input type="text" className="form-control form-control-lg" name="image_url" placeholder="Image URL" value={book.image_url.value} onChange={this.changeHandler.bind(this)} required={book.image_url.required}/>
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
                    <input type="text" className="form-control form-control-lg" name="publisher_name" placeholder="Publisher" data-is-publisher={true} value={publisher_name} onChange={this.changeGetData.bind(this)} required={book.publisher_id.required} />
                    <ul className="publisher-list-container">
                        {publishers_list.map(publisher =>
                            <li key={publisher.id} className="publisher-item" data-id-value={publisher.id} data-name="publisher_name" data-name-value={publisher.name} data-publisher-id={publisher.id} onClick={this.selectData.bind(this)}>{publisher.name}</li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="form-group row">
                <div className="form-group col">
                    <label htmlFor="rating">Amazon URL</label>
                    <input className="form-control form-control-lg" type="text" name="amzn_url" onChange={this.changeHandler.bind(this)} value={book.amzn_url.value} required={book.amzn_url.required}/>
                </div>
                <div className="form-group col">
                    <label htmlFor="page_count">Goodreads URL</label>
                    <input className="form-control form-control-lg" type="text" name="gr_url" onChange={this.changeHandler.bind(this)} value={book.gr_url.value} required={book.gr_url.required}/>
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
                <button type="button" className="submit-book primary" onClick={this.submitHandler.bind(this)}>Submit</button>
                {/*<button type="button" className="submit--add-author" onClick={this.submitAddHandler.bind(this)}>Submit and Add Another AUthor</button>*/}
            </div>
        </div>
        )
    }
}

export default AddBook;