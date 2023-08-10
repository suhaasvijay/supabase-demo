import { useState, useEffect } from "react"

import supabase from "../config/supabaseClient"
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const [orderBy, setOrderBy] = useState('created_at');

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
        .order(orderBy, { ascending: false })

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
  }, [orderBy])

  return (
    <div className="page home">
      {error && <p>{error}</p>}
      {recipes && (
        <div className="recipes">
          <div className="orderBy">
            <p>Order By:</p>
            <button onClick={() => setOrderBy('created_at')}>Created At</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
          </div>
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