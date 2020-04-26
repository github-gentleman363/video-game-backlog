import React from 'react';
import { Droppable, Draggable } from "react-beautiful-dnd";
import { colors } from '@atlaskit/theme';
import Item from './Item';

export const getBackgroundColor = (
    isDraggingOver,
    isDraggingFrom,
) => {
    if (isDraggingOver) {
        return colors.R50;
    }
    if (isDraggingFrom) {
        return colors.T50;
    }
    return colors.N30;
};

const InnerGameList = ({ data }) => {
    return data.map((datum, index) => (
        <Draggable key={datum.id} draggableId={datum.id} index={index}>
            {(
                dragProvided, dragSnapshot,
            ) => (
                <Item
                    key={datum.id}
                    data={datum}
                    isDragging={dragSnapshot.isDragging}
                    isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
                    provided={dragProvided}
                />
            )}
        </Draggable>
    ));
};

function InnerList(props) {
    const { data, dropProvided } = props;

    return (
        <div>
            {props.title ? <h4 className="inner-list-title">{props.title}</h4> : null}
            <div ref={dropProvided.innerRef} className="inner-list-drop-zone">
                <InnerGameList data={data} />
                {dropProvided.placeholder}
            </div>
        </div>
    );
}

export default function List(props) {
    const {
        ignoreContainerClipping,
        internalScroll,
        scrollContainerStyle,
        isDropDisabled,
        isCombineEnabled,
        listId,
        listType,
        style,
        data,
        title,
        useClone,
    } = props;

    return (
        <Droppable
            droppableId={listId}
            type={listType}     // TODO
            ignoreContainerClipping={ignoreContainerClipping}
            isDropDisabled={isDropDisabled}
            isCombineEnabled={isCombineEnabled}
            renderClone={
                useClone
                    ? (provided, snapshot, descriptor) => (
                        <Item
                            data={data[descriptor.source.index]}
                            provided={provided}
                            isDragging={snapshot.isDragging}
                            isClone
                        />
                    )
                    : null
            }
        >
            {(
                dropProvided, dropSnapshot
            ) => (
                <div
                    className="list-wrapper"
                    style={{
                        ...style,
                        backgroundColor: getBackgroundColor(dropSnapshot.isDraggingOver, Boolean(dropSnapshot.draggingFromThisWith)),
                        opacity: isDropDisabled ? 0.5 : 'inherit'
                    }}
                    {...dropProvided.droppableProps}
                >
                    {internalScroll ? (
                        <div style={scrollContainerStyle} className="list-scroll-container">
                            <InnerList
                                data={data}
                                title={title}
                                dropProvided={dropProvided}
                            />
                        </div>
                    ) : (
                        <InnerList
                            data={data}
                            title={title}
                            dropProvided={dropProvided}
                        />
                    )}
                </div>
            )}
        </Droppable>
    );
}

