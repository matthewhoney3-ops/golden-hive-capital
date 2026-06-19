import logoFull from '../assets/logo-full.png'

export default function About() {
  return (
    <section className="py-20">
      <div className="max-w-[760px] mx-auto px-8">
        <div className="eyebrow text-xs tracking-[0.3em] text-gold-2 mb-3.5">ABOUT</div>
        <h1 className="font-display font-semibold text-3xl mb-8">Built deliberately. Designed to endure.</h1>

        <img src={logoFull} alt="Golden Hive Capital" className="w-40 mx-auto mb-10 opacity-90" />

        <div className="space-y-6 text-muted leading-relaxed">
          <p>
            At Golden Hive Capital, we believe exceptional real estate is built the same way a hive is built:
            intentionally, patiently, and one strong foundation at a time.
          </p>
          <p>
            Our name is inspired by one of nature's most efficient architects. A beehive is not assembled
            overnight, nor is it built carelessly. Every component is designed to strengthen the whole,
            creating a structure capable of enduring for generations.
          </p>
          <p>That philosophy guides every decision we make.</p>
          <p>
            We are a family-owned real estate investment company focused on acquiring and managing
            residential properties throughout the Phoenix metropolitan area. Rather than pursuing rapid
            growth or short-term returns, we take a deliberate, long-term approach to building a portfolio of
            high-quality homes.
          </p>
          <p>
            We believe that durability matters. That's why construction quality is one of the first criteria
            we evaluate when acquiring a property. We prioritize homes built with resilient materials such as
            concrete block, brick, and steel, structures designed to withstand Arizona's unique climate and
            continue performing well for decades.
          </p>
          <p>
            Our investment philosophy extends beyond the buildings themselves. We believe owning rental
            properties should be a hands-on responsibility, not a distant transaction. Whenever possible, we
            simplify the living experience for our residents by reducing unnecessary complexity and remaining
            directly involved in the properties we own.
          </p>
          <p>
            There are no layers of corporate bureaucracy between tenants and decision-makers. When something
            needs attention, you'll communicate directly with people who know the property and are invested
            in maintaining it properly.
          </p>
          <p>
            Golden Hive Capital is built on a simple idea: create enduring value through thoughtful
            decisions, disciplined acquisitions, and long-term stewardship.
          </p>
          <p>Like a hive, we aren't trying to build everything at once. We're building something that lasts.</p>
        </div>
      </div>
    </section>
  )
}
