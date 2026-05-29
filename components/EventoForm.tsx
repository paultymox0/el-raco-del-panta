'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  nombre: string
  email: string
  telefono: string
  tipoEvento: string
  fecha: string
  personas: number
  presupuesto: string
  descripcion: string
}

export default function EventoForm() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = () => setSubmitted(true)

  if (submitted) {
    return (
      <div className="bg-green-light border border-green-mid rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="font-heading text-2xl text-green-dark mb-3">¡Gracias!</h3>
        <p className="text-brown">
          Nos ponemos en contacto en 48 horas para diseñar tu evento perfecto.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-brown mb-1">Nombre y apellidos *</label>
          <input
            {...register('nombre', { required: true })}
            className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid"
            placeholder="Tu nombre completo"
          />
          {errors.nombre && <p className="text-red-600 text-xs mt-1">Campo requerido</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-brown mb-1">Email *</label>
          <input
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            type="email"
            className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid"
            placeholder="tu@email.com"
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">Email inválido</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-brown mb-1">Teléfono *</label>
          <input
            {...register('telefono', { required: true })}
            type="tel"
            className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid"
            placeholder="+34 6XX XXX XXX"
          />
          {errors.telefono && <p className="text-red-600 text-xs mt-1">Campo requerido</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-brown mb-1">Tipo de evento *</label>
          <select
            {...register('tipoEvento', { required: true })}
            className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid"
          >
            <option value="">Seleccionar tipo</option>
            <option value="cumpleanos">Cumpleaños / Celebración</option>
            <option value="empresa">Evento de empresa</option>
            <option value="grupo">Grupo familiar</option>
            <option value="boda">Boda / Celebración especial</option>
          </select>
          {errors.tipoEvento && <p className="text-red-600 text-xs mt-1">Campo requerido</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-brown mb-1">Fecha aproximada *</label>
          <input
            {...register('fecha', { required: true })}
            type="date"
            min={new Date().toISOString().split('T')[0]}
            className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid"
          />
          {errors.fecha && <p className="text-red-600 text-xs mt-1">Campo requerido</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-brown mb-1">
            Número de personas * <span className="text-xs text-brown/60">(mín. 15 para menú cerrado)</span>
          </label>
          <input
            {...register('personas', { required: true, min: 1 })}
            type="number"
            min={1}
            className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid"
            placeholder="Nº de personas"
          />
          {errors.personas && <p className="text-red-600 text-xs mt-1">Campo requerido</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-brown mb-1">Presupuesto por persona (opcional)</label>
        <input
          {...register('presupuesto')}
          className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid"
          placeholder="Ej: 30-50€ por persona"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-brown mb-1">Descripción del evento *</label>
        <textarea
          {...register('descripcion', { required: true })}
          rows={5}
          className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid resize-none"
          placeholder="Cuéntanos todos los detalles de tu evento especial..."
        />
        {errors.descripcion && <p className="text-red-600 text-xs mt-1">Campo requerido</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-green-dark text-cream py-4 rounded-2xl font-heading font-bold text-lg hover:bg-green-mid transition-colors shadow-md"
      >
        Consultar Disponibilidad
      </button>
    </form>
  )
}
