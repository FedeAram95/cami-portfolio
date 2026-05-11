# 🔧 Configuración de Supabase

## Paso 1: Crear Proyecto en Supabase

1. Ir a [supabase.com](https://supabase.com)
2. Crear cuenta / iniciar sesión
3. Crear nuevo proyecto
   - Nombre: `cami-portfolio`
   - Region: La más cercana
   - Password: Guardar seguro

## Paso 2: Obtener Credenciales

1. En el proyecto, ir a **Settings** → **API**
2. Copiar:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Paso 3: Crear Tablas

1. Ir a **SQL Editor** en Supabase
2. Crear nueva query y ejecutar este código:

```sql
-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR NOT NULL,
  titleEn VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  image VARCHAR,
  description TEXT,
  descriptionEn TEXT,
  behanceUrl VARCHAR,
  year VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Profile table
CREATE TABLE profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR,
  bio TEXT,
  bioEn TEXT,
  email VARCHAR,
  photoUrl VARCHAR,
  title VARCHAR,
  titleEn VARCHAR,
  yearsOfExperience INT
);

-- Theme settings table
CREATE TABLE theme_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  primaryColor VARCHAR DEFAULT '#d946a8',
  secondaryColor VARCHAR DEFAULT '#a21caf',
  backgroundColor VARCHAR DEFAULT '#ffffff',
  textColor VARCHAR DEFAULT '#171717',
  sansFont VARCHAR DEFAULT 'Geist',
  serifFont VARCHAR DEFAULT 'Geist',
  monoFont VARCHAR DEFAULT 'Geist Mono'
);

-- Specialties table
CREATE TABLE specialties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  nameEn VARCHAR NOT NULL
);

-- Enable realtime for all tables
ALTER TABLE projects REPLICA IDENTITY FULL;
ALTER TABLE profile REPLICA IDENTITY FULL;
ALTER TABLE theme_settings REPLICA IDENTITY FULL;
ALTER TABLE specialties REPLICA IDENTITY FULL;
```

## Paso 4: Crear Storage Buckets

1. Ir a **Storage** en Supabase
2. Crear dos buckets:
   - Nombre: `projects-images`
     - Público: ✅
   - Nombre: `profile-photos`
     - Público: ✅

## Paso 5: Configurar Archivo .env.local

Copiar `.env.local.example` a `.env.local` y completar:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
NEXT_PUBLIC_ADMIN_PASSWORD=cami2025
```

## Paso 6: Insertar Datos Iniciales (Opcional)

En SQL Editor, ejecutar:

```sql
-- Insert initial profile
INSERT INTO profile (name, bio, bioEn, email, title, titleEn, yearsOfExperience)
VALUES (
  'Camila Piana',
  'Soy Cami, diseñadora gráfica con más de 7 años de experiencia...',
  'I''m Cami, a graphic designer with over 7 years of experience...',
  'camipiana24@gmail.com',
  'Diseñadora Gráfica & Estratega Visual',
  'Graphic Designer & Visual Strategist',
  7
);

-- Insert theme settings
INSERT INTO theme_settings DEFAULT VALUES;

-- Insert specialties
INSERT INTO specialties (name, nameEn) VALUES
('Branding', 'Branding'),
('UX / UI', 'UX / UI'),
('Paid Media', 'Paid Media'),
('Email Marketing', 'Email Marketing'),
('Inbound Marketing', 'Inbound Marketing'),
('Lead Nurturing', 'Lead Nurturing');
```

## Paso 7: Verificar Configuración

```bash
npm run dev
```

Si todo está bien, deberías ver:
- ✅ No errores en consola
- ✅ Datos cargando desde Supabase
- ✅ Admin panel accesible en `/admin`

## 🔐 Contraseña Admin

Actual: `cami2025`

Para cambiar, editar en `src/context/AuthContext.tsx`:
```typescript
if (password === 'cami2025') {  // ← Cambiar aquí
```

> ⚠️ Nota: En producción, usar un sistema de autenticación real (Supabase Auth, Auth0, etc.)

## 📚 Recursos

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime)
- [Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

¿Necesitas ayuda? Revisar el plan en `plans/misty-discovering-galaxy.md`
