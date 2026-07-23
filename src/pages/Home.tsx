import { useState } from "react";
import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllShopsQuery } from "../api/shopApi";
import { useGetAllProductsQuery } from "../api/productApi";
import styles from "./Home.module.css";

function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data: shopsData } = useGetAllShopsQuery();
  const { data: productsData } = useGetAllProductsQuery();

  const featuredShops = (shopsData?.shops ?? []).slice(0, 3);
  const featuredProducts = (productsData?.products ?? []).slice(0, 6);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Discover unique boutiques near you</h1>
        <p className={styles.heroSubtitle}>
          Shop directly from local boutique owners, all in one place.
        </p>

        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Search boutiques or products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchBtn}>
            Search
          </button>
        </form>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Boutiques</h2>
          <Link to="/boutiques" className={styles.viewAllLink}>
            View all →
          </Link>
        </div>

        {featuredShops.length === 0 ? (
          <p className={styles.emptyText}>No boutiques available yet.</p>
        ) : (
          <div className={styles.shopsGrid}>
            {featuredShops.map((shop) => (
              <Link to={`/boutiques/${shop.id}`} key={shop.id} className={styles.shopCard}>
                <div className={styles.shopImageWrapper}>
                  {shop.coverUrl ? (
                    <img src={shop.coverUrl} alt={shop.name} className={styles.shopImage} />
                  ) : (
                    <span className={styles.noShopImage}>{shop.name.charAt(0)}</span>
                  )}
                </div>
                <div className={styles.shopInfo}>
                  <h3 className={styles.shopName}>{shop.name}</h3>
                  {shop.description && <p className={styles.shopDescription}>{shop.description}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Products</h2>
        </div>

        {featuredProducts.length === 0 ? (
          <p className={styles.emptyText}>No products available yet.</p>
        ) : (
          <div className={styles.productsGrid}>
            {featuredProducts.map((product) => (
              <Link to={`/products/${product.id}`} key={product.id} className={styles.productCard}>
                <div className={styles.productImagePlaceholder}>
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
                  ) : (
                    <span className={styles.noImage}>No image</span>
                  )}
                </div>
                <div className={styles.productInfo}>
                  <p className={styles.productName}>{product.name}</p>
                  <p className={styles.productPrice}>
                    KES {Number(product.price).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} ShopHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;