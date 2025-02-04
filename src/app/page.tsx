"use client"
import { Topbar } from "@/components/global/Topbar";
import { Wrapper } from "@/components/global/Wrapper";
import { ProductList } from "@/components/products/ProductList";
import { Label } from "@/components/ui/label";
import { SidebarGroup, SidebarGroupContent, SidebarInput } from "@/components/ui/sidebar";
import { ProductData } from "@/lib/types";
import { LoaderCircle, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const url = "https://dummyjson.com/products";

export default function Home() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]); // Example price range [min, max]
  const [rating, setRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [noMorePosts, setNoMorePosts] = useState(false);
  const [allProducts, setAllProducts] = useState<ProductData[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]); // For search autocomplete
  const [page, setPage] = useState(1);
  const ref = useRef(null);

  async function fetchProducts() {
    setLoading(true);
    try {
      const response = await fetch(`${url}?limit=8&skip=${page * 8}`);
      const result = await response.json();
      setAllProducts((prev) => [...prev, ...result.products]);
      setProducts(result.products);
      if (result.products.length < 8) {
        setNoMorePosts(true);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    const filteredSuggestions = allProducts
      .map((product) => product.title)
      .filter((title) => title.toLowerCase().includes(query.toLowerCase()));

    setSuggestions(filteredSuggestions);
  };

  const filterProducts = () => {
    const filtered = allProducts.filter((product) => {

      const isPriceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      const isRatingMatch = product.rating >= rating;

      const isSearchMatch = searchQuery
        ? product.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      return isPriceMatch && isRatingMatch && isSearchMatch;
    });
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [priceRange, rating, searchQuery, allProducts]);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading && !noMorePosts) {
        setPage((prev) => prev + 1);
      }
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
      observer.disconnect();
    }
  }, [ref, noMorePosts, loading])

  return (
    <>
      <Topbar>
        <div>
          <SidebarGroup className="py-0">
            <SidebarGroupContent className="relative">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <SidebarInput
                id="search"
                placeholder="Search the product..."
                className="w-[300px] pl-8"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
              <div className="absolute z-40 top-12 left-0 w-full bg-white shadow-lg max-h-64 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => setSearchQuery(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </Topbar>

      <Wrapper>
        <div className="mb-4">

          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="p-2 ml-4"
          />
          <span>Price: ${priceRange[0]} - ${priceRange[1]}</span>

          <select
            value={rating}
            onChange={(e) => setRating(+e.target.value)}
            className="p-2 ml-4"
          >
            <option value={0}>Rating: All</option>
            <option value={4}>Rating: 4 & above</option>
            <option value={5}>Rating: 5</option>
          </select>
        </div>

        <ProductList products={filteredProducts as ProductData[]} />
        {loading && (
          <p className="w-full flex justify-center p-10">
            <LoaderCircle className="animate-spin text-yellow-500" />
          </p>
        )}
        {noMorePosts && <p className="w-full text-center">No more posts</p>}

        <div ref={ref}></div>
      </Wrapper>
    </>
  );
}
