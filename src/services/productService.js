const API_URL = "https://dummyjson.com/products";

const transformProduct = (p) => ({
    id: p.id,
    name: p.title || "No name",
    price: Number(p.price) || 0,
    image: p.thumbnail || "/fallback.jpg",
    category: p.category || "other",
});

export const getProducts = async () => {
    const res = await fetch(API_URL);

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    return data.products.map(transformProduct);
};