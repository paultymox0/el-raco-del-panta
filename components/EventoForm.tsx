'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FloatingInput, FloatingSelect, FloatingTextarea } from '@/components/FloatingInput'
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-light border border-green-mid rounded-2xl p-8 text-center"
      >
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="font-heading text-2xl text-green-dark mb-3">{t('form_success_title', lang)}!</h3>
        <p className="text-brown">{t('form_success_event', lang)}</p>
      </motion.div>
    )
  }

  const req = t('form_required', lang)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FloatingInput
          {...register('nombre', { required: req })}
          label={t('form_fullname', lang)}
          error={errors.nombre?.message}
        />
        <FloatingInput
          {...register('email', { required: req, pattern: /^\S+@\S+$/i })}
          type="email"
          label={t('form_email', lang)}
          error={errors.email ? t('form_invalid_email', lang) : undefined}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FloatingInput
          {...register('telefono', { required: req })}
          type="tel"
          label={t('form_phone', lang)}
          error={errors.telefono?.message}
        />
        <FloatingSelect
          {...register('tipoEvento', { required: req })}
          label={t('form_event_type', lang)}
          error={errors.tipoEvento?.message}
        >
          <option value="">{t('form_event_select', lang)}</option>
          <option value="cumpleanos">{t('form_event_birthday', lang)}</option>
          <option value="empresa">{t('form_event_business', lang)}</option>
          <option value="grupo">{t('form_event_group', lang)}</option>
          <option value="boda">{t('form_event_wedding', lang)}</option>
        </FloatingSelect>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FloatingInput
          {...register('fecha', { required: req })}
          type="date"
          min={new Date().toISOString().split('T')[0]}
          label={t('form_approx_date', lang)}
          error={errors.fecha?.message}
        />
        <FloatingInput
          {...register('personas', { required: req, min: 1 })}
          type="number"
          min={1}
          label={`${t('form_num_guests', lang)} — ${t('form_min_guests_note', lang)}`}
          error={errors.personas?.message}
        />
      </div>

      <FloatingInput
        {...register('presupuesto')}
        label={t('form_budget', lang)}
      />

      <FloatingTextarea
        {...register('descripcion', { required: req })}
        rows={5}
        label={t('form_description', lang)}
        error={errors.descripcion?.message}
      />

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-green-dark text-cream py-4 rounded-2xl font-heading font-bold text-lg hover:bg-green-mid transition-colors shadow-md"
      >
        {t('form_submit_event', lang)}
      </motion.button>
    </form>
  )
}
