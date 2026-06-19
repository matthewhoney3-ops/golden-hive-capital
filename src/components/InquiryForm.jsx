import { useState } from 'react'

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

export default function InquiryForm({ propertyTitle = null }) {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.target
    const formData = new FormData(form)
    formData.append('access_key', WEB3FORMS_ACCESS_KEY ?? '')
    formData.append(
      'subject',
      propertyTitle ? `Inquiry: ${propertyTitle}` : 'General inquiry, Golden Hive Capital'
    )

    if (!WEB3FORMS_ACCESS_KEY) {
      console.error(
        'Missing VITE_WEB3FORMS_ACCESS_KEY. Add it to a .env file — see README for setup instructions.'
      )
      setStatus('error')
      return
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const result = await res.json()
      if (result.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-surface border border-white/5 rounded p-6 text-center">
        <p className="font-display text-lg gold-text mb-1">Message sent</p>
        <p className="text-sm text-muted">Thanks for reaching out. We'll get back to you shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface border border-white/5 rounded p-6">
      {propertyTitle && <input type="hidden" name="property" value={propertyTitle} />}

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm text-muted mb-1.5">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full bg-surface-2 border border-white/10 rounded px-3.5 py-2.5 text-ivory text-sm focus:outline-none focus:border-gold-2"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm text-muted mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full bg-surface-2 border border-white/10 rounded px-3.5 py-2.5 text-ivory text-sm focus:outline-none focus:border-gold-2"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm text-muted mb-1.5">
          Phone <span className="text-muted-2">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full bg-surface-2 border border-white/10 rounded px-3.5 py-2.5 text-ivory text-sm focus:outline-none focus:border-gold-2"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="message" className="block text-sm text-muted mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          defaultValue={propertyTitle ? `I'm interested in ${propertyTitle}. ` : ''}
          className="w-full bg-surface-2 border border-white/10 rounded px-3.5 py-2.5 text-ivory text-sm focus:outline-none focus:border-gold-2"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="gold-fill gold-glow text-[#241B05] font-semibold text-sm tracking-wide px-6 py-2.5 rounded-sm disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send inquiry'}
      </button>

      {status === 'error' && (
        <p className="text-sm text-leased-text mt-3">
          Something went wrong sending that. Please try again, or email us directly.
        </p>
      )}
    </form>
  )
}
