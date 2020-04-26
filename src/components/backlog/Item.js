import React from 'react';
import { Button, Modal, Placeholder } from 'semantic-ui-react';
import { colors } from '@atlaskit/theme';

const PlaceholderExample = () => (
    <Placeholder style={{width: "100%"}}>
        <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
        </Placeholder.Paragraph>
    </Placeholder>
);

const ModalExample = ({title}) => (
    <Modal trigger={<Button>See Details</Button>}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content image>
            <PlaceholderExample />
        </Modal.Content>
    </Modal>
)

const getBackgroundColor = (
    isDragging,
    isGroupedOver,
    itemColors,
) => {
    if (isDragging) {
        return itemColors?.soft;
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
function Item({ data, isDragging, isGroupedOver, provided, style, isClone, index, disabled }) {
    const placeholderStyle = {width: "100%"};
    if (disabled) {
        placeholderStyle.animation = "none";
    }
    return (
        <div
            className="item-container"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
                ...getStyle(provided, style),
                color: colors.N900,
                // borderColor: getBorderColor(isDragging, data.author.colors),
                // boxShadow: isDragging ? `2px 2px 1px ${colors.N70}` : 'none',
                backgroundColor: getBackgroundColor(isDragging, isGroupedOver, data.colors)
            }}
            data-is-dragging={isDragging}
            data-testid={data.id}
            data-index={index}
            // aria-label={`${data.author.name} quote ${data.content}`}
            onClick={() => console.log("clicked")}
        >
            {
                data.isPlaceholder
                    ? (
                        <Placeholder style={placeholderStyle}>
                            <Placeholder.Header image>
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line length='medium' />
                                <Placeholder.Line length='short' />
                            </Placeholder.Paragraph>
                        </Placeholder>
                    )
                    : (
                        <React.Fragment>
                            <img className="avatar" src={data.coverImageUrl} alt={data.name} />
                            {isClone ? <div className="clone-badge">Clone</div> : null}
                            <div className="item-content">
                                <div>{data.name}</div>
                                <ModalExample title={data.name} />
                                <div className="item-footer">
                                    {/*<small*/}
                                    {/*    className="author"*/}
                                    {/*    style={{*/}
                                    {/*        color: data.author.colors.hard,*/}
                                    {/*        backgroundColor: data.author.colors.soft*/}
                                    {/*    }}>*/}
                                    {/*    {data.author.name}*/}
                                    {/*</small>*/}
                                    <small className="quote-id">{data.total_rating ? Math.round(data.total_rating) : null}</small>
                                </div>
                            </div>
                        </React.Fragment>
                    )
            }
        </div>
    );
}

export default Item;