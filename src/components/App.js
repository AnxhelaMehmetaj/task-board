import React from 'react';

import PageTabs from './PageTabs';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import axios from 'axios';

class App extends React.Component {
    state = {
        view: 'page1',
        all_items: [],
        sorted_items: {
            todo_items: [],
            inProgress_items: [],
            review_items: [],
            done_items: []
        }
    }
    componentDidMount() {
        this.getData();
    }

    getData(){
        axios.get('http://my-json-server.typicode.com/bnissen24/project2DB/posts')
            .then(response => {
                this.setState({all_items: response.data, sorted_items: this.sortItems(response.data)});
            }).catch (error => {
            this.setState({errorMessage: error.message});
        });
    }
    sortItems(item){
        return {
            todo_items: item.filter(post => post.column === 'todo'),
            inProgress_items: item.filter(post => post.column === 'in-progress'),
            review_items: item.filter(post => post.column === 'review'),
            done_items: item.filter(post => post.column ==='done')
        }
    }

    updateItem(indiv_item){
        let all_items = this.state.all_items;
        const current_position = all_items.findIndex(item => item.id === indiv_item.id);
        all_items[current_position] = indiv_item;

        const sorted_items = this.sortItems(all_items);
        this.setState({all_items, sorted_items});
    }

    onViewChange(view) {
        this.setState({ view });
    }

    wrapPage(jsx) {
        const { view } = this.state;
        return (
            <div className="container">
                <PageTabs currentView={view}
                          onViewChange={this.onViewChange.bind(this)}/>
                {jsx}
            </div>
        );
    }

    render() {
        const { view } = this.state;

        switch (view) {
            case 'page1':
                return (this.wrapPage(
                    <Page1 items ={this.state.sorted_items} updateItem={item => this.updateItem(item)}/>));
            case 'page2':
                return (this.wrapPage(
                    <Page2 items = {this.state.all_items}/>
                ));
            case 'page3':
                return (this.wrapPage(
                    <Page3 />
                ));
            default:
                return (this.wrapPage(
                    <h2>Invalid Tab, choose another</h2>
                ));
        }

    }
}

export default App;