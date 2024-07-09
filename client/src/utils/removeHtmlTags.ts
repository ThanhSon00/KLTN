export const removeHtmlTags = (inputString: string) => {
    const regex = /(<([^>]+)>)/gi;
    return inputString.replace(regex, '');
}