import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import supabase from "../config/supabaseClient";

const Create = () => {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [rating, setRating] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // to stop the page form reloading 

    if (!title || !method || !rating) {
      setError("Please enter all the fields correctly")
      return
    }

    const { data, error } = await supabase
      .from("recipes")
      .insert([{ title, method, rating }])
      .select()

    if (error) {
      setError('Please enter all the fields')
    }
    if (data) {
      setError(null)
      toast.success("Product added successfully")
      setTimeout(() => {
        navigate("/")
      }, 2000)
    }
  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          value={title}
          id="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="method">Method:</label>
        <textarea
          value={method}
          id="method"
          onChange={(e) => setMethod(e.target.value)}
        />
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          value={rating}
          id="rating"
          onChange={(e) => setRating(e.target.value)}
        />
        <button>Create a new recipe</button>
      </form>
      {error && <p>{error}</p>}
      <Toaster
        position="top-right"
        reverseOrder={false} />
    </div>
  )
}

export default Create