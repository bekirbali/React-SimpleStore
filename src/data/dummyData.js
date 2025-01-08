import laptopImage from "../assets/gemini_laptop.jpg";
import phoneImage from "../assets/dalle_phone.webp";
import headphoneImage from "../assets/dalle_headphone.webp";
import watchImage from "../assets/gemini_watch.jpg";

export const dummyProducts = [
  {
    id: 1,
    name: "Laptop",
    code: "LPT001",
    description: "Yüksek performanslı laptop",
    price: 999.99,
    unit_type: "piece",
    image: laptopImage
  },
  {
    id: 2,
    name: "Smartphone",
    code: "SPH001",
    description: "En son smartphone, gelişmiş fotoğraf özellikleri",
    price: 699.99,
    unit_type: "piece",
    image: phoneImage
  },
  {
    id: 3,
    name: "Headphones",
    code: "HPH001",
    description: "Kablosuz gürültüyü azaltma kulaklıkları",
    price: 199.99,
    unit_type: "piece",
    image: headphoneImage
  },
  {
    id: 4,
    name: "Smart Watch",
    code: "SWT001",
    description: "Fitness takip eden akıllı saat",
    price: 299.99,
    unit_type: "piece",
    image: watchImage
  }
];

export const dummyOrders = [
  {
    id: 1,
    order_number: "ORD001",
    status: "onaylandı",
    total_amount: 1199.98,
    created_at: "2024-01-05T10:30:00Z",
    items: [
      {
        id: 1,
        product: dummyProducts[0],
        quantity: 1,
        price: 999.99
      },
      {
        id: 2,
        product: dummyProducts[2],
        quantity: 1,
        price: 199.99
      }
    ]
  },
  {
    id: 2,
    order_number: "ORD002",
    status: "teslim edildi",
    total_amount: 699.99,
    created_at: "2024-01-06T15:45:00Z",
    items: [
      {
        id: 3,
        product: dummyProducts[1],
        quantity: 1,
        price: 699.99
      }
    ]
  }
];
