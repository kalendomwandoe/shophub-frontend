import { useParams, Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../api/productApi";
import { categoryLabels } from "../utils/categoryLabels";
import type { Category } from "../types/models.types";
import styles from "./CategoryProducts.module.css";

function CategoryProducts() {
  const { category } = useParams<{ category: Category }>();
  const { data, isLoading, error } = useGetAllProductsQuery(category);

  const products = data?.products ?? [];
  const label = category ? categoryLabels[category] : "";

  return (
    <div className={styles.container}>
      <Link to="/categories" className={styles.backLink}>
        ← All Categories
      </Link>

      <h1 className={styles.heading}>{label}</h1>

      {isLoading ? (
        <p className={styles.status}>Loading products...</p>
      ) : error ? (
        <p className={styles.status}>Something went wrong. Please try again.</p>
      ) : products.length === 0 ? (
        <p className={styles.status}>No products found in this category yet.</p>
      ) : (
        <div className={styles.grid}>
          {products.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className={styles.image} />
                ) : (
                  <span className={styles.noImage}>No image</span>
                )}
              </div>
              <div className={styles.cardInfo}>
                <p className={styles.name}>{product.name}</p>
                <p className={styles.price}>KES {Number(product.price).toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;