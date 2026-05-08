export type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
};

export const Products: Product[] = [
    {
        id: '1',
        name: 'Apple iPhone 15 Pro',
        price: 54999,
        image: 'https://picsum.photos/seed/iphone/400/300',
        description:
            'Потужний смартфон із чіпом A17 Pro, титановим корпусом та покращеною системою камер з оптичним зумом 5×.',
    },
    {
        id: '2',
        name: 'Samsung Galaxy S24',
        price: 39999,
        image: 'https://picsum.photos/seed/samsung/400/300',
        description:
            'Флагманський Android-смартфон із вбудованим Galaxy AI, яскравим AMOLED-дисплеєм та швидкою зарядкою 45W.',
    },
    {
        id: '3',
        name: 'Sony WH-1000XM5',
        price: 12499,
        image: 'https://picsum.photos/seed/sony/400/300',
        description:
            'Бездротові навушники з найкращим у класі шумопоглинанням, автономністю 30 годин та кришталево чистим звуком.',
    },
    {
        id: '4',
        name: 'Apple MacBook Air M3',
        price: 64999,
        image: 'https://picsum.photos/seed/macbook/400/300',
        description:
            'Ультратонкий ноутбук на чіпі M3 з дисплеєм Liquid Retina 15", до 18 годин роботи від батареї.',
    },
    {
        id: '5',
        name: 'iPad Pro 13"',
        price: 49999,
        image: 'https://picsum.photos/seed/ipad/400/300',
        description:
            'Надтонкий планшет з OLED-дисплеєм tandem, чіпом M4 та підтримкою Apple Pencil Pro.',
    },
    {
        id: '6',
        name: 'Logitech MX Master 3S',
        price: 4299,
        image: 'https://picsum.photos/seed/logitech/400/300',
        description:
            'Ергономічна бездротова миша з тихими кнопками, магнітним колесом прокрутки та підтримкою до 3 пристроїв.',
    },
    {
        id: '7',
        name: 'Dell UltraSharp 27" 4K',
        price: 22999,
        image: 'https://picsum.photos/seed/dell/400/300',
        description:
            'Професійний монітор із панеллю IPS 4K, відтворенням 99% sRGB та USB-C зарядкою 90W.',
    },
    {
        id: '8',
        name: 'Anker 65W GaN Charger',
        price: 1299,
        image: 'https://picsum.photos/seed/anker/400/300',
        description:
            'Компактний зарядний пристрій GaN на 65W із підтримкою PD 3.0, заряджає ноутбук, телефон і планшет одночасно.',
    },
];