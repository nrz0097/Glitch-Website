export interface MenuItem {
  name: string;
  desc?: string;
  price: string;
  recommended?: boolean;
  type?: "cold" | "hot" | "snack";
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    category: "MILK BLEND COFFEE",
    items: [
      { name: "White Glitch", desc: "Kopi Susu Klasik", price: "18K", recommended: true, type: "cold" },
      { name: "Tropica Static", desc: "Kopi Susu Kelapa", price: "18K", type: "cold" },
      { name: "Bit Berry", desc: "Kopi Susu Stroberi", price: "18K", type: "cold" },
      { name: "Brown Signal", desc: "Kopi Susu Aren", price: "18K", type: "cold" },
      { name: "Golden Delay", desc: "Kopi Susu Karamel", price: "21K", type: "cold" },
      { name: "Soft Byte", desc: "Kopi Susu Vanila", price: "21K", type: "cold" },
      { name: "Bloom Sign", desc: "Kopi Susu Jasmine", price: "21K", type: "cold" },
      { name: "Pandan Drift", desc: "Kopi Susu Pandan", price: "21K", type: "cold" },
      { name: "Sunny Peel", desc: "Kopi Susu Pisang", price: "21K", type: "cold" },
      { name: "Nut Stream", desc: "Kopi Susu Hazelnut", price: "21K", type: "cold" },
      { name: "Mocha Tide", desc: "Kopi Susu Mocha Seasalt", price: "21K", type: "cold" },
      { name: "Mangolier", desc: "Kopi Susu Mango Sticky Rice", price: "21K", type: "cold" },
      { name: "Monswift", desc: "Kopi Susu Cinnamon", price: "23K", type: "cold" },
      { name: "Cheesecode", desc: "Kopi Susu Cream Cheese", price: "23K", type: "cold" },
      { name: "Buttersync", desc: "Kopi Susu Butterscotch", price: "23K", recommended: true, type: "cold" },
      { name: "Sweetflow", desc: "Kopi Susu Caramel Macchiato", price: "23K", type: "cold" },
    ]
  },
  {
    category: "NOIR COFFEE SERIES",
    items: [
      { name: "Ice Black", desc: "Single Shot Americano", price: "18K", type: "cold" },
      { name: "Long Black", desc: "Double Shot Americano", price: "24K", type: "cold" },
      { name: "Black Shift", desc: "Peach/Leci Americano", price: "22K", type: "cold" },
      { name: "Vietnam Drip", desc: "Kopi Susu Vietnam", price: "20K", type: "hot" },
      { name: "Shakerato", desc: "Espresso Lemonade", price: "21K", type: "cold" },
      { name: "Honey Fizz", desc: "Espresso Madu Soda", price: "21K", type: "cold" },
      { name: "Peach Wave", desc: "Espresso Jeruk Peach", price: "22K", type: "cold" },
      { name: "Berry Comb", desc: "Espresso Berry Madu", price: "22K", type: "cold" },
    ]
  },
  {
    category: "NON COFFEE SERIES",
    items: [
      { name: "Dark Error", desc: "Coklat", price: "18K", type: "cold" },
      { name: "Hazel Core", desc: "Coklat Hazelnut", price: "21K", type: "cold" },
      { name: "Amber Echo", desc: "Coklat Karamel", price: "21K", type: "cold" },
      { name: "Berry Patch", desc: "Susu Stroberi Jam", price: "21K", type: "cold" },
      { name: "Red Glint", desc: "Red Velvet", price: "21K", type: "cold" },
      { name: "Green Pulse", desc: "Matcha", price: "23K", type: "cold" },
      { name: "Regal Phase", desc: "Susu Regal", price: "22K", type: "cold" },
      { name: "Banana Cloud", desc: "Susu Pisang Creamy", price: "22K", type: "cold" },
      { name: "Lychee-T", desc: "Teh Leci", price: "19K", type: "cold" },
      { name: "Pixelade Blue", desc: "Leci Soda", price: "21K", type: "cold" },
      { name: "Air Mineral", price: "6K" },
    ]
  },
  {
    category: "SNACK / MAKANAN",
    items: [
      { name: "Tahu Bakso", price: "18K", type: "snack" },
      { name: "Kentang Goreng", price: "22K", type: "snack" },
      { name: "Mix Platter", price: "25K", type: "snack" },
    ]
  }
];

