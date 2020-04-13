import React from 'react';
import { colors } from '@atlaskit/theme';

const getBackgroundColor = (
    isDragging,
    isGroupedOver,
    authorColors,
) => {
    if (isDragging) {
        return authorColors.soft;
    }

    if (isGroupedOver) {
        return colors.N30;
    }

    return colors.N0;
};

const getBorderColor = (isDragging, authorColors) =>
    isDragging ? authorColors.hard : 'transparent';

function getStyle(provided, style) {
    if (!style) {
        return provided.draggableProps.style;
    }

    return {
        ...provided.draggableProps.style,
        ...style,
    };
}

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent
function Item(props) {
    const {
        quote,
        isDragging,
        isGroupedOver,
        provided,
        style,
        isClone,
        index,
    } = props;

    return (
        <a
            className="item-container"
            href={quote.author.url}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
                ...getStyle(provided, style),
                color: colors.N900,
                borderColor: getBorderColor(isDragging, quote.author.colors),
                boxShadow: isDragging ? `2px 2px 1px ${colors.N70}` : 'none',
                backgroundColor: getBackgroundColor(isDragging, isGroupedOver, quote.author.colors)
            }}
            data-is-dragging={isDragging}
            data-testid={quote.id}
            data-index={index}
            aria-label={`${quote.author.name} quote ${quote.content}`}
        >
            <img className="avatar" src={quote.author.avatarUrl} alt={quote.author.name} />
            {isClone ? <div className="clone-badge">Clone</div> : null}
            <div className="item-content">
                <div>{quote.content}</div>
                <div className="item-footer">
                    <small
                        className="author"
                        style={{
                            color: quote.author.colors.hard,
                            backgroundColor: quote.author.colors.soft
                        }}>
                        {quote.author.name}
                    </small>
                    <small className="quote-id">id:{quote.id}</small>
                </div>
            </div>
        </a>
    );
}

export default React.memo(Item);