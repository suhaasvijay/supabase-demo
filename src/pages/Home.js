import { useState, useEffect } from "react"

import supabase from "../config/supabaseClient"
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState(null);

  const handleDelete = (id) => {
    setRecipes(prevRecipes => {
      return prevRecipes.filter(re => re.id !== id)
    })
  }

  useEffect(() => {
    const recipe = async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select()

      if (error) {
        setError("could not fetch recipes")
        console.log(error);
        setRecipes(null)
      }
      if (data) {
        setRecipes(data)
        setError(null)
      }
    }
    recipe()
  }, [])

  return (
    <div className="page home">
      {error && <p>{error}</p>}
      {recipes && (
        <div className="recipes">
          <div className="recipe-grid">
            {recipes.map(recipes => (
              <RecipeCard key={recipes.id} recipe={recipes} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home