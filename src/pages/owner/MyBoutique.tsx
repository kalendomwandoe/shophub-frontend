import { useState, useEffect } from "react";
import type React from "react";
import { useGetMyShopQuery, useCreateShopMutation, useUpdateMyShopMutation } from "../../api/shopApi";
import styles from "./MyBoutique.module.css";

function MyBoutique() {
  const { data, isLoading, error } = useGetMyShopQuery();
  const [createShop, { isLoading: isCreating }] = useCreateShopMutation();
  const [updateShop, { isLoading: isUpdating }] = useUpdateMyShopMutation();

  const [form, setForm] = useState({
    name: "",
    description: "",
    logoUrl: "",
    coverUrl: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (data?.shop) {
      setForm({
        name: data.shop.name || "",
        description: data.shop.description || "",
        logoUrl: data.shop.logoUrl || "",
        coverUrl: data.shop.coverUrl || "",
        phone: data.shop.phone || "",
        whatsapp: data.shop.whatsapp || "",
        email: data.shop.email || "",
        address: data.shop.address || "",
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("");

    try {
      if (data?.shop) {
        await updateShop(form).unwrap();
        setSuccessMessage("Shop updated successfully.");
      } else {
        await createShop(form).unwrap();
        setSuccessMessage("Shop created successfully.");
      }
    } catch (err) {
      console.error("Failed to save shop:", err);
    }
  };

  if (isLoading) {
    return <p className={styles.status}>Loading your shop...</p>;
  }

  const hasShop = !!data?.shop;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{hasShop ? "My Boutique" : "Register Your Boutique"}</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Shop Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
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
          Logo Image URL
          <input
            name="logoUrl"
            value={form.logoUrl}
            onChange={handleChange}
            className={styles.input}
            placeholder="https://..."
          />
        </label>

        {form.logoUrl && (
          <img src={form.logoUrl} alt="Logo preview" className={styles.logoPreview} />
        )}

        <label className={styles.label}>
          Cover Image URL
          <input
            name="coverUrl"
            value={form.coverUrl}
            onChange={handleChange}
            className={styles.input}
            placeholder="https://..."
          />
        </label>

        {form.coverUrl && (
          <img src={form.coverUrl} alt="Cover preview" className={styles.coverPreview} />
        )}

        <label className={styles.label}>
          Phone
          <input name="phone" value={form.phone} onChange={handleChange} className={styles.input} />
        </label>

        <label className={styles.label}>
          WhatsApp
          <input
            name="whatsapp"
            value={form.whatsapp}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Address
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        {successMessage && <p className={styles.success}>{successMessage}</p>}
        {error && !hasShop && (
          <p className={styles.hint}>You don't have a shop yet — fill in the form to create one.</p>
        )}

        <button type="submit" className={styles.submitBtn} disabled={isCreating || isUpdating}>
          {isCreating || isUpdating ? "Saving..." : hasShop ? "Save Changes" : "Create Boutique"}
        </button>
      </form>
    </div>
  );
}

export default MyBoutique;