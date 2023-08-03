import { useState, useEffect } from "react"

import supabase from "../config/supabaseClient"

const Home = () => {
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const recipe = async () => {
      const { data, error } = await supabase.from('recipes').select()

      if (error) {
        setError("could not fetch recipes")
        console.log(error);
        setRecipes(null)
      }
      if (data) {
        setRecipes(data)
        console.log(data);
        setError(null)
      }
    }
    recipe()
  }, [])

  return (
    <div className="page home">
      {error && <p>{error}</p>}
      {recipes && (
        <div>
          {recipes.map(recipes => (
            <p>{recipes.title}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home