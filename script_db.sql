
SCRIPT DE SUPERMERCADO WOOW
-- DROP TABLE public.ordenes;

CREATE TABLE public.ordenes (
	id serial4 NOT NULL,
	id_proveedor int4 NULL,
	fecha timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	estado varchar(20) DEFAULT 'Pendiente'::character varying NULL,
	CONSTRAINT ordenes_pkey PRIMARY KEY (id)
);


-- public.ordenes definition

-- Drop table

-- DROP TABLE public.ordenes;

CREATE TABLE public.ordenes (
	id serial4 NOT NULL,
	id_proveedor int4 NULL,
	fecha timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	estado varchar(20) DEFAULT 'Pendiente'::character varying NULL,
	CONSTRAINT ordenes_pkey PRIMARY KEY (id)
);


-- public.ordenes definition

-- Drop table

-- DROP TABLE public.ordenes;

CREATE TABLE public.ordenes (
	id serial4 NOT NULL,
	id_proveedor int4 NULL,
	fecha timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	estado varchar(20) DEFAULT 'Pendiente'::character varying NULL,
	CONSTRAINT ordenes_pkey PRIMARY KEY (id)
);


-- public.ordenes definition

-- Drop table

-- DROP TABLE public.ordenes;

CREATE TABLE public.ordenes (
	id serial4 NOT NULL,
	id_proveedor int4 NULL,
	fecha timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	estado varchar(20) DEFAULT 'Pendiente'::character varying NULL,
	CONSTRAINT ordenes_pkey PRIMARY KEY (id)
);


-- public.ordenes definition

-- Drop table

-- DROP TABLE public.ordenes;

CREATE TABLE public.ordenes (
	id serial4 NOT NULL,
	id_proveedor int4 NULL,
	fecha timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	estado varchar(20) DEFAULT 'Pendiente'::character varying NULL,
	CONSTRAINT ordenes_pkey PRIMARY KEY (id)
);


-- public.ordenes definition

-- Drop table

-- DROP TABLE public.ordenes;

CREATE TABLE public.ordenes (
	id serial4 NOT NULL,
	id_proveedor int4 NULL,
	fecha timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	estado varchar(20) DEFAULT 'Pendiente'::character varying NULL,
	CONSTRAINT ordenes_pkey PRIMARY KEY (id)
);


-- public.ordenes definition

-- Drop table

-- DROP TABLE public.ordenes;

CREATE TABLE public.ordenes (
	id serial4 NOT NULL,
	id_proveedor int4 NULL,
	fecha timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	estado varchar(20) DEFAULT 'Pendiente'::character varying NULL,
	CONSTRAINT ordenes_pkey PRIMARY KEY (id)
);


-- public.ordenes definition

-- Drop table

-- DROP TABLE public.ordenes;

CREATE TABLE public.ordenes (
	id serial4 NOT NULL,
	id_proveedor int4 NULL,
	fecha timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	estado varchar(20) DEFAULT 'Pendiente'::character varying NULL,
	CONSTRAINT ordenes_pkey PRIMARY KEY (id)
);


-- public.ordenes definition

-- Drop table

-- DROP TABLE public.ordenes;

CREATE TABLE public.ordenes (
	id serial4 NOT NULL,
	id_proveedor int4 NULL,
	fecha timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	estado varchar(20) DEFAULT 'Pendiente'::character varying NULL,
	CONSTRAINT ordenes_pkey PRIMARY KEY (id)
);


-- public.ordenes definition

-- Drop table

-- DROP TABLE public.ordenes;

CREATE TABLE public.ordenes (
	id serial4 NOT NULL,
	id_proveedor int4 NULL,
	fecha timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	estado varchar(20) DEFAULT 'Pendiente'::character varying NULL,
	CONSTRAINT ordenes_pkey PRIMARY KEY (id)
);


-- public.ordenes definition

-- Drop table

-- DROP TABLE public.ordenes;

CREATE TABLE public.ordenes (
	id serial4 NOT NULL,
	id_proveedor int4 NULL,
	fecha timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	estado varchar(20) DEFAULT 'Pendiente'::character varying NULL,
	CONSTRAINT ordenes_pkey PRIMARY KEY (id)
);


-- public.productos definition

-- Drop table

-- DROP TABLE public.productos;

CREATE TABLE public.productos (
	id serial4 NOT NULL,
	codigo varchar(50) NOT NULL,
	nombre varchar(100) NOT NULL,
	descripcion text NULL,
	precio numeric(10, 2) NOT NULL,
	stock_actual int4 DEFAULT 0 NULL,
	stock_minimo int4 DEFAULT 5 NULL,
	categoria varchar(50) NULL,
	imagen_url text NULL,
	CONSTRAINT productos_codigo_key UNIQUE (codigo),
	CONSTRAINT productos_pkey PRIMARY KEY (id)
);


-- public.proveedores definition

-- Drop table

-- DROP TABLE public.proveedores;

CREATE TABLE public.proveedores (
	id serial4 NOT NULL,
	nombre varchar(100) NOT NULL,
	contacto varchar(100) NULL,
	telefono varchar(20) NULL,
	email varchar(100) NULL,
	direccion text NULL,
	CONSTRAINT proveedores_pkey PRIMARY KEY (id)
);


-- public.usuarios definition

-- Drop table

-- DROP TABLE public.usuarios;

CREATE TABLE public.usuarios (
	id serial4 NOT NULL,
	nombre varchar(100) NULL,
	email varchar(100) NOT NULL,
	"password" text NOT NULL,
	rol varchar(20) DEFAULT 'empleado'::character varying NULL,
	CONSTRAINT usuarios_email_key UNIQUE (email),
	CONSTRAINT usuarios_pkey PRIMARY KEY (id),
	CONSTRAINT usuarios_rol_check CHECK (((rol)::text = ANY ((ARRAY['admin'::character varying, 'empleado'::character varying])::text[])))
);


-- public.orden_detalles definition

-- Drop table

-- DROP TABLE public.orden_detalles;

CREATE TABLE public.orden_detalles (
	id serial4 NOT NULL,
	id_orden int4 NULL,
	id_producto int4 NULL,
	cantidad int4 NULL,
	CONSTRAINT orden_detalles_pkey null,
	CONSTRAINT orden_detalles_id_orden_fkey FOREIGN KEY (id_orden) REFERENCES public.ordenes(id)
);


-- public.ordenes_compra definition

-- Drop table

-- DROP TABLE public.ordenes_compra;

CREATE TABLE public.ordenes_compra (
	id serial4 NOT NULL,
	id_proveedor int4 NULL,
	fecha timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	estado varchar(20) DEFAULT 'pendientes'::character varying NULL,
	total numeric(10, 2) DEFAULT 0 NULL,
	CONSTRAINT ordenes_compra_pkey PRIMARY KEY (id),
	CONSTRAINT ordenes_compra_id_proveedor_fkey FOREIGN KEY (id_proveedor) REFERENCES public.proveedores(id) ON DELETE CASCADE
);


-- public.detalle_ordenes definition

-- Drop table

-- DROP TABLE public.detalle_ordenes;

CREATE TABLE public.detalle_ordenes (
	id serial4 NOT NULL,
	id_orden int4 NULL,
	id_producto int4 NULL,
	cantidad int4 NOT NULL,
	precio_compra numeric(10, 2) NOT NULL,
	CONSTRAINT detalle_ordenes_pkey PRIMARY KEY (id),
	CONSTRAINT detalle_ordenes_id_orden_fkey FOREIGN KEY (id_orden) REFERENCES public.ordenes_compra(id) ON DELETE CASCADE,
	CONSTRAINT detalle_ordenes_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.productos(id)
);