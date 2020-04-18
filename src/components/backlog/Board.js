import React, { Component } from 'react';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from './Column';
import reorder, { reorderQuoteMap } from './reorder';

export default class Board extends Component{
    /* eslint-disable react/sort-comp */
    static defaultProps = {
        isCombineEnabled: false,
    };

    // state = {
    //     columns: this.props.initial,
    //     ordered: Object.keys(this.props.initial),
    // };

    onDragEnd = (result) => {
        if (result.combine) {
            if (result.type === 'COLUMN') {
                const shallow = [...this.state.ordered];
                shallow.splice(result.source.index, 1);
                this.setState({ ordered: shallow });
                return;
            }

            const column = this.state.columns[result.source.droppableId];
            const withQuoteRemoved = [...column];
            withQuoteRemoved.splice(result.source.index, 1);
            const columns = {
                ...this.state.columns,
                [result.source.droppableId]: withQuoteRemoved,
            };
            this.setState({ columns });
            return;
        }

        // dropped nowhere
        if (!result.destination) {
            return;
        }

        const source = result.source;
        const destination = result.destination;

        // did not move anywhere - can bail early
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        // reordering column
        if (result.type === 'COLUMN') {
            const ordered = reorder(
                this.state.ordered,
                source.index,
                destination.index,
            );

            this.setState({
                ordered,
            });

            return;
        }

        const data = reorderQuoteMap({
            quoteMap: this.state.columns,
            source,
            destination,
        });

        this.setState({
            columns: data.quoteMap,
        });
    };

    render() {
        const {
            data,
            containerHeight,
            useClone,
            isCombineEnabled,
            withScrollableColumns,
        } = this.props;

        const columns = data;
        const ordered = Object.keys(data);

        const board = (
            <Droppable
                droppableId="board"
                type="COLUMN"
                direction="horizontal"
                ignoreContainerClipping={Boolean(containerHeight)}
                isCombineEnabled={isCombineEnabled}
            >
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="board-container"
                        // style={{backgroundColor: colors.B100}}
                    >
                        {ordered.map((key, index) => (
                            <Column
                                key={key}
                                index={index}
                                title={key}
                                quotes={columns[key]}
                                isScrollable={withScrollableColumns}
                                isCombineEnabled={isCombineEnabled}
                                useClone={useClone}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );

        return (
            <React.Fragment>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {containerHeight ? (
                        <div className="board-parent-container" style={{height: containerHeight}}>{board}</div>
                    ) : (
                        board
                    )}
                </DragDropContext>
            </React.Fragment>
        );
    }
}
