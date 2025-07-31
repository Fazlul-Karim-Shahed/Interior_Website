export const imageSrc = (name) => process.env.NEXT_PUBLIC_CLOUDINARY_URL + name; // cloudinary

export const cleanObject = (obj) => {
    let newObj = {};

    for (let key in obj) {
        if (obj[key] === "" || obj[key] === undefined || obj[key] === null) {
            continue;
        } else {
            newObj[key] = obj[key];
        }
    }

    return newObj;
};

export const slugify = (text) => {
    return text.trim().replace(/\s+/g, "-");
};
