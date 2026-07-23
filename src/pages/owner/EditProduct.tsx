import { useState, useEffect } from "react";
import type React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetProductByIdQuery, useUpdateProductMutation } from "../../api/productApi";
import styles from "./ProductForm.module.css";
import { categoryOptions } from "../../utils/categoryLabels";
import type { Category } from "../../types/models.types";

function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading: isFetching } = useGetProductByIdQuery(id!);
  const [updateProduct, { isLoading: isSaving, error }] = useUpdateProductMutation();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    isActive: true,
    category: "WOMENS_FASHION" as Category,
  });

  useEffect(() => {
    if (data?.product) {
      setForm({
        name: data.product.name,
        description: data.product.description || "",
        price: String(data.product.price),
        stock: String(data.product.stock),
        imageUrl: data.product.imageUrl || "",
        isActive: data.product.isActive,
        category: data.product.category as Category,
      });
    }
  }, [data]);

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value, type } = e.target;
  if (type === "checkbox") {
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({ ...prev, [name]: checked }));
  } else {
    setForm((prev) => ({ ...prev, [name]: value }));
  }
};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateProduct({
        id: id!,
        body: {
          name: form.name,
          description: form.description || undefined,
          price: Number(form.price),
          stock: Number(form.stock),
          imageUrl: form.imageUrl || undefined,
          isActive: form.isActive,
          category: form.category,
        },
      }).unwrap();

      navigate("/dashboard/products");
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  if (isFetching) {
    return <p className={styles.container}>Loading product...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Edit Product</h1>

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
           Category
    <select name="category" value={form.category} onChange={handleChange} className={styles.input}>
    {categoryOptions.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
</label>

        <label className={styles.label}>
          Image URL
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className={styles.input} />
        </label>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          Active (visible to customers)
        </label>

        {error && <p className={styles.error}>Failed to update product. Check your inputs.</p>}

        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
          <Link to="/dashboard/products" className={styles.cancelLink}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;