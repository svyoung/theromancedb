import React from 'react';
import ReactDOM from 'react-dom';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear()
        }
    }
    render() {
        return (
            <footer id="footer">
                <a className="trdb_logo_small" href="/"></a> <span>The Romance DB &copy; {this.state.year} <a href="http://samvyoung.com" target="_blank">The Artgineer</a>.</span>
            </footer>
        )
    }
}

export default Footer;