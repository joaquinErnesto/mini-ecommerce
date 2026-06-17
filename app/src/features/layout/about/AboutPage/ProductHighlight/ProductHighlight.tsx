export const ProductHighlight = () => {
  return (
    <section className="product-highlight grid md:grid-cols-2 gap-16">

      <div className="product-image">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7ZfrdpZXYdLDWCxvd3IyPO8xLOGoXLMUKG70ymzM5B_gtrhT9RUM5649FPbO7WsVivQGu2jnm1uArhMil_Xjw0hblvs13Q3RBcU2TJQfYyshRHjc0YteNaxc1fvnWyoRxD4vwEnufW3LB2BOYUv6B2AqHuuzoi6OKzcgxJXyHde6vAN5TtNC3xnI3aIPLxXMW3TrI_7377eGN6ZL3zgDL3P0OI29UrO2-l1jfIljrk-5g4M7xnhTHwsuRIO1j70DJdECdzf6v__t9" />
      </div>

      <div>
        <h2 className="text-5xl font-bold text-blue-color">
          Precision Over Plurality
        </h2>

        <p className="text-gray-400 mt-4">
          Our selection process is rigorous.
        </p>

        <button className="btn-primary mt-8">
          EXPLORE
        </button>
      </div>

    </section>
  )
}