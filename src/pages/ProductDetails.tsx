import { useParams, Link } from "react-router-dom";
import { useGetProductByIdQuery } from "../api/productApi";
import styles from "./ProductDetails.module.css";

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetProductByIdQuery(id!);

  if (isLoading) {
    return <p className={styles.status}>Loading product...</p>;
  }

  if (error || !data) {
    return <p className={styles.status}>Product not found.</p>;
  }

  const { product } = data;
  const shop = product.shop;

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.imageWrapper}>
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className={styles.image} />
          ) : (
            <div className={styles.noImage}>No image available</div>
          )}
        </div>

        <div className={styles.details}>
          {shop && (
            <Link to={`/boutiques/${shop.id}`} className={styles.shopLink}>
              {shop.name}
            </Link>
          )}

          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>KES {Number(product.price).toLocaleString()}</p>

          {product.description && <p className={styles.description}>{product.description}</p>}

          <p className={styles.stock}>
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>

          {shop?.phone && (
            <a href={`tel:${shop.phone}`} className={styles.contactBtn}>
              Contact Seller
            </a>
          )}
        </div>
      </div>

      <Link to={shop ? `/boutiques/${shop.id}` : "/boutiques"} className={styles.backLink}>
        ← Back to {shop ? shop.name : "boutiques"}
      </Link>
    </div>
  );
}

export default ProductDetails;