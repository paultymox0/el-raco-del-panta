'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FloatingInput, FloatingSelect, FloatingTextarea } from '@/components/FloatingInput'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

type TKey = Parameters<typeof t>[0]

const OCCASION_KEYS: Record<string, TKey> = {
  ninguna: 'form_occ_none',
  cumpleanos: 'form_occ_birthday',
  aniversario: 'form_occ_anniversary',
  empresa: 'form_occ_business',
  otra: 'form_occ_other',
}

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
  const { lang } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [submittedName, setSubmittedName] = useState('')
  const [waUrl, setWaUrl] = useState('')
  const [personas, setPersonas] = useState(2)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ defaultValues: { personas: 2 } })

  const today = new Date().toISOString().split('T')[0]

  const onSubmit = (data: FormData) => {
    const label = (key: TKey) => t(key, lang).replace(' *', '')
    const lines = [
      `🍽️ ${t('form_wa_reserve_header', lang)}`,
      '',
      `${label('form_name')}: ${data.nombre}`,
      `${label('form_phone')}: ${data.telefono}`,
      `${label('form_email')}: ${data.email}`,
      `${label('form_date')}: ${data.fecha}`,
      `${label('form_time')}: ${data.hora}`,
      `${label('form_guests')}: ${personas}`,
    ]
    if (data.ocasion && data.ocasion !== 'ninguna') {
      lines.push(`${label('form_occasion')}: ${t(OCCASION_KEYS[data.ocasion] ?? 'form_occ_other', lang)}`)
    }
    if (data.comentarios) lines.push(`${label('form_comments')}: ${data.comentarios}`)

    const url = buildWhatsAppUrl(lines.join('\n'))
    setWaUrl(url)
    setSubmittedName(data.nombre)
    setSubmitted(true)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-light border border-green-mid rounded-2xl p-8 text-center"
      >
        <div className="flex justify-center mb-4">
          <svg className="w-16 h-16 text-green-dark" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl text-green-dark mb-3">
          {t('form_success_title', lang)}, {submittedName}!
        </h3>
        <p className="text-brown text-base leading-relaxed">
          {t('form_success_msg', lang)}
        </p>
        <p className="text-brown/70 text-sm mt-4">{t('form_wa_fallback', lang)}</p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-3 bg-green-dark text-cream py-3 px-6 rounded-2xl font-heading font-bold hover:bg-green-mid transition-colors shadow-md"
        >
          {t('form_wa_send', lang)}
        </a>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FloatingInput
          {...register('nombre', { required: t('form_required', lang) })}
          label={t('form_name', lang)}
          error={errors.nombre?.message}
        />
        <FloatingInput
          {...register('email', {
            required: t('form_required', lang),
            pattern: { value: /^\S+@\S+$/i, message: t('form_invalid_email', lang) },
          })}
          type="email"
          label={t('form_email', lang)}
          error={errors.email?.message}
        />
      </div>

      <FloatingInput
        {...register('telefono', { required: t('form_required', lang) })}
        type="tel"
        label={t('form_phone', lang)}
        error={errors.telefono?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FloatingInput
          {...register('fecha', { required: t('form_required', lang) })}
          type="date"
          min={today}
          label={t('form_date', lang)}
          error={errors.fecha?.message}
        />
        <FloatingSelect
          {...register('hora', { required: t('form_required', lang) })}
          label={t('form_time', lang)}
          error={errors.hora?.message}
        >
          <option value="">{t('form_time_select', lang)}</option>
          <option>13:00</option>
          <option>13:30</option>
          <option>14:00</option>
          <option>14:30</option>
          <option>20:00</option>
          <option>20:30</option>
          <option>21:00</option>
          <option>21:30</option>
        </FloatingSelect>
      </div>

      <div>
        <label className="block text-sm font-semibold text-brown mb-2">{t('form_guests', lang)}</label>
        <div className="flex items-center gap-4">
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setPersonas(Math.max(1, personas - 1))}
            className="w-10 h-10 rounded-full bg-green-dark text-cream flex items-center justify-center text-xl font-bold hover:bg-green-mid transition-colors"
          >−</motion.button>
          <span className="text-2xl font-heading font-bold text-green-dark w-8 text-center">{personas}</span>
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setPersonas(Math.min(20, personas + 1))}
            className="w-10 h-10 rounded-full bg-green-dark text-cream flex items-center justify-center text-xl font-bold hover:bg-green-mid transition-colors"
          >+</motion.button>
          <input type="hidden" {...register('personas')} value={personas} />
        </div>
      </div>

      <FloatingSelect {...register('ocasion')} label={t('form_occasion', lang)}>
        <option value="ninguna">{t('form_occ_none', lang)}</option>
        <option value="cumpleanos">{t('form_occ_birthday', lang)}</option>
        <option value="aniversario">{t('form_occ_anniversary', lang)}</option>
        <option value="empresa">{t('form_occ_business', lang)}</option>
        <option value="otra">{t('form_occ_other', lang)}</option>
      </FloatingSelect>

      <FloatingTextarea
        {...register('comentarios')}
        rows={4}
        label={t('form_comments', lang)}
      />

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-green-dark text-cream py-4 rounded-2xl font-heading font-bold text-lg hover:bg-green-mid transition-colors shadow-md"
      >
        {t('form_submit_reserve', lang)}
      </motion.button>
    </form>
  )
}
