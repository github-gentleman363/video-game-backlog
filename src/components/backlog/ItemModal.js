import React from "react";
import {Modal, Image, Divider, Header, Icon} from "semantic-ui-react";
import PieChart from 'react-minimal-pie-chart';
import {formatDate, getImageUrl, getRatingColor} from "../../utils";
import PlatformIcons from "./PlatformIcons";

const ItemModal = ({data, trigger}) => {
    const {name, cover, first_release_date, platforms, total_rating} = data;
    return (
        <Modal trigger={trigger} size="large">
            <Modal.Header>
                <span style={{marginRight: "18px", fontSize: "2rem"}}>{name}</span>
                <span style={{opacity: .4, fontSize: "2rem"}}>
                    <small>{formatDate(first_release_date)}</small>
                </span>
                <span style={{float: "right"}}>
                    <PlatformIcons platforms={platforms} iconSize="large" />
                </span>
            </Modal.Header>
            <Modal.Content image>
                <Image src={getImageUrl(cover?.image_id, "cover_big")} size="medium" />
                <div style={{flex: "1 1 auto", padding: "0 12px"}}>
                    <Divider horizontal>
                        <Header as='h4'>
                            <Icon name='tag' />
                            Description
                        </Header>
                    </Divider>
                </div>
                <div style={{flex: "0 1 200px", display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <PieChart
                        animate
                        animationDuration={500}
                        animationEasing="ease-out"
                        data={[{ color: getRatingColor(total_rating), value: Math.round(total_rating) }]}
                        label
                        labelPosition={0}
                        labelStyle={{ fontFamily: 'sans-serif', fontSize: '24px' }}
                        lengthAngle={360}
                        lineWidth={20}
                        paddingAngle={0}
                        radius={50}
                        rounded
                        startAngle={270}
                        totalValue={100}
                        style={{width: "160px", height: "160px"}}
                    />
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default ItemModal;