from sqlmodel import SQLModel, create_engine, Field
from datetime import datetime, timezone
from enum import Enum as PyEnum

url = "postgresql+psycopg://admin:victor@localhost:5432/fruterp_db"
engine = create_engine(url, echo = True)

class EstadoPedido(str, PyEnum):
    PENDIENTE = "pendiente"
    EN_PROGRESO = "en_progreso"
    COMPLETADA = "completada"

class Producto(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nombre: str
    en_temporada: bool
    ecologico: bool
    precio: float

class Cliente(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nombre: str
    email: str
    ubicacion_id: int | None = Field(default=None, foreign_key="ubicacion.id")

class Pedido(SQLModel, table=True): #El calculo de total se hace en el endpoint, no es necesario guardarlo en la base de datos
    id: int | None = Field(default=None, primary_key=True)
    cliente_id: int = Field(foreign_key="cliente.id")
    fecha : datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    estado: EstadoPedido = Field(default=EstadoPedido.PENDIENTE)

class Ruta(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    empleado_id: int = Field(foreign_key="empleado.nss")
    fecha: datetime
    estado : EstadoPedido = Field(default=EstadoPedido.PENDIENTE)

class ParadaReparto(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    ruta_id: int = Field(foreign_key="ruta.id")
    pedido_id: int = Field(foreign_key="pedido.id")
    orden_optimizado: int = Field(default=0)

class DetallePedido(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    pedido_id: int = Field(foreign_key="pedido.id")
    producto_id: int = Field(foreign_key="producto.id")
    cantidad: int
    precio_unitario: float

class Proveedor(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nombre: str
    email: str
    ubicacion_id: int | None = Field(default=None, foreign_key="ubicacion.id")

class Inventario(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    producto_id: int = Field(foreign_key="producto.id")
    almacen_id : int = Field(foreign_key="almacen.id")
    cantidad: int

class Empleado(SQLModel, table=True):
    nss: int | None = Field(default=None, primary_key=True)
    nombre: str
    email: str
    tienda_id: int = Field(foreign_key="tienda.id")
    cargo: str
    salario: float

class Almacen(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nombre: str
    ubicacion_id: int = Field(foreign_key="ubicacion.id")

class ProveidorProducto(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    proveedor_id: int = Field(foreign_key="proveedor.id")
    producto_id: int = Field(foreign_key="producto.id")

class Proveido(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    proveedor_id: int = Field(foreign_key="proveedor.id")
    producto_id: int = Field(foreign_key="producto.id")
    cantidad: int

class Ubicacion(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    ciudad: str
    calle: str
    numero: str
    codigo_postal: str

class Tienda(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nombre: str
    ubicacion_id: int = Field(foreign_key="ubicacion.id")

def crearTablas():
    print("Creando tablas en la base de datos...")
    SQLModel.metadata.create_all(engine)
    print("Tablas creadas exitosamente.")

if __name__ == "__main__":
    crearTablas()