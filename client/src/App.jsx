import './App.css'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { edadValidator } from './validators'


function App() {
  const [empleadosList, setEmpleadosList] = useState([])
  const [editar, setEditar] = useState(false)
  const [id, setId] = useState('')

  const { register, handleSubmit, watch, formState: { errors }, setValue, getValues, reset } = useForm()
  const incluirTelefono = watch('incluirTelefono')

  const agregar = () => {
    const { nombre, apellido, edad, pais, cargo, experiencia, residencia, email, telefono } = getValues()

    fetch('http://localhost:3001/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        pais: pais,
        cargo: cargo,
        experiencia: experiencia,
        residencia: residencia,
        email: email,
        telefono: telefono
      })
    }).then(() => {
      getEmpleados()
      alert("Empleado registrado")
      limpiarCampos()
    }).catch((error) => {
      console.log('error', error)
    })
  }

  const update = () => {
    const { nombre, apellido, edad, pais, cargo, experiencia, residencia, email, telefono } = getValues()

    fetch('http://localhost:3001/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        pais: pais,
        cargo: cargo,
        experiencia: experiencia,
        residencia: residencia,
        email: email,
        telefono: telefono
      })
    }).then(() => {
      getEmpleados()
      limpiarCampos()
      alert('Actualizado con Éxito')
    }).catch((error) => {
      console.log('error', error)
    })
  }

  const eliminarEmpleado = (id) => {
    fetch(`http://localhost:3001/delete/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        getEmpleados()
        alert('Empleado eliminado con éxito')
      })
      .catch((error) => {
        console.log('error', error)
      })
  }


  const limpiarCampos = () => {
    /*    setValue('nombre', '')
       setValue('apellido', '')
       setValue('edad', '')
       setValue('pais', '')
       setValue('cargo', '')
       setValue('experiencia', '')
       setValue('residencia', '')
       setValue('email', '')
       setValue('incluirTelefono', '')
       setValue('telefono', '')
       setId('')*/
    setEditar(false)
    reset()
  }

  const editarEmpleado = (val) => {
    setEditar(true)
    setValue('nombre', val.nombre)
    setValue('apellido', val.apellido)
    setValue('edad', val.edad)
    setValue('pais', val.pais)
    setValue('cargo', val.cargo)
    setValue('experiencia', val.experiencia)
    setValue('residencia', val.residencia)
    setValue('email', val.email)
    setValue('telefono', val.telefono)
    setId(val.id)
  }

  const getEmpleados = () => {
    fetch('http://localhost:3001/empleados')
      .then((response) => response.json())
      .then((data) => setEmpleadosList(data))
      .catch((error) => console.error('Error:', error))
  }

  useEffect(() => {
    getEmpleados()
  }, [])


  return (
    <>
      <div className="container">

        <div className="card text-center">
          <div className="card-header">
            GESTION DE EMPLEADOS
          </div>
          <div className="card-body">

            <form onSubmit={handleSubmit(editar ? update : agregar)} >

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Nombre:</span>
                <input type="text" className="form-control" placeholder="Ingrese Nombre" aria-label="Username" aria-describedby="basic-addon1"
                  {...register('nombre',
                    {
                      required: {
                        value: true,
                        message: 'El Nombre es obligatorio'
                      },
                      minLength: {
                        value: 2,
                        message: 'El Nombre debe tener al menos de 2 caracteres'
                      },
                      maxLength: {
                        value: 10,
                        message: "El nombre debe tener menos de 10 caracteres"
                      }
                    })} />
                {errors.nombre && <p>{errors.nombre.message}</p>}
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Apellido:</span>
                <input type="text" className="form-control" placeholder="Ingrese apellido" aria-label="Username" aria-describedby="basic-addon1"
                  {...register('apellido',
                    {
                      required: true

                    })} />
                {errors.apellido && <p>El Apellido es obligatorio</p>}
              </div>

              {/* funcion en validators.js */}
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Edad :</span>
                <input type="Number" className="form-control" placeholder="Ingrese edad" aria-label="Username" aria-describedby="basic-addon1"
                  {...register('edad', {
                    validate: edadValidator,
                    required: true
                  })} />
                {errors.edad?.type === 'required' && <p>La Edad es obligatorio</p>}
                {errors.edad?.type === 'validate' && <p>La Edad debe ser entre 18 años y 65 años</p>}
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">País :</span>
                <input type="text" className="form-control" placeholder="Ingrese país" aria-label="Username" aria-describedby="basic-addon1"
                  {...register('pais', { required: true })} />
                {errors.pais && <p>El Pais es obligatorio</p>}
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Cargo :</span>
                <input type="text" className="form-control" placeholder="Ingrese cargo" aria-label="Username" aria-describedby="basic-addon1"
                  {...register('cargo', { required: true })} />
                {errors.cargo && <p>El Cargo es obligatorio</p>}
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Experiencia :</span>
                <input type="number" className="form-control" placeholder="Ingrese años de experiencia" aria-label="Username" aria-describedby="basic-addon1"
                  {...register('experiencia', { required: true })} />
                {errors.experiencia && <p>La experiencia es obligatorio</p>}
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Residencia :</span>
                <select className="form-control" placeholder="Lugar donde le gustaría vivir" aria-label="Username" aria-describedby="basic-addon1"
                  {...register('residencia', { required: true })}>
                  <option value="">Seleccione donde le gustaría vivir</option>
                  <option>España</option>
                  <option>Venezuela</option>
                  <option>Colombia</option>
                  <option>Inglaterra</option>
                  <option>Francia</option>
                  <option>Rusia</option>
                </select>
                {errors.experiencia && <p>La residencia es obligatorio</p>}
              </div>


              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Email :</span>
                <input type="email" className="form-control" placeholder="Correo Electronico" aria-label="Username" aria-describedby="basic-addon1"
                  {...register('email',
                    {
                      required: true,
                      pattern: /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+\.)+[a-z]{2,7}$/
                    })} />
                {errors.email?.type === 'required' && <p>El Email es requerido</p>}
                {errors.email?.type === 'pattern' && <p>El formato del Email es incorrecto</p>}
              </div>

              <div className="input-group mb-3">
                <label className="input-group-text" id="basic-addon1">Incluir Teléfono?</label>
                <input type="checkbox" className="form-check-input" aria-label="Checkbox for following text input"
                  {...register('incluirTelefono', {

                  })} />
              </div>
              {incluirTelefono && (<div className="input-group mb-3">
                <label className="input-group-text" id="basic-addon1">Teléfono</label>
                <input type="text" className="form-control" aria-label="Username"
                  {...register('telefono', {
                    pattern: /^[0-9]{11}$/
                  })} />
                {errors.telefono?.type === 'pattern' && <p>El formato del teléfono es incorrecto</p>}

              </div>)}


            </form>
          </div>
          <div className="card-footer text-muted">
            {
              editar ?
                <div>
                  <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
                  <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
                </div>

                : <button className='btn btn-success' onClick={handleSubmit(agregar)}>Agregar</button>
            }
          </div>
        </div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Edad</th>
              <th scope="col">País</th>
              <th scope="col">Cargo</th>
              <th scope="col">Experiencia</th>
              <th scope="col">Residencia</th>
              <th scope="col">Email</th>
              <th scope="col">Teléfono</th>
            </tr>
          </thead>
          <tbody>

            {
              empleadosList.map((val, key) => {
                return <tr key={val.id}>
                  <th scope="row">{val.id}</th>
                  <td>{val.nombre}</td>
                  <td>{val.apellido}</td>
                  <td>{val.edad}</td>
                  <td>{val.pais}</td>
                  <td>{val.cargo}</td>
                  <td>{val.experiencia}</td>
                  <td>{val.residencia}</td>
                  <td>{val.email}</td>
                  <td>{val.telefono}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" className='btn btn-info m-2' onClick={() => { editarEmpleado(val) }}>Editar</button>

                      <button type="button" className='btn btn-danger m-2' onClick={() => eliminarEmpleado(val.id)}>Eliminar</button>

                    </div>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div >
    </>
  )
}

export default App 
