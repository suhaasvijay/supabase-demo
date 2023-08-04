import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import supabase from "../config/supabaseClient";

export default function RecipeCard({ recipe, onDelete }) {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("recipes")
      .delete()
      .eq("id", recipe.id)
      .select()

    if (error) {
      console.log(error)
    }
    if (data) {
      onDelete(recipe.id)
      toast.success("Product deletes successfully")
    }
  }

  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      <p>{recipe.method}</p>
      <div className="rating">{recipe.rating}</div>
      <div className="button">
        <Link to={"/" + recipe.id}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>delete</i>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false} />
    </div>
  )
}
