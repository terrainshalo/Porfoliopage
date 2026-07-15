import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Mail, Phone, MessageCircle, Facebook, Send, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react'
import SectionTag from './SectionTag'
import { fadeUp3D, stagger, inView } from '../lib/motion'
import { SITE } from '../lib/site'

const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const formRef = useRef(null)
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const update = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
    setErrors((err) => ({ ...err, [e.target.name]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!EMAIL_RE.test(values.email)) next.email = 'Enter a valid email address.'
    if (!values.subject.trim()) next.subject = 'Add a subject.'
    if (values.message.trim().length < 10) next.message = 'Message should be at least 10 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')

    // Template params — must match the variable names in your EmailJS template.
    const params = {
      from_name: values.name,
      from_email: values.email,
      subject: values.subject,
      message: values.message,
      to_email: SITE.email, // admin@terrainshalo.com
    }

    try {
      if (!EMAILJS.serviceId || !EMAILJS.publicKey) {
        // Keys not configured yet — fail loudly in dev so it's obvious.
        throw new Error('EmailJS keys missing. Add them to your .env file.')
      }
      await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, params, {
        publicKey: EMAILJS.publicKey,
      })
      setStatus('success')
      setValues({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error('Contact form error:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="scene-3d relative overflow-hidden py-20 md:py-28">
      <div className="glow-blob pointer-events-none absolute -left-20 bottom-10 -z-10 h-80 w-80 rounded-full bg-brand-200/40" />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionTag active="Contact" label="Let's talk" />

        <motion.h2
          variants={fadeUp3D}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mx-auto mt-5 max-w-2xl text-center text-3xl font-extrabold md:text-5xl"
        >
          Need Help? We've Got You.
        </motion.h2>
        <motion.p
          variants={fadeUp3D}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mx-auto mt-4 max-w-xl text-center text-muted"
        >
          Tell us about your project and we'll get back to you within one business day. No guesswork,
          just clarity.
        </motion.p>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* LEFT: contact channels + socials */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="flex flex-col gap-4"
          >
            <ContactCard
              icon={Phone}
              label="Call us"
              value={SITE.phone}
              href={`tel:${SITE.phoneIntl}`}
            />
            <ContactCard
              icon={MessageCircle}
              label="WhatsApp"
              value={SITE.phone}
              href={`https://wa.me/${SITE.whatsapp}`}
              accent="bg-green-500"
            />
            <ContactCard
              icon={Mail}
              label="Email"
              value={SITE.email}
              href={`mailto:${SITE.email}`}
            />
            <ContactCard
              icon={Facebook}
              label="Facebook"
              value="Follow us"
              href={SITE.socials.facebook}
              accent="bg-[#1877f2]"
            />
          </motion.div>

          {/* RIGHT: the form */}
          <motion.form
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            variants={fadeUp3D}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-black/5 md:p-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Name"
                name="name"
                value={values.name}
                onChange={update}
                error={errors.name}
                placeholder="Jane Doe"
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={update}
                error={errors.email}
                placeholder="jane@company.com"
              />
            </div>
            <div className="mt-4">
              <Field
                label="Subject"
                name="subject"
                value={values.subject}
                onChange={update}
                error={errors.subject}
                placeholder="New website project"
              />
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-semibold">Message</label>
              <textarea
                name="message"
                rows={5}
                value={values.message}
                onChange={update}
                placeholder="Tell us what you'd like to build..."
                className={`w-full resize-none rounded-xl border bg-soft px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200 ${
                  errors.message ? 'border-red-400' : 'border-black/10'
                }`}
              />
              {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Send Message <Send size={16} />
                </>
              )}
            </button>

            {/* status feedback */}
            {status === 'success' && (
              <StatusMsg tone="success" icon={CheckCircle2}>
                Success! Your message has been sent. We'll be in touch shortly.
              </StatusMsg>
            )}
            {status === 'error' && (
              <StatusMsg tone="error" icon={AlertTriangle}>
                Error. Something went wrong — please try again or email us directly at {SITE.email}.
              </StatusMsg>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-soft px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200 ${
          error ? 'border-red-400' : 'border-black/10'
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

function ContactCard({ icon: Icon, label, value, href, accent = 'bg-brand-600' }) {
  const external = href.startsWith('http')
  return (
    <motion.a
      variants={fadeUp3D}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      whileHover={{ y: -4, rotateY: 4, transformPerspective: 800 }}
      className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-black/5 [transform-style:preserve-3d]"
    >
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white ${accent}`}>
        <Icon size={20} />
      </span>
      <div>
        <div className="text-xs text-muted">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </motion.a>
  )
}

function StatusMsg({ tone, icon: Icon, children }) {
  const tones = {
    success: 'bg-green-50 text-green-700 ring-green-200',
    error: 'bg-red-50 text-red-700 ring-red-200',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm ring-1 ${tones[tone]}`}
    >
      <Icon size={18} className="shrink-0" />
      <span>{children}</span>
    </motion.div>
  )
}
