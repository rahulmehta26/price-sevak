import axios from "axios";

export async function scrapeProduct(url: string) {
  try {
    const res = await axios.post(
      "https://api.firecrawl.dev/v1/scrape",
      {
        url,
        formats: ["json"],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}`,
        },
      }
    );

    const data = res.data;

    return {
      title: data.data.title,
      price: Number(data.data.price),
      image: data.data.image,
    };
  } catch (error: any) {
    console.error(
      "Error scraping product:",
      error.response?.data || error.message
    );
    throw error;
  }
}
