import Link from "next/link";

export function Header() {
    return (
      <header>
          <section className="container">
            <a href="/"><img className="logo" src="/uv-indeks-logo.png" alt="logo" /></a>
          </section>
          <section>
          <ul className="menu">
            <li className="menu-item"><Link className="menu-item-link" href="/">UV i dag</Link></li>
            <li className="menu-item"><Link className="menu-item-link" href="/i-morgen">UV i morgen</Link></li>
            <li className="menu-item"><Link className="menu-item-link" href="/lokation">Lokation</Link></li>
            <li className="menu-item"><Link className="menu-item-link" href="/om">Om</Link></li>
          </ul>
          </section>
      </header>
    )
  }