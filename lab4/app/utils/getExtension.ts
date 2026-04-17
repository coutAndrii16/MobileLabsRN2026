export const getExtension = (name: string) => {
    const parts = name.split('.');
    return parts.length > 1
        ? `.${parts[parts.length - 1].toLowerCase()}`
        : '(без розширення)';
};