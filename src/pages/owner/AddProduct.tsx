import { useState } from "react";
import type React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCreateProductMutation } from "../../api/productApi";
import styles from "./ProductForm.module.css";
import type { Category } from "../../types/models.types";

//import { categoryOptions } from "../../utils/categoryLabels";

function AddProduct() {
  const [createProduct, { isLoading, error }] = useCreateProductMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    category: "WOMENS_FASHION" as Category,
  });

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createProduct({
        name: form.name,
        description: form.description || undefined,
        price: Number(form.price),
        stock: form.stock ? Number(form.stock) : undefined,
        imageUrl: form.imageUrl || undefined,
        category: form.category,
      }).unwrap();

      navigate("/dashboard/products");
    } catch (err) {
      console.error("Failed to create product:", err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Add Product</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Name
          <input name="name" value={form.name} onChange={handleChange} className={styles.input} required />
        </label>

        <label className={styles.label}>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className={styles.textarea}
            rows={4}
          />
        </label>

        <label className={styles.label}>
          Price (KES)
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label}>
          Stock
          <input
            name="stock"
            type="number"
            min="0"
            value={form.stock}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Image URL
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className={styles.input} />
        </label>

        {error && <p className={styles.error}>Failed to create product. Check your inputs.</p>}

        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? "Saving..." : "Add Product"}
          </button>
          <Link to="/dashboard/products" className={styles.cancelLink}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;