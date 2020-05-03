import {PLATFORM_ID_TO_IMAGE_NAME, PRODUCT_FAMILY_ID_TO_IMAGE_NAME} from "./constants";
import {colors} from "@atlaskit/theme";

export const getImageUrl = (imageId, size = "cover_small") => `https://images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg`;

export const getPlatformImageName = ({ id, product_family }) => PRODUCT_FAMILY_ID_TO_IMAGE_NAME[product_family] ?? PLATFORM_ID_TO_IMAGE_NAME[id];

export const getImageNameToPlatformNames = (platforms = []) => platforms.reduce((map, curPlatform) => {
    const imageName = getPlatformImageName(curPlatform) ?? "question circle";
    map[imageName] = (map[imageName] ?? []).concat([curPlatform.name]);
    return map;
}, {});

export const getRatingColor = (rating) => {
    rating = Math.round(rating);
    if (rating >= 90) {
        return colors.G400;
    } else if (rating >= 80) {
        return colors.G300;
    } else if (rating >= 70) {
        return colors.Y300;
    } else {
        return colors.R300;
    }
};

export const formatDate = (date) => {
    const releaseDate = new Date(date * 1000);
    const releaseMonth = releaseDate.toLocaleString('default', { month: 'short' });
    const releaseYear = releaseDate.getFullYear();
    return `${releaseMonth} ${releaseDate.getDate()}, ${releaseYear}`;
};