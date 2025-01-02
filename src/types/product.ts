
export interface Categoria {
    id_categoria: string;
    nombre_categoria: string;
    imagen_categoria: string;
}

export interface Linea {
    id_linea: string;
    nombre_linea: string;
}

  
export interface Producto {
    id_producto: string;
    nombre_producto: string;
    precio: number;
    cantidad: number;
    id_categoria: string;
    id_linea: string;
}   

export interface Carrito {
    id_carrito: string;
    id_usuario: string;
    id_producto: string;
    activo: boolean;
    cantidad: number;
}

export interface Venta {
    id_venta: string;
    id_usuario: string;
    id_producto: string;
    cantidad: number;
    total: number;
}

export interface ImagenProducto {
    id_imagen_producto: string;
    id_producto: string;
    imagen_producto: string;
}

export interface DetalleVenta {
    id_detalle_venta: string;
    id_venta: string;
    id_producto: string;
    cantidad: number;
    subtotal: number;
}