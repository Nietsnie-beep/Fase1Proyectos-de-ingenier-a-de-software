// processContent.js
export const removeHtmlTags = (content) => content.replace(/<[^>]*>/g, '');

export const extractAndSortWords = (content) => {
    const words = content.split(/\s+/).filter(word => word.length > 0);
    return words.sort();
};
