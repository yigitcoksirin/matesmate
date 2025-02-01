export interface DummyPet {
    id: number;
    name: string;
    age: number;
    species: string;
    breeds: string[];
    description: string;
    imageUrl: string;
}

export const dummyPets: DummyPet[] = [
    {
        id: 1,
        name: 'Buddy',
        age: 4,
        species: 'Dog',
        breeds: ['Golden Retriever', 'Labrador Retriever'],
        description: 'A friendly dog that loves to play fetch.',
        imageUrl: 'https://spotpet.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fm5ehn3s5t7ec%2FKtxCRW7y0LXNYcn6BHPPD%2F065b05bda2e516ea6a5887ce9856d1db%2FGolden_Retriever__Price.webp&w=3840&q=75'
    },
    {
        id: 2,
        name: 'Mittens',
        age: 2,
        species: 'Cat',
        breeds: ['Scottish Fold'],
        description: 'A playful cat that loves to cuddle.',
        imageUrl: 'https://blog.petibom.com/wp-content/uploads/2021/09/siyah-renk-scottish-fold-kedi.jpg'
    },
    {
        id: 3,
        name: 'Charlie',
        age: 1,
        species: 'Dog',
        breeds: ['Irish Wolfhound'],
        description: 'A gentle giant that loves to nap.',
        imageUrl: 'https://image.petmd.com/files/styles/863x625/public/2022-12/irish-wolfhound-2.jpg'
    },
    {
        id: 4,
        name: 'Whiskers',
        age: 3,
        species: 'Cat',
        breeds: ['Turkish Angora'],
        description: 'A cat that loves to explore.',
        imageUrl: 'https://www.petrebels.com/en/wp-content/uploads/sites/3/2023/10/image-43.png'
    },
    {
        id: 5,
        name: 'Pasha',
        age: 5,
        species: 'Dog',
        breeds: ['Turkish Kangal'],
        description: 'A loyal shepherd dog that loves to protect its family.',
        imageUrl: 'https://lh6.googleusercontent.com/proxy/hI0a9fncykaYTjSdd4ya8AFfzoeAGVM26vk2oPDJi-O6XeT0pPahtAOdaotSjw5rA1E9wACCy-ZCiw7ZC-2TdPG2cqLf1Vir2fI79hxccW2fbdUJvZ8VbZmeCUvUpwACbUV5k8qMFIQwqgtFAbsNUNA09GgYY6w1iQDP'
    }
];
