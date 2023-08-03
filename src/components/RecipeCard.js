export default function RecipeCard({ data }) {
  return (
    <div className="recipe-card">
      <h3>{data.title}</h3>
      <p>{data.method}</p>
      <div className="rating">{data.rating}</div>
    </div>
  )
}
