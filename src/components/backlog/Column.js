import React, { Component } from 'react';
import { colors } from '@atlaskit/theme';
import List from './List';

export default class Column extends Component {
    render() {
        const {id, title, data} = this.props;
        return (
            <div className="column-container">
                <div className="column-header" style={{backgroundColor: colors.N30}}>
                    <h2 className="column-title">{title}</h2>
                </div>
                <List
                    listId={id}
                    listType="QUOTE"
                    data={data}
                    internalScroll={this.props.isScrollable}
                    isCombineEnabled={Boolean(this.props.isCombineEnabled)}
                    useClone={Boolean(this.props.useClone)}
                />
            </div>
        );
    }
}