'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  nombre: string
  email: string
  telefono: string
  fecha: string
  hora: string
  personas: number
  ocasion: string
  comentarios: string
}

export default function ReservaForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submittedName, setSubmittedName] = useState('')
  const [personas, setPersonas] = useState(2)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { personas: 2 } })

  const today = new Date().toISOString().split('T')[0]

  const onSubmit = (data: FormData) => {
    setSubmittedName(data.nombre)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-green-light border border-green-mid rounded-2xl p-8 text-center animate-fade-in">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="font-heading text-2xl text-green-dark mb-3">
          ¡Gracias, {submittedName}!
        </h3>
        <p className="text-brown text-lg">
          Hemos recibido tu reserva. Te contactaremos pronto para confirmar.
        </p>
        <p className="text-brown/70 mt-2 text-sm">
          Recibirás una confirmación en menos de 24 horas.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-brown mb-1">Nombre completo *</label>
          <input
            {...register('nombre', { required: 'Campo requerido' })}
            className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid text-brown"
            placeholder="Tu nombre"
          />
          {errors.nombre && <p className="text-red-600 text-xs mt-1">{errors.nombre.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-brown mb-1">Email *</label>
          <input
            {...register('email', {
              required: 'Campo requerido',
              pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' },
            })}
            type="email"
            className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid text-brown"
            placeholder="tu@email.com"
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-brown mb-1">Teléfono *</label>
        <input
          {...register('telefono', { required: 'Campo requerido' })}
          type="tel"
          className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid text-brown"
          placeholder="+34 6XX XXX XXX"
        />
        {errors.telefono && <p className="text-red-600 text-xs mt-1">{errors.telefono.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-brown mb-1">Fecha *</label>
          <input
            {...register('fecha', { required: 'Campo requerido' })}
            type="date"
            min={today}
            className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid text-brown"
          />
          {errors.fecha && <p className="text-red-600 text-xs mt-1">{errors.fecha.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-brown mb-1">Hora *</label>
          <select
            {...register('hora', { required: 'Campo requerido' })}
            className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid text-brown"
          >
            <option value="">Seleccionar hora</option>
            <option>13:00</option>
            <option>13:30</option>
            <option>14:00</option>
            <option>14:30</option>
            <option>20:00</option>
            <option>20:30</option>
            <option>21:00</option>
            <option>21:30</option>
          </select>
          {errors.hora && <p className="text-red-600 text-xs mt-1">{errors.hora.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-brown mb-1">Número de personas *</label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setPersonas(Math.max(1, personas - 1))}
            className="w-10 h-10 rounded-full bg-green-dark text-cream flex items-center justify-center text-xl font-bold hover:bg-green-mid transition-colors"
          >
            −
          </button>
          <span className="text-2xl font-heading font-bold text-green-dark w-8 text-center">{personas}</span>
          <button
            type="button"
            onClick={() => setPersonas(Math.min(20, personas + 1))}
            className="w-10 h-10 rounded-full bg-green-dark text-cream flex items-center justify-center text-xl font-bold hover:bg-green-mid transition-colors"
          >
            +
          </button>
          <input type="hidden" {...register('personas')} value={personas} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-brown mb-1">Ocasión especial</label>
        <select
          {...register('ocasion')}
          className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid text-brown"
        >
          <option value="ninguna">Ninguna</option>
          <option value="cumpleanos">Cumpleaños</option>
          <option value="aniversario">Aniversario</option>
          <option value="empresa">Empresa</option>
          <option value="otra">Otra</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-brown mb-1">Comentarios</label>
        <textarea
          {...register('comentarios')}
          rows={4}
          className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid text-brown resize-none"
          placeholder="Alergias, preferencias, etc."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-dark text-cream py-4 rounded-2xl font-heading font-bold text-lg hover:bg-green-mid transition-colors shadow-md"
      >
        Solicitar Reserva
      </button>
    </form>
  )
}
