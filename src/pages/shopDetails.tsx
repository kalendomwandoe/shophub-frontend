import { useParams, Link } from "react-router-dom";
import { useGetShopByIdQuery } from "../api/shopApi";
import styles from "./ShopDetails.module.css";

function ShopDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetShopByIdQuery(id!);

  if (isLoading) {
    return <p className={styles.status}>Loading shop...</p>;
  }

  if (error || !data) {
    return <p className={styles.status}>Shop not found.</p>;
  }

  const { shop } = data;

  return (
    <div className={styles.container}>
      {shop.coverUrl && (
        <img src={shop.coverUrl} alt={shop.name} className={styles.coverImage} />
      )}

      <div className={styles.header}>
        {shop.logoUrl && (
          <img src={shop.logoUrl} alt={`${shop.name} logo`} className={styles.logo} />
        )}
        <h1 className={styles.name}>{shop.name}</h1>
        {shop.description && <p className={styles.description}>{shop.description}</p>}
      </div>

      <div className={styles.infoGrid}>
        {shop.address && (
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Address</span>
            <span>{shop.address}</span>
          </div>
        )}
        {shop.phone && (
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Phone</span>
            <span>{shop.phone}</span>
          </div>
        )}
        {shop.whatsapp && (
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>WhatsApp</span>
            <span>{shop.whatsapp}</span>
          </div>
        )}
        {shop.email && (
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Email</span>
            <span>{shop.email}</span>
          </div>
        )}
      </div>

      <h2 className={styles.productsHeading}>Products</h2>

      {shop.products && shop.products.length > 0 ? (
        <div className={styles.productsGrid}>
          {shop.products
            .filter((product) => product.isActive)
            .map((product) => (
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
                  <p className={styles.productPrice}>KES {Number(product.price).toLocaleString()}</p>
                </div>
              </Link>
            ))}
        </div>
      ) : (
        <p className={styles.status}>This boutique hasn't added any products yet.</p>
      )}

      <Link to="/boutiques" className={styles.backLink}>
        ← Back to all boutiques
      </Link>
    </div>
  );
}

export default ShopDetails;