import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import supabase from "../config/supabaseClient";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [rating, setRating] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !method || !rating) {
      setError("Please enter valid inputs")
      return
    }

    const { data, error } = await supabase
      .from('recipes')
      .update({ title, method, rating })
      .eq("id", id)
      .select()

    if (error) {
      setError("Please enter valid inputs")
    }
    if (data) {
      setError(null)
      navigate("/")
    }
  }

  useEffect(() => {
    const fetchRecipe = async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select()
        .eq("id", id)
        .single()

      if (error) {
        navigate("/")
      }
      if (data) {
        setTitle(data.title)
        setMethod(data.method)
        setRating(data.rating)
      }
    }
    fetchRecipe()
  }, [id, navigate])
  return (
    <div className="page update">
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
        <button className="button">Update recipe</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  )
}

export default Update