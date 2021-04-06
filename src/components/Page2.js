import React from 'react';
import '../styling/page2.css';

const ListItem = props => {
    return (
        <div className = "list_item">
                <div className="title">
                    {props.title}
                </div>
                <div className="column">
                    {props.column}
                </div>
                <div className="type">
                    {props.type}
                </div>
        </div>
    );
}

class Page2 extends React.Component {
    state = {
        sort: 'title',
        item_type: '',
        item_status: ''
    }

    allItems(item) {
        return (
            <ListItem title={item.title} key={item.id} type={item.type}
                      column={item.column} id={item.id}/>
        );
    }

    render() {
        const all_items = this.props.items.map(post => this.allItems(post));
        return (
            <div className="list">
                <div className="list_view">
                    <h2 className="title-view">
                        Title
                    </h2>
                    <h2 className="column-view">
                        Status
                    </h2>
                    <h2 className="type-view">
                        Type
                    </h2>
                </div>
                <ul className="listItem">
                    {all_items}
                </ul>
            </div>
        );
    }

}


export default Page2;