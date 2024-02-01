const KamchatkaImage = new URL('../images/Kamchatka.jpg', import.meta.url);
const KizhiImage = new URL('../images/Kizhi.jpg', import.meta.url);
const KomiImage = new URL('../images/Komi.jpg', import.meta.url)
const MoscowImage = new URL('../images/Moscow.jpg', import.meta.url);
const OlkhonImage = new URL('../images/OlkhonIsland.jpg', import.meta.url);
const VolgogradImage = new URL('../images/Volgograd.jpg', import.meta.url)


export const initialCards = [
        {
          name: "Камчатка",
          link: KamchatkaImage,
        },
        {
          name: "Кижи, Карелия",
          link: KizhiImage,
        },
        {
          name: "Республика Коми",
          link: KomiImage,
        },
        {
          name: "Москва",
          link: MoscowImage,
        },
        {
          name: "Остров Ольхон",
          link: OlkhonImage,
        },
        {
          name: "Волгоград",
          link: VolgogradImage,
        }
    ];