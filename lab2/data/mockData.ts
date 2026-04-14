export const generateNews = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: `${i}-${Date.now()}`,
        title: `News ${i + 1}`,
        description: `Description for news ${i + 1}`,
        image: "https://via.placeholder.com/150",
    }));
};