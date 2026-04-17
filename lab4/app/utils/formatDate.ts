export const formatDate = (time: number) => {
    if (!time) return '—';
    return new Date(time * 1000).toLocaleString('uk-UA');
};