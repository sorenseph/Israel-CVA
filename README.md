# Portfolio — Israel Cárdenas Valderas

Sitio personal en Vue 3 + TypeScript con perfil CV y servicios freelance.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Supabase (demos en vivo)

1. Copia `.env.example` a `.env.local` con tu URL y publishable key.
2. En el **SQL Editor** de Supabase, ejecuta `supabase/migrations/001_portfolio.sql`.
3. Reinicia `npm run dev` — el formulario guarda leads y el feed se actualiza en tiempo real.

## Personajes 3D (Humans)

Descarga el [demo gratuito de Humans 3.0](https://humans.wannathis.one/#demo) y coloca un PNG en:

```
public/characters/hero.png
```

## Despliegue

- **Vercel:** conecta el repo; detecta Vite automáticamente.
- **Netlify:** usa `netlify.toml` incluido.
