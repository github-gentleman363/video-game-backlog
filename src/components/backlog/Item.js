import React from 'react';
import { Placeholder, Card, Image } from 'semantic-ui-react';
import PieChart from 'react-minimal-pie-chart';
import { colors } from '@atlaskit/theme';
import {formatDate, getImageUrl, getRatingColor} from "../../utils";
import PlatformIcons from "./PlatformIcons";

// eslint-disable-next-line no-unused-vars
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

// eslint-disable-next-line no-unused-vars
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
function Item({ data, isDragging, provided, style, index, disabled }) {
    const placeholderStyle = {};
    if (disabled) {
        placeholderStyle.animation = "none";
    }

    const {id, name, total_rating, isPlaceholder, cover, first_release_date, platforms} = data;

    return (
        <div
            className="item-container"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
                ...getStyle(provided, style),
                // color: colors.N900,
                // borderColor: getBorderColor(isDragging, data.author.colors),
                // boxShadow: isDragging ? `2px 2px 1px ${colors.N70}` : 'none',
                // backgroundColor: getBackgroundColor(isDragging, isGroupedOver, itemColors)
            }}
            data-is-dragging={isDragging}
            data-testid={id}
            data-index={index}
            // aria-label={`${data.author.name} quote ${data.content}`}
        >
            {
                isPlaceholder
                    ? (
                        <div style={{width: "100%", padding: "8px", backgroundColor: colors.background()}}>
                            <Placeholder style={placeholderStyle} fluid>
                                <Placeholder.Header image>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Header>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line length='medium' />
                                    <Placeholder.Line length='short' />
                                </Placeholder.Paragraph>
                            </Placeholder>
                        </div>
                    )
                    : (
                        <Card fluid>
                            <Card.Content>
                                <Image src={getImageUrl(cover?.image_id)} size="tiny" floated="left" />
                                <Card.Header>
                                    {/*<ItemModal trigger={<a>{name}</a>} data={data} />*/}
                                    {name}
                                </Card.Header>
                                <Card.Meta style={{display: "flex", justifyContent: "space-between"}}>
                                    <div>
                                        <div className='date' style={{marginBottom: "6px"}}>
                                            {formatDate(first_release_date)}
                                        </div>
                                        <div style={{marginBottom: "6px"}}>
                                            <PlatformIcons platforms={platforms} popupPosition="bottom center" />
                                        </div>
                                    </div>

                                    <PieChart
                                        animate
                                        animationDuration={500}
                                        animationEasing="ease-out"
                                        data={[{ color: getRatingColor(total_rating), value: Math.round(total_rating) }]}
                                        label
                                        labelPosition={0}
                                        labelStyle={{ fontFamily: 'sans-serif', fontSize: '24px' }}
                                        lengthAngle={360}
                                        lineWidth={16}
                                        paddingAngle={0}
                                        radius={50}
                                        rounded
                                        startAngle={270}
                                        totalValue={100}
                                        style={{width: "80px", height: "80px"}}
                                    />
                                </Card.Meta>
                                <Card.Description>

                                </Card.Description>
                            </Card.Content>
                            {/*<Card.Content extra>*/}
                            {/*    <a>*/}
                            {/*        <Icon name='user' />*/}
                            {/*        22 Friends*/}
                            {/*    </a>*/}
                            {/*</Card.Content>*/}
                        </Card>
                    )
            }
        </div>
    );
}

export default Item;