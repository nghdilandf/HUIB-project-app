import p_img1 from './food1.jpg'
import p_img2_1 from './food2.jpg'
import p_img2_2 from './food2.jpg'
import p_img2_3 from './food2.jpg'
import p_img2_4 from './food2.jpg'
import p_img3 from './food1.jpg'
import p_img4 from './food1.jpg'
import p_img5 from './food1.jpg'
import p_img6 from './food1.jpg'
import p_img7 from './food1.jpg'
import p_img8 from './food1.jpg'
import p_img9 from './food1.jpg'
import p_img10 from './food2.jpg'
import p_img11 from './food2.jpg'
import p_img12 from './food2.jpg'
import p_img13 from './food2.jpg'
import p_img14 from './food2.jpg'
import p_img15 from './food2.jpg'
import p_img16 from './food2.jpg'
import p_img17 from './food2.jpg'
import p_img18 from './food2.jpg'
import p_img19 from './food2.jpg'
import p_img20 from './food2.jpg'
import p_img21 from './food2.jpg'
import p_img22 from './food2.jpg'
import p_img23 from './food2.jpg'
import p_img24 from './food2.jpg'
import p_img25 from './food2.jpg'
import p_img26 from './food2.jpg'
import p_img27 from './food2.jpg'
import p_img28 from './food2.jpg'
import p_img29 from './food2.jpg'
import p_img30 from './food1.jpg'
import p_img31 from './food1.jpg'
import p_img32 from './food1.jpg'
import p_img33 from './food1.jpg'
import p_img34 from './food1.jpg'
import p_img35 from './food1.jpg'
import p_img36 from './food1.jpg'
import p_img37 from './food1.jpg'
import p_img38 from './food1.jpg'
import p_img39 from './food1.jpg'
import p_img40 from './food1.jpg'
import p_img41 from './food1.jpg'
import p_img42 from './food1.jpg'
import p_img43 from './food1.jpg'
import p_img44 from './food1.jpg'
import p_img45 from './food2.jpg'
import p_img46 from './food2.jpg'
import p_img47 from './food2.jpg'
import p_img48 from './food2.jpg'
import p_img49 from './food2.jpg'
import p_img50 from './food2.jpg'
import p_img51 from './food2.jpg'
import p_img52 from './food2.jpg'


import logo from './logo.png'
import hero_img from './hero_img.png'
import cart_icon from './cart_icon.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about_img from './about_img.png'
import contact_img from './contact_img.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import cross_icon from './cross_icon.png'

export const assets = {
    logo,
    hero_img,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_img,
    menu_icon,
    about_img,
    contact_img,
    razorpay_logo,
    stripe_logo,
    cross_icon
}

// Cameroon Regions, Tribes, and Traditional Meals
export const products = [
  // Adamawa Region
  {
    _id: "cm-adamawa-1",
    name: "Ndolé",
    description: "A rich stew made with bitter leaves, groundnuts, and meat or fish. Popular among the Gbaya and Duru tribes.",
    price: 2500, // FCFA
    image: [p_img1],
    category: "Adamawa",
    subCategory: "Gbaya, Duru",
    sizes: ["Plate"],
    date: Date.now(),
    bestseller: true
  },
  {
    _id: "cm-adamawa-2",
    name: "Kilishi",
    description: "Spicy dried meat snack, similar to beef jerky. Common among the Fulani.",
    price: 1500,
    image: [p_img2_1],
    category: "Adamawa",
    subCategory: "Fulani",
    sizes: ["Pack"],
    date: Date.now(),
    bestseller: false
  },
  // Centre Region
  {
    _id: "cm-centre-1",
    name: "Eru",
    description: "A vegetable soup made with eru leaves, waterleaf, and assorted meats. Popular among the Ewondo and Bassa.",
    price: 2000,
    image: [p_img3],
    category: "Centre",
    subCategory: "Ewondo, Bassa",
    sizes: ["Plate"],
    date: Date.now(),
    bestseller: true
  },
  {
    _id: "cm-centre-2",
    name: "Kpwem",
    description: "Cassava leaves stew, a delicacy of the Bafia tribe.",
    price: 1800,
    image: [p_img4],
    category: "Centre",
    subCategory: "Bafia",
    sizes: ["Plate"],
    date: Date.now(),
    bestseller: false
  },
  // East Region
  {
    _id: "cm-east-1",
    name: "Mbongo Tchobi",
    description: "Spicy black stew made with fish and local spices. Popular among the Maka and Gbaya.",
    price: 2200,
    image: [p_img5],
    category: "East",
    subCategory: "Maka, Gbaya",
    sizes: ["Plate"],
    date: Date.now(),
    bestseller: true
  },
  {
    _id: "cm-east-2",
    name: "Kanda",
    description: "Meatballs made from groundnuts and spices, a Baka delicacy.",
    price: 1700,
    image: [p_img6],
    category: "East",
    subCategory: "Baka",
    sizes: ["Plate"],
    date: Date.now(),
    bestseller: false
  },
  // Far North Region
  {
    _id: "cm-far-north-1",
    name: "Fufu and Okra Soup",
    description: "Fufu served with okra soup, a staple among the Kotoko and Mandara.",
    price: 1600,
    image: [p_img7],
    category: "Far North",
    subCategory: "Kotoko, Mandara",
    sizes: ["Plate"],
    date: Date.now(),
    bestseller: true
  },
  {
    _id: "cm-far-north-2",
    name: "La Bouillie",
    description: "Millet porridge, a breakfast favorite of the Fulani.",
    price: 800,
    image: [p_img8],
    category: "Far North",
    subCategory: "Fulani",
    sizes: ["Bowl"],
    date: Date.now(),
    bestseller: false
  },
  // Littoral Region
  {
    _id: "cm-littoral-1",
    name: "Ndolé",
    description: "Bitterleaf and groundnut stew, a signature dish of the Duala tribe.",
    price: 2500,
    image: [p_img9],
    category: "Littoral",
    subCategory: "Duala",
    sizes: ["Plate"],
    date: Date.now(),
    bestseller: true
  },
  {
    _id: "cm-littoral-2",
    name: "Mbongo Tchobi",
    description: "Black stew with fish, a favorite among the Bakoko.",
    price: 2200,
    image: [p_img10],
    category: "Littoral",
    subCategory: "Bakoko",
    sizes: ["Plate"],
    date: Date.now(),
    bestseller: false
  },
  // North Region
  {
    _id: "cm-north-1",
    name: "Kossam",
    description: "Fermented milk, a Fulani specialty.",
    price: 1000,
    image: [p_img11],
    category: "North",
    subCategory: "Fulani",
    sizes: ["Bottle"],
    date: Date.now(),
    bestseller: true
  },
  {
    _id: "cm-north-2",
    name: "Djama Djama",
    description: "Huckleberry leaves cooked with groundnut paste, enjoyed by the Toupouri.",
    price: 1500,
    image: [p_img12],
    category: "North",
    subCategory: "Toupouri",
    sizes: ["Plate"],
    date: Date.now(),
    bestseller: false
  },
  // Northwest Region
  {
    _id: "cm-northwest-1",
    name: "Achu and Yellow Soup",
    description: "Pounded cocoyams with spicy yellow soup, a traditional meal of the Bamenda Grassfields tribes.",
    price: 3000,
    image: [p_img13],
    category: "Northwest",
    subCategory: "Bamenda, Kom, Nso",
    sizes: ["Plate"],
    date: Date.now(),
    bestseller: true
  },
  {
    _id: "cm-northwest-2",
    name: "Corn Fufu and Njama Njama",
    description: "Corn fufu served with huckleberry leaves, a Kom and Nso favorite.",
    price: 1800,
    image: [p_img14],
    category: "Northwest",
    subCategory: "Kom, Nso",
    sizes: ["Plate"],
    date: Date.now(),
    bestseller: false
  },
  // West Region
  {
    _id: "cm-west-1",
    name: "Koki",
    description: "Steamed black-eyed pea pudding, a Bamileke delicacy.",
    price: 2000,
    image: [p_img15],
    category: "West",
    subCategory: "Bamileke",
    sizes: ["Wrap"],
    date: Date.now(),
    bestseller: true
  },
  {
    _id: "cm-west-2",
    name: "Taro and Yellow Sauce",
    description: "Taro root served with spicy yellow sauce, a Bafut and Bamileke specialty.",
    price: 2500,
    image: [p_img16],
    category: "West",
    subCategory: "Bafut, Bamileke",
    sizes: ["Plate"],
    date: Date.now(),
    bestseller: false
  },
  // South Region
  {
    _id: "cm-south-1",
    name: "Ekwang",
    description: "Grated cocoyams wrapped in leaves and cooked with palm oil, a Bulu and Fang delicacy.",
    price: 2200,
    image: [p_img17],
    category: "South",
    subCategory: "Bulu, Fang",
    sizes: ["Plate"],
    date: Date.now(),
    bestseller: true
  },
  {
    _id: "cm-south-2",
    name: "Bongo Chobi",
    description: "Spicy black sauce with fish, a Beti favorite.",
    price: 2100,
    image: [p_img18],
    category: "South",
    subCategory: "Beti",
    sizes: ["Plate"],
    date: Date.now(),
    bestseller: false
  },
  // Southwest Region
  {
    _id: "cm-southwest-1",
    name: "Eru and Waterfufu",
    description: "Eru leaves cooked with waterleaf and served with waterfufu, a Bayangi and Bakweri specialty.",
    price: 2500,
    image: [p_img19],
    category: "Southwest",
    subCategory: "Bayangi, Bakweri",
    sizes: ["Plate"],
    date: Date.now(),
    bestseller: true
  },
  {
    _id: "cm-southwest-2",
    name: "Kwacoco Bible",
    description: "Grated cocoyam mixed with fish and spices, wrapped in leaves. Popular among the Bakweri.",
    price: 2000,
    image: [p_img20],
    category: "Southwest",
    subCategory: "Bakweri",
    sizes: ["Wrap"],
    date: Date.now(),
    bestseller: false
  }
];