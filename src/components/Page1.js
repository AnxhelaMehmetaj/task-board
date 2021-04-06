import React from 'react';

import '../styling/page1.css';

const columns = ["todo", "in-progress","review", "done"];

const render_button = (id, column_name, button_text, task_function) => {
    if (button_text && task_function){
        return(
            <div>
                <a href="#" className="button" onClick={clickButton(id, column_name, task_function)}>
                    {button_text}
                </a>
            </div>
        );
    }
    else{
        return <div />
    }
}

const clickButton= (id, column_name, task_function) =>{
    return () => {
        task_function(id, column_name);
    };
}

  const GridItem = props => {
    return (
        <div className="item">
            <div className="container">
                <h4 className="props-title">
                    {props.title}
                </h4>
                <div className="sometext">
                    <div>ID: {props.id}</div>
                    <div>Type: {props.type}</div>
                    {render_button(props.id, props.column, props.previous, props.back)}
                    {render_button(props.id, props.column, props.forward, props.next)}
                </div>
            </div>
        </div>
    )
}


class Page1 extends React.Component{
    constructor(props){
        super(props);
        this.back = this.back.bind(this);
        this.next = this.next.bind(this);
    }


    findItem (id, column_name){
        if (column_name === 'todo'){
            return this.props.items.todo_items.find(item => item.id === id);
        }
        if (column_name === 'in-progress'){
            return this.props.items.inProgress_items.find(item => item.id === id);
        }
        if (column_name === 'review'){
            return this.props.items.review_items.find(item => item.id === id);
        }
        else{
            return this.props.items.done_items.find(item => item.id === id);
        }
    }

    back(id, column_name) {
        let item = this.findItem(id, column_name);
        let position = columns.findIndex(pos => item.column === pos);
        if (position> 0){
            position -= 1;
            item.column = columns[position];
            this.props.updateItem(item);
        }
    }

    next(id, column_name){
        let itemId = this.findItem(id, column_name);
        let position = columns.findIndex(pos => itemId.column ===pos);

        if (position < columns.length){
            position += 1;
            itemId.column = columns[position];
            this.props.updateItem(itemId);
        }
    }
    moveItem(post, previous, forward){
        return (
            <GridItem id = {post.id} key = {post.id} title = {post.title}
                      type = {post.type} column = {post.column}
                      previous = {previous} back = {this.back}
                      forward = {forward} next = {this.next} />
        );}



        render(){
            const todo_list = this.props.items.todo_items.map(post => this.moveItem(post, "",'In Progress '));
            const inProgress_list = this.props.items.inProgress_items.map(post => this.moveItem(post, " Send back ",'Request for Review '));
            const review_list = this.props.items.review_items.map(post => this.moveItem(post, " Needs Review",'Completed '));
            const done_list = this.props.items.done_items.map(post => this.moveItem(post, " Not Done",""));

            return (
                <div className = "gridView">
                    <div className = "columnView todo">
                        <h3 className = "title">
                            To-Do
                        </h3>
                        <div className = "item-container">
                            {todo_list}
                        </div>
                    </div>
                    <div className = "columnView inProgress">
                        <h3 className = "title">
                            In Progress
                        </h3>
                        <div className = "item-container">
                            {inProgress_list}
                        </div>
                    </div>
                    <div className = "columnView review">
                        <h3 className = "title">
                            Under Review
                        </h3>
                        <div className = "item-container">
                            {review_list}
                        </div>
                    </div>
                    <div className = "columnView done">
                        <h3 className = "title">
                            Done
                        </h3>
                        <div className = "item-container">
                            {done_list}
                        </div>
                    </div>
                </div>

            );
        }

}

export default Page1;