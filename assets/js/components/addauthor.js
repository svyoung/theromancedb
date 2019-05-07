import React from 'react';

class AddAuthor extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.getEmptyState();
    }

    getEmptyState() {
        let emptyState = {
            author: {
                first_name : {
                    value: ''
                },
                last_name : {
                    value: ''
                },
                image_url : {
                    value: ''
                },
                bio : {
                    value: ''
                },
                gender: {
                    value: 'F'
                }
            }
        };
        return emptyState;
    }

    changeHandler(e) {
        const name = e.target.name;
        const value = e.target.value;

        let author_array = this.state.author;
        author_array[name] = {value : value};

        this.setState({
            author: author_array
        });
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

    submitAddHandler() {

    }

    render() {
        const { author } = this.state;
        return (
            <div id="add-author-container" className="container">
                <h1>Add Author</h1>
                <div className="form-group row">
                    <div className="form-group col">
                        <label htmlFor="first_name"></label>
                        <input type="text" className="form-control form-control-lg" name="first_name" placeholder="First name" value={author.first_name.value} onChange={this.changeHandler.bind(this)} />
                    </div>
                    <div className="form-group col">
                        <label htmlFor="last_name"></label>
                        <input type="text" className="form-control form-control-lg" name="last_name" placeholder="Last name" value={author.last_name.value} onChange={this.changeHandler.bind(this)}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="form-group col">
                        <label htmlFor="image_url"></label>
                        <input type="text" className="form-control form-control-lg" name="image_url" placeholder="Image URL" value={author.image_url.value} onChange={this.changeHandler.bind(this)} />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="form-group col">
                        <label htmlFor="bio"></label>
                        <textarea className="form-control form-control-lg" type="textarea" name="bio" onChange={this.changeHandler.bind(this)} value={author.bio.value}></textarea>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="form-group col">
                        <label htmlFor="gender"></label>
                        <select name="gender"  className="form-control form-control-lg" value={author.gender.value} onChange={this.changeHandler.bind(this)}>
                            <option value="F">Female</option>
                            <option value="M">Male</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <button type="button" className="submit-author" onClick={this.submitHandler.bind(this)}>Submit</button>
                    <button type="button" className="submit--add-author" onClick={this.submitAddHandler.bind(this)}>Submit and Add Another AUthor</button>
                </div>
            </div>
        )
    }
}

export default AddAuthor;