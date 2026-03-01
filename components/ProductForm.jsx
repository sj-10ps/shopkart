"use client";
import { fetchCategories } from "@/redux/categorySlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductForm = () => {
  const { categories, loading } = useSelector((state) => state.category);
  const [othercategory,setothercategory]=useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, []);
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: [],
    count: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImage = (e) => {
    const { files } = e.target;
    const prevImage = [...form.image];
    for (let i of files) {
      prevImage.push(i);
    }
    setForm((prev) => ({
      ...prev,
      image: prevImage.slice(0, 4),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("count", form.count);

    form.image.forEach((file) => {
      formData.append("image", file);
    });
    try {
      const res = await fetch(`/api/seller/uploadproduct`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("failed to upload");
      }
      toast("succesfully uploaded");
      router.push("/seller/profile");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4 flex flex-col mt-10"
    >
      <h2 className="text-xl font-semibold text-gray-800">Add Product</h2>

      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Product title"
        value={form.title}
        onChange={handleChange}
        required
        className="form-input"
      />

      {/* Price */}
      <input
        type="number"
        name="price"
        placeholder="Price (₹)"
        value={form.price}
        onChange={handleChange}
        required
        className="form-input"
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Product description"
        value={form.description}
        onChange={handleChange}
        className="form-input"
      />

      {/* Category */}
      {/* <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
        className="w-full input input-bordered"
      /> */}

<div className="w-full relative pb-2">
     {loading ? (
        <FaSpinner className="animate-ping" />
      ) : (
        !othercategory?(
        <select name="category" id="" className="form-input w-full">
          {categories.map((c, i) => (
            <option value={c} key={i}>
              {c}
            </option>
          ))}
        </select>
        ):(
            <input type="text" className="form-input w-full" placeholder="Category" name="category" value={form.category} onChange={(e)=>setForm(prev=>({...prev,category:e.target.value}))}></input>
        )
      )}


      <button onClick={(e)=>{e.preventDefault();setothercategory(prev=>!prev)}} className="absolute right-0 -bottom-3 text-blue-600 underline capitalize ">New category</button>
</div>
 

      {/* Count */}
      <input
        type="number"
        name="count"
        placeholder="Stock count"
        value={form.count}
        onChange={handleChange}
        required
        className="form-input"
      />
      <label htmlFor="images" className="form-label">
        {" "}
        Images (Select up to 4 images)
      </label>

      <input
        type="file"
        className="form-input"
        multiple
        required
        onChange={handleImage}
        name="image"
      />

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Save Product
      </button>
    </form>
  );
};

export default ProductForm;
