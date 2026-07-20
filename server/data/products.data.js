const baseProducts = [
  {
    name: "Women's Summer Dress",
    price: 3999,
    description:
      "A light and airy summer dress perfect for casual outings. Features a floral pattern and adjustable straps.",
    image: "/images/product-1.jpg",
    category: "Women's Clothing",
    brand: "Fashionista",
    countInStock: 20,
    rating: 3.8,
    numReviews: 120,
    content: `
### Product Details

This beautiful summer dress is made from 100% cotton, making it breathable and comfortable for hot days. The floral pattern adds a touch of elegance, while the adjustable straps ensure a perfect fit.

### Care Instructions

- Machine wash cold
- Tumble dry low
- Iron on low heat if needed

### Customer Reviews

Customers love the lightweight feel and stylish design of this dress. It's perfect for everything from beach trips to casual dinners.
    `,
  },
  {
 
    name: "Men's Slim Fit Jeans",
    price: 5999,
    description:
      "Stylish slim fit jeans that offer both comfort and a modern look. Made from high-quality denim.",
    image: "/images/product-2.jpg",
    category: "Men's Clothing",
    brand: "DenimPro",
    countInStock: 15,
    rating: 4.7,
    numReviews: 150,
    content: `
### Product Details

Our slim fit jeans are crafted from premium denim, providing durability and comfort. The modern cut makes them perfect for casual and semi-formal occasions.

### Care Instructions

- Machine wash warm
- Do not bleach
- Tumble dry medium

### Customer Reviews

These jeans have received rave reviews for their perfect fit and high-quality material. A must-have in any wardrobe.
    `,
  },
  {
    
    name: "Women's Casual Blouse",
    price: 2999,
    description:
      "A versatile blouse that can be dressed up or down. Features a comfortable fit and elegant design.",
    image: "/images/product-3.jpg",
    category: "Women's Clothing",
    brand: "Elegance",
    countInStock: 25,
    rating: 4.6,
    numReviews: 95,
    content: `
### Product Details

This casual blouse is made from a soft, breathable fabric that ensures all-day comfort. Its simple yet elegant design makes it suitable for various occasions.

### Care Instructions

- Machine wash cold
- Tumble dry low
- Iron on medium heat

### Customer Reviews

Customers appreciate the versatility and comfort of this blouse. It's a favorite for both work and leisure.
    `,
  },
  {
    
    name: "Men's Casual T-Shirt",
    price: 1999,
    description:
      "A classic casual T-shirt that pairs well with jeans or shorts. Made from soft, durable cotton.",
    image: "/images/product-4.jpg",
    category: "Men's Clothing",
    brand: "BasicWear",
    countInStock: 30,
    rating: 4.4,
    numReviews: 80,
    content: `
### Product Details

Our casual T-shirt is made from 100% cotton, providing a soft and comfortable feel. It's perfect for everyday wear and comes in a variety of colors.

### Care Instructions

- Machine wash warm
- Tumble dry medium
- Do not iron

### Customer Reviews

This T-shirt is praised for its comfort and durability. It's a staple in many wardrobes.
    `,
  },
  {
    
    name: "Women's High Heels",
    price: 7999,
    description:
      "Elegant high heels that add a touch of sophistication to any outfit. Available in multiple colors.",
    image: "/images/product-5.jpg",
    category: "Women's Shoes",
    brand: "Glamour",
    countInStock: 10,
    rating: 4.8,
    numReviews: 60,
    content: `
### Product Details

Our high heels feature a sleek design and comfortable fit. The durable material ensures long-lasting wear, while the stylish look complements any dress or outfit.

### Care Instructions

- Wipe clean with a damp cloth
- Store in a cool, dry place

### Customer Reviews

These heels are loved for their elegance and comfort. Perfect for formal events or a night out.
    `,
  },
  {
   
    name: "Men's Leather Jacket",
    price: 19999,
    description:
      "A stylish leather jacket that adds a rugged edge to your look. Made from genuine leather.",
    image: "/images/product-6.jpg",
    category: "Men's Outerwear",
    brand: "UrbanStyle",
    countInStock: 5,
    rating: 4.9,
    numReviews: 45,
    content: `
### Product Details

This leather jacket is crafted from high-quality genuine leather, offering both style and durability. The classic design makes it a versatile addition to any wardrobe.

### Care Instructions

- Professional leather clean only
- Store in a cool, dry place

### Customer Reviews

Highly praised for its quality and design, this jacket is a favorite among fashion-forward men.
    `,
  },
  {
    
    name: "Women's Yoga Pants",
    price: 3499,
    description:
      "Comfortable and flexible yoga pants perfect for workouts or lounging. Made from moisture-wicking fabric.",
    image: "/images/product-7.jpg",
    category: "Women's Activewear",
    brand: "FlexFit",
    countInStock: 20,
    rating: 4.7,
    numReviews: 110,
    content: `
### Product Details

Our yoga pants are designed to provide maximum comfort and flexibility. The moisture-wicking fabric keeps you dry during workouts, and the stylish design is perfect for casual wear as well.

### Care Instructions

- Machine wash cold
- Tumble dry low
- Do not bleach

### Customer Reviews

Customers love the fit and comfort of these yoga pants. They are perfect for both exercise and relaxation.
    `,
  },
  {
  
    name: "Men's Running Shoes",
    price: 7999,
    description:
      "Lightweight and breathable running shoes designed for optimal performance. Available in multiple sizes.",
    image: "/images/product-8.jpg",
    category: "Men's Shoes",
    brand: "Sporty",
    countInStock: 18,
    rating: 4.6,
    numReviews: 90,
    content: `
### Product Details

These running shoes are built for speed and comfort. The breathable material and lightweight design help you perform your best, whether you're hitting the track or the gym.

### Care Instructions

- Wipe clean with a damp cloth
- Air dry

### Customer Reviews

Praised for their comfort and performance, these shoes are a favorite among runners.
    `,
  },
  {
   
    name: "Women's Winter Coat",
    price: 12999,
    description:
      "A warm and stylish winter coat perfect for cold weather. Features a faux fur hood and multiple pockets.",
    image: "/images/product-9.jpg",
    category: "Women's Outerwear",
    brand: "WarmWear",
    countInStock: 7,
    rating: 4.8,
    numReviews: 50,
    content: `
### Product Details

Stay warm and stylish with our winter coat, designed to withstand the coldest weather. The faux fur hood adds a touch of luxury, while the multiple pockets provide practicality.

### Care Instructions

- Machine wash cold
- Tumble dry low
- Remove faux fur before washing

### Customer Reviews

Customers appreciate the warmth and style of this coat. It's a must-have for winter.
    `,
  },
  {
    
    name: "Men's Dress Shirt",
    price: 4499,
    description:
      "A classic dress shirt that offers both style and comfort. Perfect for formal and semi-formal occasions.",
    image: "/images/product-10.jpg",
    category: "Men's Clothing",
    brand: "SharpDress",
    countInStock: 12,
    rating: 2.5,
    numReviews: 70,
    content: `
### Product Details

Our dress shirt is made from high-quality fabric that offers both style and comfort. The classic design makes it suitable for any formal or semi-formal occasion.

### Care Instructions

- Machine wash warm
- Tumble dry medium
- Iron on low heat

### Customer Reviews


This shirt is praised for its fit and quality. It's a great choice for both business and special occasions.
    `,
  },
];

const additionalProducts = [
  ["Classic Leather Tote", 7499, "/images/product-1.jpg", "Accessories", "Harbor & Hide", 14, 4.7, 48],
  ["Linen Blend Blazer", 8999, "/images/product-2.jpg", "Women's Clothing", "Modern Form", 9, 4.5, 32],
  ["Everyday Crew T-Shirt", 1999, "/images/product-3.jpg", "Men's Clothing", "Northline", 35, 4.4, 86],
  ["Tailored Midi Skirt", 5299, "/images/product-4.jpg", "Women's Clothing", "Studio Edit", 16, 4.6, 41],
  ["Canvas Weekend Sneakers", 6499, "/images/product-5.jpg", "Shoes", "Stride Co.", 22, 4.3, 57],
  ["Ribbed Knit Cardigan", 5799, "/images/product-6.jpg", "Women's Clothing", "Soft Theory", 18, 4.8, 39],
  ["Relaxed Chino Trousers", 4699, "/images/product-7.jpg", "Men's Clothing", "Field Standard", 27, 4.5, 64],
  ["Trail Runner Shoes", 8299, "/images/product-8.jpg", "Shoes", "Peak Motion", 11, 4.7, 73],
  ["Quilted Utility Jacket", 10999, "/images/product-9.jpg", "Women's Outerwear", "WarmWear", 8, 4.6, 28],
  ["Oxford Button-Down Shirt", 4899, "/images/product-10.jpg", "Men's Clothing", "SharpDress", 25, 4.4, 66],
  ["Structured Crossbody Bag", 6299, "/images/product-1.jpg", "Accessories", "Harbor & Hide", 19, 4.6, 52],
  ["Pleated Summer Dress", 6899, "/images/product-2.jpg", "Women's Clothing", "Fashionista", 13, 4.8, 45],
  ["Premium Pocket Polo", 3299, "/images/product-3.jpg", "Men's Clothing", "Northline", 31, 4.3, 58],
  ["Cropped Denim Jacket", 7799, "/images/product-4.jpg", "Women's Outerwear", "DenimPro", 10, 4.5, 36],
  ["Minimal Court Trainers", 7199, "/images/product-5.jpg", "Shoes", "Stride Co.", 17, 4.7, 69],
  ["Merino Mock-Neck Sweater", 8499, "/images/product-6.jpg", "Women's Clothing", "Soft Theory", 12, 4.8, 31],
  ["Straight Fit Utility Jeans", 6199, "/images/product-7.jpg", "Men's Clothing", "DenimPro", 20, 4.5, 77],
  ["Performance Training Shoes", 8999, "/images/product-8.jpg", "Men's Shoes", "Peak Motion", 15, 4.6, 61],
  ["Longline Wool-Blend Coat", 14999, "/images/product-9.jpg", "Women's Outerwear", "WarmWear", 6, 4.9, 24],
  ["Textured Formal Shirt", 5199, "/images/product-10.jpg", "Men's Clothing", "SharpDress", 24, 4.4, 54],
  ["Woven Belt Set", 2499, "/images/product-1.jpg", "Accessories", "Harbor & Hide", 38, 4.2, 43],
  ["Satin Occasion Top", 4399, "/images/product-2.jpg", "Women's Clothing", "Studio Edit", 21, 4.6, 38],
  ["Lightweight Overshirt", 5499, "/images/product-3.jpg", "Men's Clothing", "Field Standard", 23, 4.5, 49],
  ["Pleated Wide-Leg Pants", 6599, "/images/product-4.jpg", "Women's Clothing", "Modern Form", 14, 4.7, 34],
  ["Slip-On Travel Shoes", 5999, "/images/product-5.jpg", "Shoes", "Stride Co.", 26, 4.3, 56],
].map(([name, price, image, category, brand, countInStock, rating, numReviews]) => ({
  name,
  price,
  image,
  category,
  brand,
  countInStock,
  rating,
  numReviews,
  description: `A carefully selected ${name.toLowerCase()} designed for comfort, quality, and everyday style.`,
  content: `### ${name}\n\nA versatile, well-crafted addition to your wardrobe.`,
}));

export default [...baseProducts, ...additionalProducts];
