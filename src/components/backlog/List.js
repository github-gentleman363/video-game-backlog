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

const InnerQuoteList = React.memo(function InnerQuoteList(props) {
    return props.quotes?.map((quote, index) => (
        <Draggable key={quote.id} draggableId={quote.id} index={index}>
            {(
                dragProvided, dragSnapshot,
            ) => (
                <Item
                    key={quote.id}
                    quote={quote}
                    isDragging={dragSnapshot.isDragging}
                    isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
                    provided={dragProvided}
                />
            )}
        </Draggable>
    ));
});

function InnerList(props) {
    const { quotes, dropProvided } = props;
    const title = props.title ? <h4 className="inner-list-title">{props.title}</h4> : null;

    return (
        <div>
            {title}
            <div ref={dropProvided.innerRef} className="inner-list-drop-zone">
                <InnerQuoteList quotes={quotes} />
                {dropProvided.placeholder}
            </div>
        </div>
    );
}

export default function QuoteList(props) {
    const {
        ignoreContainerClipping,
        internalScroll,
        scrollContainerStyle,
        isDropDisabled,
        isCombineEnabled,
        listId = 'LIST',
        listType,
        style,
        quotes,
        title,
        useClone,
    } = props;

    return (
        <Droppable
            droppableId={listId}
            type={listType}
            ignoreContainerClipping={ignoreContainerClipping}
            isDropDisabled={isDropDisabled}
            isCombineEnabled={isCombineEnabled}
            renderClone={
                useClone
                    ? (provided, snapshot, descriptor) => (
                        <Item
                            quote={quotes[descriptor.source.index]}
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
                                quotes={quotes}
                                title={title}
                                dropProvided={dropProvided}
                            />
                        </div>
                    ) : (
                        <InnerList
                            quotes={quotes}
                            title={title}
                            dropProvided={dropProvided}
                        />
                    )}
                </div>
            )}
        </Droppable>
    );
}

