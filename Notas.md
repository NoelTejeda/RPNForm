https://www.youtube.com/watch?v=GEfOr56nBsc&t=304s
Crea formularios fácilmente con React Hook Forms


`const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();`

Aquí está lo que hace cada función:

register: Esta función te permite “registrar” los inputs en tu formulario con React Hook Form para que puedas recoger y validar sus valores.

handleSubmit: Esta función se pasa como el manejador de envío del formulario. Recibe una función que se ejecuta cuando el formulario es válido.

formState: { errors }: formState es un objeto que contiene información sobre el estado del formulario. Estás extrayendo errors de formState, que es un objeto que contiene cualquier error de validación que ocurra en el formulario.

setValue: Esta función te permite establecer manualmente el valor de un campo específico.

getValues: Esta función te permite obtener los valores actuales de los campos del formulario.

------------------------------------------------------------------

`Los placeholder no funcionan en los select; es decir; no se muestran, para esto se puede agregar una opción y establecer su valor en blando.`

------------------------------------------------------------------

Nota: si se coloca el maxLength en el input no se mostrará el mensaje de validación, debido a que en el input ya está limitando los caracteres y esto bloquea la validación

`<input type="text" className="form-control" placeholder="Ingrese Nombre" maxLength='50'`
`{errors.nombre?.type === 'maxLength' && <p>El Nombre debe tener menos de 10 caracteres</p>}`


------------------------------------------------------------------

la función watch es saber que se está escribiendo en tiempo real 