'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

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
  const { lang } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = () => setSubmitted(true)

  if (submitted) {
    return (
      <div className="bg-green-light border border-green-mid rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="font-heading text-2xl text-green-dark mb-3">{t('form_success_title', lang)}!</h3>
        <p className="text-brown">{t('form_success_event', lang)}</p>
      </div>
    )
  }

  const req = t('form_required', lang)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-brown mb-1">{t('form_fullname', lang)}</label>
          <input {...register('nombre', { required: req })}
            className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid"
            placeholder="..." />
          {errors.nombre && <p className="text-red-600 text-xs mt-1">{errors.nombre.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-brown mb-1">{t('form_email', lang)}</label>
          <input {...register('email', { required: req, pattern: /^\S+@\S+$/i })}
            type="email"
            className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid"
            placeholder="tu@email.com" />
          {errors.email && <p className="text-red-600 text-xs mt-1">{t('form_invalid_email', lang)}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-brown mb-1">{t('form_phone', lang)}</label>
          <input {...register('telefono', { required: req })}
            type="tel"
            className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid"
            placeholder="+34 6XX XXX XXX" />
          {errors.telefono && <p className="text-red-600 text-xs mt-1">{errors.telefono.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-brown mb-1">{t('form_event_type', lang)}</label>
          <select {...register('tipoEvento', { required: req })}
            className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid">
            <option value="">{t('form_event_select', lang)}</option>
            <option value="cumpleanos">{t('form_event_birthday', lang)}</option>
            <option value="empresa">{t('form_event_business', lang)}</option>
            <option value="grupo">{t('form_event_group', lang)}</option>
            <option value="boda">{t('form_event_wedding', lang)}</option>
          </select>
          {errors.tipoEvento && <p className="text-red-600 text-xs mt-1">{errors.tipoEvento.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-brown mb-1">{t('form_approx_date', lang)}</label>
          <input {...register('fecha', { required: req })}
            type="date"
            min={new Date().toISOString().split('T')[0]}
            className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid" />
          {errors.fecha && <p className="text-red-600 text-xs mt-1">{errors.fecha.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-brown mb-1">
            {t('form_num_guests', lang)} <span className="text-xs text-brown/60">{t('form_min_guests_note', lang)}</span>
          </label>
          <input {...register('personas', { required: req, min: 1 })}
            type="number" min={1}
            className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid"
            placeholder={t('form_guests_ph', lang)} />
          {errors.personas && <p className="text-red-600 text-xs mt-1">{errors.personas.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-brown mb-1">{t('form_budget', lang)}</label>
        <input {...register('presupuesto')}
          className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid"
          placeholder={t('form_budget_ph', lang)} />
      </div>

      <div>
        <label className="block text-sm font-semibold text-brown mb-1">{t('form_description', lang)}</label>
        <textarea {...register('descripcion', { required: req })} rows={5}
          className="w-full border border-wood rounded-xl px-4 py-3 bg-parchment/50 focus:outline-none focus:ring-2 focus:ring-green-mid resize-none"
          placeholder={t('form_description_ph', lang)} />
        {errors.descripcion && <p className="text-red-600 text-xs mt-1">{errors.descripcion.message}</p>}
      </div>

      <button type="submit"
        className="w-full bg-green-dark text-cream py-4 rounded-2xl font-heading font-bold text-lg hover:bg-green-mid transition-colors shadow-md">
        {t('form_submit_event', lang)}
      </button>
    </form>
  )
}
