export const getStoreName = (url: string): string => {
  if (!url) return "Store";

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    const domain = hostname
      .replace(/^www\./, "")
      .replace(/\.(com|in|co\.in|net|org)$/, "");

    const storeMap: Record<string, string> = {
      amazon: "Amazon",
      flipkart: "Flipkart",
      myntra: "Myntra",
      ajio: "Ajio",
      meesho: "Meesho",
      snapdeal: "Snapdeal",
      shopclues: "ShopClues",
      tatacliq: "Tata CLiQ",
      nykaa: "Nykaa",
      bewakoof: "Bewakoof",
      snitch: "Snitch",
      adidas: "Adidas",
      nike: "Nike",
      puma: "Puma",
      reebok: "Reebok",
      decathlon: "Decathlon",
      shoppersstop: "Shoppers Stop",
      lifestyle: "Lifestyle",
      westside: "Westside",
      jabong: "Jabong",
      paytmmall: "Paytm Mall",
      reliancedigital: "Reliance Digital",
      croma: "Croma",
      vijaysales: "Vijay Sales",
      urbanladder: "Urban Ladder",
      pepperfry: "Pepperfry",
      ikea: "IKEA",
      bigbasket: "BigBasket",
      grofers: "Blinkit",
      swiggy: "Swiggy",
      zomato: "Zomato",
      lenskart: "Lenskart",
      pharmeasy: "PharmEasy",
      netmeds: "Netmeds",
      "1mg": "1mg",
      "boat-lifestyle": "boAt",
      noise: "Noise",
      oneplus: "OnePlus",
      mi: "Mi Store",
      samsung: "Samsung",
      apple: "Apple",
      realme: "Realme",
      vivo: "Vivo",
      oppo: "Oppo",
      jiomart: "JioMart",
      firstcry: "FirstCry",
      hopscotch: "Hopscotch",
      zara: "Zara",
      "h&m": "H&M",
      uniqlo: "Uniqlo",
      max: "Max Fashion",
      pantaloons: "Pantaloons",
    };

    for (const [key, value] of Object.entries(storeMap)) {
      if (domain.includes(key)) {
        return value;
      }
    }

    return (
      domain.split("-")[0].charAt(0).toUpperCase() +
      domain.split("-")[0].slice(1)
    );
  } catch (error) {
    return "Store";
  }
};
