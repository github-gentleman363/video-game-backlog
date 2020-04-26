import React, { Component } from 'react';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from './Column';
import {reorderQuoteMap} from "./reorder";
import {BACKLOG_COLUMN_TYPE_TO_DISPLAY_LABEL} from "../../constants";
import {AppContext} from "../../App";

export default class Board extends Component{
    /* eslint-disable react/sort-comp */
    static defaultProps = {
        isCombineEnabled: false,
    };

    // state = {
    //     columns: this.props.initial,
    //     ordered: Object.keys(this.props.initial),
    // };

    onDragEnd = (setBacklogData) => (result) => {
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

        const data = reorderQuoteMap({
            quoteMap: this.props.data,
            source,
            destination,
        });

        setBacklogData(data.quoteMap);
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
                                id={key}
                                index={index}
                                title={BACKLOG_COLUMN_TYPE_TO_DISPLAY_LABEL[key]}
                                data={columns[key]}
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
            <AppContext.Consumer>
                {
                    setBacklogData => (
                        <DragDropContext onDragEnd={this.onDragEnd(setBacklogData)}>
                            {containerHeight ? (
                                <div className="board-parent-container" style={{height: containerHeight}}>{board}</div>
                            ) : (
                                board
                            )}
                        </DragDropContext>
                    )
                }
            </AppContext.Consumer>
        );
    }
}
