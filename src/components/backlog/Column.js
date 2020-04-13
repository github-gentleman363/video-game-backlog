import React, { Component } from 'react';
import { Draggable } from "react-beautiful-dnd";
import { colors } from '@atlaskit/theme';
import List from './List';

export default class Column extends Component {
    render() {
        const title = this.props.title;
        const quotes = this.props.quotes;
        const index = this.props.index;
        return (
            <Draggable draggableId={title} index={index}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} className="column-container">
                        <div className="column-header" style={{backgroundColor: snapshot.isDragging ? colors.G50 : colors.N30}}>
                            <h4 className="column-title">{title}</h4>
                        </div>
                        <List
                            listId={title}
                            listType="QUOTE"
                            style={{
                                backgroundColor: snapshot.isDragging ? "yellow" : null,
                            }}
                            quotes={quotes}
                            internalScroll={this.props.isScrollable}
                            isCombineEnabled={Boolean(this.props.isCombineEnabled)}
                            useClone={Boolean(this.props.useClone)}
                        />
                    </div>
                )}
            </Draggable>
        );
    }
}