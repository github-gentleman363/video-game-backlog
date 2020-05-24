import {Icon, Popup} from "semantic-ui-react";
import {PLATFORM_IMAGE_NAME_TO_COLOR} from "../../constants";
import React from "react";
import {getImageNameToPlatformNames} from "../../utils";

const PlatformIcons = ({platforms, iconSize, popupPosition}) => (
    <React.Fragment>
        {
            Object.entries(getImageNameToPlatformNames(platforms)).map(([imageName, platformNames]) => (
                <Popup
                    key={imageName}
                    trigger={<Icon name={imageName} size={iconSize} color={PLATFORM_IMAGE_NAME_TO_COLOR[imageName]} />}
                    content={platformNames.join(", ")}
                    position={popupPosition}
                />
            ))
        }
    </React.Fragment>
);

PlatformIcons.defaultProps = {
    iconSize: "large"
};

export default PlatformIcons;