import React, { Component } from 'react';
import axios from 'axios'

class Fibonacci extends Component {

    state = {
        seenIndexes: [],
        values: {},
        index: ''
    }

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data || []});
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({ seenIndexes: seenIndexes.data || []});
    }

    renderSeenIndexes() {
        const seenIndexes = this.state.seenIndexes || [];
        return seenIndexes.map(({ number }) => number).join(', ');
    }

    renderValues() {
        const entries = [];
        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index {key} I Calculated {this.state.values[key]}
                </div>
            );
        }
        return entries;
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('/api/values', {
            index: this.state.index
        });
        this.fetchIndexes();
        this.fetchValues();        
        this.setState({index: ''});
    }

    render() {
        return (
            <div className="container">

                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Fibonacci App. Version 2</h5>
                        <form onSubmit={this.handleSubmit}>
                            <label>Enter your index</label>
                            <input type="text" value={this.state.index} onChange={event => this.setState({ index: event.target.value })} />
                            <button>Submit</button>
                        </form>
                        <h4>Indexes I Have Seen:</h4>
                        {this.renderSeenIndexes()}
                        <h4>Calculated Values:</h4>
                        {this.renderValues()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Fibonacci;