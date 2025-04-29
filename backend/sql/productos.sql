-- Crear la tabla productos
CREATE TABLE IF NOT EXISTS public.productos (
    "REGISTRO" SERIAL PRIMARY KEY,
    "DESCRIPCION" VARCHAR(255) NOT NULL,
    "INGREDIENTE_ACTIVO" VARCHAR(255) NOT NULL,
    "PRODUCTO" VARCHAR(255) NOT NULL
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_productos_registro ON public.productos("REGISTRO");

-- Insertar algunos datos de ejemplo
INSERT INTO public.productos ("DESCRIPCION", "INGREDIENTE_ACTIVO", "PRODUCTO")
VALUES 
    ('Herbicida selectivo', 'Glifosato', 'RoundUp'),
    ('Insecticida sistémico', 'Imidacloprid', 'Confidor'),
    ('Fungicida de contacto', 'Mancozeb', 'Dithane')
ON CONFLICT DO NOTHING;
